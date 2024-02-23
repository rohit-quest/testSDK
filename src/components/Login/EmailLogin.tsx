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
  onSubmit?: ({ userId, token }: { userId: string; token: string }) => void;
  styleConfig?: {
    Heading?: CSSProperties;
    Description?: CSSProperties;
    Input?: CSSProperties;
    Label?: CSSProperties;
    TextArea?: CSSProperties;
    PrimaryButton?: CSSProperties;
    SecondaryButton?: CSSProperties;
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
  fontFamily,
  apiKey,
  apiSecret,
  btnTextColor,
  onSubmit,
  styleConfig,
}) => {
  const [sendOTP, setSendOTP] = useState(false);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [mainValidEmail, setMainValidEmail] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const { apiType, themeConfig } = useContext(QuestContext.Context);
  let BACKEND_URL =
    apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL;

  const handlesubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value !== "") {
      setMainValidEmail(isValidEmail);
      sendOTPfunction();
    }
    const newEmail = e.currentTarget.value;
    setEmail(newEmail);
    const emailRegex =
      /^[A-Za-z0-9._]{3,}@[a-zA-Z]{3,}[.]{1,1}[a-zA-Z.]{2,6}$/g;
    setIsValidEmail(emailRegex.test(newEmail));
  };

  const sendOTPfunction = () => {
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
        { email: email },
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
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setShowLoader(false);
      });
  };

  return (
    <div>
      {showLoader && <Loader />}
      {!sendOTP && (
        <div className="questLabs">
          <div className="q-email-login-ctn">
            <Label
              style={{
                color: styleConfig?.Label?.color || themeConfig?.primaryColor,
                ...styleConfig?.Label,
              }}
            >
              Email
            </Label>
            <div className="q-email-input">
              <img src={emailLogo2} className="q-email-logo" alt="" />
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
                style={{ 
                  borderColor: styleConfig?.Input?.borderColor || themeConfig?.borderColor,
                  color: styleConfig?.Input?.color || themeConfig?.primaryColor,
                  ...styleConfig?.Input   
                }}
                type="text"
                placeholder="Enter your email id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyUp={handlesubmit}
              />
            </div>
            {!mainValidEmail && (
              <div className="q-login-p">Please enter a valid email id</div>
            )}
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
              }}
              children={"Continue"}
              onClick={sendOTPfunction}
            />
          </div>
        </div>
      )}
      {sendOTP && (
        <OtpVerification
          otpScreen={otpScreen}
          setOtpScreen={setOtpScreen}
          sendOTP={sendOTP}
          setSendOTP={setSendOTP}
          apiKey={apiKey}
          apiSecret={apiSecret}
          fontFamily={fontFamily}
          textColor={textColor}
          btnColor={btnColor}
          redirectURL={redirectURL}
          entityId={entityId}
          email={email}
          btnTextColor={btnTextColor}
          onSubmit={onSubmit}
          styleConfig={styleConfig}
        />
      )}
    </div>
  );
};

export default EmailLogin;
