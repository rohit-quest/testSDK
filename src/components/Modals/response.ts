import axios from "axios";
import config from "../../config";
import { Dispatch, SetStateAction } from "react";

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

export const response = async (questId = "", headers: {
    apiKey: string,
    userid: string,
    entityId: string,
    token: string
}, BACKEND_URL = "") => {
    try {

        const request = `${BACKEND_URL}api/entities/${headers.entityId}/quests/${questId}?userId=${headers.userid}`;

        axios.get(request, { headers: headers }).then((res) => {
            if (!!res.data?.eligibilityData?.length) {
                const data = res.data.eligibilityData[0] as Quest;
                console.log(data)
            }
        })
    } catch (e) {
        return { success: false };
    }
}

export const upload = async (
    file: File,
    headers: {
        apiKey: string,
        userid: string,
        entityId: string,
        token: string
    },
    BACKEND_URL = "",setUploadProgress:Dispatch<SetStateAction<number>>
): Promise<{ success: boolean; data?: Quest }> => {
    try {
        const request = `${BACKEND_URL}api/aws/upload-img`;

        const formData = new FormData();
        formData.append('uploaded_file', file);
        
        const response = await axios.post(
           request,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                ...headers
              },
              onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                setUploadProgress(percentCompleted)
                console.log(`Upload progress: ${percentCompleted}%`);
              },
            }
          );

        
    } catch (e) {
        console.error("Error:", e);
        return { success: false };
    }
};
