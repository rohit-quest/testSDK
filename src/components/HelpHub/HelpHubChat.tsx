import React, { useState } from 'react'
// import QuestWhiteLogo from "../../assets/images/QuestWhiteLogo.svg";
// import Modal1 from "../../assets/images/HelpHubModal1.jpeg";
// import Modal2 from "../../assets/images/HelpHubModal2.jpeg";
// import Modal3 from "../../assets/images/HelpHubModal3.jpeg";
import OpenSectionButton from "../../assets/images/OpenSectionButton.svg";
import InfoButton from "../../assets/images/InfoButton.svg";
import SendMessageEmojiIcon from "../../assets/images/SendMessageEmojiIcon.svg";
import SendMessageAttachIcon from "../../assets/images/SendMessageAttachIcon.svg";
import SendMessageSendIcon from "../../assets/images/SendMessageSendIcon.svg";

const HelpHubChat = () => {
    const [showPersonalChat, setShowPersonalChat] = useState(false);
    const [chat, setChats] = useState([
        {
            profile: "hi",
            senderName: "Alexander Rodriguez...",
            senderMessage: " I don't have personal preferences, but I can recommend books based on your interests. What genre are you into? For a cultural experience, Kyoto in Japan is fantastic."
        },
        {
            profile: "hi",
            senderName: "Alexander Rodriguez...",
            senderMessage: " I don't have personal preferences, but I can recommend books based on your interests. What genre are you into? For a cultural experience, Kyoto in Japan is fantastic."
        },
        {
            profile: "hi",
            senderName: "Alexander Rodriguez...",
            senderMessage: " I don't have personal preferences, but I can recommend books based on your interests. What genre are you into? For a cultural experience, Kyoto in Japan is fantastic."
        },
        {
            profile: "hi",
            senderName: "Alexander Rodriguez...",
            senderMessage: " I don't have personal preferences, but I can recommend books based on your interests. What genre are you into? For a cultural experience, Kyoto in Japan is fantastic."
        },
    ]);

    return (
        <div className={"helpHubChat"}>
            {/* upper container  */}
            <div className='q-helphub-chatpage-upper-container'>
                <div className='q-helphub-chatpage-text-container'>
                    <div className='q-helphub-chatpage-head-para'>
                        {/* for heading  */}
                        <div className='q-helphub-chatpage-heading'>
                            Chats
                        </div >
                        {/* for para */}
                        <div className='q-helphub-chatpage-para'>
                            Welcome back, Please talk to us to understand
                        </div>
                    </div>

                    <div className='q-helphub-chatpage-btn-container'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4.50513 11.4957L8.00046 8.00034L11.4958 11.4957M11.4958 4.505L7.99979 8.00034L4.50513 4.505" stroke="#939393" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>
            {/* heading ends here  */}

            {/*  */}
            <div className='q-helphub-chatpage-lower-container'>
                {/* search and chats container */}
                <div className='q-helphub-search-chats-container'>
                    {/* search  */}
                    <div className='q-helphub-search-container'>
                        <input className='q-helphub-search-input' type="text" placeholder='Search for help...' />
                        <div className='q-helphub-search-btn'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <g clip-path="url(#clip0_6244_565)">
                                    <circle cx="7.66671" cy="7.66671" r="6.33333" stroke="#B9B9B9" stroke-width="1.5" />
                                    <path d="M13.3334 13.3334L14.6667 14.6667" stroke="#B9B9B9" stroke-width="1.5" stroke-linecap="round" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_6244_565">
                                        <rect width="16" height="16" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </div>

                    </div>

                    {/* chats  */}
                    <div className='q-helphub-chats-section'>
                        {/* only one chat */}

                        {
                            chat.map((value, index) => {
                                return <div className='q-helphub-chat-detail'>
                                    <div className="q-helphub-chat-sender-profile" >
                                        {value.profile}
                                    </div>

                                    <div className='q-helphub-chat-message'>
                                        <div className='q-helphub-chat-sender-name'>
                                            {value.senderName}
                                        </div>
                                        <div className='q-helphub-chat-sender-message'>
                                            {value.senderMessage}
                                        </div>
                                    </div>

                                    <button className="q-helphub-chat-btn" onClick={() => setShowPersonalChat(prev => !prev)}>
                                        <img src={OpenSectionButton} alt="" />
                                    </button>
                                </div>
                            })
                        }


                    </div>
                </div>

                {/*send button container */}
                <div className='q-helphub-send-message'>
                    <div>
                        <p>Send a message</p>
                    </div>
                </div>


                {
                    showPersonalChat ? <div className='q-helphub-personal-chat'>
                        <div className='personal-chat-upper-cont'>
                            <img src={OpenSectionButton} alt="" className='goto-chats' onClick={() => setShowPersonalChat(prev => !prev)} />
                            <div>
                                Questlabs chats
                            </div>
                            <img src={InfoButton} alt="" />
                        </div>

                        {/* for down  */}
                        <div className='personal-chat-messages-cont'>
                            <div className='personal-gen-feed'>
                                <div className='gen-feed-img-cont'>
                                    {/* <img src="" alt="" />
                                <img src="" alt="" />
                                <img src="" alt="" /> */}
                                    <div>hi</div>
                                    <div className='mid'>hi</div>
                                    <div>hi</div>
                                </div>
                                <div className='personal-gen-feed-text-cont'>
                                    <div className='gen-head'>General feedback</div>
                                    <div className='gen-para'>
                                        Give general feedback of this page
                                    </div>
                                </div>
                            </div>

                            <div className='personal-chat-messages-cont-conver'>
                                <div className='sender-messages'>
                                    <div>
                                        SN
                                    </div>
                                    <div className='multiple-messages'>
                                        <div>
                                            <p>Hello there, you're now speaking with Fin! I am Quest's new AI bot and I'm here to answer your questions, but you’ll always have the option to talk to our team if you want to.</p>
                                        </div>
                                        <div>
                                            <p>How can I help?</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='receiver-messages'>
                                    <div>
                                        <p>I'm here to answer your questions, but you’ll always have the option to talk to our team if you want to.</p>
                                    </div>

                                </div>
                                <div className='sender-messages'>

                                </div>
                            </div>
                        </div>

                        <div className='personal-messages-send-message-cont'>
                            <div className='message-input'>
                                <input type="text" placeholder='Ask a Question...' />
                            </div>
                            <div className='send-message-emojis'>
                                <img src={SendMessageEmojiIcon} alt="" />
                                <img src={SendMessageAttachIcon} alt="" />
                                <img src={SendMessageSendIcon} alt="" />
                            </div>
                        </div>

                    </div> : ""
                }
            </div>
        </div >
    )
}

export default HelpHubChat