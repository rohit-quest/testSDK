import send from "../../assets/images/send.png";
import React, {useRef, useState} from 'react';
import {ChatIcon} from "./Svg.tsx";

export const HelpChat: React.FC = ({}) => {
    const [chats, setChats] = useState<{ text: string; type: 'user' | 'ai' }[]>([]);
    const chat = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false)
    const handleSendClick = async () => {
        const inputText = chat.current?.value;
        if (inputText) {
            setChats(chats=>[...chats, {text: inputText, type: 'user'}]);
            setLoading(true)
            chat.current.value = ''
            await new Promise((res)=> setTimeout(() => res(""), 2000))
            setChats(c=>[...c,{text: 'I am fine, how are you doing?', type: 'ai'}]);
            setLoading(false)
        }
    };

    return (
        <div className='q-help-chat'>
            <div className="q-help-chat-container">
                <div className='q-help-first-chat'>
                    <span className='q-help-chat-icon'><ChatIcon/></span>
                    <div className='q-help-chat-ai'>Hi Shanta, I’m support assistant.</div>
                </div>
                {chats.map((chat, index) => (
                    <div key={index} className={`q-help-chat-${chat.type}`}>
                        {chat.text}
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
                    src={send}
                    alt=""
                    width={24}
                    height={24}
                    onClick={handleSendClick}
                />
            </div>
        </div>
    );
};
