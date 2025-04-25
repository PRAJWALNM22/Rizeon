import { motion } from 'framer-motion';
import { Sword } from 'lucide-react';

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-800">
      <motion.div 
        className="flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="text-white text-7xl font-bold flex items-center gap-4"
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        >
          <Sword size={64} className="text-teal-400" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-indigo-300">
            RIZEON
          </span>
        </motion.div>
        
        <motion.div 
          className="mt-6 h-2 w-64 bg-gray-700 rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: 256 }}
          transition={{ duration: 1.5 }}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-teal-400 to-indigo-300"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5 }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SplashScreen;