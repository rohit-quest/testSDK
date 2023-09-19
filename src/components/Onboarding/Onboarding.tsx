import { useEffect, useState } from "react";
import config from "../../config";
import axios from "axios";
import { useContext } from "react";
import QuestContext from '../QuestWrapper';
import "./onboarding.css"

interface QuestLoginProps {
    design?: any;
    color?: string;
    bgColor?: string;
    btnColor?: string;
    inputBgColor?: string;
    headingScreen?: any;
    singleChoose?: string;
    multiChoice?: string;
    screenHeight?: string;
    getAnswers?: Function;
    answer?: any;
    setAnswer?: any;
    customComponents?: any;
    customComponentPositions?: number;
    inputBorder?: string;
    btnSize?: string;
    headingSize?: string;
    descSize?: string;
    inputFieldType?: object;
    defaultFont?: boolean;
    userId?: string;
    token?: string;
    questId?: string;
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

    const [onboardingData, setOnboardingData] = useState<{}>({
        design: design || [],
        color: color || "",
        bgColor: bgColor || "",
        btnColor: btnColor || "",
        inputBgColor: inputBgColor || "",
        singleChoose: singleChoose || "",
        multiChoice: multiChoice || "",
        inputBorder: inputBorder || "",
        btnSize: btnSize || "",
        headingSize: headingSize || "",
        descSize: descSize || "",
        screenHeight: screenHeight || "",
    });

    const [heading, setHeading] = useState<any>(headingScreen || {});
    const [formdata, setFormdata] = useState<FormData[] | []>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    // const [answer, setAnswer] = useState<any>({});
    const [btnFlag, setButtonFlag] = useState<boolean>(false);
    const { apiKey, apiSecret, entityId, featureFlags } = useContext(QuestContext.Context);

    useEffect(() => {
        if (entityId) {
            const headers = {
                apiKey: apiKey,
                apisecret: apiSecret,
                userId: userId,
                token: token, // Replace with your actual token
            };
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
    }, []);

    useEffect(() => {
        let currentQuestions: any =
            onboardingData?.design.length > 0 && checkDesignCriteria()
                ? onboardingData?.design[currentPage]
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
            setButtonFlag(true);
        } else {
            setButtonFlag(false);
        }
    }, [answer, formdata, currentPage]);

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

    // const progressBar = () => {
    //     return (
    //         <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
    //             <div
    //                 className="bg-blue-600 h-2.5 rounded-full"
    //                 style={{ width: "45%" }}
    //             ></div>
    //         </div>
    //     );
    // };

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
                    style={{ color: onboardingData?.color }}
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
                            style={{ height: "120px", backgroundColor: onboardingData?.inputBgColor, border: onboardingData?.inputBorder }}
                            onChange={(e) => handleUpdate(e, criteriaId, "")}
                            value={answer[criteriaId]}
                        />
                        :
                        <input
                            type="text"
                            id="normalInput"
                            name="normalInput"
                            className="q-onb-input"
                            style={{ backgroundColor: onboardingData?.inputBgColor, border: onboardingData?.inputBorder }}
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
                    style={{ color: onboardingData?.color }}
                >
                    {question} {required && "*"}
                </label>
                <input
                    type="date"
                    id="dateInput"
                    name="dateInput"
                    value={answer[criteriaId]}
                    className="q-onb-input"
                    style={{ backgroundColor: onboardingData?.inputBgColor, border: onboardingData?.inputBorder }}
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
                    style={{ color: onboardingData?.color }}
                >
                    {question} {required && "*"}
                </label>
                <select
                    id={criteriaId}
                    value={answer[criteriaId]}
                    onChange={(e) => handleUpdate(e, criteriaId, "")}
                    className="q-onb-singleChoiceOne"
                    style={{ backgroundColor: onboardingData?.inputBgColor, border: onboardingData?.inputBorder }}
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
                    style={{ color: onboardingData?.color }}
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
                    style={{ color: onboardingData?.color }}
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
                    style={{ color: onboardingData?.color }}
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

        for (let i = 0; i < onboardingData?.design?.length; i++) {
            if (
                typeof onboardingData?.design[i] != "object" &&
                onboardingData?.design[i][0] == null
            ) {
                return false;
            }
            for (let j = 0; j < onboardingData?.design[i].length; j++) {
                if (!arr.includes(onboardingData?.design[i][j])) {
                    arr.push(onboardingData?.design[i][j]);
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
        getAnswers(ansArr);
    }
    
    if (featureFlags[config.FLAG_CONSTRAINTS.OnboardingFlag]?.isEnabled == false) {
        return (<div></div>)
    }

    return (
        <div className="q-onb-home" style={{ background: onboardingData?.bgColor, height: onboardingData?.screenHeight ? onboardingData?.screenHeight : "fit-content", fontFamily: defaultFont == false ? "" : "'Hanken Grotesk', sans-serif" }}>
            <div
               className="q-onb-ch"
            >
                {formdata.length > 0 &&
                    (typeof heading == "object" && !!heading.name ? (
                        <div>
                            <h3 className="q-onb-main-h3" style={{ fontSize: onboardingData?.headingSize }}>
                                {heading?.name}
                            </h3>
                            <h4 className="q-onb-main-h4" style={{ fontSize: onboardingData?.descSize }}>{heading?.desc}</h4>
                        </div>
                    ) : !!heading[currentPage] ? (
                        <div>
                            <h3 className="q-onb-main-h3" style={{ fontSize: onboardingData?.headingSize }}>
                                {heading[currentPage]?.name}
                            </h3>
                            <h4 className="q-onb-main-h4" style={{ fontSize: onboardingData?.descSize }}>
                                {heading[currentPage]?.desc}
                            </h4>
                        </div>
                    ) : (
                        <div>
                            <h3 className="q-onb-main-h3" style={{ fontSize: onboardingData?.headingSize }}>
                                {heading[0]?.name}
                            </h3>
                            <h4 className="q-onb-main-h4" style={{ fontSize: onboardingData?.descSize }}>
                                {heading[0]?.desc}
                            </h4>
                        </div>
                    ))}
                <div className="q-onb-main-first">
                    {onboardingData?.design.length > 0 && checkDesignCriteria()
                        ? onboardingData?.design[currentPage].map((num: number, index: number) =>
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
                        (onboardingData?.design.length > 0 &&
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
                                        border: `2px solid ${onboardingData?.btnColor}`
                                    }}
                                >
                                    {" "}
                                    Previous
                                </button>
                                <button
                                    className="q-onb-main-btn2"
                                    onClick={() =>
                                        currentPage !=
                                            onboardingData.design.length - 1
                                            ? setCurrentPage(currentPage + 1)
                                            : returnAnswers()
                                    }
                                    disabled={!btnFlag}
                                    style={{
                                        backgroundColor: onboardingData?.btnColor,
                                    }}
                                >
                                    {currentPage == onboardingData.design.length - 1
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
                                        backgroundColor: onboardingData?.btnColor,
                                        width: onboardingData?.btnSize
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
