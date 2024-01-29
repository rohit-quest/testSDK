import {
  copySVG,
  copyLargeSVG,
  giftPng,
  telegramPng,
  twitterSvg,
  tick,
  whatsappSvg,
  referIcon,
} from "../../assets/images";
import "./Refer.css";
import { useContext, useEffect, useState } from "react";
import { referProp, response, shareOnPlatform } from "./Response.ts";
import QuestContext from "../QuestWrapper.tsx";
import ShareArticle from "../Share/ShareArticle.tsx";
import { copyIcon, faceBookIcon, linkedInIcon, tickIcon, twitterIcon } from "./Svg.ts";
import QuestLabs from "../QuestLabs.tsx";

export const ReferShare = ({
  isOpen = true,
  questId = "",
  userId = "",
  token = "",
  color,
  bgColor,
  isArticle = false,
  description,
  heading,
  headingColor
}: referProp) => {
  const [shareCode, setCode] = useState("");
  const [copy, setCopy] = useState(false);
  const { apiKey, apiSecret, entityId } = useContext(QuestContext.Context);
  const style = !!color && !!bgColor ? { color, backgroundColor: bgColor } : {};

  useEffect(() => {
    response(questId, {
      apiKey,
      userid: userId,
      entityId,
      apisecret: apiSecret,
      token,
    }).then((r) => setCode(r.referralCode || ""));
  }, []);
  if (isArticle)
    return (<ShareArticle
      questId={questId}
      description={description}
      heading={heading}
      headingColor={headingColor}
      token={token} userId={userId}
      bgColor={bgColor}
      textColor={color}
    />)
  if (!isOpen) return <></>;
  return (
    <div className="q-referShare" style={style}>
      <div className="q-referShare-content">
        <div className="q-referShare-content-text">
          <div className="q-referShare-content-head" style={style}>
            Invite your friends
          </div>
          <div className="q-referShare-content-para" style={style}>
            Share your unique referral code with friends and receive 10 coins in
            credits each time a friend signs up!
          </div>
          <div className="q-referShare-referralCode">
            <div>Referral code</div>
            <div className="q-referShare-content-rect" style={style}>
              <div style={{ display: "inline", ...style }} className="q-referShare-content-code" >
                {shareCode}
              </div>
              <img
                className="q-referEarn-copy-img"
                onClick={() => {
                  navigator.clipboard
                    .writeText(shareCode)
                    .then(() => setCopy(true));
                }}
                src={copy ? tick : copySVG}
                style={{ cursor: "pointer" }}
                width="16px"
                alt="tick"
              />
            </div>
          </div>
          <div className="q-referShare-content-msg">
            <div style={style}>Share with your community</div>
          </div>
          <div className="q-referShare-content-social">
            {/* Twitter */}
            <img
              className="q-referShare-content-social-img"
              onClick={() => shareOnPlatform(shareCode, "twitter")}
              src={twitterSvg}
              alt="Twitter"
            />

            {/* Whatsapp */}
            <img
              className="q-referShare-content-social-img"
              src={whatsappSvg}
              onClick={() => shareOnPlatform(shareCode, "whatsapp")}
              alt="Whatsapp"
            />
            <img
              className="q-referShare-content-social-img"
              onClick={() => shareOnPlatform(shareCode, "telegram")}
              src={telegramPng}
              alt="telegramPng"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ReferEarn = ({
  questId = "",
  userId = "",
  token = "",
  color = "black",
  bgColor = "white",
  heading = 'Referral link and code',
  description = 'Share your unique referral code with friends and receive 10 coins in credits each time a friend signs up!',
  invitationLink = "",
  shareButtonText = "Share Referral Link",
  iconColor  = "#0065FF",
  secondaryIconColor = "black"
}: referProp) => {
  const [shareCode, setCode] = useState("");
  const [copy, setCopy] = useState([false,false]);
  const { apiKey, apiSecret, entityId } = useContext(QuestContext.Context);
  const [share, setshare] = useState(false);
  const style = !!color && !!bgColor ? { color, backgroundColor: bgColor } : {};

  const handleCopy = (index: number)=>{
    navigator?.clipboard.writeText(shareCode);
    setCopy(prev=>prev.map((e,i)=>i==index?true:e));
  }

  useEffect(() => {
    response(questId, {
      apiKey,
      userid: userId,
      entityId,
      apisecret: apiSecret,
      token,
    }).then((r) => setCode(r.referralCode || ""));
  }, []);

  return (
    <div className="q_refer_and_earn">
      <div className="q_refer_head">
        <img src={referIcon} className="refer_head_img" alt="" />
      </div>
      <div className="q_refer_content">
        <div className="refer_content_box">
          <div className="q_refer_heading">{heading}</div>
          <div className="q_refer_desc">{description}</div>
        </div>
        <div className="q_refer_code_content">
          <div className="q_refer_text">Referal Code</div>
          <div className="q_refer_code_box">
            <div className="q_refer_code">{shareCode}</div>
            <img className="q_refer_copy_icon" src={copy[0]?tickIcon(iconColor):copyIcon(secondaryIconColor)} onClick={()=>handleCopy(0)} alt="" />
          </div>
        </div>
        {invitationLink && <div className="q_refer_code_content">
          <div className="q_refer_text">Invitation Link</div>
          <div className="q_refer_code_box">
            <div className="q_refer_code">{invitationLink}</div>
            <img className="q_refer_copy_icon" src={copy[1]?tickIcon(iconColor):copyIcon(secondaryIconColor)} onClick={()=>handleCopy(1)} alt="" />
          </div>
        </div>}
        <div className="q_share_link_button">{shareButtonText}</div>
        <div className="q_social_links">
          <img className="q_social_link_icon" onClick={() => shareOnPlatform(shareCode, "linkedin")} src={linkedInIcon(iconColor)} alt="" />
          <img className="q_social_link_icon" onClick={() => shareOnPlatform(invitationLink, "facebook")} src={faceBookIcon(iconColor)} alt="" />
          <img className="q_social_link_icon" onClick={() => shareOnPlatform(shareCode, "twitter")} src={twitterIcon(iconColor)} alt="" />
        </div>
      </div>
      <QuestLabs backgroundColor={bgColor} color={secondaryIconColor} />
    </div>
  );
};

// export const Refer
