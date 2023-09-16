import './Refer.css';
import {closePng, copyPng,  discordPng, giftPng, telegramPng, twitterPng} from "../../assets/images";

export const ReferShare = () => {
    return (
        <div className='q-referShare'>
            <div className='q-referShare-content'>
                <img src={closePng} className='q-referShare-content-close' alt=""/>
                <div className='q-referShare-content-text'>
                    <h3 className='q-referShare-content-head'>Invite your friends</h3>
                    <p className='q-referShare-content-para'>
                        Share your unique referral code with friends and receive 10 coins in credits each time a friend signs up!
                    </p>
                    <div className='q-referShare-content-rect'>
                        <span className='q-referShare-content-code'>MKVGSY253</span>
                        <img src={copyPng} className='q-referShare-content-copy-img' alt="" />
                    </div>
                    <p className='q-referShare-content-msg'>Share with your community</p>
                    <div className='q-referShare-content-social'>
                        <img src={twitterPng} className='q-referShare-content-social-img' alt="" />
                        <img src={discordPng} className='q-referShare-content-social-img' alt="" />
                        <img src={telegramPng} className='q-referShare-content-social-img' alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ReferEarn = () => {

    return (
        <div className='q-referEarn'>
            <img src={giftPng} className='q-referEarn-gift-img' alt=""/>
            <h3>Your referral code:</h3>
            <div className='q-referEarn-rect'>
                <span>BTHQ245</span>
                <img src={copyPng} width='20px' alt="" />
            </div>
            <p className='q-referEarn-para'>Share your referral code with your friends and get benefits.</p>
            <button className='q-referEarn-invite'>Invite Friends</button>
        </div>
    );
};

// export const Refer