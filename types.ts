
export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  category: string;
}

export interface CollegeTest {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface College {
  id: string;
  name: string;
  icon: string;
  bg: string;
  tests: CollegeTest[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface UserState {
  score: number;
  xp: number;
  hearts: number;
  streak: number;
  level: number;
  unlockedBadges: string[];
  // Mapping college ID to the index of the highest unlocked test (0-indexed)
  unlockedLevels: Record<string, number>;
  isComplete: boolean;
}

export interface AppState {
  user: UserState;
  isDarkMode: boolean;
}

export type MascotState = 'idle' | 'happy' | 'sad' | 'celebrate' | 'writing' | 'talking';
