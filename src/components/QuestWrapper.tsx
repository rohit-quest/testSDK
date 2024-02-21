import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import config from "../config";
import axios from "axios";

type FeatureFlag = {
  isEnabled: boolean;
  isActive: boolean;
  flagName: string;
  description: string;
};

type FeatureFlags = {
  [key: string]: FeatureFlag;
};

type ThemeConfig = {
  primaryColor?: string;
  secondaryColor?: string;
  borderColor?: string;
  buttonColor?: string;
  backgroundColor?: string;
  fontFamily?: string;
}



type Props = {
  children: ReactNode;
  apiKey: string;
  apiSecret: string;
  entityId: string;
  featureFlags?: FeatureFlags;
  apiType?: "STAGING" | "PRODUCTION";
  themeConfig?: ThemeConfig
};

type User = {
  userId?: string;
  token?: string;
  userCredentials?: object
  refreshToken?: string
};


export const Context = createContext<{
  apiKey: string,
  apiSecret?: string,
  entityId: string,
  user: User,
  setUser: (user: User) => void,
  featureFlags: Record<string, { isEnabled: boolean }>,
  apiType: "PRODUCTION" | "STAGING",
  themeConfig: ThemeConfig
}>({
  apiKey: "",
  apiSecret: "",
  entityId: "",
  user: {} as User,
  setUser: (user: User) => { },
  featureFlags: {},
  apiType: "PRODUCTION",
  themeConfig: {}
});


export const QuestProvider = (props: Props) => {
  const [user, setUser] = useState<User>({});
  const [featureFlags, setFeatureFlags] = useState<Record<string, { isEnabled: boolean }>>({})

  useEffect(() => {
    getFeatureFlags()
  }, [])

  async function getFeatureFlags() {
    const cookies = new Cookies();
    let featureFlag = cookies.get('featureFlags');
    if (!!featureFlag && Object.keys(featureFlag).length != 0) {
      setFeatureFlags(featureFlag)
      return;
    }
    let BACKEND_URL = props.apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL

    let request = `${BACKEND_URL}api/entities/${props.entityId}/featureFlags`
    var response = await axios.get(request, {
      headers: {
        apikey: props.apiKey,
        apisecret: props.apiSecret,
      }
    });

    if (response.data.success) {
      const flagsObject = response.data.data.reduce((acc: any, flag: any) => { acc[flag.flagName] = { isEnabled: flag.isEnabled, isActive: flag.isActive }; return acc; }, {});
      const date = new Date();
      date.setMinutes(date.getMinutes() + 30);
      cookies.set('featureFlags', flagsObject, { path: '/', expires: date });
      setFeatureFlags(flagsObject)
    }
  }

  return (
    <Context.Provider
      value={{
        apiKey: props.apiKey,
        apiSecret: props.apiSecret,
        entityId: props.entityId,
        featureFlags: featureFlags || {},
        apiType: props.apiType || "PRODUCTION",
        user,
        setUser,
        themeConfig: props.themeConfig || {},
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default {
  Context,
  QuestProvider
};
