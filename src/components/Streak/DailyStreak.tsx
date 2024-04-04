import { useContext, useEffect, useState } from "react";
import { getResponse } from "./response";
import QuestContext from "../QuestWrapper.tsx";
import config from "../../config.ts";
import { streakIcon } from "./Svg.tsx";
import QuestLabs from "../QuestLabs.tsx";
import "./DailyStrek.css";
import General from "../../general.ts";

interface Props {
  description?: string;
  pendingStreakImg?: string;
  filledStreakImg?: string;
  metric: string;
  userId: string;
  token: string;
  counter?: number;
  stepDetails: Array<{ range: number; title: string; description: string }>;
  uniqueUserId?: string;
  uniqueEmailId?: string;
  styleConfig?: {
    Form?: React.CSSProperties;
    Heading?: React.CSSProperties;
    Description?: React.CSSProperties;
    Label?: React.CSSProperties;
    Footer?: React.CSSProperties;
  };
}

const defaultStepDetails = [
  { range: 1, title: "Day 1", description: "" },
  { range: 1, title: "Day 2", description: "" },
  { range: 1, title: "Day 3", description: "" },
  { range: 1, title: "Day 4", description: "" },
  { range: 1, title: "Day 5", description: "" },
];

export default function DailyStreak({
  pendingStreakImg = "",
  filledStreakImg = "",
  metric = "",
  userId = "",
  token = "",
  counter = 0,
  stepDetails = defaultStepDetails,
  uniqueEmailId,
  uniqueUserId,
  styleConfig,
}: Props) {
  const [days, setDays] = useState(counter);
  const [currentActive, setCurrent] = useState(0);
  const { apiKey, entityId, apiType, apiSecret, themeConfig } = useContext(
    QuestContext.Context
  );
  let BACKEND_URL =
    apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL;

    let GeneralFunctions = new General('mixpanel', apiType);

  useEffect(() => {
    const eventFireLoaded = async () => {
      const data = await GeneralFunctions.fireTrackingEvent("quest_daily_streak_loaded", "daily_streak");
    }
    eventFireLoaded();

    getResponse({ apiKey, token, userId }, entityId, metric, BACKEND_URL).then(
      (count) => {
        if (count) setDays(count);
      }
    );
    if (entityId && uniqueUserId) {
      const functions = new General("");
      functions.getExternalLogin({
        apiType,
        uniqueUserId,
        entityId,
        userId,
        apiKey,
        apiSecret,
        token,
        uniqueEmailId,
      });
    }
  }, []);

  useEffect(() => {
    for (let i = 0; i < stepDetails.length; i++) {
      const sumOfRanges = stepDetails
        .slice(0, i + 1)
        .reduce((sum, s) => sum + s.range, 0);
      if (sumOfRanges <= days) setCurrent(i);
      else break;
    }
  }, [days, stepDetails]);

  useEffect(() => {
    setDays(counter);
  }, [counter]);
  const descriptionStyle = {
    color: themeConfig.secondaryColor,
    ...(styleConfig?.Description || {}),
  };

  return (
    <div
      style={{
        background: styleConfig?.Form?.backgroundColor || themeConfig?.backgroundColor || "#fff", height: styleConfig?.Form?.height || "auto", fontFamily: themeConfig.fontFamily || "'Figtree', sans-serif", ...styleConfig?.Form
      }}
      className="q_daily_streak_cont"

    >
      <div
        className="q_daily_streak"
      >
        <div className="q_steak_days_box">
          <div className="q_streak_days">{days}</div>
          <div className="q_steak_days_text" style={descriptionStyle}>
            Streak days
          </div>
        </div>
        <div className="q_streak_desc" style={descriptionStyle}>
          {stepDetails[currentActive].description}
        </div>
        <div className="q_streak_steps">
          {stepDetails.map((step, i) => {
            const sumOfRanges = stepDetails
              .slice(0, i + 1)
              .reduce((sum, s) => sum + s.range, 0);
            const isActive = sumOfRanges <= days;
            const imgSrc = isActive
              ? filledStreakImg || streakIcon(true)
              : pendingStreakImg || streakIcon(false);
            return (
              <div key={i} className={"q_streak_step"}>
                <div className={"q_img_cont " + (isActive ? "q_img_cont_active" : "q_img_cont_disable")}>
                  <img src={imgSrc} alt="" />
                </div>
                <div
                  className={
                    "q_streak_step_title " +
                    (isActive ? "q_streak_step_active" : "q_streak_step_disable")
                  }
                >
                  {step.title}
                </div>
                <div
                  className={
                    "q_streak_dot " +
                    (isActive ? "q_streak_dot_active" : "q_streak_dot_disable")
                  }
                ></div>
              </div>
            );
          })}
        </div>
      </div>
      <QuestLabs style={styleConfig?.Footer} />
    </div>

  );
}
