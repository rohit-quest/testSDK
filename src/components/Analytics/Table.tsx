import React, { FC, useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import config from "../../config";
import QuestContext from "../QuestWrapper";
import "./analytics.css";

interface Table {
    userId: string;
    token: string;
    questId: string;
    headingBgColor: string;
    headingTextColor: string;
    horizontalBorder: boolean;
    bodyBgColor: string;
    bodyTextColor: string;
    headingTooltip: boolean;
    bodyTooltip: boolean;
    hideQuestion: boolean;
    showAvatar: boolean;
    tableWidth: string;
    hideAnswers: boolean;
}

type User = {
    avatar: string;
    userAnswers: Record<string, any>;
    userName: string;
};

type UsersDataArray = { [key: string]: User };

const Table: FC<Table> = ({
    userId,
    token,
    questId,
    headingBgColor,
    headingTextColor,
    horizontalBorder,
    bodyBgColor,
    bodyTextColor,
    headingTooltip,
    bodyTooltip,
    hideQuestion,
    showAvatar,
    tableWidth,
    hideAnswers,
}) => {
    const [questionData, setQuestionData] = useState<string[]>([]);
    const [answerData, setAnswerData] = useState<UsersDataArray | any>({});
    const { apiKey, apiSecret, entityId } = useContext(QuestContext.Context);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [hoveredQuestion, setHoveredQuestion] = useState("");
    const [fullData, setFullData] = useState<Boolean>(false);
    const [loading, setLoading] = useState<Boolean>(false)

    useEffect(() => {
        setLoading(true);
        const headers = {
            apiKey: apiKey,
            apisecret: apiSecret,
            userId: userId,
            token: token,
        };
        axios(
            `${config.BACKEND_URL}api/entities/${entityId}/quests/${questId}/summary?userId=${userId}`,
            { headers }
        ).then((res: any) => {
            let userAnswers = res?.data?.summary?.answers;
            let questions = [];
            let answers: UsersDataArray = {};
            for (let i = 0; i < userAnswers.length; i++) {
                questions.push(userAnswers[i].question);
                let ans = userAnswers[i]?.answers;
                for (let j = 0; j < ans?.length; j++) {
                    if (answers[ans[j].userId]) {
                        let user = answers[ans[j].userId];
                        user.userAnswers[`q${i}`] = ans[j].userAnswer;
                    } else {
                        answers[ans[j].userId] = {
                            userName: ans[j].name,
                            avatar: ans[j].imageUrl,
                            userAnswers: {
                                [`q${i}`]: ans[j].userAnswer,
                            },
                        };
                    }
                }
            }
            setQuestionData([...questions]);
            setAnswerData({ ...answers });
            setLoading(false);
        });
    }, []);

    const handleMouseEnter = useCallback(
        (e: any, question: string) => {
            setTooltipPosition({
                ...tooltipPosition,
                x: e.clientX,
                y: e.clientY,
            });
            setHoveredQuestion(question);
        },
        [tooltipPosition]
    );

    const handleMouseLeave = useCallback(
        (e) => {
            setTooltipPosition({
                ...tooltipPosition,
                x: e.clientX,
                y: e.clientY,
            });
            setHoveredQuestion("");
        },
        [tooltipPosition]
    );

    return (loading == false) ? (
        <div
            className="q-ana-home q-tab-main"
            style={{ width: tableWidth ? tableWidth : "100%" }}
        >
            <table className="q-tab-table">
                <thead
                    className="q-tab-thead"
                    style={{
                        backgroundColor: headingBgColor,
                        color: headingTextColor,
                    }}
                >
                    <tr>
                        <th
                            scope="col"
                            style={{
                                borderColor: bodyBgColor
                                    ? bodyBgColor
                                    : "white",
                                padding: "0.5rem",
                                borderLeft: horizontalBorder
                                    ? "2px solid"
                                    : "0px",
                                borderRight: horizontalBorder
                                    ? "2px solid"
                                    : "0px",
                                boxSizing: "content-box"
                            }}
                        >
                            Users
                        </th>
                        {questionData.map((question: string, i: number) => (
                            <th
                                scope="col"
                                className={`q-tab-thead-th`}
                                style={{
                                    borderColor: bodyBgColor
                                        ? bodyBgColor
                                        : "white",
                                    borderRight: horizontalBorder
                                        ? "2px solid"
                                        : "0px",
                                }}
                                key={i}
                                onMouseEnter={(e) =>
                                    !!headingTooltip &&
                                    handleMouseEnter(e, question)
                                }
                                onMouseLeave={handleMouseLeave}
                            >
                                {hideQuestion ? `q${i + 1}` : question}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(answerData).map(
                        (datas, i: number) =>
                            (fullData == false ? i < 10 : true) && (
                                <tr
                                    style={{
                                        borderBottom: "2px solid",
                                        borderColor: headingBgColor
                                            ? headingBgColor
                                            : "#D1D5DB",
                                        backgroundColor: bodyBgColor,
                                    }}
                                >
                                    <td
                                        scope="row"
                                        className={`q-tab-tbody-th`}
                                        style={{
                                            borderColor: headingBgColor
                                                ? headingBgColor
                                                : "",
                                            borderLeft: horizontalBorder
                                                ? "2px solid"
                                                : "0px",
                                            borderRight: horizontalBorder
                                                ? "2px solid"
                                                : "0px",
                                        }}
                                        onMouseEnter={(e) =>
                                            !!bodyTooltip &&
                                            handleMouseEnter(
                                                e,
                                                answerData[datas].userName
                                            )
                                        }
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        {!!showAvatar && (
                                            <img
                                                src={
                                                    "https://pin.questprotocol.xyz/ipfs/" +
                                                    answerData[datas].avatar
                                                }
                                                className="q-tab-tbody-img"
                                                alt=""
                                            />
                                        )}
                                        <div className="">
                                            {answerData[datas].userName}
                                        </div>
                                    </td>
                                    {questionData.map(
                                        (question: string, i: number) =>
                                            !!answerData[datas].userAnswers[
                                                `q${i}`
                                            ] ? (
                                                <td
                                                    className={`q-tab-tbody-td`}
                                                    style={{
                                                        borderColor:
                                                            headingBgColor
                                                                ? headingBgColor
                                                                : "",
                                                        color: bodyTextColor,
                                                        borderRight:
                                                            horizontalBorder
                                                                ? `2px solid ${headingBgColor
                                                                    ? headingBgColor
                                                                    : ""
                                                                }`
                                                                : "0px",
                                                        whiteSpace:
                                                            !!hideAnswers
                                                                ? "nowrap"
                                                                : "normal",
                                                        textOverflow:
                                                            !!hideAnswers
                                                                ? "ellipsis"
                                                                : "",
                                                    }}
                                                    onMouseEnter={(e) =>
                                                        !!bodyTooltip &&
                                                        handleMouseEnter(
                                                            e,
                                                            answerData[datas]
                                                                .userAnswers[
                                                            `q${i}`
                                                            ]
                                                        )
                                                    }
                                                    onMouseLeave={
                                                        handleMouseLeave
                                                    }
                                                >
                                                    {
                                                        answerData[datas]
                                                            .userAnswers[
                                                        `q${i}`
                                                        ]
                                                    }
                                                </td>
                                            ) : (
                                                <td
                                                    className={`q-tab-tbody-td`}
                                                    style={{
                                                        borderColor:
                                                            headingBgColor
                                                                ? headingBgColor
                                                                : "",
                                                        color: bodyTextColor,
                                                        borderRight:
                                                            horizontalBorder
                                                                ? `2px solid ${headingBgColor
                                                                    ? headingBgColor
                                                                    : ""
                                                                }`
                                                                : "0px",
                                                    }}
                                                ></td>
                                            )
                                    )}
                                </tr>
                            )
                    )}
                </tbody>
            </table>
            {Object.keys(answerData).length > 10 &&
                <div
                    className="q-ana-tab-btn"
                    style={{
                        borderColor: headingBgColor ? headingBgColor : "#D1D5DB",
                    }}
                    onClick={() => setFullData(!fullData)}
                >
                    {
                        fullData ? "Hide" : "Show More"
                    }
                </div>
            }
            {!!hoveredQuestion && (
                <div
                    className="q-tab-toolTip"
                    style={{ left: tooltipPosition.x, top: tooltipPosition.y }}
                >
                    {hoveredQuestion}
                </div>
            )}
        </div>
    ) : (
        <div className="q-tab-loader-div"><div className="q-tab-loader"></div></div>
    )
};

export default Table;
