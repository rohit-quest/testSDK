import './HelpCenter.css';
import '../chatSupport/chatsupport.css'
import { useContext, useEffect, useRef, useState } from "react";
import { AskAiSvg, CrossIcon, LinkIcon, QuestArray, SearchSvg } from "./Svg.tsx";
import { helpCenter1, helpCenter2 } from "../../assets/images";
import axios from "axios";
import config from "../../config.ts";
import QuestContext from "../QuestWrapper.tsx";
import { HelpChat } from "./HelpChat.tsx";
import chat1 from "../../assets/images/chat1.png";
import General from '../../general.ts';

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
    descriptioin?: string;
    onClose: Function
    uniqueEmailId?: string,
    uniqueUserId?: string,
    enableVariation?: boolean
}

type data = [{ title: string, link: string, description: string, icon: string }] | []
let dataBackUP: data = [];

function getResponse(headers: CustomHeaders, entityId: string, questId: string, enableVariation: boolean): Promise<any> {
    const request = `${config.BACKEND_URL}api/entities/${entityId}/quests/${questId}?userId=${headers.userId}&getVariation=${enableVariation}`;

    // @ts-ignore p
    return axios.get(request, { headers })
        .then((res) => {
            if (!!res.data.eligibilityData) {
                const data = res.data.eligibilityData as QuestArray
                return data.map(e => ({
                    title: e.data.metadata.linkActionName,
                    link: e.data.metadata.linkActionUrl,
                    description: e.data.metadata.linkActionDescription,
                    icon: e.data.metadata.icon
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
        headBgColor = "black",
        descriptioin = "Discover our key features",
        onClose = (() => { }),
        uniqueEmailId,
        uniqueUserId,
        enableVariation = false
    }: HelpProps) => {

    const [isOpen, setIsOpen] = useState(true);
    const [data, setData] = useState<data>([])
    const { apiKey, apiSecret, entityId, apiType } = useContext(QuestContext.Context);
    const [chat, setChat] = useState(false)
    const filter = (str: string) => {
        // @ts-ignore
        setData(dataBackUP.filter(e => e.title.includes(str)))
        if (str == "") setData(dataBackUP)
    }


    useEffect(() => {
        getResponse({ apiKey, apisecret: apiSecret, token, userId }, entityId, questId, enableVariation)
            .then((response) => {
                setData(response)
                dataBackUP = response;
            })
        if(entityId && uniqueUserId) {
            const functions = new General('')
            functions.getExternalLogin({ apiType, uniqueUserId, entityId, userId, apiKey, apiSecret, token, uniqueEmailId })
        }   
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
                <img src={chat1} alt="" className="q-cht-logo2" />
            </div>
            <div className={'q-help'} style={{
                transition: "all ease 0.5s",
                right: `${isOpen ? "100px" : "-100px"}`,
                top: `${isOpen ? "20px" : "250px"}`,
                transform: `scale(${isOpen ? 1 : 0})`
            }}>
                <div className='q-help-child' style={{ backgroundColor, color }}>
                    <div onClick={() => setChat(false)} className="q-help-ch-div"
                        style={{ backgroundColor: headBgColor }}>
                        <div>
                            <div className="q-cht-ch-div-head" style={{ color: headColor }}>Help Center</div>
                            <div className='q-cht-ch-div-desc' style={{ color }}>{descriptioin}</div>
                        </div>
                        <div style={{ display: "flex", cursor: "pointer" }}
                            onClick={() => { setIsOpen(false); onClose(); }}
                        >
                            <CrossIcon />
                        </div>
                    </div>
                    {chat ? <HelpChat back={() => { setChat(false) }} /> : (<div className='q-help-section'>
                        <div className='q-help-ask'>
                            <input className='q-help-ask-input' onChange={(e) => filter(e.target.value)}
                                placeholder='Ask a question' />
                            <div style={{ display: "inline" }} className='q-help-search-icon'><SearchSvg /></div>
                            <div className='q-help-ask-ai' style={{ color }} onClick={() => {
                                setData(dataBackUP);
                                setChat(true);
                            }}>Ask AI <AskAiSvg /></div>
                        </div>
                        <div className='q-help-rect'>
                            <img src={helpCenter1} alt={""} />
                            <img src={helpCenter2} alt={""} />
                        </div>
                        <div className='q-help-links' ref={helpLinksRef}>
                            {data.map((e, i) => (
                                <div className='q-help-links-child' key={i}
                                    onClick={() => {
                                        window.open(e.link, '_blank')
                                    }}>
                                    <div className='q-help-link-icon'><img src={e.icon || ""} alt='' /></div>
                                    <div className='q-help-links-div'>
                                        <div className='q-help-links-name' style={{ color }}>{e.title}</div>
                                        <div className='q-help-links-desc' style={{ color }}>{e.description}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>)}
                </div>
            </div>
        </div>);
};
