import {
    referIcon,
} from "../../assets/images";
import "./crossSelling.css";
import "../expansion/Refer.css";
import { CSSProperties, useContext, useEffect, useRef, useState } from "react";
import { getResponse, response, shareOnPlatform } from "./Response.ts";
import QuestContext from "../QuestWrapper.tsx";
import { grabDealIcon } from "./Svg.ts";
import QuestLabs from "../QuestLabs.tsx";
import config from "../../config.ts";
import General from "../../general.ts";
import { SecondaryButton } from "../Modules/SecondaryButton.tsx";
import { PrimaryButton } from "../Modules/PrimaryButton.tsx";

export interface referProp {
    questId: string;
    headingColor?: string;
    userId: string;
    token: string;
    color?: string;
    bgColor?: string;
    heading?: string;
    description?: String;
    shareButtonText?: string;
    iconColor?: string;
    gradientBackground?: boolean;
    primaryHeading?: string;
    primaryDescription?: string;
    showDays?: boolean;
    expiryDate?: number;
    claimRewardHandler?: Function;
    backButtonTrigger?: Function;
    uniqueEmailId?: string;
    uniqueUserId?: string;
    styleConfig?: {
        Form?: CSSProperties,
        BackgroundWrapper?: CSSProperties,
        Heading?: CSSProperties,
        Description?: CSSProperties,
        PrimaryButton?: CSSProperties,
        SecondaryButton?: CSSProperties,
        Timer?: {
            primaryColor: string,
            secondaryColor: string,
            backgroundColor: string
        },
        Footer?: CSSProperties
    }
}

export const CrossSelling = ({
    questId = "",
    userId = "",
    token = "",
    heading = '50% off on limited products',
    description = 'Grab deals before they go off!!!',
    shareButtonText = "Avail now",
    gradientBackground = true,
    primaryHeading = 'Grab your deal',
    primaryDescription = 'Welcome back, Please complete your details',
    showDays = false,
    expiryDate = 0,
    claimRewardHandler = ()=>{},
    backButtonTrigger = ()=>{},
    uniqueEmailId,
    uniqueUserId,
    styleConfig
}: referProp) => {
    const { apiKey, apiSecret, entityId, apiType, themeConfig } = useContext(QuestContext.Context);
    const BACKEND_URL = apiType === "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL;

    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const requestRef = useRef<number>(expiryDate);
    
    const animate = () => {
        const currentTime = Date.now();
        const remainingTime = requestRef.current - currentTime;
        if (remainingTime <= 0) {
            setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            return;
        }
    
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    
        setTimeLeft({ days, hours, minutes, seconds });
        
        requestAnimationFrame(animate);
    };
    
    useEffect(() => {
        let isMounted = true; 
        getResponse({ apiKey, token, userId }, entityId, questId, BACKEND_URL)
            .then((r) => {
                if (isMounted && r) {
                    requestRef.current = +r; 
                    animate();
                } else {
                    requestRef.current = expiryDate;
                    animate();
                }
            })
            .catch(() => {
                console.log('Error fetching expiryDate:', expiryDate);
                requestRef.current = expiryDate;
            });
         if(entityId && uniqueUserId)   {
            const functions = new General('')
            functions.getExternalLogin({ apiType, uniqueUserId, entityId, userId, apiKey, apiSecret, token, uniqueEmailId })
         }
    
        return () => {
            isMounted = false; 
            cancelAnimationFrame(requestRef.current);
        };
    }, []);
    
    

    const jsx = (
        <div className="q_refer_and_earn" style={{
            // background: styleConfig?.Form?.background || themeConfig?.backgroundColor, ...styleConfig?.Form
            background: styleConfig?.Form?.backgroundColor || themeConfig?.backgroundColor, height: styleConfig?.Form?.height || "auto", fontFamily: themeConfig.fontFamily || "'Figtree', sans-serif", ...styleConfig?.Form
            }}>
            <div className="q_refer_head">
                <img src={grabDealIcon()} className="refer_head_img" alt="" />
            </div>
            <div className="q_refer_content">
                <div className="refer_content_box">
                    <div className="q_refer_heading" style={{color: styleConfig?.Heading?.color || themeConfig?.primaryColor, ...styleConfig?.Heading}}>{heading}</div>
                    <div className="q_refer_desc" style={{color: styleConfig?.Description?.color || themeConfig?.primaryColor, ...styleConfig?.Description}}>{description}</div>
                </div>
                <div className="q_time_left">
                    {showDays && !!timeLeft.days && (<div className="q_hours_left" style={{background: styleConfig?.Timer?.backgroundColor}}>
                        <div style={{color: styleConfig?.Timer?.primaryColor}}>{timeLeft.days}</div>
                        <div className="q_time_left_text" style={{color: styleConfig?.Timer?.secondaryColor}}>Days</div>
                    </div>)}
                    <div className="q_hours_left" style={{background: styleConfig?.Timer?.backgroundColor}}>
                        <div style={{color: styleConfig?.Timer?.primaryColor}}>{timeLeft.hours < 10 ? 0 : ""}{timeLeft.hours}</div>
                        <div className="q_time_left_text" style={{color: styleConfig?.Timer?.secondaryColor}}>Hours</div>
                    </div>
                    <div className="q_minutes_left" style={{background: styleConfig?.Timer?.backgroundColor}}>
                        <div style={{color: styleConfig?.Timer?.primaryColor}}>{timeLeft.minutes < 10 ? 0 : ""}{timeLeft.minutes}</div>
                        <div className="q_time_left_text" style={{color: styleConfig?.Timer?.secondaryColor}}>Minutes</div>
                    </div>
                    <div className="q_seconds_left" style={{background: styleConfig?.Timer?.backgroundColor}}>
                        <div style={{color: styleConfig?.Timer?.primaryColor}}>{timeLeft.seconds < 10 ? 0 : ""}{timeLeft.seconds}</div>
                        <div className="q_time_left_text" style={{color: styleConfig?.Timer?.secondaryColor}}>Seconds</div>
                    </div>
                </div>
                <PrimaryButton 
                    style={{
                        background: styleConfig?.PrimaryButton?.background || themeConfig?.buttonColor,
                        ...styleConfig?.PrimaryButton
                    }} 
                    onClick={()=>claimRewardHandler()} 
                    className="q_share_link_button"
                >
                    {shareButtonText}
                </PrimaryButton>
                <SecondaryButton 
                    style={{
                        borderColor: styleConfig?.SecondaryButton?.borderColor || themeConfig?.borderColor,
                        backgroundColor: styleConfig?.SecondaryButton?.backgroundColor || themeConfig?.backgroundColor,
                        color: styleConfig?.SecondaryButton?.color || themeConfig?.primaryColor,
                        ...styleConfig?.SecondaryButton
                    }}
                    onClick={()=>backButtonTrigger()} 
                    className="q_share_link_button_2"
                >
                    Go to home
                </SecondaryButton>
            </div>
            {!gradientBackground &&<QuestLabs style={styleConfig?.Footer} />}
        </div>
    );

    if (gradientBackground) return <div className="q_gradient_background" style={{
        fontFamily: themeConfig.fontFamily || "'Figtree', sans-serif",
        ...styleConfig?.BackgroundWrapper}}>
        <div className="q_gradient_head">
            <div className="q_gradient_heading">{primaryHeading}</div>
            <div className="q_gradient_description">{primaryDescription}</div>
        </div>
        {jsx}
        <div className="q_gradient_quest_powered">
            <QuestLabs style={styleConfig?.Footer} />
        </div>
    </div>
    return jsx;

};