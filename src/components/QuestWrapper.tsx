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
  featureFlags?: FeatureFlags;
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
  const [featureFlags, setFeatureFlags] = useState({})

  useEffect(() => {
    getFeatureFlags()
  },[])

  async function getFeatureFlags(){
    const cookies = new Cookies();
    let featureFlag = cookies.get('featureFlags');
    if (!!featureFlag && Object.keys(featureFlag).length != 0) {
      setFeatureFlags(featureFlag)
      return;
    }
    
    let request = `${config.BACKEND_URL}api/entities/${props.entityId}/featureFlags`
    var response = await axios.get(request, { headers: {
      apikey: props.apiKey,
      apisecret: props.apiSecret,
    }});

    if (response.data.success) {
      const flagsObject = response.data.data.reduce((acc: any, flag: any) => { acc[flag.flagName] = {isEnabled: flag.isEnabled, isActive: flag.isActive}; return acc; }, {});
      const date = new Date();
      date.setMinutes(date.getMinutes() + 30);
      cookies.set('featureFlags', flagsObject, { path: '/', expires: date });
      setFeatureFlags(flagsObject)
    }
  }
  // class RateLimitedEventSource {
  //   config: { entityId: string; apiKey: string; apiSecret: string; };
  //   eventSource: null;
  //   lastRequestTime: number;
  //   minRequestInterval: number;
  //   constructor(config: { entityId: string; apiKey: string; apiSecret: string; }) {
  //     this.config = config;
  //     this.eventSource = null;
  //     this.lastRequestTime = 0;
  //     this.minRequestInterval = 1000000;
  //     this.initializeEventSource();
  //   }
  
  //   initializeEventSource() {
  //     const { entityId, apiKey, apiSecret } = this.config;
  //     this.eventSource = new EventSource(`http://localhost:8081/api/entities/e-0000000000/featureFlags/stream?apikey=k-6fe7e7dc-ac8f-44a1-8bbf-a1754ddf88be&apisecret=s-7462f377-2ce4-4593-a907-3a2a00cdf951be06358a-d95d-4576-b3b4-a07dda2dab36`);
  //     this.eventSource.addEventListener('message', this.handleMessage.bind(this));
  //   }
  
  //   handleMessage(event: { data: string; }) {
  //     const currentTime = Date.now();
  //     const timeSinceLastRequest = currentTime - this.lastRequestTime;
  
  //     if (timeSinceLastRequest >= this.minRequestInterval) {
  //       this.lastRequestTime = currentTime;
  
  //       const updatedConfig = JSON.parse(event.data);
  //       const flagsObject = updatedConfig.data.reduce((acc, flag) => { acc[flag.flagName] = {isEnabled: flag.isEnabled, isActive: flag.isActive}; return acc; }, {});
  //       let cookies = new Cookies()
  //       cookies.set("featureFlag", flagsObject)
  //       // if (updatedConfig.entityId == props.entityId) {
  //         setFeatureFlags(flagsObject)
  //       // }
  //     }
  //   }
  // }
  
  // Usage
  // const rateLimitedEventSource = new RateLimitedEventSource({
  //   entityId: props.entityId,
  //   apiKey: props.apiKey,
  //   apiSecret: props.apiSecret,
  // });
  



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
