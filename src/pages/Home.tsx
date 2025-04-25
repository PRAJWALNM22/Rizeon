import { motion } from 'framer-motion';
import { Swords, Award } from 'lucide-react';
import Header from '../components/Header';
import Avatar from '../components/Avatar';
import CharacterStats from '../components/CharacterStats';
import NavButton from '../components/NavButton';
import { useUser } from '../context/UserContext';
import MilestonePopup from '../components/MilestonePopup';

const Home = () => {
  const { user, showMilestonePopup, setShowMilestonePopup } = useUser();

  // Get the next undefeated monster
  const getNextBattle = () => {
    if (!user) return null;
    const nextLevel = (user.defeatedMonsters.length + 1);
    return `Level ${nextLevel} Challenge`;
  };

  // Calculate diamonds needed for next milestone
  const getDiamondsMilestone = () => {
    if (!user) return 0;
    const milestone = Math.ceil(user.diamonds / 50) * 50;
    return milestone - user.diamonds;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="mb-10 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-indigo-300">
              Welcome Back, {user?.username || 'Warrior'}!
            </h1>
            <p className="text-gray-300 mt-2">Continue on your journey to greatness</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="order-2 md:order-1 flex flex-col items-center justify-center">
              <Avatar />
              
              <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-xs">
                <NavButton 
                  to="/battlefield" 
                  icon={<Swords size={20} className="text-red-300" />} 
                  label="Battlefield" 
                  primary
                />
                <NavButton 
                  to="/earn-xp" 
                  icon={<Award size={20} className="text-amber-300" />} 
                  label="Earn XP" 
                />
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <CharacterStats />
              
              <motion.div 
                className="mt-6 bg-gray-800 bg-opacity-70 backdrop-blur-md p-5 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h2 className="text-xl font-bold mb-4">Your Journey</h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-purple-900 bg-opacity-30 rounded-lg">
                    <div className="h-12 w-12 rounded-full bg-purple-800 flex items-center justify-center">
                      <Swords size={24} className="text-purple-300" />
                    </div>
                    <div>
                      <h3 className="font-bold">Upcoming Battle</h3>
                      <p className="text-sm text-gray-300">{getNextBattle()}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-teal-900 bg-opacity-30 rounded-lg">
                    <div className="h-12 w-12 rounded-full bg-teal-800 flex items-center justify-center">
                      <Award size={24} className="text-teal-300" />
                    </div>
                    <div>
                      <h3 className="font-bold">Next Milestone</h3>
                      <p className="text-sm text-gray-300">{getDiamondsMilestone()} more diamonds for next milestone</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {showMilestonePopup && user && (
        <MilestonePopup 
          diamonds={user.diamonds} 
          onClose={() => setShowMilestonePopup(false)} 
        />
      )}
    </div>
  );
};

export default Home;