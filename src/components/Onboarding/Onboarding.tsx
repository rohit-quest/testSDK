import { useEffect, useState } from "react";
import config from "../../config";
import axios from "axios";
import { useContext } from "react";
import QuestContext from '../QuestWrapper';
import "./onboarding.css"
import complete from "../../assets/images/complete.png";
import incomplete from "../../assets/images/incomplete.png";
import Cookies from "universal-cookie";


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
    headingScreen?: HeadingScreen | HeadingScreen[];
    singleChoose?: "modal1" | "modal2";
    multiChoice?:  "modal1" | "modal2";
    screenHeight?: string;
    getAnswers?: Function | undefined;
    answer?: any;
    setAnswer?: any;
    customComponents?: any;
    customComponentPositions?: number;
    inputBorder?: string;
    btnSize?: string;
    headingSize?: string;
    descSize?: string;
    inputFieldType?: { [key: string]: string };
    defaultFont?: boolean;
    userId?: string;
    token?: string;
    questId?: string;
    progress?: string[];
}

interface FormData {
    type?: string;
    question?: string;
    options?: [string];
    criteriaId?: string;
    required?: boolean;
    placeholder?: string,
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
        multiChoice,
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
    } = props;

    const [formdata, setFormdata] = useState<FormData[] | []>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [btnFlag, setButtonFlag] = useState<boolean>(false);
    const [steps, setSteps] = useState<number[]>([]);
    const { apiKey, apiSecret, entityId, featureFlags } = useContext(QuestContext.Context);
    const cookies = new Cookies()

    useEffect(() => {
        if (entityId) {
            let externalUserId = cookies.get("externalUserId");
            let questUserId = cookies.get("questUserId");
            let questUserToken = cookies.get("questUserToken");
            let personalUserId = JSON.parse(localStorage.getItem("persana-user") || "{}");
            
            const headers = {
                apiKey: apiKey,
                apisecret: apiSecret,
                userId: userId,
                token: token, // Replace with your actual token
            };

            const body = {
                externalUserId: !!personalUserId && personalUserId._id,
                entityId: entityId,
            }
            
            if (!personalUserId._id) {
                getQuestData(userId, headers)
            } else {
                if (!!externalUserId && !!questUserId && !!questUserToken && externalUserId == personalUserId._id) {
                    let header = {...headers, ...{questUserId, questUserToken}}
                    getQuestData(questUserId, header)
                    axios.post(`${config.BACKEND_URL}api/entities/${entityId}/users/${questUserId}/metrics/onboarding-view?userId=${questUserId}&questId=${questId}`, {count: 1}, {headers: header})
                } else {
                    axios.post(`${config.BACKEND_URL}api/users/external/login`, body, {headers})
                    .then((res) => {
                        let {userId, token} = res.data;
                        let header = {...headers, ...{userId, token}}

                        const date = new Date();
                        date.setHours(date.getHours() + 12)
                        cookies.set("externalUserId", personalUserId._id, {path: "/", expires: date})
                        cookies.set("questUserId", userId, {path: "/", expires: date})
                        cookies.set("questUserToken", token, {path: "/", expires: date})
                        getQuestData(userId, header)
                        axios.post(`${config.BACKEND_URL}api/entities/${entityId}/users/${userId}/metrics/onboarding-view?userId=${userId}&questId=${questId}`, {count: 1}, {headers: header})
                    })
                }

            }

            function getQuestData(userId: string, headers: object) {
                const request = `${config.BACKEND_URL}api/entities/${entityId}/quests/${questId}?userId=${userId}`;
                axios.get(request, { headers: headers }).then((res) => {
                    let response = res.data;
                    let criterias = response?.eligibilityData?.map(
                        (criteria: {
                            data: {
                                criteriaType: any;
                                metadata: { title: any; options: any, isOptional: any, placeholder: any };
                                criteriaId: string;
    
                            };
                        }) => {
                            return {
                                type: criteria?.data?.criteriaType,
                                question: criteria?.data?.metadata?.title,
                                options: criteria?.data?.metadata?.options || [],
                                criteriaId: criteria?.data?.criteriaId,
                                required: !criteria?.data?.metadata?.isOptional,
                                placeholder: criteria?.data?.metadata?.placeholder,
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
            if (formdata[currentQuestions[i] - 1].required == false) {
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
                axios.post(`${config.BACKEND_URL}api/entities/${entityId}/users/${questUserId}/metrics/onboarding-complete-page-${Number(currentPage) + 1}?userId=${questUserId}&questId=${questId}`, {count: 1}, {headers})
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
    }, [btnFlag])

    const handleUpdate = (e: any, id: string, j: string) => {
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

    const progressBar = () => {
        return (
            <div className="q-onb-progress">
                <div style={{gridTemplateColumns: progress ? `repeat(${progress.length}, 1fr)` : ""}}>
                    {
                        !!progress && !!design && progress.length == design?.length && progress.map((prog: string, i: number) => (
                            <div key={i}>
                                {
                                    steps.includes(i) == true ?
                                    <div className="q-onb-progress-comp" style={{borderColor: "#55A555"}}>
                                        <img src={complete} alt="" />
                                        <p>{prog}</p>
                                    </div>
                                    :
                                    <div className="q-onb-progress-comp" style={{borderColor: "#EAEBED"}}>
                                        <img src={incomplete} alt="" />
                                        <p>{prog}</p>
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
    ) => {
        return (
            <div style={{paddingTop: "12px", paddingBottom: "12px"}} key={criteriaId}>
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
                {
                    (!!inputFieldType && inputFieldType[criteriaId] == "textArea") ?
                        <textarea
                            id="normalInput"
                            name="normalInput"
                            placeholder={placeholder}
                            className="q-onb-input"
                            style={{ height: "120px", backgroundColor: inputBgColor, border: inputBorder }}
                            onChange={(e) => handleUpdate(e, criteriaId, "")}
                            value={answer[criteriaId]}
                        />
                        :
                        <input
                            type="text"
                            id="normalInput"
                            name="normalInput"
                            className="q-onb-input"
                            style={{ backgroundColor: inputBgColor, border: inputBorder }}
                            onChange={(e) => handleUpdate(e, criteriaId, "")}
                            value={answer[criteriaId]}
                            placeholder={placeholder}
                        />
                }
            </div>
        );
    };

    const dateInput = (
        question: string,
        required: boolean,
        criteriaId: string,
        index: number
    ) => {
        return (
            <div style={{paddingTop: "12px", paddingBottom: "12px"}} key={criteriaId}>
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
                <input
                    type="date"
                    id="dateInput"
                    name="dateInput"
                    value={answer[criteriaId]}
                    className="q-onb-input"
                    style={{ backgroundColor: inputBgColor, border: inputBorder }}
                    onChange={(e) => handleUpdate(e, criteriaId, "")}
                />
            </div>
        );
    };

    const singleChoiceTwo = (
        options: [string] | [],
        question: string,
        required: boolean,
        criteriaId: string,
        index: number
    ) => {
        return (
            <div style={{paddingTop: "12px", paddingBottom: "12px"}} key={criteriaId}>
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
                <select
                    id={criteriaId}
                    value={answer[criteriaId]}
                    onChange={(e) => handleUpdate(e, criteriaId, "")}
                    className="q-onb-singleChoiceOne"
                    style={{ backgroundColor: inputBgColor, border: inputBorder }}
                >
                    <option value="">Choose a option</option>
                    {options.map((opt, id) => (
                        <option value={opt} key={`sct${id}`}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>
        );
    };

    const singleChoiceOne = (
        options: [string] | [],
        question: string,
        required: boolean,
        criteriaId: string,
        index: number
    ) => {
        return (
            <div style={{paddingTop: "12px"}} key={criteriaId}>
                {
                    (customComponentPositions == index + 1) &&
                    <div style={{paddingBottom: "12px"}}>
                        {customComponents}
                    </div>
                }
                <p
                    className="q-onb-singleChoiceOne-lebel"
                    style={{ color: color }}
                >
                    {question} {required && "*"}
                </p>
                <div className="q-onb-singleChoiceOne-optDiv">
                    {options.map((option: string, id: number) => (
                        <div className="q-onb-singleChoiceOne-chDiv" style={{paddingBottom: "12px"}} key={id}>
                            <input
                                id={`sct${id}`}
                                type="radio"
                                value={option}
                                checked={answer[criteriaId] == option}
                                onChange={(e) =>
                                    handleUpdate(e, criteriaId, "radio")
                                }
                                name="default-radio"
                                className="q-onb-singleChoiceOne-inp"
                            />
                            <label
                                htmlFor={`sct${id}`}
                                className="q-onb-singleChoiceOne-lebel3"
                            >
                                {option}
                            </label>
                        </div>
                    ))}
                </div>
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
            <div style={{paddingTop: "12px"}} key={criteriaId}>
                {
                    (customComponentPositions == index + 1) &&
                    <div style={{paddingBottom: "12px"}}>
                        {customComponents}
                    </div>
                }
                <p
                    className="q-onb-singleChoiceOne-lebel"
                    style={{ color: color }}
                >
                    {question} {required && "*"}
                </p>
                <div className="q-onb-singleChoiceOne-optDiv" style={{paddingBottom: "12px"}}>
                    {options.map((option: string, id: number) => (
                        <div className="q-onb-singleChoiceOne-chDiv" key={id}>
                            <input
                                id={`mct${id}`}
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
                                htmlFor={`mct${id}`}
                                className="q-onb-singleChoiceOne-label"
                            >
                                {option}
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
            <div style={{paddingTop: "12px", paddingBottom: "12px"}} key={criteriaId}>
                {
                    (customComponentPositions == index + 1) &&
                    <div style={{paddingBottom: "12px"}}>
                        {customComponents}
                    </div>
                }
                <p
                    className="q-onb-lebels"
                    style={{ color: color }}
                >
                    {question} {required && "*"}
                </p>
                <ul className="q-onb-miltiChoiceOne-ul" style={{paddingLeft: "0"}}>
                    {options.map((option: string, id: number) => (
                        <li key={id} style={{listStyleType: "none"}}>
                            <input
                                type="checkbox"
                                id={`mct${id}`}
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
                                htmlFor={`mct${id}`}
                                className="q-onb-miltiChoiceOne-lebel"
                            >
                                <div style={{display: "block"}}>
                                    <div style={{fontSize: "14px"}}>{option}</div>
                                </div>
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    function checkDesignCriteria() {
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
        let ansArr: Answer[] = formdata.map((ans: object) => {
            return {
                question: ans?.question,
                answer: answer[ans?.criteriaId] || "",
            };
        });
        
        
        let criterias = Object.keys(answer).map((key: string) => {
            return {
                criteriaId: key,
                answer: typeof(answer[key]) == "object" ? answer[key] : [answer[key]]
            }
        })
        
        let questUserId = cookies.get("questUserId");
        let questUserToken = cookies.get("questUserToken");

        let headers = {
            apikey: apiKey,
            apisecret: apiSecret,
            userId: questUserId,
            token: questUserToken
        }

        getAnswers(ansArr);
        
        axios.post(`${config.BACKEND_URL}api/entities/${entityId}/quests/${questId}/verify-all?userId=${questUserId}`, {criterias}, {headers})

        axios.post(`${config.BACKEND_URL}api/entities/${entityId}/users/${questUserId}/metrics/onboarding-complete?userId=${questUserId}&questId=${questId}`, {count: 1}, {headers})
        
    }
    
    if (featureFlags[config.FLAG_CONSTRAINTS.OnboardingFlag]?.isEnabled == false) {
        return (<div></div>)
    }

    return (
        <div className="q-onb-home" style={{ background: bgColor, height: screenHeight ? screenHeight : "fit-content", fontFamily: defaultFont == false ? "" : "'Hanken Grotesk', sans-serif" }}>
            <div
               className="q-onb-ch"
            >
                {formdata.length > 0 && progressBar()}
                {formdata.length > 0 && !!headingScreen &&
                    (typeof headingScreen == "object" && !!headingScreen.name ? (
                        <div>
                            <h3 className="q-onb-main-h3" style={{ fontSize: headingSize }}>
                                {headingScreen?.name}
                            </h3>
                            <h4 className="q-onb-main-h4" style={{ fontSize: descSize }}>{headingScreen?.desc}</h4>
                        </div>
                    ) : !!headingScreen[currentPage] ? (
                        <div>
                            <h3 className="q-onb-main-h3" style={{ fontSize: headingSize }}>
                                {headingScreen[currentPage]?.name}
                            </h3>
                            <h4 className="q-onb-main-h4" style={{ fontSize: descSize }}>
                                {headingScreen[currentPage]?.desc}
                            </h4>
                        </div>
                    ) : (
                        <div>
                            <h3 className="q-onb-main-h3" style={{ fontSize: headingSize }}>
                                {headingScreen[0]?.name}
                            </h3>
                            <h4 className="q-onb-main-h4" style={{ fontSize: descSize }}>
                                {headingScreen[0]?.desc}
                            </h4>
                        </div>
                    ))}
                <div className="q-onb-main-first">
                    {!!design && design.length > 0 && checkDesignCriteria()
                        ? design[currentPage].map((num: number) =>
                        (formdata[num - 1].type == "USER_INPUT_TEXT"
                            ? normalInput(
                                formdata[num - 1]?.question || "",
                                formdata[num - 1]?.required || false,
                                formdata[num - 1].criteriaId || "",
                                num - 1,
                                formdata[num - 1]?.placeholder || formdata[num - 1]?.question || "",
                            )
                            : formdata[num - 1].type == "USER_INPUT_DATE"
                                ? dateInput(
                                    formdata[num - 1]?.question || "",
                                    formdata[num - 1]?.required || false,
                                    formdata[num - 1].criteriaId || "",
                                    num - 1
                                )
                                : formdata[num - 1].type ==
                                    "USER_INPUT_SINGLE_CHOICE"
                                    ? !!singleChoose && singleChoose == "modal2"
                                        ? singleChoiceTwo(
                                            formdata[num - 1].options || [],
                                            formdata[num - 1]?.question || "",
                                            formdata[num - 1]?.required || false,
                                            formdata[num - 1].criteriaId || "",
                                            num - 1
                                        )
                                        : singleChoiceOne(
                                            formdata[num - 1].options || [],
                                            formdata[num - 1]?.question || "",
                                            formdata[num - 1]?.required || false,
                                            formdata[num - 1].criteriaId || "",
                                            num - 1
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
                                            )
                                            : multiChoiceOne(
                                                formdata[num - 1].options || [],
                                                formdata[num - 1]?.question || "",
                                                formdata[num - 1]?.required || false,
                                                formdata[num - 1].criteriaId || "",
                                                num - 1
                                            )
                                        : null)
                        )
                        : formdata?.map((data, index) =>
                            data.type == "USER_INPUT_TEXT"
                                ? normalInput(
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
                                        index
                                    )
                                    : data.type == "USER_INPUT_SINGLE_CHOICE"
                                        ? !!singleChoose && singleChoose == "modal2"
                                            ? singleChoiceTwo(
                                                data.options || [],
                                                data?.question || "",
                                                data?.required || false,
                                                data.criteriaId || "",
                                                index
                                            )
                                            : singleChoiceOne(
                                                data.options || [],
                                                data?.question || "",
                                                data?.required || false,
                                                data.criteriaId || "",
                                                index
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
                        (!!design && design.length > 0 &&
                            checkDesignCriteria() ? (
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
                                        border: `2px solid ${btnColor}`
                                    }}
                                >
                                    {" "}
                                    Previous
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
                                        ? "Continue"
                                        : "Next"}
                                </button>
                            </div>
                        ) : (
                            <div style={{paddingTop: "12px"}}>
                                <button
                                    className="q-onb-main-btn3"
                                    onClick={returnAnswers}
                                    disabled={!btnFlag}
                                    style={{
                                        backgroundColor: btnColor,
                                        width: btnSize
                                    }}
                                >
                                    Continue
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default OnBoarding;
