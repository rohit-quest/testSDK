import MultiRouteTour from "multiroute-tour-navigator";
import { MultiRouteTourProps } from "multiroute-tour-navigator/lib/MultiRouteTour";
import { Align, ClientBoundingRect, HelperProps, Position, TourNavigatorProps, OverlayProps } from "tour-navigator/lib/TourNavigator/types";
import TourHelper from "./TourHelper";
import TourNavigator from "tour-navigator";
import { CSSProperties, useContext } from "react";
import Overlay from "./Overlay";
import QuestWrapper from "../QuestWrapper";

export enum WalkThroughType {
    SINGLEPAGE = 'singlepage',
    MULTIPAGE = 'multipage'
}
  
type StyleConfig = {
    Form?: CSSProperties;
    Background?: CSSProperties;
    Heading?: CSSProperties;
    Description?: CSSProperties;
    Footer?: CSSProperties;
    FirstButton?: CSSProperties;
    LastButton?: CSSProperties;
    Image?: CSSProperties;
    Overlay?: CSSProperties
}

interface WalkThroughProps extends MultiRouteTourProps, TourNavigatorProps {
    type?: WalkThroughType;
    onComplete?: () => void;
    styleConfig?: StyleConfig;
}

export default function Walkthrough({ 
    type = WalkThroughType.SINGLEPAGE,
    onComplete,
    styleConfig,
    ...props 
}: WalkThroughProps): JSX.Element {

    const { themeConfig } = useContext(QuestWrapper.Context);

    const themeConfigCSS = {
        '--background': themeConfig?.backgroundColor,
        '--primaryColor': themeConfig?.primaryColor,
        '--borderColor': themeConfig?.borderColor,
        '--buttonColor': themeConfig?.buttonColor,
        '--fontFamily': themeConfig?.fontFamily,
        '--secondaryColor': themeConfig?.secondaryColor,
    } as CSSProperties

    const CustomOverlay = styleConfig?.Overlay ? (overlayProps: ClientBoundingRect) => (
        <Overlay
            id={props.id}
            style={styleConfig?.Overlay}
            {...overlayProps}
        />
    ):undefined

    const CustomTourHelper = (helperProps: HelperProps) => (
        <TourHelper
            {...helperProps}
            helperStyle={{
                ...themeConfigCSS,
                ...styleConfig?.Form
            }}
            headerStyle={styleConfig?.Heading}
            descriptionStyle={styleConfig?.Description}
            helperBackgroundStyle={styleConfig?.Background}
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

export type WalkthroughHelperProps = HelperProps
export type WalkthroughOverlayProps = OverlayProps
export { Align, Position }