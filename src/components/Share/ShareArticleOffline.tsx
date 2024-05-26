import React, { CSSProperties, useContext, useEffect, useState } from "react";
import "./sharearticle.css";
import { telegramPng, twitterSvg, whatsappSvg } from "../../assets/images";
import { shareOnPlatform } from "../Refer/Response";
import axios from "axios";
import QuestContext from "../QuestWrapper.tsx";
import { QuestArray, Metadata } from "../HelpCenter/Svg.tsx";
import General from "../../general.ts";
import X from "./x.png";
import { xLogo } from "../FeedbackOverview/SVG.tsx";

export interface articleProps {
  heading?: string;
  description?: String;
  bgColor?: string;
  headingColor?: string;
  textColor?: string;
  token: string;
  questId: string;
  userId: string;
  enableVariation?: boolean;
  linkActionUrl?: string;
  offlineFormData?: any;
  styleConfig?: {
    Form?: CSSProperties;
    Heading?: CSSProperties;
    Description?: CSSProperties;
  };
}

type CustomHeaders = {
  apiKey: string;
  apisecret: string | undefined;
  userId: string;
  token: string;
};

async function getResponse(
  headers: CustomHeaders,
  entityId: string,
  questId: string,
  apiType: string,
  enableVariation: boolean,
  BACKEND_URL: string
): Promise<{ metadata: Metadata }> {
  const request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}?userId=${headers.userId}&getVariation=${enableVariation}`;

  let GeneralFunctions = new General("mixpanel", apiType);
  try {
    const res = await axios.get(request, { headers });
    const response = res.data.eligibilityData as QuestArray;
    return { metadata: response[0].data.metadata };
  } catch (error) {
    console.log(error);
    GeneralFunctions.captureSentryException(error);
    return { metadata: {} as Metadata };
  }
}

const ShareArticleOffline: React.FC<articleProps> = ({
  bgColor = "",
  description = "If you like this article share it with your friends",
  heading = "Share this article",
  headingColor = "",
  textColor = "",
  questId = "",
  token = "",
  userId = "",
  enableVariation = false,
  linkActionUrl,
  offlineFormData,
  styleConfig,
}: articleProps) => {
  const { apiType, themeConfig } = useContext(QuestContext.Context);
  const [shareLink, setLink] = useState<string | undefined>("");

  let GeneralFunctions = new General("mixpanel", apiType);
  useEffect(() => {
    GeneralFunctions.fireTrackingEvent(
      "quest_share_article_offline_loaded",
      "share_article_offline"
    );
    // setLink(linkActionUrl);
  }, []);

  //   useEffect(())

  return (
    <div
      className="q_share_article"
      style={{
        background:
          styleConfig?.Form?.background || themeConfig?.backgroundColor,
        ...styleConfig,
      }}
    >
      <div className="q_article_div">
        <div className="q_article_up">
          <div
            className="q_article_head"
            style={{
              color: styleConfig?.Heading?.color || themeConfig?.primaryColor,
              fontFamily: themeConfig?.fontFamily,
              ...styleConfig?.Heading,
            }}
          >
            {heading}
          </div>
          <div
            className="q_article_desc"
            style={{
              color:
                styleConfig?.Description?.color || themeConfig?.secondaryColor,
              fontFamily: themeConfig?.fontFamily,
              ...styleConfig?.Description,
            }}
          >
            {description}
          </div>
        </div>
        <div className="q_article_dn">
          <div
            className="q_article_wit"
            style={{
              color: styleConfig?.Description?.color,
              fontFamily: themeConfig?.fontFamily,
            }}
          >
            Share with
          </div>
          <div className="q_article_img">
            <div
              className="q-referShare-content-social-img-x"
              onClick={() => {
                GeneralFunctions.fireTrackingEvent(
                  "quest_share_article_twitter_clicked",
                  "share_article"
                );
                shareOnPlatform(offlineFormData[0]?.linkUrl, "twitter");
              }}
            >
              {xLogo()}
            </div>
            <img
              className="q-referShare-content-social-img"
              src={whatsappSvg}
              onClick={() => {
                GeneralFunctions.fireTrackingEvent(
                  "quest_share_article_whatsapp_clicked",
                  "share_article"
                );
                shareOnPlatform(offlineFormData[0]?.linkUrl, "whatsapp");
              }}
              alt="Whatsapp"
            />
            <img
              className="q-referShare-content-social-img"
              onClick={() => {
                GeneralFunctions.fireTrackingEvent(
                  "quest_share_article_telegram_clicked",
                  "share_article"
                );
                shareOnPlatform(offlineFormData[0]?.linkUrl, "telegram");
              }}
              src={telegramPng}
              width="24px"
              alt="telegramPng"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareArticleOffline;
