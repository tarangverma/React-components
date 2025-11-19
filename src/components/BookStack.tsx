import React, { useState } from 'react';

export default function HoverBook() {
  const [isHovered, setIsHovered] = useState(false);

  // Define rotation angles for each page when hovered
  const pageRotations = [
    'rotateY(-180deg)',
    'rotateY(-175deg)',
    
    'rotateY(-165deg)',
    
    'rotateY(-155deg)',
    'rotateY(-145deg)',
    
    'rotateY(-135deg)',
    
    'rotateY(-120deg)',
    
    'rotateY(-100deg)',
    
    'rotateY(-80deg)',
    
    'rotateY(-70deg)',
    
    'rotateY(-50deg)',
  
    'rotateY(-30deg)',
    'rotateY(-20deg)',
   
    'rotateY(-10deg)',
    'rotateY(0deg)'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 to-slate-800 flex items-center justify-center p-8">
      <div className="flex flex-col items-center gap-12">
        {/* Book Container */}
        <div
          className="relative w-74 h-100 cursor-pointer"
          style={{ perspective: '1200px' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Book wrapper with 3D transform */}
          <div
            className="relative w-full h-full transition-transform duration-700 ease-out"
            style={{
              transformStyle: 'preserve-3d',
              transform: isHovered ? 'rotateY(-15deg) rotateX(0deg)' : 'rotateZ(-5deg) rotateX(0deg) ',
            }}
          >
            {/* Pages */}
            {pageRotations.map((rotation, index) => (
              <div
                key={index}
                className="absolute inset-0 bg-white rounded-lg shadow-lg border-2 border-blue-300"
                style={{
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'left center',
                  transform: isHovered ? rotation : 'rotateZ(0deg)',
                  transition: `transform 0.6s ease-out ${index * 0.06}s`,
                  zIndex: pageRotations.length - index,
                }}
              >
                {/* Page content - only show on first page */}
                {index === 0 && (
                  <div className="w-full h-full flex items-center bg-blue-200/40 overflow-hidden justify-center p-8">
                    <div className="text-center">
                      <div className="w-24 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg border-2 border-blue-300"></div>
                      <h3 className="text-sm font-medium text-slate-700">Story Of My Life</h3>
                      <p className="text-xs text-slate-500 mt-1">Find Yourself</p>
                    </div>
                  </div>
                )}
                
                {/* Page lines for texture */}
                <div className="absolute right-4 top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent opacity-50"></div>
              </div>
            ))}

            {/* Book spine/shadow */}
            <div
              className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-slate-300 to-transparent rounded-l-sm"
              style={{ zIndex: pageRotations.length + 1 }}
            ></div>
          </div>
        </div>

        {/* Instructions */}
        <p className="text-slate-600 text-sm">Tarang Verma codes ♥</p>
      </div>
    </div>
  );
}