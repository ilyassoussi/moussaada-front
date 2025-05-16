import React, { useEffect, useState } from 'react';

const GrowingPlantAnimation = ({ progress }) => {
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    if (progress === 0) {
      setAnimationStage(0);
    } else if (progress < 33) {
      setAnimationStage(1);
    } else if (progress < 66) {
      setAnimationStage(2);
    } else if (progress < 100) {
      setAnimationStage(3);
    } else {
      setAnimationStage(4);
    }
  }, [progress]);

  return (
    <div className="growing-plant relative w-28 h-28 mx-auto mb-6">
      {/* Soil Base */}
      <div className="absolute bottom-0 left-0 right-0 h-5 bg-amber-800 rounded-b-lg"></div>

      {/* Plant Growth Stages */}
      <div className={`plant-stage-1 ${animationStage >= 1 ? 'visible' : 'invisible'}`}>
        <div
          className="absolute bottom-5 left-1/2 -translate-x-1/2 w-1 h-4 bg-green-700 transition-all duration-500 ease-out"
          style={{ height: animationStage >= 1 ? '16px' : '0' }}
        ></div>
      </div>

      <div className={`plant-stage-2 ${animationStage >= 2 ? 'visible' : 'invisible'}`}>
        <div
          className="absolute bottom-[21px] left-1/2 -translate-x-1/2 w-6 h-3 transition-all duration-500 ease-out"
          style={{ opacity: animationStage >= 2 ? 1 : 0 }}
        >
          <div className="absolute bottom-0 left-0 w-6 h-3 bg-green-600 rounded-tl-full"></div>
          <div className="absolute bottom-0 right-0 w-6 h-3 bg-green-600 rounded-tr-full"></div>
        </div>
      </div>

      <div className={`plant-stage-3 ${animationStage >= 3 ? 'visible' : 'invisible'}`}>
        <div
          className="absolute bottom-[24px] left-1/2 -translate-x-1/2 w-1 h-6 bg-green-700 transition-all duration-500 ease-out"
          style={{ height: animationStage >= 3 ? '24px' : '0' }}
        ></div>
        <div
          className="absolute bottom-[48px] left-1/2 -translate-x-1/2 w-10 h-5 transition-all duration-500 ease-out"
          style={{ opacity: animationStage >= 3 ? 1 : 0 }}
        >
          <div className="absolute bottom-0 left-0 w-10 h-5 bg-green-500 rounded-tl-full"></div>
          <div className="absolute bottom-0 right-0 w-10 h-5 bg-green-500 rounded-tr-full"></div>
        </div>
      </div>

      <div className={`plant-stage-4 ${animationStage >= 4 ? 'visible' : 'invisible'}`}>
        <div
          className="absolute bottom-[53px] left-1/2 -translate-x-1/2 w-16 h-8 transition-all duration-700 ease-out"
          style={{ opacity: animationStage >= 4 ? 1 : 0 }}
        >
          <div className="absolute bottom-0 left-0 w-16 h-8 bg-green-400 rounded-tl-full"></div>
          <div className="absolute bottom-0 right-0 w-16 h-8 bg-green-400 rounded-tr-full"></div>
        </div>
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex justify-center">
          <div
            className={`w-6 h-6 bg-yellow-300 rounded-full transition-all duration-700 ease-out flex items-center justify-center ${animationStage >= 4 ? 'scale-100' : 'scale-0'}`}
          >
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Falling Leaves Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {animationStage >= 3 &&
          Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="absolute w-2 h-3 bg-green-400 rounded-full animate-falling-leaf"
              style={{
                left: `${10 + index * 20}%`,
                animationDelay: `${index * 1.5}s`,
                animationDuration: `${3 + index}s`,
              }}
            ></div>
          ))}
      </div>
    </div>
  );
};

export default GrowingPlantAnimation;
