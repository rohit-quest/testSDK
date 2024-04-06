import { QuestProvider } from '../QuestWrapper';
import SearchOffline from './OfflineComponent';
import Search from './Search';
export const questId = 'q-c7ac6e57-21b7-41a8-b33a-9a625b635890';
export const apiKey = 'k-fe5a805c-77ed-4cae-bd33-9591ebed2805'
export const apiSecret = 's-5bafb222-c5bd-4c14-9dfe-9d72fb5e275b9cacf740-3c56-44e9-afe3-b1c0aa6a8a42'
export const entityId = 'e-9850377b-f88f-4426-a2ac-56206c74655a'
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTgyNjhmNWUxLWY1YTEtNDQwYy1hMzMzLTBmNTU3OGE3Mzg0NyIsImlhdCI6MTcxMTk0NjczMSwiZXhwIjoxNzEyNTUxNTMxfQ.UN8slj2eRRDbbczjEcQxqYKJn_DLT80DC0Bv84nRtlU'
export const userId = 'u-8268f5e1-f5a1-440c-a333-0f5578a73847'
const criteriaId = () => `ec-e32b88d7-0e43-4254-${Date.now() + Math.floor(Math.random() * 10)}`

export default function SearchPreview({ online = false }) {

    if (online)
        return (<QuestProvider
            apiKey={apiKey}
            apiSecret="s-7462f377-2ce4-4593-a907-3a2a00cdf91be06358a-d95d-4576-b3b4-a07dda2dab36"
            entityId={entityId}
            featureFlags={{}}
            apiType="STAGING"
        >
            <Search
            open={true}
                // color='red'
                iconColor='red'
                // backgroundColor='black'
                questId={questId}
                userId={userId}
                // sections
                // searchDetails
                buttonText='view integration'
                // onResultClick={link=>{window.location.href=link}}
                token={token}
                sections={false}
                // showFooter={false}
                />
        </QuestProvider>
        )
        return (
            <SearchOffline
            open={true}
            // iconColor='red'
            styleConfig={{
                // Body: {
                //     backgroundColor: "black",
                //     color: "white"
                // },
                Heading: {
                    // backgroundColor: "black",
                    color: "red"
                },
                // Description: {
                //     backgroundColor: "black",
                //     color: "white"
                // },
                // Footer: {
                //     backgroundColor: "black",
                //     color: "white"
                // }
                listHover :{
                    background:'grey',
                    Heading:'blue',
                    Description:'pink',
                    iconBackground:'yellow',
                    // Description:'pink'
                },
                CommandButton:{
                    // backgroundColor:'red',
                    color:'blue'
                },
                Input:{
                    color:'blue',
                    borderColor:'blue',
                    // fontSize:'20px'
                }
            }}
            
            defulatResultLength={5}
            showFooter={false}
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
