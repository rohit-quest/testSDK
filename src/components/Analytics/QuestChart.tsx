import React, { FC, useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import config from "../../config";
import QuestContext from "../QuestWrapper";
import "./analytics.css";
import SimpleLineChart from "./SimpleLineChart";
import SimpleAreaChart from "./SimpleAreaChart";
import SimpleBarChart from "./SimpleBarChart";

interface QuestChart {
    userId?: string;
    token?: string;
    questId?: string;
    headingText?: string;
    headingTextColor?: string;
    chartType?: string;
    dataType?: string;
    boxWidth?: string;
    startDate?: string;
    endDate?: string;
    chartLineColor?: string;
    bgColor?: string;
    disabledGrid?: boolean;
    metricChart?: boolean;
    metricIds?: string [];
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
    startDate,
    endDate,
    chartLineColor,
    bgColor,
    disabledGrid,
    metricChart,
    metricIds
}) => {
    const [claimData, setClaimData] = useState<updatedViewData[]>([]);
    const [viewData, setViewData] = useState<updatedViewData[]>([]);
    const [metricData, setMetricData] = useState<metricViewData[]>([]);
    const [questData, setQuestData] = useState({});
    const { apiKey, apiSecret, entityId } = useContext(QuestContext.Context);

    useEffect(() => {
        const headers = {
            apiKey: apiKey,
            apisecret: apiSecret,
            userId: userId,
            token: token,
        };
        if (metricChart == true) {
            axios(
                `${config.BACKEND_URL}api/entities/${entityId}/metrics/claims?userId=${userId}`,
                { headers }
            ).then((res: any) => {
                let data = res.data.totalClaims
                let modData: metricViewData [] = []
                for (let i = 0; i < metricIds?.length; i++) {
                    let fl = 0
                    for (let j = 0; j < data.length; j++) {
                        if (metricIds[i] == data[j]._id) {
                            modData.push({
                                metric: data[j]._id,
                                count: data[j].count
                            })
                            fl = 1
                            break;
                        }
                    }
                    if (fl == 0) {
                        modData.push({
                            metric: metricIds[i],
                            count: 0
                        })
                    }
                }
                setMetricData(modData)
            })
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
    
                    let allDates = getDatesBetween(startDate, endDate);
    
                    function getDatesBetween(startDateStr, endDateStr) {
                        if (startDateStr && endDateStr) {
                            const startDate = new Date(startDateStr);
                            const endDate = new Date(endDateStr);
                            const dates = [];
    
                            const currentDate = new Date(startDate);
    
                            while (currentDate <= endDate) {
                                dates.push(currentDate.toISOString().split("T")[0]);
                                currentDate.setDate(currentDate.getDate() + 1);
                            }
    
                            return dates;
                        } else if (startDateStr) {
                            const startDate = new Date(startDateStr);
                            const endDate = new Date();
                            const dates = [];
    
                            const currentDate = new Date(startDate);
    
                            while (currentDate <= endDate) {
                                if (dates.length == 7) {
                                    break;
                                }
                                dates.push(currentDate.toISOString().split("T")[0]);
                                currentDate.setDate(currentDate.getDate() + 1);
                            }
    
                            return dates;
                        } else if (endDateStr) {
                            const startDate = new Date();
                            const endDate = new Date(endDateStr);
                            const dates = [];
    
                            const currentDate = new Date(endDate);
    
                            while (dates.length <= 7) {
                                dates.unshift(
                                    currentDate.toISOString().split("T")[0]
                                );
                                currentDate.setDate(currentDate.getDate() - 1);
                            }
    
                            return dates;
                        } else {
                            const startDate = new Date();
                            const endDate = new Date();
                            const dates = [];
    
                            const currentDate = new Date(endDate);
                            currentDate.setDate(currentDate.getDate() - 1);
    
                            while (dates.length <= 7) {
                                dates.unshift(
                                    currentDate.toISOString().split("T")[0]
                                );
                                currentDate.setDate(currentDate.getDate() - 1);
                            }
    
                            return dates;
                        }
                    }
    
                    let finalData = [];
    
                    let fl = 0;
                    for (let i = 0; i < allDates.length; i++) {
                        if (
                            !!sortedChartData[fl] &&
                            allDates[i] == sortedChartData[fl].date
                        ) {
                            finalData.push(sortedChartData[fl]);
                            fl++;
                        } else {
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
    }, []);



    return (
        <div
            className="q-ana-home q-ana-ch-main"
            style={{
                width: boxWidth ? boxWidth : "100%",
                backgroundColor: bgColor,
            }}
        >
            <p
                className="q-ana-ch-p"
                style={{ color: headingTextColor ? headingTextColor : "" }}
            >
                {!!headingText
                    ? headingText
                    : `${
                          chartType ? chartType.split("chart")[0] : "Line"
                      } Chart of ${metricChart ? "Metrics" : questData.title}`}
            </p>
            {chartType == "Barchart" ? (
                metricChart == true ?
                    <SimpleBarChart
                        data={metricData}
                        type={"Claims"}
                        lineColor={chartLineColor}
                        textColor={headingTextColor}
                        gridLine={disabledGrid}
                    />
                :
                dataType == "claim" ? (
                    <SimpleBarChart
                        data={claimData}
                        type={"Claims"}
                        lineColor={chartLineColor}
                        textColor={headingTextColor}
                        gridLine={disabledGrid}
                    />
                ) : (
                    <SimpleBarChart
                        data={viewData}
                        type={"Views"}
                        lineColor={chartLineColor}
                        textColor={headingTextColor}
                        gridLine={disabledGrid}
                    />
                )
            ) : chartType == "Areachart" ? (
                metricChart == true ?
                    <SimpleAreaChart
                        data={metricData}
                        type={"Claims"}
                        lineColor={chartLineColor}
                        textColor={headingTextColor}
                        gridLine={disabledGrid}
                    />
                :
                dataType == "claim" ? (
                    <SimpleAreaChart
                        data={claimData}
                        type={"Claims"}
                        lineColor={chartLineColor}
                        textColor={headingTextColor}
                        gridLine={disabledGrid}
                    />
                ) : (
                    <SimpleAreaChart
                        data={viewData}
                        type={"Views"}
                        lineColor={chartLineColor}
                        textColor={headingTextColor}
                        gridLine={disabledGrid}
                    />
                )
            ) 
            : metricChart == true ?
                <SimpleLineChart
                    data={metricData}
                    type={"Claims"}
                    lineColor={chartLineColor}
                    textColor={headingTextColor}
                    gridLine={disabledGrid}
                />            
            : dataType == "claim" ? (
                <SimpleLineChart
                    data={claimData}
                    type={"Claims"}
                    lineColor={chartLineColor}
                    textColor={headingTextColor}
                    gridLine={disabledGrid}
                />
            ) : (
                <SimpleLineChart
                    data={viewData}
                    type={"Views"}
                    lineColor={chartLineColor}
                    textColor={headingTextColor}
                    gridLine={disabledGrid}
                />
            )}
        </div>
    );
};

export default QuestChart;
