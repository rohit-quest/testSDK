import React, { useEffect, useState } from 'react';
import { googleImg } from '../assets/images';
import { arrow } from '../assets/images';
interface QuestLoginProps {
  color?: string;
  bgColor?: string;
  btnColor?: string;
  googleClientId?: string;
  redirectUri?: string;
  email?: boolean;
  wallet?: boolean;
  google?: boolean;
}

function QuestLogin(props: QuestLoginProps) {
  const [isEmail, setIsEmail] = useState(false);
  const [isGoogle, setIsGoogle] = useState(false);
  const [isWallet, setIsWallet] = useState(false);

  let {
    color = '#000000',
    bgColor = '#ffffff',
    btnColor = '#008CBA',
    googleClientId,
    redirectUri,
  } = props;

  useEffect(() => {
    let {
      email,
      wallet,
      google,
    } = props;

    if (!email && !google && !wallet) {
      setIsEmail(true);
      setIsGoogle(true);
      setIsWallet(true);
    } else {
      setIsEmail(!!email);
      setIsGoogle(!!google);
      setIsWallet(!!wallet);
    }
  }, [props.email, props.wallet, props.google]);
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
    <div style={{
      backgroundColor: bgColor,
      color,
    }} className='quest-login-container'>
    <h1 style={{ color }}>Login</h1>
    <h4 style={{ color }}>Choose an option to continue logging in with your account</h4>
    {isGoogle && (
      <a className='no-underline'
        href={`https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&scope=profile%20email&response_type=code`}
      >
        <div style={{
          marginTop: '40px',
          height: '50px',
          backgroundColor: btnColor,
          color: 'white',
        }} className='q-btn-white px-3 py-2 mb-2'>
          Continue with Google
          <img style={{marginLeft: "auto"}} src={googleImg} alt="" />
        </div>
      </a>
    )}
    {isWallet && (
      <div
        style={{
          marginTop: '20px',
          height: '50px',
          backgroundColor: btnColor,
          color: 'white',
        }} className='q-btn-white px-3 py-2 mb-2'>
        Continue with Wallet
      </div>
    )}
    {isWallet && isGoogle && isEmail ? (
      <div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} className="mt-4 mb-4">
          <div style={{ width: '46%', height: '0px', border: '1px solid #374151' }}></div>
          <div className="q-helper-text q-text-grey-1">OR</div>
          <div style={{ width: '46%', height: '0px', border: '1px solid #374151' }}></div>
        </div>
        <h4 style={{ color }} className="mb-3">Continue with Email</h4>
        <div style={{ backgroundColor: btnColor, paddingRight: '10px' }} className="q-btn-white q-link q-text-black">
          <input
            className="custom-input q-button-sm q-fw-normal"
            id="inpBox"
            placeholder="eg. willietanner@xyz.com"
            type="email"
            style={{ color: 'white' }}
          />
          <img src={arrow} alt="arrow" style={{ cursor: "pointer" }} />
        </div>
      </div>
    ) : (
      isEmail && (
        <>
          <h4 style={{ color }} className="mb-3">Continue with Email</h4>
          <div style={{ backgroundColor: btnColor, paddingRight: '10px' }} className="q-btn-white q-link q-text-black">
            <input
              className="custom-input q-button-sm q-fw-normal"
              id="inpBox"
              placeholder="eg. willietanner@xyz.com"
              type="email"
              style={{ color: 'white' }}
            />
            <img src={arrow} alt="arrow" style={{ cursor: "pointer" }} />
          </div>
        </>
      )
    )}
    <p>** Powered by Quest Labs</p>
  </div>
  );
}

export default QuestLogin;
