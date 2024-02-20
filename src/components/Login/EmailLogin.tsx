import React, { useContext, useState } from "react";
import axios from "axios";
import config from "../../config";
import OtpVerification from "./OtpVerification";
import Loader from "./Loader";
import { alertLogo, crossLogo,emailLogo2  } from "../../assets/images";
import showToast from "../toast/toastService";
import QuestContext from "../QuestWrapper";
import { NormalInput } from "../Modules/Input";
import { PrimaryButton } from "../Modules/NextButton";

interface EmailLoginProps {
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
}

const EmailLogin: React.FC<EmailLoginProps> = ({
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
}) => {
  const [sendOTP, setSendOTP] = useState(false);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [mainValidEmail, setMainValidEmail] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const { apiType } = useContext(QuestContext.Context);
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
      showToast.error(
        "Invalid email address" + "\n" + "Please check your email address"
      );
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
            <div
              style={{ color: textColor, fontFamily }}
              className="q-email-text"
            >
              Email
            </div>
            <div className="q-email-input">
              <img src={emailLogo2} className="q-email-logo" alt="" />
              {email &&  <img
                src={crossLogo}
                className="q-email-cross"
                alt=""
                onClick={() => {
                  setEmail("");
                  setMainValidEmail(true);
                }}
              />}

              {/* <input
                id="q_email_login"
                type="text"
                placeholder="Enter your email id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyUp={handlesubmit}
                className="q-login-email-input"
              /> */}
              <NormalInput
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
            <PrimaryButton text="Continue" onClick={sendOTPfunction}/>
          </div>
        </div>
      )}
      {sendOTP && (
        <OtpVerification
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
        />
      )}
    </div>
  );
};

export default EmailLogin;
