import React, { useState, useEffect } from 'react';

const ResendCodeButton = ({ onResend, cooldownTime = 60 }) => {
  const [countdown, setCountdown] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let timer;

    if (isActive && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsActive(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown, isActive]);

  const handleResend = () => {
    if (!isActive) {
      onResend();
      setCountdown(cooldownTime);
      setIsActive(true);
    }
  };

  return (
    <div className="mt-6">
      {!isActive ? (
        <button
          onClick={handleResend}
          className="text-green-700 hover:text-green-800 font-medium transition-colors duration-200 flex items-center gap-1 group"
          aria-label="Resend verification code"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="group-hover:rotate-45 transition-transform duration-300"
          >
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <path d="M3 3v5h5"></path>
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
            <path d="M16 21h5v-5"></path>
          </svg>
          Resend code
        </button>
      ) : (
        <div className="text-gray-600 flex items-center gap-1">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          Resend available in {countdown} seconds
        </div>
      )}
    </div>
  );
};

export default ResendCodeButton;
