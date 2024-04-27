import { CSSProperties } from 'react'

export enum FeedbackType {
    NUMBERING = 'numbering',
    LIKE = 'like',
    EMOJI = 'emoji',
    STAR = 'star',
}

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
}

export interface FeedbackProps {
    heading?: string;
    description?: string;
    type?: FeedbackType;
    count?: number,
    styleConfig?: StyleConfig;
    onChange?: (data: object) => void;
    userId: string;
    questId: string;
    token: string,
    onRequestClose?: () => void;
    initialState?: number
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