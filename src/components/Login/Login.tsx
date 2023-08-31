import React, { useEffect, useState } from 'react';
import EmailLogin from './EmailLogin';
import GoogleLogin from './GoogleLogin';
// import config from '../../config';
// import axios from 'axios';

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
    entityId
  } = props;

  const [isEmail, setIsEmail] = useState(false);
  const [isGoogle, setIsGoogle] = useState(false);
  const [textColor, setTextColor] = useState('#000000');
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fontFamily, setFontFamily] = useState("sans-serif");
  const [btnColor, setBtnColor] = useState("#008CBA");
  const [btnTextColor, setBtnTextColor] = useState("#ffffff");
  const [gradient, setGradient] = useState(false);
  const [showLoader, setShowLoader] = useState(false); 

  useEffect(() => {
    const {
      btnColor,
      userId,
      email,
      google,
      btnTextColor,
    } = props;
  
    // if (entityId) {
    //   const headers = {
    //     apiKey: config.QUEST_PROTOCOL_API_KEY,
    //     apisecret: config.QUEST_PROTOCOL_API_SECRET,
    //     userId: userId,
    //     token: "your_token_here", // Replace with your actual token
    //   };
    //   const request = `https://staging.questprotocol.xyz/api/entities/${entityId}?userId=${userId}`;
    //   axios
    //     .get(request, { headers: headers })
    //     .then((res) => {
    //       if (res.data.success === true) {
    //         const data = res.data.data?.theme;
    //         setBgColor(data?.backgroundColor || '#ffffff');
    //         setTextColor(data?.accentColor || '#000000');
    //         setFontFamily(data?.fontFamily || 'sans-serif');
    //         setGradient(
    //           data?.backgroundColor?.includes('linear-gradient') ||
    //           data?.backgroundColor?.includes('radial-gradient')
    //         );
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       setBgColor('#ffffff');
    //       setTextColor('#000000');
    //       setFontFamily('sans-serif');
    //       setGradient(false);
    //     });
    // };
  
    if (btnColor) setBtnColor(btnColor);
    if (btnTextColor) setBtnTextColor(btnTextColor);
    if (email) setIsEmail(email);
    if (google) setIsGoogle(google);
    if (!google && !email) {
      setIsGoogle(true);
      setIsEmail(true)
    }

  }, [props]);
 
  return (
    <div className="flex items-center justify-center h-screen">
      <div
        style={{
          ...(gradient
            ? { backgroundImage: bgColor }
            : { backgroundColor: bgColor }),
          width: "534px",
          height: "561px",
          borderRadius: "10px",
          boxShadow: "0px 0px 6px 0px #00000073"
        }}
        className="quest-login-container"
      >
        <div style={{padding:"5% 10%"}}>
          <h1
            className="font-bold text-4xl text-center"
            style={{ color: textColor, fontFamily }}
          >
            Welcome Back
          </h1>
          {/* {showLoader && <Loader />} */}
          <h4
            className="font-normal mb-4 text-center"
            style={{ color: textColor, fontFamily }}
          >
            Welcome Back, Please enter your details
          </h4>
          {isEmail && (
            <div className="w-full">
              <EmailLogin {...{ textColor, fontFamily, btnColor }} />
              {isGoogle && (
                <div className="mt-5 flex items-center justify-between">
                  <div className="flex-grow border-2 border-solid border-gray-700"></div>
                  <span className="whitespace-no-wrap px-4">
                    Or Continue With
                  </span>
                  <div className="flex-grow border-2 border-solid border-gray-700"></div>
                </div>
              )}
              {isGoogle && (
                <GoogleLogin {...{ textColor, fontFamily, btnColor, entityId }} />
              )}
            </div>
          )}
          {!isEmail && isGoogle && (
            <GoogleLogin {...{ textColor, fontFamily, btnColor }} />
          )}
          <p className="mt-3 text-sm text-center" style={{ color: textColor, fontFamily }}>
            ** Powered by Quest Labs
          </p>
        </div>
      </div>
    </div>
  );
}

export default QuestLogin;
