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

  
  class RateLimitedEventSource {
    config: { entityId: string; apiKey: string; apiSecret: string; };
    eventSource: null;
    lastRequestTime: number;
    minRequestInterval: number;
    constructor(config: { entityId: string; apiKey: string; apiSecret: string; }) {
      this.config = config;
      this.eventSource = null;
      this.lastRequestTime = 0;
      this.minRequestInterval = 1000;
      this.initializeEventSource();
    }
  
    initializeEventSource() {
      const { entityId, apiKey, apiSecret } = this.config;
      this.eventSource = new EventSource(`${config.BACKEND_URL}api/entities/${entityId}/featureFlags/stream?apikey=${apiKey}&apisecret=${apiSecret}`);
      this.eventSource.addEventListener('message', this.handleMessage.bind(this));
    }
  
    handleMessage(event: { data: string; }) {
      const currentTime = Date.now();
      const timeSinceLastRequest = currentTime - this.lastRequestTime;
  
      if (timeSinceLastRequest >= this.minRequestInterval) {
        this.lastRequestTime = currentTime;
  
        const updatedConfig = JSON.parse(event.data);
        const flagsObject = updatedConfig.data.reduce((acc, flag) => { acc[flag.flagName] = flag; return acc; }, {});
        if (updatedConfig.entityId == props.entityId) {
          setFeatureFlags(flagsObject)
        }
      }
    }
  }
  
  // Usage
  const rateLimitedEventSource = new RateLimitedEventSource({
    entityId: props.entityId,
    apiKey: props.apiKey,
    apiSecret: props.apiSecret,
  });
  



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
