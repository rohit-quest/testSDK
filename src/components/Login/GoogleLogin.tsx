import React, { CSSProperties, useEffect, useState } from 'react';
import { google2, googleSvg } from '../../assets/images';
import axios from 'axios';
import config from '../../config';
import queryString from 'query-string';
import Loader from './Loader';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import QuestContext from '../QuestWrapper';
import { SecondaryButton } from '../Modules/SecondaryButton';
import Toast from '../toast2/Toast';
import General from '../../general';

interface GoogleLoginProps {
  btnTextColor?: string;
  // fontFamily?: string;
  btnColor?: string;
  entityId: string;
  redirectUri: string;
  redirectURL: string;
  googleClientId: string;
  apiSecret: string;
  apiKey: string;
  googleButtonText?: string;
  onError?: ({email,error}:{email?:string,error?:string,isGoogle?:boolean}) => void;
  onSubmit?: ({ userId, token, userCredentials, refreshToken }: { userId: string, token: string, userCredentials: object, refreshToken: string }) => void;
  styleConfig?: {
    Heading?: CSSProperties;
    Description?: CSSProperties;
    Input?: CSSProperties;
    Label?: CSSProperties;
    TextArea?: CSSProperties;
    PrimaryButton?: CSSProperties;
    SecondaryButton?: CSSProperties;
    Form?: CSSProperties;
    Footer?: {
      FooterStyle?: CSSProperties;
      FooterText?: CSSProperties;
      FooterIcon?: CSSProperties;
    };
    IconStyle?: {
      BorderColor?: string
      Background?: string;
      color?: string;
    }
    OtpInput?: CSSProperties
  };
}

function GoogleLogin(props: GoogleLoginProps): JSX.Element {
  const {
    btnTextColor,
    // fontFamily,
    btnColor,
    entityId,
    redirectUri,
    redirectURL,
    googleClientId,
    apiSecret,
    apiKey,
    onSubmit,
    googleButtonText,
    styleConfig,
    onError
  } = props;

  const [showLoader, setShowLoader] = useState<boolean>(false);
  const params = queryString.parse(window.location.search);
  const googleCode = params.code as string;
  const { setUser, apiType, themeConfig } = useContext(QuestContext.Context);

  let BACKEND_URL = apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL
  let GeneralFunctions = new General('mixpanel', apiType)
  useEffect(() => {
    if (googleCode) {
      googleLogin(googleCode);
    }
  }, []);

  function googleLogin(code: string): void {
    setShowLoader(true);
    axios
      .post(
        `${BACKEND_URL}api/users/google/login`,
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
          // toast.success('Congratulations!!!' + '\n' + 'Successfully Logged in');
          if (onSubmit) {
            onSubmit({
              userId: res.data.userId, token: res.data.token, userCredentials: res.data.credentials,
              refreshToken: res.data.refreshToken
            });
          }
          setUser({
            userId: res.data.userId,
            token: res.data.token,
            userCredentials: res.data.credentials,
            refreshToken: res.data.refreshToken
          });
          if (redirectURL) {
            window.location.href = redirectURL;
          }
        } else if (res.data.success === false) {
          console.log(res.data.error);
          // toast.error('Unable to login' + '\n' + `${res.data.error}`);
        }
      })
      .catch((error) => {
        console.error(error);
        // toast.error(err.message);
        GeneralFunctions.captureSentryException(error);
      })
      .finally(() => {
        setShowLoader(false);
      });
  }

  function handleGoogleLoginClick() {
    GeneralFunctions.fireTrackingEvent("quest_login_google_btn_clicked", "quest_login");

    if (!googleClientId) {
      onError && onError({ email: undefined, error:"This is preview of the saas app that we generated it for you. Google login will work once you add your Google Client ID in the code."});
      return 
    }
    window.location.href = `https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&scope=profile%20email&response_type=code`
  }


  return (
    <div className="q-google-login-btn" style={{ width: '100%' }}>
      <div style={{ position: "relative" }}>
        {showLoader && <Loader />}
        <a
          style={{ textDecoration: 'none', color: 'black' }}
          onClick={handleGoogleLoginClick}
        >
          <SecondaryButton
            style={{
              borderColor: styleConfig?.SecondaryButton?.borderColor || themeConfig?.borderColor,
              background: styleConfig?.SecondaryButton?.backgroundColor,
              color: styleConfig?.SecondaryButton?.color,
              ...styleConfig?.SecondaryButton
            }}
          >
            <p>{googleButtonText || 'Sign in with Google'}</p>
            <img className="ml-auto" src={google2} alt="google-logo" />
          </SecondaryButton>
          {/* <div
            className='q-g-btn'
            style={{
              backgroundColor: btnColor,
              // fontFamily,
              color: btnTextColor,
              
            }}
          >
           
          </div> */}
        </a>
      </div>
    </div>
  );
}

export default GoogleLogin;
