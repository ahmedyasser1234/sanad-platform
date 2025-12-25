
import { GoogleGenAI, Modality } from "@google/genai";

const ARABIC_LOCALE = 'ar-SA';
const FALLBACK_VOICE_NAMES = ['Arabic', 'ar-SA', 'ar-EG', 'Laila', 'Maged'];

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer, data.byteOffset, data.byteLength / 2);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

let audioContext: AudioContext | null = null;
let isQuotaExhausted = false;

async function ensureAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
  }
  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }
  return audioContext;
}

/**
 * Fallback to browser's native Speech Synthesis explicitly set to Arabic
 */
function speakWithBrowser(text: string): Promise<number> {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      resolve(Math.max(1.5, text.split(/\s+/).length * 0.45));
      return;
    }

    // Cancel any ongoing speech to avoid overlap
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = ARABIC_LOCALE;
    utterance.rate = 0.9; // Slightly slower for better clarity in Arabic
    utterance.pitch = 1.0;

    // Find the best available Arabic voice
    const voices = window.speechSynthesis.getVoices();
    let arabicVoice = voices.find(v => v.lang === ARABIC_LOCALE && v.localService);
    
    if (!arabicVoice) {
      arabicVoice = voices.find(v => v.lang.startsWith('ar') || FALLBACK_VOICE_NAMES.some(name => v.name.includes(name)));
    }

    if (arabicVoice) {
      utterance.voice = arabicVoice;
    }

    const estimatedDuration = Math.max(1.8, text.split(/\s+/).length * 0.5);

    utterance.onend = () => resolve(estimatedDuration);
    utterance.onerror = (event) => {
      console.error("Browser TTS error:", event);
      resolve(estimatedDuration);
    };

    window.speechSynthesis.speak(utterance);
    
    // Safety timeout to ensure resolve happens
    setTimeout(() => resolve(estimatedDuration), (estimatedDuration * 1000) + 100);
  });
}

/**
 * Main function to speak text using Gemini TTS with optimized 429 handling
 */
export async function speakText(text: string, voiceName: string = 'Puck'): Promise<{ duration: number }> {
  // If we already know the quota is hit, don't even try the API to save time
  if (isQuotaExhausted) {
    const duration = await speakWithBrowser(text);
    return { duration };
  }

  try {
    const ctx = await ensureAudioContext();
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // Force Arabic language behavior via prompt and system-like instruction
    const prompt = `Speak the following text in a warm Saudi Arabic accent (ar-SA): ${text}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
    });

    const part = response.candidates?.[0]?.content?.parts?.[0];

    if (part?.inlineData?.data) {
      const base64Audio = part.inlineData.data;
      const audioBuffer = await decodeAudioData(
        decode(base64Audio),
        ctx,
        24000,
        1,
      );
      
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.start();
      
      return { duration: audioBuffer.duration };
    }
  } catch (error: any) {
    // Check for 429 / Resource Exhausted
    const errorMsg = error?.message || "";
    if (errorMsg.includes('429') || errorMsg.includes('RESOURCE_EXHAUSTED') || errorMsg.includes('quota')) {
      console.warn("Gemini TTS Quota exceeded. Switching to Browser fallback immediately.");
      isQuotaExhausted = true; // Set flag to skip future API calls
      const duration = await speakWithBrowser(text);
      return { duration };
    }
    console.error("Gemini TTS Error:", error);
  }
  
  // Generic fallback if something else fails
  const fallbackDuration = await speakWithBrowser(text);
  return { duration: fallbackDuration };
}

/**
 * Helper to check if using fallback mode for UI indicators
 */
export function isUsingFallbackAudio() {
  return isQuotaExhausted;
}
