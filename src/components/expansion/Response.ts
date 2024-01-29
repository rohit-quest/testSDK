import axios from "axios";
import config from "../../config";


const platforms = {
    twitter: (text: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
    telegram: (text: string) => `https://t.me/share/url?url=${encodeURIComponent(text)}`,
    whatsapp: (text: string) => `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`,
    linkedin: (text: string) => `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`,
    facebook: (text: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(text)}`,
};

type Platform = keyof typeof platforms;

export const shareOnPlatform = (text: string, platform: Platform): void => {
    const shareURL = platforms[platform](text);

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