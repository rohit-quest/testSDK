import React, { useContext } from "react";
import { StyleConfig } from "./Challenges";
import QuestContext from "../QuestWrapper";
import { ChallengeIconFunctionSVG, ChallengesLockFunction } from "./TaskLogo";

interface Props {
  title: string;
  islockedIcon: string;
  metricCount: string;
  progressbarPercent: number;
  progressData: number;
  color?: string;
  isLocked?: boolean;
  styleConfig?: StyleConfig;
}

const ChallengesInnerCard: React.FC<Props> = ({
  title,
  islockedIcon,
  metricCount,
  progressbarPercent,
  isLocked,
  progressData,
  styleConfig,
}) => {
  const { themeConfig } = useContext(QuestContext.Context);
  return (
    <div className="q_challenges_inner_card_main_cont">
      <div
        style={{ background: progressbarPercent ? "#F4EBFF" : "#EFEFEF" }}
        className="q_challenges_icon_main_cont"
      >
        {/* <img className="q_challenges_icon_cont" src={islockedIcon} alt="" /> */}
        {islockedIcon === "challengesIcon1" ? ChallengeIconFunctionSVG(styleConfig?.IconStyle?.color || "#9035FF") : ChallengesLockFunction('')}
      </div>
      <div className="q_challenges_inner_card_name_cont">
        <div
          style={{ color: styleConfig?.Heading?.color || themeConfig?.primaryColor }}
          className="q_challenges_inner_card_name_head"
        >
          {title}
        </div>
        <div className="q_challenges_inner_card_progressbar">
          <div
            style={{
              width: `${progressbarPercent}%`,
              background: styleConfig?.ProgressBarColor?.background || "#9035FF",
            }}
            className="q_challenges_inner_card_progressbar_inner"
          ></div>
        </div>
        <div
          style={{
            color: progressbarPercent
              ? styleConfig?.PointsColor?.color || "#9035FF"
              : "#B9B9B9",
          }}
          className="q_challenges_inner_card_trips"
        >
          {progressbarPercent < 100
            ? `${Number(metricCount) - progressData} Points Left`
            : "Completed"}
        </div>
      </div>
    </div>
  );
};

export default ChallengesInnerCard;
