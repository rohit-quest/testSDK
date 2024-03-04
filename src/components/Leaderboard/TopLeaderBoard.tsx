import {  useContext } from "react";
import { topLeadFirst, topLeadSecond, topLeadThird } from "../../assets/images";
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
                src={
                  second.imageUrl
                    ? second.imageUrl
                    : "https://s3-alpha-sig.figma.com/img/58f6/4ff0/54d06f3a384066cdbef6da983e8d5bd0?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LWD~HC70t0BKXwKL5OJDE3Cp6FvXUyqdpFv4E5g4c4NrIJyQLHnciGJcaUi0y5P0TTYDNTgWnwyARpE-BjmR7xbFO3mXHelDd1GhcHrHxFL-anHBDX0vqg01moMl0GoohNH1wqPdLMlpEsKdLNpwPROt7fjz~f-aI~XJvKk5zjql-b7tW2s3yM8-0I~O~e4OMg7rsyBsbeeRX4ar-Egjm49U851lemg0KZt4g8M5~8VfX-YM0YuefgvGaOPzBmONom3IETmVBa2LI0LzEjnPcxSsRp1~rkOjd0VOOT2kyR~XLDVHc5KhjcWUT1aUQv5n5C81LRiKAGm41k1JrmKEOQ__"
                }
                alt="logo"
              />
              <div
                style={{ color: styleConfig?.MainHeading?.color }}
                className="q_topleaderboard_name"
              >
                {second.name ? second.name : "Quest User"}
              </div>
              <div style={{color:styleConfig?.PointsColor?.color}} className="q_topleaderboard_point">
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
                src={
                  first.imageUrl
                    ? first.imageUrl
                    : "https://s3-alpha-sig.figma.com/img/58f6/4ff0/54d06f3a384066cdbef6da983e8d5bd0?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LWD~HC70t0BKXwKL5OJDE3Cp6FvXUyqdpFv4E5g4c4NrIJyQLHnciGJcaUi0y5P0TTYDNTgWnwyARpE-BjmR7xbFO3mXHelDd1GhcHrHxFL-anHBDX0vqg01moMl0GoohNH1wqPdLMlpEsKdLNpwPROt7fjz~f-aI~XJvKk5zjql-b7tW2s3yM8-0I~O~e4OMg7rsyBsbeeRX4ar-Egjm49U851lemg0KZt4g8M5~8VfX-YM0YuefgvGaOPzBmONom3IETmVBa2LI0LzEjnPcxSsRp1~rkOjd0VOOT2kyR~XLDVHc5KhjcWUT1aUQv5n5C81LRiKAGm41k1JrmKEOQ__"
                }
                alt="logo"
              />
              <div
                style={{ color: styleConfig?.MainHeading?.color }}
                className="q_topleaderboard_name"
              >
                {first.name ? first.name : "Quest User"}
              </div>
              <div style={{color:styleConfig?.PointsColor?.color}} className="q_topleaderboard_point">
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
                src={
                  third.imageUrl
                    ? third.imageUrl
                    : "https://s3-alpha-sig.figma.com/img/58f6/4ff0/54d06f3a384066cdbef6da983e8d5bd0?Expires=1710115200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LWD~HC70t0BKXwKL5OJDE3Cp6FvXUyqdpFv4E5g4c4NrIJyQLHnciGJcaUi0y5P0TTYDNTgWnwyARpE-BjmR7xbFO3mXHelDd1GhcHrHxFL-anHBDX0vqg01moMl0GoohNH1wqPdLMlpEsKdLNpwPROt7fjz~f-aI~XJvKk5zjql-b7tW2s3yM8-0I~O~e4OMg7rsyBsbeeRX4ar-Egjm49U851lemg0KZt4g8M5~8VfX-YM0YuefgvGaOPzBmONom3IETmVBa2LI0LzEjnPcxSsRp1~rkOjd0VOOT2kyR~XLDVHc5KhjcWUT1aUQv5n5C81LRiKAGm41k1JrmKEOQ__"
                }
                alt="logo"
              />
              <div
                style={{ color: styleConfig?.MainHeading?.color }}
                className="q_topleaderboard_name"
              >
                {third.name ? third.name : "Quest User"}
              </div>
              <div style={{color:styleConfig?.PointsColor?.color}} className="q_topleaderboard_point">
                {third.runningXP} points
              </div>
              <img src={topLeadThird} alt="second" />
            </div>
          </div>
        )}
      </div>
      <div className="q_position_cont">
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
