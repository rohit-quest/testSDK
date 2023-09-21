import React from "react";
import {
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid
} from "recharts";

function SimpleBarChart(prop: any) {
    const { data, type, lineColor, textColor, gridLine } = prop;
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip" style={{color: textColor}}>
                    <span className="label">{`${type} : ${payload[0].value}`}</span>
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height={210}>
            <BarChart data={data} margin={{ right: 20, top: 20, left: -30, bottom: 10 }}>
                <XAxis
                    dataKey="date"
                    interval={0}
                    domain={[0, (dataMax) => (dataMax >= 50 ? dataMax : 50)]}
                    style={{ fontSize: "12px" }}
                    angle={-45}
                    textAnchor="end"
                />
                <YAxis
                    tickCount={5}
                    interval={0}
                    domain={[0, (dataMax) => (dataMax >= 50 ? dataMax : 50)]}
                    style={{ fontSize: "12px" }}
                />
                {
                    (!gridLine || gridLine == false) &&
                    <CartesianGrid strokeDasharray="3 3" />
                }
                <Bar dataKey="count" fill={lineColor ? lineColor : "#8884d8"} />
                <Tooltip content={<CustomTooltip/>} />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default SimpleBarChart;
