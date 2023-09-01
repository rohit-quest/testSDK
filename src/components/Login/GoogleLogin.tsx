import React, { useEffect, useState } from 'react';
import { googleSvg } from '../../assets/images';
import axios from 'axios';
import config from '../../config';
import queryString from 'query-string';
import General from '../General';
import Loader from './Loader';
import { toast } from 'react-toastify';

interface GoogleLoginProps {
  btnTextColor?: string;
  fontFamily?: string;
  btnColor?: string;
  entityId: string;
  redirectUri: string;
  redirectURL: string;
  googleClientId: string;
  apiSecret: string;
  apiKey: string;
}

function GoogleLogin(props: GoogleLoginProps): JSX.Element {
  const {
    btnTextColor,
    fontFamily,
    btnColor,
    entityId,
    redirectUri,
    redirectURL,
    googleClientId,
    apiSecret,
    apiKey,
  } = props;

  const [showLoader, setShowLoader] = useState<boolean>(false);
  const params = queryString.parse(window.location.search);
  const googleCode = params.code as string;

  useEffect(() => {
    if (googleCode) {
      googleLogin(googleCode);
    }
  }, []);

  function googleLogin(code: string): void {
    setShowLoader(true);
    axios
      .post(
        `${config.BACKEND_URL}api/users/google/login`,
        {
          code,
          redirectUri: redirectUri,
          entityId: entityId,
        },
        {
          headers: {
            apiKey: apiKey,
            apiSecret: apiSecret,
          },
        }
      )
      .then((res) => {
        if (res.data.success === true) {
          toast.success("Congratulations!!!" + "\n" + "Successfully Logged in");
          General.shareInstance.setToken(res.data.token);
          General.shareInstance.setUserId(res.data.userId);
          window.location.href = redirectURL;
        } else if (res.data.success === false) {
          toast.error(
            "Unable to login, try logging again. Please contact us in Discord if the issue persists"
          );
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
      })
      .finally(() => {
        setShowLoader(false);
      });
  }

  return (
    <div className="relative mt-5">
      {showLoader && <Loader />}
      <a
        href={`https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&scope=profile%20email&response_type=code`}
      >
        <div
          style={{
            border: '2px solid black',
            backgroundColor: btnColor,
            fontFamily,
            color: btnTextColor,
          }}
          className={`h-14 text-18 p-3 flex items-center justify-center rounded-lg text-black`}
        >
          Sign in with Google
          <img className="ml-auto" src={googleSvg} alt="google-logo" />
        </div>
      </a>
    </div>
  );
}

export default GoogleLogin;
