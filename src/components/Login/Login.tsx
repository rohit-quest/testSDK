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
  onSubmit?: ({ userId, token }: { userId: string; token: string }) => void;
  styleConfig?: {
    Heading?: CSSProperties;
    Description?: CSSProperties;
    Input?: CSSProperties;
    Label?: CSSProperties;
    TextArea?: CSSProperties;
    PrimaryButton?: CSSProperties;
    SecondaryButton?: CSSProperties;
    Form?:CSSProperties
  };
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
}) => {
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isGoogle, setIsGoogle] = useState<boolean>(false);
  const [bgColor, setBgColor] = useState<string>("#ffffff");
  const [fontFamily, setFontFamily] = useState<string>("Figtree");
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
  useEffect(() => {
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
      <div className="questLabs" 
      style={{
        background: styleConfig?.Form?.backgroundColor || themeConfig?.backgroundColor, height: styleConfig?.Form?.height || "auto", fontFamily: themeConfig.fontFamily || "'Figtree', sans-serif" , ...styleConfig?.Form
      }}
      >
        <ToastContainer />
        <div className="q-login-parent-container">
          <div
            style={{
              ...(gradient
                ? { backgroundImage: bgColor }
                : { backgroundColor: bgColor }),
            }}
            className="q-login-container"
          >
            <div className="q-login-body">
              {!otpScreen && (
                <>
                  <div
                    className="q-login-h1"
                    // style={{
                    //   color: textColor,
                    //   fontFamily: fontFamily,
                    //   ...styleConfig?.Heading,
                    // }}
                    style={{
                      color:
                        styleConfig?.Heading?.color ||
                        themeConfig?.primaryColor,
                      ...styleConfig?.Heading,
                    }}
                  >
                    Log in or sign up
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
                    Welcome Back, Please enter your details
                  </div>
                </>
              )}
              {isEmail && (
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <EmailLogin
                    {...{
                      textColor,
                      fontFamily,
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
                      <div className="login-or-line"></div>
                      <div
                        style={{
                          color: textColor,
                          fontFamily,
                          display: "inline",
                        }}
                        className="q-or-continue"
                      >
                        OR
                      </div>
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
                        apiSecret: apiSecret || "",
                        apiKey,
                        onSubmit,
                        styleConfig,
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
                    apiSecret: apiSecret || "",
                    apiKey,
                    onSubmit,
                  }}
                />
              )}
              {/* <p
              className="powered-by"
              style={{
                color: textColor,
                fontFamily,
              }}
            >
              Powered by Quest Labs
            </div> */}
            </div>
            <div className="quest_footer">
              <QuestLabs />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestLogin;
