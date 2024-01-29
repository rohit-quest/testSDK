import {
    referIcon,
} from "../../assets/images";
import "./crossSelling.css";
import { useContext, useEffect, useState } from "react";
import { response, shareOnPlatform } from "./Response.ts";
import QuestContext from "../QuestWrapper.tsx";
import { copyIcon, faceBookIcon, grabDealIcon, linkedInIcon, tickIcon, twitterIcon } from "./Svg.ts";
import QuestLabs from "../QuestLabs.tsx";

export interface referProp {
    isOpen?: boolean; questId: string;
    headingColor?: string;
    userId: string;
    token: string;
    color?: string;
    bgColor?: string;
    isArticle?: boolean
    heading?: string;
    description?: String;
    invitationLink?: string;
    shareButtonText?: string;
    iconColor?: string;
    secondaryIconColor?: string;
    gradientBackground?: boolean;
    primaryHeading?: string;
    primaryDescription?: string
}

export const CrossSelling = ({
    questId = "",
    userId = "",
    token = "",
    color = "",
    bgColor = "",
    heading = '50% off on limited products',
    description = 'Grab deals before they go off!!!',
    invitationLink = "https://questlabs.ai/",
    shareButtonText = "Avail now",
    iconColor = "#0065FF",
    secondaryIconColor = "black",
    gradientBackground = false,
    primaryHeading = 'Grab your deal',
    primaryDescription = 'Welcome back, Please complete your details'
}: referProp) => {
    const [shareCode, setCode] = useState("");
    const [copy, setCopy] = useState([false, false]);
    const { apiKey, apiSecret, entityId } = useContext(QuestContext.Context);
    const style = !!color && !!bgColor ? { color, backgroundColor: bgColor } : {};

    const [timeLeft,setTimeLeft] = useState({hours: 8,minutes: 25,seconds: 45})

    useEffect(() => {
        response(questId, {
            apiKey,
            userid: userId,
            entityId,
            apisecret: apiSecret,
            token,
        }).then((r) => setCode(r.referralCode || ""));
    }, []);

    const jsx = (
        <div className="q_refer_and_earn" style={style}>
            <div className="q_refer_head" style={style}>
                <img src={grabDealIcon()} className="refer_head_img" alt="" />
            </div>
            <div className="q_refer_content" style={style}>
                <div className="refer_content_box" style={style}>
                    <div className="q_refer_heading" style={style}>{heading}</div>
                    <div className="q_refer_desc" style={style}>{description}</div>
                </div>
                <div className="q_time_left">
                    <div className="q_hours_left">{timeLeft.hours}</div>
                    <div className="q_minutes_left">{timeLeft.minutes}</div>
                    <div className="q_seconds_left"></div>
                </div>
                <div style={style} className="q_share_link_button">{shareButtonText}</div>
                <div style={style} className="q_share_link_button_2">Go to home</div>
            </div>
            {!gradientBackground && <QuestLabs backgroundColor={bgColor} color={secondaryIconColor} />}
        </div>
    );

    if (gradientBackground) return <div className="q_gradient_background">
        <div className="q_gradient_head">
            <div className="q_gradient_heading">{primaryHeading}</div>
            <div className="q_gradient_description">{primaryDescription}</div>
        </div>
        {jsx}
        <div className="q_gradient_quest_powered">
            <QuestLabs backgroundColor={bgColor} color={secondaryIconColor} />
        </div>
    </div>
    return jsx;

};