import "./crossSelling.css";
import "../expansion/Refer.css";
import { CSSProperties, useContext, useEffect, useRef, useState } from "react";
import { getResponse } from "./Response.ts";
import QuestContext from "../QuestWrapper.tsx";
import { grabDealIcon } from "./Svg.ts";
import { grabDealIcon2 } from "./Svg.ts";
import QuestLabs from "../QuestLabs.tsx";
import config from "../../config.ts";
import General from "../../general.ts";
import { SecondaryButton } from "../Modules/SecondaryButton.tsx";
import { PrimaryButton } from "../Modules/PrimaryButton.tsx";
import axios from "axios";
import { Input } from "../Modules/Input.tsx";
import Label from "../Modules/Label.tsx";





type BrandTheme = {
    accentColor?: string;
    background?: string;
    borderRadius?: string;
    buttonColor?: string;
    contentColor?: string;
    fontFamily?: string;
    logo?: string;
    primaryColor?: string;
    secondaryColor?: string;
    tertiaryColor?: string;
    titleColor?: string;
}
interface QuestThemeData {
    accentColor: string;
    theme: string;
    borderRadius: string;
    buttonColor: string;
    images: string[]
}
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
    BrandTheme?: BrandTheme;
    QuestThemeData?: QuestThemeData;
    Icon?: 'gift' | 'percentage';
    styleConfig?: {
        Form?: CSSProperties,
        BackgroundWrapper?: CSSProperties,
        Heading?: CSSProperties,
        Description?: CSSProperties,
        PrimaryButton?: CSSProperties,
        SecondaryButton?: CSSProperties,
        gradientHeading?: CSSProperties,
        gradientDescription?: CSSProperties,
        Input?: CSSProperties,
        Timer?: {
            primaryColor?: string,
            secondaryColor?: string,
            backgroundColor?: string,
            TimerCard?: CSSProperties
        },
        Footer?: CSSProperties
        Icon?: CSSProperties,
        Label?: CSSProperties,
        EmailError?: {
            text?: string,
            errorStyle?: CSSProperties
        }
    };
    showFooter?:boolean,
    variation?:string

}

export const CrossSelling = ({
    questId = "",
    userId = "",
    token = "",
    heading = '50% off on limited products',
    description = 'Grab deals before they go off!!!',
    shareButtonText = "Avail now",
    gradientBackground = false,
    primaryHeading = 'Grab your deal',
    primaryDescription = 'Welcome back, Please complete your details',
    showDays = false,
    expiryDate = 0,
    claimRewardHandler = (email?: string) => { },
    backButtonTrigger = () => { },
    uniqueEmailId,
    uniqueUserId,
    styleConfig,
    BrandTheme,
    QuestThemeData,
    showFooter = true,
    variation,
    Icon = 'gift'
}: referProp) => {
    const { apiKey, apiSecret, entityId, apiType, themeConfig } = useContext(QuestContext.Context);
    const BACKEND_URL = apiType === "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL;
     const [email, setEmail] = useState("");
    const [questThemeData, setQuestThemeData] = useState<QuestThemeData>( QuestThemeData || {
        accentColor: "",
        theme: "",
        borderRadius: "",
        buttonColor: "",
        images: []
    })
    const [brandTheme, setBrandTheme] = useState<BrandTheme>( BrandTheme  || {
        accentColor: "",
        background: "",
        borderRadius: "",
        buttonColor: "",
        contentColor: "",
        fontFamily: "",
        logo: "",
        primaryColor: "",
        secondaryColor: "",
        tertiaryColor: "",
        titleColor: ""
    })


    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const requestRef = useRef<number>(expiryDate);

    const getTheme = async (theme: string) => {
        try {
            const request = `${BACKEND_URL}api/entities/${entityId}?userId=${userId}`;
            const response = await axios.get(request, { headers: { apiKey, userId, token } })
            setBrandTheme(response?.data?.data?.theme?.BrandTheme[theme])
        } catch (error) {
            GeneralFunctions.captureSentryException(error);
        }
    }


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
    let GeneralFunctions = new General('mixpanel', apiType);
    useEffect(() => {
        GeneralFunctions.fireTrackingEvent("quest_cross_selling_loaded", "cross_selling");
        let isMounted = true;
        getResponse({ apiKey, token, userId }, entityId, questId, BACKEND_URL)
            .then((r) => {
                if (isMounted && r) {
                    if(r.sdkConfig?.uiProps?.questThemeData){
                        setQuestThemeData(r.sdkConfig?.uiProps?.questThemeData)
                        // getTheme(r.uiProps?.questThemeData.theme) // disable for now
                    }

                    console.log(Date.parse(r.endsAt))
                    requestRef.current =  +(Date.parse(r.endsAt) || r.endsAt);

                    animate();
                } else {
                    requestRef.current = expiryDate;
                    animate();
                }
            })
            .catch((error) => {
                GeneralFunctions.captureSentryException(error);
                console.log('Error fetching expiryDate:', expiryDate);
                requestRef.current = expiryDate;
            });
        if (entityId && uniqueUserId) {
            const functions = new General('')
            functions.getExternalLogin({ apiType, uniqueUserId, entityId, userId, apiKey, apiSecret, token, uniqueEmailId })
        }

        return () => {
            isMounted = false;
            cancelAnimationFrame(requestRef.current);
        };
    }, []);


    const handleEmail = (email: string) => {
        claimRewardHandler(email)
    }



    const jsx = (
        <div className="q_refer_and_earn" style={{
            // background: styleConfig?.Form?.background || themeConfig?.backgroundColor, ...styleConfig?.Form
            background: styleConfig?.Form?.backgroundColor || BrandTheme?.background || themeConfig?.backgroundColor, height: styleConfig?.Form?.height || "auto", fontFamily: themeConfig.fontFamily || "'Figtree', sans-serif", borderRadius: styleConfig?.Form?.borderRadius || questThemeData?.borderRadius || BrandTheme?.borderRadius, ...styleConfig?.Form
        }}>
            <div className="q_refer_head">
                <img src={QuestThemeData?.images?.[0] || Icon === 'gift' ? grabDealIcon() : grabDealIcon2()} className="refer_head_img" alt="" />
            </div>
            <div className="q_refer_content">
                <div className="refer_content_box">
                    <div className="q_refer_heading" style={{ color: styleConfig?.Heading?.color || BrandTheme?.primaryColor || themeConfig?.primaryColor, ...styleConfig?.Heading }}>{heading}</div>
                    <div className="q_refer_desc" style={{ color: styleConfig?.Description?.color || BrandTheme?.secondaryColor || themeConfig?.secondaryColor, ...styleConfig?.Description }}>{description}</div> 
                </div>
                <div className="q_time_left">
                    {showDays && !!timeLeft.days && (<div className="q_hours_left" style={{ background: styleConfig?.Timer?.backgroundColor, ...styleConfig?.Timer?.TimerCard }}>
                        <div style={{ color: styleConfig?.Timer?.primaryColor || BrandTheme?.primaryColor }}>{timeLeft.days}</div>
                        <div className="q_time_left_text" style={{ color:  styleConfig?.Timer?.secondaryColor || BrandTheme?.secondaryColor }}>Days</div>
                    </div>)}
                    <div className="q_hours_left" style={{ background: styleConfig?.Timer?.backgroundColor, ...styleConfig?.Timer?.TimerCard }}>
                        <div style={{ color: styleConfig?.Timer?.primaryColor || BrandTheme?.primaryColor }}>{timeLeft.hours < 10 ? 0 : ""}{timeLeft.hours}</div>
                        <div className="q_time_left_text" style={{ color:  styleConfig?.Timer?.secondaryColor || BrandTheme?.secondaryColor }}>Hours</div>
                    </div>
                    <div className="q_minutes_left" style={{ background: styleConfig?.Timer?.backgroundColor, ...styleConfig?.Timer?.TimerCard }}>
                        <div style={{ color: styleConfig?.Timer?.primaryColor || BrandTheme?.primaryColor }}>{timeLeft.minutes < 10 ? 0 : ""}{timeLeft.minutes}</div>
                        <div className="q_time_left_text" style={{ color: styleConfig?.Timer?.secondaryColor || BrandTheme?.secondaryColor }}>Minutes</div>
                    </div>
                    <div className="q_seconds_left" style={{ background: styleConfig?.Timer?.backgroundColor, ...styleConfig?.Timer?.TimerCard }}>
                        <div style={{ color: styleConfig?.Timer?.primaryColor || BrandTheme?.primaryColor }}>{timeLeft.seconds < 10 ? 0 : ""}{timeLeft.seconds}</div>
                        <div className="q_time_left_text" style={{ color: styleConfig?.Timer?.secondaryColor || BrandTheme?.secondaryColor }}>Seconds</div>
                    </div>
                </div>
                <div style={{width: "100%"}}>
                <Label
                     htmlFor={"normalInput"}
                    children={'Email Address'}
                    style={styleConfig?.Label}
                />
                <Input
                    type="email"
                    style={styleConfig?.Input}
                    placeholder={'Enter your email address'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    emailtext={styleConfig?.EmailError?.text == undefined ? "This is not a valid email" : styleConfig?.EmailError?.text}
                    emailErrorStyle={styleConfig?.EmailError?.errorStyle}
                    
                />
                </div>
                <PrimaryButton
                    style={{
                        background: styleConfig?.PrimaryButton?.background || questThemeData?.buttonColor || brandTheme?.buttonColor || themeConfig?.buttonColor,
                        ...styleConfig?.PrimaryButton
                    }}
                    onClick={() => {
                        GeneralFunctions.fireTrackingEvent("quest_challenges_primary_btn_clicked", "challenges");
                        handleEmail(email)
                    }}
                    className="q_share_link_button"
                    disabled={!email}
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
                    onClick={() => {
                        GeneralFunctions.fireTrackingEvent("quest_challenges_secondaryy_btn_clicked", "challenges");
                        backButtonTrigger()
                    }}
                    className="q_share_link_button_2"
                >
                    Go to home
                </SecondaryButton>
            </div>
            {(!gradientBackground && showFooter) &&  <QuestLabs style={{ background:  styleConfig?.Footer?.backgroundColor || styleConfig?.Form?.backgroundColor || styleConfig?.Form?.background || brandTheme?.background  || themeConfig?.backgroundColor, ...styleConfig?.Footer }} />}
        </div>
    );

    if (gradientBackground) return <div className="q_gradient_background" style={{
        fontFamily: themeConfig.fontFamily || "'Figtree', sans-serif",
        ...styleConfig?.BackgroundWrapper
    }}>
        <div className="q_gradient_head">
            <div className="q_gradient_heading">{primaryHeading}</div>
            <div className="q_gradient_description">{primaryDescription}</div>
        </div>
        {jsx}
        <div className="q_gradient_quest_powered">
            {showFooter && <QuestLabs style={styleConfig?.Footer} />}
        </div>
    </div>
    return jsx;

};