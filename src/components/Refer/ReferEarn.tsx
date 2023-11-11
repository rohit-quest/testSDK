import {
  closePng,
  copySVG,
  copyLargeSVG,
  giftPng,
  telegramPng,
  twitterSvg,
  tick,
  whatsappSvg,
  discordSvg,
} from "../../assets/images";
import "./Refer.css";
import { useContext, useEffect, useState } from "react";
import { referProp, response, shareOnPlatform } from "./Response.ts";
import QuestContext from "../QuestWrapper.tsx";
import PopupComponent from "./Popup.tsx";

export const ReferShare = ({
  isOpen = true,
  questId = "",
  userId = "",
  token = "",
  color,
  bgColor,
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
              <div style={{display: "inline"}} className="q-referShare-content-code" style={style}>
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
}: referProp) => {
  const [shareCode, setCode] = useState("");
  const [copy, setCopy] = useState(false);
  const { apiKey, apiSecret, entityId } = useContext(QuestContext.Context);
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

  return (
    <div className="q-referEarn" style={style}>
      <PopupComponent onClose={() => setshare(false)} isOpen={share}>
        <div className="q-referShare-content-social">
          <div className="q-referEarn-pop-div">
            <img
              onClick={() => shareOnPlatform(shareCode, "twitter")}
              src={twitterSvg}
              className="q-referShare-content-social-img"
              alt=""
            />
            Twitter
          </div>
          <div className="q-referEarn-pop-div" style={style}>
            <img
              onClick={() => shareOnPlatform(shareCode, "telegram")}
              src={telegramPng}
              className="q-referShare-content-social-img"
              alt=""
            />
            Telegram
          </div>
        </div>
      </PopupComponent>
      <img src={giftPng} className="q-referEarn-gift-img" alt="giftPng" />
      <div className="q-referEarn-head" style={style}>Your referral code:</div>
      <div className="q-referEarn-para" style={style}>
        Share your referral code with your friends and get benefits.
      </div>
      <div className="q-referEarn-rect">
        <div style={{display: "inline"}}>{shareCode}</div>
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
      <button  onClick={() => setshare(true)} className="q-referEarn-invite">
        Invite Friends
      </button>
    </div>
  );
};

// export const Refer
