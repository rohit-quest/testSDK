import React, { useState } from 'react'
import { QuestProvider } from '../QuestWrapper';
import showToast from '../toast/toastService';
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

    // setTimeout(() => {
        // state.pop();j
        // setstate([...state])
        // console.log(state)
    // }, 4000);

    if (online)
        return (<QuestProvider
            apiKey="k-6fe7e7dc-ac8f-44a1-8bbf-a1754ddf88be"
            apiSecret="s-7462f377-2ce4-4593-a907-3a2a00cdf951be06358a-d95d-4576-b3b4-a07dda2dab36"
            entityId="e-0000000000"
            featureFlags={{}}
            apiType="STAGING"
        >
            <GetStarted
                questId="q-9727caa3-3ecf-4ee9-ad39-860f70466012"
                userId="u-16e8bb75-4ad2-4e38-9840-8312d00859e2"
                token={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTE2ZThiYjc1LTRhZDItNGUzOC05ODQwLTgzMTJkMDA4NTllMiIsImlhdCI6MTcwNTczODk0NSwiZXhwIjoxNzA2MzQzNzQ1fQ.BxgL0g6iXp6xJOvPEFxtP3GxEyFgXKoHrcAgN_yqvq0"}
                // buttonColor="yellow"
                // cardBG="grey"
                icons={[
                    "https://pin.questprotocol.xyz/ipfs/QmWSjM2BwmSW7pda3YmWxyFQ7sCJ9PVmVAwj1W9K7XAHhG",
                    "https://pin.questprotocol.xyz/ipfs/QmRC5SwJpBup4wRB32DxjPV2fEnccpJkuMTBtzS9aiJg42",
                    "https://pin.questprotocol.xyz/ipfs/QmcYB6T27vbqdaaeJdx1Cz3nz9oYMhTegpWjhSff7aX2Mi",
                    "https://pin.questprotocol.xyz/ipfs/QmavuprWaHKvd5JZvkdgathYKLr5Zcshc1EPRzRzBJaPqw"
                ]}
                // dropDown={true}
                // width="50vw" 
                // anouncement
                allowMultiClick={false}
                autoHide={false}
                // buttonBg="#9035FF"
                // cardHeadingColor="white"
                // compltedBtnBgColor="#EBFFEB"
                // dropDown={true}
                // compltedBtnColor="#008000"
                // cardBorderColor="var(--color-core-background-1)"
                heading="What’s new"
                completeAllStatus={() => {
                    // showToast.success({ text: "completed successfully" })
                }}
                onLinkTrigger={(url, id) => {
                    console.log(url)
                    // window.location.href=url;
                }}
            // uniqueUserId="soumitra.petbindhi+1@gmail.com"

            />
        </QuestProvider>)

    return (<GetStartedOff
        // buttonColor="yellow"
        // cardBG="grey"
        icons={[
            "https://pin.questprotocol.xyz/ipfs/QmWSjM2BwmSW7pda3YmWxyFQ7sCJ9PVmVAwj1W9K7XAHhG",
            "https://pin.questprotocol.xyz/ipfs/QmRC5SwJpBup4wRB32DxjPV2fEnccpJkuMTBtzS9aiJg42",
            "https://pin.questprotocol.xyz/ipfs/QmcYB6T27vbqdaaeJdx1Cz3nz9oYMhTegpWjhSff7aX2Mi",
            "https://pin.questprotocol.xyz/ipfs/QmavuprWaHKvd5JZvkdgathYKLr5Zcshc1EPRzRzBJaPqw"
        ]}
        // dropDown={true}
        allowMultiClick={false}
        // width="50vw" 
        autoHide={false}
        // buttonBg="black"
        // cardHeadingColor="white"
        // compltedBtnBgColor="#EBFFEB"
        // compltedBtnColor="#008000"
        // cardBG='black'
        // cardBorderColor="gray"
        arrowColor='red'
        heading="What’s new"
        completeAllStatus={() => {
            // showToast.success({ text: "completed successfully" })
        }}
        onLinkTrigger={(url, id) => {
            // console.log(url)
            // window.location.href=url;
        }}
        // uniqueUserId="soumitra.petbindhi+1@gmail.com"
        offlineFormatData={state}
    />)
}