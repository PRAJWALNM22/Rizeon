import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface NavButtonProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  primary?: boolean;
}

const NavButton = ({ to, icon, label, primary = false }: NavButtonProps) => {
  return (
    <Link to={to}>
      <motion.button
        className={`
          flex items-center justify-center gap-2 px-5 py-3 rounded-lg font-semibold
          transition-all shadow-lg
          ${primary 
            ? 'bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-700 hover:to-purple-800' 
            : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20 backdrop-blur-sm'}
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {icon}
        <span>{label}</span>
      </motion.button>
    </Link>
  );
};

export default NavButton;