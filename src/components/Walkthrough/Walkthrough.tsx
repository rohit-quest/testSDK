import MultiRouteTour from "multiroute-tour-navigator";
import { MultiRouteTourProps } from "multiroute-tour-navigator/lib/MultiRouteTour";
import { ClientBoundingRect, HelperProps, TourNavigatorProps } from "tour-navigator/lib/TourNavigator/types";
import TourHelper from "./TourHelper";
import TourNavigator from "tour-navigator";
import { CSSProperties } from "react";
import Overlay from "./Overlay";

export enum WalkThroughType {
    SINGLEPAGE = 'singlepage',
    MULTIPAGE = 'multipage'
}

type ThemeConfig = {
    primaryColor?: string;
    secondaryColor?: string;
    borderColor?: string;
    buttonColor?: string;
    backgroundColor?: string;
    fontFamily?: string;
}

  
type StyleConfig = {
    Form?: CSSProperties;
    HelperContainer?: CSSProperties;
    Heading?: CSSProperties;
    Description?: CSSProperties;
    HelperBackground?: CSSProperties;
    Footer?: CSSProperties;
    FirstButton?: CSSProperties;
    LastButton?: CSSProperties;
    Image?: CSSProperties
}

interface WalkThroughProps extends MultiRouteTourProps, TourNavigatorProps {
    type?: WalkThroughType;
    onComplete?: () => void;
    styleConfig?: StyleConfig;
    themeConfig?: ThemeConfig;
}

export default function Walkthrough({ 
    type = WalkThroughType.SINGLEPAGE,
    onComplete,
    styleConfig,
    themeConfig,
    ...props 
}: WalkThroughProps): JSX.Element {

    const themeConfigCSS = {
        '--background': themeConfig?.backgroundColor,
        '--primary': themeConfig?.primaryColor,
        '--borderColor': themeConfig?.borderColor,
        '--buttonColor': themeConfig?.buttonColor,
        '--fontFamily': themeConfig?.fontFamily,
        '--secondaryColor': themeConfig?.secondaryColor,

    } as CSSProperties

    const CustomOverlay = styleConfig?.Form ? (overlayProps: ClientBoundingRect) => (
        <Overlay
            id={props.id}
            style={styleConfig?.Form}
            {...overlayProps}
        />
    ):undefined

    const CustomTourHelper = (helperProps: HelperProps) => (
        <TourHelper
            {...helperProps}
            helperStyle={{
                ...themeConfigCSS,
                ...styleConfig?.HelperContainer
            }}
            headerStyle={styleConfig?.Heading}
            descriptionStyle={styleConfig?.Description}
            helperBackgroundStyle={styleConfig?.HelperBackground}
            footerStyle={styleConfig?.Footer}
            firstButtonStyle={styleConfig?.FirstButton}
            lastButtonStyle={styleConfig?.LastButton}
            imgStyle={styleConfig?.Image}
            onComplete={onComplete}
        />
    )

    if (type == WalkThroughType.SINGLEPAGE) {
        return (
            <TourNavigator
                {...props}
                helper={CustomTourHelper}
                overlay={CustomOverlay}
            />
        )
    }
    return (
        <MultiRouteTour
            {...props}
            helper={CustomTourHelper}
            overlay={CustomOverlay}
        />
    )
}