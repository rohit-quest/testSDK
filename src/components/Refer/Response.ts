import axios from "axios";
import config from "../../config";

export interface referProp {
    isOpen?: boolean; questId: string;
    headingColor?: string;
    userId: string;
    token: string;
    color?: string;
    bgColor?: string;
    isArticle?: boolean
    heading?: string;
    description?: String;
    uniqueUserId?: string,
    uniqueEmailId?: string,
    
}


export const shareOnPlatform = (text: string, platform: "twitter" | "telegram" | "whatsapp"): void => {
    const platforms = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(text)}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`,
    };

    const shareURL = platforms[platform];

    if (shareURL) {
        window.open(shareURL, '_blank');
    } else {
        console.error('Invalid platform');
    }
};


export const response = async (questId = "", headers: {
    apiKey: string,
    apisecret: string,
    userid: string,
    entityId: string,
    token: string
}) => {
    try {
        const request = `${config.BACKEND_URL}api/entities/${headers.entityId}/quests/${questId}/users/${headers.userid}/referralcode`;
        const { data }: { data: { success: boolean, referralCode?: string } } = await axios.get(request, { headers })
        return data;
    } catch (e) {
        return { success: false };
    }
}