import React from 'react'
// import { useRef } from 'react';
import { useState } from 'react';
// import { toast } from 'react-toastify';
import axios from 'axios';
import config from '../../config';
// import OtpVerification from './OtpVerification';
interface emailLoginProps {
  color?: string;
  bgColor?: string;
  btnColor?: string;
  redirectUri?: string;
  email?: boolean;
  google?: boolean;
  entityId?: string;
  userId?: string;
  btnTextColor?: string;
  textColor?: string;
  fontFamily?: string;
  handleOtp?: boolean;
}

function EmailLogin({btnColor, redirectUri, color, handleOtp, entityId, textColor, fontFamily}:emailLoginProps) {
    // const [sendOTP, setsendOTP] = useState(false);
    const [email, setEmail] = useState("");
    const [sendOtp, setSendOTP] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(true);

    
    function handleSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
      if (e.key === 'Enter' && e.currentTarget.value !== '') {
        sendOTPfunction();
      }
      const newEmail = e.currentTarget.value;
      setEmail(newEmail);
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsValidEmail(emailRegex.test(newEmail));
    }

      function sendOTPfunction() {
       if (!isValidEmail) {
        return
       }
        axios
          .post(
            `${config.BACKEND_URL}api/users/email-login/send-otp?entityId=${entityId}`,
            { email: email },
            {
              headers: {
                apiKey: config.QUEST_PROTOCOL_API_KEY,
                apiSecret: config.QUEST_PROTOCOL_API_SECRET,
              },
            }
          )
          .then((res) => {
            if (res.data.success) {
              setSendOTP(true);
              // handleOtp(true);
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
          });
      }
      
  return (
    <div>
       <div style={{marginTop:"8%"}} className="mt-5">
       <h4 style={{ color: textColor, fontFamily }} className="mb-3 text-left text-18 font-normal">Email</h4>
       <input
          style={{paddingLeft:"10px"}}
          type="text"
          placeholder="Enter your email id"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
          onKeyUp={(e) => handleSubmit(e)}
          className={`w-full h-14 pl-10 pr-14 rounded-lg border ${isValidEmail ? 'border-gray-300' : 'border-red-500'} focus:ring ${isValidEmail ? 'focus:ring-blue-300' : 'focus:ring-red-300'}`}
        />
        {!isValidEmail && (
          <p className="mt-2 flex items-center text-red-500">
            <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">
              !
            </span>
            Please enter a valid email id
          </p>
        )}
      <div onClick={sendOTPfunction} className={`mt-5 continue-btn h-14 pl-4 pr-4 rounded-lg border px-3 bg-black text-white focus:ring focus:ring-blue-300 flex items-center justify-center`}>
        Continue
      </div>
      </div>
        {/* {sendOTP  && <OtpVerification {...{color, btnColor, redirectUri, entityId, email}} />} */}
    </div>
  )
}

export default EmailLogin
