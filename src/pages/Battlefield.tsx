import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Award, ArrowRight, Swords, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import NavButton from '../components/NavButton';
import { useUser } from '../context/UserContext';
import BattleAnimation from '../components/BattleAnimation';
import MilestonePopup from '../components/MilestonePopup';

const monsters = [
  { 
    id: 1, 
    name: "Shadow Lurker", 
    level: 1,
    stats: { wellness: 0, aura: 0, strength: 5 },
    image: "https://images.pexels.com/photos/3631430/pexels-photo-3631430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    reward: 10
  },
  { 
    id: 2, 
    name: "Crystal Golem", 
    level: 2,
    stats: { wellness: 5, aura: 0, strength: 5 },
    image: "https://images.pexels.com/photos/4666750/pexels-photo-4666750.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    reward: 20
  },
  { 
    id: 3, 
    name: "Venom Serpent", 
    level: 3,
    stats: { wellness: 5, aura: 5, strength: 5 },
    image: "https://images.pexels.com/photos/4666754/pexels-photo-4666754.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    reward: 30
  },
  { 
    id: 4, 
    name: "Frost Wraith", 
    level: 4,
    stats: { wellness: 10, aura: 5, strength: 5 },
    image: "https://images.pexels.com/photos/1302304/pexels-photo-1302304.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    reward: 40
  },
  { 
    id: 5, 
    name: "Lava Behemoth", 
    level: 5,
    stats: { wellness: 10, aura: 5, strength: 10 },
    image: "https://images.pexels.com/photos/4585184/pexels-photo-4585184.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    reward: 50
  },
  { 
    id: 6, 
    name: "Shadow Dragon", 
    level: 6,
    stats: { wellness: 10, aura: 10, strength: 10 },
    image: "https://images.pexels.com/photos/6275808/pexels-photo-6275808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    reward: 60
  },
];

const Battlefield = () => {
  const [selectedMonster, setSelectedMonster] = useState<typeof monsters[0] | null>(null);
  const [showBattleResult, setShowBattleResult] = useState(false);
  const [battleWon, setBattleWon] = useState(false);
  const [showBattleAnimation, setShowBattleAnimation] = useState(false);
  const { user, updateDiamonds, addDefeatedMonster, hasDefeatedMonster, showMilestonePopup, setShowMilestonePopup } = useUser();
  const navigate = useNavigate();
  
  const handleLevelClick = (monster: typeof monsters[0]) => {
    if (!hasDefeatedMonster(monster.id)) {
      setSelectedMonster(monster);
      setShowBattleResult(false);
    }
  };
  
  const handleFight = () => {
    if (!user || !selectedMonster) return;
    
    const userWins = 
      user.stats.wellness >= selectedMonster.stats.wellness &&
      user.stats.aura >= selectedMonster.stats.aura &&
      user.stats.strength >= selectedMonster.stats.strength;
    
    setBattleWon(userWins);
    
    if (userWins) {
      setShowBattleAnimation(true);
    } else {
      setShowBattleResult(true);
    }
  };
  
  const handleBattleAnimationComplete = () => {
    setShowBattleAnimation(false);
    if (selectedMonster) {
      updateDiamonds(selectedMonster.reward);
      addDefeatedMonster(selectedMonster.id);
    }
    setShowBattleResult(true);
  };
  
  const closeBattleResult = () => {
    setShowBattleResult(false);
    setSelectedMonster(null);
  };

  const getNextAvailableMonster = () => {
    return monsters.find(monster => !hasDefeatedMonster(monster.id)) || null;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8 relative">
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Battlefield
          </h1>
          <p className="text-gray-300">Choose your battle wisely, warrior</p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="relative p-6 bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-xl shadow-lg">
              <div className="flex flex-wrap justify-center gap-4">
                {monsters.map((monster, index) => {
                  const isDefeated = hasDefeatedMonster(monster.id);
                  return (
                    <motion.div
                      key={monster.id}
                      className={`
                        h-24 w-24 rounded-full overflow-hidden cursor-pointer relative
                        ${selectedMonster?.id === monster.id ? 'ring-4 ring-indigo-500' : 'ring-2 ring-gray-600'}
                        ${isDefeated ? 'opacity-50 grayscale' : ''}
                      `}
                      whileHover={{ scale: isDefeated ? 1 : 1.1 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      onClick={() => !isDefeated && handleLevelClick(monster)}
                    >
                      <img 
                        src={monster.image} 
                        alt={monster.name} 
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{monster.level}</span>
                      </div>
                      {isDefeated && (
                        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                          <span className="text-white font-bold text-sm">Defeated</span>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
              
              <div className="mt-8 flex flex-wrap justify-center">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <div 
                    key={index} 
                    className="w-16 border-t-2 border-gray-600 mx-1"
                  />
                ))}
              </div>
              
              <div className="mt-10 flex justify-center">
                {selectedMonster && (
                  <motion.button
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold rounded-lg shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleFight}
                  >
                    <Swords size={20} />
                    Fight!
                  </motion.button>
                )}
              </div>
            </div>
          </div>
          
          <div>
            {selectedMonster ? (
              <motion.div 
                className="p-6 bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-xl shadow-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-lg overflow-hidden">
                    <img 
                      src={selectedMonster.image} 
                      alt={selectedMonster.name} 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedMonster.name}</h2>
                    <p className="text-sm text-gray-300">Level {selectedMonster.level} Monster</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">Monster Stats</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Wellness</span>
                        <span className="font-medium">{selectedMonster.stats.wellness}</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-red-500" 
                          style={{ width: `${selectedMonster.stats.wellness}%` }} 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Aura</span>
                        <span className="font-medium">{selectedMonster.stats.aura}</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-purple-500" 
                          style={{ width: `${selectedMonster.stats.aura}%` }} 
                        />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Strength</span>
                        <span className="font-medium">{selectedMonster.stats.strength}</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-amber-500" 
                          style={{ width: `${selectedMonster.stats.strength}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-700 bg-opacity-50 rounded-lg">
                  <p className="text-sm text-gray-300">
                    Defeat this monster to earn {selectedMonster.reward} diamonds!
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                className="flex flex-col items-center justify-center h-full p-6 bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-xl shadow-lg text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Swords size={48} className="text-gray-500 mb-4" />
                <h2 className="text-xl font-bold text-gray-300">Choose a Level</h2>
                <p className="text-gray-400 mt-2">
                  Select a monster to view its stats and prepare for battle
                </p>
              </motion.div>
            )}
          </div>
        </div>
        
        <div className="mt-8 flex justify-center gap-4">
          <NavButton 
            to="/home" 
            icon={<Home size={20} />} 
            label="Home" 
          />
          <NavButton 
            to="/earn-xp" 
            icon={<Award size={20} className="text-amber-300" />} 
            label="Earn XP" 
          />
        </div>
        
        {showBattleAnimation && selectedMonster && (
          <BattleAnimation
            onComplete={handleBattleAnimationComplete}
            monsterName={selectedMonster.name}
            monsterImage={selectedMonster.image}
          />
        )}
        
        {showBattleResult && selectedMonster && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="relative bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <button 
                onClick={closeBattleResult}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
              
              <div className="text-center">
                <div className="mb-6">
                  {battleWon ? (
                    <>
                      <h2 className="text-2xl font-bold text-green-400 mb-2">Victory!</h2>
                      <p className="text-gray-300">
                        You've earned {selectedMonster.reward} diamonds for defeating {selectedMonster.name}!
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-red-400 mb-2">Defeat</h2>
                      <p className="text-gray-300">
                        Your stats are not high enough to defeat {selectedMonster.name}. Train harder and try again!
                      </p>
                    </>
                  )}
                </div>
                
                {!battleWon && (
                  <motion.button
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg shadow-lg mx-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/earn-xp')}
                  >
                    Train More
                    <ArrowRight size={20} />
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
        
        {showMilestonePopup && (
          <MilestonePopup onClose={() => setShowMilestonePopup(false)} />
        )}
      </main>
    </div>
  );
};

export default Battlefield;