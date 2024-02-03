
import React from 'react'
import Feedback from './Feedback';
import { QuestProvider } from '../QuestWrapper';
export const questId = 'q-2b37975b-30f7-4572-a5f4-c354439b3970';
export const apiKey = 'k-68a0c6b8-b27f-49c6-a315-b0c9cba15bf4'
export const apiSecret = 's-5bafb222-c5bd-4c14-9dfe-9d72fb5e275b9cacf740-3c56-44e9-afe3-b1c0aa6a8a42'
export const entityId = 'e-d97d4353-c517-4ce3-a5e0-f81b3dbb80b5'
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWUzYmVhMWQzLTE5MTctNGI5YS1iODU1LWYxM2Q0N2RmZTJlZCIsImlhdCI6MTY5NjY3MDA5OCwiZXhwIjoxNzI4MjI3Njk4fQ.E_hQ-o8E4jbAMmuJBqwwWFebr9_NoSIykGq_CavR7kE'
export const userId = 'u-e3bea1d3-1917-4b9a-b855-f13d47dfe2ed'

export default function FeedbackPreview({ online = true }) {

    if (online)
        return (
            <QuestProvider
                apiKey={apiKey}
                apiSecret={apiSecret}
                entityId={entityId}
            >
                <Feedback
                    userId={userId}
                    token={token}
                    questId={"q-1a12c0e1-35a8-48a3-8cde-a8616f341b88"}
                    // bgColor={"gray"}
                    // font={"sans"}
                    // textColor={"red"}
                    // btnColor={"blue"}
                    // btnTextColor={"yellow"}
                    heading={"Share Your FeedBack"}
                    subHeading={"How was your experience?"}
                    supportUrl={"supportUrl"}
                    delay={5000}
                    isInline={true}
                />
            </QuestProvider>
        )
    return (<></>)
}
