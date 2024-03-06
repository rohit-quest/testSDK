import { useContext } from "react";
import {
  questLogo,
  topLeadFirst,
  topLeadSecond,
  topLeadThird,
} from "../../assets/images";
import QuestContext from "../QuestWrapper";
import LeaderBoardCard from "./LeaderBoardCard";
import { StyleConfig } from "./LeaderBoard";

export interface LeaderProps {
  userId: string;
  imageUrl?: string;
  runningXP: number;
  name?: string;
  streak?: string;
  counter?: number | null;
}

interface Membership {
  isEnabled: boolean;
  xp: number;
  rewards: string[]; // Adjust this type accordingly
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

interface TopLeaderBoardProps {
  first: LeaderProps | null;
  second: LeaderProps | null;
  third: LeaderProps | null;
  memberShip: Membership[]; // Update the type to Membership[]
  rest: LeaderProps[];
  styleConfig?: StyleConfig;
}

const TopLeaderBoard: React.FC<TopLeaderBoardProps> = ({
  first,
  second,
  third,
  rest,
  memberShip,
  styleConfig,
}) => {
  const { themeConfig } = useContext(QuestContext.Context);

  return (
    <>
      <div className="q_topleaderboard_main_cont">
        {second && (
          <div className="q_topleaderboard_second">
            <div className="q_topleaderboard_innercard">
              <img
                className="q_topleaderboard_inner_image"
                src={second.imageUrl ? second.imageUrl : questLogo}
                alt="logo"
              />
              <div
                style={{ color: styleConfig?.MainHeading?.color }}
                className="q_topleaderboard_name"
              >
                {second.name ? second.name : "Quest User"}
              </div>
              <div
                style={{
                  color: styleConfig?.PointsColor?.color,
                  background: styleConfig?.PointsBackground?.background,
                }}
                className="q_topleaderboard_point"
              >
                {second.runningXP} points
              </div>
              <img src={topLeadSecond} alt="second" />
            </div>
          </div>
        )}
        {first && (
          <div className="q_topleaderboard_first">
            <div className="q_topleaderboard_innercard">
              <img
                className="q_topleaderboard_inner_image_first"
                src={first.imageUrl ? first.imageUrl : questLogo}
                alt="logo"
              />
              <div
                style={{ color: styleConfig?.MainHeading?.color }}
                className="q_topleaderboard_name"
              >
                {first.name ? first.name : "Quest User"}
              </div>
              <div
                style={{
                  color: styleConfig?.PointsColor?.color,
                  background: styleConfig?.PointsBackground?.background,
                }}
                className="q_topleaderboard_point"
              >
                {first.runningXP} points
              </div>
              <img src={topLeadFirst} alt="second" />
            </div>
          </div>
        )}
        {third && (
          <div className="q_topleaderboard_third">
            <div className="q_topleaderboard_innercard">
              <img
                className="q_topleaderboard_inner_image"
                src={third.imageUrl ? third.imageUrl : questLogo}
                alt="logo"
              />
              <div
                style={{ color: styleConfig?.MainHeading?.color }}
                className="q_topleaderboard_name"
              >
                {third.name ? third.name : "Quest User"}
              </div>
              <div
                style={{
                  color: styleConfig?.PointsColor?.color,
                  background: styleConfig?.PointsBackground?.background,
                }}
                className="q_topleaderboard_point"
              >
                {third.runningXP} points
              </div>
              <img src={topLeadThird} alt="second" />
            </div>
          </div>
        )}
      </div>
      <div
        style={{ background: styleConfig?.InnerBackground?.background }}
        className="q_position_cont"
      >
        <div>
          <div
            style={{
              color: styleConfig?.Heading?.color || themeConfig?.primaryColor,
              ...styleConfig?.Heading,
            }}
            className="q_position_heading"
          >
            Leaderboard
          </div>
          <div
            style={{
              color:
                styleConfig?.Description?.color || themeConfig?.secondaryColor,
              ...styleConfig?.Description,
            }}
            className="q_description"
          >
            Your leaderboard gives you instant reference
          </div>
        </div>
        <div className="q_position_leaderboardcard_cont">
          {rest.length > 0 &&
            rest.map((item, index) => (
              <LeaderBoardCard
                key={index}
                index={index}
                memberShip={memberShip} // Passing the entire membership array
                item={item}
                styleConfig={styleConfig}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default TopLeaderBoard;
