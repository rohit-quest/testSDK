import { createContext, ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
  apiKey: string;
  apiSecret: string;
  entityId: string;
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
  setUser: (user: User) => {}
});

export const QuestProvider = (props: Props) => {
  const [user, setUser] = useState<User>({});

  return (
    <Context.Provider
      value={{
        apiKey: props.apiKey,
        apiSecret: props.apiSecret,
        entityId: props.entityId,
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
