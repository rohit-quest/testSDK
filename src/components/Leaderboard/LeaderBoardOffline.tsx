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
  Form?:CSSProperties;
  MainHeading?: CSSProperties;
  Heading?: CSSProperties;
  Description?: CSSProperties;
  PointsBackground?:CSSProperties
  PointsColor?: CSSProperties;
  InnerBackground?:CSSProperties;
  IndexColor?:CSSProperties;
  IndexBackground?:CSSProperties;
  ProgressBarColor?: CSSProperties;
  IconStyle?:{
    color? :string;
  }
  Footer?: CSSProperties;
}

interface LeaderBoardProps {
  userId: string;
  token: string;
  styleConfig?: StyleConfig;
  leaderBoardOfflineData:LeaderboardResponse
}

const LeaderBoardOffline: React.FC<LeaderBoardProps> = ({
  userId,
  token,
  styleConfig,
  leaderBoardOfflineData
}) => {
  const [leaderboardData, setLeaderboardData] =
    useState<LeaderboardResponse | null>(null);

  const { apiKey, apiSecret, entityId, apiType } = useContext(
    QuestContext.Context
  );
  useEffect(() => {
    setLeaderboardData(leaderBoardOfflineData)
    // const getLeaderBoard = async () => {
    //   try {
    //     const BACKEND_URL =
    //       apiType === "STAGING"
    //         ? config.BACKEND_URL_STAGING
    //         : config.BACKEND_URL;

    //     const response = await axios.get<LeaderboardResponse>(
    //       `${BACKEND_URL}api/entities/${entityId}/xp-leaderboard?streak=default_metric`,
    //       {
    //         headers: {
    //           apiKey: apiKey,
    //           apiSecret: apiSecret,
    //           userId: userId,
    //           token: token,
    //         },
    //       }
    //     );
    //     console.log(response.data)

    //     if (response.status === 200) {
    //       setLeaderboardData(response.data);
    //     } else {
    //       console.error("Unexpected status code:", response.status);
    //     }
    //   } catch (error) {
    //     console.error("Error fetching leaderboard data:", error);
    //   }
    // };
    // getLeaderBoard();
  }, []);
  return (
    <div>
      {leaderboardData && 
        <LeaderBoardShow
          leaderboardUserData={leaderboardData}
          memberShip={leaderboardData.membershipsTiers}
          styleConfig={styleConfig}
        />}
     
    </div>
  );
};

export default LeaderBoardOffline;
