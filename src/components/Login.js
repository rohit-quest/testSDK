import React, { useEffect, useState } from 'react';
import googleImg from '../img/google.png';
import arrow from '../img/arrow.png';
import queryString from "query-string";

function QuestLogin(props) {
  const {
    color = '#000000',
    bgColor = '#ffffff',
    btnColor = '#008CBA',
    googleClientId, //= '867106888033-a6ml9eisjtos8al0eel6fbcsjh8bst3l.apps.googleusercontent.com'
    redirectUri, // = "https://beta.questapp.xyz/loginv2"
    email = true,
    wallet = true,
    google = true, 
  } = props;
  const source = 'WEB';

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
    <div
      style={{
        backgroundColor: bgColor,
        color,
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '10% 20%',
        textAlign: 'center',
      }}
    >
      <h1 style={{ color }}>Login</h1>
      <h4 style={{ color }}>
        Choose an option to continue logging in with your account
      </h4>
      {google && (
        <a
          href={`https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&scope=profile%20email&response_type=code`}
        >
          <div
            className="q-btn-white q-link q-text-black px-3 py-2 w-100 mb-3"
            style={{
              marginTop: '40px',
              height: '50px',
              backgroundColor: btnColor,
              color: 'white',
            }}
          >
            Continue with Google
            <img className="ms-auto" src={googleImg} alt="" />
          </div>
        </a>
      )}
      {wallet && (
        <div
          className="q-btn-white q-link q-gradient-background q-text-white px-3 py-2 w-100"
          style={{ zIndex: 0, backgroundColor: btnColor, height: '50px' }}
        >
          Continue with Wallet
        </div>
      )}
      {email && (
        <div>
            <div className="mt-4 mb-4 d-flex align-items-center justify-content-between">
          <div
            style={{
              width: '46%',
              height: '0px',
              border: '1px solid #374151',
            }}
          ></div>
          <div className="q-helper-text q-text-grey-1">OR</div>
          <div
            style={{
              width: '46%',
              height: '0px',
              border: '1px solid #374151',
            }}
          ></div>
        </div>
          <h4 style={{ color }} className="mb-3">
            Continue with Email
          </h4>
          <div
            className="q-btn-white q-link q-text-black"
            id="addFilter"
            style={{ backgroundColor: btnColor, paddingRight: '10px' }}
          >
            <input
              style={{ border: 'none', color, backgroundColor: btnColor, borderRadius: '8px 0 0 8px' }}
              className="q-button-sm q-fw-normal"
              id="inpBox"
              placeholder="eg. willietanner@xyz.com"
              type="email"
            />
            <img src={arrow} alt="arrow" className="cursor-pointer" />
          </div>
        </div>
      )}
      <p style={{ color, fontSize: '10px' }}>** Powered by Quest Labs</p>
    </div>
  );
}

export default QuestLogin;
