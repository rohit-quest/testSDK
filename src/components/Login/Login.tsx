import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import QuestContext from '../QuestWrapper';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import config from '../../config';
import EmailLogin from './EmailLogin';
import GoogleLogin from './GoogleLogin';
import { ToastContainer } from 'react-toastify';
import './Login.css';
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
    <div className="questLabs">
      <ToastContainer />
      <div className="q-parent-container">
        <div
          style={{
            ...(gradient
              ? { backgroundImage: bgColor }
              : { backgroundColor: bgColor }),
          }}
          className="q-login-container"
        >
          <div style={{ padding: '6%' }}>
            {!otpScreen && (
              <>
                <h1
                  className="q-login-h1"
                  style={{
                    color: textColor,
                    fontFamily: fontFamily,
                  }}
                >
                  Welcome Back
                </h1>
                <h4
                  className="q-login-h4"
                  style={{
                    color: textColor,
                    fontFamily: fontFamily,
                  }}
                >
                  Welcome Back, Please enter your details
                </h4>
              </>
            )}
            {isEmail && (
              <div
                style={{
                  width: '100%',
                }}
              >
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
                  <div className="q-login-or-container">
                    <div className="login-or-line"></div>
                    <span
                      style={{
                        color: textColor,
                        fontFamily,
                        whiteSpace: 'nowrap',
                        padding: '0.5rem',
                      }}
                    >
                      Or Continue With
                    </span>
                    <div className="login-or-line"></div>
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
              className="powered-by"
              style={{
                color: textColor,
                fontFamily,
              }}
            >
              ** Powered by Quest Labs
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestLogin;
