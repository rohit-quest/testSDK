import React, { useEffect, useState } from 'react';
import { googleImg } from '../assets/images';
import config from '../config';
import { arrow } from '../assets/images';
import axios from 'axios';

interface QuestLoginProps {
  color?: string;
  bgColor?: string;
  btnColor?: string;
  googleClientId?: string;
  redirectUri?: string;
  email?: boolean;
  google?: boolean;
  entityId?: string;
  userId?: string;
  btnTextColor?: string;
}

function QuestLogin(props: QuestLoginProps) {
  let {
    googleClientId,
    redirectUri,
  } = props;

  const [isEmail, setIsEmail] = useState(false);
  const [isGoogle, setIsGoogle] = useState(false);
  const [textColor, setTextColor] = useState('#000000');
  const [bgColor, setBgColor] = useState("#ffffff");
  const [btnColor, setBtnColor] = useState("#008CBA");
  const [fontFamily, setFontFamily] = useState("sans-serif");
  const [btnTextColor, setBtnTextColor] = useState("#ffffff");
  const [gradient, setGradient] = useState(false);

  useEffect(() => {
    const {
      btnColor,
      entityId,
      userId,
      email,
      google,
      btnTextColor,
    } = props;
  
    if (entityId) {
      const headers = {
        apiKey: config.QUEST_PROTOCOL_API_KEY,
        apisecret: config.QUEST_PROTOCOL_API_SECRET,
        userId: userId,
        token: "your_token_here", // Replace with your actual token
      };
      const request = `https://staging.questprotocol.xyz/api/entities/${entityId}?userId=${userId}`;
      axios
        .get(request, { headers: headers })
        .then((res) => {
          if (res.data.success === true) {
            const data = res.data.data.theme;
            setBgColor(data?.backgroundColor || '#ffffff');
            setTextColor(data?.accentColor || '#000000');
            setFontFamily(data?.fontFamily || 'sans-serif');
            setGradient(
              data?.backgroundColor?.includes('linear-gradient') ||
              data?.backgroundColor?.includes('radial-gradient')
            );
          }
        })
        .catch((err) => {
          console.log(err);
          setBgColor('#ffffff');
          setTextColor('#000000');
          setFontFamily('sans-serif');
          setGradient(false);
        });
    }
  
    if (btnColor) setBtnColor(btnColor);
    if (btnTextColor) setBtnTextColor(btnTextColor);
  
    setIsEmail(!email);
    setIsGoogle(!google);

  }, [props]);
  // function isValidEmail(email) {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return emailRegex.test(email);
  // }
  
  // function sendOTPfunction() {
  //   if (isValidEmail(emailRef.current.value) == false) {
  //     console.log("Invalid email address" + "\n" + "Please check yuor email address");
  //     return;
  //   }
  //   axios
  //     .post(
  //       `${config.BACKEND_URL}api/users/email-login/send-otp`,
  //       { email: emailRef.current.value },
  //       {
  //         headers: {
  //           apiKey: config.QUEST_PROTOCOL_API_KEY,
  //           apiSecret: config.QUEST_PROTOCOL_API_SECRET,
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       if (res.data.success == true) {
  //         setsendOTP(true);
  //         // timer()
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  return (
    <div style={{...(gradient ? { backgroundImage: bgColor } : { backgroundColor: bgColor })}} className='quest-login-container'>
    <h1 style={{ color: textColor, fontFamily }}>Login</h1>
    <h4 style={{ color: textColor, fontFamily }}>Choose an option to continue logging in with your account</h4>
    {isGoogle && (
      <a className='no-underline'
        href={`https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&scope=profile%20email&response_type=code`}
      >
        <div style={{
          marginTop: '40px',
          height: '50px',
          backgroundColor: btnColor,
          color: btnTextColor,
        }} className='q-btn-white px-3 py-2 mb-2'>
          <h5>Continue with Google</h5>
          <img style={{marginLeft: "auto"}} src={googleImg} alt="" />
        </div>
      </a>
    )}
    {isGoogle && isEmail ? (
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} className="mt-4 mb-4">
          <div style={{ width: '46%', height: '0px', border: '1px solid #374151' }}></div>
          <div className="q-helper-text q-text-grey-1">OR</div>
          <div style={{ width: '46%', height: '0px', border: '1px solid #374151' }}></div>
        </div>
        <h4 style={{ color: textColor, fontFamily }} className="mb-3">Continue with Email</h4>
        <div style={{ backgroundColor: btnColor, paddingRight: '10px' }} className="q-btn-white q-link q-text-black">
          <input
            className="custom-input q-button-sm q-fw-normal"
            id="inpBox"
            placeholder="eg. willietanner@xyz.com"
            type="email"
          />
          <img src={arrow} alt="arrow" style={{ cursor: "pointer" }} />
        </div>
      </div>
    ) : (
      isEmail && (
        <>
          <h4 style={{ color: textColor, fontFamily }} className="mb-3">Continue with Email</h4>
          <div style={{ backgroundColor: btnColor, paddingRight: '10px' }} className="q-btn-white q-link q-text-black">
            <input
              className="custom-input q-button-sm q-fw-normal"
              id="inpBox"
              placeholder="eg. willietanner@xyz.com"
              type="email"
            />
            <img src={arrow} alt="arrow" style={{ cursor: "pointer" }} />
          </div>
        </>
      )
    )}
    <p style={{ color: textColor, fontFamily }}>** Powered by Quest Labs</p>
  </div>
  );
}

export default QuestLogin;
