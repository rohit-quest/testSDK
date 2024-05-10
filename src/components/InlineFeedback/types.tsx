import { CSSProperties } from 'react'

interface StyleConfig {
    Form?: CSSProperties;
    MainHeading?: CSSProperties;
    Heading?: CSSProperties;
    Description?: CSSProperties;
    ActionContainer?: CSSProperties;
    ActionButton?: CSSProperties;
    ActionSelectedButton?:CSSProperties;
    Footer?: CSSProperties,
    IconStyle?: CSSProperties;
    SelectedIconStyle?: CSSProperties
    closeIconColor?: string
}

export interface FeedbackProps {
    heading?: string;
    description?: string;
    type?: 'numbering' | 'emoji' | 'like' | 'star';
    count?: number,
    styleConfig?: StyleConfig;
    onChange?: (data: object) => void;
    userId: string;
    questId: string;
    token: string,
    onRequestClose?: () => void;
    initialState?: number
}
export interface FeedbackPropsOffline {
    heading?: string;
    description?: string;
    type?: 'numbering' | 'emoji' | 'like' | 'star';
    count?: number,
    styleConfig?: StyleConfig;
    onChange?: (data: object) => void;
    userId: string;
    questId: string;
    token: string,
    onRequestClose?: () => void;
    initialState?: number
    offlineFormData?:any
    setAnswer?:any
    closeIconColor?:string
}

export interface FeedBackComponentProps {
    onChange: (data: object) => void,
    count: number,
    style?: CSSProperties;
    buttonStyle?: CSSProperties;
    selectedButtonStyle?: CSSProperties;
    iconStyle?: CSSProperties;
    selectedIconStyle?: CSSProperties;
    initialState?: number
}