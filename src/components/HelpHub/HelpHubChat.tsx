import { useContext, useEffect, useRef, useState } from "react";
import OpenSectionButton from "../../assets/images/OpenSectionButton.svg";
import InfoButton from "../../assets/images/InfoButton.svg";
import SendMessageEmojiIcon from "../../assets/images/SendMessageEmojiIcon.svg";
import SendMessageAttachIcon from "../../assets/images/SendMessageAttachIcon.svg";
import SendMessageSendIcon from "../../assets/images/SendMessageSendIcon.svg";
import CancelButton from "../../assets/images/CancelButton.svg";
import SearchIcons from "../../assets/images/SearchIcons.svg";
import Modal1 from "../../assets/images/HelpHubModal1.jpeg";
import QuestWhiteLogo from "../../assets/images/QuestWhiteLogo.svg";
import Modal3 from "../../assets/images/HelpHubModal3.jpeg";
import HelphubSvg from "./HelphubSvg";
import { HelpHubChatTypes } from "./HelpHub.type";
import QuestContext from "../QuestWrapper";

type ChatMessage = {
    sender?: string;
    receiver?: string;
};

const HelpHubChat = (props: HelpHubChatTypes) => {
    const { contentConfig, styleConfig } = props;

    const { themeConfig } = useContext(QuestContext.Context);
    const [showPersonalChat, setShowPersonalChat] = useState(false);
    const [message, setMessage] = useState("");
    const [data, setData] = useState<ChatMessage[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    const [chat, setChats] = useState([
        // {
        //     profile: "hi",
        //     senderName: "Alexander Rodriguez...",
        //     senderMessage:
        //         " I don't have personal preferences, but I can recommend books based on your interests. What genre are you into? For a cultural experience, Kyoto in Japan is fantastic.",
        // },
        // {
        //     profile: "hi",
        //     senderName: "Alexander Rodriguez...",
        //     senderMessage:
        //         " I don't have personal preferences, but I can recommend books based on your interests. What genre are you into? For a cultural experience, Kyoto in Japan is fantastic.",
        // },
        // {
        //     profile: "hi",
        //     senderName: "Alexander Rodriguez...",
        //     senderMessage:
        //         " I don't have personal preferences, but I can recommend books based on your interests. What genre are you into? For a cultural experience, Kyoto in Japan is fantastic.",
        // },
        // {
        //     profile: "hi",
        //     senderName: "Alexander Rodriguez...",
        //     senderMessage:
        //         " I don't have personal preferences, but I can recommend books based on your interests. What genre are you into? For a cultural experience, Kyoto in Japan is fantastic.",
        // },
        // {
        //     profile: "hi",
        //     senderName: "Alexander Rodriguez...",
        //     senderMessage:
        //         " I don't have personal preferences, but I can recommend books based on your interests. What genre are you into? For a cultural experience, Kyoto in Japan is fantastic.",
        // },
        // {
        //     profile: "hi",
        //     senderName: "Alexander Rodriguez...",
        //     senderMessage:
        //         " I don't have personal preferences, but I can recommend books based on your interests. What genre are you into? For a cultural experience, Kyoto in Japan is fantastic.",
        // },
        // {
        //     profile: "hi",
        //     senderName: "Alexander Rodriguez...",
        //     senderMessage:
        //         " I don't have personal preferences, but I can recommend books based on your interests. What genre are you into? For a cultural experience, Kyoto in Japan is fantastic.",
        // },
        // {
        //     profile: "hi",
        //     senderName: "Alexander Rodriguez...",
        //     senderMessage:
        //         " I don't have personal preferences, but I can recommend books based on your interests. What genre are you into? For a cultural experience, Kyoto in Japan is fantastic.",
        // },
        // {
        //     profile: "hi",
        //     senderName: "Alexander Rodriguez...",
        //     senderMessage:
        //         " I don't have personal preferences, but I can recommend books based on your interests. What genre are you into? For a cultural experience, Kyoto in Japan is fantastic.",
        // },
        // {
        //     profile: "hi",
        //     senderName: "Alexander Rodriguez...",
        //     senderMessage:
        //         " I don't have personal preferences, but I can recommend books based on your interests. What genre are you into? For a cultural experience, Kyoto in Japan is fantastic.",
        // },
        // {
        //     profile: "hi",
        //     senderName: "Alexander Rodriguez...",
        //     senderMessage:
        //         " I don't have personal preferences, but I can recommend books based on your interests. What genre are you into? For a cultural experience, Kyoto in Japan is fantastic.",
        // },
        // {
        //     profile: "hi",
        //     senderName: "Alexander Rodriguez...",
        //     senderMessage:
        //         " I don't have personal preferences, but I can recommend books based on your interests. What genre are you into? For a cultural experience, Kyoto in Japan is fantastic.",
        // },
    ]);

    const handleSave = () => {
        if (message.length > 0) {
            setData((data) => [...data, { sender: message }]);
            setTimeout(() => {
                setData((data) => [
                    ...data,
                    {
                        receiver:
                            "I am not in the mood to answer, you come back later",
                    },
                ]);
            }, 1000);
        }
        setMessage("");
    };
    const resizeHandler = () => {
        const headerElement = document.getElementById('helpHub');
        if (headerElement && scrollRef.current) {
            const headerHeight = headerElement.clientHeight;
            scrollRef.current.style.height = headerHeight - 228 + 'px';
        }
    };


    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
        resizeHandler()

    }, [data]);


    useEffect(() => {
        window.addEventListener('resize', resizeHandler);
        resizeHandler();
        return () => window.removeEventListener('resize', resizeHandler);
    }, []);


    return (
        <>
            {!showPersonalChat && (
                <div
                    className={"helpHubChat"}
                    style={{
                        background: themeConfig?.backgroundColor || "#fff",
                        ...styleConfig?.Chat?.Form,
                    }}
                >
                    {/* upper container  :chats*/}
                    <div className="q-helphub-chatpage-upper-container">
                        <div className="q-helphub-chatpage-text-container">
                            <div className="q-helphub-chatpage-head-para">
                                {/* for heading  */}
                                <div
                                    className="q-helphub-chatpage-heading"
                                    style={{
                                        color: themeConfig?.primaryColor,
                                        ...styleConfig?.Chat?.Topbar?.Heading,
                                    }}
                                >
                                    {contentConfig?.heading || "Chats"}
                                </div>
                                {/* for para */}
                                <div
                                    className="q-helphub-chatpage-para"
                                    style={{
                                        color: themeConfig?.secondaryColor,
                                        ...styleConfig?.Chat?.Topbar?.Heading,
                                    }}
                                >
                                    {contentConfig?.subHeading ||
                                        "Welcome back, Please talk to us to understand"}
                                </div>
                            </div>

                            <div className="q-helphub-chatpage-btn-container">
                                <img src={CancelButton} alt="" />
                            </div>
                        </div>
                    </div>
                    {/* heading ends here  */}

                    {/*  */}
                    <div className="q-helphub-chatpage-lower-container">
                        {/* search and chats container */}
                        <div className="q-helphub-search-chats-container">
                            {/* search  */}
                            <div
                                className="q-helphub-search-container"
                                style={{ ...styleConfig?.Chat?.Searchbox }}
                            >
                                <input
                                    className="q-helphub-search-input"
                                    type="text"
                                    placeholder="Search for help..."
                                />
                                <div className="q-helphub-search-btn">
                                    <img src={SearchIcons} alt="" />
                                </div>
                            </div>

                            {/* chats  */}
                            <div className="q-helphub-chats-section">
                                {/* only one chat */}

                                {/* {chat.map((value, index) => {
                                    return (
                                        <div className="q-helphub-chat-detail">
                                            <div className="q-helphub-chat-sender-profile">
                                                {value.profile}
                                            </div>

                                            <div className="q-helphub-chat-message">
                                                <div
                                                    className="q-helphub-chat-sender-name"
                                                    style={{
                                                        color: themeConfig?.primaryColor,
                                                        ...styleConfig?.Updates?.Card?.Heading,
                                                    }}
                                                >
                                                    {value.senderName}
                                                </div>
                                                <div
                                                    className="q-helphub-chat-sender-message"
                                                    style={{
                                                        color: themeConfig?.primaryColor,
                                                        ...styleConfig?.Updates?.Card?.SubHeading,
                                                    }}
                                                >
                                                    {value.senderMessage}
                                                </div>
                                            </div>

                                            <button
                                                className="q-helphub-chat-btn"
                                                onClick={() => setShowPersonalChat((prev) => !prev)}
                                            >
                                                <img src={OpenSectionButton} alt="" />
                                            </button>
                                        </div>
                                    );
                                })} */}
                            </div>
                        </div>

                        {/*send button container */}
                        <div className="q-helphub-send-message">
                            <div onClick={()=>setShowPersonalChat(true)}>
                                <p>Send a message</p>
                            </div>
                        </div>

                        {/* personal chat one to one  */}
                    </div>
                </div>
            )}
            {showPersonalChat && (
                <div className="q-chat-personal-container" style={{ height: "100%" }}>
                    <div className="q-chat-personal-container-header">
                        <div style={{ cursor: "pointer" }} onClick={() => setShowPersonalChat(false)}>
                            <HelphubSvg type={"BackButton"} />
                        </div>
                        <div className="q-chat-personal-container-header-title">
                            Questlabs chats
                        </div>
                        <img src={InfoButton} />
                    </div>
                    <div className="q-chat-personal-container-body-container" ref={scrollRef}>
                        <div className="q-chat-personal-container-body">
                            <div className="q-chat-personal-container-body-icons">
                                <div
                                    className="q-chat-personal-container-body-icons-img1"
                                    style={{ marginRight: "-10px" }}
                                >
                                    <img src={Modal1} />
                                </div>
                                <div className="q-chat-personal-container-body-icons-img">
                                    <img src={QuestWhiteLogo} />
                                </div>
                                <div
                                    className="q-chat-personal-container-body-icons-img1"
                                    style={{ marginLeft: "-10px" }}
                                >
                                    <img src={Modal3} />
                                </div>
                            </div>
                            <div>
                                <div className="q-chat-personal-container-body-title">General feedback</div>
                                <div className='q-chat-personal-container-body-description'>Give general feedback of this page</div>
                            </div>
                        </div>

                        <div className="q-chat-personal-container-body-text">
                            <div className="chat-container" id="chatContainer">
                                {data &&
                                    data.map((message, index) => (
                                        <div style={{ display: "flex" ,position: "relative",gap:"6px"}}>
                                            {message.receiver && (
                                                <div className="chat-profile-img-receiver">
                                                    <img src={QuestWhiteLogo} />
                                                </div>
                                            )}
                                            <div
                                                key={index}
                                                className={`message ${message.sender ? "sender" : "receiver"
                                                    }`}
                                            >
                                                {message.sender ? message.sender : message.receiver}
                                            </div>
                                         {message.sender && (
                                                <div className="chat-profile-img-sender">
                                                    <img src={Modal1} />
                                                </div>
                                            )}
                                           
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    <div className="q-chat-personal-container-footer">
                        <input
                            className="q-chat-personal-container-footer-input"
                            onKeyUp={(e) => {
                                if (e.key === "Enter") {
                                    if (message.length > 0) {
                                        setData((data) => [...data, { sender: message }]);
                                        setTimeout(() => {
                                            setData((data) => [
                                                ...data,
                                                {
                                                    receiver:
                                                        "I am not in the mood to answer, you come back later",
                                                },
                                            ]);
                                        }, 1000);
                                    }
                                    setMessage("");
                                }
                            }}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <div className="q-chat-personal-container-footer-icons">
                            <img src={SendMessageEmojiIcon} />
                            <img src={SendMessageAttachIcon} />
                            <img src={SendMessageSendIcon} onClick={handleSave} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default HelpHubChat;
