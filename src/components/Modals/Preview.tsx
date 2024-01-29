import React from 'react'
import { QuestProvider } from '../QuestWrapper'
import FeedbackMOdal from './Modal'
export const apiKey = 'k-2aa597b4-341f-4c3c-a022-f56877a585c9'
export const apiSecret = 's-5bafb222-c5bd-4c14-9dfe-9d72fb5e275b9cacf740-3c56-44e9-afe3-b1c0aa6a8a42'
export const entityId = 'e-5684609d-cfd7-4b2f-8bcb-f7d2cb316c7e'

export default function Preview({ online = true }) {
    if(online) return (
        <QuestProvider
            apiKey={apiKey}
            apiSecret={apiSecret}
            entityId={entityId}
            featureFlags={{}}
            apiType="STAGING"
        >
            <FeedbackMOdal
                questId="q-cb279b5a-2537-4a84-82f3-e81099a39f4c"
                userId="u-16e8bb75-4ad2-4e38-9840-8312d00859e2"
                token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTE2ZThiYjc1LTRhZDItNGUzOC05ODQwLTgzMTJkMDA4NTllMiIsImlhdCI6MTcwNjQ0MDQzMCwiZXhwIjoxNzA3MDQ1MjMwfQ.07B-lKH7X7pIGeWIE18C-dyawrhuf65iUMcZcdBlyCg"
            />
        </QuestProvider>
    )
    return <></>
}
