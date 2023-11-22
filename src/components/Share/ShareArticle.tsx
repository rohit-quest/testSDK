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

export interface articleProps {
  heading?: string;
  description?: String;
  bgColor?: string;
  headingColor?: string;
  textColor?: string;
  token: string;
  questId: string;
  userId: string
}

type CustomHeaders = {
  apiKey: string;
  apisecret: string;
  userId: string;
  token: string;
}

async function getResponse(headers: CustomHeaders, entityId: string, questId: string): Promise<{ metadata: Metadata }> {
  const request = `${config.BACKEND_URL}api/entities/${entityId}/quests/${questId}?userId=${headers.userId}`;
  try {
    const res = await axios.get(request, { headers })
    const response = res.data.eligibilityData as QuestArray;
    return { metadata: response[0].data.metadata };
  } catch (e) {
    console.log(e);
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
  userId = ""
}: articleProps) => {

  const [shareLink, setLink] = useState("https://www.questlabs.ai/")
  const { apiKey, apiSecret, entityId } = useContext(QuestContext.Context);

  useEffect(() => {
    getResponse({ apiKey, apisecret: apiSecret, token, userId }, entityId, questId)
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
              onClick={() => shareOnPlatform(shareLink, "twitter")}
              src={twitterSvg}
              alt="Twitter"
            />
            <img
              className="q-referShare-content-social-img"
              src={whatsappSvg}
              onClick={() => shareOnPlatform(shareLink, "whatsapp")}
              alt="Whatsapp"
            />
            <img
              className="q-referShare-content-social-img"
              onClick={() => shareOnPlatform(shareLink, "telegram")}
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