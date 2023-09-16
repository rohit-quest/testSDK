import axios from "axios";
import config from "../../config";

export type referProp = { isOpen: boolean, onClose: Function, questId: string, userId: string, token: string }

const generateDiscordOAuth2Link = () => {
    const redirectUri = 'http://localhost:5173/';
    const scopes = ['bot', 'applications.commands'];

    const discordOAuth2Link = `https://discord.com/api/oauth2/authorize?client_id=${config.DISCORD_CLIENT_ID}&scope=${scopes.join('%20')}&permissions=0&redirect_uri=${encodeURIComponent(redirectUri)}`;

    return discordOAuth2Link;
};

// Example usage:
const discordLink = generateDiscordOAuth2Link();
export const shareOnPlatform = (text: string, platform: "discord"|"twitter"|"telegram"): void => {
    const platforms = {
        discord: generateDiscordOAuth2Link(),
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(text)}`,
    };

    const shareURL = platforms[platform];

    if (shareURL) {
        window.open(shareURL, '_blank');
    } else {
        console.error('Invalid platform');
    }
};

export const response = async ( questId = "", headers: {
    apiKey: string,
    apisecret: string,
    userid: string,
    entityId: string,
    token: string
}) => {
    try {
        const request = `${config.BACKEND_URL}api/entities/${headers.entityId}/quests/${questId}/users/${headers.userid}/referralcode`;
        const {data }:{data: {success: boolean,referralCode?: string}} = await axios.get(request, {headers})
        return data;
    } catch (e) {
        return {success: false};
    }
}