import MultiRouteTour from "multiroute-tour-navigator";
import { MultiRouteTourProps } from "multiroute-tour-navigator/lib/MultiRouteTour";
import { Align, ClientBoundingRect, HelperProps, Position, TourNavigatorProps, OverlayProps } from "tour-navigator/lib/TourNavigator/types";
import TourHelper from "./TourHelper";
import TourHelperTooltip from "./TourHelperTooltip";
import TourNavigator from "tour-navigator";
import { CSSProperties, useContext } from "react";
import Overlay from "./Overlay";
import QuestWrapper from "../QuestWrapper";
import { TourHelperProps } from "./types";

type WalkThroughType = 'singlepage' | 'multipage'


type StyleConfig = {
    Form?: CSSProperties;
    Background?: CSSProperties;
    Heading?: CSSProperties;
    Description?: CSSProperties;
    Footer?: CSSProperties;
    FirstButton?: CSSProperties;
    LastButton?: CSSProperties;
    Image?: CSSProperties;
    Overlay?: CSSProperties;
    Arrow?: CSSProperties;
    Highlighter?: CSSProperties;
}

interface WalkThroughProps extends MultiRouteTourProps, TourNavigatorProps {
    type?: WalkThroughType;
    tooltip?: boolean;
    hideArrow?: boolean;
    onComplete?: () => void;
    styleConfig?: StyleConfig;
    handleFirstButtonClick?: (props: HelperProps) => void
    handleLastButtonClick?: (props: HelperProps) => void
}

export default function Walkthrough({ 
    type = 'singlepage',
    tooltip = false,
    onComplete,
    hideArrow,
    styleConfig,
    handleFirstButtonClick,
    handleLastButtonClick,
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

    const CustomOverlay = (overlayProps: ClientBoundingRect) => (
        <Overlay
            id={props.id || ''}
            style={styleConfig?.Overlay}
            
            {...overlayProps}
        />
    )

    const CustomTourHelper = (helperProps: HelperProps) => {
        const TourHelperComponent = tooltip ? TourHelperTooltip:TourHelper
    
        return (
            <TourHelperComponent
                {...helperProps}
                helperStyle={{
                    ...themeConfigCSS,
                    ...styleConfig?.Form
                }}
                hideArrow={hideArrow}
                arrowStyle={styleConfig?.Arrow}
                headerStyle={styleConfig?.Heading}
                descriptionStyle={styleConfig?.Description}
                helperBackgroundStyle={styleConfig?.Background}
                footerStyle={styleConfig?.Footer}
                firstButtonStyle={styleConfig?.FirstButton}
                lastButtonStyle={styleConfig?.LastButton}
                imgStyle={styleConfig?.Image}
                onComplete={onComplete}
                handleFirstButtonClick={handleFirstButtonClick}
                handleLastButtonClick={handleLastButtonClick}
            />
        )
    }

    if (type == 'singlepage') {
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