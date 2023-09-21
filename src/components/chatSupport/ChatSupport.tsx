import { FC, useEffect, useRef, useState, useContext } from "react";
import config from "../../config";
import QuestContext from "../QuestWrapper";
import ReactDOM from "react-dom";
import chat1 from "../../assets/images/chat1.png";
import chat2 from "../../assets/images/chat2.png";
import chat3 from "../../assets/images/chat3.png";
import chat4 from "../../assets/images/chat4.png";
import minimize from "../../assets/images/minimize.png";
import close from "../../assets/images/close.png";
import gif from "../../assets/images/gif.png";
import emoje from "../../assets/images/emoje.png";
import attachment from "../../assets/images/attachment.png";
import send from "../../assets/images/send.png";
import "./chatsupport.css";

interface ChatSupport {
    logoType?: number;
    bgColor?: string;
}

interface Chat {
    sender: string;
    message: string;
}

const ChatSupport: FC<ChatSupport> = ({ logoType, bgColor }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [chat, setChat] = useState<Chat[]>([]);
    const [typeMessage, setTypeMessage] = useState("");
    const chatContainerRef = useRef(null);
    const { featureFlags } = useContext(QuestContext.Context);

    useEffect(() => {
        chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
    }, [chat]);

    const computerChat = (msg: string, index: number) => {
        return (
            <div className="q-cht-comp-div" key={index}>
                <p className="q-cht-comp-msg">{msg}</p>
            </div>
        );
    };

    const userChat = (msg: string, index: number) => {
        return (
            <div className="q-cht-user-div" key={index}>
                <p className="q-cht-user-msg">{msg}</p>
            </div>
        );
    };

    const sendMessage = async () => {
        let msg = typeMessage;
        setChat([
            ...chat,
            {
                sender: "user",
                message: msg,
            },
        ]);
        setTypeMessage("");
        setLoading(true);
        await replyMessage().then(() => {
            setLoading(false);
            setChat([
                ...chat,
                {
                    sender: "user",
                    message: msg,
                },
                {
                    sender: "computer",
                    message: "I am fine!",
                },
            ]);
        });
    };

    const replyMessage = () => {
        return new Promise((resolve) => setTimeout(resolve, 2000));
    };

    const handleEnter = (e: any) => {
        if (e.key == "Enter") {
            sendMessage();
        }
    };

    if (featureFlags[config.FLAG_CONSTRAINTS.ChatFlag]?.isEnabled == false) {
        return (<div></div>)
    }

    return ReactDOM.createPortal(
        <div
            className="q-cht-home"
            style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}
        >
            <div className="popup-overlay">
                <div className="q-cht-main" onClick={() => setIsOpen(!isOpen)}>
                    {logoType == 2 ? (
                        <img src={chat2} alt="" className="q-cht-logo1" />
                    ) : logoType == 3 ? (
                        <img src={chat3} alt="" className="q-cht-logo1" />
                    ) : logoType == 4 ? (
                        <img src={chat4} alt="" className="q-cht-logo1" />
                    ) : (
                        <img src={chat1} alt="" className="q-cht-logo2" />
                    )}
                    <img src="" alt="" />
                </div>
                <div
                    className={`q-cht-ch`}
                    style={{
                        boxShadow: "rgba(0, 0, 0, 0.50) 0px 0px 6px 0px",
                        transition: "all 0.4s",
                        opacity: `${!isOpen ? "0" : "1"}`,
                        visibility: `${!isOpen ? "hidden" : "visible"}`,
                        width: `${!isOpen ? "0px" : ""}`,
                        height: `${!isOpen ? "0px" : ""}`,
                        backgroundColor: `${bgColor}`,
                    }}
                >
                    <div className="q-cht-ch-div">
                        <p className="q-cht-ch-div-p">Chat Support</p>
                        <div style={{ display: "flex", gap: "1rem" }}>
                            <img
                                src={minimize}
                                className="q-cht-ch-div-imgCon"
                                alt=""
                                onClick={() => setIsOpen(false)}
                            />
                            <img
                                src={close}
                                className="q-cht-ch-div-imgCon"
                                alt=""
                                onClick={() => setIsOpen(false)}
                            />
                        </div>
                    </div>
                    <div
                        className="q-cht-ch-div2 chatBox"
                        ref={chatContainerRef}
                    >
                        {!!chat &&
                            chat.map((msg, i) =>
                                msg.sender == "user"
                                    ? userChat(msg.message, i)
                                    : computerChat(msg.message, i)
                            )}

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
                    <div
                        className="q-cht-ch-footer"
                        style={{ backgroundColor: `${bgColor}` }}
                    >
                        <input
                            className="q-cht-ch-footer-inp"
                            value={typeMessage}
                            onChange={(e) => setTypeMessage(e.target.value)}
                            onKeyUp={handleEnter}
                        />
                        <div className="q-cht-ch-footer-options">
                            {/* <img src={gif} alt="" className="q-cht-ch-footer-options-logo"/>
                        <img src={emoje} alt="" className="q-cht-ch-footer-options-logo"/>
                        <img src={attachment} alt="" className="q-cht-ch-footer-options-logo"/> */}
                            <img
                                src={send}
                                alt=""
                                className="q-cht-ch-footer-options-logo"
                                onClick={sendMessage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("root")!
    );
};

export default ChatSupport;
