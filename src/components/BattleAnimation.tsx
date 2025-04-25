import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import { motion } from 'framer-motion';
import { Swords } from 'lucide-react';

interface BattleAnimationProps {
  onComplete: () => void;
  monsterName: string;
  monsterImage: string;
}

const BattleAnimation = ({ onComplete, monsterName, monsterImage }: BattleAnimationProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
    >
      <div className="relative w-full max-w-2xl aspect-video bg-gray-900 rounded-lg overflow-hidden">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: "-100%" }}
          transition={{ duration: 2 }}
          onAnimationComplete={onComplete}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative flex items-center gap-8">
            <motion.div
              animate={{
                scale: [1, 1.2, 0.8],
                rotate: [0, 15, -15],
              }}
              transition={{ duration: 2 }}
              className="relative z-10"
            >
              <Swords size={64} className="text-red-500" />
            </motion.div>
            
            <motion.img
              src={monsterImage}
              alt={monsterName}
              className="w-32 h-32 object-cover rounded-full"
              animate={{
                opacity: [1, 0.5, 0],
                scale: [1, 0.8, 0],
                rotate: [0, 45, -45],
              }}
              transition={{ duration: 2 }}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BattleAnimation;