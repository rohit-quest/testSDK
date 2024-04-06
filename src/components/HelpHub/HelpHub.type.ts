import { CSSProperties, Dispatch, SetStateAction } from "react";

type HelphubStyleConfig = {
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
    },
    box1: {
        heading: string;
        subHeading: string;
        image: string;
    },
    box4: {
        heading: string;
        subHeading: string;
    },
    box5: {
        heading: string;
        subHeading: string;
    },
}

type HelpHubOthersContentTypes = {
    heading?: string;
    subHeading?: string;
}



export interface HelpHubProps {
    userId: string;
    token: string;
    questId?: string;
    uniqueUserId?: string;
    uniqueEmailId?: string;
    styleConfig?: HelphubStyleConfig
    contentConfig?: {
        Home?: HelpHubHomeContentTypes;
        Chat?: HelpHubOthersContentTypes;
        Help?: HelpHubOthersContentTypes;
        Updates?: HelpHubOthersContentTypes;
        Tasks?: HelpHubOthersContentTypes;
    }
    showFooter?: boolean;
    onlineComponent?:boolean;
    claimStatusUpdates?:string[] | [];
    setClaimStatusUpdates?:Dispatch<SetStateAction<string[]>>;
}
export interface HelpHubPropsOffline {
    userId: string;
    token: string;
    questId?: string;
    uniqueUserId?: string;
    uniqueEmailId?: string;
    styleConfig?: HelphubStyleConfig
    contentConfig?: {
        Home?: HelpHubHomeContentTypes;
        Chat?: HelpHubOthersContentTypes;
        Help?: HelpHubOthersContentTypes;
        Updates?: HelpHubOthersContentTypes;
        Tasks?: HelpHubOthersContentTypes;
    }
    showFooter?: boolean;
    ParentQuest?:QuestTypes;
    ChildQuest?:QuestCriteriaWithStatusType[][]
    onlineComponent?:boolean
    claimStatusUpdates?:string[] | [];
    setClaimStatusUpdates?:Dispatch<SetStateAction<string[] []>>;
}

export interface HelpHubHomeTypes {
    taskStatus?:number;
    questsData: QuestCriteriaWithStatusType[][];
    setSelectedSection: (section: string) => void;
    parentQuest?: QuestTypes;
    userId?: string;
    token?: string;
    styleConfig?: HelphubStyleConfig;
    contentConfig?: HelpHubHomeContentTypes;
    claimStatusTasks?:string[] | [];
    onlineComponent?:boolean;
    showFeedback?:boolean
    setShowFeedback?:Dispatch<SetStateAction<boolean>>;
}

export interface HelpHubChatTypes {
    styleConfig?: HelphubStyleConfig;
    contentConfig?: HelpHubOthersContentTypes;
}

export interface HelpHubFaqTypes {
    faqData: QuestCriteriaWithStatusType[];
    styleConfig?: HelphubStyleConfig;
    contentConfig?: HelpHubOthersContentTypes;
}

export interface HelpHubUpdatesTypes {
    updateData: QuestCriteriaWithStatusType[];
    questId: string;
    userId: string;
    token: string;
    contentConfig?: HelpHubOthersContentTypes;
    styleConfig?: HelphubStyleConfig;
    claimStatusUpdates?:string[] | [];
    setClaimStatusUpdates?:Dispatch<SetStateAction<string[] | []>> | undefined;
    onlineComponent?:boolean
}

export interface HelpHubTasksTypes {
    tasksData: QuestCriteriaWithStatusType[];
    questId: string;
    userId: string;
    token: string;
    contentConfig?: HelpHubOthersContentTypes;
    styleConfig?: HelphubStyleConfig;
    claimStatusTasks?:string[] | [];
    setClaimStatusTasks?:Dispatch<SetStateAction<string[] | []>>;
    onlineComponent?:boolean
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
    completed: boolean;
    isLocked?: boolean;
    data: QuestCriteriaType;
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
