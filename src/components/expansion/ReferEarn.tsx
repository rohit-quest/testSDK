import {
  referIcon,
} from "../../assets/images";
import "./Refer.css";
import React, { useContext, useEffect, useState } from "react";
import { shareOnPlatform } from "./Response.ts";
import QuestContext from "../QuestWrapper.tsx";
import { copyIcon, faceBookIcon, linkedInIcon, tickIcon, twitterIcon } from "./Svg.ts";
import QuestLabs from "../QuestLabs.tsx";
import { PrimaryButton } from "../Modules/PrimaryButton.tsx";
import Label from "../Modules/Label.tsx";
import axios from "axios";
import config from "../../config.ts";
import Cookies from "universal-cookie";
import General from "../../general.ts";

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
  showFooter?: boolean;
  showRefferalLogo?: boolean;
  gradientBackgroundColor?: string;
  uniqueEmailId?: string,
  uniqueUserId?: string,
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
  showFooter = true,
  gradientBackgroundColor,
  uniqueEmailId,
  uniqueUserId,
  styleConfig,
  showRefferalLogo = true,

}: referProp) => {
  const [shareCode, setCode] = useState("");
  const [copy, setCopy] = useState([false, false]);
  const { apiKey, apiSecret, entityId, themeConfig, apiType } = useContext(QuestContext.Context);

  let GeneralFunctions = new General('mixpanel', apiType);

  const handleCopy = (index: number) => {
    navigator?.clipboard.writeText(!index ? shareCode : referralLink + shareCode);
    setCopy(prev => prev.map((e, i) => i == index ? true : e));
    setTimeout(() => {
      setCopy(prev => prev.map((e, i) => i == index ? false : e));
    }, 3000);
    onCopy(!index ? shareCode : referralLink + shareCode);
  }

  let BACKEND_URL = apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL;

  const response = async (
    questId = "",
    headers: {
      apiKey: string;
      userid: string;
      entityId: string;
      token: string;
      apisecret: string;
    }
  ) => {
    try {
      const request = `${BACKEND_URL}api/entities/${headers.entityId}/quests/${questId}/users/${headers.userid}/referralcode`;
      const { data }: { data: { success: boolean; referralCode?: string } } =
        await axios.get(request, { headers });
      return data;
    } catch (error) {
      GeneralFunctions.captureSentryException(error);
      return { success: false };
    }
  };

  useEffect(() => {
    GeneralFunctions.fireTrackingEvent("quest_referral_loaded", "referral");
    if (!!uniqueUserId || !!uniqueEmailId) {
      let cookies = new Cookies();
      let externalUserId = cookies.get("externalUserId");
      let questUserId = cookies.get("questUserId");
      let questUserToken = cookies.get("questUserToken");

      const headers = {
        apiKey: apiKey,
        apisecret: apiSecret,
        userId: userId,
        token: token,
      };

      const body = {
        externalUserId: !!uniqueUserId && uniqueUserId,
        entityId: entityId,
        email: uniqueEmailId
      }

      if (questUserId && questUserToken) {
        response(questId, {
          apiKey,
          userid: questUserId,
          entityId,
          apisecret: apiSecret || "",
          token: questUserToken,
        }).then((r) => setCode(r.referralCode || ""));
      } else {
        axios.post(`${BACKEND_URL}api/users/external/login`, body, { headers })
          .then((res) => {
            let { userId, token } = res.data;
            response(questId, {
              apiKey,
              userid: userId,
              entityId,
              apisecret: apiSecret || "",
              token,
            }).then((r) => setCode(r.referralCode || ""));

            const date = new Date();
            date.setHours(date.getHours() + 12)
            cookies.set("externalUserId", uniqueUserId, { path: "/", expires: date })
            cookies.set("questUserId", userId, { path: "/", expires: date })
            cookies.set("questUserToken", token, { path: "/", expires: date })
          }).catch((error) => {
            console.error("Error:", error);
            GeneralFunctions.captureSentryException(error);
          })
      }
    } else if (userId) {
      response(questId, {
        apiKey,
        userid: userId,
        entityId,
        apisecret: apiSecret || "",
        token,
      }).then((r) => setCode(r.referralCode || ""));
    }
  }, []);

  const jsx = (
    <div className="q_refer_and_earn" style={{
      background: styleConfig?.Form?.backgroundColor || themeConfig?.backgroundColor, height: styleConfig?.Form?.height || "auto", fontFamily: themeConfig.fontFamily || "'Figtree', sans-serif", ...styleConfig?.Form
    }}>

      {showRefferalLogo &&
        <div className="q_refer_head" >
          <img src={referIcon} className="refer_head_img" alt="" />
        </div>
      }
      <div className="q_refer_content" >
        <div className="refer_content_box" >
          <div className="q_refer_heading" style={{color : styleConfig?.Heading?.color || themeConfig?.primaryColor, ...styleConfig?.Heading}}>{heading}</div>
          <div className="q_refer_desc" style={{color : styleConfig?.Description?.color || themeConfig?.secondaryColor,...styleConfig?.Description}}>{description}</div>
        </div>
        {showReferralCode && <div className="q_refer_code_content">
          <Label children={'Referal Code'} style={styleConfig?.Label} />
          <div className="q_refer_code_box" style={{borderColor : themeConfig?.borderColor, ...styleConfig?.Input}}>
            <div className="q_refer_code" style={{color: styleConfig?.Input?.color || styleConfig?.Description?.color ||  themeConfig?.secondaryColor,...styleConfig?.Input}}>{shareCode}</div>
            <img className="q_refer_copy_icon" src={copy[0] ? tickIcon(styleConfig?.Icon?.color) : copyIcon(secondaryIconColor)} onClick={() => {
              GeneralFunctions.fireTrackingEvent("quest_referral_refer_code_copy_btn_clicked", "referral");
              handleCopy(0)
            }} alt="" />
          </div>
        </div>}
        {referralLink && <div className="q_refer_code_content">
          <Label children={'Invitation Link'} style={styleConfig?.Label} />
          <div className="q_refer_code_box" style={{borderColor : themeConfig?.borderColor, ...styleConfig?.Input}}>
            <div className="q_refer_code" style={{color: styleConfig?.Description?.color || styleConfig?.Input?.color || themeConfig?.secondaryColor,...styleConfig?.Input}}>{referralLink}{shareCode}</div>
            <img className="q_refer_copy_icon" src={copy[1] ? tickIcon(styleConfig?.Icon?.color) : copyIcon(secondaryIconColor)} onClick={() => {
              GeneralFunctions.fireTrackingEvent("quest_referral_invitation_link_btn_clicked", "referral");
              handleCopy(1)
            }} alt="" />
          </div>
        </div>}

        <PrimaryButton
          children={shareButtonText}
          style={{ border: styleConfig?.PrimaryButton?.border || '1.5px solid #D1ACFF', ...styleConfig?.PrimaryButton }}
          onClick={() => {
            GeneralFunctions.fireTrackingEvent("quest_referral_copy_referral_primary_btn_clicked", "referral");
            navigator.clipboard.writeText(referralLink + shareCode); onCopy(shareCode)
          }}
          type="button"
        />

        <div className="q_social_links">
          <img className="q_social_link_icon" style={styleConfig?.Icon} onClick={() => {
            GeneralFunctions.fireTrackingEvent("quest_referral_linkedin_btn_clicked", "referral");
            shareOnPlatform(referralLink + shareCode, "linkedin")
          }} src={linkedInIcon(styleConfig?.Icon?.color)} alt="" />
          <img className="q_social_link_icon" style={styleConfig?.Icon} onClick={() => {
           GeneralFunctions.fireTrackingEvent("quest_referral_facebook_btn_clicked", "referral");
            shareOnPlatform(referralLink + shareCode, "facebook")
          }} src={faceBookIcon(styleConfig?.Icon?.color)} alt="" />
          <img className="q_social_link_icon" style={styleConfig?.Icon} onClick={() => {
            GeneralFunctions.fireTrackingEvent("quest_referral_twitter_btn_clicked", "referral");
            shareOnPlatform(referralLink + shareCode, "twitter")
          }} src={twitterIcon(styleConfig?.Icon?.color)} alt="" />
        </div>
      </div>
      {(!gradientBackground && showFooter) && <QuestLabs style={styleConfig?.Footer} />
      }
    </div>
  );

  if (gradientBackground) return <div className="q_gradient_background" style={{
    fontFamily: themeConfig.fontFamily || "'Figtree', sans-serif", background: gradientBackgroundColor
  }}>
    <div className="q_gradient_head">
      <div className="q_gradient_heading" style={styleConfig?.Heading}>{primaryHeading}</div>
      <div className="q_gradient_description" style={styleConfig?.Description}>{primaryDescription}</div>
    </div>
    {jsx}
    <div className="q_gradient_quest_powered">
      {showFooter && <QuestLabs style={styleConfig?.Footer} />
      }
    </div>
  </div>
  return jsx;

};