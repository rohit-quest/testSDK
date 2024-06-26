import React, { useContext, useEffect, useState } from "react";

import "./leaderboard.css";
import QuestLabs from "../QuestLabs";
import TopLeaderBoard from "./TopLeaderBoard";
import { StyleConfig } from "./LeaderBoard";
import QuestContext from '../QuestWrapper';

interface LeaderProps {
  userId: string;
  imageUrl?: string;
  runningXP: number;
  name?: string;
  streak?: string;
  counter?: number | null;
}

interface LeaderBoardShowProps {
  leaderboardUserData: {
    data: LeaderProps[];
  };
  memberShip: {
    isEnabled: boolean;
    xp: number;
    rewards: string[];
    _id: string;
    entityId: string;
    membershipTier: number;
    xpThreshold: number;
    description: string;
    imageIPFS?: string;
    createdAt: string;
    __v: number;
    imageUrl?: string;
  }[];
  styleConfig?: StyleConfig;
}

const LeaderBoardShow: React.FC<LeaderBoardShowProps> = ({
  leaderboardUserData,
  memberShip,
  styleConfig,
}) => {
  const [first, setFirst] = useState<LeaderProps | null>(null);
  const [second, setSecond] = useState<LeaderProps | null>(null);
  const [third, setThird] = useState<LeaderProps | null>(null);
  const [rest, setRest] = useState<LeaderProps[]>([]);

  useEffect(() => {
    if (
      leaderboardUserData &&
      leaderboardUserData.data &&
      leaderboardUserData.data.length > 0
    ) {
      setFirst(leaderboardUserData.data[0]);
      if (leaderboardUserData.data.length > 1) {
        setSecond(leaderboardUserData.data[1]);
      }
      if (leaderboardUserData.data.length > 2) {
        setThird(leaderboardUserData.data[2]);
        setRest(leaderboardUserData.data.slice(3));
      }
    } else {
      setFirst(null);
      setSecond(null);
      setThird(null);
      setRest([]);
    }
  }, [leaderboardUserData]);
  const { themeConfig } = useContext(QuestContext.Context);

  return (
    <div style={{ background: styleConfig?.Form?.background || themeConfig?.backgroundColor, color: styleConfig?.Form?.color || themeConfig?.primaryColor, fontFamily: styleConfig?.Form?.fontFamily || themeConfig?.fontFamily }} className="q_leaderboard_main_cont">
      <div
        style={{ color: styleConfig?.MainHeading?.color || themeConfig?.primaryColor, ...styleConfig?.MainHeading, ...styleConfig?.MainHeading }}
        className="q_leaderboard_main_heading"
      >
        Leaderboard
      </div>
      <div className="q_position_main_container">
        {first ? (
          <TopLeaderBoard
            first={first}
            second={second}
            third={third}
            rest={rest}
            memberShip={memberShip}
            styleConfig={styleConfig}
          />
        ) : (
          <div
            style={{
              color: "white",
              textAlign: "center",
              height: "140vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            It seems your leaderboard is empty at the moment.
          </div>
        )}
      </div>
      <div className="q_footer_leaderboard">
        <QuestLabs
          style={{
            ...{
              background: styleConfig?.Footer?.FooterStyle?.backgroundColor ||
                styleConfig?.Form?.backgroundColor ||
                styleConfig?.Form?.background ||
                themeConfig?.backgroundColor,
            },
            ...styleConfig?.Footer?.FooterStyle,
          }}
          textStyle={styleConfig?.Footer?.FooterText}
          iconStyle={styleConfig?.Footer?.FooterIcon}
        />
      </div>
    </div>
  );
};

export default LeaderBoardShow;
