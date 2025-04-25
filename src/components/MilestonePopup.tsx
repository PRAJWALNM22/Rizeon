import { motion, AnimatePresence } from 'framer-motion';
import { Diamond, X } from 'lucide-react';
import Confetti from 'react-confetti';

interface MilestonePopupProps {
  diamonds: number;
  onClose: () => void;
}

const MilestonePopup = ({ diamonds, onClose }: MilestonePopupProps) => {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="bg-gradient-to-br from-indigo-900 to-purple-800 p-6 rounded-xl shadow-2xl max-w-md w-full mx-4"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
          
          <div className="text-center">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 bg-amber-500 bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Diamond size={40} className="text-amber-300" />
            </motion.div>
            
            <h2 className="text-2xl font-bold text-white mb-2">
              Milestone Achieved!
            </h2>
            <p className="text-indigo-200 mb-4">
              Congratulations! You've reached {diamonds} diamonds!
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="bg-white bg-opacity-20 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Continue Journey
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default MilestonePopup;