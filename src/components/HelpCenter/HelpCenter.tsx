import './HelpCenter.css';
import '../chatSupport/chatsupport.css'
import minimize from "../../assets/images/minimize.png";
import close from "../../assets/images/close.png";
import {useContext, useEffect, useRef, useState} from "react";
import {AskAiSvg, LinkIcon, QuestArray, SearchSvg} from "./Svg.tsx";
import {helpCenter1, helpCenter2} from "../../assets/images";
import axios from "axios";
import config from "../../config.ts";
import QuestContext from "../QuestWrapper.tsx";
import {HelpChat} from "./HelpChat.tsx";
import chat1 from "../../assets/images/chat1.png";

interface CustomHeaders {
    apiKey: string;
    apisecret: string;
    userId: string;
    token: string;
}

interface HelpProps {
    userId: string;
    questId: string;
    token: string;
    headBgColor?: string;
    headColor?: string;
    backgroundColor?: string;
    color?: string;
}

type data = [{ title: string, link: string }] | []
let dataBackUP: data = [];

function getResponse(headers: CustomHeaders, entityId: string, questId: string): Promise<any> {
    const request = `${config.BACKEND_URL}api/entities/${entityId}/quests/${questId}?userId=${headers.userId}`;

    // @ts-ignore
    return axios.get(request, {headers})
        .then((res) => {
            if (!!res.data.eligibilityData) {
                const data = res.data.eligibilityData as QuestArray
                return data.map(e => ({
                    title: e.data.metadata.linkActionName,
                    link: e.data.metadata.linkActionUrl
                }))
            }
            return []
        })
        .catch((error) => {
            console.log(error);
            return []
        });
}

export const HelpCenter = (
    {
        userId = '',
        token = '',
        questId = '',
        color = '',
        backgroundColor = '',
        headColor = 'white',
        headBgColor = "black"
    }: HelpProps) => {

    const [isOpen, setIsOpen] = useState(true);
    const [data, setData] = useState<data>([])
    const {apiKey, apiSecret, entityId} = useContext(QuestContext.Context);
    const [chat, setChat] = useState(false)
    const filter = (str: string) => {
        // @ts-ignore
        setData(dataBackUP.filter(e => e.title.includes(str)))
        if (str == "") setData(dataBackUP)
    }


    useEffect(() => {
        getResponse({apiKey, apisecret: apiSecret, token, userId}, entityId, questId)
            .then((response) => {
                setData(response.concat(response))
                dataBackUP = response;
            })
    }, [])

    const helpLinksRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (helpLinksRef.current) {
            if (helpLinksRef.current.scrollHeight == helpLinksRef.current.clientHeight)
                helpLinksRef.current.classList.add('scrollable');
            else
                helpLinksRef.current.classList.remove('scrollable');
        }

    }, [data]);


    return (
        <div className='q-help-parent'>
            <div className="q-cht-main" onClick={() => setIsOpen(!isOpen)}>
                <img src={chat1} alt="" className="q-cht-logo2"/>
            </div>
            <div className={'q-help'} style={{
                transition: "all ease 0.5s",
                right: `${isOpen?"100px":"-150px"}`,
                top: `${isOpen?"20px":"250px"}`,
                transform: `scale(${isOpen?1:0})`
            }}>
                <div className='q-help-child' style={{backgroundColor, color}}>
                    <div onClick={() => setChat(false)} className="q-help-ch-div"
                         style={{backgroundColor: headBgColor}}>
                        <p className="q-cht-ch-div-p" style={{color: headColor}}>Help Center</p>
                        <div style={{display: "flex", gap: "1rem"}}>
                            <img
                                src={minimize}
                                className="q-help-top-icon"
                                alt=""
                                onClick={() => setIsOpen(false)}
                            />
                            <img
                                src={close}
                                className="q-help-top-icon"
                                alt=""
                                onClick={() => setIsOpen(false)}
                            />
                        </div>
                    </div>
                    {chat ? <HelpChat/> : (<>
                        <div className='q-help-ask'>
                            <span className='q-help-search-icon'><SearchSvg/></span>
                            <input className='q-help-ask-input' onChange={(e) => filter(e.target.value)}
                                   placeholder='Search or Ask a question....'/>
                            <div className='q-help-ask-ai' onClick={() => setChat(true)}>Ask AI <AskAiSvg/></div>
                        </div>
                        <div className='q-help-rect'>
                            <img src={helpCenter1} alt={""}/>
                            <img src={helpCenter2} alt={""}/>
                        </div>
                        <div className='q-help-links' ref={helpLinksRef}>
                            {data.map((e, i) => (
                                <div className='q-help-links-child' key={i}
                                     onClick={() => {
                                         window.open(e.link, '_blank')
                                     }}>
                                    <div className='q-help-link-icon'><LinkIcon/></div>
                                    <div className='q-help-links-div'>
                                        <h3>{e.title.split(",")[0]}</h3>
                                        <h5>{e.title.split(",")[1]}</h5>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>)}
                </div>
            </div>
        </div>);
};
