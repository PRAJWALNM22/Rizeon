import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserStats {
  wellness: number;
  aura: number;
  strength: number;
}

interface User {
  id: string;
  username: string;
  level: number;
  diamonds: number;
  stats: UserStats;
  defeatedMonsters: number[];
}

interface UserContextType {
  user: User | null;
  login: (username: string) => void;
  logout: () => void;
  updateStats: (statsUpdate: Partial<UserStats>) => void;
  updateDiamonds: (amount: number) => void;
  addDefeatedMonster: (monsterId: number) => void;
  hasDefeatedMonster: (monsterId: number) => boolean;
  showMilestonePopup: boolean;
  setShowMilestonePopup: (show: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [showMilestonePopup, setShowMilestonePopup] = useState(false);

  const login = (username: string) => {
    setUser({
      id: crypto.randomUUID(),
      username,
      level: 1,
      diamonds: 0,
      stats: {
        wellness: 0,
        aura: 0,
        strength: 0
      },
      defeatedMonsters: []
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateStats = (statsUpdate: Partial<UserStats>) => {
    if (!user) return;
    
    setUser(prev => {
      if (!prev) return null;
      
      return {
        ...prev,
        stats: {
          wellness: Math.min(100, prev.stats.wellness + (statsUpdate.wellness || 0)),
          aura: Math.min(100, prev.stats.aura + (statsUpdate.aura || 0)),
          strength: Math.min(100, prev.stats.strength + (statsUpdate.strength || 0))
        }
      };
    });
  };
  
  const updateDiamonds = (amount: number) => {
    if (!user) return;
    
    setUser(prev => {
      if (!prev) return null;
      
      const newDiamonds = prev.diamonds + amount;
      const previousMilestone = Math.floor(prev.diamonds / 50) * 50;
      const newMilestone = Math.floor(newDiamonds / 50) * 50;
      
      if (newMilestone > previousMilestone && newDiamonds >= 50) {
        setShowMilestonePopup(true);
      }
      
      return {
        ...prev,
        diamonds: newDiamonds
      };
    });
  };

  const addDefeatedMonster = (monsterId: number) => {
    if (!user) return;

    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        defeatedMonsters: [...prev.defeatedMonsters, monsterId]
      };
    });
  };

  const hasDefeatedMonster = (monsterId: number) => {
    if (!user) return false;
    return user.defeatedMonsters.includes(monsterId);
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      login, 
      logout, 
      updateStats, 
      updateDiamonds,
      addDefeatedMonster,
      hasDefeatedMonster,
      showMilestonePopup,
      setShowMilestonePopup
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};