import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Swords, Heart, Brain, Zap, Timer, MapPin, CheckCircle, Book, Dumbbell } from 'lucide-react';
import Header from '../components/Header';
import NavButton from '../components/NavButton';
import { useUser } from '../context/UserContext';

// Task pools for each category
const wellnessTasks = [
  {
    id: 'w1',
    title: 'Mindful Meditation',
    description: 'Complete a 10-minute meditation session',
    points: 5
  },
  {
    id: 'w2',
    title: 'Deep Breathing',
    description: 'Practice deep breathing exercises for 5 minutes',
    points: 5
  },
  {
    id: 'w3',
    title: 'Stretching Session',
    description: 'Complete a 15-minute stretching routine',
    points: 5
  }
];

const auraTasks = [
  {
    id: 'a1',
    title: 'Knowledge Absorption',
    description: 'Read an article about a topic you\'re interested in',
    points: 5
  },
  {
    id: 'a2',
    title: 'Mind Training',
    description: 'Complete a puzzle or brain teaser',
    points: 5
  },
  {
    id: 'a3',
    title: 'Learning Session',
    description: 'Watch an educational video on a new topic',
    points: 5
  }
];

const strengthTasks = [
  {
    id: 's1',
    title: 'Walk for a Short Errand',
    description: 'Take a walk to complete a short errand',
    points: 5
  },
  {
    id: 's2',
    title: 'Quick Workout',
    description: 'Complete 10 push-ups and 20 squats',
    points: 5
  },
  {
    id: 's3',
    title: 'Stair Challenge',
    description: 'Climb stairs for 5 minutes',
    points: 5
  }
];

const getRandomTask = (category: 'wellness' | 'aura' | 'strength') => {
  const taskPool = category === 'wellness' ? wellnessTasks :
                  category === 'aura' ? auraTasks :
                  strengthTasks;
  const randomIndex = Math.floor(Math.random() * taskPool.length);
  return {
    ...taskPool[randomIndex],
    category,
    icon: category === 'wellness' ? <Heart size={20} className="text-red-400" /> :
          category === 'aura' ? <Brain size={20} className="text-purple-400" /> :
          <Zap size={20} className="text-amber-400" />
  };
};

const EarnXP = () => {
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [taskInProgress, setTaskInProgress] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [showMilestone, setShowMilestone] = useState(false);
  const { user, updateStats } = useUser();
  
  const handleStartTask = () => {
    if (!selectedTask) return;
    setTaskInProgress(true);
    
    setTimeout(() => {
      setTaskInProgress(false);
      setTaskCompleted(true);
      
      // Update only the stats, not diamonds
      if (selectedTask.category === 'wellness') {
        updateStats({ wellness: 5 });
      } else if (selectedTask.category === 'aura') {
        updateStats({ aura: 5 });
      } else if (selectedTask.category === 'strength') {
        updateStats({ strength: 5 });
      }
    }, 3000);
  };
  
  const handleCloseMilestone = () => {
    setShowMilestone(false);
  };
  
  const resetTask = () => {
    setSelectedTask(null);
    setTaskCompleted(false);
  };

  const handleCategorySelect = (category: 'wellness' | 'aura' | 'strength') => {
    setSelectedTask(getRandomTask(category));
  };

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
            Earn XP
          </h1>
          <p className="text-gray-300">Complete tasks to boost your stats</p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div>
            {!selectedTask ? (
              <motion.div
                className="bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-xl shadow-lg p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl font-bold mb-4">Choose a Category</h2>
                
                <div className="space-y-4">
                  <motion.div 
                    className="bg-gradient-to-r from-red-900 to-red-800 bg-opacity-40 p-4 rounded-lg cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCategorySelect('wellness')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-500 bg-opacity-20 flex items-center justify-center">
                        <Heart size={20} className="text-red-400" />
                      </div>
                      <div>
                        <h3 className="font-bold">Wellness</h3>
                        <p className="text-sm text-gray-300">Improve your mental and physical health</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-gradient-to-r from-purple-900 to-purple-800 bg-opacity-40 p-4 rounded-lg cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCategorySelect('aura')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-purple-500 bg-opacity-20 flex items-center justify-center">
                        <Brain size={20} className="text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-bold">Aura</h3>
                        <p className="text-sm text-gray-300">Enhance your knowledge and mental clarity</p>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-gradient-to-r from-amber-900 to-amber-800 bg-opacity-40 p-4 rounded-lg cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCategorySelect('strength')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-500 bg-opacity-20 flex items-center justify-center">
                        <Zap size={20} className="text-amber-400" />
                      </div>
                      <div>
                        <h3 className="font-bold">Strength</h3>
                        <p className="text-sm text-gray-300">Build your physical strength and endurance</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className={`bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-xl shadow-lg p-6 ${
                  taskCompleted ? 'border-2 border-green-500' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold">Task Details</h2>
                  {!taskInProgress && !taskCompleted && (
                    <button 
                      className="text-gray-400 hover:text-white"
                      onClick={resetTask}
                    >
                      ← Back
                    </button>
                  )}
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`
                      w-12 h-12 rounded-full flex items-center justify-center
                      ${selectedTask.category === 'wellness' ? 'bg-red-900 bg-opacity-40' : 
                        selectedTask.category === 'aura' ? 'bg-purple-900 bg-opacity-40' : 
                        'bg-amber-900 bg-opacity-40'}
                    `}>
                      {selectedTask.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{selectedTask.title}</h3>
                      <p className="text-sm text-gray-300 capitalize">{selectedTask.category} Task</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-4">{selectedTask.description}</p>
                  
                  <div className="bg-black bg-opacity-30 p-3 rounded-lg mb-4">
                    <div className="flex justify-between text-sm">
                      <span>XP Reward:</span>
                      <span className="font-bold text-teal-400">+{selectedTask.points} {selectedTask.category}</span>
                    </div>
                  </div>
                </div>
                
                {taskInProgress ? (
                  <div className="text-center p-4">
                    <div className="animate-pulse mb-4">
                      {selectedTask.category === 'strength' ? (
                        <div className="flex flex-col items-center gap-2">
                          <MapPin size={32} className="text-amber-400" />
                          <p className="text-gray-300">Tracking your journey...</p>
                        </div>
                      ) : selectedTask.category === 'wellness' ? (
                        <div className="flex flex-col items-center gap-2">
                          <Timer size={32} className="text-red-400" />
                          <p className="text-gray-300">Meditation in progress...</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <Brain size={32} className="text-purple-400" />
                          <p className="text-gray-300">Learning in progress...</p>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-400">Please wait while we track your activity...</p>
                  </div>
                ) : taskCompleted ? (
                  <div className="text-center p-4">
                    <motion.div 
                      className="mb-4 text-green-400"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <CheckCircle size={48} />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">Task Completed!</h3>
                    <p className="text-gray-300 mb-4">You've earned XP!</p>
                    <motion.button
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={resetTask}
                    >
                      Complete Another Task
                    </motion.button>
                  </div>
                ) : (
                  <motion.button
                    className={`
                      w-full py-3 px-4 rounded-lg font-semibold text-white
                      ${selectedTask.category === 'wellness' ? 'bg-gradient-to-r from-red-600 to-red-700' : 
                        selectedTask.category === 'aura' ? 'bg-gradient-to-r from-purple-600 to-purple-700' : 
                        'bg-gradient-to-r from-amber-600 to-amber-700'}
                    `}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleStartTask}
                  >
                    Start Task
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
          
          <div>
            <motion.div
              className="bg-gray-800 bg-opacity-60 backdrop-blur-md rounded-xl shadow-lg p-6 h-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-bold mb-4">Your Progress</h2>
              
              {user && (
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-red-300 font-medium">Wellness</span>
                      <span>{user.stats.wellness}/100</span>
                    </div>
                    <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-red-500 to-rose-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${user.stats.wellness}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-purple-300 font-medium">Aura</span>
                      <span>{user.stats.aura}/100</span>
                    </div>
                    <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-purple-500 to-indigo-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${user.stats.aura}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-amber-300 font-medium">Strength</span>
                      <span>{user.stats.strength}/100</span>
                    </div>
                    <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-amber-500 to-yellow-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${user.stats.strength}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center gap-4">
          <NavButton 
            to="/home" 
            icon={<Home size={20} />} 
            label="Home" 
          />
          <NavButton 
            to="/battlefield" 
            icon={<Swords size={20} className="text-red-300" />} 
            label="Battlefield" 
          />
        </div>
      </main>
    </div>
  );
};

export default EarnXP;