import { motion } from 'framer-motion';
import { Trophy, Diamond, Medal, Home } from 'lucide-react';
import Header from '../components/Header';
import NavButton from '../components/NavButton';
import { useUser } from '../context/UserContext';

// Simulated leaderboard data - in a real app, this would come from a backend
const leaderboardData = [
  { id: '1', username: 'DragonSlayer', diamonds: 250 },
  { id: '2', username: 'ShadowMaster', diamonds: 180 },
  { id: '3', username: 'MysticWarrior', diamonds: 150 },
  { id: '4', username: 'PhoenixRider', diamonds: 120 },
  { id: '5', username: 'StormBringer', diamonds: 100 },
];

const Leaderboard = () => {
  const { user } = useUser();
  
  // Calculate user's rank
  const userRank = user ? leaderboardData.findIndex(player => player.diamonds <= user.diamonds) + 1 : -1;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            Leaderboard
          </h1>
          <p className="text-gray-300">Top warriors ranked by diamonds earned</p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Top 3 Players */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {/* Second Place */}
            <motion.div
              className="order-2 md:order-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {leaderboardData[1] && (
                <div className="bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-xl p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <Medal size={40} className="text-gray-300" />
                  </div>
                  <h3 className="font-bold text-lg">{leaderboardData[1].username}</h3>
                  <div className="flex items-center justify-center gap-1 text-amber-300">
                    <Diamond size={16} />
                    <span>{leaderboardData[1].diamonds}</span>
                  </div>
                </div>
              )}
            </motion.div>

            {/* First Place */}
            <motion.div
              className="order-1 md:order-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {leaderboardData[0] && (
                <div className="bg-gradient-to-b from-amber-900 to-amber-800 rounded-xl p-6 text-center transform md:-translate-y-4">
                  <div className="flex justify-center mb-2">
                    <Trophy size={48} className="text-amber-400" />
                  </div>
                  <h3 className="font-bold text-xl">{leaderboardData[0].username}</h3>
                  <div className="flex items-center justify-center gap-1 text-amber-300">
                    <Diamond size={18} />
                    <span className="text-lg">{leaderboardData[0].diamonds}</span>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Third Place */}
            <motion.div
              className="order-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {leaderboardData[2] && (
                <div className="bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-xl p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <Medal size={40} className="text-amber-700" />
                  </div>
                  <h3 className="font-bold text-lg">{leaderboardData[2].username}</h3>
                  <div className="flex items-center justify-center gap-1 text-amber-300">
                    <Diamond size={16} />
                    <span>{leaderboardData[2].diamonds}</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* User's Rank */}
          {user && userRank > 0 && (
            <motion.div
              className="bg-indigo-900 bg-opacity-40 rounded-lg p-4 mb-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-800 flex items-center justify-center">
                    <span className="font-bold">{userRank}</span>
                  </div>
                  <span className="font-semibold">{user.username}</span>
                </div>
                <div className="flex items-center gap-1 text-amber-300">
                  <Diamond size={16} />
                  <span>{user.diamonds}</span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <NavButton 
            to="/home" 
            icon={<Home size={20} />} 
            label="Home" 
          />
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;