import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
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
    <div className="questLabs">
      <ToastContainer />
      <div className="q-parent-container">
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
                  style={{
                    fontWeight: 'bold',
                    fontSize: '2rem',
                    textAlign: 'center',
                    color: textColor,
                    fontFamily: fontFamily,
                  }}
                >
                  Welcome Back
                </h1>
                <h4
                  style={{
                    fontWeight: 'normal',
                    marginBottom: '1rem',
                    textAlign: 'center',
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
                  <div
                    style={{
                      marginTop: '1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div
                      style={{
                        flexGrow: 1,
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: 'gray',
                      }}
                    ></div>
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
                    <div
                      style={{
                        flexGrow: 1,
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: 'gray',
                      }}
                    ></div>
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
              style={{ marginTop: '0.75rem', fontSize: '0.875rem', textAlign: 'center', color: textColor, fontFamily }}
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
