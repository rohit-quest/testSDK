import React, { useState, useEffect, CSSProperties, useContext } from "react";
import LeaderBoardShow from "./LeaderBoardShow";
import QuestContext from "../QuestWrapper";
import axios from "axios";
import config from "../../config";

interface LeaderboardData {
  userId: string;
  imageUrl?: string;
  runningXP: number;
  name?: string;
  streak?: string;
  counter?: number | null;
}

interface MembershipTier {
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
}

interface LeaderboardResponse {
  data: LeaderboardData[];
  membershipsTiers: MembershipTier[];
}

export interface StyleConfig {
  MainHeading?: CSSProperties;
  Heading?: CSSProperties;
  Description?: CSSProperties;
  PointsColor?: CSSProperties;
  ProgressBarColor?: CSSProperties;
}

interface LeaderBoardProps {
  userId: string;
  token: string;
  styleConfig?: StyleConfig;
}

const LeaderBoard: React.FC<LeaderBoardProps> = ({
  userId,
  token,
  styleConfig,
}) => {
  const [leaderboardData, setLeaderboardData] =
    useState<LeaderboardResponse | null>(null);

  const { apiKey, apiSecret, entityId, apiType } = useContext(
    QuestContext.Context
  );
  useEffect(() => {
    const getLeaderBoard = async () => {
      try {
        const BACKEND_URL =
          apiType === "STAGING"
            ? config.BACKEND_URL_STAGING
            : config.BACKEND_URL;

        const response = await axios.get<LeaderboardResponse>(
          `${BACKEND_URL}api/entities/${entityId}/xp-leaderboard?streak=default_metric`,
          {
            headers: {
              apiKey: apiKey,
              apiSecret: apiSecret,
              userId: userId,
              token: token,
            },
          }
        );

        setLeaderboardData(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };
    getLeaderBoard();
  }, []);
  return (
    <div>
      {leaderboardData ? (
        <LeaderBoardShow
          leaderboardUserData={leaderboardData}
          memberShip={leaderboardData.membershipsTiers}
          styleConfig={styleConfig}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default LeaderBoard;
