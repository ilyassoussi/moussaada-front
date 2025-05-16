import React, { useState, useRef, useEffect } from 'react';

const VerificationInput = ({ length = 6, onComplete }) => {
  const [code, setCode] = useState(Array(length).fill(''));
  const inputRefs = useRef([]);

  // Initialiser la liste des refs
  useEffect(() => {
    inputRefs.current = Array(length).fill(null);
  }, [length]);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newCode.every(digit => digit !== '')) {
      onComplete(newCode.join(''));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').trim();

    if (!/^\d+$/.test(pastedData)) return;

    const newCode = [...code];
    for (let i = 0; i < Math.min(length, pastedData.length); i++) {
      newCode[i] = pastedData[i];
    }

    setCode(newCode);

    const nextEmptyIndex = newCode.findIndex(digit => digit === '');
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[length - 1]?.focus();
      if (newCode.every(digit => digit !== '')) {
        onComplete(newCode.join(''));
      }
    }
  };

  return (
    <div className="verification-input-container">
      <div className="flex justify-center space-x-2 md:space-x-4">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            className="w-12 h-16 md:w-14 md:h-16 text-center text-2xl font-bold rounded-lg border-2 border-green-600 focus:border-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none transition-all duration-200 bg-white"
            value={code[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={index === 0 ? handlePaste : undefined}
            ref={(el) => (inputRefs.current[index] = el)}
            aria-label={`Digit ${index + 1} of verification code`}
          />
        ))}
      </div>
    </div>
  );
};

export default VerificationInput;
