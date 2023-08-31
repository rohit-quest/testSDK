import React, { useEffect, useRef, useState } from "react";
import OTPInput from "react-otp-input";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../../config";
import Loader from "./Loader";
import General from "../General";

interface OtpVerificationProps {
  textColor?: string;
  fontFamily?: string;
  email: string;
  btnColor?: string;
  redirectURL: string;
  entityId: string;
  apiKey: string;
  apiSecret: string;
}

function OtpVerification({
  textColor,
  fontFamily,
  email,
  btnColor,
  redirectURL,
  entityId,
  apiKey,
  apiSecret,
}: OtpVerificationProps): JSX.Element {
  const [OTP, setOTP] = useState<string>("");
  const [sec, setsec] = useState<number>(300);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const ref = useRef<number | null>(null);

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
        `${config.BACKEND_URL}api/users/email-login/verify-otp`,
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
        General.shareInstance.setToken(response.data.token);
        General.shareInstance.setUserId(response.data.userId);
        window.location.href = redirectURL;
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
        `${config.BACKEND_URL}api/users/email-login/send-otp?entityId=${entityId}`,
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
    <div style={{ padding: "3%" }} className="embeded-otp">
      {showLoader && <Loader />}
      <h1
        style={{ color: textColor, fontFamily }}
        className="font-bold text-4xl text-center"
      >
        Please Enter OTP
      </h1>
      <div style={{ marginTop: "5%" }}>
        {sec === 0 ? (
          <div
            style={{ color: textColor, fontFamily, fontSize: "18px" }}
            className="text-center"
            onClick={sendOTPfunction}
          >
            we have sent you one time password to your email{" "}
            <span className="font-bold">Resend</span>
          </div>
        ) : (
          <div
            style={{ color: textColor, fontFamily, fontSize: "18px" }}
            className="text-center"
          >
            we have sent you one time password to your email{" "}
            <span className="font-bold">
            {modifyTime(Math.floor(sec / 60))}:{modifyTime(sec % 60)}
            </span>
          </div>
        )}
        <div style={{ marginTop: "10%" }} className="mt-5">
          <OTPInput
            onChange={handleChange}
            value={OTP}
            inputStyle="inputStyle"
            numInputs={6}
            renderInput={(props) => <input {...props} />}
          />
        </div>
      </div>
      <div
        style={{
          backgroundColor: btnColor,
          fontFamily,
          marginTop: "15%",
        }}
        className={`text-24 continue-btn h-14 pl-4 pr-4 rounded-lg border px-3 bg-black text-white focus:ring focus:ring-blue-300 flex items-center justify-center`}
        onClick={verifyOTPfunction}
      >
        Verify OTP
      </div>
    </div>
  );
}

export default OtpVerification;
