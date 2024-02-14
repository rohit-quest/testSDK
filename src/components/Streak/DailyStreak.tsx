import { useContext, useEffect, useState } from "react"
import { getResponse } from "./response";
import QuestContext from "../QuestWrapper.tsx";
import config from "../../config.ts";
import { streakIcon } from "./Svg.tsx";
import QuestLabs from "../QuestLabs.tsx";
import "./DailyStrek.css";
import General from "../../general.ts";

interface Props {
    description?: string;
    pendingStreakImg?: string,
    filledStreakImg?: string,
    metric: string,
    userId: string,
    token: string,
    counter?: number,
    color?: string,
    backgroundColor?: string;
    stepDetails: Array<{ range: number, title: string, description: string }>,
    uniqueUserId?: string,
    uniqueEmailId?: string,
}

const defaultStepDetails = [
    { range: 1, title: 'Day 1', description: "" },
    { range: 1, title: 'Day 2', description: "" },
    { range: 1, title: 'Day 3', description: "" },
    { range: 1, title: 'Day 4', description: "" },
    { range: 1, title: 'Day 5', description: "" },
];


export default function DailyStreak({
    pendingStreakImg = '',
    filledStreakImg = '',
    metric = '',
    userId = '',
    token = '',
    counter = 0,
    stepDetails = defaultStepDetails,
    color = '',
    backgroundColor = 'white',
    uniqueEmailId,
    uniqueUserId
}: Props) {

    const [days, setDays] = useState(counter);
    const [currentActive, setCurrent] = useState(0);
    const { apiKey, entityId, apiType, apiSecret } = useContext(QuestContext.Context);
    let BACKEND_URL = apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL
    const style = (color && backgroundColor) ? { color, backgroundColor } : {}
    useEffect(() => {
        getResponse({ apiKey, token, userId }, entityId, metric, BACKEND_URL).then(count => {
            if (count) setDays(count);
        })
        if (entityId && uniqueUserId) {
            const functions = new General('')
            functions.getExternalLogin({ apiType, uniqueUserId, entityId, userId, apiKey, apiSecret, token, uniqueEmailId })
          } 
    }, []);

    useEffect(() => {
        for (let i = 0; i < stepDetails.length; i++) {
            const sumOfRanges = stepDetails.slice(0, i + 1).reduce((sum, s) => sum + s.range, 0);
            if (sumOfRanges <= days) setCurrent(i)
            else break;
        }
    }, [days, stepDetails]);

    useEffect(() => {setDays(counter)}, [counter]);

    return (
    
        <div className="q_daily_streak" style={style}>
            <div className="q_steak_days_box" style={style}>
                <div className="q_streak_days" style={style}>{days}</div>
                <div className="q_steak_days_text" style={style}>Streak days</div>
            </div>
            <div className="q_streak_desc" style={style}>{stepDetails[currentActive].description}</div>
            <div className="q_streak_steps" style={style}>
                {
                    stepDetails.map((step, i) => {
                        const sumOfRanges = stepDetails.slice(0, i + 1).reduce((sum, s) => sum + s.range, 0);
                        const isActive = sumOfRanges <= days;
                        const imgSrc = isActive ? filledStreakImg || streakIcon(true) : pendingStreakImg || streakIcon(false);
                        return (
                            <div key={i} style={style}
                                className={"q_streak_step"}>
                                <img src={imgSrc} alt="" />
                                <div style={style} className={"q_streak_step_title " + (isActive ? "q_streak_step_active" : "q_streak_step_disable")}>{step.title}</div>
                                <div className={"q_streak_dot "+(isActive ? "q_streak_dot_active" : "q_streak_dot_disable")} ></div>
                            </div>
                        );
                    })}
            </div>
            <QuestLabs color={color} backgroundColor={backgroundColor} icon={false} textAlign="center" />
        </div>
    )
}
