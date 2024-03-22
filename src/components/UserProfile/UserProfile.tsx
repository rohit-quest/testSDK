import { CSSProperties, useEffect, useRef, useState } from "react";
import config from "../../config";
import axios from "axios";
import { useContext } from "react";
import QuestContext from '../QuestWrapper';
import "./userProfile.css";
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
    getAnswers: Function | undefined;
    answer: any;
    setAnswer: React.Dispatch<React.SetStateAction<any>>;
    customComponents?: React.JSX.Element;
    customComponentPositions?: number;
    loadingTracker?: boolean;
    setLoading?: Function;
    styleConfig?: {
        Form?: CSSProperties,
        Input?: CSSProperties,
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
        Footer? : CSSProperties
    }
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

function UserProfile(props: QuestLoginProps) {
    const {
        getAnswers,
        answer,
        setAnswer,
        customComponents,
        customComponentPositions,
        userId,
        token,
        questId,
        loadingTracker,
        setLoading=()=>{},
        uniqueUserId,
        uniqueEmailId,
        styleConfig,
    } = props;

    // let { design =[] } = props;
    const [formdata, setFormdata] = useState<FormData[] | []>([]);
    const { apiKey, apiSecret, entityId, apiType, themeConfig } = useContext(QuestContext.Context);
    const cookies = new Cookies()

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
            

            async function getQuestData(userId: string, headers: object) {
                (loadingTracker && setLoading(true));
                const request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}/summary?userId=${userId}&singleUserReport=true`;
                await axios.get(request, { headers: headers }).then((res: any) => {
                    let response = res.data.summary;
                    console.log(response)
                    let criterias = response?.quest?.eligibilityData?.map(
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
                    let userAnswers = !!response?.answers?.length ? response?.answers[0].answers : [];
                    const getAns = (criteriaId: string) => {
                        let ans = userAnswers.filter((ans: any) => ans.criteriaId == criteriaId )
                        console.log(ans)
                        if (ans.length > 0) {
                            return ans[0].userAnswer;
                        } else {
                            return false;
                        }
                    }
                    criterias.forEach((criteria: any) => {
                        if (criteria.type == "USER_INPUT_MULTI_CHOICE") {
                            if (!answer[criteria.criteriaId]) {
                                ansArray[criteria.criteriaId] = getAns(criteria.criteriaId) || [];
                            }
                            return;
                        } else {
                            if (!answer[criteria.criteriaId]) {
                                ansArray[criteria.criteriaId] = getAns(criteria.criteriaId) ? getAns(criteria.criteriaId)[0] : "" || "";
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
                    {`${question} ${!!required && "*"}`}
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
                    {`${question} ${!!required && "*"}`}
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
                    {`${question} ${!!required && "*"}`}
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
        singleChoose?: "modal1" | "modal2" | "modal3"
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
                    {`${question} ${!!required && "*"}`}
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
                    {`${question} ${!!required && "*"}`}
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
    }
    


    return (
        formdata.length > 0 && (
        <div className="q-prof_home" style={{
             background: styleConfig?.Form?.backgroundColor || themeConfig?.backgroundColor || "#fff", height: styleConfig?.Form?.height || "auto", fontFamily: themeConfig.fontFamily || "'Figtree', sans-serif" , ...styleConfig?.Form
             }}>
            <div
               className="q-prof_ch"
            >
                {formdata.length > 0 &&    
                    <div className="q-prof_main-first">
                    {formdata?.map((data, index) =>
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
                            : data.type == "USER_INPUT_DATE"
                                ? dateInput(
                                    data?.question || "",
                                    data?.required || false,
                                    data.criteriaId || "",
                                    index,
                                    data?.placeholder || data?.question || "",
                                )
                                : data.type == "USER_INPUT_SINGLE_CHOICE"
                                    ? singleChoiceTwo(
                                            data.options || [],
                                            data?.question || "",
                                            data?.required || false,
                                            data.criteriaId || "",
                                            index,
                                            data?.manualInput,
                                            "modal3"
                                        )
                                    : null
                        )}
                    </div>
                }
                <div className="q-prof_main-second">
                    {
                        formdata?.map((data, index) => (
                            data.type == "USER_INPUT_MULTI_CHOICE"
                                ? multiChoiceTwo(
                                    data.options || [],
                                    data?.question || "",
                                    data?.required || false,
                                    data.criteriaId || "",
                                    index
                                )
                                : null
                        ))
                    }
                    {
                        formdata?.map((data, index) => (
                            data.type == "USER_INPUT_TEXTAREA"
                                ? textAreaInput(
                                    data?.question || "",
                                    data?.required || false,
                                    data.criteriaId || "",
                                    index,
                                    data?.placeholder || data?.question || "",
                                )
                                : null
                        ))
                    }
                    {formdata.length > 0 &&
                        (
                            <div>
                                <PrimaryButton
                                    className="q-prof_main-btn3"
                                    onClick={returnAnswers}
                                    style={{
                                        border :styleConfig?.SecondaryButton?.border || '1.5px solid #afafaf',
                                        background: styleConfig?.PrimaryButton?.background || themeConfig?.buttonColor,
                                        ...styleConfig?.PrimaryButton
                                    }}
                                >
                                    {"Update Profile"}
                                </PrimaryButton>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
        )
    );
}

export default UserProfile;
