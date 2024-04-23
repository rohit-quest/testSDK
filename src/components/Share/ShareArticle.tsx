import React, { useContext, useEffect, useState } from 'react'
import "./sharearticle.css"
import {
  telegramPng,
  twitterSvg,
  whatsappSvg,
} from "../../assets/images";
import { shareOnPlatform } from "../Refer/Response"
import axios from 'axios';
import config from '../../config';
import QuestContext from "../QuestWrapper.tsx";
import { QuestArray, Metadata } from '../HelpCenter/Svg.tsx';
import General from '../../general.ts';

export interface articleProps {
  heading?: string;
  description?: String;
  bgColor?: string;
  headingColor?: string;
  textColor?: string;
  token: string;
  questId: string;
  userId: string,
  enableVariation?: boolean
}

type CustomHeaders = {
  apiKey: string;
  apisecret: string;
  userId: string;
  token: string;
}

async function getResponse(headers: CustomHeaders, entityId: string, questId: string, apiType: string, enableVariation: boolean): Promise<{ metadata: Metadata }> {
  const request = `${config.BACKEND_URL}api/entities/${entityId}/quests/${questId}?userId=${headers.userId}&getVariation=${enableVariation}`;
  let GeneralFunctions = new General('mixpanel', apiType);
  try {
    const res = await axios.get(request, { headers })
    const response = res.data.eligibilityData as QuestArray;
    return { metadata: response[0].data.metadata };
  } catch (error) {
    console.log(error);
    GeneralFunctions.captureSentryException(error);
    return { metadata: {} as Metadata };
  }
}


const ShareArticle: React.FC<articleProps> = ({
  bgColor = "white",
  description = "If you like this article share it with your friends",
  heading = "Share this article",
  headingColor = "black",
  textColor = "",
  questId = "",
  token = "",
  userId = "",
  enableVariation = false
}: articleProps) => {

  const [shareLink, setLink] = useState("https://www.questlabs.ai/")
  const { apiKey, apiSecret, entityId ,apiType} = useContext(QuestContext.Context);
  let GeneralFunctions = new General('mixpanel', apiType);
  useEffect(() => {
    GeneralFunctions.fireTrackingEvent("quest_share_article_loaded", "share_article");

    getResponse({ apiKey, apisecret: apiSecret, token, userId }, entityId, questId,apiType, enableVariation)
      .then((response) => {
        setLink(response.metadata.linkActionUrl)
      })
  }, [])

  return (
    <div className='q_share_article' style={{ color: textColor, backgroundColor: bgColor }}>
      <div className='q_article_div'>
        <div className='q_article_up'>
          <div className='q_article_head' style={{ color: headingColor }}>{heading}</div>
          <div className='q_article_desc' style={{color: textColor}}>{description}</div>
        </div>
        <div className='q_article_dn'>
          <div className='q_article_wit' style={{color: textColor}}>Share with</div>
          <div className='q_article_img'>
            <img
              className="q-referShare-content-social-img"
              onClick={() => {
                GeneralFunctions.fireTrackingEvent("quest_share_article_twitter_clicked", "share_article");
                shareOnPlatform(shareLink, "twitter")
              }}
              src={twitterSvg}
              alt="Twitter"
            />
            <img
              className="q-referShare-content-social-img"
              src={whatsappSvg}
              onClick={() => {
                GeneralFunctions.fireTrackingEvent("quest_share_article_whatsapp_clicked", "share_article");
                shareOnPlatform(shareLink, "whatsapp")
              }}
              alt="Whatsapp"
            />
            <img
              className="q-referShare-content-social-img"
              onClick={() => {
                GeneralFunctions.fireTrackingEvent("quest_share_article_telegram_clicked", "share_article");
                shareOnPlatform(shareLink, "telegram")
              }}
              src={telegramPng} width="24px"
              alt="telegramPng"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShareArticle;