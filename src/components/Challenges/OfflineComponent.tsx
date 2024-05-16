import { CSSProperties, useContext, useEffect, useState } from "react";
import QuestContext from "../QuestWrapper";
import axios from "axios";
import config from "../../config";
import ChallengesShow from "./ChallengesShow";
import General from "../../general";

export interface StyleConfig {
  Form?: CSSProperties;
  MainHeading?: CSSProperties;
  Heading?: CSSProperties;
  Description?: CSSProperties;
  PointsColor?: CSSProperties;
  ProgressBarColor?: CSSProperties;
  InnerBackground?: CSSProperties;
  IconStyle?: {
    color?: string;
  };
  Footer?: {
    FooterStyle?: CSSProperties;
    FooterText?: CSSProperties;
    FooterIcon?: CSSProperties;
  };
}

export interface Props {
  questId: string;
  userId: string;
  token: string;
  styleConfig?: StyleConfig;
  offlineFormData?:ICriteria[]
}

export interface ICriteria {
  criteriaId: string;
  title: string;
  metricCount: string;
  isLocked: boolean;
  progressPercent: number;
  progressData: number;
}

export const ChallengesOffline = ({ userId, token, questId, styleConfig ,offlineFormData=[]}: Props) => {


  const [criterias, setCriterias] = useState<ICriteria[]>([]);
  const [suggestions, setSuggestions] = useState<ICriteria[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    let filteredSuggestions = offlineFormData.filter(
      (criteria) =>
        criteria.title &&
        criteria.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  }, [searchTerm, offlineFormData]);


  return (
    <div>
      {suggestions && (
        <ChallengesShow
          suggestions={suggestions}
          setSearchTerm={setSearchTerm}
          styleConfig={styleConfig}
        />
      )}
    </div>
  );
};
