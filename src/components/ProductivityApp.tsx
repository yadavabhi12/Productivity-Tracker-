import React, { useState, useEffect } from 'react';
import { Plus, Clock, BarChart3, Calendar, User, Play, Pause, Trash2, Edit3, CheckCircle, Circle, Trophy, Target, Zap, TrendingUp, Star, Coffee, Brain, Dumbbell, Moon, Award, Siren as Fire, Timer, Bell, ChevronRight, Settings, Download, Share2, Filter, Search } from 'lucide-react';

const ProductivityApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [tasks, setTasks] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTimer, setActiveTimer] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [streak, setStreak] = useState(7);
  const [achievements, setAchievements] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [showStats, setShowStats] = useState(true);
  const [motivationalQuote, setMotivationalQuote] = useState('');

  const quotes = [
    "The way to get started is to quit talking and begin doing. - Walt Disney",
    "Don't let yesterday take up too much of today. - Will Rogers",
    "You learn more from failure than from success. - Unknown",
    "It's not whether you get knocked down, it's whether you get up. - Vince Lombardi",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
  ];

  // Initialize with sample data and motivational quote
  useEffect(() => {
    const sampleTasks = [
      {
        id: '1',
        title: 'Morning Workout 💪',
        description: 'Full body workout with cardio',
        category: 'Health',
        startTime: '06:00',
        endTime: '07:30',
        completed: true,
        date: selectedDate,
        color: 'bg-green-500',
        priority: 'high',
        tags: ['fitness', 'morning']
      },
      {
        id: '2',
        title: 'Project Development 🚀',
        description: 'Work on React Native app features',
        category: 'Work',
        startTime: '09:00',
        endTime: '12:00',
        completed: true,
        date: selectedDate,
        color: 'bg-blue-500',
        priority: 'high',
        tags: ['coding', 'project']
      },
      {
        id: '3',
        title: 'Algorithm Study 🧠',
        description: 'Practice dynamic programming problems',
        category: 'Study',
        startTime: '14:00',
        endTime: '16:00',
        completed: false,
        date: selectedDate,
        color: 'bg-purple-500',
        priority: 'medium',
        tags: ['algorithms', 'learning']
      },
      {
        id: '4',
        title: 'Lunch Break 🍽️',
        description: 'Healthy meal and relaxation',
        category: 'Break',
        startTime: '12:00',
        endTime: '13:30',
        completed: true,
        date: selectedDate,
        color: 'bg-yellow-500',
        priority: 'low',
        tags: ['food', 'rest']
      }
    ];
    setTasks(sampleTasks);
    setMotivationalQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    
    // Initialize achievements
    setAchievements([
      { id: 1, title: 'Early Bird', description: 'Complete 5 morning tasks', icon: '🌅', unlocked: true },
      { id: 2, title: 'Productivity Master', description: 'Achieve 80% productivity for 7 days', icon: '🏆', unlocked: true },
      { id: 3, title: 'Streak Champion', description: 'Maintain 30-day streak', icon: '🔥', unlocked: false },
      { id: 4, title: 'Focus Ninja', description: 'Complete 10 deep work sessions', icon: '🥷', unlocked: false }
    ]);
  }, [selectedDate]);

  // Timer functionality
  useEffect(() => {
    let interval = null;
    if (activeTimer) {
      interval = setInterval(() => {
        setTimerSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!activeTimer && timerSeconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [activeTimer, timerSeconds]);

  const categories = [
    { name: 'Work', color: 'bg-blue-500', productive: true, icon: '💼' },
    { name: 'Study', color: 'bg-purple-500', productive: true, icon: '📚' },
    { name: 'Health', color: 'bg-green-500', productive: true, icon: '💪' },
    { name: 'Break', color: 'bg-yellow-500', productive: false, icon: '☕' },
    { name: 'Sleep', color: 'bg-indigo-500', productive: false, icon: '😴' },
    { name: 'Other', color: 'bg-gray-500', productive: false, icon: '📝' }
  ];

  const calculateDailyStats = () => {
    const todayTasks = tasks.filter(task => task.date === selectedDate);
    let productiveMinutes = 0;
    let totalMinutes = 0;

    todayTasks.forEach(task => {
      const start = new Date(`2000-01-01 ${task.startTime}`);
      const end = new Date(`2000-01-01 ${task.endTime}`);
      const duration = (end - start) / (1000 * 60);
      
      totalMinutes += duration;
      const category = categories.find(cat => cat.name === task.category);
      if (category && category.productive) {
        productiveMinutes += duration;
      }
    });

    const utilizationPercentage = totalMinutes > 0 ? (productiveMinutes / (24 * 60)) * 100 : 0;
    
    return {
      productiveHours: Math.round(productiveMinutes / 60 * 10) / 10,
      totalTrackedHours: Math.round(totalMinutes / 60 * 10) / 10,
      utilizationPercentage: Math.round(utilizationPercentage * 10) / 10,
      tasksCompleted: todayTasks.filter(task => task.completed).length,
      totalTasks: todayTasks.length,
      focusScore: Math.round((productiveMinutes / totalMinutes) * 100) || 0
    };
  };

  const startTimer = (taskId) => {
    setActiveTimer(taskId);
    setTimerSeconds(0);
  };

  const stopTimer = () => {
    setActiveTimer(null);
    // Add time tracking logic here
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleTaskComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'All' || task.category === filterCategory;
    const matchesDate = task.date === selectedDate;
    return matchesSearch && matchesCategory && matchesDate;
  });

  const AddTaskForm = () => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      category: 'Work',
      startTime: '',
      endTime: '',
      priority: 'medium',
      tags: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      const newTask = {
        id: Date.now().toString(),
        ...formData,
        completed: false,
        date: selectedDate,
        color: categories.find(cat => cat.name === formData.category)?.color || 'bg-gray-500',
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      setTasks([...tasks, newTask]);
      setShowAddTask(false);
      setFormData({ title: '', description: '', category: 'Work', startTime: '', endTime: '', priority: 'medium', tags: '' });
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 w-full max-w-md shadow-2xl transform transition-all`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>✨ Add New Task</h2>
            <button 
              onClick={() => setShowAddTask(false)}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ×
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="🎯 Task Title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className={`w-full p-3 border rounded-lg transition-all focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              required
            />
            <textarea
              placeholder="📝 Description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className={`w-full p-3 border rounded-lg transition-all focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              rows="2"
            />
            <div className="grid grid-cols-2 gap-3">
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className={`p-3 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              >
                {categories.map(cat => (
                  <option key={cat.name} value={cat.name}>{cat.icon} {cat.name}</option>
                ))}
              </select>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
                className={`p-3 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>
            </div>
            <div className="flex gap-3">
              <input
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                className={`flex-1 p-3 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                required
              />
              <input
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData({...formData, endTime: e.target.value})}
                className={`flex-1 p-3 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                required
              />
            </div>
            <input
              type="text"
              placeholder="🏷️ Tags (comma separated)"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              className={`w-full p-3 border rounded-lg ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
            />
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddTask(false)}
                className={`flex-1 py-3 rounded-lg transition-all ${darkMode ? 'bg-gray-600 text-white hover:bg-gray-500' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105"
              >
                ✨ Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const TaskCard = ({ task }) => (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 mb-3 shadow-lg border-l-4 ${task.color} transform transition-all hover:scale-102 hover:shadow-xl`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => toggleTaskComplete(task.id)}
            className="transform transition-all hover:scale-110"
          >
            {task.completed ? 
              <CheckCircle className="w-6 h-6 text-green-500 animate-pulse" /> : 
              <Circle className="w-6 h-6 text-gray-400 hover:text-green-500" />
            }
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : darkMode ? 'text-white' : 'text-gray-800'}`}>
                {task.title}
              </h3>
              <Star className={`w-4 h-4 ${getPriorityColor(task.priority)}`} />
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              ⏰ {task.startTime} - {task.endTime} • {categories.find(c => c.name === task.category)?.icon} {task.category}
            </p>
            {task.tags && task.tags.length > 0 && (
              <div className="flex gap-1 mt-1">
                {task.tags.map((tag, index) => (
                  <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          {activeTimer === task.id ? (
            <button 
              onClick={stopTimer}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
            >
              <Pause className="w-4 h-4" />
            </button>
          ) : (
            <button 
              onClick={() => startTimer(task.id)}
              className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-all"
            >
              <Play className="w-4 h-4" />
            </button>
          )}
          <button className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all">
            <Edit3 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => deleteTask(task.id)}
            className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      {task.description && (
        <p className={`mt-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {task.description}
        </p>
      )}
      {activeTimer === task.id && (
        <div className="mt-3 p-2 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-green-700">⏱️ Active Timer</span>
            <span className="font-mono text-green-700 font-bold">{formatTime(timerSeconds)}</span>
          </div>
        </div>
      )}
    </div>
  );

  const StatsCard = ({ icon, title, value, color, trend }) => (
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-lg transform transition-all hover:scale-105`}>
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color.replace('text-', 'bg-').replace('500', '100')}`}>
          {icon}
        </div>
      </div>
      {trend && (
        <div className="flex items-center mt-2">
          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
          <span className="text-sm text-green-500">+{trend}% from yesterday</span>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    const stats = calculateDailyStats();
    
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            {/* Motivational Quote */}
            <div className={`${darkMode ? 'bg-gradient-to-r from-purple-800 to-blue-800' : 'bg-gradient-to-r from-purple-500 to-blue-500'} rounded-xl p-4 text-white`}>
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-5 h-5" />
                <span className="font-semibold">Daily Motivation</span>
              </div>
              <p className="text-sm italic">"{motivationalQuote}"</p>
            </div>

            {/* Quick Stats */}
            {showStats && (
              <div className="grid grid-cols-2 gap-4">
                <StatsCard 
                  icon={<Target className="w-6 h-6" />}
                  title="Productivity"
                  value={`${stats.utilizationPercentage}%`}
                  color="text-blue-500"
                  trend="12"
                />
                <StatsCard 
                  icon={<Fire className="w-6 h-6" />}
                  title="Streak"
                  value={`${streak} days`}
                  color="text-orange-500"
                  trend="5"
                />
              </div>
            )}

            {/* Search and Filter */}
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className={`px-4 py-3 border rounded-xl ${darkMode ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
              >
                <option value="All">All</option>
                {categories.map(cat => (
                  <option key={cat.name} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Tasks */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-lg`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  📋 Today's Tasks ({filteredTasks.length})
                </h2>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-blue-500 font-medium">
                    {stats.focusScore}% focus score
                  </div>
                  <button
                    onClick={() => setShowStats(!showStats)}
                    className="p-2 text-gray-500 hover:text-blue-500 rounded-lg transition-all"
                  >
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {filteredTasks.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`} />
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {searchQuery || filterCategory !== 'All' ? 'No tasks match your filters' : 'No tasks for today. Add one to get started!'}
                  </p>
                </div>
              ) : (
                filteredTasks.map(task => (
                  <TaskCard key={task.id} task={task} />
                ))
              )}
            </div>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="space-y-6">
            {/* Achievement Banner */}
            <div className={`${darkMode ? 'bg-gradient-to-r from-yellow-800 to-orange-800' : 'bg-gradient-to-r from-yellow-400 to-orange-500'} rounded-xl p-4 text-white`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">🏆 Achievement Unlocked!</h3>
                  <p className="text-sm opacity-90">Productivity Master - 7 day streak!</p>
                </div>
                <Trophy className="w-8 h-8" />
              </div>
            </div>

            {/* Detailed Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <StatsCard 
                icon={<Target className="w-6 h-6" />}
                title="Utilization"
                value={`${stats.utilizationPercentage}%`}
                color="text-blue-500"
              />
              <StatsCard 
                icon={<Clock className="w-6 h-6" />}
                title="Productive Hours"
                value={`${stats.productiveHours}h`}
                color="text-green-500"
              />
              <StatsCard 
                icon={<CheckCircle className="w-6 h-6" />}
                title="Tasks Done"
                value={`${stats.tasksCompleted}/${stats.totalTasks}`}
                color="text-purple-500"
              />
              <StatsCard 
                icon={<Brain className="w-6 h-6" />}
                title="Focus Score"
                value={`${stats.focusScore}%`}
                color="text-orange-500"
              />
            </div>

            {/* Category Breakdown */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
              <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                📊 Time Distribution
              </h3>
              <div className="space-y-3">
                {categories.map(cat => {
                  const categoryTasks = tasks.filter(task => task.category === cat.name && task.date === selectedDate);
                  const totalMinutes = categoryTasks.reduce((acc, task) => {
                    const start = new Date(`2000-01-01 ${task.startTime}`);
                    const end = new Date(`2000-01-01 ${task.endTime}`);
                    return acc + (end - start) / (1000 * 60);
                  }, 0);
                  const hours = Math.round(totalMinutes / 60 * 10) / 10;
                  
                  if (hours > 0) {
                    return (
                      <div key={cat.name} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded ${cat.color}`} />
                          <span className={`${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            {cat.icon} {cat.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                            {hours}h
                          </span>
                          <div className="w-20 h-2 bg-gray-200 rounded-full">
                            <div 
                              className={`h-full rounded-full ${cat.color}`}
                              style={{ width: `${(hours / stats.totalTrackedHours) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>

            {/* Achievements */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
              <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                🏅 Achievements
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map(achievement => (
                  <div 
                    key={achievement.id}
                    className={`p-3 rounded-lg border-2 ${
                      achievement.unlocked 
                        ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20' 
                        : 'border-gray-300 bg-gray-50 dark:bg-gray-700'
                    }`}
                  >
                    <div className="text-2xl mb-1">{achievement.icon}</div>
                    <h4 className={`font-semibold text-sm ${
                      achievement.unlocked 
                        ? 'text-yellow-700 dark:text-yellow-300' 
                        : 'text-gray-500'
                    }`}>
                      {achievement.title}
                    </h4>
                    <p className={`text-xs ${
                      achievement.unlocked 
                        ? 'text-yellow-600 dark:text-yellow-400' 
                        : 'text-gray-400'
                    }`}>
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'calendar':
        return (
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg text-center`}>
            <Calendar className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>📅 Calendar View</h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>Coming Soon - Monthly & Weekly Views</p>
            <div className="flex justify-center gap-2">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all">
                Week View
              </button>
              <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all">
                Month View
              </button>
            </div>
          </div>
        );
      
      case 'profile':
        return (
          <div className="space-y-6">
            {/* Profile Header */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>John Doe</h3>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>john.doe@example.com</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Fire className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-orange-500 font-medium">{streak} day streak</span>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all">
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-medium">Export Data</span>
                </button>
                <button className="flex items-center gap-2 p-3 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-all">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Share Progress</span>
                </button>
              </div>

              {/* Settings */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Moon className="w-5 h-5 text-gray-500" />
                    <span className={darkMode ? 'text-white' : 'text-gray-800'}>Dark Mode</span>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`w-12 h-6 rounded-full ${darkMode ? 'bg-blue-500' : 'bg-gray-300'} relative transition-colors`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0.5'} absolute top-0.5`} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-gray-500" />
                    <span className={darkMode ? 'text-white' : 'text-gray-800'}>Notifications</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-gray-500" />
                    <span className={darkMode ? 'text-white' : 'text-gray-800'}>Preferences</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Stats Summary */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-lg`}>
              <h3 className={`text-lg font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                📈 Your Progress
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Total Tasks Completed</span>
                  <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>247</span>
                </div>
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Average Productivity</span>
                  <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>78%</span>
                </div>
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>Best Streak</span>
                  <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>21 days</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'} pb-20 transition-colors duration-300`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-4 sticky top-0 z-40 backdrop-blur-sm`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              ⚡ Productivity Tracker
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className={`text-sm ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} border-none rounded-lg px-2 py-1`}
              />
              <div className="flex items-center gap-1">
                <Fire className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-orange-500 font-medium">{streak}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {activeTimer && (
              <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                <Timer className="w-4 h-4 text-green-600" />
                <span className="text-sm font-mono text-green-600">{formatTime(timerSeconds)}</span>
              </div>
            )}
            <div className="text-right">
              <div className="text-sm text-blue-500 font-medium">
                {calculateDailyStats().productiveHours}h productive
              </div>
              <div className="text-xs text-gray-500">
                {calculateDailyStats().utilizationPercentage}% utilization
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {renderContent()}
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => setShowAddTask(true)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all z-30 flex items-center justify-center"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Bottom Navigation */}
      <div className={`fixed bottom-0 left-0 right-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} backdrop-blur-sm`}>
        <div className="flex items-center justify-around p-2">
          {[
            { id: 'home', icon: Clock, label: 'Tasks', color: 'text-blue-500' },
            { id: 'analytics', icon: BarChart3, label: 'Analytics', color: 'text-purple-500' },
            { id: 'calendar', icon: Calendar, label: 'Calendar', color: 'text-green-500' },
            { id: 'profile', icon: User, label: 'Profile', color: 'text-orange-500' }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center p-3 rounded-xl transition-all transform ${
                  isActive 
                    ? `${tab.color} scale-110 bg-opacity-10` 
                    : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'
                } hover:scale-105`}
              >
                <Icon className={`w-6 h-6 ${isActive ? 'animate-pulse' : ''}`} />
                <span className="text-xs mt-1 font-medium">{tab.label}</span>
                {isActive && <div className={`w-1 h-1 rounded-full ${tab.color.replace('text-', 'bg-')} mt-1`} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTask && <AddTaskForm />}
    </div>
  );
};

export default ProductivityApp;