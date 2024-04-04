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
  Footer?: CSSProperties;
}

export interface Props {
  questId: string;
  userId: string;
  token: string;
  styleConfig?: StyleConfig;
}

export interface ICriteria {
  criteriaId: string;
  criteriaTitle: string;
  metricCount: string;
  completed: boolean;
  isLocked: boolean;
  progressPercent: number;
  progressData: number;
}

export const ChallengesOffline = ({ userId, token, questId, styleConfig }: Props) => {
  const { apiKey, apiSecret, entityId, apiType } = useContext(
    QuestContext.Context
  );

  const [criterias, setCriterias] = useState<ICriteria[]>([]);
  const [suggestions, setSuggestions] = useState<ICriteria[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  let GeneralFunctions = new General('mixpanel', apiType);
  useEffect(() => {
    GeneralFunctions.fireTrackingEvent("quest_challenges_offline_loaded", "challenges_offline");
    const getChallenges = async () => {
      try {
        const BACKEND_URL =
          apiType === "STAGING"
            ? config.BACKEND_URL_STAGING
            : config.BACKEND_URL;

        const response = await axios.get(
          `${BACKEND_URL}api/entities/${entityId}/quests/${questId}`,
          {
            headers: {
              apiKey: apiKey,
              apiSecret: apiSecret,
              userId: userId,
              token: token,
            },
          }
        );

        if (response.status === 200) {
          const fetchedCriterias: ICriteria[] = [];
          if (response.data?.eligibilityData) {
            for (let criteria of response.data.eligibilityData) {
              fetchedCriterias.push({
                criteriaId: criteria.data.criteriaId,
                criteriaTitle: criteria.data.metadata.title,
                metricCount: criteria.data.metadata.metricCount,
                completed: criteria.completed,
                isLocked: criteria.isLocked,
                progressPercent: criteria.progressPercent,
                progressData: criteria.progressData,
                // metadata: criteria.data.metadata,
              });
            }
          }

          setCriterias(fetchedCriterias);
        } else {
          console.error("Unexpected status code:", response.status);
        }
      } catch (error) {
        console.error("Error fetching challenges data:", error);
      }
    };
    getChallenges();
  }, []);

  useEffect(() => {
    let filteredSuggestions = criterias.filter(
      (criteria) =>
        criteria.criteriaTitle &&
        criteria.criteriaTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  }, [searchTerm, criterias]);
  console.log(suggestions);

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
