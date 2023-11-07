import React, { useRef, useState } from 'react';
import { aiChatPng, leftArrowPng, linkPng, sendChatPng, userChatPng } from "../../assets/images/index.ts";

export const HelpChat: React.FC<{ back: Function }> = ({ back }: { back: Function }) => {
    const [chats, setChats] = useState<{ text: string; type: 'user' | 'ai' }[]>([]);
    const chat = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false)
    const handleSendClick = async () => {
        const inputText = chat.current?.value;
        if (inputText) {
            setChats(chats => [...chats, { text: inputText, type: 'user' }]);
            setLoading(true)
            chat.current.value = ''
            await new Promise((res) => setTimeout(() => res(""), 2000))
            setChats(c => [...c, { text: 'I am fine, how are you doing?', type: 'ai' }]);
            setLoading(false)
        }
    };

    return (
        <div className='q-help-chat'>
            <div className="q-help-chat-nav">
                <img src={leftArrowPng} alt="" onClick={() => { back() }} />
                <img src={linkPng} alt="" />
            </div>
            <div className="q-help-chat-container">
                <div className='q-help-first-chat'>
                    <img src={aiChatPng} alt="" />
                    <div className='q-help-chat-ai'>Hi Shanta, I’m support assistant.</div>
                </div>
                {chats.map((chat, index) => (
                    <div className="q-help-chat-div">
                        {chat.type == "ai" && (
                            <img src={aiChatPng} alt="" />
                        )}
                        <div key={index} className={`q-help-chat-${chat.type}`}>
                            {chat.text}
                        </div>
                        {chat.type == "user" && (
                            <img className='' src={userChatPng}></img>
                        )}
                    </div>
                ))}
                {loading && (
                    <div className="q-cht-ch-loading">
                        <div className="msgTyping q-cht-ch-loading-div">
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                    </div>
                )}
            </div>
            <div className='q-help-input-box'>
                <input
                    className="q-help-chat-input"
                    placeholder="Ask a question...."
                    onKeyDown={e => (e.key === "Enter") ? handleSendClick() : ""}
                    ref={chat}
                />
                <img
                    className="q-help-send-chat-png"
                    src={sendChatPng}
                    alt=""
                    width={24}
                    height={24}
                    onClick={handleSendClick}
                />
            </div>
        </div>
    );
};
