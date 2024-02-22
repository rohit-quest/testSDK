import {
  referIcon,
} from "../../assets/images";
import "./Refer.css";
import React, { useContext, useEffect, useState } from "react";
import { response, shareOnPlatform } from "./Response.ts";
import QuestContext from "../QuestWrapper.tsx";
import { copyIcon, faceBookIcon, linkedInIcon, tickIcon, twitterIcon } from "./Svg.ts";
import QuestLabs from "../QuestLabs.tsx";
import { PrimaryButton } from "../Modules/PrimaryButton.tsx";
import Label from "../Modules/Label.tsx";

export interface referProp {
  questId: string;
  headingColor?: string;
  userId: string;
  token: string;
  isArticle?: boolean
  heading?: string;
  description?: String;
  referralLink?: string;
  shareButtonText?: string;
  secondaryIconColor?: string;
  gradientBackground?: boolean;
  primaryHeading?: string;
  primaryDescription?: string;
  onCopy?: (referalCode: string) => void;
  showReferralCode?: boolean;
  showPoweredBy?: boolean;
  styleConfig?: {
    Form?: React.CSSProperties,
    Heading?: React.CSSProperties,
    Description?: React.CSSProperties,
    Input?: React.CSSProperties,
    Label?: React.CSSProperties,
    TextArea?: React.CSSProperties,
    PrimaryButton?: React.CSSProperties,
    SecondaryButton?: React.CSSProperties,
    Modal?: React.CSSProperties,
    Footer?: React.CSSProperties,
    Icon?: React.CSSProperties,
  }
}

export const Referral = ({
  questId = "",
  userId = "",
  token = "",
  heading = 'Referral link and code',
  description = 'Share your unique referral code with friends and receive 10 coins in credits each time a friend signs up!',
  referralLink = "",
  shareButtonText = "Copy Referral Link",
  secondaryIconColor = "#939393",
  gradientBackground = false,
  primaryHeading = 'Refer and earn!',
  primaryDescription = 'Welcome back, Please complete your details',
  onCopy = (referalCode: string) => { },
  showReferralCode = true,
  showPoweredBy = true,
  styleConfig
}: referProp) => {
  const [shareCode, setCode] = useState("");
  const [copy, setCopy] = useState([false, false]);
  const { apiKey, apiSecret, entityId, themeConfig } = useContext(QuestContext.Context);

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
    <div className="q_refer_and_earn" style={{background: themeConfig.backgroundColor,color: themeConfig.primaryColor,...styleConfig?.Form}}>
      <div className="q_refer_head" >
        <img src={referIcon} className="refer_head_img" alt="" />
      </div>
      <div className="q_refer_content" >
        <div className="refer_content_box" >
          <div className="q_refer_heading" style={styleConfig?.Heading}>{heading}</div>
          <div className="q_refer_desc" style={styleConfig?.Description}>{description}</div>
        </div>
        { showReferralCode && <div  className="q_refer_code_content">
          <Label children={'Referal Code'} style={styleConfig?.Label} />
          <div  className="q_refer_code_box">
            <div  className="q_refer_code">{shareCode}</div>
            <img className="q_refer_copy_icon" src={copy[0] ? tickIcon(styleConfig?.Icon?.color) : copyIcon(secondaryIconColor)} onClick={() => handleCopy(0)} alt="" />
          </div>
        </div>}
        {referralLink && <div  className="q_refer_code_content">
          <Label children={'Invitation Link'} style={styleConfig?.Label} />
          <div  className="q_refer_code_box">
            <div  className="q_refer_code">{referralLink}{shareCode}</div>
            <img className="q_refer_copy_icon" src={copy[1] ? tickIcon(styleConfig?.Icon?.color) : copyIcon(secondaryIconColor)} onClick={() => handleCopy(1)} alt="" />
          </div>
        </div>}
        <PrimaryButton 
          children={shareButtonText}
          style={styleConfig?.PrimaryButton}
          onClick={()=>{navigator.clipboard.writeText(referralLink+shareCode);onCopy(shareCode)}}
          type="button"
        />
        <div  className="q_social_links">
          <img className="q_social_link_icon" style={styleConfig?.Icon} onClick={() => shareOnPlatform(shareCode, "linkedin")} src={linkedInIcon(styleConfig?.Icon?.color)} alt="" />
          <img className="q_social_link_icon" style={styleConfig?.Icon} onClick={() => shareOnPlatform(referralLink, "facebook")} src={faceBookIcon(styleConfig?.Icon?.color)} alt="" />
          <img className="q_social_link_icon" style={styleConfig?.Icon} onClick={() => shareOnPlatform(shareCode, "twitter")} src={twitterIcon(styleConfig?.Icon?.color)} alt="" />
        </div>
      </div>
      {!gradientBackground && <QuestLabs style={styleConfig?.Footer} />
}
    </div>
  );

  if (gradientBackground) return <div className="q_gradient_background">
    <div className="q_gradient_head">
      <div className="q_gradient_heading" style={styleConfig?.Heading}>{primaryHeading}</div>
      <div className="q_gradient_description" style={styleConfig?.Description}>{primaryDescription}</div>
    </div>
    {jsx}
    <div className="q_gradient_quest_powered">
    {showPoweredBy && <QuestLabs style={styleConfig?.Footer} />
}
    </div>
  </div>
  return jsx;

};