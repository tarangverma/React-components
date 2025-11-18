import React, { useState } from 'react';
import Coins from '../assets/coin.svg';
import Flower2 from '../assets/flower.svg';
import Bird from '../assets/penguin.svg';
import Camera from '../assets/camera.svg';
import Target from '../assets/target.svg';
import Plane from '../assets/plane.svg';
import Ticket from '../assets/ticket.svg';
import Tent from '../assets/circus.svg';
import Luggage from '../assets/luggage.svg';
import UtensilsCrossed from '../assets/food.svg';
import BookOpen from '../assets/notebook.svg';
import Google from '../assets/google.svg';
import Maps from '../assets/maps.svg';
import Casino from '../assets/casino.svg';
import { motion, useAnimation } from 'framer-motion';

const FloatingItem = ({ icon, initialX, initialY, side, index }) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isFloating, setIsFloating] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setIsFloating(false);
    setVelocity({ x: 0, y: 0 });
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      const velX = (newX - position.x) * 3;
      const velY = (newY - position.y) * 3;
      
      setVelocity({ x: velX, y: velY });
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (Math.abs(velocity.x) > 2 || Math.abs(velocity.y) > 2) {
      setIsFloating(true);
    }
  };

  React.useEffect(() => {
    if (isFloating && !isDragging) {
      const animate = () => {
        setPosition(prev => {
          const newX = prev.x + velocity.x;
          const newY = prev.y + velocity.y;
          
          if (newX < -200 || newX > window.innerWidth + 100 || 
              newY < -200 || newY > window.innerHeight + 100) {
            setIsRemoved(true);
            return prev;
          }
          
          return { x: newX, y: newY };
        });
        
        setVelocity(prev => ({
          x: prev.x * 0.92,
          y: prev.y * 0.92
        }));
      };
      
      const id = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(id);
    }
  }, [isFloating, velocity, isDragging]);

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart, position]);

  if (isRemoved) return null;

  // Animation variants for entrance
  const itemVariants = {
    hidden: {
      x: side === 'left' ? -200 : 200,
      opacity: 0,
      scale: 0.5
    },
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.div
      className={`absolute text-6xl cursor-grab select-none ${
        isDragging ? 'scale-100 cursor-grabbing' : ''
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: isDragging ? 0.8 : 1,
      }}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.05 }}
      onMouseDown={handleMouseDown}
    >
      <div className="text-purple-600 drop-shadow-lg">
        {icon}
      </div>
    </motion.div>
  );
};

export default function HeroSection() {
  const [items] = useState([
    { icon: <img src={Maps} alt="Coin" className="w-60 h-60" draggable={false} />, initialX: 700, initialY: -100, side: 'left' },
    
    { icon: <img src={Casino} alt="Coin" className="w-50 h-50" draggable={false} />, initialX: 1700, initialY: 100, side: 'left' },
    { icon: <img src={Coins} alt="Coin" className="w-50 h-50" draggable={false} />, initialX: 50, initialY: 100, side: 'left' },
    { icon: <img src={Flower2} alt="Coin" className="w-50 h-50" draggable={false} />, initialX: 350, initialY: 300, side: 'left' },
    { icon: <img src={BookOpen} alt="Coin" className="w-50 h-50" draggable={false} />, initialX: 40, initialY: 500, side: 'left' },
    { icon: <img src={Luggage} alt="Coin" className="w-50 h-50" draggable={false} />, initialX: 440, initialY: 50, side: 'left' },
    { icon: <img src={UtensilsCrossed} alt="Coin" className="w-50 h-50" draggable={false} />, initialX: 40, initialY: 700, side: 'left' },
    { icon: <img src={Camera} alt="Coin" className="w-50 h-50" draggable={false} />, initialX: 500, initialY: 600, side: 'left' },
    { icon: <img src={Tent} alt="Coin" className="w-50 h-50" draggable={false} />, initialX: typeof window !== 'undefined' ? window.innerWidth - 840 : 800, initialY: 50, side: 'right' },
    { icon: <img src={Target} alt="Coin" className="w-50 h-50" draggable={false} />, initialX: typeof window !== 'undefined' ? window.innerWidth - 550 : 1000, initialY: 150, side: 'right' },
    { icon: <img src={Bird} alt="Coin" className="w-50 h-50" draggable={false} />, initialX: typeof window !== 'undefined' ? window.innerWidth - 120 : 1200, initialY: 350, side: 'right' },
    { icon: <img src={Plane} alt="Coin" className="w-50 h-50" draggable={false} />, initialX: typeof window !== 'undefined' ? window.innerWidth - 340 : 1100, initialY: 550, side: 'right' },
    { icon: <img src={Ticket} alt="Coin" className="w-50 h-50" draggable={false} />, initialX: typeof window !== 'undefined' ? window.innerWidth - 640 : 900, initialY: 750, side: 'right' },
  ]);

  return (
    <div className="relative w-full h-screen bg-[#EDE8D0]  overflow-hidden">
      {/* Floating Items */}
      {items.map((item, index) => (
        <FloatingItem
          key={index}
          icon={item.icon}
          initialX={item.initialX}
          initialY={item.initialY}
          side={item.side}
          index={index}
        />
      ))}

      {/* Main Content */}
      <motion.div 
        className="flex items-center justify-center h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="text-center max-w-3xl px-8">
          <motion.h1 
            className="text-6xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.9 }}
          >
            Create Something Amazing
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            Drag the creative tools away to clear your canvas and start your journey
          </motion.p>
          <motion.button 
            className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </div>
      </motion.div>

      {/* Instruction */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        Tarang Verma codes ♥
      </motion.div>
    </div>
  );
}
