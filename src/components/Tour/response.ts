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
    linkActionDescription: string;
    effort: string;
    importance: string;
    xp: number;
    frequency: string;
    icon: string;
    selector: string;
    position: "left" | "top" | "right" | "bottom";
}

interface Data {
    xp: number;
    dependentCriterias: any[];
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
type positionType = "left" | "top" | "right" | "bottom";

export type walkResponeType = Array<{ text: string, link: string, description: string, selector?: string, icon: string, position: positionType }>;

export async function getResponse(headers: CustomHeaders, entityId: string, questId: string): Promise<walkResponeType> {
    const request = `${config.BACKEND_URL}api/entities/${entityId}/quests/${questId}?userId=${headers.userId}`;

    try {
        const res = await axios.get(request, { headers: { ...headers } });
        if (!!res.data.eligibilityData) {
            const data = res.data.eligibilityData as QuestArray
            // data.map((e, i) => { e.data.metadata.linkActionDescription = "A message which appears when the cursor is positioned over an icon, image, hyperlink, or other element in a graphical user interface."; e.data.metadata.linkActionName = "step 1", e.data.metadata.selector = [".sdk",".sdk1",".sdk2"][i], e.data.metadata.position = (["right", "left", "top", "bottom"][i] as positionType); e.data.metadata.selector })
            return data.map(e => ({
                text: e.data.metadata.linkActionName,
                link: e.data.metadata.linkActionUrl,
                description: e.data.metadata.linkActionDescription,
                icon: e.data.metadata.icon,
                selector: e.data.metadata.selector,
                position: e.data.metadata.position
            }))
        }
        return []
    } catch (error) {
        console.log(error);
        return []
    }

}