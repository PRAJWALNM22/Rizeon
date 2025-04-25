import { Trophy, Diamond } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  const { user } = useUser();

  return (
    <header className="bg-gradient-to-r from-indigo-900 to-purple-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/home">
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Diamond size={28} className="text-amber-400" />
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-indigo-300">
                RIZEON
              </h1>
            </motion.div>
          </Link>
        </div>
        
        <div className="flex items-center gap-6">
          <Link to="/leaderboard" className="flex items-center gap-2 hover:text-teal-300 transition-colors">
            <Trophy size={20} className="text-amber-400" />
            <span className="hidden sm:inline">Leaderboard</span>
          </Link>
          
          <motion.div 
            className="flex items-center gap-2 bg-black bg-opacity-20 py-1 px-3 rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Diamond size={20} className="text-amber-300" />
            <span className="font-bold">{user?.diamonds || 0}</span>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header