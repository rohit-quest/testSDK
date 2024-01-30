import axios from "axios";

interface CustomHeaders {
    apiKey: string;
    userId: string;
    token: string;
}

export async function getResponse(headers: CustomHeaders, entityId: string, metric: string, BACKEND_URL: string): Promise<any> {
    const request = `${BACKEND_URL}api/entities/${entityId}/users/${headers.userId}/metrics/${metric}`;
    try {
        const response = await axios.get(request, { headers: { ...headers } })
        return response.data.counter || 0;
    } catch (error) {
        console.log(error)
        return 0;
    }
}