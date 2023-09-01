import { useEffect, useState } from "react";
import config from "../config";
import axios from "axios";

interface QuestLoginProps {
    design?: any;
    color?: string;
    bgColor?: string;
    btnColor?: string;
    inputBgColor?: string;
    headingScreen?: any;
    singleChoose?: string;
    multiChoice?: string;
    entityId?: string;
    userId?: string;
    token?: string;
    questId?: string;
    answers?: Function
}

interface FormData {
    type?: string;
    question?: string;
    options?: [string];
    criteriaId?: string;
    required?: boolean;
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
        btnColor,
        headingScreen,
        singleChoose,
        multiChoice,
        answers,
        entityId,
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
    });

    const [heading, setHeading] = useState<any>(headingScreen || {});
    const [formdata, setFormdata] = useState<FormData[] | []>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [answer, setAnswer] = useState<any>({});
    const [btnFlag, setButtonFlag] = useState<boolean>(false);

    useEffect(() => {
        if (entityId) {
            const headers = {
                apiKey: config.QUEST_PROTOCOL_API_KEY,
                apisecret: config.QUEST_PROTOCOL_API_SECRET,
                userId: userId,
                token: token, // Replace with your actual token
            };
            const request = `https://staging.questprotocol.xyz/api/entities/${entityId}/quests/${questId}?userId=${userId}`;
            axios.get(request, { headers: headers }).then((res) => {
                let response = res.data;
                let criterias = response?.eligibilityData?.map(
                    (criteria: {
                        data: {
                            criteriaType: any;
                            metadata: { title: any; options: any };
                            criteriaId: string;
                            isOptional: boolean;
                        };
                    }) => {
                        return {
                            type: criteria?.data?.criteriaType,
                            question: criteria?.data?.metadata?.title,
                            options: criteria?.data?.metadata?.options || [],
                            criteriaId: criteria?.data?.criteriaId,
                            required: !criteria?.data?.isOptional,
                        };
                    }
                );
                setFormdata([...criterias]);
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

    const progressBar = () => {
        return (
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: "45%" }}
                ></div>
            </div>
        );
    };

    const normalInput = (
        question: string,
        required: boolean,
        criteriaId: string
    ) => {
        return (
            <div className="py-3" key={criteriaId}>
                <label
                    className="block mb-1 font-medium"
                    htmlFor="normalInput"
                    style={{ color: onboardingData?.color }}
                >
                    {question} {required && "*"}
                </label>
                <input
                    type="text"
                    id="normalInput"
                    name="normalInput"
                    className="bg-gray-100 border-none outline-none text-sm rounded focus:ring-blue-500 focus:ring-1 w-full p-3"
                    placeholder={question}
                    style={{ backgroundColor: onboardingData?.inputBgColor }}
                    onChange={(e) => handleUpdate(e, criteriaId, "")}
                    value={answer[criteriaId]}
                />
            </div>
        );
    };

    const dateInput = (
        question: string,
        required: boolean,
        criteriaId: string
    ) => {
        return (
            <div className="py-3" key={criteriaId}>
                <label
                    className="block mb-1 font-medium"
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
                    className="bg-gray-100 border-none outline-none text-sm rounded focus:ring-blue-500 focus:ring-1 w-full p-3"
                    style={{ backgroundColor: onboardingData?.inputBgColor }}
                    onChange={(e) => handleUpdate(e, criteriaId, "")}
                />
            </div>
        );
    };

    const singleChoiceOne = (
        options: [string] | [],
        question: string,
        required: boolean,
        criteriaId: string
    ) => {
        return (
            <div className="py-3" key={criteriaId}>
                <label
                    htmlFor={criteriaId}
                    className="block mb-1 font-medium"
                    style={{ color: onboardingData?.color }}
                >
                    {question} {required && "*"}
                </label>
                <select
                    id={criteriaId}
                    value={answer[criteriaId]}
                    onChange={(e) => handleUpdate(e, criteriaId, "")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-none focus:ring-1 block w-full p-3"
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

    const singleChoiceTwo = (
        options: [string] | [],
        question: string,
        required: boolean,
        criteriaId: string
    ) => {
        return (
            <div className="pt-3" key={criteriaId}>
                <p
                    className="block font-medium mb-3"
                    style={{ color: onboardingData?.color }}
                >
                    {question} {required && "*"}
                </p>
                <div className="flex gap-x-12 gap-y-2 flex-wrap">
                    {options.map((option: string, id: number) => (
                        <div className="flex items-center mb-3" key={id}>
                            <input
                                id={`sct${id}`}
                                type="radio"
                                value={option}
                                checked={answer[criteriaId] == option}
                                onChange={(e) =>
                                    handleUpdate(e, criteriaId, "radio")
                                }
                                name="default-radio"
                                className="h-4 w-4 accent-black  bg-grey-700 text-red-500 rounded cursor-pointer"
                            />
                            <label
                                htmlFor={`sct${id}`}
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-500"
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
        criteriaId: string
    ) => {
        return (
            <div className="pt-3" key={criteriaId}>
                <p
                    className="block font-medium mb-3"
                    style={{ color: onboardingData?.color }}
                >
                    {question} {required && "*"}
                </p>
                <div className="flex gap-x-12 gap-y-2 flex-wrap mb-3">
                    {options.map((option: string, id: number) => (
                        <div className="flex items-center" key={id}>
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
                                className="h-4 w-4 accent-black  bg-grey-700 text-red-500 rounded cursor-pointer"
                            />
                            <label
                                htmlFor={`mct${id}`}
                                className="ml-2 text-sm font-medium text-black"
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
        criteriaId: string
    ) => {
        return (
            <div className="py-3" key={criteriaId}>
                <p
                    className="block mb-1 font-medium"
                    style={{ color: onboardingData?.color }}
                >
                    {question} {required && "*"}
                </p>
                <ul className="flex flex-wrap w-full gap-3">
                    {options.map((option: string, id: number) => (
                        <li key={id}>
                            <input
                                type="checkbox"
                                id={`mct${id}`}
                                value={option}
                                checked={
                                    !!answer[criteriaId] &&
                                    answer[criteriaId].includes(option)
                                }
                                className="hidden peer"
                                onChange={(e) =>
                                    handleUpdate(e, criteriaId, "check")
                                }
                            />
                            <label
                                htmlFor={`mct${id}`}
                                className="inline-flex items-center justify-between px-3 py-1 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-black peer-checked:bg-gray-300 peer-checked:font-bold peer-checked:text-black hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50"
                            >
                                <div className="block">
                                    <div className="text-sm">{option}</div>
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
        answers(ansArr)
    }

    return (
        <div
            style={{ background: onboardingData?.bgColor }}
            className="min-h-screen"
        >
            {formdata.length > 0 &&
                (typeof heading == "object" && !!heading.name ? (
                    <div>
                        <h3 className="w-100 text-center pt-8 text-4xl font-bold">
                            {heading?.name}
                        </h3>
                        <h4 className="w-100 text-center">{heading?.desc}</h4>
                    </div>
                ) : !!heading[currentPage] ? (
                    <div>
                        <h3 className="w-100 text-center pt-8 text-4xl font-bold">
                            {heading[currentPage]?.name}
                        </h3>
                        <h4 className="w-100 text-center">
                            {heading[currentPage]?.desc}
                        </h4>
                    </div>
                ) : (
                    <div>
                        <h3 className="w-100 text-center pt-8 text-4xl font-bold">
                            {heading[0]?.name}
                        </h3>
                        <h4 className="w-100 text-center">
                            {heading[0]?.desc}
                        </h4>
                    </div>
                ))}
            <div className="p-8 max-w-screen-md m-auto">
                {onboardingData?.design.length > 0 && checkDesignCriteria()
                    ? onboardingData?.design[currentPage].map((num: number) =>
                          formdata[num - 1].type == "USER_INPUT_TEXT"
                              ? normalInput(
                                    formdata[num - 1]?.question || "",
                                    formdata[num - 1]?.required,
                                    formdata[num - 1].criteriaId || ""
                                )
                              : formdata[num - 1].type == "USER_INPUT_DATE"
                              ? dateInput(
                                    formdata[num - 1]?.question || "",
                                    formdata[num - 1]?.required,
                                    formdata[num - 1].criteriaId || ""
                                )
                              : formdata[num - 1].type ==
                                "USER_INPUT_SINGLE_CHOICE"
                              ? !!singleChoose && singleChoose == "modal2"
                                  ? singleChoiceTwo(
                                        formdata[num - 1].options || [],
                                        formdata[num - 1]?.question || "",
                                        formdata[num - 1]?.required,
                                        formdata[num - 1].criteriaId || ""
                                    )
                                  : singleChoiceOne(
                                        formdata[num - 1].options || [],
                                        formdata[num - 1]?.question || "",
                                        formdata[num - 1]?.required,
                                        formdata[num - 1].criteriaId || ""
                                    )
                              : formdata[num - 1].type ==
                                "USER_INPUT_MULTI_CHOICE"
                              ? !!multiChoice && multiChoice == "modal2"
                                  ? multiChoiceTwo(
                                        formdata[num - 1].options || [],
                                        formdata[num - 1]?.question || "",
                                        formdata[num - 1]?.required,
                                        formdata[num - 1].criteriaId || ""
                                    )
                                  : multiChoiceOne(
                                        formdata[num - 1].options || [],
                                        formdata[num - 1]?.question || "",
                                        formdata[num - 1]?.required,
                                        formdata[num - 1].criteriaId || ""
                                    )
                              : null
                      )
                    : formdata?.map((data) =>
                          data.type == "USER_INPUT_TEXT"
                              ? normalInput(
                                    data?.question || "",
                                    data?.required,
                                    data.criteriaId || ""
                                )
                              : data.type == "USER_INPUT_DATE"
                              ? dateInput(
                                    data?.question || "",
                                    data?.required,
                                    data.criteriaId || ""
                                )
                              : data.type == "USER_INPUT_SINGLE_CHOICE"
                              ? !!singleChoose && singleChoose == "modal2"
                                  ? singleChoiceTwo(
                                        data.options || [],
                                        data?.question || "",
                                        data?.required,
                                        data.criteriaId || ""
                                    )
                                  : singleChoiceOne(
                                        data.options || [],
                                        data?.question || "",
                                        data?.required,
                                        data.criteriaId || ""
                                    )
                              : data.type == "USER_INPUT_MULTI_CHOICE"
                              ? !!multiChoice && multiChoice == "modal2"
                                  ? multiChoiceTwo(
                                        data.options || [],
                                        data?.question || "",
                                        data?.required,
                                        data.criteriaId || ""
                                    )
                                  : multiChoiceOne(
                                        data.options || [],
                                        data?.question || "",
                                        data?.required,
                                        data.criteriaId || ""
                                    )
                              : null
                      )}
                {formdata.length > 0 &&
                    (onboardingData?.design.length > 0 &&
                    checkDesignCriteria() ? (
                        <div className="flex justify-between pt-3">
                            <button
                                className="text-black border-2 border-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-4 py-2 mr-2 mb-2 md:px-10"
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
                                Previous
                            </button>
                            <button
                                className="text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-lg px-4 py-2 mb-2 md:px-10"
                                onClick={() =>
                                    currentPage !=
                                    onboardingData.design.length - 1
                                        ? setCurrentPage(currentPage + 1)
                                        : returnAnswers()
                                }
                                disabled={!btnFlag}
                                style={{backgroundColor: onboardingData?.btnColor}}
                            >
                                {currentPage == onboardingData.design.length - 1
                                    ? "Continue"
                                    : "Next"}
                            </button>
                        </div>
                    ) : (
                        <div className="pt-3">
                            <button
                                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xl px-5 py-2.5 mr-2 mb-2 w-full"
                                onClick={returnAnswers}
                                disabled={!btnFlag}
                                style={{backgroundColor: onboardingData?.btnColor}}
                            >
                                Continue
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default OnBoarding;
