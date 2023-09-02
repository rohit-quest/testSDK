import React, { useEffect, useState } from 'react';
import { useContext } from "react";
import QuestContext from '../QuestWrapper';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import config from '../../config';
import EmailLogin from './EmailLogin';
import GoogleLogin from './GoogleLogin';
import { ToastContainer } from 'react-toastify';
export interface QuestLoginProps {
  googleClientId: string;
  redirectUri: string;
  redirectURL: string;
  btnColor?: string;
  email?: boolean;
  google?: boolean;
  btnTextColor?: string;
  textColor?: string;
  backgroundColor?: string;
  font?: string;
}

const QuestLogin: React.FC<QuestLoginProps> = ({
  googleClientId,
  redirectUri,
  redirectURL,
  btnColor,
  email,
  google,
  btnTextColor,
  textColor,
  backgroundColor,
  font,
}) => {
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isGoogle, setIsGoogle] = useState<boolean>(false);
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [fontFamily, setFontFamily] = useState<string>('sans-serif');
  const [gradient, setGradient] = useState<boolean>(false);
  const [otpScreen, setOtpScreen] = useState<boolean>(false);
  const { apiKey, apiSecret, entityId } = useContext(QuestContext.Context);

  const handleOtp = (val: boolean) => {
    setOtpScreen(val);
  };
  useEffect(() => {
    if (entityId) {
      const request = `${config.BACKEND_URL}api/entities/${entityId}/get-theme`;
      axios
        .get(request)
        .then((res) => {
          console.log(res.data);
          if (res.data.success === true) {
            const data = res.data.theme;
            if (data) {
              setBgColor(data?.backgroundColor || '#ffffff');
              setFontFamily(data?.fontFamily || 'sans-serif');
              setGradient(
                data?.backgroundColor?.includes('linear-gradient') ||
                  data?.backgroundColor?.includes('radial-gradient')
              );
            } else {
              if (backgroundColor) {
                setBgColor(backgroundColor);
              } else {
                setBgColor('#ffffff');
              }
              setFontFamily('sans-serif');
              setGradient(false);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          if (backgroundColor) {
            setBgColor(backgroundColor);
          } else {
            setBgColor('#ffffff');
          }
          setFontFamily('sans-serif');
          setGradient(false);
        });
    }

    if (btnColor) setBgColor(btnColor);
    if (backgroundColor) setBgColor(backgroundColor);
    if (font) setFontFamily(font);

    setIsEmail(email || false);
    setIsGoogle(google || false);

    if (!google && !email) {
      setIsGoogle(true);
      setIsEmail(true);
    }
  }, [entityId, btnColor, backgroundColor, email, google, btnTextColor]);

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center h-screen">
        <div
          style={{
            ...(gradient
              ? { backgroundImage: bgColor }
              : { backgroundColor: bgColor }),
            width: '534px',
            height: '561px',
            borderRadius: '10px',
            boxShadow: '0px 0px 6px 0px #00000073',
          }}
          className="quest-login-container"
        >
          <div style={{ padding: '10% 10%' }}>
            {!otpScreen && (
              <>
                <h1
                  className="font-bold text-4xl text-center"
                  style={{ color: textColor, fontFamily }}
                >
                  Welcome Back
                </h1>
                <h4
                  className="font-normal mb-4 text-center"
                  style={{ color: textColor, fontFamily }}
                >
                  Welcome Back, Please enter your details
                </h4>
              </>
            )}
            {isEmail && (
              <div className="w-full">
                <EmailLogin
                  {...{
                    textColor,
                    fontFamily,
                    apiKey,
                    apiSecret,
                    redirectURL,
                    btnColor,
                    entityId,
                    handleOtp,
                    redirectUri,
                    btnTextColor,
                  }}
                />
                {!otpScreen && isGoogle && (
                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex-grow border-2 border-solid border-gray-700"></div>
                    <span
                      style={{ color: textColor, fontFamily }}
                      className="whitespace-no-wrap px-4"
                    >
                      Or Continue With
                    </span>
                    <div className="flex-grow border-2 border-solid border-gray-700"></div>
                  </div>
                )}
                {!otpScreen && isGoogle && (
                  <GoogleLogin
                    {...{
                      btnTextColor,
                      fontFamily,
                      btnColor,
                      entityId,
                      redirectUri,
                      redirectURL,
                      googleClientId,
                      apiSecret,
                      apiKey,
                    }}
                  />
                )}
              </div>
            )}
            {!isEmail && isGoogle && (
              <GoogleLogin
                {...{
                  btnTextColor,
                  fontFamily,
                  btnColor,
                  entityId,
                  redirectUri,
                  redirectURL,
                  googleClientId,
                  apiSecret,
                  apiKey,
                }}
              />
            )}
            <p
              className="mt-3 text-sm text-center"
              style={{ color: textColor, fontFamily }}
            >
              ** Powered by Quest Labs
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestLogin;
