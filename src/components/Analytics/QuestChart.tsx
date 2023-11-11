import React, { FC, useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import config from "../../config";
import QuestContext from "../QuestWrapper";
import "./analytics.css";
import SimpleLineChart from "./SimpleLineChart";
import SimpleAreaChart from "./SimpleAreaChart";
import SimpleBarChart from "./SimpleBarChart";

interface QuestChart {
    userId: string;
    token: string;
    questId: string;
    headingText: string;
    headingTextColor: string;
    chartType: "LineChart" | "AreaChart" | "BarChart";
    dataType: "Claim" | "View" | "Metric";
    boxWidth: string;
    bgColor: string;
    disabledGrid: boolean;
    metricIds: string[];
}

interface updatedViewData {
    name: string;
    count: number;
    day: string;
}

interface metricViewData {
    metric: string;
    count: number;
}

const QuestChart: FC<QuestChart> = ({
    userId,
    token,
    questId,
    headingText,
    headingTextColor,
    chartType,
    dataType,
    boxWidth,
    bgColor,
    disabledGrid,
    metricIds,
}) => {
    const [claimData, setClaimData] = useState<updatedViewData[]>([]);
    const [viewData, setViewData] = useState<updatedViewData[]>([]);
    const [metricData, setMetricData] = useState<metricViewData[]>([]);
    const [questData, setQuestData] = useState({});
    const [renderData, setRenderData] = useState<
        updatedViewData[] | metricViewData[]
    >([]);
    const [selectedDate, setSelectedDate] = useState<number>(3)
    const { apiKey, apiSecret, entityId } = useContext(QuestContext.Context);

    async function getData() {
        let defaultsMetricNames = {
            "onboarding-view": "Onboarding Started",
            "onboarding-complete-page-1": "Onboarding 1st Step",
            "onboarding-complete-page-2": "Onboarding 2nd Step",
            "onboarding-complete-page-3": "Onboarding 3rd Step",
            "onboarding-complete-page-4": "Onboarding 4th Step",
            "onboarding-complete-page-5": "Onboarding 5th Step",
            "onboarding-complete-page-6": "Onboarding 6th Step",
            "onboarding-complete-page-7": "Onboarding 7th Step",
            "onboarding-complete-page-8": "Onboarding 8th Step",
            "onboarding-complete-page-9": "Onboarding 9th Step",
            "onboarding-complete-page-10": "Onboarding 10th Step",
            "onboarding-complete": "Onboarding Completed",
            "feedback-q-request-a-feature": "Feature Request Form Viewed",
            "feedback-q-request-a-feature-com": "Feature Request Form Submitted",
            "feedback-q-report-a-bug": "Bug Report Form Viewed",
            "feedback-q-report-a-bug-com": "Bug Report Form Submitted",
            "feedback-q-general-feedback": "General Feedback Form Viewed",
            "feedback-q-general-feedback-com": "General Feedback Form Submitted",
            "feedback-q-contact-us": "Contact Us Form Viewed",
            "feedback-q-contact-us-com": "Contact Us Form Submitted"
        };

        const headers = {
            apiKey: apiKey,
            apisecret: apiSecret,
            userId: userId,
            token: token,
        };
        if (dataType == "Metric") {
            axios(
                `${config.BACKEND_URL}api/entities/${entityId}/quests/${questId}/metric-summary?userId=${userId}`,
                { headers }
            ).then((res: any) => {
                let data = res.data.data;
                let modData = [];
                for (let j = 0; j < data.length; j++) {
                    if (metricIds.includes(data[j].metric)) {
                        modData.push(data[j]);
                    }
                }

                const dates = filterDate();
                const finalData = updateDataForChart(dates, metricIds, modData);

                setMetricData(finalData);

                function filterDate() {
                    const endDate = new Date();
                    const dates = [];

                    const currentDate = new Date(endDate);

                    while (dates.length <= 29) {
                        dates.unshift(currentDate.toISOString().split("T")[0]);
                        currentDate.setDate(currentDate.getDate() - 1);
                    }

                    return dates;
                }

                function updateDataForChart(
                    dates = [],
                    metricIds = [],
                    data = []
                ) {
                    let finalData = [];
                    let allIds = [];
                    for (let j = 0; j < metricIds.length; j++) {
                        allIds[defaultsMetricNames[metricIds[j]]] = 0;
                    }

                    for (let i = 0; i < dates.length; i++) {
                        let obj = {
                            date: dates[i].slice(5, 10),
                            ...allIds,
                        };

                        for (let j = 0; j < data.length; j++) {
                            if (data[j].date == dates[i]) {
                                obj[data[j].metricDetails[0].name] =
                                    data[j].count;
                            }
                        }

                        finalData.push(obj);
                    }

                    return finalData;
                }
            });
        } else {
            axios(
                `${config.BACKEND_URL}api/entities/${entityId}/quests/${questId}/summary?userId=${userId}`,
                { headers }
            ).then((res: any) => {
                if (!!res?.data?.summary?.questStats) {
                    const sortedChartData = [
                        ...res?.data?.summary?.questStats,
                    ].sort((a, b) => {
                        const dateA = new Date(a.date);
                        const dateB = new Date(b.date);
                        return dateA - dateB;
                    });

                    let allDates = getDatesBetween();

                    function getDatesBetween() {
                        const endDate = new Date();
                        const dates = [];

                        const currentDate = new Date(endDate);

                        while (dates.length <= 29) {
                            dates.unshift(
                                currentDate.toISOString().split("T")[0]
                            );
                            currentDate.setDate(currentDate.getDate() - 1);
                        }

                        return dates;
                    }

                    let finalData = [];

                    for (let i = 0; i < allDates.length; i++) {
                        let fl = false;
                        for (let j = 0; j < sortedChartData.length; j++) {
                            if (sortedChartData[j].date == allDates[i]) {
                                finalData.push(sortedChartData[j]);
                                fl = true;
                                break;
                            }
                        }
                        if (fl == false) {
                            let obj = {
                                claimCount: 0,
                                viewCount: 0,
                                date: allDates[i],
                            };
                            finalData.push(obj);
                        }
                    }
                    const updatedClaimData: updatedViewData[] = [];
                    const updatedViewData: updatedViewData[] = [];

                    for (const stat of finalData) {
                        const claimStat = {
                            count: stat.claimCount,
                            date: stat.date.slice(5, 10),
                        };
                        updatedClaimData.push(claimStat);

                        const viewStat = {
                            count: stat.viewCount,
                            date: stat.date.slice(5, 10),
                        };
                        updatedViewData.push(viewStat);
                    }
                    setClaimData(updatedClaimData);
                    setViewData(updatedViewData);
                    setQuestData(res.data.summary.quest);
                }
            });
        }
    }

    function changeDaysValue(val: number) {
        if (dataType == "Claim") {
            filterRenderData(claimData, val);
        } else if (dataType == "View") {
            filterRenderData(viewData, val);
        } else {
            filterRenderData(metricData, val);
        }
    }

    function filterRenderData(
        data: updatedViewData[] | metricViewData[],
        days: number
    ) {
        let dt = [...data];
        let newData: updatedViewData[] | metricViewData[] = dt.slice(
            30 - days,
            30
        );
        setRenderData(newData);
    }

    useEffect(() => {
        changeDaysValue(selectedDate);
    }, [claimData, viewData, metricData, selectedDate]);

    useEffect(() => {
        getData();
    }, [])

    return (
        <div
            className="q-ana-home q-ana-ch-main"
            style={{
                width: boxWidth ? boxWidth : "100%",
                backgroundColor: bgColor,
            }}
        >
            <div className="q-ana-tab-div">
                <div
                    className="q-ana-ch-p"
                    style={{ color: headingTextColor ? headingTextColor : "" }}
                >
                    {!!headingText
                        ? headingText
                        : `${
                              chartType ? chartType.split("chart")[0] : "Line"
                          } Chart of ${
                              dataType == "Metric" ? "Metrics" : questData.title
                          }`}
                </div>
                <select onChange={(e) => setSelectedDate(Number(e.target.value))}>
                    <option value="3">3 days</option>
                    <option value="7">7 days</option>
                    <option value="15">15 days</option>
                    <option value="30">30 days</option>
                </select>
            </div>
            {chartType == "BarChart" ? (
                <SimpleBarChart
                    data={renderData}
                    type={dataType}
                    textColor={headingTextColor}
                    gridLine={disabledGrid}
                />
            ) : chartType == "AreaChart" ? (
                <SimpleAreaChart
                    data={renderData}
                    type={dataType}
                    textColor={headingTextColor}
                    gridLine={disabledGrid}
                />
            ) : (
                <SimpleLineChart
                    data={renderData}
                    type={dataType}
                    textColor={headingTextColor}
                    gridLine={disabledGrid}
                />
            )}
        </div>
    );
};

export default QuestChart;
