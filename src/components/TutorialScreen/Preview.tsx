import { QuestProvider } from '../QuestWrapper';
import OfflineComponent from './OfflineComponent';
import Tutorial from './Tutorial';
export const questId = 'q-6db8b881-faad-4860-acfa-c9b59f42a9bf';
export const apiKey = 'k-e6ec8094-6eef-4e80-a804-112a63607bf5'
export const apiSecret = 's-5bafb222-c5bd-4c14-9dfe-9d72fb5e275b9cacf740-3c56-44e9-afe3-b1c0aa6a8a42'
export const entityId = 'e-5768fd26-d226-4ac1-81e6-3c99427f3fb3'
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTg4MzUwY2FhLTQwODAtNDUwNS1hMTY5LTA5ZjNmMTVlODNiNyIsImlhdCI6MTcxMjIwMjIxMCwiZXhwIjoxNzEyODA3MDEwfQ.yCkWcD5yVykmqAmiRKrzdTmqVsptlfq2VPBO4eztNYY'
export const userId = 'u-88350caa-4080-4505-a169-09f3f15e83b7'

export default function TutorialPreview({ online = true }) {

    if (online)
        return (<QuestProvider
            apiKey={apiKey}
            apiSecret="s-7462f377-2ce4-4593-a907-3a2a00cdf91be06358a-d95d-4576-b3b4-a07dda2dab36"
            entityId={entityId}
            featureFlags={{}}
            apiType="STAGING"
            themeConfig={
                {  }
            }
        >
            <Tutorial
                questId={questId}
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
                showFooter={false}
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
                {  }
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
                // showFooter={false}
            />
        </QuestProvider>
    )
}
