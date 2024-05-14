import mixpanel from "mixpanel-browser";
import * as amplitude from "@amplitude/analytics-browser";
import axios, { AxiosResponse } from "axios";

import "react-toastify/dist/ReactToastify.css";
import Cookies from "universal-cookie";
import config from "./config";
const AMPLITUDE_API_KEY = "cfd03815b8ea488fb72990c319994fc";
const MIXPANEL_API_KEY = "40e0349e55b0744cbc8194805fa4c37b";
const GA4_TRACKING_ID = "G-8E6PSWXZR3";
const GA4_API_SECRET = "JYSz9eEPT-eoh2aTVDESHg";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://33bf5f26eec50e6c2c556f707d4e459f@o1016721.ingest.us.sentry.io/4506992954245120",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", config.BACKEND_URL_STAGING],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

interface AmplitudeUserProperties {
  userid?: string;
}

interface GA4EventPayload {
  client_id?: string;
  events: Array<{ name: string }>;
}

class General {
  private serviceType: string;
  private apiType: string;
  // private ga4MeasurementId: string;
  // private ga4ApiSecret: string;

  constructor(serviceType: string, apiType?: string) {
    this.serviceType = "mixpanel";
    this.apiType = apiType || "STAGING";
    // mixpanel.init(MIXPANEL_API_KEY);
    // this.ga4MeasurementId = GA4_TRACKING_ID;
    // this.ga4ApiSecret = GA4_API_SECRET;

    mixpanel.init("52a91caf0a6518b8b8909977ab92c39a");

    // if (this.serviceType === 'amplitude') {
    //     amplitude.init(AMPLITUDE_API_KEY);
    // } else if (this.serviceType === 'mixpanel') {
    //     mixpanel.init(MIXPANEL_API_KEY);
    // } else if (this.serviceType === 'ga4') {
    //     this.ga4MeasurementId = GA4_TRACKING_ID;
    //     this.ga4ApiSecret = GA4_API_SECRET;
    // } else {
    //     console.log('Invalid Service type');
    // }
  }

  // async fireTrackingEvent(eventName: string, metadata?: { eventProperties?: any; userid?: string }) {
  //     if (this.serviceType === 'amplitude') {
  //         const { eventProperties, userid } = metadata || {};
  //         const amplitudeUserProperties: AmplitudeUserProperties = { userid };
  //         amplitude.track(eventName, eventProperties);
  //         console.log('Amplitude Event tracked:', eventName, 'User ID:', userid);

  //         return { success: true };
  //     } else if (this.serviceType === 'mixpanel') {
  //         if (metadata) {
  //             mixpanel.track(eventName, metadata);
  //             return { success: true };
  //         } else {
  //             mixpanel.track(eventName);
  //             return { success: true };
  //         }
  //     } else if (this.serviceType === 'ga4') {
  //         const { userid } = metadata || {};
  //         const ga4EventPayload: GA4EventPayload = {
  //             client_id: userid,
  //             events: [
  //                 {
  //                     name: eventName,
  //                 },
  //             ],
  //         };

  //         try {
  //             const response: AxiosResponse = await axios.post(
  //                 `https://www.google-analytics.com/mp/collect?measurement_id=${this.ga4MeasurementId}&api_secret=${this.ga4ApiSecret}`,
  //                 ga4EventPayload,
  //                 {
  //                     headers: {
  //                         'Content-Type': 'application/json',
  //                     },
  //                 }
  //             );
  //             if (response.status >= 200 && response.status < 300) {
  //                 console.log('Google Analytics 4 Event tracked successfully:', eventName, 'User ID:', userid);
  //                 return { success: true };
  //             }
  //         } catch (error) {
  //             console.error('Error tracking GA4 event:', error);
  //             return { success: false, error: 'Internal Server Error. Please contact Help Center in Discord.' };
  //         }
  //     }
  // }

  fireTrackingEvent(
    eventName: string,
    componentName: string,
    metadata?: { eventProperties?: any; userid?: string }
  ) {
    // console.log("Event Name", eventName)
    // console.log("Component Name", componentName)
    // if (this.serviceType === 'amplitude') {
    //     console.log("Amplitude")
    //     const { eventProperties, userid } = metadata || {};
    //     const amplitudeUserProperties: AmplitudeUserProperties = { userid };
    //     amplitude.track(eventName, eventProperties);
    //     console.log('Amplitude Event tracked:', eventName, 'User ID:', userid);

    //     return { success: true };
    // } else

    if (this.apiType === "STAGING") {
      // console.log("staging")
      // mixpanel.track(eventName);
      return { success: true };
    } else {
      // console.log("production")
      mixpanel.track(eventName);
      return { success: true };
    }
  }

  // this needs to be updated
  async getKeys({
    entityId,
    apikey,
    token,
    userid,
  }: {
    entityId: string;
    apikey: string;
    token: string;
    userid: string;
  }) {
    try {
      const response: AxiosResponse = await axios.get(
        `${config.BACKEND_URL}api/entities/${entityId}/users/${userid}/social-tokens`,
        {
          headers: { token, entityid: entityId, userid, apikey },
        }
      );

      console.log("Keys:", response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async getExternalLogin({
    apiType,
    uniqueUserId,
    entityId,
    userId,
    apiKey,
    apiSecret,
    token,
    uniqueEmailId,
  }) {
    const cookies = new Cookies();
    const headers = {
      apiKey: apiKey,
      apisecret: apiSecret,
      userId: userId,
      token: token,
    };

    const body = {
      externalUserId: !!uniqueUserId && uniqueUserId,
      entityId: entityId,
      email: uniqueEmailId,
    };

    let questUserId = cookies.get("questUserId");
    let questUserToken = cookies.get("questUserToken");
    let externalUserId = cookies.get("externalUserId");

    if (!!externalUserId && !!questUserId && !!questUserToken && (externalUserId == uniqueUserId || externalUserId == uniqueEmailId)) {
      return { userId: questUserId, token: questUserToken };
    }

    let BACKEND_URL =
      apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL;
    let externalLogin = await axios.post(`${BACKEND_URL}api/users/external/login`, body, { headers })
    let { userId: q_userId, token: q_token } = externalLogin.data;
    const date = new Date();
    date.setHours(date.getHours() + 48);
    cookies.set("externalUserId", uniqueUserId, {
      path: "/",
      expires: date,
    });
    cookies.set("questUserId", q_userId, { path: "/", expires: date });
    cookies.set("questUserToken", q_token, { path: "/", expires: date });
    cookies.set("externalUserId", uniqueUserId || uniqueEmailId, { path: "/", expires: date });
    return { userId: q_userId, token: q_token };
  }

  captureSentryException(error: any) {
    // console.log(this.apiType)
    // console.log("hi")
    if (this.apiType === "PRODUCTION") {
      // console.log("Calling for Production");
      Sentry.captureException(error);
    } else {
      // Sentry.captureException(error);
      // console.log("No calling for staging")
    }
  }
}

const createUrl = (
  apiString: any,
  BACKEND_URL: any,
  apikey: any,
  userId: any,
  token: any
) => {
  const url = `${BACKEND_URL}${apiString}`;
  const headers = {
    apiKey: apikey,
    userId: userId,
    token: token,
  };

  return {
    url,
    headers,
  };
};

export const uploadImageToBackend = async (
  file: any,
  BACKEND_URL: any,
  apikey: any,
  userId: any,
  token: any
) => {
  if (!file) {
    return null;
  }

  const { url, headers: baseHeaders } = createUrl(
    `api/upload-img`,
    BACKEND_URL,
    apikey,
    userId,
    token
  );
  const headers = {
    ...baseHeaders,
    "Content-Type": "form-data",
  };

  const formData = new FormData();
  formData.append("uploaded_file", file);

  try {
    const res = await axios.post(url, formData, { headers });
    return res.data;
  } catch (error) {
    return null;
  }
};

export default General;
