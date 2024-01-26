import axios, { AxiosHeaders } from "axios";
import config from "../../config";
interface CustomHeaders {
    apiKey: string;
    userId: string;
    token: string;
}
export interface Metadata {
    linkActionName: string;
    linkActionUrl: string;
    discription: string;
    effort: string;
    importance: string;
    xp: number;
    frequency: string;
    imageUrl: string;
    icon: string;
    resultType: "command" | "action" | undefined;
    longDescription: string;
}

interface Data {
    xp: number;
    dependentCriterias: any[]; // You can define a more specific type if needed
    frequency: string;
    criteriaType: string;
    createdAt: string;
    criteriaId: string;
    questId: string;
    metadata: Metadata;
    requiresApproval: boolean;
}

interface Quest {
    data: Data;
    completed: boolean;
    isLocked: boolean;
    unfinishedCriteriaIds: string[];
}

export type QuestArray = Quest[];
export async function getResponse(headers: CustomHeaders, entityId: string, questId: string): Promise<any> {
    const request = `${config.BACKEND_URL}api/entities/${entityId}/quests/${questId}?userId=${headers.userId}`;

    return axios.get(request, { headers: { ...headers } })
        .then((res) => {
            if (!!res.data.eligibilityData) {
                const data = res.data.eligibilityData as QuestArray
                const formatData = data.map(e => ({
                    text: e.data.metadata.linkActionName,
                    link: e.data.metadata.linkActionUrl,
                    description: e.data.metadata.discription || "Provide the required information",
                    icon: e.data.metadata.imageUrl || e.data.metadata.icon,
                    resultType: e.data.metadata.resultType,
                    longDescription: e.data.metadata.longDescription || "No more digging through Dropbox and Google Drive. Always know where to find “the latest,” so you can stay in your design flow."
                }))
                return [...formatData.map(e=>({...e,resultType: "action"})),...formatData.map(e=>({...e,resultType: "command"}))]
            }
            return []
        })
        .catch((error) => {
            console.log(error);
            return []
        });
}