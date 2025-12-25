
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AppState, UserState } from '../types';
import { COLLEGES, INITIAL_HEARTS, PASS_THRESHOLD } from '../constants';

interface AppContextProps {
  state: AppState;
  resetQuiz: () => void;
  submitAnswer: (collegeId: string, testIndex: number, isCorrect: boolean) => void;
  onTestComplete: (collegeId: string, testIndex: number, score: number, total: number) => boolean;
  unlockBadge: (badgeId: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

// Fix: Removed 'currentQuestionIndex' from initialUserState as it's not defined in the UserState interface in types.ts
const initialUserState: UserState = {
  score: 0,
  xp: 0,
  hearts: INITIAL_HEARTS,
  streak: 0,
  level: 1,
  unlockedBadges: [],
  unlockedLevels: COLLEGES.reduce((acc, c) => ({ ...acc, [c.id]: 0 }), {}),
  isComplete: false,
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserState>(() => {
    const saved = localStorage.getItem('sanad_platform_user_v2');
    return saved ? JSON.parse(saved) : initialUserState;
  });
  const [isDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('sanad_platform_user_v2', JSON.stringify(user));
  }, [user]);

  const submitAnswer = (collegeId: string, testIndex: number, isCorrect: boolean) => {
    if (isCorrect) {
      setUser(prev => ({
        ...prev,
        score: prev.score + 1,
        xp: prev.xp + 10,
        streak: prev.streak + 1,
      }));
    } else {
      setUser(prev => ({
        ...prev,
        hearts: Math.max(0, prev.hearts - 1),
        streak: 0,
      }));
    }
  };

  const onTestComplete = (collegeId: string, testIndex: number, score: number, total: number) => {
    const percentage = score / total;
    const passed = percentage >= PASS_THRESHOLD;
    
    if (passed) {
      setUser(prev => {
        const currentUnlocked = prev.unlockedLevels[collegeId] || 0;
        // Unlock next level if this was the highest current level
        const nextLevel = testIndex === currentUnlocked ? testIndex + 1 : currentUnlocked;
        
        return {
          ...prev,
          unlockedLevels: {
            ...prev.unlockedLevels,
            [collegeId]: Math.min(nextLevel, 3) // Max index is 3 (for 4 tests)
          }
        };
      });
    }
    return passed;
  };

  const unlockBadge = (badgeId: string) => {
    if (!user.unlockedBadges.includes(badgeId)) {
      setUser(prev => ({ ...prev, unlockedBadges: [...prev.unlockedBadges, badgeId] }));
    }
  };

  const resetQuiz = () => {
    setUser(prev => ({
      ...initialUserState,
      unlockedBadges: prev.unlockedBadges,
      xp: prev.xp,
      unlockedLevels: prev.unlockedLevels
    }));
  };

  return (
    <AppContext.Provider value={{ 
      state: { user, isDarkMode },
      resetQuiz,
      submitAnswer,
      onTestComplete,
      unlockBadge
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
