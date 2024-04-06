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
  Search?: {
    background?: string,
    color?: string
  }
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
  title: string;
  metricCount: string;
  isLocked: boolean;
  progressPercent: number;
  progressData: number;
}

export const Challenges = ({ userId, token, questId, styleConfig }: Props) => {
  const { apiKey, apiSecret, entityId, apiType } = useContext(
    QuestContext.Context
  );
  let GeneralFunctions = new General('mixpanel', apiType);
  const [criterias, setCriterias] = useState<ICriteria[]>([]);
  const [suggestions, setSuggestions] = useState<ICriteria[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    GeneralFunctions.fireTrackingEvent("quest_challenges_loaded", "challenges");
    const getChallenges = async () => {
      try {
        const BACKEND_URL =
          apiType === "STAGING"
            ? config.BACKEND_URL_STAGING
            : config.BACKEND_URL;

        const response = await axios.get(
          `${BACKEND_URL}api/entities/${entityId}/quests/${questId}?userId=${userId}`,
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
                title: criteria.data.metadata.title,
                metricCount: criteria.data.metadata.metricCount,
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
        GeneralFunctions.captureSentryException(error);
      }
    };
    getChallenges();
  }, []);

  useEffect(() => {
    let filteredSuggestions = criterias.filter(
      (criteria) =>
        criteria.title &&
        criteria.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSuggestions(filteredSuggestions);
  }, [searchTerm, criterias]);

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
