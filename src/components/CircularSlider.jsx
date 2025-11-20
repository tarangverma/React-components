import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CardCarousel = () => {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentRotation, setCurrentRotation] = useState(0);

  const cards = [
    {
      title: "FoodSocial",
      subtitle: "Explore delicious recipes",
      bg: "from-orange-500 to-pink-500",
      image: "https://images.unsplash.com/photo-1618418721668-0d1f72aa4bab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGx1eHVyeSUyMGNhcnxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      title: "Gear Up",
      subtitle: "One-stop fitness",
      bg: "from-blue-500 to-purple-600",
      image: "https://images.unsplash.com/photo-1541348263662-e068662d82af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bHV4dXJ5JTIwY2FyfGVufDB8fDB8fHww"
    },
    {
      title: "StyleHub",
      subtitle: "Track your outfits",
      bg: "from-purple-500 to-indigo-600",
      image: "https://images.unsplash.com/photo-1601929862217-f1bf94503333?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bHV4dXJ5JTIwY2FyfGVufDB8fDB8fHww"
    },
    {
      title: "TechZone",
      subtitle: "Latest gadgets",
      bg: "from-cyan-500 to-blue-600",
      image: "https://images.unsplash.com/photo-1614200179396-2bdb77ebf81b?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bHV4dXJ5JTIwY2FyfGVufDB8fDB8fHww"
    },
    {
      title: "TravelMap",
      subtitle: "Plan your journey",
      bg: "from-green-500 to-teal-600",
      image: "https://www.spinny.com/blog/wp-content/uploads/2024/09/videoframe_0-1536x864.webp"
    }
  ];

  const anglePerCard = 360 / cards.length;

  const handlePrevious = () => {
    setRotation(prev => prev + anglePerCard);
  };

  const handleNext = () => {
    setRotation(prev => prev - anglePerCard);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentRotation(rotation);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    const rotationChange = deltaX * 0.5;
    setRotation(currentRotation + rotationChange);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentRotation(rotation);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startX;
    const rotationChange = deltaX * 0.5;
    setRotation(currentRotation + rotationChange);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, startX, currentRotation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-indigo-600/30 backdrop-blur-sm px-6 py-2 rounded-full border border-indigo-400/30 mb-6">
            <code className="text-indigo-300 text-sm">Tarang Verma Codes ♥</code>
          </div>
        </div>

        {/* 3D Carousel Container */}
        <div className="relative h-[600px] flex items-center justify-center">
          <div 
            className="relative w-full h-full perspective-[2000px] cursor-grab active:cursor-grabbing select-none"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ perspective: '2000px' }}
          >
            <div
              className="relative w-full h-full transition-transform duration-700 ease-out"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateY(${rotation}deg)`
              }}
            >
              {cards.map((card, index) => {
                const angle = anglePerCard * index;
                const radius = 450;
                
                return (
                  <div
                    key={index}
                    className="absolute top-1/2 left-1/2 w-80 h-96 -ml-40 -mt-48"
                    style={{
                      transformStyle: 'preserve-3d',
                      transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    }}
                  >
                    <div className={`relative w-full h-full bg-gradient-to-br bg-${card.image} rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:scale-110 border border-white/20`}>
                      {/* Card Content */}
                      <div className="absolute inset-0 p-8 flex flex-col justify-between">
                        {/* Top Section */}
                        {/* <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <img src={card.image} />
                          </div>
                          <span className="text-white font-semibold text-lg">{card.title}</span>
                        </div> */}

                        {/* Center - Large Icon */}
                        {/* <div className="flex items-center justify-center">
                          <div className="text-9xl opacity-90 transform hover:scale-110 transition-transform duration-300">
                            <img src={card.image} />
                          </div>
                        </div> */}

                        {/* Bottom Section */}
                        {/* <div className="text-center">
                          <h3 className="text-white text-2xl font-bold mb-2">
                            {card.title.toUpperCase()}
                          </h3>
                          <p className="text-white/80 text-sm">{card.subtitle}</p>
                        </div> */}
                      </div>

                      {/* Decorative Elements */}
                      <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
                      </div>

                      {/* Code Background Effect */}
                      <div className="absolute inset-0 opacity-5 pointer-events-none">
                        <div className="text-xs text-white p-4 font-mono">
                          <div>{'{ component: true }'}</div>
                          <div className="mt-2">{'render() {'}</div>
                          <div className="ml-4">{'return <div />'}</div>
                          <div>{'}'}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          {/* <button
            onClick={handlePrevious}
            className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 hover:scale-110 z-10"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button> */}
          
          {/* <button
            onClick={handleNext}
            className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-md hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 border border-white/20 hover:scale-110 z-10"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button> */}
        </div>

        {/* Instructions */}
        <div className="text-center mt-12">
          {/* <p className="text-white/60 text-sm">
            ← → Use arrows or drag to rotate • Hover to scale
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default CardCarousel;