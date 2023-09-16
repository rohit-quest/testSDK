import {closePng, copyPng, discordPng, giftPng, telegramPng, twitterPng, tick} from "../../assets/images";
import './Refer.css';
import {useContext, useEffect, useState} from "react";
import {referProp, response, shareOnPlatform} from "./Response.ts";
import QuestContext from "../QuestWrapper.tsx";


export const ReferShare = ({isOpen = true, onClose, questId = "", userId = "", token = ''}: referProp) => {

    const [shareCode, setCode] = useState("");
    const [copy, setCopy] = useState(false);
    const {apiKey, apiSecret, entityId} = useContext(QuestContext.Context);

    useEffect(() => {
        response(questId, {apiKey, userid: userId, entityId, apisecret: apiSecret, token})
            .then(r => setCode(r.referralCode || ""));
    }, []);

    if (!isOpen) return <></>
    return (
        <div className='q-referShare'>
            <div className='q-referShare-content'>
                <img src={closePng} className='q-referShare-content-close' alt="" onClick={() => onClose()}/>
                <div className='q-referShare-content-text'>
                    <h3 className='q-referShare-content-head'>Invite your friends</h3>
                    <p className='q-referShare-content-para'>
                        Share your unique referral code with friends and receive 10 coins in credits each time a friend
                        signs up!
                    </p>
                    <div className='q-referShare-content-rect'>
                        <span className='q-referShare-content-code'>{shareCode}</span>
                        <img src={copy ? tick : copyPng} className='q-referShare-content-copy-img' alt=""
                             onClick={() => {navigator.clipboard.writeText(shareCode).then(() => setCopy(true));                             }}/>
                    </div>
                    <p className='q-referShare-content-msg'>Share with your community</p>
                    <div className='q-referShare-content-social'>
                        <img onClick={()=>shareOnPlatform(shareCode,'twitter')} src={twitterPng} className='q-referShare-content-social-img' alt=""/>
                        <img onClick={()=>shareOnPlatform(shareCode,'discord')} src={discordPng} className='q-referShare-content-social-img' alt=""/>
                        <img onClick={()=>shareOnPlatform(shareCode,'telegram')} src={telegramPng} className='q-referShare-content-social-img' alt=""/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ReferEarn = () =>({ questId = "", userId = "", token = ''}: referProp) => {

    const [shareCode, setCode] = useState("");
    const [copy, setCopy] = useState(false);
    const {apiKey, apiSecret, entityId} = useContext(QuestContext.Context);

    useEffect(() => {
        response(questId, {apiKey, userid: userId, entityId, apisecret: apiSecret, token})
            .then(r => setCode(r.referralCode || ""));
    }, []);
    return (
        <div className='q-referEarn'>
            <img src={giftPng} className='q-referEarn-gift-img' alt=""/>
            <h3>Your referral code:</h3>
            <div className='q-referEarn-rect'>
                <span>{shareCode}</span>
                <img src={copy ? tick : copyPng} width='20px' alt="" onClick={() => {
                    navigator.clipboard.writeText(shareCode).then(() => setCopy(true));
                }}/>
            </div>
            <p className='q-referEarn-para'>Share your referral code with your friends and get benefits.</p>
            <button className='q-referEarn-invite'>Invite Friends</button>
        </div>
    );
};

// export const Refer