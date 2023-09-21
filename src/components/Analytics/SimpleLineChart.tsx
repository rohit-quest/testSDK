import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid
} from "recharts";

function SimpleLineChart(prop: any) {
    const { data, type, lineColor, textColor, gridLine } = prop;
    
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip" style={{color: textColor}}>
                    {
                        !!data[0]?.metric && 
                        <p>Metric: {payload[0].payload.metric}</p>
                    }
                    <span className="label">{`${type} : ${payload[0].value}`}</span>
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height={210}>
            <LineChart data={data} margin={{ right: 20, top: 20, left: -30, bottom: 10 }}>
                <XAxis
                    dataKey={!!data[0]?.metric ? "" : "date"}
                    interval={0}
                    domain={[0, (dataMax) => (dataMax >= 50 ? dataMax : 50)]}
                    style={{ fontSize: "12px" }}
                    angle={!!data[0]?.metric ? 0 : -45}
                    textAnchor="end"
                />
                <YAxis
                    tickCount={5}
                    interval={0}
                    domain={[0, (dataMax) => (dataMax >= 50 ? dataMax : 50)]}
                    style={{ fontSize: "12px" }}
                />
                <Line
                    type="monotone"
                    dataKey="count"
                    stroke={lineColor ? lineColor : "#8884d8"}
                    dot={true}
                />
                {
                    (!gridLine || gridLine == false) &&
                    <CartesianGrid strokeDasharray="3 3" />
                }
                <Tooltip content={<CustomTooltip/>} />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default SimpleLineChart;
