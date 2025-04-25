import { Heart, Zap, Brain } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';

const StatBar = ({ 
  icon, 
  label, 
  value, 
  color, 
  iconColor 
}: { 
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  iconColor: string;
}) => {
  return (
    <div className="mb-3">
      <div className="flex items-center gap-2 mb-1">
        <div className={`${iconColor} p-1 rounded-md`}>
          {icon}
        </div>
        <div className="flex justify-between w-full">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-sm font-bold">{value}/100</span>
        </div>
      </div>
      <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
        <motion.div 
          className={`h-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

const CharacterStats = () => {
  const { user } = useUser();
  
  if (!user) return null;
  
  return (
    <motion.div 
      className="bg-gray-800 bg-opacity-70 backdrop-blur-md p-5 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold text-white mb-4">Character Stats</h2>
      
      <StatBar 
        icon={<Heart size={18} />} 
        label="Wellness" 
        value={user.stats.wellness} 
        color="bg-gradient-to-r from-red-500 to-rose-400" 
        iconColor="bg-red-500 bg-opacity-20 text-red-400"
      />
      
      <StatBar 
        icon={<Brain size={18} />} 
        label="Aura" 
        value={user.stats.aura} 
        color="bg-gradient-to-r from-purple-500 to-indigo-400" 
        iconColor="bg-indigo-500 bg-opacity-20 text-indigo-400"
      />
      
      <StatBar 
        icon={<Zap size={18} />} 
        label="Strength" 
        value={user.stats.strength} 
        color="bg-gradient-to-r from-amber-500 to-yellow-400" 
        iconColor="bg-amber-500 bg-opacity-20 text-amber-400"
      />
    </motion.div>
  );
};

export default CharacterStats;