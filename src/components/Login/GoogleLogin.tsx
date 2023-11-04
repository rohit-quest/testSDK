import React, { useEffect, useState } from 'react';
import { googleSvg } from '../../assets/images';
import axios from 'axios';
import config from '../../config';
import queryString from 'query-string';
import Loader from './Loader';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import QuestContext from '../QuestWrapper';

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
  onSubmit?: ({ userId, token }: { userId: string, token: string }) => void;
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
    onSubmit
  } = props;

  const [showLoader, setShowLoader] = useState<boolean>(false);
  const params = queryString.parse(window.location.search);
  const googleCode = params.code as string;
  const { setUser } = useContext(QuestContext.Context);

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
          toast.success('Congratulations!!!' + '\n' + 'Successfully Logged in');
          if (onSubmit) {
            onSubmit({ userId: res.data.userId, token: res.data.token });
          }
          setUser({
            userId: res.data.userId,
            token: res.data.token,
          });
          window.location.href = redirectURL;
        } else if (res.data.success === false) {
          console.log(res.data.error);
          toast.error('Unable to login' + '\n' + `${res.data.error}`);
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
    <div className="q-google-login-btn">
      <div style={{ marginTop: "10px", position: "relative" }}>
        {showLoader && <Loader />}
        <a
          style={{ textDecoration: 'none', color: 'black' }}
          href={`https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&scope=profile%20email&response_type=code`}
        >
          <div
            className='q-g-btn'
            style={{
              backgroundColor: btnColor,
              fontFamily,
              color: btnTextColor,
            }}
          >
            Sign in with Google
            <img className="ml-auto" src={googleSvg} alt="google-logo" />
          </div>
        </a>
      </div>
    </div>
  );
}

export default GoogleLogin;
