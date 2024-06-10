import { CSSProperties, Dispatch, SetStateAction } from "react";

type HelphubStyleConfig = {
  Main?: CSSProperties;
  Home?: {
    Form?: CSSProperties;
    BannerText?: CSSProperties;
    Card?: CSSProperties;
    Heading?: CSSProperties;
    SubHeading?: CSSProperties;
    Button?: CSSProperties;
  };
  Chat?: {
    Form?: CSSProperties;
    Topbar?: {
      Heading?: CSSProperties;
      SubHeading?: CSSProperties;
    };
    Card?: {
      Heading?: CSSProperties;
      SubHeading?: CSSProperties;
      Image?: CSSProperties;
    };
    Searchbox?: CSSProperties;
  };
  Help?: {
    Form?: CSSProperties;
    Topbar?: {
      Heading?: CSSProperties;
      SubHeading?: CSSProperties;
    };
    Card?: {
      Heading?: CSSProperties;
      SubHeading?: CSSProperties;
    };
    Searchbox?: CSSProperties;
  };
  Updates?: {
    Form?: CSSProperties;
    Topbar?: {
      Heading?: CSSProperties;
      SubHeading?: CSSProperties;
    };
    Card?: {
      Heading?: CSSProperties;
      SubHeading?: CSSProperties;
    };
    Searchbox?: CSSProperties;
  };
  Tasks?: {
    Form?: CSSProperties;
    Topbar?: {
      Heading?: CSSProperties;
      SubHeading?: CSSProperties;
    };
    Card?: {
      Heading?: CSSProperties;
      SubHeading?: CSSProperties;
    };
    Searchbox?: CSSProperties;
  };
  Footer?: CSSProperties;
};

type HelpHubHomeContentTypes = {
  heading?: string;
  chatButton?: {
    heading: string;
    subHeading: string;
  };
  box1: {
    heading: string;
    subHeading: string;
    image: string;
  };
  box4: {
    heading: string;
    subHeading: string;
  };
  box5: {
    heading: string;
    subHeading: string;
  };
};

type HelpHubOthersContentTypes = {
  heading?: string;
  subHeading?: string;
};

export interface HelpHubProps {
  userId: string;
  token: string;
  questId?: string;
  uniqueUserId?: string;
  uniqueEmailId?: string;
  styleConfig?: HelphubStyleConfig;
  contentConfig?: {
    Home?: HelpHubHomeContentTypes;
    Chat?: HelpHubOthersContentTypes;
    Help?: HelpHubOthersContentTypes;
    Updates?: HelpHubOthersContentTypes;
    Tasks?: HelpHubOthersContentTypes;
  };
  showFooter?: boolean;
  // onlineComponent?: boolean;
  claimStatusUpdates?: string[] | [];
  setClaimStatusUpdates?: Dispatch<SetStateAction<string[]>>;
  helphubPosition?: "SIDEBAR" | "POPUP" | "USER_CHOICE" ;
  variation?: string;
  entityLogo?: string;
  defaultAutoPopupMessages? : string[];
  popupOpenDelay?: number;
  autoPopupOpenAfter?: "ONE_DAY" | "EVERY_TIME" | "ONCE";
}
export interface HelpHubPropsOffline {
  Main?: {
    height?: string;
    width?: string;
  };
  userId: string;
  token: string;
  questId?: string;
  uniqueUserId?: string;
  uniqueEmailId?: string;
  styleConfig?: HelphubStyleConfig;
  contentConfig?: {
    Home?: HelpHubHomeContentTypes;
    Chat?: HelpHubOthersContentTypes;
    Help?: HelpHubOthersContentTypes;
    Updates?: HelpHubOthersContentTypes;
    Tasks?: HelpHubOthersContentTypes;
  };
  showFooter?: boolean;
  ParentQuest?: QuestTypes;
  ChildQuest?: QuestCriteriaWithStatusType[][];
  // onlineComponent?: boolean;
  claimStatusUpdates?: string[] | [];
  setClaimStatusUpdates?: Dispatch<SetStateAction<string[][]>>;
  entityLogo?: string;
  defaultAutoPopupMessages? : string[];
  popupOpenDelay?: number;
}

export interface HelpHubHomeTypes {
  taskStatus?: number;
  questsData: QuestCriteriaWithStatusType[][];
  setSelectedSection: (section: string) => void;
  parentQuest?: any;
  userId?: string;
  token?: string;
  styleConfig?: HelphubStyleConfig;
  contentConfig?: HelpHubHomeContentTypes;
  claimStatusTasks?: string[] | [];
  onlineComponent?: boolean;
  showFeedback?: boolean;
  setShowFeedback?: Dispatch<SetStateAction<boolean>>;
  entityImage?: string;
  uniqueUserId?: string;
  uniqueEmailId?: string;
}

export interface HelpHubChatTypes {
  apiType?: string;
  entityId?: string;
  userId?: string;
  token?: string;
  apiKey?: string;
  styleConfig?: HelphubStyleConfig;
  contentConfig?: HelpHubOthersContentTypes;
  showBottomNavigation?: boolean;
  setShowBottomNavigation?: Dispatch<SetStateAction<boolean>>;
  entityImage?: string;
  entityName?: string;
  setHelpHub: Dispatch<SetStateAction<boolean>>;
  uniqueUserId?: string;
  uniqueEmailId?: string;
  position?: string;
  sendAutoMessage?: string;
  setSendAutoMessage?: Dispatch<SetStateAction<string>>;
  chat?: MessageTypes[];
  setChat?: Dispatch<SetStateAction<MessageTypes[]>>;
  filterChat?: MessageTypes[];
  setFilterChat?: Dispatch<SetStateAction<MessageTypes[]>>;
  fetchData?: boolean;
  setFetchData?: Dispatch<SetStateAction<boolean>>;
}

export interface HelpHubFaqTypes {
  faqData: QuestCriteriaWithStatusType[];
  styleConfig?: HelphubStyleConfig;
  contentConfig?: HelpHubOthersContentTypes;
  setHelpHub: Dispatch<SetStateAction<boolean>>;
  uniqueUserId?: string;
  uniqueEmailId?: string;
}

export interface HelpHubUpdatesTypes {
  updateData: QuestCriteriaWithStatusType[];
  questId: string;
  campaignVariationId: string;
  userId: string;
  token: string;
  contentConfig?: HelpHubOthersContentTypes;
  styleConfig?: HelphubStyleConfig;
  claimStatusUpdates?: string[] | [];
  setClaimStatusUpdates?: Dispatch<SetStateAction<string[] | []>> | undefined;
  onlineComponent?: boolean;
  showBottomNavigation?: boolean;
  setShowBottomNavigation?: Dispatch<SetStateAction<boolean>>;
  entityImage?: string;
  setHelpHub: Dispatch<SetStateAction<boolean>>;
  uniqueUserId?: string;
  uniqueEmailId?: string;
}

export interface HelpHubTasksTypes {
  tasksData: QuestCriteriaWithStatusType[];
  questId: string;
  campaignVariationId: string;
  userId: string;
  token: string;
  contentConfig?: HelpHubOthersContentTypes;
  styleConfig?: HelphubStyleConfig;
  claimStatusTasks?: string[] | [];
  setClaimStatusTasks?: Dispatch<SetStateAction<string[] | []>>;
  onlineComponent?: boolean;
  setHelpHub: Dispatch<SetStateAction<boolean>>;
  uniqueUserId?: string;
  uniqueEmailId?: string;
}

interface Metadata {
  question?: string;
  answer?: string;
  linkActionName?: string;
  linkActionUrl?: string;
  description?: string;
  effort: string;
  importance: string;
  xp: number;
  frequency: string;
}

export interface QuestCriteriaType {
  xp: number;
  dependentCriterias: any[];
  frequency: string;
  criteriaType: string;
  criteriaId: string;
  questId: string;
  metadata: Metadata;
  requiresApproval: boolean;
  createdAt: string;
}

export interface QuestCriteriaWithStatusType {
  // completed: boolean;
  // isLocked?: boolean;
  // data: QuestCriteriaType;
  type: string;
  question: string;
  description: string;
  options: string[];
  criteriaId: string;
  required: boolean;
  linkTitle: string;
  linkUrl: string;
  manualInput: boolean | string;
  completed: boolean;
  answer: string;
  createdAt: string;
  imageUrl: string;
}

export interface QuestTypes {
  eligibilityCriterias?: QuestCriteriaType[];
  rewards: any[];
  isDeleted: boolean;
  hasReferral: boolean;
  referralXP: number;
  visibility: string;
  status: string;
  xp: number;
  minXPThreshold: number;
  categories: (string | null)[];
  isPrivate: boolean;
  allowRepeatEntries: boolean;
  dependentQuests: string[];
  isDependentCriterias: boolean;
  isDependentQuests: boolean;
  priority: number;
  childQuestIDs: string[];
  conditionRelations: [];
  _id: string;
  questId: string;
  entityId: string;
  title: string;
  description: string;
  imageURL: string;
  endsAt: string;
  skills: string[];
  type: string;
  createdAt: string;
  conditions: any[];
  __v: number;
}

type ConversationId = string;

export type Conversation = {
  senderRole: "ASSISTANT" | "USER" | "ADMIN";
  _id?: string;
  senderId: string;
  content: string;
  timestamp: string;
};

export interface MessageTypes {
  createdAt: string;
  title?: string;
  entityId: string;
  isArchived: boolean;
  isResolved: boolean;
  onlyAdminReply: boolean;
  userId: string;
  conversations: Conversation;
  conversationId: ConversationId;
  isClosed: boolean;
}
