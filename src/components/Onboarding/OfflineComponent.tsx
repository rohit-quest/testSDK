import { useEffect, useRef, useState } from "react";
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
    userId?: string;
    token?: string;
    questId?: string;
    uniqueUserId?: string;
    uniqueEmailId?: string;
    design?: Array<Array<number>>;
    color?: string;
    bgColor?: string;
    btnColor?: string;
    inputBgColor?: string;
    headingScreen?: HeadingScreen | HeadingScreen[] | any;
    singleChoose?: "modal1" | "modal2" | "modal3";
    multiChoice?:  "modal1" | "modal2";
    screenHeight?: string;
    getAnswers: Function | undefined;
    answer: any;
    setAnswer: React.Dispatch<React.SetStateAction<any>>;
    customComponents?: React.JSX.Element;
    customComponentPositions?: number;
    inputBorder?: string;
    btnSize?: string;
    headingSize?: string;
    descSize?: string;
    inputFieldType?: { [key: string]: string };
    defaultFont?: boolean;
    progress?: string[];
    loadingTracker?: boolean;
    setLoading?: Function;
    linksLogoWidth?: string;
    previousBtnText?: string;
    nextBtnText?: string;
    progressbarColor?: string;
    progressBarMultiLine?: boolean;
    progressBartabHeight?: string;
    headingAlignment?: "left" | "right" | "center";
    questionFontSize?: string;
    answerFontSize?: string;
    gap?: string;
    controlBtnType?: "Arrow" | "Buttons";
    progressBarType?: "modal1"|"modal2";
    choiceColor?: string;
    textInputModal?: "modal1"|"modal2";
    template?: 1 | 2 | 3;
    offlineFormData: FormData[] | []
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

function OnBoardingOffline(props: QuestLoginProps) {
    console.log('initialized',props)
    const {
        color,
        bgColor,
        inputBgColor,
        inputBorder,
        btnSize,
        btnColor,
        headingSize,
        descSize,
        headingScreen,
        singleChoose,
        multiChoice="modal1",
        screenHeight,
        progress,
        getAnswers,
        answer,
        setAnswer,
        customComponents,
        customComponentPositions,
        inputFieldType,
        defaultFont,
        userId,
        token,
        questId,
        loadingTracker,
        setLoading=()=>{},
        linksLogoWidth,
        previousBtnText,
        nextBtnText,
        progressbarColor,
        progressBarMultiLine,
        progressBartabHeight,
        headingAlignment,
        questionFontSize,
        answerFontSize,
        gap,
        controlBtnType,
        uniqueUserId,
        uniqueEmailId,
        progressBarType="modal2",
        choiceColor="#6525B3",
        textInputModal = "modal1",
        template,
        offlineFormData
    } = props;

    let { design =[] } = props;

    const [currentPage, setCurrentPage] = useState<number>(0);
    const [btnFlag, setButtonFlag] = useState<boolean>(false);
    const [steps, setSteps] = useState<number[]>([]);
    const { apiKey, apiSecret, entityId, featureFlags, apiType } = useContext(QuestContext.Context);
    const cookies = new Cookies()
    const progressRef = useRef<HTMLDivElement>(null)
    const [designState,setDesign] = useState(design)

    let BACKEND_URL = apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL

    const templateDesign = () =>{
        switch (template) {
            case 1:
                break;
            case 2:
                {
                    let arr = [];
                    for (let i=1; i<=offlineFormData.length; i++)
                        arr.push(i);
                    design = [arr];
                    setDesign([...design])
                    break;
                }
            case 3:
                {
                    let arr = [];
                    for(let i=1; i<=offlineFormData.length; i++){
                        arr.push([i])
                    }
                    design = arr;
                    setDesign([...design])
                    break;
                }
        }
    }

    useEffect(() => {
        if (entityId) {
            // let externalUserId = cookies.get("externalUserId");
            // let questUserId = cookies.get("questUserId");
            // let questUserToken = cookies.get("questUserToken");
            // // let personalUserId = JSON.parse(localStorage.getItem("persana-user") || "{}");
            
            // const headers = {
            //     apiKey: apiKey,
            //     apisecret: apiSecret,
            //     userId: userId,
            //     token: token, // Replace with your actual token
            // };

            // const body = {
            //     externalUserId: !!uniqueUserId && uniqueUserId,
            //     entityId: entityId,
            //     email: uniqueEmailId
            // }
            
            getQuestData(userId||"", {})
            
            // if (!!externalUserId && !!questUserId && !!questUserToken && externalUserId == uniqueUserId) {
            //     let header = {...headers, ...{questUserId, questUserToken}}
            //     axios.post(`${BACKEND_URL}api/entities/${entityId}/users/${questUserId}/metrics/onboarding-view?userId=${questUserId}&questId=${questId}`, {count: 1}, {headers: header})
            // } else if (!!uniqueUserId) {
            //     axios.post(`${BACKEND_URL}api/users/external/login`, body, {headers})
            //     .then((res) => {
            //         let {userId, token} = res.data;
            //         let header = {...headers, ...{userId, token}}

            //         const date = new Date();
            //         date.setHours(date.getHours() + 12)
            //         cookies.set("externalUserId", uniqueUserId, {path: "/", expires: date})
            //         cookies.set("questUserId", userId, {path: "/", expires: date})
            //         cookies.set("questUserToken", token, {path: "/", expires: date})
            //         axios.post(`${BACKEND_URL}api/entities/${entityId}/users/${userId}/metrics/onboarding-view?userId=${userId}&questId=${questId}`, {count: 1}, {headers: header})
            //     })
            // }


            async function getQuestData(userId: string, headers: object) {
                // (loadingTracker && setLoading(true));
                // const request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}/criterias?userId=${userId}`;
                // await axios.get(request, { headers: headers }).then((res) => {
                //     let response = res.data;
                //     let criterias = response?.data?.eligibilityData?.map(
                //         (criteria: {
                //             criteriaType: string;
                //             metadata: { title: string; options: string[], isOptional: string, placeholder: string, linkActionName: string, linkActionUrl: string, manualInput: string};
                //             criteriaId: string;
                //         }) => {
                //             return {
                //                 type: criteria?.criteriaType,
                //                 question: criteria?.metadata?.title,
                //                 options: criteria?.metadata?.options || [],
                //                 criteriaId: criteria?.criteriaId,
                //                 required: !criteria?.metadata?.isOptional,
                //                 placeholder: criteria?.metadata?.placeholder,
                //                 linkTitle: criteria?.metadata?.linkActionName || "",
                //                 linkUrl: criteria?.metadata?.linkActionUrl || "",
                //                 manualInput: criteria?.metadata?.manualInput || false,
                //             };
                //         }
                //     );
                let ansArray: any = {};

                offlineFormData.forEach((criteria: any) => {
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
                // (loadingTracker && setLoading(false))
            }
        }
        console.log(offlineFormData)
    }, []);

    useEffect(() => {
        templateDesign()
        let currentQuestions: any =
            !!designState && designState.length > 0 && checkDesignCriteria()
                ? designState[currentPage]
                : offlineFormData.map((e, i) => i + 1);
        let c = 0;
        for (let i = 0; i < currentQuestions.length; i++) {
            if (offlineFormData[currentQuestions[i] - 1].required == false || offlineFormData[currentQuestions[i] - 1].type == "LINK_OPEN_READ") {
                c++;
            } else {
                if (
                    !!answer[offlineFormData[currentQuestions[i] - 1].criteriaId] &&
                    answer[offlineFormData[currentQuestions[i] - 1].criteriaId]
                        .length > 0
                ) {
                    c++;
                }
            }
        }

        if (currentQuestions.length > 0 && c == currentQuestions.length) {
            // let questUserId = cookies.get("questUserId");
            // let questUserToken = cookies.get("questUserToken");
    
            // let headers = {
            //     apikey: apiKey,
            //     apisecret: apiSecret,
            //     userId: questUserId,
            //     token: questUserToken
            // }
            // if (!!designState && Number(currentPage) + 1 != designState?.length) {
            //     // axios.post(`${BACKEND_URL}api/entities/${entityId}/users/${questUserId}/metrics/onboarding-complete-page-${Number(currentPage) + 1}?userId=${questUserId}&questId=${questId}`, {count: 1}, {headers})
            // }

            setButtonFlag(true);
        } else {
            setButtonFlag(false);
        }
    }, [answer, currentPage]);

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

    const ProgressBarNew = () =>{
        return ( <div className="q_onb_progress">
        {progress?.map((text, i) => {
            const isFilled = steps.includes(i);
            const isActive = currentPage === i;
            let color = isFilled ? '#098849' : isActive ? '#2C2C2C' : '#6E6E6E';
            let border = `1px solid ${isFilled ? '#098849' : isActive ? '#2C2C2C' : '#6E6E6E'}`;
    
          return (
              <div
                  style={{
                      width: `${100 / progress.length}%`,
                      color,
                      border,
                  }}
                  onClick={() => {
                      if (isFilled && (i <= currentPage + 1)) {
                          setCurrentPage(i);
                      }
                  }
                  }
                  className="q_onb_progress_tab"
                  key={i}
              >
                  {text}
              </div>
          );
        })}
      </div>)
    }
    
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
                                    <div className="q-onb-progress-comp" style={{borderColor: progressbarColor ? progressbarColor : "#098849", height: progressBarMultiLine ? progressBartabHeight : "auto"}}>
                                        <div 
                                            style={{
                                                maxWidth: `${((((wd - (progress.length - 1) * 15)) / progress.length) - 32)}px`,
                                                whiteSpace: progressBarMultiLine ? "normal" : "nowrap", 
                                                overflow: progressBarMultiLine ? "" : "hidden", 
                                                textOverflow: progressBarMultiLine ? "" : "ellipsis",
                                                color: "#098849"
                                            }}
                                        >
                                            {prog}
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 20" fill="none">
                                            <path opacity="0.3" d="M10.8333 18.3333C15.4357 18.3333 19.1667 14.6023 19.1667 9.99996C19.1667 5.39759 15.4357 1.66663 10.8333 1.66663C6.23095 1.66663 2.49999 5.39759 2.49999 9.99996C2.49999 14.6023 6.23095 18.3333 10.8333 18.3333Z" fill={progressbarColor ? progressbarColor : "#098849"}/>
                                            <path d="M14.8074 6.51474C15.1215 6.17828 15.6488 6.1601 15.9853 6.47412C16.3217 6.78815 16.3399 7.31548 16.0259 7.65193L10.1925 13.9019C9.88787 14.2284 9.38003 14.2566 9.041 13.9661L6.12434 11.4661C5.7749 11.1665 5.73443 10.6404 6.03395 10.291C6.33347 9.94157 6.85955 9.9011 7.20899 10.2006L9.51916 12.1808L14.8074 6.51474Z" fill={progressbarColor ? progressbarColor : "#098849"}/>
                                        </svg>
                                        
                                    </div>:(i==currentPage)?(<div className="q-onb-progress-comp" style={{borderColor: "#2C2C2C", height: progressBarMultiLine ? progressBartabHeight : "auto"}}>
                                        <div 
                                            style={{
                                                    maxWidth: `${((((wd - (progress.length - 1) * 15)) / progress.length) - 32)}px`, 
                                                    whiteSpace: progressBarMultiLine ? "normal" : "nowrap", 
                                                    overflow: progressBarMultiLine ? "" : "hidden", 
                                                    textOverflow: progressBarMultiLine ? "" : "ellipsis",
                                                    color: "#2C2C2C"
                                                }}
                                            >
                                            {prog}
                                        </div>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="20" height="20" fill="#2C2C2C"/>
                                            <path d="M-301 -113C-301 -114.105 -300.105 -115 -299 -115H2097C2098.1 -115 2099 -114.105 2099 -113V592C2099 593.105 2098.1 594 2097 594H-299C-300.105 594 -301 593.105 -301 592V-113Z" fill="#ECECEC"/>
                                            <rect width="376" height="68" transform="translate(-213 -20)" fill="white"/>
                                            <path id="Oval 3" d="M10 3.33337V5.00004C12.7614 5.00004 15 7.23862 15 10C15 12.7615 12.7614 15 10 15C7.23857 15 5 12.7615 5 10C5 9.13364 5.21992 8.30109 5.63312 7.56266L4.17866 6.74882C3.6272 7.73435 3.33333 8.84683 3.33333 10C3.33333 13.6819 6.3181 16.6667 10 16.6667C13.6819 16.6667 16.6667 13.6819 16.6667 10C16.6667 6.31814 13.6819 3.33337 10 3.33337Z" fill="#2C2C2C"/>
                                            <path d="M-299 -114H2097V-116H-299V-114ZM2098 -113V592H2100V-113H2098ZM2097 593H-299V595H2097V593ZM-300 592V-113H-302V592H-300ZM-299 593C-299.552 593 -300 592.552 -300 592H-302C-302 593.657 -300.657 595 -299 595V593ZM2098 592C2098 592.552 2097.55 593 2097 593V595C2098.66 595 2100 593.657 2100 592H2098ZM2097 -114C2097.55 -114 2098 -113.552 2098 -113H2100C2100 -114.657 2098.66 -116 2097 -116V-114ZM-299 -116C-300.657 -116 -302 -114.657 -302 -113H-300C-300 -113.552 -299.552 -114 -299 -114V-116Z" fill="#AFAFAF"/>
                                        </svg>
                                        
                                    </div>):(
                                    <div className="q-onb-progress-comp" style={{borderColor: "#ECECEC", height: progressBarMultiLine ? progressBartabHeight : "auto"}}>
                                        <div 
                                            style={{
                                                    maxWidth: `${((((wd - (progress.length - 1) * 15)) / progress.length) - 32)}px`, 
                                                    whiteSpace: progressBarMultiLine ? "normal" : "nowrap", 
                                                    overflow: progressBarMultiLine ? "" : "hidden", 
                                                    textOverflow: progressBarMultiLine ? "" : "ellipsis",
                                                    color: "#AFAFAF"
                                                }}
                                            >
                                            {prog}
                                        </div>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="20" height="20" fill="#E9E9E9"/>
                                            <path d="M-301 -113C-301 -114.105 -300.105 -115 -299 -115H2097C2098.1 -115 2099 -114.105 2099 -113V592C2099 593.105 2098.1 594 2097 594H-299C-300.105 594 -301 593.105 -301 592V-113Z" fill="#ECECEC"/>
                                            <rect width="376" height="68" transform="translate(-213 -20)" fill="white"/>
                                            <path id="Oval 3" d="M10 3.33337V5.00004C12.7614 5.00004 15 7.23862 15 10C15 12.7615 12.7614 15 10 15C7.23857 15 5 12.7615 5 10C5 9.13364 5.21992 8.30109 5.63312 7.56266L4.17866 6.74882C3.6272 7.73435 3.33333 8.84683 3.33333 10C3.33333 13.6819 6.3181 16.6667 10 16.6667C13.6819 16.6667 16.6667 13.6819 16.6667 10C16.6667 6.31814 13.6819 3.33337 10 3.33337Z" fill="#AFAFAF"/>
                                            <path d="M-299 -114H2097V-116H-299V-114ZM2098 -113V592H2100V-113H2098ZM2097 593H-299V595H2097V593ZM-300 592V-113H-302V592H-300ZM-299 593C-299.552 593 -300 592.552 -300 592H-302C-302 593.657 -300.657 595 -299 595V593ZM2098 592C2098 592.552 2097.55 593 2097 593V595C2098.66 595 2100 593.657 2100 592H2098ZM2097 -114C2097.55 -114 2098 -113.552 2098 -113H2100C2100 -114.657 2098.66 -116 2097 -116V-114ZM-299 -116C-300.657 -116 -302 -114.657 -302 -113H-300C-300 -113.552 -299.552 -114 -299 -114V-116Z" fill="#AFAFAF"/>
                                        </svg>
                                        
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
        inputType: string,
    ) => {
        return (
            <div key={criteriaId}>
                {
                    (customComponentPositions == index + 1) &&
                    <div style={{paddingBottom: "12px"}}>
                        {customComponents}
                    </div>
                }
                <label
                    className="q-onb-lebels"
                    htmlFor="normalInput"
                    style={{ color: color }}
                >
                    {question} {required && "*"}
                </label>
                <div className="q-onb-input" style={{border: inputBorder}}>
                    {textInputModal ==="modal2" && (inputType == "text" ? userLogo() : inputType == "number" ? phoneLogo() : emailLogo())}
                    <input
                        type={inputType}
                        id="normalInput"
                        name="normalInput"
                        style={{ backgroundColor: inputBgColor, fontSize: answerFontSize }}
                        onChange={(e) => handleUpdate(e, criteriaId, "")}
                        value={answer[criteriaId]}
                        placeholder={placeholder}
                        className="q_sdk_input"
                    />
                    {textInputModal === "modal2" && crossLogo(criteriaId, handleRemove)}
                </div>
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
                <label
                    className="q-onb-lebels"
                    htmlFor="dateInput"
                    style={{ color: color }}
                >
                    {question} {required && "*"}
                </label>
                <div className="q-onb-input" style={{border: inputBorder}}>
                    <label className="q-onb-custom-date">
                        <input
                            type="date"
                            id="dateInput"
                            name="dateInput"
                            value={answer[criteriaId]}
                            style={{ backgroundColor: inputBgColor, fontSize: answerFontSize }}
                            onChange={(e) => handleUpdate(e, criteriaId, "")}
                            className="q_sdk_input q-onb-custom-datePicker"
                        />
                        <button id="q-onb-custom-date-text">{answer[criteriaId] ? <div style={{display: "inline"}} >{answer[criteriaId]}</div> : <div style={{display: "inline", color:"#8E8E8E"}}>{placeholder}</div>}</button>
                    </label>
                    {calenderIcon()}
                    {textInputModal==="modal2" && crossLogo(criteriaId, handleRemove)}
                </div>
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
                <label
                    className="q-onb-lebels"
                    htmlFor="normalInput"
                    style={{ color: color }}
                >
                    {question} {required && "*"}
                </label>
                <div className="q-onb-input" style={{alignItems: "flex-start", border: inputBorder}}>
                    {textAreaIcon()}
                    <textarea
                        id="normalInput"
                        name="normalInput"
                        placeholder={placeholder}
                        style={{ height: "120px", backgroundColor: inputBgColor, fontFamily: defaultFont == false ? "" : "'Figtree', sans-serif", maxWidth: "100%", fontSize: answerFontSize }}
                        onChange={(e) => handleUpdate(e, criteriaId, "")}
                        value={answer[criteriaId]}
                    />
                    {crossLogo(criteriaId, handleRemove)}
                </div>
            </div>
        );
    };

    const singleChoiceTwo = (
        options: string[] | [],
        question: string,
        required: boolean,
        criteriaId: string,
        index: number,
        manualInput: string | boolean
    ) => {
        const customStyles: StylesConfig<any, false, any> = {
            control: (base, state) => ({
              ...base,
              background: inputBgColor,
              fontSize: answerFontSize || "14px",
              border: inputBorder || "2px solid var(--neutral-grey-100, #ECECEC)",
              borderRadius: "10px"
            }),
            option: (styles, { isDisabled, isFocused, isSelected }) => ({
              ...styles,
              backgroundColor: isFocused ? "grey" : inputBgColor || "#f9fafb",
              color: ""
            }),
            menu: (provided) => ({
              ...provided,
              backgroundColor: inputBgColor || "#f9fafb",
            })
          };
        
        return (
            <div key={criteriaId}>
                {
                    (customComponentPositions == index + 1) &&
                    <div style={{paddingBottom: "12px"}}>
                        {customComponents}
                    </div>
                }
                <label
                    htmlFor={criteriaId}
                    className="q-onb-lebels"
                    style={{ color: color }}
                >
                    {question} {required && "*"}
                </label>
                {/* <div className="selectdiv">
                    <select
                        id={criteriaId}
                        value={answer[criteriaId]}
                        onChange={(e) => handleUpdate(e, criteriaId, "")}
                        className="q-onb-singleChoiceOne"
                        style={{ backgroundColor: inputBgColor, border: inputBorder }}
                    >
                        <option value="" disabled>Choose a option</option>
                        {options.map((opt, id) => (
                            <option value={opt} key={`sct${id}`}>
                                {opt}
                            </option>
                        ))}
                    </select>
                </div> */}
                <Select 
                    isSearchable={true} 
                    name={criteriaId} 
                    options={options.map((opt: string) => {return {value: opt, label: opt}})} 
                    onChange={(e) => handleUpdate({target: e}, criteriaId, "")}
                    styles={customStyles}
                    value={answer[criteriaId]?{value: answer[criteriaId], label: answer[criteriaId]}:''}
                />
                {manualInput != false && answer[criteriaId] == manualInput &&
                    <div className="q-onb-input" style={{border: inputBorder, marginTop: "10px"}}>
                        {userLogo()}
                        <input
                            type="text"
                            id="normalInput"
                            name="normalInput"
                            style={{ backgroundColor: inputBgColor, fontSize: answerFontSize }}
                            onChange={(e) => handleUpdate(e, (criteriaId + "/manual"), "")}
                            value={answer[criteriaId + "/manual"]}
                            placeholder="Please fill manually"
                        />
                        {crossLogo(criteriaId + "/manual", handleRemove)}
                    </div>
                }
            </div>
        );
    };
    
    const singleChoiceOne = (
        options: string[] | [],
        question: string,
        required: boolean,
        criteriaId: string,
        index: number,
        manualInput: string | boolean
    ) => {
        return (
            <div key={criteriaId}>
                {
                    (customComponentPositions == index + 1) &&
                    <div style={{paddingBottom: "12px"}}>
                        {customComponents}
                    </div>
                }
                <div
                    className="q-onb-singleChoiceOne-lebel"
                    style={{ color: color }}
                >
                    {question} {required && "*"}
                </div>
                <div className="q-onb-singleChoiceOne-optDiv">
                    {options.map((option: string, id: number) => (
                        <div className="q_onb_singlehoiceOne_lebel" key={id}>
                            <input
                                id={`sct${criteriaId + id}`}
                                type="radio"
                                value={option}
                                checked={answer[criteriaId] == option}
                                onChange={(e) =>
                                    handleUpdate(e, criteriaId, "radio")
                                }
                                style={{accentColor: choiceColor}}
                                name={`default-radio${criteriaId}`}
                                className="q-onb-singleChoiceOne-inp"
                            />
                            <label
                                htmlFor={`sct${criteriaId + id}`}
                                className="q-onb-singleChoiceOne-lebel3"
                                style={{fontSize: answerFontSize, color: answer[criteriaId] == option ? choiceColor : ""}}
                            >
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
                {manualInput != false && answer[criteriaId] == manualInput &&
                    <input 
                        type="text" 
                        name="" 
                        id="" 
                        className="q_sdk_input q-onb-input"
                        style={{marginTop: "10px", fontSize: answerFontSize}}
                        placeholder="Please fill manually"
                        onChange={(e) => handleUpdate(e, (criteriaId + "/manual"), "")}
                        value={answer[criteriaId + "/manual"]}
                    />
                }
            </div>
        );
    };

    const singleChoiceThree = (
        options: string[] | [],
        question: string,
        required: boolean,
        criteriaId: string,
        index: number,
        manualInput: string | boolean
    ) => {
        return (
            <div key={criteriaId}>
                {
                    (customComponentPositions == index + 1) &&
                    <div style={{paddingBottom: "12px"}}>
                        {customComponents}
                    </div>
                }
                <div
                    className="q-onb-singleChoiceOne-lebel"
                    style={{ color: color }}
                >
                    {question} {required && "*"}
                </div>
                <div className="q_onb_single_choice_three">
                    {options.map((option: string, id: number) => (
                        <div className="q_onb_singlehoiceThree_lebel" key={id}>
                            <input
                                id={`sct${criteriaId + id}`}
                                type="radio"
                                value={option}
                                checked={answer[criteriaId] == option}
                                onChange={(e) =>
                                    handleUpdate(e, criteriaId, "radio")
                                }
                                style={{display: "none"}}
                                name={`default-radio${criteriaId}`}
                                className="q-onb-singleChoiceOne-inp"
                            />
                            <Tick fillColor={choiceColor} borderColor={inputBorder} isActive={answer[criteriaId] == option} />
                            <label
                                htmlFor={`sct${criteriaId + id}`}
                                className="q-onb-singleChoiceOne-lebel3"
                                style={{fontSize: answerFontSize, color: answer[criteriaId] == option ? choiceColor : "",fontWeight:"500"}}
                            >
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
                {manualInput != false && answer[criteriaId] == manualInput &&
                    <input 
                        type="text" 
                        name="" 
                        id="" 
                        className="q_sdk_input q-onb-input"
                        style={{marginTop: "10px", fontSize: answerFontSize}}
                        placeholder="Please fill manually"
                        onChange={(e) => handleUpdate(e, (criteriaId + "/manual"), "")}
                        value={answer[criteriaId + "/manual"]}
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
                <div
                    className="q-onb-singleChoiceOne-lebel"
                    style={{ color: color }}
                >
                    {question} {required && "*"}
                </div>
                <div className="q-onb-singleChoiceOne-optDiv">
                    {options.map((option: string, id: number) => (
                        <div className="q-onb-singleChoiceOne-chDiv" key={id}>
                            <input
                                id={`mct${criteriaId + id}`}
                                type="checkbox"
                                checked={
                                    !!answer[criteriaId] &&
                                    answer[criteriaId]?.includes(option)
                                }
                                value={option}
                                onChange={(e) =>
                                    handleUpdate(e, criteriaId, "check")
                                }
                                className="q-onb-singleChoiceOne-inp"
                            />
                            <label
                                htmlFor={`mct${criteriaId + id}`}
                                className="q-onb-singleChoiceOne-lebel3"
                                style={{fontSize: answerFontSize, color: answer[criteriaId].includes(option) ? "#252525" : ""}}
                            >
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const multiChoiceThree = (
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
                <div
                    className="q_onb_lebels"
                    style={{ color: color }}
                >
                    {question} {required && "*"}
                </div>
                <div className="q_onb_miltiChoiceOne_ul">
                    {options.map((option: string, id: number) => (
                        <div key={id} style={{listStyleType: "none"}}>
                            <input
                                type="checkbox"
                                id={`mct${criteriaId + id}`}
                                value={option}
                                checked={
                                    !!answer[criteriaId] &&
                                    answer[criteriaId].includes(option)
                                }
                                style={{display: "none"}}
                                className="q_onb_multiChoiceOne_checkbox"
                                onChange={(e) =>
                                    handleUpdate(e, criteriaId, "check")
                                }
                            />
                            <label
                                htmlFor={`mct${criteriaId + id}`}
                                className="q_onb_miltiChoiceOne_lebel"
                            >
                                <div style={{display: "block"}}>
                                    <div style={{fontSize: answerFontSize ? answerFontSize : "14px"}}>{option}</div>
                                </div>
                            </label>
                        </div>
                    ))}
                </div>
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
                <div
                    className="q-onb-lebels"
                    style={{ color: color }}
                >
                    {question} {required && "*"}
                </div>
                <ul className="q-onb-miltiChoiceOne-ul">
                    {options.map((option: string, id: number) => (
                        <li key={id} style={{listStyleType: "none"}}>
                            <input
                                type="checkbox"
                                id={`mct${criteriaId + id}`}
                                value={option}
                                checked={
                                    !!answer[criteriaId] &&
                                    answer[criteriaId].includes(option)
                                }
                                style={{display: "none"}}
                                className="q-onb-multiChoiceOne-checkbox"
                                onChange={(e) =>
                                    handleUpdate(e, criteriaId, "check")
                                }
                            />
                            <label
                                htmlFor={`mct${criteriaId + id}`}
                                className="q-onb-miltiChoiceOne-lebel"
                            >
                                <div style={{display: "block"}}>
                                    <div style={{fontSize: answerFontSize ? answerFontSize : "14px"}}>{option}</div>
                                </div>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const chooseLogo = (links: string) => {
        if (links.includes("calendly")) {
            return calendly
        } else if (links.includes("slack")) {
            return slack
        } else if (links.includes("twitter")) {
            return twitter
        } else if (links.includes("discord")) {
            return discord
        } else {
            return link
        }
    }

    const linksCriteria = (
        linkTitle: string,
        criteriaId: string,
        linkUrl: string,
        index: number,
    ) => {
        return (
            <div key={criteriaId}>
                {
                    (customComponentPositions == index + 1) &&
                    <div style={{paddingBottom: "12px"}}>
                        {customComponents}
                    </div>
                }
                <a href={linkUrl} target="_blank" style={{textDecoration: "none"}}>
                    <div className="q-onb-link-div">
                        <img src={chooseLogo(linkUrl)} style={{width: linksLogoWidth }}/>
                        <div className="q-onb-link-div-ch">
                            <div style={{ color: color ? color : "black" }}>{linkTitle}</div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                                <path d="M2 11H14.2L8.6 16.6L10 18L18 10L10 2L8.6 3.4L14.2 9H2V11Z" className="q-onb-arrow"/>
                            </svg>
                        </div>
                    </div>
                </a>
            </div>
        );
    };

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
            arr.length == offlineFormData.length &&
            Math.max(...arr) == offlineFormData.length
            ) {
                fl = true;
            }

        return fl;
    }

    function returnAnswers() {
        
        let crt: any = {...answer};
        for (let i of Object.keys(crt)) {
            if (i.includes("/manual") && crt[i] != "") {
                let id: string = i.split("/manual")[0];
                let criteriaDetails: FormData[] = offlineFormData.filter((item) => item.criteriaId == id)
                if (criteriaDetails[0].manualInput == crt[id]) {
                    crt[id] = crt[i];
                }
            }
        }
        
        // let ansArr: Answer[] = offlineFormData.map((ans: offlineFormData) => {
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
            question: offlineFormData[offlineFormData.findIndex(ele => ele.criteriaId == key)].question
        }));

        
        // let questUserId = cookies.get("questUserId");
        // let questUserToken = cookies.get("questUserToken");

        // let headers = {
        //     apikey: apiKey,
        //     apisecret: apiSecret,
        //     userId: questUserId ? questUserId : userId,
        //     token: questUserToken ? questUserToken : token
        // }

        // getAnswers && getAnswers(crt);
        
        // axios.post(`${BACKEND_URL}api/entities/${entityId}/quests/${questId}/verify-all?userId=${headers.userId}`, {criterias, userId: headers.userId}, {headers})

        // axios.post(`${BACKEND_URL}api/entities/${entityId}/users/${headers.userId}/metrics/onboarding-complete?userId=${headers.userId}&questId=${questId}`, {count: 1}, {headers})
        
    }
    
    if (featureFlags[config.FLAG_CONSTRAINTS.OnboardingFlag]?.isEnabled == false) {
        return (<div></div>)
    }

    return (
        <div className="q-onb-home" style={{ background: bgColor, height: screenHeight ? screenHeight : "fit-content", fontFamily: defaultFont == false ? "" : "'Figtree', sans-serif" }}>
            <div
               className="q-onb-ch"
            >
                {offlineFormData.length > 0 && !!headingScreen &&
                    (typeof headingScreen == "object" && !!headingScreen.name ? (
                        <div className="q-onb-main-heading">
                            <div className="q-onb-main-h3" style={{ fontSize: headingSize, textAlign: headingAlignment }}>
                                {headingScreen?.name}
                            </div>
                            <div className="q-onb-main-h4" style={{ fontSize: descSize, textAlign: headingAlignment }}>{headingScreen?.desc}</div>
                        </div>
                    ) : !!headingScreen[currentPage] ? (
                        <div className="q-onb-main-heading">
                            <div className="q-onb-main-h3" style={{ fontSize: headingSize, textAlign: headingAlignment }}>
                                {headingScreen[currentPage]?.name}
                            </div>
                            <div className="q-onb-main-h4" style={{ fontSize: descSize, textAlign: headingAlignment }}>
                                {headingScreen[currentPage]?.desc}
                            </div>
                        </div>
                    ) : (
                        <div className="q-onb-main-heading">
                            <div className="q-onb-main-h3" style={{ fontSize: headingSize, textAlign: headingAlignment }}>
                                {headingScreen[0]?.name}
                            </div>
                            <div className="q-onb-main-h4" style={{ fontSize: descSize, textAlign: headingAlignment }}>
                                {headingScreen[0]?.desc}
                            </div>
                        </div>
                    ))}
                    { (offlineFormData.length > 0) && (template == 1) &&(progressBarType==="modal2"? <ProgressBarNew />:<ProgressBar /> )}
                    <div className="q-onb-main-first" style={{fontSize: questionFontSize}}>
                    {!!designState && designState.length > 0 && checkDesignCriteria()
                        ? designState[currentPage].map((num: number) =>
                        (offlineFormData[num - 1].type == "USER_INPUT_TEXT"
                            ? normalInput(
                                offlineFormData[num - 1]?.question || "",
                                offlineFormData[num - 1]?.required || false,
                                offlineFormData[num - 1].criteriaId || "",
                                num - 1,
                                offlineFormData[num - 1]?.placeholder || offlineFormData[num - 1]?.question || "",
                                "text"
                            )
                            : offlineFormData[num - 1].type == "USER_INPUT_EMAIL"
                            ? normalInput(
                                offlineFormData[num - 1]?.question || "",
                                offlineFormData[num - 1]?.required || false,
                                offlineFormData[num - 1].criteriaId || "",
                                num - 1,
                                offlineFormData[num - 1]?.placeholder || offlineFormData[num - 1]?.question || "",
                                "email"
                            )
                            : offlineFormData[num - 1].type == "USER_INPUT_PHONE"
                            ? normalInput(
                                offlineFormData[num - 1]?.question || "",
                                offlineFormData[num - 1]?.required || false,
                                offlineFormData[num - 1].criteriaId || "",
                                num - 1,
                                offlineFormData[num - 1]?.placeholder || offlineFormData[num - 1]?.question || "",
                                "number"
                            )
                            : offlineFormData[num - 1].type == "USER_INPUT_TEXTAREA"
                            ? textAreaInput(
                                offlineFormData[num - 1]?.question || "",
                                offlineFormData[num - 1]?.required || false,
                                offlineFormData[num - 1].criteriaId || "",
                                num - 1,
                                offlineFormData[num - 1]?.placeholder || offlineFormData[num - 1]?.question || ""
                            )
                            : offlineFormData[num - 1].type == "USER_INPUT_DATE"
                                ? dateInput(
                                    offlineFormData[num - 1]?.question || "",
                                    offlineFormData[num - 1]?.required || false,
                                    offlineFormData[num - 1].criteriaId || "",
                                    num - 1,
                                    offlineFormData[num - 1]?.placeholder || offlineFormData[num - 1]?.question || ""
                                )
                                :  offlineFormData[num - 1].type ==
                                        "USER_INPUT_MULTI_CHOICE"
                                        ? !!multiChoice && multiChoice == "modal2"
                                            ? multiChoiceTwo(
                                                offlineFormData[num - 1].options || [],
                                                offlineFormData[num - 1]?.question || "",
                                                offlineFormData[num - 1]?.required || false,
                                                offlineFormData[num - 1].criteriaId || "",
                                                num - 1
                                            ): multiChoiceOne(
                                                offlineFormData[num - 1].options || [],
                                                offlineFormData[num - 1]?.question || "",
                                                offlineFormData[num - 1]?.required || false,
                                                offlineFormData[num - 1].criteriaId || "",
                                                num - 1
                                            )
                                        : offlineFormData[num - 1].type == 
                                            "LINK_OPEN_READ" 
                                            ? linksCriteria(
                                                offlineFormData[num - 1].linkTitle,
                                                offlineFormData[num - 1].criteriaId,
                                                offlineFormData[num - 1].linkUrl,
                                                num - 1
                                            )
                                            : null )
                        )
                        : offlineFormData?.map((data, index) =>
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
                                        ? !!singleChoose && singleChoose == "modal2"
                                            ? singleChoiceTwo(
                                                data.options || [],
                                                data?.question || "",
                                                data?.required || false,
                                                data.criteriaId || "",
                                                index,
                                                data?.manualInput
                                            )
                                            : (singleChoose == "modal3")?
                                            singleChoiceThree(
                                                data.options || [],
                                                data?.question || "",
                                                data?.required || false,
                                                data.criteriaId || "",
                                                index,
                                                data?.manualInput
                                            )
                                            : singleChoiceOne(
                                                data.options || [],
                                                data?.question || "",
                                                data?.required || false,
                                                data.criteriaId || "",
                                                index,
                                                data?.manualInput
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
                                                : data.type == "LINK_OPEN_READ" 
                                                    ? linksCriteria(
                                                        data.linkTitle,
                                                        data.criteriaId,
                                                        data.linkUrl,
                                                        index
                                                    )
                                                    : null
                        )}
                    {offlineFormData.length > 0 &&
                        (!!designState && designState.length > 1 &&
                            checkDesignCriteria() ? (
                                controlBtnType == "Buttons" ?
                                <div className="q-onb-main-criteria">
                                    <button
                                        className="q-onb-main-btn"
                                        onClick={() =>
                                            currentPage > 0 &&
                                            setCurrentPage(currentPage - 1)
                                        }
                                        style={{
                                            opacity: currentPage == 0 ? "0" : "1",
                                            cursor:
                                                currentPage == 0
                                                    ? "context-menu"
                                                    : "pointer",
                                        }}
                                    >
                                        {" "}
                                        {previousBtnText ? previousBtnText : "Previous"}
                                    </button>
                                    <button
                                        className="q-onb-main-btn2"
                                        onClick={() =>
                                            currentPage !=
                                            designState.length - 1
                                                ? setCurrentPage(currentPage + 1)
                                                : returnAnswers()
                                        }
                                        disabled={!btnFlag}
                                        style={{
                                            backgroundColor: btnColor,
                                        }}
                                    >
                                        {currentPage == designState.length - 1
                                            ? (nextBtnText ? nextBtnText : "Submit")
                                            : "Continue"}
                                    </button>
                                </div>
                                :
                                <div className="q-onb-main-arrow-div">
                                    <button 
                                        className="q-onb-main-arrow"
                                        onClick={() =>
                                            currentPage > 0 &&
                                            setCurrentPage(currentPage - 1)
                                        }
                                        style={{
                                            opacity: currentPage == 0 ? "0" : "1",
                                            cursor:
                                                currentPage == 0
                                                    ? "context-menu"
                                                    : "pointer",
                                        }}
                                    >
                                        {leftArrow()}
                                    </button>
                                    <button
                                        className="q-onb-main-arrow2"
                                        onClick={() =>
                                            currentPage !=
                                            designState.length - 1
                                                ? setCurrentPage(currentPage + 1)
                                                : returnAnswers()
                                        }
                                        disabled={!btnFlag}
                                        style={{
                                            backgroundColor: btnColor,
                                        }}
                                    >
                                        {rightArrow()}
                                    </button>
                                </div>
                        ) : (
                            <div>
                                <button
                                    className="q-onb-main-btn3"
                                    onClick={returnAnswers}
                                    disabled={!btnFlag}
                                    style={{
                                        backgroundColor: btnColor,
                                        width: btnSize
                                    }}
                                >
                                    {nextBtnText ? nextBtnText : "Continue"}
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default OnBoardingOffline;
