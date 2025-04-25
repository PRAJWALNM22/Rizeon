import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';

const Avatar = () => {
  const { user } = useUser();
  
  if (!user) return null;
  
  // Using placeholder avatar from Pexels
  const avatarUrl = user.avatarUrl || "https://images.pexels.com/photos/1446948/pexels-photo-1446948.jpeg?auto=compress&cs=tinysrgb&w=400";
  
  return (
    <motion.div 
      className="relative flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400 to-indigo-500 animate-pulse blur-xl opacity-50"></div>
        <motion.div 
          className="relative h-32 w-32 rounded-full overflow-hidden ring-4 ring-purple-600 shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          <img 
            src={avatarUrl} 
            alt="User Avatar" 
            className="h-full w-full object-cover" 
          />
        </motion.div>
      </div>
      
      <div className="mt-3 text-center">
        <h3 className="text-xl font-bold text-white">{user.username || "Warrior"}</h3>
        <div className="flex items-center justify-center mt-1 gap-1">
          <div className="text-xs bg-purple-800 px-2 py-0.5 rounded-md text-purple-200">
            Level {user.level || 1}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Avatar;