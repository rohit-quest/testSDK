import React, { useState } from 'react';
import axios from 'axios';
import config from '../../config';
import OtpVerification from './OtpVerification';
import Loader from './Loader';
import { toast } from 'react-toastify';

interface EmailLoginProps {
  btnColor?: string;
  redirectUri?: string;
  redirectURL: string;
  handleOtp: (otp: boolean) => void;
  entityId: string;
  textColor?: string;
  btnTextColor?: string;
  fontFamily?: string;
  apiKey: string;
  apiSecret: string;
}

const EmailLogin: React.FC<EmailLoginProps> = ({
  btnColor,
  redirectURL,
  handleOtp,
  entityId,
  textColor,
  fontFamily,
  apiKey,
  apiSecret,
  btnTextColor,
}) => {
  const [sendOTP, setSendOTP] = useState(false);
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  const handlesubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value !== '') {
      sendOTPfunction();
    }
    const newEmail = e.currentTarget.value;
    setEmail(newEmail);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(newEmail));
  };

  const sendOTPfunction = () => {
    if (!isValidEmail || email.length === 0) {
      toast.error('Invalid email address' + '\n' + 'Please check your email address');
      return;
    }
    setShowLoader(true);
    axios
      .post(
        `${config.BACKEND_URL}api/users/email-login/send-otp?entityId=${entityId}`,
        { email: email },
        {
          headers: {
            apiKey: apiKey,
            apiSecret: apiSecret,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setSendOTP(true);
          handleOtp(true);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setShowLoader(false);
      });
  };

  return (
    <div>
      {showLoader && <Loader />}
      {!sendOTP && (
        <>
          <div style={{ marginTop: '8%' }} className="mt-5">
            <h4 style={{ color: textColor, fontFamily }} className="mb-3 text-left text-18 font-normal">
              Email
            </h4>
            <input
              style={{ paddingLeft: '10px' }}
              type="text"
              placeholder="Enter your email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyUp={handlesubmit}
              className={`w-full h-14 pl-10 pr-14 rounded-lg border ${
                isValidEmail ? 'border-gray-300' : 'border-red-500'
              } focus:ring ${isValidEmail ? 'focus:ring-blue-300' : 'focus:ring-red-300'}`}
            />
            {!isValidEmail && (
              <p className="mt-2 flex items-center text-red-500">
                <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">
                  !
                </span>
                Please enter a valid email id
              </p>
            )}
            <div
              style={{ backgroundColor: btnColor, fontFamily, color: btnTextColor }}
              onClick={sendOTPfunction}
              className={`mt-5 continue-btn h-14 pl-4 pr-4 rounded-lg border px-3 bg-black text-white focus:ring focus:ring-blue-300 flex items-center justify-center`}
            >
              Continue
            </div>
          </div>
        </>
      )}
      {sendOTP && (
        <OtpVerification
          apiKey={apiKey}
          apiSecret={apiSecret}
          fontFamily={fontFamily}
          textColor={textColor}
          btnColor={btnColor}
          redirectURL={redirectURL}
          entityId={entityId}
          email={email}
          btnTextColor={btnTextColor}
        />
      )}
    </div>
  );
};

export default EmailLogin;
