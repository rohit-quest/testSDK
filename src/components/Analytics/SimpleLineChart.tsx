import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

let lineColors: string[] = [
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#008000",
];
function SingleLineChart(prop) {
    const { data, type, textColor, gridLine } = prop;
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return type == "Metric" ? (
                <div className="custom-tooltip" style={{ color: textColor }}>
                    {!!payload[0].payload &&
                        Object.keys(payload[0].payload).map((pl, i) => (
                            <div
                                className="label"
                                style={{
                                    fontSize: "10px",
                                    padding: 0,
                                    margin: 0,
                                    boxSizing: "content-box"
                                }}
                                key={i}
                            >{`${pl} : ${payload[0].payload[pl]}`}</div>
                        ))}
                </div>
            ) : (
                <div className="custom-tooltip" style={{ color: textColor }}>
                    <div style={{display: "inline"}} >{`${type} : ${payload[0].value}`}</div>
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height={210}>
            <LineChart data={data} margin={{ right: 20, top: 20 }}>
                <XAxis
                    dataKey="date"
                    interval={0}
                    domain={[0, (dataMax) => dataMax + 5]}
                    style={{ fontSize: "10px" }}
                />
                <YAxis
                    tickCount={5}
                    interval={0}
                    domain={[0, (dataMax) => dataMax + 5]}
                    style={{ fontSize: "10px" }}
                />
                {type == "Metric" && !!data.length ? (
                    Object.keys(data[0]).map(
                        (line, i) =>
                            line != "date" && (
                                <Line
                                    type="monotone"
                                    dataKey={line}
                                    stroke={lineColors[i]}
                                    dot={false}
                                    key={i}
                                />
                            )
                    )
                ) : (
                    <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#8884d8"
                        dot={false}
                    />
                )}
                {(!gridLine || gridLine == false) && (
                    <CartesianGrid strokeDasharray="3 3" />
                )}
                <Tooltip content={<CustomTooltip />} />
            </LineChart>
        </ResponsiveContainer>
    );
}

export default SingleLineChart;
