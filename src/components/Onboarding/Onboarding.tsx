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


type HeadingScreen = {
    name: string;
    desc: string;
};

interface QuestLoginProps {
    design?: Array<Array<number>>;
    color?: string;
    bgColor?: string;
    btnColor?: string;
    inputBgColor?: string;
    headingScreen?: HeadingScreen | HeadingScreen[] | any;
    singleChoose?: "modal1" | "modal2";
    multiChoice?:  "modal1" | "modal2"|"modal3";
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
    userId: string;
    token: string;
    questId: string;
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
    uniqueUserId?: string;
    uniqueEmailId?: string;
    progressBarType?: "modal1"|"modal2"
}

interface FormData {
    type: string;
    question: string;
    options: [string];
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
        design,
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
        multiChoice="modal3",
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
        progressBarType="modal2"
    } = props;

    const [formdata, setFormdata] = useState<FormData[] | []>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [btnFlag, setButtonFlag] = useState<boolean>(false);
    const [steps, setSteps] = useState<number[]>([]);
    const { apiKey, apiSecret, entityId, featureFlags, apiType } = useContext(QuestContext.Context);
    const cookies = new Cookies()
    const progressRef = useRef<HTMLDivElement>(null)
    let BACKEND_URL = apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL

    useEffect(() => {
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
                    axios.post(`${BACKEND_URL}api/entities/${entityId}/users/${userId}/metrics/onboarding-view?userId=${userId}&questId=${questId}`, {count: 1}, {headers: header})
                })
            }


            async function getQuestData(userId: string, headers: object) {
                (loadingTracker && setLoading(true));
                const request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}/criterias?userId=${userId}`;
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
                });
                (loadingTracker && setLoading(false))
            }
        }
    }, []);

    useEffect(() => {
        let currentQuestions: any =
            !!design && design.length > 0 && checkDesignCriteria()
                ? design[currentPage]
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
                userId: questUserId,
                token: questUserToken
            }
            if (!!design && Number(currentPage) + 1 != design?.length) {
                axios.post(`${BACKEND_URL}api/entities/${entityId}/users/${questUserId}/metrics/onboarding-complete-page-${Number(currentPage) + 1}?userId=${questUserId}&questId=${questId}`, {count: 1}, {headers})
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
                                    <div className="q-onb-progress-comp" style={{borderColor: progressbarColor ? progressbarColor : "#5E5E5E", height: progressBarMultiLine ? progressBartabHeight : "auto"}}>
                                        <div 
                                            style={{
                                                maxWidth: `${((((wd - (progress.length - 1) * 15)) / progress.length) - 32)}px`,
                                                whiteSpace: progressBarMultiLine ? "normal" : "nowrap", 
                                                overflow: progressBarMultiLine ? "" : "hidden", 
                                                textOverflow: progressBarMultiLine ? "" : "ellipsis",
                                                color: "#5E5E5E"
                                            }}
                                        >
                                            {prog}
                                        </div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 21 20" fill="none">
                                            <path opacity="0.3" d="M10.8333 18.3333C15.4357 18.3333 19.1667 14.6023 19.1667 9.99996C19.1667 5.39759 15.4357 1.66663 10.8333 1.66663C6.23095 1.66663 2.49999 5.39759 2.49999 9.99996C2.49999 14.6023 6.23095 18.3333 10.8333 18.3333Z" fill={progressbarColor ? progressbarColor : "#8E8E8E"}/>
                                            <path d="M14.8074 6.51474C15.1215 6.17828 15.6488 6.1601 15.9853 6.47412C16.3217 6.78815 16.3399 7.31548 16.0259 7.65193L10.1925 13.9019C9.88787 14.2284 9.38003 14.2566 9.041 13.9661L6.12434 11.4661C5.7749 11.1665 5.73443 10.6404 6.03395 10.291C6.33347 9.94157 6.85955 9.9011 7.20899 10.2006L9.51916 12.1808L14.8074 6.51474Z" fill={progressbarColor ? progressbarColor : "#8E8E8E"}/>
                                        </svg>
                                        
                                    </div>
                                    :
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
                                        
                                    </div>
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
                    {inputType == "text" ? userLogo() : inputType == "number" ? phoneLogo() : emailLogo()}
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
                    {crossLogo(criteriaId, handleRemove)}
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
                    {calenderIcon()}
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
                    {crossLogo(criteriaId, handleRemove)}
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
        options: [string] | [],
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
              backgroundColor: isFocused ? "#9dc3ed" : inputBgColor || "#f9fafb",
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
        options: [string] | [],
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
                        <div className="q-onb-singleChoiceOne-chDiv" key={id}>
                            <input
                                id={`sct${criteriaId + id}`}
                                type="radio"
                                value={option}
                                checked={answer[criteriaId] == option}
                                onChange={(e) =>
                                    handleUpdate(e, criteriaId, "radio")
                                }
                                name={`default-radio${criteriaId}`}
                                className="q-onb-singleChoiceOne-inp"
                            />
                            <label
                                htmlFor={`sct${criteriaId + id}`}
                                className="q-onb-singleChoiceOne-lebel3"
                                style={{fontSize: answerFontSize, color: answer[criteriaId] == option ? "#252525" : ""}}
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
        if(!design?.length) return;

        let fl = false;
        let arr: number[] = [];

        for (let i = 0; i < design?.length; i++) {
            if (
                typeof design[i] != "object" &&
                design[i][0] == null
            ) {
                return false;
            }
            for (let j = 0; j < design[i].length; j++) {
                if (!arr.includes(design[i][j])) {
                    arr.push(design[i][j]);
                }
            }
        }

        if (
            arr.length == formdata.length &&
            Math.max(...arr) == formdata.length
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

        let headers = {
            apikey: apiKey,
            apisecret: apiSecret,
            userId: questUserId ? questUserId : userId,
            token: questUserToken ? questUserToken : token
        }

        getAnswers && getAnswers(crt);
        
        axios.post(`${BACKEND_URL}api/entities/${entityId}/quests/${questId}/verify-all?userId=${headers.userId}`, {criterias, userId: headers.userId}, {headers})

        axios.post(`${BACKEND_URL}api/entities/${entityId}/users/${headers.userId}/metrics/onboarding-complete?userId=${headers.userId}&questId=${questId}`, {count: 1}, {headers})
        
    }
    
    if (featureFlags[config.FLAG_CONSTRAINTS.OnboardingFlag]?.isEnabled == false) {
        return (<div></div>)
    }

    return (
        <div className="q-onb-home" style={{ background: bgColor, height: screenHeight ? screenHeight : "fit-content", fontFamily: defaultFont == false ? "" : "'Figtree', sans-serif" }}>
            <div
               className="q-onb-ch"
            >
                {formdata.length > 0 && !!headingScreen &&
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
                    {formdata.length > 0 &&(progressBarType==="modal2"? <ProgressBarNew />:<ProgressBar /> )}
                    <div className="q-onb-main-first" style={{fontSize: questionFontSize}}>
                    {!!design && design.length > 0 && checkDesignCriteria()
                        ? design[currentPage].map((num: number) =>
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
                                    ? !!singleChoose && singleChoose == "modal2"
                                        ? singleChoiceTwo(
                                            formdata[num - 1].options || [],
                                            formdata[num - 1]?.question || "",
                                            formdata[num - 1]?.required || false,
                                            formdata[num - 1].criteriaId || "",
                                            num - 1,
                                            formdata[num - 1]?.manualInput
                                        )
                                        : singleChoiceOne(
                                            formdata[num - 1].options || [],
                                            formdata[num - 1]?.question || "",
                                            formdata[num - 1]?.required || false,
                                            formdata[num - 1].criteriaId || "",
                                            num - 1,
                                            formdata[num - 1]?.manualInput
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
                                            ):
                                            multiChoice == "modal3" ? multiChoiceThree(
                                                formdata[num - 1].options || [],
                                                formdata[num - 1]?.question || "",
                                                formdata[num - 1]?.required || false,
                                                formdata[num - 1].criteriaId || "",
                                                num - 1
                                            )
                                            : multiChoiceOne(
                                                formdata[num - 1].options || [],
                                                formdata[num - 1]?.question || "",
                                                formdata[num - 1]?.required || false,
                                                formdata[num - 1].criteriaId || "",
                                                num - 1
                                            )
                                        : formdata[num - 1].type == 
                                            "LINK_OPEN_READ" 
                                            ? linksCriteria(
                                                formdata[num - 1].linkTitle,
                                                formdata[num - 1].criteriaId,
                                                formdata[num - 1].linkUrl,
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
                                        ? !!singleChoose && singleChoose == "modal2"
                                            ? singleChoiceTwo(
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
                    {formdata.length > 0 &&
                        (!!design && design.length > 1 &&
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
                                                design.length - 1
                                                ? setCurrentPage(currentPage + 1)
                                                : returnAnswers()
                                        }
                                        disabled={!btnFlag}
                                        style={{
                                            backgroundColor: btnColor,
                                        }}
                                    >
                                        {currentPage == design.length - 1
                                            ? (nextBtnText ? nextBtnText : "Submit and")
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
                                                design.length - 1
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

export default OnBoarding;
