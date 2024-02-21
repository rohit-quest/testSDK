import React, { CSSProperties, useEffect, useRef, useState } from "react";
import "./OtpVerification.css";
import OTPInput from "react-otp-input";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../../config";
import Loader from "./Loader";
import { useContext } from "react";
import QuestContext from "../QuestWrapper";
import { leftArrow2, otpIcon2 } from "../../assets/images";
import { PrimaryButton } from "../Modules/PrimaryButton";

interface OtpVerificationProps {
  otpScreen?: boolean;
  setOtpScreen: React.Dispatch<React.SetStateAction<boolean>>;
  sendOTP?: boolean;
  setSendOTP: React.Dispatch<React.SetStateAction<boolean>>;
  textColor?: string;
  fontFamily?: string;
  email: string;
  btnColor?: string;
  redirectURL: string;
  entityId: string;
  apiKey: string;
  apiSecret: string;
  btnTextColor?: string;
  onSubmit?: ({
    userId,
    token,
    userCredentials,
  }: {
    userId: string;
    token: string;
    userCredentials: object;
  }) => void;
  styleConfig?: {
    Form?: CSSProperties;
    Heading?: CSSProperties;
    Description?: CSSProperties;
    Input?: CSSProperties;
    Label?: CSSProperties;
    TextArea?: CSSProperties;
    PrimaryButton?: CSSProperties;
    SecondaryButton?: CSSProperties;
    SingleChoice?: {
      style?: CSSProperties;
      selectedStyle?: CSSProperties;
    };
    MultiChoice?: {
      style?: CSSProperties;
      selectedStyle?: CSSProperties;
    };
  };
}

function OtpVerification({
  otpScreen,
  setOtpScreen,
  sendOTP,
  setSendOTP,
  textColor,
  fontFamily,
  email,
  btnColor,
  redirectURL,
  entityId,
  apiKey,
  apiSecret,
  btnTextColor,
  onSubmit,
  styleConfig,
}: OtpVerificationProps): JSX.Element {
  const [OTP, setOTP] = useState<string>("");
  const [sec, setsec] = useState<number>(300);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const ref = useRef<number | null>(null);
  const { setUser } = useContext(QuestContext.Context);
  const { apiType,themeConfig } = useContext(QuestContext.Context);
  let BACKEND_URL =
    apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL;

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    function timer() {
      if (sec <= 0) {
        clearInterval(intervalId);
      } else {
        intervalId = setInterval(() => {
          setsec((prevSec) => prevSec - 1);
        }, 1000);
      }
    }

    timer();

    return () => {
      clearInterval(intervalId);
    };
  }, [sec]);

  function modifyTime(num: number): string {
    return num < 10 ? "0" + num : num.toString();
  }

  const handleChange = (otp: string): void => {
    setOTP(otp);
  };

  async function verifyOTPfunction(): Promise<void> {
    if (OTP.length !== 6) {
      toast.error("Login failed" + "\n" + "res.data.error");
      return;
    }

    try {
      setShowLoader(true);
      const response = await axios.post(
        `${BACKEND_URL}api/users/email-login/verify-otp`,
        { email: email, otp: OTP },
        {
          headers: {
            apiKey: apiKey,
            apiSecret: apiSecret,
          },
        }
      );

      if (response.data.success) {
        toast.success("Congratulations!!!" + "\n" + "Successfully Logged in");
        if (onSubmit) {
          onSubmit({
            userId: response.data.userId,
            token: response.data.token,
            userCredentials: { email: email },
          });
        }
        setUser({
          userId: response.data.userId,
          token: response.data.token,
          userCredentials: {
            email: email,
          },
        });
        if (redirectURL) {
          window.location.href = redirectURL;
        }
      } else {
        toast.error("Login failed" + "\n" + response.data.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setShowLoader(false);
    }
  }

  function sendOTPfunction(): void {
    setShowLoader(true);
    axios
      .post(
        `${BACKEND_URL}api/users/email-login/send-otp?entityId=${entityId}`,
        { email: email, entityId: entityId },
        {
          headers: {
            apiKey: apiKey,
            apiSecret: apiSecret,
          },
        }
      )
      .then((res) => {
        if (res.data.success) {
          setsec(120);
        }
      })

      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setShowLoader(false);
      });
  }

  return (
    <div className="questLabs">
      <div style={{ boxSizing: "content-box" }} className="embeded-otp">
        {showLoader && <Loader />}
        <div className="q_heading_cont">
          {" "}
          <img
            onClick={() => {
              setSendOTP(!sendOTP);
              // setIsGoogle(!isGoogle)
              setOtpScreen(!otpScreen);
            }}
            src={leftArrow2}
            alt=""
          />
          <div
            className="q-login-head2"
            style={{ color: styleConfig?.Heading?.color || themeConfig?.primaryColor, ...styleConfig?.Heading }}
          >
            Confirm verification code
          </div>
        </div>
        <div className="q_outer_cont">
          <div className="q_otp_main_cont">
            <div className="q_otp_cont">
              <img className="q_otp_icon2" src={otpIcon2} alt="image" />
            </div>
          </div>
        </div>
        <div style={{ marginTop: "8px" }}>
          {/* {sec === 0 ? (
            <div
              className="q-resend"
              style={{
                color: textColor,
                fontFamily,
              }}
              onClick={sendOTPfunction}
            >
              we have sent you one time password to your email{" "}
              <div className="q-resend">Resend</div>
            </div>
          ) : ( */}
          <>
            <div
              className="q-resend"
              style={{ color: styleConfig?.Description?.color || themeConfig?.secondaryColor, ...styleConfig?.Description }}
            >
              We’ve sent a verification code to
            </div>
            <p  style={{ color: styleConfig?.Heading?.color || themeConfig?.primaryColor, ...styleConfig?.Heading }} className="q_email_otp">{email}</p>
            {/* <div className="q-resend">
                {modifyTime(Math.floor(sec / 60))}:{modifyTime(sec % 60)} sec
              </div> */}
          </>
          {/* )} */}
          <div style={{ marginTop: "20px" }}>
            {/* <div className="q-otp-label">Enter your otp</div> */}
            <OTPInput
              onChange={handleChange}
              value={OTP}
              inputStyle="q-inputStyle"
              containerStyle="q-containerStyle"
              numInputs={6}
              renderInput={(props) => <input {...props} placeholder={"-"} />}
            />
            {OTP.length < 6 && OTP.length > 0 && (
              <div className="q-login-p">Please enter a valid OTP</div>
            )}
          </div>
          <p style={{ color: styleConfig?.Description?.color || themeConfig?.secondaryColor, ...styleConfig?.Description }} className="q_otp_resend">
            Did not receive your code yet ?{" "}
            <span  style={{ color: styleConfig?.Heading?.color || themeConfig?.primaryColor, ...styleConfig?.Heading }} onClick={sendOTPfunction}>Resend</span>
          </p>
        </div>
        {/* <div
          style={{
            backgroundColor: btnColor,
            fontFamily,
            marginTop: "20px",
            color: btnTextColor,
          }}
          className="q-email-btn-continue"
          onClick={verifyOTPfunction}
        >
          Verify with OTP
        </div> */}
        <div className="q_otp_btn_continue">
          <PrimaryButton
             style={{
              background: styleConfig?.PrimaryButton?.background || themeConfig?.buttonColor,
              ...styleConfig?.PrimaryButton
          }}
            children="Continue"
            onClick={verifyOTPfunction}
          />
        </div>
      </div>
    </div>
  );
}

export default OtpVerification;
