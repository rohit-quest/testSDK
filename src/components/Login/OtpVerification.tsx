import React, { useEffect, useRef, useState } from 'react';
import OTPInput from 'react-otp-input';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../config';
import Loader from './Loader';
import { useContext } from 'react';
import QuestContext from '../QuestWrapper';

interface OtpVerificationProps {
  textColor?: string;
  fontFamily?: string;
  email: string;
  btnColor?: string;
  redirectURL: string;
  entityId: string;
  apiKey: string;
  apiSecret: string;
  btnTextColor?: string;
  onSubmit?: ({userId,token}:{userId: string, token: string}) => void;
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
  btnTextColor,
  onSubmit,
}: OtpVerificationProps): JSX.Element {
  const [OTP, setOTP] = useState<string>('');
  const [sec, setsec] = useState<number>(300);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const ref = useRef<number | null>(null);
  const { setUser } = useContext(QuestContext.Context);

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
    return num < 10 ? '0' + num : num.toString();
  }

  const handleChange = (otp: string): void => {
    setOTP(otp);
  };

  async function verifyOTPfunction(): Promise<void> {
    if (OTP.length !== 6) {
      toast.error('Login failed' + '\n' + 'res.data.error');
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
        toast.success('Congratulations!!!' + '\n' + 'Successfully Logged in');
        if (onSubmit) {
          onSubmit({ userId: response.data.userId, token: response.data.token });
        }
        setUser({
          userId: response.data.userId,
          token: response.data.token,
        });
        window.location.href = redirectURL;
      } else {
        toast.error('Login failed' + '\n' + response.data.error);
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
    <div className="questLabs">
      <div style={{ padding: '3%' }} className="embeded-otp">
        {showLoader && <Loader />}
        <h1
          className="q-login-h1"
          style={{
            color: textColor,
            fontFamily: fontFamily,
          }}
        >
          Please Enter OTP
        </h1>
        <div style={{ marginTop: '5%' }}>
          {sec === 0 ? (
            <div
              className="q-resend"
              style={{
                color: textColor,
                fontFamily,
              }}
              onClick={sendOTPfunction}
            >
              we have sent you one time password to your email{' '}
              <span style={{ fontWeight: 'bold' }}>Resend</span>
            </div>
          ) : (
            <div
              className="q-resend"
              style={{
                color: textColor,
                fontFamily,
              }}
            >
              we have sent you one time password to your email{' '}
              <span style={{ fontWeight: 'bold' }}>
                {modifyTime(Math.floor(sec / 60))}:{modifyTime(sec % 60)}
              </span>
            </div>
          )}
          <div style={{ marginTop: '10%' }}>
            <OTPInput
              onChange={handleChange}
              value={OTP}
              inputStyle="q-inputStyle"
              numInputs={6}
              renderInput={(props) => <input {...props} />}
            />
            {OTP.length < 6 && OTP.length > 0 && (
              <p className="q-login-p">
                <span className="q-err">!</span>
                Please enter a valid OTP
              </p>
            )}
          </div>
        </div>
        <div
          style={{
            backgroundColor: btnColor,
            fontFamily,
            marginTop: '15%',
            color: btnTextColor,
          }}
          className="q-btn-continue"
          onClick={verifyOTPfunction}
        >
          Verify OTP
        </div>
      </div>
    </div>
  );
}

export default OtpVerification;
