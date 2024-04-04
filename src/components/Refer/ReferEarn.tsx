import {
  copySVG,
  copyLargeSVG,
  giftPng,
  telegramPng,
  twitterSvg,
  tick,
  whatsappSvg,
} from "../../assets/images";
import "./Refer.css";
import { useContext, useEffect, useState } from "react";
import { referProp, response, shareOnPlatform } from "./Response.ts";
import QuestContext from "../QuestWrapper.tsx";
import PopupComponent from "./Popup.tsx";
import ShareArticle from "../Share/ShareArticle.tsx";
import General from "../../general.ts";

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
  headingColor,
  uniqueEmailId,
  uniqueUserId
}: referProp) => {
  const [shareCode, setCode] = useState("");
  const [copy, setCopy] = useState(false);
  const { apiKey, apiSecret, entityId, apiType } = useContext(QuestContext.Context);
  const style = !!color && !!bgColor ? { color, backgroundColor: bgColor } : {};
  let GeneralFunctions = new General('mixpanel', apiType);
  useEffect(() => {
    const eventFire = async () => {
      const data = await GeneralFunctions.fireTrackingEvent("quest_refer_share_loaded", "refer_share");
    }
    eventFire();

    response(questId, {
      apiKey,
      userid: userId,
      entityId,
      apisecret: apiSecret,
      token,
      apiType
    }).then((r) => setCode(r.referralCode || ""));
  }, []);

  useEffect(() => {
    if (entityId && uniqueUserId) {
      const functions = new General('')
      functions.getExternalLogin({ apiType, uniqueUserId, entityId, userId, apiKey, apiSecret, token, uniqueEmailId })
    }
  }, [])

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
                  const copy = async () => {
                    const data = await GeneralFunctions.fireTrackingEvent("quest_refer_share_referral_code_copy_button_clicked", "refer_share");
                  }
                  copy();
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
              onClick={() => {
                const twitter = async () => {
                  const data = await GeneralFunctions.fireTrackingEvent("quest_refer_share_twitter_button_clicked", "refer_share");
                }
                twitter();
                shareOnPlatform(shareCode, "twitter")
              }}
              src={twitterSvg}
              alt="Twitter"
            />

            {/* Whatsapp */}
            <img
              className="q-referShare-content-social-img"
              src={whatsappSvg}
              onClick={() => {
                const whatsapp = async () => {
                  const data = await GeneralFunctions.fireTrackingEvent("quest_refer_share_whatsapp_button_clicked", "refer_share");
                }
                whatsapp();
                shareOnPlatform(shareCode, "whatsapp")
              }}
              alt="Whatsapp"
            />
            <img
              className="q-referShare-content-social-img"
              onClick={() => {
                const telegram = async () => {
                  const data = await GeneralFunctions.fireTrackingEvent("quest_refer_share_telegram_button_clicked", "refer_share");
                }
                telegram();
                shareOnPlatform(shareCode, "telegram")
              }}
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
  uniqueEmailId,
  uniqueUserId
}: referProp) => {
  const [shareCode, setCode] = useState("");
  const [copy, setCopy] = useState(false);
  const { apiKey, apiSecret, entityId ,apiType } = useContext(QuestContext.Context);
  const [share, setshare] = useState(false);
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

  useEffect(() => {
    if (entityId && uniqueUserId) {
      const functions = new General('')
      functions.getExternalLogin({ apiType, uniqueUserId, entityId, userId, apiKey, apiSecret, token, uniqueEmailId })
    }
  }, [])

  return (
    <div className="q-referEarn" style={style}>
      <PopupComponent onClose={() => setshare(false)} isOpen={share}>
        <div className="q-referShare-content-social">
          <div className="q-referEarn-pop-div">
            <img
              className="q-referShare-content-social-img"
              onClick={() => shareOnPlatform(shareCode, "twitter")}
              src={twitterSvg}
              alt="Twitter"
            />
            Twitter
          </div>
          <div className="q-referEarn-pop-div" style={style}>
            <img
              className="q-referShare-content-social-img"
              onClick={() => shareOnPlatform(shareCode, "telegram")}
              src={telegramPng}
              alt="telegramPng"
            />
            Telegram
          </div>
          <div className="q-referEarn-pop-div" style={style}>
            <img
              className="q-referShare-content-social-img"
              src={whatsappSvg}
              onClick={() => shareOnPlatform(shareCode, "whatsapp")}
              alt="Whatsapp"
            />
            Whatsapp
          </div>
        </div>
      </PopupComponent>
      <img src={giftPng} className="q-referEarn-gift-img" alt="giftPng" />
      <div className="q-referEarn-head" style={style}>Your referral code:</div>
      <div className="q-referEarn-para" style={style}>
        Share your referral code with your friends and get benefits.
      </div>
      <div className="q-referEarn-rect">
        <div style={{ display: "inline" }}>{shareCode}</div>
        <img
          className="q-referEarn-copy-img"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigator.clipboard.writeText(shareCode).then(() => setCopy(true));
          }}
          src={copy ? tick : copyLargeSVG}
          width="20px"
          alt="tick"
        />
      </div>
      <button onClick={() => setshare(true)} className="q-referEarn-invite">
        Invite Friends
      </button>
    </div>
  );
};

// export const Refer
