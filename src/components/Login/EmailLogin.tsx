import React, { CSSProperties, useContext, useState } from "react";
import axios from "axios";
import config from "../../config";
import OtpVerification from "./OtpVerification";
import Loader from "./Loader";
import { crossLogo, emailLogo2 } from "../../assets/images";
import showToast from "../toast/toastService";
import QuestContext from "../QuestWrapper";
import { Input } from "../Modules/Input";
import { PrimaryButton } from "../Modules/PrimaryButton";
import Label from "../Modules/Label";
import General from "../../general";

interface EmailLoginProps {
  otpScreen: boolean;
  setOtpScreen: React.Dispatch<React.SetStateAction<boolean>>;
  btnColor?: string;
  redirectUri?: string;
  redirectURL: string;
  handleOtp: (otp: boolean) => void;
  entityId: string;
  textColor?: string;
  btnTextColor?: string;
  fontFamily?: string;
  apiKey: string;
  apiSecret: string;
  IconColor?:string;
  onError?: ({email,error}:{email?:string,error?:string}) => void;
  onSubmit?: ({ userId, token }: { userId: string; token: string }) => void;
  styleConfig?: {
    Heading?: CSSProperties;
    Description?: CSSProperties;
    Input?: CSSProperties;
    Label?: CSSProperties;
    TextArea?: CSSProperties;
    PrimaryButton?: CSSProperties;
    SecondaryButton?: CSSProperties;
    Form?: CSSProperties;
    Footer?:CSSProperties;
    IconStyle?:{
      BorderColor?: string
      Background? : string;
      color? :string;
    }
    OtpInput?:CSSProperties
  };
}

const EmailLogin: React.FC<EmailLoginProps> = ({
  otpScreen,
  setOtpScreen,
  btnColor,
  redirectURL,
  handleOtp,
  entityId,
  textColor,
  // fontFamily,
  apiKey,
  apiSecret,
  btnTextColor,
  onSubmit,
  styleConfig,
  IconColor ,
  onError
}) => {
  const [sendOTP, setSendOTP] = useState(false);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [mainValidEmail, setMainValidEmail] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const { apiType, themeConfig } = useContext(QuestContext.Context);
  let BACKEND_URL =
    apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL;
    let GeneralFunctions = new General('mixpanel', apiType)
  const handlesubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value !== "") {
      setMainValidEmail(isValidEmail);
      sendOTPfunction();
    }
    const newEmail = e.currentTarget.value;
    setEmail(newEmail);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(newEmail));
  };

  const sendOTPfunction = () => {
    const loginBtn = async () => {
      const data = await GeneralFunctions.fireTrackingEvent("quest_login_continue_btn_clicked", "quest_login");
    }
    loginBtn();

    setMainValidEmail(isValidEmail);
    if (!isValidEmail || email.length === 0) {
      // showToast.error(
      //   "Invalid email address" + "\n" + "Please check your email address"
      // );
      return;
    }
    setShowLoader(true);
    axios
      .post(
        `${BACKEND_URL}api/users/email-login/send-otp?entityId=${entityId}`,
        { email: email, entityId: entityId},
        {
          headers: {
            apiKey: apiKey,
            apiSecret: apiSecret,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setSendOTP(true);
          handleOtp(true);
        }
      })
      .catch((error) => {
        GeneralFunctions.captureSentryException(error);
        console.log(error);
      })
      .finally(() => {
        setShowLoader(false);
      });
  };


  return (
    <div style={{width:'100%'}}>
      {showLoader && <Loader />}
      {!sendOTP && (
        // <div className="questLabs">
          <div className="q-email-login-ctn">
            <div>
            <Label
              style={{
                color: styleConfig?.Label?.color || styleConfig?.Heading?.color || themeConfig?.primaryColor , 
                ...styleConfig?.Label,
              }}
            >
              Email
            </Label>
            {/* <div className="q-email-input"> */}
              {/* <img src={emailLogo2} className="q-email-logo-pq" alt="" /> */}
              {/* {email && (
                <img
                  src={crossLogo}
                  className="q-email-cross"
                  alt=""
                  onClick={() => {
                    setEmail("");
                    setMainValidEmail(true);
                  }}
                />
              )} */}

              {/* <input
                id="q_email_login"
                type="text"
                placeholder="Enter your email id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyUp={handlesubmit}
                className="q-login-email-input"
              /> */}
              <Input
               iconColor={ IconColor ||  styleConfig?.Input?.color || themeConfig?.primaryColor || 'rgb(185, 185, 185)'}
                style={{ 
                  borderColor: styleConfig?.Input?.borderColor || themeConfig?.borderColor ,
                  color: styleConfig?.Input?.color || styleConfig?.Heading?.color ||  themeConfig?.primaryColor,
                  ...styleConfig?.Input,   
                  borderRadius :'6px',
                  borderWidth:'1.5px',
                  padding : '8px 12px',
                }}
                logoPosition='left'
                type="email"
                placeholder="Enter your email id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyUp={handlesubmit}
                
              />
               {!mainValidEmail && (
              <div className="q-login-p">Please enter a valid email id</div>
            )}
              </div>
            {/* </div> */}
           
            {/* <div
              style={{
                backgroundColor: btnColor,
                fontFamily,
                color: btnTextColor,
              }}
              onClick={sendOTPfunction}
              className="q-email-btn-continue"
            >
              Continue
            </div> */}
            <PrimaryButton
              style={{
                background:
                  styleConfig?.PrimaryButton?.background ||
                  themeConfig?.buttonColor,
                ...styleConfig?.PrimaryButton,
                fontFamily:themeConfig.fontFamily || "'Figtree', sans-serif"
              }}
              children={"Continue"}
              onClick={sendOTPfunction}
            />
          </div>
        // </div>
      )}
      {sendOTP && (
        <OtpVerification
          otpScreen={otpScreen}
          setOtpScreen={setOtpScreen}
          sendOTP={sendOTP}
          setSendOTP={setSendOTP}
          apiKey={apiKey}
          apiSecret={apiSecret}
          // fontFamily={fontFamily}
          textColor={textColor}
          btnColor={btnColor}
          redirectURL={redirectURL}
          entityId={entityId}
          email={email}
          btnTextColor={btnTextColor}
          onSubmit={onSubmit}
          styleConfig={styleConfig}
          onError={onError}
        />
      )}
    </div>
  );
};

export default EmailLogin;
