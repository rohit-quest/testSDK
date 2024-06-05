import { CSSProperties } from "react";
import { HelperProps } from "tour-navigator/lib/TourNavigator/types";

export interface TourHelperProps extends HelperProps {
    headerStyle?: CSSProperties;
    descriptionStyle?: CSSProperties;
    helperBackgroundStyle?: CSSProperties;
    helperStyle?: CSSProperties;
    footerStyle?: CSSProperties;
    firstButtonStyle?: CSSProperties;
    lastButtonStyle?: CSSProperties;
    imgStyle?: CSSProperties,
    onComplete?: () => void
}