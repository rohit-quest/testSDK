import React, { useState } from 'react';
import axios from 'axios';
import config from '../../config';
import OtpVerification from './OtpVerification';
import Loader from './Loader';
import { toast } from 'react-toastify';
import { alertLogo, crossLogo, emailLogo } from '../../assets/images';

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
  onSubmit?: ({ userId, token }: { userId: string, token: string }) => void;
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
  onSubmit,
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
      toast.error(
        'Invalid email address' + '\n' + 'Please check your email address'
      );
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
        <div className="questLabs">
          <div className='q-email-login-ctn'>
            <div style={{ color: textColor, fontFamily }} className="q-email-text">
              Email
            </div>
            <div className='q-email-input'>
              <img src={emailLogo} className='q-email-logo' alt='' />
              <img src={isValidEmail ? crossLogo : alertLogo} className='q-email-cross' alt='' onClick={() => setEmail("")} />
              <input
                id='q_email_login'
                type="text"
                placeholder="Enter your email id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyUp={handlesubmit}
                className="q-login-email-input"
              />
            </div>
            {!isValidEmail && (
              <div className="q-login-p">
                Please enter a valid email id
              </div>
            )}
            <div
              style={{
                backgroundColor: btnColor,
                fontFamily,
                color: btnTextColor,
              }}
              onClick={sendOTPfunction}
              className="q-email-btn-continue"
            >
              Continue
            </div>
          </div>
        </div>
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
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default EmailLogin;
