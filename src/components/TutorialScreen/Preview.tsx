import { QuestProvider } from '../QuestWrapper';
import OfflineComponent from './OfflineComponent';
import Tutorial from './Tutorial';
export const questId = 'q-2b37975b-30f7-4572-a5f4-c354439b3970';
export const apiKey = 'k-68a0c6b8-b27f-49c6-a315-b0c9cba15bf4'
export const apiSecret = 's-5bafb222-c5bd-4c14-9dfe-9d72fb5e275b9cacf740-3c56-44e9-afe3-b1c0aa6a8a42'
export const entityId = 'e-d97d4353-c517-4ce3-a5e0-f81b3dbb80b5'
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWUzYmVhMWQzLTE5MTctNGI5YS1iODU1LWYxM2Q0N2RmZTJlZCIsImlhdCI6MTY5NjY3MDA5OCwiZXhwIjoxNzI4MjI3Njk4fQ.E_hQ-o8E4jbAMmuJBqwwWFebr9_NoSIykGq_CavR7kE'
export const userId = 'u-e3bea1d3-1917-4b9a-b855-f13d47dfe2ed'

export default function TutorialPreview({ online = true }) {

    if (online)
        return (<QuestProvider
            apiKey={apiKey}
            apiSecret="s-7462f377-2ce4-4593-a907-3a2a00cdf91be06358a-d95d-4576-b3b4-a07dda2dab36"
            entityId={entityId}
            featureFlags={{}}
            apiType="PRODUCTION"
            themeConfig={
                { fontFamily: 'cursive' }
            }
        >
            <Tutorial
                questId="q-7d780bbd-c41c-48dd-a29d-415309a23cc2"
                userId={userId}
                token={token}
                styleConfig={{
                    Form: {
                        // backgroundColor: "black",
                        // color: "white"
                    }
                }}
                heading='Your Application Progress'
                subheading='Welcome back, Please complete your application'
            />
        </QuestProvider>
        )
    return (
        <QuestProvider
            apiKey={apiKey}
            apiSecret="s-7462f377-2ce4-4593-a907-3a2a00cdf91be06358a-d95d-4576-b3b4-a07dda2dab36"
            entityId={entityId}
            featureFlags={{}}
            apiType="PRODUCTION"
            themeConfig={
                { fontFamily: 'cursive' }
            }
        >
            <OfflineComponent
                isOpen
                heading='Your Application Progress'
                subheading='Welcome back, Please complete your application'
                offlineFormatData={[
                    {
                        id: 0,
                        "title": "Quest Linkedin",
                        "url": "https://www.linkedin.com/company/questlabss/",
                        "subheading": "this is the description",
                        "criteriaId": "ec-b6d81257-1182-4e20-91e5-e6e7bc336f9b",
                        "status": false
                    },
                    {
                        id: 1,
                        "title": "Explore Questlabs",
                        "url": "https://www.questlabs.ai/",
                        "subheading": "AI-Powered User Experiences to Increase in-app Adoption AI-Powered User Experiences to Increase in-app Adoption AI-Powered User Experiences to Increase in-app Adoption ",
                        "criteriaId": "ec-e32b88d7-0e43-4254-9c94-44859ceedcdc",
                        "status": false
                    },
                    {
                        id: 2,
                        "title": "React Playground",
                        "url": "https://main.d2h2uj2sjo2c2h.amplifyapp.com/",
                        "subheading": "Play with our pre-made templates and create your frame",
                        "criteriaId": "ec-e645704f-1bab-4a14-9447-9632b01f8a64",
                        "status": false
                    }
                ]}
                styleConfig={{
                    Form: {
                        // backgroundColor: "black",
                        // color: "white"
                    },
                    Footer: {
                        // backgroundColor: "black",
                        // color: "white"

                    }
                    // Heading :{fontSize:'50px',color:'pink'},
                    // Description:{fontSize:'100px',color:'red'}
                }}
            />
        </QuestProvider>
    )
}
