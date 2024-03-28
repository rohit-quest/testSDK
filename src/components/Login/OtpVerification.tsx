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

   const LoginSvg = (color= "#F4EBFF") => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="52" height="52" viewBox="0 0 52 52" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M7.4603 11.6605C5 14.1208 5 18.0806 5 26.0002C5 33.9198 5 37.8796 7.4603 40.3399C9.92061 42.8002 13.8804 42.8002 21.8 42.8002H30.2C38.1196 42.8002 42.0794 42.8002 44.5397 40.3399C47 37.8796 47 33.9198 47 26.0002C47 18.0806 47 14.1208 44.5397 11.6605C42.0794 9.2002 38.1196 9.2002 30.2 9.2002H21.8C13.8804 9.2002 9.92061 9.2002 7.4603 11.6605ZM39.8099 16.5919C40.3668 17.2601 40.2765 18.2533 39.6083 18.8101L34.9957 22.654C33.1343 24.2052 31.6257 25.4624 30.2941 26.3188C28.9071 27.2109 27.5563 27.7744 26 27.7744C24.4437 27.7744 23.0929 27.2109 21.7059 26.3188C20.3743 25.4624 18.8657 24.2052 17.0043 22.654L12.3917 18.8101C11.7235 18.2533 11.6332 17.2601 12.1901 16.5919C12.7469 15.9237 13.7401 15.8334 14.4083 16.3902L18.942 20.1683C20.9012 21.801 22.2614 22.9309 23.4098 23.6695C24.5215 24.3844 25.2753 24.6244 26 24.6244C26.7246 24.6244 27.4785 24.3844 28.5902 23.6695C29.7386 22.9309 31.0988 21.801 33.058 20.1683L37.5917 16.3902C38.2599 15.8334 39.2531 15.9237 39.8099 16.5919Z" fill={color} />
      </svg>
    );
  }

  async function verifyOTPfunction(): Promise<void> {
    if (OTP.length !== 6) {
      // toast.error("Login failed" + "\n" + "res.data.error");
      return;
    }

    try {
      setShowLoader(true);
      const response = await axios.post(
        `${BACKEND_URL}api/users/email-login/verify-otp`,
        { email: email, otp: OTP , entityId: entityId},
        {
          headers: {
            apiKey: apiKey,
            apiSecret: apiSecret,
          },
        }
      );

      if (response.data.success) {
        // toast.success("Congratulations!!!" + "\n" + "Successfully Logged in");
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
        // toast.error("Login failed" + "\n" + response.data.error);
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
            style={{ color: styleConfig?.Heading?.color || themeConfig?.primaryColor}}
          >
            Confirm verification code
          </div>
        </div>
        <div className="q_outer_cont">
          <div className="q_otp_main_cont" style={{background:styleConfig?.IconStyle?.BorderColor}}>
            <div className="q_otp_cont" style={{ background:styleConfig?.IconStyle?.Background}}>
              {LoginSvg(styleConfig?.IconStyle?.color ||  '#F4EBFF')}
            </div>
          </div>
        </div>
        <div>
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
              style={{ color: styleConfig?.Description?.color || themeConfig?.secondaryColor }}
            >
              We’ve sent a verification code to
            </div>
            <p  style={{ color: styleConfig?.Heading?.color || themeConfig?.primaryColor }} className="q_email_otp">{email}</p>
          </>

          <div style={{ marginTop: "20px" }}>
            {/* <div className="q-otp-label">Enter your otp</div> */}
            <OTPInput
              onChange={handleChange}
              value={OTP}
              inputStyle={"q-inputStyle"}
              containerStyle="q-containerStyle"
              numInputs={6}
              renderInput={(props) =>
                <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <input
                  {...props}
                  placeholder={"-"}
                  style={{
                    backgroundColor: styleConfig?.OtpInput?.backgroundColor || "transparent",
                    borderColor: styleConfig?.OtpInput?.borderColor || themeConfig.borderColor,
                    color : styleConfig?.Heading?.color || themeConfig.primaryColor,
                    ...styleConfig?.OtpInput,
                  }}
                />
              </div>
                }
            />
            {OTP.length < 6 && OTP.length > 0 && (
              <div className="q-login-p">Please enter a valid OTP</div>
            )}
          </div>
          <p style={{ color: styleConfig?.Description?.color || themeConfig?.secondaryColor }} className="q_otp_resend">
            Did not receive your code yet ?{" "}
            <span  style={{ color: styleConfig?.Heading?.color || themeConfig?.primaryColor }} onClick={sendOTPfunction}>Resend</span>
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
              ...styleConfig?.PrimaryButton,
              fontFamily: themeConfig?.fontFamily || "'Figtree', sans-serif",
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
