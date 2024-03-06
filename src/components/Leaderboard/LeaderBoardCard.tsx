import { useContext, useEffect, useState } from "react";
import QuestContext from "../QuestWrapper";
import { leaderboardCup, questLogo } from "../../assets/images";
import { LeaderProps } from "./TopLeaderBoard";
import config from "../../config";
import { StyleConfig } from "./LeaderBoard";
import { LeaderboardCupSvg } from "./LeaderboardSvg";

interface MemberShip {
  membershipTier: number;
  xpThreshold: number;
}

interface LevelValues {
  currentLevel: number;
  previousLevelthreshold: number;
  currentLevelthreshold: number;
}

interface LeaderBoardCardProps {
  index: number;
  item: LeaderProps;
  memberShip: MemberShip[];
  styleConfig?: StyleConfig;
}

const calculateLevel = (points: number): LevelValues => {
  if (points < 1) {
    return {
      currentLevel: 1,
      previousLevelthreshold: 0,
      currentLevelthreshold: 0,
    };
  }

  const currentLevel = Math.max(1, Math.ceil(Math.log2(points / 250) + 1));
  const previousLevelthreshold = (currentLevel - 1) * 250;

  return {
    currentLevel,
    previousLevelthreshold,
    currentLevelthreshold: 0,
  };
};

const calculateActualMemberShip = (
  memberShip: MemberShip[],
  item: LeaderProps
): LevelValues => {
  let indexValue = -1;

  const find = memberShip?.find((val, index) => {
    if (
      val &&
      val.xpThreshold &&
      item &&
      item.runningXP &&
      val.xpThreshold >= item.runningXP
    ) {
      indexValue = index;
      return true;
    } else {
      return false;
    }
  });

  let currentLevel = 0;
  let previousLevelthreshold = 0;
  let currentLevelthreshold = 0;

  if (find || (indexValue === -1 && memberShip.length > 0)) {
    if (find) {
      currentLevel = find.membershipTier;
      if (indexValue > 0) {
        previousLevelthreshold = memberShip[indexValue - 1].xpThreshold;
      }
      currentLevelthreshold = memberShip[indexValue].xpThreshold;
    } else {
      currentLevel = memberShip[0].membershipTier;
      currentLevelthreshold = memberShip[0].xpThreshold;
    }
  }

  return {
    currentLevel,
    previousLevelthreshold,
    currentLevelthreshold,
  };
};

const LeaderBoardCard: React.FC<LeaderBoardCardProps> = ({
  index,
  item,
  memberShip,
  styleConfig,
}) => {
  const [updatedItem, setUpdatedItem] = useState(item);
  const { themeConfig } = useContext(QuestContext.Context);

  useEffect(() => {
    if (updatedItem?.imageUrl && !updatedItem.imageUrl.includes("http")) {
      const newItem = {
        ...updatedItem,
        imageUrl: `${config.BASE_IPFS_URL}${updatedItem.imageUrl}`,
      };
      setUpdatedItem(newItem);
    }
  }, [updatedItem]);

  let progressBarWidth = 0;

  if (memberShip.length > 0) {
    const { previousLevelthreshold, currentLevelthreshold } =
      calculateActualMemberShip(memberShip, item);
    progressBarWidth =
      ((item.runningXP - previousLevelthreshold) / currentLevelthreshold) * 100;
  } else {
    const { previousLevelthreshold } = calculateLevel(item.runningXP);
    progressBarWidth =
      ((item.runningXP - previousLevelthreshold) /
        (previousLevelthreshold === 0 ? 250 : previousLevelthreshold)) *
      100;
  }

  return (
    <div className="q_leaderboardcard_main_cont">
      <div style={{color:styleConfig?.IndexColor?.color,background:styleConfig?.IndexBackground?.background}} className="q_count_base">{index + 4}</div>

      <img
        className="q_profile_cont"
        src={
          item.imageUrl
            ? item.imageUrl
            :questLogo
        }
        alt="logo"
      />
      <div className="q_name_cont">
        <div className="q_name_small_cont">
          <div
            style={{
              color: styleConfig?.Heading?.color || themeConfig?.primaryColor,
              ...styleConfig?.Heading,
            }}
            className="q_leaderboardcard_name_head"
          >
            {item.name ?? "Quest User"}
          </div>
          {LeaderboardCupSvg(styleConfig?.IconStyle?.color||"#9035FF")}
          {/* <img className="q_trophy_cont" src=LeaderboardCupSvg alt="icon" /> */}
        </div>

        <div className="q_leaderboardcard_progressbar">
          <div
            style={{
              width: `${progressBarWidth}%`,
              background: styleConfig?.ProgressBarColor?.background,
            }}
            className="LeaderBoardCardProgressBarinner"
          ></div>
        </div>
        <div
          style={{ color: styleConfig?.PointsColor?.color }}
          className="q_leaderboardcard_points"
        >
          {item.runningXP} points
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardCard;
