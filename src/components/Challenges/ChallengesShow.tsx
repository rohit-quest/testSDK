import React, { useContext } from "react";
import "./challenges.css";
import ChallengesCard from "./ChallengesCard";
import QuestContext from "../QuestWrapper";
import QuestLabs from "../QuestLabs";
import { challengesBadge } from "../../assets/images";
import { ICriteria, StyleConfig } from "./Challenges";

interface Props {
  suggestions: ICriteria[];
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  styleConfig?: StyleConfig
}

const ChallengesShow: React.FC<Props> = ({
  suggestions,
  setSearchTerm,
  styleConfig,
}) => {
  const { themeConfig } = useContext(QuestContext.Context);

  return (
    <div
      style={{ background: themeConfig?.backgroundColor || styleConfig?.Form?.backgroundColor, fontFamily: styleConfig?.Form?.fontFamily || themeConfig?.fontFamily, ...styleConfig?.Form }}
      className="q_challenges_main_cont"
    >
      <div
        style={{ color: styleConfig?.MainHeading?.color || themeConfig?.primaryColor, ...styleConfig?.MainHeading }}
        className="q_challenges_main_heading"
      >
        Challenges
      </div>

      <div className="q_challenges_card_main_container">
        <div className="q_top_challenges_card_main_cont">
          <div className="q_top_challenges_card_img">
            <img src={challengesBadge} alt="Challenges Badge" />
          </div>
        </div>
        <ChallengesCard
          suggestions={suggestions}
          setSearchTerm={setSearchTerm}
          styleConfig={styleConfig}
        />
      </div>
      <div className="q_footer_challenges">
        <QuestLabs style={styleConfig?.Footer} />
      </div>
    </div >
  );
};

export default ChallengesShow;
