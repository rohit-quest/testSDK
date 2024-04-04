import React, { useState, useEffect, CSSProperties, useContext } from "react";
import LeaderBoardShow from "./LeaderBoardShow";
import QuestContext from "../QuestWrapper";
import axios from "axios";
import config from "../../config";
import General from "../../general";

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
  offlineFormData?:LeaderboardData[]
}

const LeaderBoardOffline: React.FC<LeaderBoardProps> = ({
  userId,
  token,
  styleConfig,
  offlineFormData =[]
}) => {
  const [leaderboardData, setLeaderboardData] = useState({
    data:offlineFormData
  });

  useEffect(() => {
    setLeaderboardData({
      data:offlineFormData
    })
  }, []);

  return (
    <div>
      {leaderboardData && 
        <LeaderBoardShow
          leaderboardUserData={leaderboardData}
          memberShip={[]}
          styleConfig={styleConfig}
        />}
     
    </div>
  );
};

export default LeaderBoardOffline;
