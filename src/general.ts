import mixpanel from 'mixpanel-browser';
import * as amplitude from '@amplitude/analytics-browser';
import axios, { AxiosResponse } from 'axios';

import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'universal-cookie';
import config from './config';
const AMPLITUDE_API_KEY = 'cfd03815b8ea488fb72990c319994fc';
const MIXPANEL_API_KEY = '40e0349e55b0744cbc8194805fa4c37b';
const GA4_TRACKING_ID = 'G-8E6PSWXZR3';
const GA4_API_SECRET = 'JYSz9eEPT-eoh2aTVDESHg';

interface AmplitudeUserProperties {
    userid?: string;
}

interface GA4EventPayload {
    client_id?: string;
    events: Array<{ name: string }>;
}

class General {
    private serviceType: string;
    private ga4MeasurementId: string;
    private ga4ApiSecret: string;


    constructor(serviceType: string) {
        this.serviceType = serviceType;
        amplitude.init(AMPLITUDE_API_KEY);
        mixpanel.init(MIXPANEL_API_KEY);
        this.ga4MeasurementId = GA4_TRACKING_ID;
        this.ga4ApiSecret = GA4_API_SECRET;

        // if (this.serviceType === 'amplitude') {
        //     amplitude.init(AMPLITUDE_API_KEY);
        // } else if (this.serviceType === 'mixpanel') {
        //     mixpanel.init(MIXPANEL_API_KEY);
        // } else if (this.serviceType === 'ga4') {
        //     this.ga4MeasurementId = GA4_TRACKING_ID;
        //     this.ga4ApiSecret = GA4_API_SECRET;
        // } else {
        //     console.log('Invalid Service type');
        // }
    }

    async fireTrackingEvent(eventName: string, metadata?: { eventProperties?: any; userid?: string }) {
        if (this.serviceType === 'amplitude') {
            const { eventProperties, userid } = metadata || {};
            const amplitudeUserProperties: AmplitudeUserProperties = { userid };
            amplitude.track(eventName, eventProperties);
            console.log('Amplitude Event tracked:', eventName, 'User ID:', userid);

            return { success: true };
        } else if (this.serviceType === 'mixpanel') {
            if (metadata) {
                mixpanel.track(eventName, metadata);
                return { success: true };
            } else {
                mixpanel.track(eventName);
                return { success: true };
            }
        } else if (this.serviceType === 'ga4') {
            const { userid } = metadata || {};
            const ga4EventPayload: GA4EventPayload = {
                client_id: userid,
                events: [
                    {
                        name: eventName,
                    },
                ],
            };

            try {
                const response: AxiosResponse = await axios.post(
                    `https://www.google-analytics.com/mp/collect?measurement_id=${this.ga4MeasurementId}&api_secret=${this.ga4ApiSecret}`,
                    ga4EventPayload,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                if (response.status >= 200 && response.status < 300) {
                    console.log('Google Analytics 4 Event tracked successfully:', eventName, 'User ID:', userid);
                    return { success: true };
                }
            } catch (error) {
                console.error('Error tracking GA4 event:', error);
                return { success: false, error: 'Internal Server Error. Please contact Help Center in Discord.' };
            }
        }
    }

    // this needs to be updated
    async getKeys({ entityId, apikey, token, userid }: {
        entityId: string, apikey: string, token: string, userid: string
    }) {
        try {
            const response: AxiosResponse = await axios.get(`${config.BACKEND_URL}api/entities/${entityId}/users/${userid}/social-tokens`, {
                headers: { token, entityid: entityId, userid, apikey },
            });

            console.log('Keys:', response.data);
        } catch (error) {
            console.log(error);
        }
    }
}

export default General;
