import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VerificationInput from '../../../components/ValidationNumber/VerificationInput';
import ResendCodeButton from '../../../components/ValidationNumber/ResendCodeButton';
import GrowingPlantAnimation from '../../../components/ValidationNumber/GrowingPlantAnimation';
import FloatingLeaves from '../../../components/ValidationNumber/FloatingLeaves';
import { ArrowLeft, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import Swal from 'sweetalert2'
import '../../../styles/animations.css';

import { ValidateNumber } from '../../../services/api';
import { Navigate } from 'react-router-dom';

const VerificationPage = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationStatus, setVerificationStatus] = useState('idle');
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const idcompte = localStorage.getItem('id_compte'); 

  useEffect(() => {
    const codeLength = verificationCode.length;
    setProgress((codeLength * 100) / 6); // Assuming 6-digit code
  }, [verificationCode]);

  const handleVerificationComplete = (code) => {
    setVerificationCode(code);
    if (code.length === 6) {
      verifyCode(code);
    }
  };

  const verifyCode = async (code) => {
    setVerificationStatus('loading');
    setMessage('Verifying your code...');

    try {
      const result = await ValidateNumber(idcompte, code);

      if (result.code === 200 ) {
        setVerificationStatus('success');
        setMessage('Verification successful! Redirecting you...');
        Swal.fire({
          title: "Warning!",
          text: result.message,
          icon: "warning",
          draggable: true
        });
        navigate('/login');
      } else {
        setVerificationStatus('error');
        setMessage(result || 'Invalid verification code. Please try again.');
      }
    } catch (error) {
      setVerificationStatus('error');
      setMessage(
        error?.message || 'An error occurred during verification. Please try again.'
      );
    }
  };

  const handleResendCode = () => {
    setMessage('A new verification code has been sent!');
    setTimeout(() => {
      setMessage('');
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50 flex flex-col items-center justify-center px-4 relative">
      <FloatingLeaves />

      <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 w-full max-w-md relative z-10 overflow-hidden">
        <button
          className="absolute top-4 left-4 text-gray-500 hover:text-green-700 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Verify Your Account</h1>
          <p className="text-gray-600">
            Please enter the 6-digit code sent to your phone number
          </p>
        </div>

        <GrowingPlantAnimation progress={progress} />

        <VerificationInput
          length={6}
          onComplete={handleVerificationComplete}
        />

        <div className="mt-6 text-center min-h-[24px]">
          {verificationStatus === 'loading' && (
            <div className="flex items-center justify-center gap-2 text-amber-600">
              <Loader2 size={18} className="animate-spin" />
              <span>{message}</span>
            </div>
          )}

          {verificationStatus === 'success' && (
            <div className="flex items-center justify-center gap-2 text-green-600">
              <CheckCircle2 size={18} />
              <span>{message}</span>
            </div>
          )}

          {verificationStatus === 'error' && (
            <div className="flex items-center justify-center gap-2 text-red-600">
              <AlertTriangle size={18} />
              <span>{message}</span>
            </div>
          )}

          {verificationStatus === 'idle' && message && (
            <p className="text-green-600">{message}</p>
          )}
        </div>

        <div className="text-center">
          <ResendCodeButton onResend={handleResendCode} cooldownTime={60} />
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-green-700 font-semibold">MOUSSAADA</p>
        </div>

        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-green-100 rounded-full opacity-50"></div>
        <div className="absolute -top-10 -left-10 w-24 h-24 bg-amber-100 rounded-full opacity-50"></div>
      </div>
    </div>
  );
};

export default VerificationPage;
