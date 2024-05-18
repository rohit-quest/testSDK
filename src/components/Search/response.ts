import axios from "axios";

interface CustomHeaders {
    apiKey: string;
    userId: string;
    token: string;
}

export async function getResponse(headers: CustomHeaders, entityId: string, campaignId: string, BACKEND_URL, variation?: string): Promise<any> {
    const params = new URLSearchParams()
    if(variation) params.set('variation', variation)

    const request = `${BACKEND_URL}api/v2/entities/${entityId}/campaigns/${campaignId}?${params.toString()}`;

    return axios.get(request, { headers: { ...headers } })
        .then((res) => {
            if (!!res.data.data.actions) {
                const data = res.data.data.actions
                const formatData = data.map(e => ({
                    text: e.title || '',
                    link: e?.metadata.link || '',
                    description: e.discription || "Provide the required information",
                    icon: e?.metadata.imageUrl || '',
                    resultType: e?.metadata?.resultType,
                    longDescription: e.discription || "No more digging through Dropbox and Google Drive. Always know where to find “the latest,” so you can stay in your design flow."
                }))
                // return [...formatData.map(e=>({...e,resultType: "action"})),...formatData.map(e=>({...e,resultType: "command"}))]
                return {formatData, questThemeData:res?.data?.data?.uiProps?.questThemeData};
            }
            return []
        })
        .catch((error) => {
            console.log(error);
            return []
        });
}