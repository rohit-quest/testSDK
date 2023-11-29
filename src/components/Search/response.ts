import axios, { AxiosHeaders } from "axios";
import config from "../../config";
interface CustomHeaders {
    apiKey: string;
    apisecret: string;
    userId: string;
    token: string;
}
export interface Metadata {
    linkActionName: string;
    linkActionUrl: string;
    linkActionDescription: string;
    effort: string;
    importance: string;
    xp: number;
    frequency: string;
    icon: string
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
                return data.map(e => ({
                    text: e.data.metadata.linkActionName,
                    link: e.data.metadata.linkActionUrl,
                    description: e.data.metadata.linkActionDescription,
                    icon: e.data.metadata.icon
                }))
            }
            return []
        })
        .catch((error) => {
            console.log(error);
            return []
        });
}