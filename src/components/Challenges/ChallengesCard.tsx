import React, { useContext } from "react";
import ChallengesInnerCard from "./ChallengesInnerCard";
import { challengesIcon1, challengesLock } from "../../assets/images";
import QuestContext from "../QuestWrapper";
import searchIcon from "./searchIcon.svg";
import { ICriteria, StyleConfig } from "./Challenges";

interface Props {
  suggestions: ICriteria[];
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  styleConfig?: StyleConfig;
}

const ChallengesCard: React.FC<Props> = ({
  suggestions,
  setSearchTerm,
  styleConfig,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const { themeConfig } = useContext(QuestContext.Context);

  return (
    <div
      style={{ background: styleConfig?.InnerBackground?.background || themeConfig?.backgroundColor }}
      className="q_challenges_card_cont_main"
    >
      <div
        style={{ color: styleConfig?.Heading?.color || themeConfig?.primaryColor }}
        className="q_challenges_card_heading"
      >
        Task List
      </div>
      <div className="q_challenges_card_input_cont">
        <input
          onChange={handleSearchChange}
          className="q_challenges_card_input"
          placeholder="Search for tasks..."
        />
        <img src={searchIcon} alt={searchIcon} />
      </div>
      <div className="q_challenges_card_cont">
        {suggestions.map((item) => (
          <ChallengesInnerCard
            key={item.criteriaId}
            title={item.criteriaTitle}
            islockedIcon={item.progressPercent ? challengesIcon1 : challengesLock}
            metricCount={item.metricCount}
            progressbarPercent={item.progressPercent}
            progressData={item.progressData}
            isLocked={item.isLocked}
            styleConfig={styleConfig}
          />
        ))}
      </div>
    </div>
  );
};

export default ChallengesCard;
