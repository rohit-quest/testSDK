import { useState } from 'react';
import { QuestProvider } from '../QuestWrapper';
import SearchOffline from './OfflineComponent';
import Search from './Search';
export const questId = 'q-2b37975b-30f7-4572-a5f4-c354439b3970';
export const apiKey = 'k-68a0c6b8-b27f-49c6-a315-b0c9cba15bf4'
export const apiSecret = 's-5bafb222-c5bd-4c14-9dfe-9d72fb5e275b9cacf740-3c56-44e9-afe3-b1c0aa6a8a42'
export const entityId = 'e-d97d4353-c517-4ce3-a5e0-f81b3dbb80b5'
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWUzYmVhMWQzLTE5MTctNGI5YS1iODU1LWYxM2Q0N2RmZTJlZCIsImlhdCI6MTY5NjY3MDA5OCwiZXhwIjoxNzI4MjI3Njk4fQ.E_hQ-o8E4jbAMmuJBqwwWFebr9_NoSIykGq_CavR7kE'
export const userId = 'u-e3bea1d3-1917-4b9a-b855-f13d47dfe2ed'
const criteriaId = () => `ec-e32b88d7-0e43-4254-${Date.now() + Math.floor(Math.random() * 10)}`

export default function SearchPreview({ online = false }) {

    if (online)
        return (<QuestProvider
            apiKey={apiKey}
            apiSecret="s-7462f377-2ce4-4593-a907-3a2a00cdf91be06358a-d95d-4576-b3b4-a07dda2dab36"
            entityId={entityId}
            featureFlags={{}}
            apiType="PRODUCTION"
        >
            <Search
                // color='red'
                iconColor='red'
                // backgroundColor='black'
                questId="q-7d780bbd-c41c-48dd-a29d-415309a23cc2"
                userId={userId}
                // sections
                // searchDetails
                buttonText='view integration'
                // onResultClick={link=>{window.location.href=link}}
                token={token}
                sections={false}
                />
        </QuestProvider>
        )
        return (
            <SearchOffline
            open={true}
            styleConfig={{
                // Body: {
                //     backgroundColor: "black",
                //     color: "white"
                // },
                // Heading: {
                //     backgroundColor: "black",
                //     color: "white"
                // },
                // Description: {
                //     backgroundColor: "black",
                //     color: "white"
                // },
                // Footer: {
                //     backgroundColor: "black",
                //     color: "white"
                // }
            }}
            defulatResultLength={5}
            offlineFormatData={[
                {
                    icon: 'Layers',
                    link: "/admin/campaigns",
                    text: "Campaigns",
                    description: ''
                },
                {
                    icon: 'Layers',
                    link: "/admin/campaigns/template",
                    text: "Create Campaign",
                    description: ''
                },
                {
                    icon: 'membershipsIcon',
                    link: "/admin/memberships",
                    text: "Memberships",
                    description: ''
                },
                {
                    icon: 'settingsIcon',
                    link: "/admin/settings",
                    text: "Settings",
                    description: ''
                },
                {
                    icon: 'Audience',
                    link: "/admin/audience",
                    text: "Audience",
                    description: ''
                }]}
        />
    )
}
