import { CSSProperties, useEffect, useRef, useState } from "react";
import config from "../../config";
import axios from "axios";
import { useContext } from "react";
import QuestContext from '../QuestWrapper';
import "./onboarding.css";
import Cookies from "universal-cookie";
import calendly from "../../assets/images/calendly.png";
import discord from "../../assets/images/discord-color.png";
import twitter from "../../assets/images/twitter-color.png";
import slack from "../../assets/images/slack.png";
import link from "../../assets/images/links.png";
import Select, { StylesConfig } from "react-select";
import {userLogo, crossLogo, leftArrow, rightArrow, calenderIcon, textAreaIcon, phoneLogo, emailLogo} from "../../assets/assetsSVG.tsx"
import { Input, logoType } from "../Modules/Input.tsx";
import { MultiChoice, MultiChoiceTwo } from "../Modules/MultiChoice.tsx";
import Label from "../Modules/Label.tsx";
import SingleChoice from "../Modules/SingleChoice.tsx";
import TextArea from "../Modules/TextArea.tsx";
import { SecondaryButton } from "../Modules/SecondaryButton.tsx";
import { PrimaryButton } from "../Modules/PrimaryButton.tsx";
import QuestLabs from "../QuestLabs.tsx";
import General from "../../general.ts";

const Tick = ({fillColor="#6525B3",isActive=false,borderColor="#B9B9B9"}) => isActive?(<svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    >
    <g clipPath="url(#clip0_12303_10092)">
    <path
        d="M12 0C13.1016 0 14.1641 0.140625 15.1875 0.421875C16.2109 0.703125 17.1641 1.10938 18.0469 1.64062C18.9297 2.17188 19.7383 2.79688 20.4727 3.51562C21.207 4.23438 21.8359 5.04297 22.3594 5.94141C22.8828 6.83984 23.2852 7.79688 23.5664 8.8125C23.8477 9.82812 23.9922 10.8906 24 12C24 13.1016 23.8594 14.1641 23.5781 15.1875C23.2969 16.2109 22.8906 17.1641 22.3594 18.0469C21.8281 18.9297 21.2031 19.7383 20.4844 20.4727C19.7656 21.207 18.957 21.8359 18.0586 22.3594C17.1602 22.8828 16.2031 23.2852 15.1875 23.5664C14.1719 23.8477 13.1094 23.9922 12 24C10.8984 24 9.83594 23.8594 8.8125 23.5781C7.78906 23.2969 6.83594 22.8906 5.95312 22.3594C5.07031 21.8281 4.26172 21.2031 3.52734 20.4844C2.79297 19.7656 2.16406 18.957 1.64062 18.0586C1.11719 17.1602 0.714844 16.2031 0.433594 15.1875C0.152344 14.1719 0.0078125 13.1094 0 12C0 10.8984 0.140625 9.83594 0.421875 8.8125C0.703125 7.78906 1.10938 6.83594 1.64062 5.95312C2.17188 5.07031 2.79688 4.26172 3.51562 3.52734C4.23438 2.79297 5.04297 2.16406 5.94141 1.64062C6.83984 1.11719 7.79688 0.714844 8.8125 0.433594C9.82812 0.152344 10.8906 0.0078125 12 0ZM19.0664 8.02734L17.4727 6.43359L9.75 14.1562L6.52734 10.9336L4.93359 12.5273L9.75 17.3438L19.0664 8.02734Z"
        fill={fillColor}
    />
    </g>
    <defs>
    <clipPath id="clip0_12303_10092">
        <rect width="24" height="24" fill={borderColor} />
    </clipPath>
    </defs>
</svg>):(<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clipPath="url(#clip0_3420_804)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.00001 0.833313C4.04197 0.833313 0.833344 4.04194 0.833344 7.99998C0.833344 11.958 4.04197 15.1666 8.00001 15.1666C11.9581 15.1666 15.1667 11.958 15.1667 7.99998C15.1667 4.04194 11.9581 0.833313 8.00001 0.833313ZM1.83334 7.99998C1.83334 4.59422 4.59425 1.83331 8.00001 1.83331C11.4058 1.83331 14.1667 4.59422 14.1667 7.99998C14.1667 11.4057 11.4058 14.1666 8.00001 14.1666C4.59425 14.1666 1.83334 11.4057 1.83334 7.99998Z" fill="#B9B9B9"/>
</g>
<defs>
<clipPath id="clip0_3420_804">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
)


type HeadingScreen = {
    name: string;
    desc: string;
};

interface QuestLoginProps {
    userId: string;
    token: string;
    questId: string;
    uniqueUserId?: string;
    uniqueEmailId?: string;
    design?: Array<Array<number>> | undefined;
    // color?: string;
    // bgColor?: string;
    // btnColor?: string;
    // inputBgColor?: string;
    headingScreen?: HeadingScreen | HeadingScreen[] | any;
    singleChoose?: "modal1" | "modal2" | "modal3";
    multiChoice?:  "modal1" | "modal2";
    // screenHeight?: string;
    getAnswers: Function | undefined;
    answer: any;
    setAnswer: React.Dispatch<React.SetStateAction<any>>;
    customComponents?: React.JSX.Element;
    customComponentPositions?: number;
    // inputBorder?: string;
    // btnSize?: string;
    // headingSize?: string;
    // descSize?: string;
    // inputFieldType?: { [key: string]: string };
    // defaultFont?: boolean;
    progress?: string[];
    loadingTracker?: boolean;
    setLoading?: Function;
    // linksLogoWidth?: string;
    // previousBtnText?: string;
    nextBtnText?: string;
    // progressbarColor?: string;
    progressBarMultiLine?: boolean;
    // progressBartabHeight?: string;
    // headingAlignment?: "left" | "right" | "center";
    // questionFontSize?: string;
    // answerFontSize?: string;
    // gap?: string;
    controlBtnType?: "Arrow" | "Buttons";
    // progressBarType?: "modal1"|"modal2";
    // choiceColor?: string;
    // textInputModal?: "modal1"|"modal2";
    template?: "multi-question" | "single-question";
    showFooter?: false | true
    styleConfig?: {
        Form?: CSSProperties,
        Topbar?: CSSProperties,
        Heading?: CSSProperties,
        Description?: CSSProperties,
        Input?: CSSProperties,
        EmailError?: {
            text?: string,
            errorStyle?: CSSProperties
        },
        Label?: CSSProperties,
        TextArea?: CSSProperties,
        PrimaryButton?: CSSProperties,
        SecondaryButton?: CSSProperties,
        SingleChoice?: {
            style?: CSSProperties,
            selectedStyle?: CSSProperties
        },
        MultiChoice?: {
            style?: CSSProperties,
            selectedStyle?: CSSProperties
        },
        ProgressBar?: {
            completeTabColor?: string,
            currentTabColor?: string,
            pendingTabColor?: string
        }
<<<<<<< Updated upstream
        Footer? : CSSProperties,
        enableVariation?: boolean
    }
=======
        Footer? : CSSProperties
    },
    enableVariation?: boolean
>>>>>>> Stashed changes
}

interface FormData {
    type: string;
    question: string;
    options: Array<string>;
    criteriaId: string;
    required: boolean;
    placeholder: string;
    linkTitle: string;
    linkUrl: string;
    manualInput: string | boolean;
}

interface Answer {
    question?: string;
    answer?: string[] | string;
}

function OnBoarding(props: QuestLoginProps) {
    const {
        // color,
        // bgColor,
        // inputBgColor,
        // inputBorder,
        // btnSize,
        // btnColor,
        // headingSize,
        // descSize,
        headingScreen,
        singleChoose,
        multiChoice="modal1",
        // screenHeight,
        progress,
        getAnswers,
        answer,
        setAnswer,
        customComponents,
        customComponentPositions,
        // inputFieldType,
        // defaultFont,
        userId,
        token,
        questId,
        loadingTracker,
        setLoading=()=>{},
        // linksLogoWidth,
        // previousBtnText,
        nextBtnText,
        // progressbarColor,
        progressBarMultiLine,
        // progressBartabHeight,
        // headingAlignment,
        // questionFontSize,
        // answerFontSize,
        // gap,
        controlBtnType,
        uniqueUserId,
        uniqueEmailId,
        // progressBarType="modal2",
        // choiceColor="#6525B3",
        // textInputModal = "modal1",
        template,
        design = [],
        styleConfig,
        showFooter = true,
        enableVariation = false
    } = props;

    // let { design =[] } = props;
    const [formdata, setFormdata] = useState<FormData[] | []>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [btnFlag, setButtonFlag] = useState<boolean>(false);
    const [steps, setSteps] = useState<number[]>([]);
    const { apiKey, apiSecret, entityId, featureFlags, apiType, themeConfig } = useContext(QuestContext.Context);
    const cookies = new Cookies()
    const progressRef = useRef<HTMLDivElement>(null)
    const [designState, setDesign] = useState(design || [])

    let BACKEND_URL = apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL

    let GeneralFunctions = new General('mixpanel', apiType);

    const templateDesign = () =>{
        switch (template) {
            case "multi-question":
                {
                    setDesign([...design])
                    break;
                }
            case "single-question":
                {
                    let arr = [];
                    for(let i=1; i<=formdata.length; i++){
                        arr.push([i])
                    }
                    // let design = arr;
                    setDesign([...arr])
                    break;
                }
        }
    }
    useEffect(() => {
        GeneralFunctions.fireTrackingEvent("quest_onboarding_loaded", "onboarding");

        if (entityId) {
            let externalUserId = cookies.get("externalUserId");
            let questUserId = cookies.get("questUserId");
            let questUserToken = cookies.get("questUserToken");
            // let personalUserId = JSON.parse(localStorage.getItem("persana-user") || "{}");
            
            const headers = {
                apiKey: apiKey,
                apisecret: apiSecret,
                userId: userId,
                token: token, // Replace with your actual token
            };

            const body = {
                externalUserId: !!uniqueUserId && uniqueUserId,
                entityId: entityId,
                email: uniqueEmailId
            }
            
            getQuestData(userId, headers)
            
            if (!!externalUserId && !!questUserId && !!questUserToken && externalUserId == uniqueUserId) {
                let header = {...headers, ...{questUserId, questUserToken}}
                axios.post(`${BACKEND_URL}api/entities/${entityId}/users/${questUserId}/metrics/onboarding-view?userId=${questUserId}&questId=${questId}`, {count: 1}, {headers: header})
            } else if (!!uniqueUserId) {

                axios.post(`${BACKEND_URL}api/users/external/login`, body, {headers})
                .then((res) => {
                    let {userId, token} = res.data;
                    let header = {...headers, ...{userId, token}}

                    const date = new Date();
                    date.setHours(date.getHours() + 12)
                    cookies.set("externalUserId", uniqueUserId, {path: "/", expires: date})
                    cookies.set("questUserId", userId, {path: "/", expires: date})
                    cookies.set("questUserToken", token, {path: "/", expires: date})
                    try {
                        axios.post(`${BACKEND_URL}api/entities/${entityId}/users/${userId}/metrics/onboarding-view?userId=${userId}&questId=${questId}`, {count: 1}, {headers: header})
                    } catch (error) {
                        GeneralFunctions.captureSentryException(error);
                    }
                }).catch((error) => {
                    console.log(error)
                    GeneralFunctions.captureSentryException(error);
                })
            }

            async function getQuestData(userId: string, headers: object) {
                (loadingTracker && setLoading(true));
                const request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}/criterias?userId=${userId}&getVariation=${enableVariation}`;
                await axios.get(request, { headers: headers }).then((res) => {
                    let response = res.data;
                    let criterias = response?.data?.eligibilityData?.map(
                        (criteria: {
                            criteriaType: string;
                            metadata: { title: string; options: string[], isOptional: string, placeholder: string, linkActionName: string, linkActionUrl: string, manualInput: string};
                            criteriaId: string;
                        }) => {
                            return {
                                type: criteria?.criteriaType,
                                question: criteria?.metadata?.title,
                                options: criteria?.metadata?.options || [],
                                criteriaId: criteria?.criteriaId,
                                required: !criteria?.metadata?.isOptional,
                                placeholder: criteria?.metadata?.placeholder,
                                linkTitle: criteria?.metadata?.linkActionName || "",
                                linkUrl: criteria?.metadata?.linkActionUrl || "",
                                manualInput: criteria?.metadata?.manualInput || false,
                            };
                        }
                    );
                    setFormdata([...criterias]);
                    let ansArray: any = {};
                    criterias.forEach((criteria: any) => {
                        if (criteria.type == "USER_INPUT_MULTI_CHOICE") {
                            if (!answer[criteria.criteriaId]) {
                                ansArray[criteria.criteriaId] = [];
                            }
                            return;
                        } else {
                            if (!answer[criteria.criteriaId]) {
                                ansArray[criteria.criteriaId] = "";
                            }
                            return;
                        }
                    });
                    setAnswer({ ...answer, ...ansArray });
                }).catch((error) => {
                    GeneralFunctions.captureSentryException(error);
                });
                (loadingTracker && setLoading(false))
            }
        }
    }, []);

    useEffect(() => {
        if (!!design.length) {
            templateDesign()
        }
    }, [design, template])

    useEffect(() => {
        let currentQuestions: any =
            !!designState && designState.length > 0 && checkDesignCriteria()
                ? designState[currentPage]
                : formdata.map((e, i) => i + 1);
        let c = 0;
        for (let i = 0; i < currentQuestions.length; i++) {
            if (formdata[currentQuestions[i] - 1].required == false || formdata[currentQuestions[i] - 1].type == "LINK_OPEN_READ") {
                c++;
            } else {
                if (
                    !!answer[formdata[currentQuestions[i] - 1].criteriaId] &&
                    answer[formdata[currentQuestions[i] - 1].criteriaId]
                        .length > 0
                ) {
                    c++;
                }
            }
        }

        if (currentQuestions.length > 0 && c == currentQuestions.length) {
            let questUserId = cookies.get("questUserId");
            let questUserToken = cookies.get("questUserToken");
    
            let headers = {
                apikey: apiKey,
                apisecret: apiSecret,
                userId: questUserId ? questUserId : userId,
                token: questUserToken ? questUserToken : token
            }
            if (!!designState && Number(currentPage) + 1 != designState?.length) {
                try {
                    axios.post(`${BACKEND_URL}api/entities/${entityId}/users/${headers.userId}/metrics/onboarding-complete-page-${Number(currentPage) + 1}?userId=${headers.userId}&questId=${questId}`, {count: 1}, {headers})
                } catch (error) {
                    GeneralFunctions.captureSentryException(error);
                }
            }

            setButtonFlag(true);
        } else {
            setButtonFlag(false);
        }
    }, [answer, formdata, currentPage]);

    useEffect(() => {
        if (btnFlag == true) {
            setSteps([...steps, currentPage]);
        } else {
            if (steps.includes(currentPage)) {
                const updatedSteps = steps.filter(step => step !== currentPage);
                setSteps(updatedSteps);
            }
        }
    }, [btnFlag, currentPage])

    const handleUpdate = (e: any, id: string, j: string, ) => {
        if (e.target.checked == true && j == "check") {
            let ans = answer[id] || [];
            ans.push(e.target.value);
            setAnswer({
                ...answer,
                [id]: ans,
            });
        } else if (
            e.target.checked == false &&
            typeof answer[id] == "object" &&
            j == "check"
        ) {
            let ans = answer[id];
            let mod_ans = ans.filter(
                (an: string | number) => an != e.target.value
            );
            setAnswer({
                ...answer,
                [id]: mod_ans,
            });
        } else {
            setAnswer({
                ...answer,
                [id]: e.target.value,
            });
        }
    };

    const handleRemove = (id: string) => {
        setAnswer({
            ...answer,
            [id]: ""
        })
    }

    const [wd, setWd] = useState(0)

    // const ProgressBarNew = () => {
    //     return ( <div className="q_onb_progress">
    //     {progress?.map((text, i) => {
    //         const isFilled = steps.includes(i);
    //         const isActive = currentPage === i;
    //         let color = isFilled ? '#098849' : isActive ? '#2C2C2C' : '#6E6E6E';
    //         let border = `1px solid ${isFilled ? '#098849' : isActive ? '#2C2C2C' : '#6E6E6E'}`;
    
    //       return (
    //           <div
    //               style={{
    //                   width: `${100 / progress.length}%`,
    //                   color,
    //                   border,
    //               }}
    //               onClick={() => {
    //                   if (isFilled && (i <= currentPage + 1)) {
    //                       setCurrentPage(i);
    //                   }
    //               }
    //               }
    //               className="q_onb_progress_tab"
    //               key={i}
    //           >
    //               {text}
    //           </div>
    //       );
    //     })}
    //   </div>)
    // }
    
    const ProgressBar = () => {
        useEffect(() => {
            if (!!progressRef.current && progressRef.current.clientWidth != wd) {
                setWd(progressRef?.current?.clientWidth)
            }
        }, [])
        return (
            <div className="q-onb-progress">
                <div style={{gridTemplateColumns: progress ? `repeat(${progress.length}, 1fr)` : ""}} ref={progressRef}>
                    {
                        !!progress && !!design && progress.length == design?.length && progress.map((prog: string, i: number) => (
                            <div key={i}>
                                {
                                    steps.includes(i) == true ?
                                    <div className="q-onb-progress-comp" style={{borderColor: styleConfig?.ProgressBar?.completeTabColor || "#098849"}}>
                                        <div 
                                            style={{
                                                maxWidth: `${((((wd - (progress.length - 1) * 15)) / progress.length) - 32)}px`,
                                                whiteSpace: progressBarMultiLine ? "normal" : "nowrap", 
                                                overflow: progressBarMultiLine ? "" : "hidden", 
                                                textOverflow: progressBarMultiLine ? "" : "ellipsis",
                                                color: styleConfig?.ProgressBar?.completeTabColor || "#098849"
                                            }}
                                        >
                                            {prog}
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 20" fill="none">
                                            <path opacity="0.3" d="M10.8333 18.3333C15.4357 18.3333 19.1667 14.6023 19.1667 9.99996C19.1667 5.39759 15.4357 1.66663 10.8333 1.66663C6.23095 1.66663 2.49999 5.39759 2.49999 9.99996C2.49999 14.6023 6.23095 18.3333 10.8333 18.3333Z" fill={"#098849"}/>
                                            <path d="M14.8074 6.51474C15.1215 6.17828 15.6488 6.1601 15.9853 6.47412C16.3217 6.78815 16.3399 7.31548 16.0259 7.65193L10.1925 13.9019C9.88787 14.2284 9.38003 14.2566 9.041 13.9661L6.12434 11.4661C5.7749 11.1665 5.73443 10.6404 6.03395 10.291C6.33347 9.94157 6.85955 9.9011 7.20899 10.2006L9.51916 12.1808L14.8074 6.51474Z" fill={styleConfig?.ProgressBar?.completeTabColor || "#098849"}/>
                                        </svg>
                                        
                                    </div>
                                    :
                                    (i==currentPage)?(<div className="q-onb-progress-comp" style={{borderColor: styleConfig?.ProgressBar?.currentTabColor || "#2C2C2C"}}>
                                        <div 
                                            style={{
                                                    maxWidth: `${((((wd - (progress.length - 1) * 15)) / progress.length) - 32)}px`, 
                                                    whiteSpace: progressBarMultiLine ? "normal" : "nowrap", 
                                                    overflow: progressBarMultiLine ? "" : "hidden", 
                                                    textOverflow: progressBarMultiLine ? "" : "ellipsis",
                                                    color: styleConfig?.ProgressBar?.currentTabColor || "#2C2C2C"
                                                }}
                                            >
                                            {prog}
                                        </div>
                                        {/* <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="20" height="20" fill="#2C2C2C"/>
                                            <path d="M-301 -113C-301 -114.105 -300.105 -115 -299 -115H2097C2098.1 -115 2099 -114.105 2099 -113V592C2099 593.105 2098.1 594 2097 594H-299C-300.105 594 -301 593.105 -301 592V-113Z" fill="#ECECEC"/>
                                            <rect width="376" height="68" transform="translate(-213 -20)" fill="white"/>
                                            <path id="Oval 3" d="M10 3.33337V5.00004C12.7614 5.00004 15 7.23862 15 10C15 12.7615 12.7614 15 10 15C7.23857 15 5 12.7615 5 10C5 9.13364 5.21992 8.30109 5.63312 7.56266L4.17866 6.74882C3.6272 7.73435 3.33333 8.84683 3.33333 10C3.33333 13.6819 6.3181 16.6667 10 16.6667C13.6819 16.6667 16.6667 13.6819 16.6667 10C16.6667 6.31814 13.6819 3.33337 10 3.33337Z" fill={styleConfig?.ProgressBar?.currentTabColor || "#2C2C2C"}/>
                                            <path d="M-299 -114H2097V-116H-299V-114ZM2098 -113V592H2100V-113H2098ZM2097 593H-299V595H2097V593ZM-300 592V-113H-302V592H-300ZM-299 593C-299.552 593 -300 592.552 -300 592H-302C-302 593.657 -300.657 595 -299 595V593ZM2098 592C2098 592.552 2097.55 593 2097 593V595C2098.66 595 2100 593.657 2100 592H2098ZM2097 -114C2097.55 -114 2098 -113.552 2098 -113H2100C2100 -114.657 2098.66 -116 2097 -116V-114ZM-299 -116C-300.657 -116 -302 -114.657 -302 -113H-300C-300 -113.552 -299.552 -114 -299 -114V-116Z" fill={styleConfig?.ProgressBar?.currentTabColor || "#AFAFAF"}/>
                                        </svg> */}
                                        
                                    </div>):(
                                    <div className="q-onb-progress-comp" style={{borderColor: styleConfig?.ProgressBar?.pendingTabColor || "#ECECEC"}}>
                                        <div 
                                            style={{
                                                    maxWidth: `${((((wd - (progress.length - 1) * 15)) / progress.length) - 32)}px`, 
                                                    whiteSpace: progressBarMultiLine ? "normal" : "nowrap", 
                                                    overflow: progressBarMultiLine ? "" : "hidden", 
                                                    textOverflow: progressBarMultiLine ? "" : "ellipsis",
                                                    color: styleConfig?.ProgressBar?.pendingTabColor || "#AFAFAF"
                                                }}
                                            >
                                            {prog}
                                        </div>
                                        {/* <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="20" height="20" fill="#E9E9E9"/>
                                            <path d="M-301 -113C-301 -114.105 -300.105 -115 -299 -115H2097C2098.1 -115 2099 -114.105 2099 -113V592C2099 593.105 2098.1 594 2097 594H-299C-300.105 594 -301 593.105 -301 592V-113Z" fill="#ECECEC"/>
                                            <rect width="376" height="68" transform="translate(-213 -20)" fill="white"/>
                                            <path id="Oval 3" d="M10 3.33337V5.00004C12.7614 5.00004 15 7.23862 15 10C15 12.7615 12.7614 15 10 15C7.23857 15 5 12.7615 5 10C5 9.13364 5.21992 8.30109 5.63312 7.56266L4.17866 6.74882C3.6272 7.73435 3.33333 8.84683 3.33333 10C3.33333 13.6819 6.3181 16.6667 10 16.6667C13.6819 16.6667 16.6667 13.6819 16.6667 10C16.6667 6.31814 13.6819 3.33337 10 3.33337Z" fill={styleConfig?.ProgressBar?.pendingTabColor || "#AFAFAF"}/>
                                            <path d="M-299 -114H2097V-116H-299V-114ZM2098 -113V592H2100V-113H2098ZM2097 593H-299V595H2097V593ZM-300 592V-113H-302V592H-300ZM-299 593C-299.552 593 -300 592.552 -300 592H-302C-302 593.657 -300.657 595 -299 595V593ZM2098 592C2098 592.552 2097.55 593 2097 593V595C2098.66 595 2100 593.657 2100 592H2098ZM2097 -114C2097.55 -114 2098 -113.552 2098 -113H2100C2100 -114.657 2098.66 -116 2097 -116V-114ZM-299 -116C-300.657 -116 -302 -114.657 -302 -113H-300C-300 -113.552 -299.552 -114 -299 -114V-116Z" fill={styleConfig?.ProgressBar?.pendingTabColor || "#AFAFAF"}/>
                                        </svg> */}
                                        
                                    </div>)
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        );
    };

    const normalInput = (
        question: string,
        required: boolean,
        criteriaId: string,
        index: number,
        placeholder: string,
        inputType: logoType,
    ) => {

        return (
            <div key={criteriaId}>
                {
                    (customComponentPositions == index + 1) &&
                    <div style={{paddingBottom: "12px"}}>
                        {customComponents}
                    </div>
                }
                <Label htmlFor="normalInput" style={{color: styleConfig?.Label?.color || themeConfig?.primaryColor, ...styleConfig?.Label}}>
                    {`${question} ${!!required ? "*" : ""}`}
                </Label>
                <Input 
                    type={inputType} 
                    placeholder={placeholder} 
                    value={answer[criteriaId]} 
                    iconColor={styleConfig?.Input?.color || themeConfig?.primaryColor || "#B9B9B9"}
                    onChange={(e)=>handleUpdate(e, criteriaId, "")} 
                    style={{ 
                        borderColor: styleConfig?.Input?.borderColor || themeConfig?.borderColor,
                        color: styleConfig?.Input?.color || themeConfig?.primaryColor,
                        ...styleConfig?.Input   
                    }}
                    emailtext={styleConfig?.EmailError?.text == undefined ? "Invalid email format" : styleConfig?.EmailError?.text}
                    emailErrorStyle={styleConfig?.EmailError?.errorStyle}
           />
            </div>
        );
    };

    const dateInput = (
        question: string,
        required: boolean,
        criteriaId: string,
        index: number,
        placeholder: string,
    ) => {
        return (
            <div key={criteriaId}>
                {
                    (customComponentPositions == index + 1) &&
                    <div style={{paddingBottom: "12px"}}>
                        {customComponents}
                    </div>
                }
                <Label htmlFor="dateInput" style={{color: styleConfig?.Label?.color || themeConfig?.primaryColor, ...styleConfig?.Label}}>
                    {`${question} ${!!required ? "*" : ""}`}
                </Label>
                <Input 
                    type={"date"} 
                    placeholder={placeholder} 
                    value={answer[criteriaId]} 
                    onChange={(e)=>handleUpdate(e, criteriaId, "")}
                    style={{ 
                        borderColor: styleConfig?.Input?.borderColor || themeConfig?.borderColor,
                        color: styleConfig?.Input?.color || themeConfig?.primaryColor,
                        ...styleConfig?.Input
                    }}
                />
            </div>
        );
    };

    const textAreaInput = (
        question: string,
        required: boolean,
        criteriaId: string,
        index: number,
        placeholder: string,
    ) => {
        return (
            <div key={criteriaId}>
                {
                    (customComponentPositions == index + 1) &&
                    <div style={{paddingBottom: "12px"}}>
                        {customComponents}
                    </div>
                }
                <Label htmlFor="textAreaInput" style={{color: styleConfig?.Label?.color || themeConfig?.primaryColor, ...styleConfig?.Label}}>
                    {`${question} ${!!required ? "*" : ""}`}
                </Label>
                <TextArea
                    onChange={(e) => handleUpdate(e, criteriaId, "")}
                    placeholder={placeholder}
                    value={answer[criteriaId]}
                    style={{ 
                        borderColor: styleConfig?.TextArea?.borderColor || themeConfig?.borderColor,
                        color: styleConfig?.TextArea?.color || themeConfig?.primaryColor,
                        ...styleConfig?.TextArea
                    }}
                />
            </div>
        );
    };
    const singleChoiceTwo = (
        options: string[] | [],
        question: string,
        required: boolean,
        criteriaId: string,
        index: number,
        manualInput: string | boolean,
        singleChoose: "modal1" | "modal2" | "modal3"
    ) => {

        return (
            <div key={criteriaId}>
                {
                    (customComponentPositions == index + 1) &&
                    <div style={{paddingBottom: "12px"}}>
                        {customComponents}
                    </div>
                }
                <Label htmlFor="textAreaInput" style={{color: styleConfig?.Label?.color || themeConfig?.primaryColor, ...styleConfig?.Label}}>
                    {`${question} ${!!required ? "*" : ""}`}
                </Label>
                <SingleChoice
                    options={options}
                    type={singleChoose}
                    onChange={(e) => singleChoose == "modal3" ? handleUpdate({target: e}, criteriaId, "") : handleUpdate(e, criteriaId, "radio")}
                    checked={answer[criteriaId]}
                    style={{
                        borderColor: styleConfig?.SingleChoice?.style?.borderColor || themeConfig?.borderColor, 
                        color: styleConfig?.SingleChoice?.style?.color || themeConfig?.secondaryColor, 
                        ...styleConfig?.SingleChoice?.style
                    }}
                    selectedStyle={{
                        accentColor: styleConfig?.SingleChoice?.selectedStyle?.accentColor || themeConfig?.primaryColor,
                        ...styleConfig?.SingleChoice?.selectedStyle
                    }}
                    
                />
                {manualInput != false && answer[criteriaId] == manualInput &&
                    <Input
                        type="text"
                        onChange={(e) => handleUpdate(e, (criteriaId + "/manual"), "")}
                        value={answer[criteriaId + "/manual"]}
                        placeholder="Please fill manually"
                        style={{ 
                            borderColor: styleConfig?.Input?.borderColor || themeConfig?.borderColor,
                            color: styleConfig?.Input?.color || themeConfig?.primaryColor,
                            ...styleConfig?.Input
                        }}
                    />
                }
            </div>
        );
    };
    
    const multiChoiceOne = (
        options: string[] | [],
        question: string,
        required: boolean,
        criteriaId: string,
        index: number
    ) => {
        return (
            <div key={criteriaId}>
                {
                    (customComponentPositions == index + 1) &&
                    <div style={{paddingBottom: "12px"}}>
                        {customComponents}
                    </div>
                }
                <Label htmlFor="textAreaInput" style={{color: styleConfig?.Label?.color || themeConfig?.primaryColor, ...styleConfig?.Label}}>
                    {`${question} ${!!required ? "*" : ""}`}
                </Label>
                <MultiChoice
                    options={options}
                    checked={answer[criteriaId]}
                    onChange={(e) => handleUpdate(e, criteriaId, "check")}
                    style={{
                        borderColor: styleConfig?.MultiChoice?.style?.borderColor || themeConfig?.borderColor,
                        color: styleConfig?.MultiChoice?.style?.color || themeConfig?.primaryColor,
                        ...styleConfig?.MultiChoice?.style
                    }}
                    selectedStyle={{
                        color: styleConfig?.MultiChoice?.selectedStyle?.color || themeConfig?.primaryColor,
                        ...styleConfig?.MultiChoice?.selectedStyle
                    }}
                />
            </div>
        );
    };
  
    const multiChoiceTwo = (
        options: string[] | [],
        question: string,
        required: boolean,
        criteriaId: string,
        index: number
    ) => {
        return (
            <div key={criteriaId}>
                {
                    (customComponentPositions == index + 1) &&
                    <div style={{paddingBottom: "12px"}}>
                        {customComponents}
                    </div>
                }
                <Label htmlFor="textAreaInput" style={{color: styleConfig?.Label?.color || themeConfig?.primaryColor, ...styleConfig?.Label}}>
                    {`${question} ${!!required ? "*" : ""}`}
                </Label>
                <MultiChoiceTwo
                    options={options}
                    checked={!!answer[criteriaId] && answer[criteriaId]}
                    onChange={(e) => handleUpdate(e, criteriaId, "check")}
                    style={{borderColor: styleConfig?.MultiChoice?.style?.borderColor  || themeConfig?.borderColor, ...styleConfig?.MultiChoice?.style,
                        color: styleConfig?.MultiChoice?.style?.color || themeConfig?.primaryColor,
                        ...styleConfig?.MultiChoice?.style
                    }}
                    selectedStyle={{
                        color: styleConfig?.MultiChoice?.selectedStyle?.color || themeConfig?.primaryColor,
                        ...styleConfig?.MultiChoice?.selectedStyle
                    }}
                />
            </div>
        );
    };

    // const chooseLogo = (links: string) => {
    //     if (links.includes("calendly")) {
    //         return calendly
    //     } else if (links.includes("slack")) {
    //         return slack
    //     } else if (links.includes("twitter")) {
    //         return twitter
    //     } else if (links.includes("discord")) {
    //         return discord
    //     } else {
    //         return link
    //     }
    // }

    // const linksCriteria = (
    //     linkTitle: string,
    //     criteriaId: string,
    //     linkUrl: string,
    //     index: number,
    // ) => {
    //     return (
    //         <div key={criteriaId}>
    //             {
    //                 (customComponentPositions == index + 1) &&
    //                 <div style={{paddingBottom: "12px"}}>
    //                     {customComponents}
    //                 </div>
    //             }
    //             <a href={linkUrl} target="_blank" style={{textDecoration: "none"}}>
    //                 <div className="q-onb-link-div">
    //                     <img src={chooseLogo(linkUrl)} style={{width: linksLogoWidth }}/>
    //                     <div className="q-onb-link-div-ch">
    //                         <div style={{ color: color ? color : "black" }}>{linkTitle}</div>
    //                         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
    //                             <path d="M2 11H14.2L8.6 16.6L10 18L18 10L10 2L8.6 3.4L14.2 9H2V11Z" className="q-onb-arrow"/>
    //                         </svg>
    //                     </div>
    //                 </div>
    //             </a>
    //         </div>
    //     );
    // };

    function checkDesignCriteria() {
        if(!designState?.length) return;

        let fl = false;
        let arr: number[] = [];

        for (let i = 0; i < designState?.length; i++) {
            if (
                typeof designState[i] != "object" &&
                designState[i][0] == null
            ) {
                return false;
            }
            for (let j = 0; j < designState[i].length; j++) {
                if (!arr.includes(designState[i][j])) {
                    arr.push(designState[i][j]);
                }
            }
        }
        if (
            arr.length == formdata.length &&
            Math.max(...arr) == formdata.length &&
            Math.min(...arr) == 1
            ) {
                fl = true;
            }

        return fl;
    }

    function returnAnswers() {
        GeneralFunctions.fireTrackingEvent("quest_onboarding_submit_btn_clicked", "onboarding");

        let crt: any = {...answer};
        for (let i of Object.keys(crt)) {
            if (i.includes("/manual") && crt[i] != "") {
                let id: string = i.split("/manual")[0];
                let criteriaDetails: FormData[] = formdata.filter((item) => item.criteriaId == id)
                if (criteriaDetails[0].manualInput == crt[id]) {
                    crt[id] = crt[i];
                }
            }
        }
        
        // let ansArr: Answer[] = formdata.map((ans: FormData) => {
        //     return {
        //         question: ans?.question,
        //         answer: crt[ans?.criteriaId] || "",
        //     };
        // });
        
        let criterias = Object.keys(crt)
        .filter((key: string) => !key.includes("/manual"))
        .map((key: string) => ({
            criteriaId: key,
            answer: typeof crt[key] === "object" ? crt[key] : [crt[key]],
            question: formdata[formdata.findIndex(ele => ele.criteriaId == key)].question
        }));

        
        let questUserId = cookies.get("questUserId");
        let questUserToken = cookies.get("questUserToken");
        let externalUserId = cookies.get("externalUserId");

        let headers = {
            apikey: apiKey,
            apisecret: apiSecret,
            userId: (!!externalUserId && !!questUserId && !!questUserToken && externalUserId == uniqueUserId) ? questUserId : userId,
            token: (!!externalUserId && !!questUserId && !!questUserToken && externalUserId == uniqueUserId) ? questUserToken : token
        }

        getAnswers && getAnswers(crt);

        try {
            axios.post(`${BACKEND_URL}api/entities/${entityId}/quests/${questId}/verify-all?userId=${headers.userId}&getVariation=${enableVariation}`, {criterias, userId: headers.userId}, {headers})
        } catch (error) {
            GeneralFunctions.captureSentryException(error);
        }

        try {
            axios.post(`${BACKEND_URL}api/entities/${entityId}/users/${headers.userId}/metrics/onboarding-complete?userId=${headers.userId}&questId=${questId}`, {count: 1}, {headers})
        } catch (error) {
            GeneralFunctions.captureSentryException(error);
        }
        
    }
    
    if (featureFlags[config.FLAG_CONSTRAINTS.OnboardingFlag]?.isEnabled == false) {
        return (<div></div>)
    }

    return (
        formdata.length > 0 && (
        <div className="q-onb-home" style={{
             background: styleConfig?.Form?.backgroundColor || themeConfig?.backgroundColor || "#fff", height: styleConfig?.Form?.height || "auto", fontFamily: themeConfig.fontFamily || "'Figtree', sans-serif" , ...styleConfig?.Form
             }}>
            <div
               className="q-onb-ch"
            >
                {formdata.length > 0 && !!headingScreen &&
                    (typeof headingScreen == "object" && !!headingScreen.name ? (
                        <div className="q-onb-main-heading" style={styleConfig?.Topbar}>
                            <div className="q-onb-main-h3" style={{ color: styleConfig?.Heading?.color || themeConfig?.primaryColor, ...styleConfig?.Heading }}>
                                {headingScreen?.name}
                            </div>
                            <div className="q-onb-main-h4" style={{ color: styleConfig?.Description?.color || themeConfig?.secondaryColor, ...styleConfig?.Description }}>{headingScreen?.desc}</div>
                        </div>
                    ) : !!headingScreen[currentPage] ? (
                        <div className="q-onb-main-heading" style={styleConfig?.Topbar}>
                            <div className="q-onb-main-h3" style={{ color: styleConfig?.Heading?.color || themeConfig?.primaryColor, ...styleConfig?.Heading }}>
                                {headingScreen[currentPage]?.name}
                            </div>
                            <div className="q-onb-main-h4" style={{ color: styleConfig?.Description?.color || themeConfig?.secondaryColor, ...styleConfig?.Description }}>
                                {headingScreen[currentPage]?.desc}
                            </div>
                        </div>
                    ) : (
                        <div className="q-onb-main-heading" style={styleConfig?.Topbar}>
                            <div className="q-onb-main-h3" style={{ color: styleConfig?.Heading?.color || themeConfig?.primaryColor, ...styleConfig?.Heading }}>
                                {headingScreen[0]?.name}
                            </div>
                            <div className="q-onb-main-h4" style={{ color: styleConfig?.Description?.color || themeConfig?.secondaryColor, ...styleConfig?.Description }}>
                                {headingScreen[0]?.desc}
                            </div>
                        </div>
                    ))}
                    
                    <div className="q-onb-main-first">
                    {(template === "multi-question") && (formdata.length > 0) && (designState.length > 1) && (!!progress?.length) && (<ProgressBar /> )}
                    {!!designState && designState.length > 0 && checkDesignCriteria()
                        ? designState[currentPage].map((num: number) =>
                        (formdata[num - 1].type == "USER_INPUT_TEXT"
                            ? normalInput(
                                formdata[num - 1]?.question || "",
                                formdata[num - 1]?.required || false,
                                formdata[num - 1].criteriaId || "",
                                num - 1,
                                formdata[num - 1]?.placeholder || formdata[num - 1]?.question || "",
                                "text"
                            )
                            : formdata[num - 1].type == "USER_INPUT_EMAIL"
                            ? normalInput(
                                formdata[num - 1]?.question || "",
                                formdata[num - 1]?.required || false,
                                formdata[num - 1].criteriaId || "",
                                num - 1,
                                formdata[num - 1]?.placeholder || formdata[num - 1]?.question || "",
                                "email"
                            )
                            : formdata[num - 1].type == "USER_INPUT_PHONE"
                            ? normalInput(
                                formdata[num - 1]?.question || "",
                                formdata[num - 1]?.required || false,
                                formdata[num - 1].criteriaId || "",
                                num - 1,
                                formdata[num - 1]?.placeholder || formdata[num - 1]?.question || "",
                                "number"
                            )
                            : formdata[num - 1].type == "USER_INPUT_TEXTAREA"
                            ? textAreaInput(
                                formdata[num - 1]?.question || "",
                                formdata[num - 1]?.required || false,
                                formdata[num - 1].criteriaId || "",
                                num - 1,
                                formdata[num - 1]?.placeholder || formdata[num - 1]?.question || ""
                            )
                            : formdata[num - 1].type == "USER_INPUT_DATE"
                                ? dateInput(
                                    formdata[num - 1]?.question || "",
                                    formdata[num - 1]?.required || false,
                                    formdata[num - 1].criteriaId || "",
                                    num - 1,
                                    formdata[num - 1]?.placeholder || formdata[num - 1]?.question || ""
                                )
                                : formdata[num - 1].type ==
                                    "USER_INPUT_SINGLE_CHOICE"
                                    ? !!singleChoose 
                                        &&  singleChoiceTwo(
                                            formdata[num - 1].options || [],
                                            formdata[num - 1]?.question || "",
                                            formdata[num - 1]?.required || false,
                                            formdata[num - 1].criteriaId || "",
                                            num - 1,
                                            formdata[num - 1]?.manualInput,
                                            singleChoose
                                        )
                                    : formdata[num - 1].type ==
                                        "USER_INPUT_MULTI_CHOICE"
                                        ? !!multiChoice && multiChoice == "modal2"
                                            ? multiChoiceTwo(
                                                formdata[num - 1].options || [],
                                                formdata[num - 1]?.question || "",
                                                formdata[num - 1]?.required || false,
                                                formdata[num - 1].criteriaId || "",
                                                num - 1
                                            ): multiChoiceOne(
                                                formdata[num - 1].options || [],
                                                formdata[num - 1]?.question || "",
                                                formdata[num - 1]?.required || false,
                                                formdata[num - 1].criteriaId || "",
                                                num - 1
                                            )
                                            : null )
                        )
                        : formdata?.map((data, index) =>
                            data.type == "USER_INPUT_TEXT"
                                ? normalInput(
                                    data?.question || "",
                                    data?.required || false,
                                    data.criteriaId || "",
                                    index,
                                    data?.placeholder || data?.question || "",
                                    "text"
                                )
                                : data.type == "USER_INPUT_EMAIL"
                                ? normalInput(
                                    data?.question || "",
                                    data?.required || false,
                                    data.criteriaId || "",
                                    index,
                                    data?.placeholder || data?.question || "",
                                    "email"
                                )
                                : data.type == "USER_INPUT_PHONE"
                                ? normalInput(
                                    data?.question || "",
                                    data?.required || false,
                                    data.criteriaId || "",
                                    index,
                                    data?.placeholder || data?.question || "",
                                    "number"
                                )
                                : data.type == "USER_INPUT_TEXTAREA"
                                ? textAreaInput(
                                    data?.question || "",
                                    data?.required || false,
                                    data.criteriaId || "",
                                    index,
                                    data?.placeholder || data?.question || "",
                                )
                                : data.type == "USER_INPUT_DATE"
                                    ? dateInput(
                                        data?.question || "",
                                        data?.required || false,
                                        data.criteriaId || "",
                                        index,
                                        data?.placeholder || data?.question || "",
                                    )
                                    : data.type == "USER_INPUT_SINGLE_CHOICE"
                                        ? !!singleChoose 
                                            && singleChoiceTwo(
                                                data.options || [],
                                                data?.question || "",
                                                data?.required || false,
                                                data.criteriaId || "",
                                                index,
                                                data?.manualInput,
                                                singleChoose
                                            )
                                        : data.type == "USER_INPUT_MULTI_CHOICE"
                                            ? !!multiChoice && multiChoice == "modal2"
                                                ? multiChoiceTwo(
                                                    data.options || [],
                                                    data?.question || "",
                                                    data?.required || false,
                                                    data.criteriaId || "",
                                                    index
                                                )
                                                : multiChoiceOne(
                                                    data.options || [],
                                                    data?.question || "",
                                                    data?.required || false,
                                                    data.criteriaId || "",
                                                    index
                                                )
                                                : null
                        )}
                    {formdata.length > 0 &&
                        (!!designState && designState.length > 1 &&
                            checkDesignCriteria() ? (
                                controlBtnType == "Buttons" ?
                                <div className="q-onb-main-criteria">
                                    {
                                     currentPage > 0 &&
                                     <SecondaryButton
                                     style={{
                                         opacity: currentPage == 0 ? "0" : "1",
                                         cursor:
                                             currentPage == 0
                                                 ? "context-menu"
                                                 : "pointer",
                                         borderColor: styleConfig?.SecondaryButton?.borderColor || themeConfig?.borderColor,
                                         backgroundColor: styleConfig?.SecondaryButton?.backgroundColor || themeConfig?.backgroundColor,
                                         color: styleConfig?.SecondaryButton?.color || themeConfig?.primaryColor,
                                         ...styleConfig?.SecondaryButton
                                     }}
                                     className="q-onb-main-btn"
                                     onClick={() =>{
                                        GeneralFunctions.fireTrackingEvent("quest_onboarding_secondary_btn_clicked", "onboarding");
                                        currentPage > 0 &&
                                         setCurrentPage(currentPage - 1)
                                        }
                                     }
                                 >
                                     Previous
                                 </SecondaryButton>
                                     
                                    }
                                   
                                    <PrimaryButton
                                        onClick={() =>{
                                            GeneralFunctions.fireTrackingEvent("quest_onboarding_primary_btn_clicked", "onboarding");
                                            currentPage !=
                                            designState.length - 1
                                                ? setCurrentPage(currentPage + 1)
                                                : returnAnswers();
                                        }
                                        }
                                        disabled={!btnFlag}
                                        className="q-onb-main-btn2"
                                        style={{
                                            background: styleConfig?.PrimaryButton?.background || themeConfig?.buttonColor,
                                            ...styleConfig?.PrimaryButton
                                        }}
                                    >
                                        {currentPage == designState.length - 1
                                            ? (nextBtnText ? nextBtnText : "Submit")
                                            : "Continue"}
                                    </PrimaryButton>
                                </div>
                                :
                                <div className="q-onb-main-arrow-div">
                                    <SecondaryButton
                                        className="q-onb-main-arrow"
                                        onClick={() =>{
                                            GeneralFunctions.fireTrackingEvent("quest_onboarding_secondary_btn_clicked", "onboarding");

                                            currentPage > 0 &&
                                            setCurrentPage(currentPage - 1)
                                        }
                                        }
                                        style={{
                                            height: styleConfig?.SecondaryButton?.width || '44px',
                                            width: styleConfig?.SecondaryButton?.width || '44px',
                                            borderRadius: styleConfig?.SecondaryButton?.borderRadius|| '50%',
                                            padding : styleConfig?.SecondaryButton?.padding || '10px',
                                            border :styleConfig?.SecondaryButton?.border || '1.5px solid #afafaf',
                                            opacity: currentPage == 0 ? "0" : "1",
                                            cursor:
                                                currentPage == 0
                                                    ? "context-menu"
                                                    : "pointer",
                                            borderColor: styleConfig?.SecondaryButton?.borderColor || themeConfig?.borderColor,
                                            backgroundColor: styleConfig?.SecondaryButton?.backgroundColor || themeConfig?.backgroundColor,
                                            color: styleConfig?.SecondaryButton?.color || themeConfig?.primaryColor,
                                            ...styleConfig?.SecondaryButton
                                        }}
                                    >
                                        {leftArrow()}
                                    </SecondaryButton>
                                    <PrimaryButton
                                        className="q-onb-main-arrow2"
                                        onClick={() =>{
                                            GeneralFunctions.fireTrackingEvent("quest_onboarding_primary_btn_clicked", "onboarding");

                                            currentPage !=
                                            designState.length - 1
                                                ? setCurrentPage(currentPage + 1)
                                                : returnAnswers();
                                            }
                                        }
                                        disabled={!btnFlag}
                                        style={{
                                            height : styleConfig?.PrimaryButton?.height || '44px',
                                            width: styleConfig?.PrimaryButton?.width || '44px',
                                            borderRadius :styleConfig?.PrimaryButton?.borderRadius || '50%',
                                            padding : styleConfig?.PrimaryButton?.padding || '10px',
                                            border : styleConfig?.PrimaryButton?.border ||'1.5px solid #D1ACFF',
                                            background: styleConfig?.PrimaryButton?.background || themeConfig?.buttonColor,
                                            ...styleConfig?.PrimaryButton
                                        }}
                                    >
                                        {rightArrow()}
                                    </PrimaryButton>
                                </div>
                        ) : (
                            <div>
                                <PrimaryButton
                                    className="q-onb-main-btn3"
                                    onClick={() => {
                                        GeneralFunctions.fireTrackingEvent("quest_onboarding_single_page_submit_button_clicked", "onboarding");
                                        returnAnswers();
                                    }}
                                    disabled={!btnFlag}
                                    style={{
                                        border :styleConfig?.SecondaryButton?.border || '1.5px solid #afafaf',
                                        background: styleConfig?.PrimaryButton?.background || themeConfig?.buttonColor,
                                        ...styleConfig?.PrimaryButton
                                    }}
                                >
                                    {nextBtnText ? nextBtnText : "Continue"}
                                </PrimaryButton>
                            </div>
                        ))}
                </div>
               {(formdata && showFooter) &&  <QuestLabs style={styleConfig?.Footer} /> }
            </div>
        </div>
        )
    );
}

export default OnBoarding;
