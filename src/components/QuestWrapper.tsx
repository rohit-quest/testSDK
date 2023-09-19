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

type Props = {
  children: ReactNode;
  apiKey: string;
  apiSecret: string;
  entityId: string;
  featureFlags: FeatureFlags;
};

type User = {
  userId?: string;
  token?: string;
};

export const Context = createContext({
  apiKey: "",
  apiSecret: "",
  entityId: "",
  user: {} as User,
  setUser: (user: User) => {},
  featureFlags: {}
});

export const QuestProvider = (props: Props) => {
  const [user, setUser] = useState<User>({});
  const [featureFlags, setFeatureFlags] = useState()

  useEffect(() => {
    getAllFeatureFlagsForQuest()
  }, [])

  

  async function getAllFeatureFlagsForQuest() {
    const cookies = new Cookies();
    let featureFlags = cookies.get('featureFlags');
    if (!!featureFlags && Object.keys(featureFlags).length != 0) {
      setFeatureFlags(featureFlags)
      return;
    }

    let request = config.BACKEND_URL + `api/entities/${props.entityId}/featureFlags`
    var response = await axios.get(request, { headers: { apiKey: props.apiKey, apiSecret: props.apiSecret } });

    if (response.data.success) {
        // Transform the array into an object where the keys are flagNames
        const flagsObject = response.data.data.reduce((acc, flag) => { acc[flag.flagName] = flag; return acc; }, {});
        // Set the cookie with the flags object, with a 1-hour expiry time
        const date = new Date();
        date.setHours(date.getHours() + 1);  // Set the date 1 hour in the future
        cookies.set('featureFlags', flagsObject, { path: '/', expires: date });
        featureFlags = flagsObject;
    }
    setFeatureFlags(featureFlags)
  }


  return (
    <Context.Provider
      value={{
        apiKey: props.apiKey,
        apiSecret: props.apiSecret,
        entityId: props.entityId,
        featureFlags: featureFlags || {},
        user,
        setUser
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
