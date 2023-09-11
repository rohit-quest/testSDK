import { FC, useEffect, useRef, useState } from "react"
import ReactDOM from 'react-dom';
import chat1 from "../../assets/images/chat1.png"
import chat2 from "../../assets/images/chat2.png"
import chat3 from "../../assets/images/chat3.png"
import chat4 from "../../assets/images/chat4.png"
import minimize from "../../assets/images/minimize.png"
import close from "../../assets/images/close.png"
import gif from "../../assets/images/gif.png"
import emoje from "../../assets/images/emoje.png"
import attachment from "../../assets/images/attachment.png"
import send from "../../assets/images/send.png"




interface ChatSupport {
    logoType?: number;
    bgColor?: string;
}

interface Chat {
    sender: string;
    message: string;
}



const ChatSupport: FC<ChatSupport> = ({ logoType, bgColor }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [chat, setChat] = useState<Chat []>([])
    const [typeMessage, setTypeMessage] = useState("")
    const chatContainerRef = useRef(null)

    useEffect(() => {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }, [chat]);

    const computerChat = (msg: string, index: number) => {
        return (
            <div className="flex justify-start mt-3" key={index}>
                <p className="w-fit max-w-[90%] bg-[#EEE] px-3 py-3 rounded-t-3xl rounded-r-3xl">{msg}</p>
            </div>
        )
    }

    const userChat = (msg: string, index: number) => {
        return (
            <div className="flex justify-end mt-3" key={index}>
                <p className="max-w-[90%] w-fit px-3 py-3 bg-[#333] text-white rounded-t-3xl rounded-l-3xl">{msg}</p>
            </div>
        )
    }


    const sendMessage = async() => {
        let msg = typeMessage
        setChat([
            ...chat, 
            {
                sender: "user",
                message: msg
            }
        ])
        setTypeMessage("")
        // setLoading(true)
        // await replyMessage().then(() => {
        //     setLoading(false)
        //     setChat([
        //         ...chat, 
        //         {
        //             sender: "user",
        //             message: msg
        //         },
        //         {
        //             sender: "computer",
        //             message: "I am fine!"
        //         }
        //     ])
        // })
    }

    // const replyMessage = () => {
    //     return new Promise(resolve => setTimeout(resolve, 2000));
    // }

    const handleEnter = (e: any) => {
        if (e.key == 'Enter') {
            sendMessage()
        }
    }



    return ReactDOM.createPortal(
        <div className='questLabs fontf' style={{fontFamily: "'Hanken Grotesk', sans-serif"}}>
          <div className="popup-overlay">
            <div className="fixed right-7 bottom-7" onClick={() => setIsOpen(!isOpen)}>
                {
                    logoType == 2 ?
                    <img src={chat2} alt="" className="w-16 cursor-pointer"/>
                    :
                    logoType == 3 ?
                    <img src={chat3} alt="" className="w-16 cursor-pointer"/>
                    :
                    logoType == 4 ?
                    <img src={chat4} alt="" className="w-16 cursor-pointer"/>
                    :
                    <img src={chat1} alt="" className="w-20 cursor-pointer"/>
                }
                <img src="" alt="" />
            </div>
            <div className={`h-[70vh] w-[80%] sm:w-[70%] md:w-1/2 lg:w-1/3 fixed right-7 bottom-28 rounded-2xl bg-white transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} `} style={{boxShadow: "rgba(0, 0, 0, 0.50) 0px 0px 6px 0px", transition: "all 0.5s", opacity: `${!isOpen ? "0" : "1"}`, visibility: `${!isOpen ? "hidden" : "visible"}`, width: `${!isOpen ? "0px" : ""}`, height:  `${!isOpen ? "0px" : ""}`, backgroundColor: `${bgColor}`}}>
                <div className="h-[10%] w-full bg-black rounded-t-xl flex items-center justify-between px-6">
                    <p className="text-white text-xl font-semibold">Chat Support</p>
                    <div className="flex gap-4">
                        <img src={minimize} className="w-6 h-6 cursor-pointer" alt="" onClick={() => setIsOpen(false)}/>
                        <img src={close} className="w-6 h-6 cursor-pointer" alt="" onClick={() => setIsOpen(false)}/>
                    </div>
                </div>
                <div className="h-[80%] overflow-x-auto text-sm px-6 py-6 chatBox" ref={chatContainerRef}>
                    {
                        !!chat && chat.map((msg, i) => (
                            msg.sender == "user" ?
                            userChat(msg.message, i)
                            :
                            computerChat(msg.message, i)
                        ))
                    }
                    
                    {
                        loading &&
                        <div className="flex justify-start mt-3">
                            <div className="msgTyping w-fit max-w-[90%] bg-[#EEE] px-4 py-5 rounded-t-3xl rounded-r-3xl">
                                <div className="dot"></div>
                                <div className="dot"></div>
                                <div className="dot"></div>
                            </div>
                        </div>
                    }
                </div>
                <div className="h-[10%] border-t-2 border-[#4B4B4B] flex items-center rounded-b-xl justify-between pr-6 bg-white" style={{backgroundColor: `${bgColor}`}}>
                    <input className="w-[90%] h-full rounded-b-xl outline-none border-none p-6 bg-transparent" value={typeMessage} onChange={(e) => setTypeMessage(e.target.value)} onKeyUp={handleEnter}/>
                    <div className="flex items-center gap-4">
                        {/* <img src={gif} alt="" className="w-6 h-6"/>
                        <img src={emoje} alt="" className="w-6 h-6"/>
                        <img src={attachment} alt="" className="w-6 h-6"/> */}
                        <img src={send} alt="" className="w-8 h-8 cursor-pointer" onClick={sendMessage}/>
                    </div>
                </div>
            </div>
          </div>
        </div>,
        document.getElementById('root')!
    );
}


export default ChatSupport;