import {
  referIcon,
} from "../../assets/images";
import "./Refer.css";
import React, { useContext, useEffect, useState } from "react";
import { response, shareOnPlatform } from "./Response.ts";
import QuestContext from "../QuestWrapper.tsx";
import { copyIcon, faceBookIcon, linkedInIcon, tickIcon, twitterIcon } from "./Svg.ts";
import QuestLabs from "../QuestLabs.tsx";

export interface referProp {
  questId: string;
  headingColor?: string;
  userId: string;
  token: string;
  color?: string;
  bgColor?: string;
  isArticle?: boolean
  heading?: string;
  description?: String;
  referralLink?: string;
  shareButtonText?: string;
  iconColor?: string;
  secondaryIconColor?: string;
  gradientBackground?: boolean;
  primaryHeading?: string;
  primaryDescription?: string;
  onCopy?: (referalCode: string) => void;
  showReferralCode?: boolean;
  showPoweredBy?: boolean;
  buttonStyle?: React.CSSProperties;
}

export const Referral = ({
  questId = "",
  userId = "",
  token = "",
  color = "",
  bgColor = "",
  heading = 'Referral link and code',
  description = 'Share your unique referral code with friends and receive 10 coins in credits each time a friend signs up!',
  referralLink = "",
  shareButtonText = "Copy Referral Link",
  iconColor = "#0065FF",
  secondaryIconColor = "#939393",
  gradientBackground = false,
  primaryHeading = 'Refer and earn!',
  primaryDescription = 'Welcome back, Please complete your details',
  onCopy = (referalCode: string) => { },
  showReferralCode = true,
  showPoweredBy = true,
  buttonStyle={},
}: referProp) => {
  const [shareCode, setCode] = useState("");
  const [copy, setCopy] = useState([false, false]);
  const { apiKey, apiSecret, entityId } = useContext(QuestContext.Context);
  const style = !!color && !!bgColor ? { color, backgroundColor: bgColor } : {};

  const handleCopy = (index: number) => {
    navigator?.clipboard.writeText(!index?shareCode:referralLink+shareCode);
    setCopy(prev => prev.map((e, i) => i == index ? true : e));
    setTimeout(() => {
      setCopy(prev => prev.map((e, i) => i == index ? false : e));
    }, 3000);
    onCopy(!index?shareCode:referralLink+shareCode);
  }

  useEffect(() => {
    response(questId, {
      apiKey,
      userid: userId,
      entityId,
      apisecret: apiSecret||"",
      token,
    }).then((r) => setCode(r.referralCode || ""));
  }, []);

  const jsx = (
    <div className="q_refer_and_earn" style={style}>
      <div className="q_refer_head" style={style}>
        <img src={referIcon} className="refer_head_img" alt="" />
      </div>
      <div className="q_refer_content" style={style}>
        <div className="refer_content_box" style={style}>
          <div className="q_refer_heading" style={style}>{heading}</div>
          <div className="q_refer_desc" style={style}>{description}</div>
        </div>
        { showReferralCode && <div style={style} className="q_refer_code_content">
          <div style={style} className="q_refer_text">Referal Code</div>
          <div style={style} className="q_refer_code_box">
            <div style={style} className="q_refer_code">{shareCode}</div>
            <img className="q_refer_copy_icon" src={copy[0] ? tickIcon(iconColor) : copyIcon(secondaryIconColor)} onClick={() => handleCopy(0)} alt="" />
          </div>
        </div>}
        {referralLink && <div style={style} className="q_refer_code_content">
          <div style={style} className="q_refer_text">Invitation Link</div>
          <div style={style} className="q_refer_code_box">
            <div style={style} className="q_refer_code">{referralLink}{shareCode}</div>
            <img className="q_refer_copy_icon" src={copy[1] ? tickIcon(iconColor) : copyIcon(secondaryIconColor)} onClick={() => handleCopy(1)} alt="" />
          </div>
        </div>}
        <div style={buttonStyle} className="q_share_link_button" onClick={()=>{navigator.clipboard.writeText(shareCode);onCopy(shareCode)}}>{shareButtonText}</div>
        <div style={style} className="q_social_links">
          <img className="q_social_link_icon" onClick={() => shareOnPlatform(shareCode, "linkedin")} src={linkedInIcon(iconColor)} alt="" />
          <img className="q_social_link_icon" onClick={() => shareOnPlatform(referralLink, "facebook")} src={faceBookIcon(iconColor)} alt="" />
          <img className="q_social_link_icon" onClick={() => shareOnPlatform(shareCode, "twitter")} src={twitterIcon(iconColor)} alt="" />
        </div>
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
    {showPoweredBy&&<QuestLabs backgroundColor={bgColor} color={secondaryIconColor} />}
    </div>
  </div>
  return jsx;

};