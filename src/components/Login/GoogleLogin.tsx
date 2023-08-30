import React, { useEffect } from 'react';
import { googleSvg } from '../../assets/images';
// import axios from 'axios';
// import config from '../../config';

interface googleLoginProps {
  color?: string;
  bgColor?: string;
  googleClientId?: string;
  redirectUri?: string;
  email?: boolean;
  google?: boolean;
  entityId?: string;
  userId?: string;
  btnColor?: string;
}
function GoogleLogin(props: googleLoginProps) {
  // const { btnColor, entityId } = props;

  function googleLogin() {
    // axios
    //   .post(
    //     `${config.BACKEND_URL}api/users/google/login`,
    //     {
    //       code,
    //       redirectUri: config.APP_URL+"embed/login",
    //       entityId: entityId,
    //     },
    //     {
    //       headers: {
    //         apiKey: config.QUEST_PROTOCOL_API_KEY,
    //         apiSecret: config.QUEST_PROTOCOL_API_SECRET,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     if (res.data.success === true) {
    //       console.log('Successfully logged in');
    //       if (source === 'CHROME_EXTENSION') {
    //         window.postMessage(
    //           {
    //             type: 'QUEST_EMBED_LOGIN',
    //             text: 'User logged in',
    //             token: res.data.token,
    //             userId: res.data.userId,
    //           },
    //           '*'
    //         );
    //       } else {
    //       }
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  return (
    <div className="relative mt-5">
      <div style={{border:"2px solid black"}} className={`h-14 text-18 p-3 flex items-center justify-center rounded-lg text-black`}>
        Sign in with Google
        <img className="ml-auto" src={googleSvg} alt="google-logo" />
      </div>
    </div>
  );
}

export default GoogleLogin;
