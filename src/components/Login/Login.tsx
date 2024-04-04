import React, { CSSProperties, useEffect, useState } from "react";
import { useContext } from "react";
import QuestContext from "../QuestWrapper";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import config from "../../config";
import EmailLogin from "./EmailLogin";
import GoogleLogin from "./GoogleLogin";
import { ToastContainer } from "react-toastify";
import "./Login.css";
import QuestLabs from "../QuestLabs";
import General from "../../general";
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
  headingText?: string;
  descriptionText?: string;
  googleButtonText?: string;
  IconColor?: string;
  onSubmit?: ({ userId, token }: { userId: string; token: string }) => void;
  onError?: ({ email, error }: { email?: string, error?: string }) => void;
  styleConfig?: {
    Heading?: CSSProperties;
    Description?: CSSProperties;
    Input?: CSSProperties;
    Label?: CSSProperties;
    TextArea?: CSSProperties;
    PrimaryButton?: CSSProperties;
    SecondaryButton?: CSSProperties;
    Form?: CSSProperties;
    Footer?: CSSProperties;
    IconStyle?: {
      BorderColor?: string
      Background?: string;
      color?: string;
    }
    OtpInput?: CSSProperties
  };

  showFooter?: boolean;
}

const QuestLogin: React.FC<QuestLoginProps> = ({
  googleClientId,
  redirectUri,
  redirectURL,
  btnColor,
  email,
  google,
  btnTextColor,
  textColor = "#252525",
  backgroundColor,
  onSubmit,
  styleConfig,
  IconColor,
  headingText,
  descriptionText,
  googleButtonText,
  showFooter = true,
  onError
}) => {
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isGoogle, setIsGoogle] = useState<boolean>(false);
  const [gradient, setGradient] = useState<boolean>(false);
  const [otpScreen, setOtpScreen] = useState<boolean>(false);
  const { apiKey, apiSecret, entityId, apiType, themeConfig } = useContext(
    QuestContext.Context
  );
  let BACKEND_URL =
    apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL;

  const handleOtp = (val: boolean) => {
    setOtpScreen(val);
  };
  let GeneralFunctions = new General('mixpanel', apiType);
  useEffect(() => {
    GeneralFunctions.fireTrackingEvent("quest_Login_loaded", "quest_login");
    // if (entityId) {
    //   const request = `${BACKEND_URL}api/entities/${entityId}/get-theme`;
    //   axios
    //     .get(request)
    //     .then((res) => {
    //       console.log(res.data);
    //       if (res.data.success === true) {
    //         const data = res.data.theme;
    //         if (data) {
    //           setBgColor(data?.backgroundColor || '#ffffff');
    //           setFontFamily(data?.fontFamily || 'Figtree');
    //           setGradient(
    //             data?.backgroundColor?.includes('linear-gradient') ||
    //             data?.backgroundColor?.includes('radial-gradient')
    //           );
    //         } else {
    //           if (backgroundColor) {
    //             setBgColor(backgroundColor);
    //           } else {
    //             setBgColor('#ffffff');
    //           }
    //           setFontFamily('Figtree');
    //           setGradient(false);
    //         }
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       if (backgroundColor) {
    //         setBgColor(backgroundColor);
    //       } else {
    //         setBgColor('#ffffff');
    //       }
    //       setFontFamily('Figtree');
    //       setGradient(false);
    //     });
    // }

    // if (btnColor) setBgColor(btnColor);
    // if (backgroundColor) setBgColor(backgroundColor);
    // if (font) setFontFamily(font);

    setIsEmail(email || false);
    setIsGoogle(google || false);

    if (!google && !email) {
      setIsGoogle(true);
      setIsEmail(true);
    }
  }, [entityId, btnColor, backgroundColor, email, google, btnTextColor]);

  return (
    <>
      {/* <div className="questLabs" 
     
      > */}
      {/* <ToastContainer /> */}
      {/* <div className="q-login-parent-container"> */}
      <div
        style={{
          background: styleConfig?.Form?.backgroundColor || themeConfig?.backgroundColor, height: styleConfig?.Form?.height || "auto", fontFamily: themeConfig.fontFamily || "'Figtree', sans-serif", ...styleConfig?.Form
        }}
        className="q-login-container"
      >
        <div className="q-login-body">
          {!otpScreen && (
            <div className="q-login-header">
              <div
                className="q-login-h1"
                style={{
                  color:
                    styleConfig?.Heading?.color ||
                    themeConfig?.primaryColor,
                  ...styleConfig?.Heading,
                }}
              >
                {headingText || 'Log in or sign up'}
              </div>
              <div
                className="q-login-h4"
                style={{
                  color:
                    styleConfig?.Description?.color ||
                    themeConfig?.secondaryColor,
                  ...styleConfig?.Description,
                }}
              >
                {descriptionText || 'Welcome Back, Please enter your details'}
              </div>
            </div>
          )}
          {isEmail && (
            <div
              className="q-login-mid-cont"
            >
              <EmailLogin
                {...{
                  textColor,
                  // fontFamily,
                  apiKey,
                  apiSecret: apiSecret || "",
                  redirectURL,
                  btnColor,
                  entityId,
                  handleOtp,
                  redirectUri,
                  btnTextColor,
                  onSubmit,
                  otpScreen,
                  setOtpScreen,
                  styleConfig,
                  IconColor,
                  onError
                }}
              />
              {!otpScreen && isGoogle && (
                <div
                  className="q-login-or-container"
                  style={{
                    color:
                      styleConfig?.Description?.color ||
                      themeConfig?.secondaryColor,
                    ...styleConfig?.Description,
                  }}
                >
                  <div className="login-or-line" style={{ backgroundColor: styleConfig?.Description?.color || themeConfig?.secondaryColor }}></div>
                  <div
                    style={{
                      color: styleConfig?.Description?.color || themeConfig?.secondaryColor,
                      // fontFamily,
                      display: "inline",
                      // fontFamily:themeConfig.fontFamily || "'Figtree', sans-serif"
                    }}
                    className="q-or-continue"
                  >
                    OR
                  </div>
                  <div className="login-or-line" style={{ backgroundColor: styleConfig?.Description?.color || themeConfig?.secondaryColor }}></div>
                </div>
              )}
              {!otpScreen && isGoogle && (
                <GoogleLogin
                  {...{
                    btnTextColor,
                    // fontFamily,
                    btnColor,
                    entityId,
                    redirectUri,
                    redirectURL,
                    googleClientId,
                    apiSecret: apiSecret || "",
                    apiKey,
                    onSubmit,
                    styleConfig,
                    IconColor,
                    googleButtonText,
                    onError
                  }}
                />
              )}
            </div>
          )}
          {!isEmail && isGoogle && (
            <GoogleLogin
              {...{
                btnTextColor,
                // fontFamily,
                btnColor,
                entityId,
                redirectUri,
                redirectURL,
                googleClientId,
                apiSecret: apiSecret || "",
                apiKey,
                onSubmit,
                styleConfig,
                IconColor,
                googleButtonText,
                onError
              }}
            />
          )}

        </div>
        <div className="quest_footer">
          {showFooter && <QuestLabs style={styleConfig?.Footer} />}
        </div>
      </div>
      {/* </div>
      </div> */}
    </>
  );
};

export default QuestLogin;
