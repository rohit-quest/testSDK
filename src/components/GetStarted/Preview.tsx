import  { useState } from 'react'
import { QuestProvider } from '../QuestWrapper';
import GetStarted from './GetStarted';
import GetStartedOff from './OfflineComponent';
export const questId = 'q-2b37975b-30f7-4572-a5f4-c354439b3970';
export const apiKey = 'k-68a0c6b8-b27f-49c6-a315-b0c9cba15bf4'
export const apiSecret = 's-5bafb222-c5bd-4c14-9dfe-9d72fb5e275b9cacf740-3c56-44e9-afe3-b1c0aa6a8a42'
export const entityId = 'e-d97d4353-c517-4ce3-a5e0-f81b3dbb80b5'
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWUzYmVhMWQzLTE5MTctNGI5YS1iODU1LWYxM2Q0N2RmZTJlZCIsImlhdCI6MTY5NjY3MDA5OCwiZXhwIjoxNzI4MjI3Njk4fQ.E_hQ-o8E4jbAMmuJBqwwWFebr9_NoSIykGq_CavR7kE'
export const userId = 'u-e3bea1d3-1917-4b9a-b855-f13d47dfe2ed'

export default function GetStartedPreview({ online = true }: { online?: boolean }) {
    let [state,setstate] = useState([
        {
            id: 1,
            "type": "LINK_OPEN_READ",
            "title": "Create a Quest Campaign",
            "url": "/admin/campaigns",
            "description": "Choose template, customize UI, add actions and deploy SDK Component in a no-code way",
            "btn1": "Get Demo",
            "btn2": "Create Campaign",
            "btn1Link": "https://calendly.com/debparna/15-min",
            "criteriaId": "ec-868df9ea-b029-4ca9-9e83-0140f8b376d0",
            "completed": false,
            "longDescription": "Be sure to check out the Quest labs community for support, plus tips & tricks from Quest users"
        },
        {
            id: 2,
            "type": "LINK_OPEN_READ",
            "title": "Sign-up for Demo & Join our Slack Community",
            "url": "https://calendly.com/debparna/15-min",
            "description": "Get a demo of the entire Quest platform as well as a sneak peak of whats on our roadmap ",
            "btn1": "Join Slack",
            "btn2": "Book Demo",
            "btn1Link": "https://join.slack.com/t/quest-ewq8314/shared_invite/zt-25wut50tj-YyIFs~H9d4LHjNYqJmlkow",
            "criteriaId": "ec-166aa74a-748d-4cf6-8329-b487efb49720",
            "completed": false,
            "longDescription": "Be sure to check out the Quest labs community for support, plus tips & tricks from Quest users"
        },
        {
            id: 3,
            "type": "LINK_OPEN_READ",
            "title": "Integrate Data Sources",
            "url": "/admin/settings/#integrations",
            "description": "Integrate with data sources to enable intelligent data flow into components",
            "btn1": "Get Demo",
            "btn2": "Try Now!",
            "btn1Link": "https://calendly.com/debparna/15-min",
            "criteriaId": "ec-3b238eb3-2a1f-48bb-a9ac-44e48edf880f",
            "completed": false,
            "longDescription": "Be sure to check out the Quest labs community for support, plus tips & tricks from Quest users"
        }
    ])


    if (online)
        return (<QuestProvider
            apiKey="k-6594e945-a4fe-41cb-9b46-17ecbcba72bc"
            apiSecret="s-7462f377-2ce4-4593-a907-3a2a00cdf951be06358a-d95d-4576-b3b4-a07dda2dab36"
            entityId="e-26629b73-a96b-436f-8198-d49572d9d156"
            featureFlags={{}}
            apiType="STAGING"
            themeConfig={{fontFamily:'cursive'}}
        >
            <GetStarted
                questId="q-68c04087-0b68-40a9-8df3-e91932302810"
                userId="u-8268f5e1-f5a1-440c-a333-0f5578a73847"
                token={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTgyNjhmNWUxLWY1YTEtNDQwYy1hMzMzLTBmNTU3OGE3Mzg0NyIsImlhdCI6MTcwODk3NTgxOCwiZXhwIjoxNzA5NTgwNjE4fQ.kGRKlJfOXvjzlnIE7z1Qky1Ozi27tOs_nLgdFuTy46M"}
                // buttonColor="yellow"
                cardBackground="yellowGreen"
                cardBorderColor='red'
                iconUrls={[
                    "https://pin.questprotocol.xyz/ipfs/QmWSjM2BwmSW7pda3YmWxyFQ7sCJ9PVmVAwj1W9K7XAHhG",
                    "https://pin.questprotocol.xyz/ipfs/QmRC5SwJpBup4wRB32DxjPV2fEnccpJkuMTBtzS9aiJg42",
                    "https://pin.questprotocol.xyz/ipfs/QmcYB6T27vbqdaaeJdx1Cz3nz9oYMhTegpWjhSff7aX2Mi",
                    "https://pin.questprotocol.xyz/ipfs/QmavuprWaHKvd5JZvkdgathYKLr5Zcshc1EPRzRzBJaPqw"
                ]}
                // anouncement
                allowMultiClick={false}
                autoHide={false}
                headingText="What’s new"
                onCompleteAllStatus={() => {
                    // showToast.success({ text: "completed successfully" })
                }}
                template={2}
                showLoadingIndicator={true}

                // showDropDown
            uniqueUserId="soumitra.petbindhi+1@gmail.com"
            showProgressBar
             showFooter={false}
             styleConfig={{
                // Card:{backgroundColor:'red',borderBottom:'1px solid blue'}
             }}
            />
        </QuestProvider>)

    return (<GetStartedOff

        iconUrls={[
            "https://pin.questprotocol.xyz/ipfs/QmWSjM2BwmSW7pda3YmWxyFQ7sCJ9PVmVAwj1W9K7XAHhG",
            "https://pin.questprotocol.xyz/ipfs/QmRC5SwJpBup4wRB32DxjPV2fEnccpJkuMTBtzS9aiJg42",
            "https://pin.questprotocol.xyz/ipfs/QmcYB6T27vbqdaaeJdx1Cz3nz9oYMhTegpWjhSff7aX2Mi",
            "https://pin.questprotocol.xyz/ipfs/QmavuprWaHKvd5JZvkdgathYKLr5Zcshc1EPRzRzBJaPqw"
        ]}

        allowMultiClick={true}
        // width="50vw" 
        autoHide={false}

        // arrowColor='red'
        cardBorderColor='red'
        headingText="What’s new"
        onCompleteAllStatus={() => {
            // showToast.success({ text: "completed successfully" })
        }}
        onLinkTrigger = {()=>{
            
        }}
        template={1}
      
        offlineData={state}
    />)
}