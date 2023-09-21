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

  
  try{
    const eventSource = new EventSource(`${config.BACKEND_URL}api/entities/${props.entityId}/featureFlags/sdk?apikey=${props.apiKey}&apisecret=${props.apiSecret}&source=reactSDK`);
      eventSource.addEventListener('message', async (event) => {
        const updatedConfig = await JSON.parse(event.data);
        const flagsObject = updatedConfig.data.reduce((acc, flag) => { acc[flag.flagName] = flag; return acc; }, {});
        console.log(flagsObject);
        setFeatureFlags(flagsObject)
      });
  } catch(err) {

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
