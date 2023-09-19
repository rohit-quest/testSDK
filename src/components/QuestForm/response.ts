import React from "react";
import config from "../../config";
import axios, { AxiosError } from "axios";
export type answer = Array<{ question: string, answer: string | Array<string> }>;
export type SetAnswer = React.Dispatch<React.SetStateAction<answer>>
export interface questFormPropType {
    alignment?: "center" | "start" | "end";
    color?: string;
    bgColor?: string;
    progressBar?: boolean;
    inputBorderColor?: string;
    screenHeight?: string;
    answer?: any;
    setAnswer: SetAnswer;
    headingSize?: string;
    descSize?: string;
    inputFieldType?: object;
    userId?: string;
    token?: string;
    questId?: string;
    onSubmit?: () => void
    shadowColor?: string;
}

export interface metadata {
    title: string;
    effort: string;
    importance: string;
    xp: number;
    frequency: string;
    isOptional: boolean;
    placeholder: string;
    options: Array<string>;
    criteriaType?: "USER_INPUT_TEXT" | "USER_INPUT_DATE" | "USER_INPUT_SINGLE_CHOICE" | "USER_INPUT_MULTI_CHOICE" | "USER_INPUT_TEXT_AREA" | "";
}

export interface ApiResponse {
    data: {
        eligibilityCriterias: string[];
        rewards: [];
        isDeleted: boolean;
        hasReferral: boolean;
        referralXP: number;
        visibility: string;
        status: string;
        xp: number;
        minXPThreshold: number;
        createdAt: string;
        isPrivate: boolean;
        questId: string;
        entityId: string;
        title: string;
        description: string;
        imageURL: string;
        endsAt: string;
        theme: {
            accentColor: string;
            backgroundColor: string;
            fontFamily: string;
            layout: string;
        };
        category: string;
        skills: [];
    };
    eligibilityData: EligibilityData[];
    allCriteriasCompleted: boolean;
    success: boolean;
    claimStatus: boolean;
}

interface EligibilityData {
    data: {
        xp: number;
        dependentCriterias: string[];
        frequency: string;
        createdAt: string;
        criteriaId: string;
        questId: string;
        criteriaType: "USER_INPUT_TEXT" | "USER_INPUT_DATE" | "USER_INPUT_SINGLE_CHOICE" | "USER_INPUT_MULTI_CHOICE" | "USER_INPUT_TEXT_AREA" | "";
        metadata: metadata;
        requiresApproval: boolean;
    };
    completed: boolean;
    isLocked: boolean;
    unfinishedCriteriaIds: string[];
}

export async function fetchQuestions({
    apiKey = "",
    apiSecret = "",
    userId = "",
    token = "",
    entityId = "e-cbd250cc-3fcb-4085-a95e-712742ffa7ac",
    questId = ""
}) {
    const headers = { apiKey, apiSecret, userId, token };
    const request = `${config.BACKEND_URL}api/entities/${entityId}/quests/${questId}?userId=${userId}`;

    try {
        const res = await axios.get(request, { headers });
        let response: ApiResponse = res.data;
        return response as ApiResponse;
    } catch (error) {
        if (error instanceof AxiosError)
            console.log(error.message)
        else console.log(error);
        return null;
    }
}
