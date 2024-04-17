import  { useState } from 'react'
import { QuestProvider } from '../QuestWrapper';
import GetStarted from './GetStarted';
import GetStartedOff from './OfflineComponent';
export const questId = 'q-13c36ef7-8661-4770-bd4c-bdd367f879ff';
export const apiKey = 'k-fe5a805c-77ed-4cae-bd33-9591ebed2805'
export const apiSecret = 's-5bafb222-c5bd-4c14-9dfe-9d72fb5e275b9cacf740-3c56-44e9-afe3-b1c0aa6a8a42'
export const entityId = 'e-9850377b-f88f-4426-a2ac-56206c74655a'
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTgyNjhmNWUxLWY1YTEtNDQwYy1hMzMzLTBmNTU3OGE3Mzg0NyIsImlhdCI6MTcxMzIzOTY1MiwiZXhwIjoxNzEzODQ0NDUyfQ.dRoNwXgz0tE3plJPkrKBlm8dAeHMzs_5uIYOloVbmHE'
export const userId = 'u-8268f5e1-f5a1-440c-a333-0f5578a73847'

export default function GetStartedPreview({ online = true }: { online?: boolean }) {
    let [state,setstate] = useState([
        {
             id: 1,
            "type": "LINK_OPEN_READ",
            "title": "Create a Quest Campaign",
            "url": "https://www.youtube.com/",
            "description": "Choose template, customize UI, add actions and deploy SDK Component in a no-code way",
            "btn1": "Get Demo",
            "btn2": "Create Campaign",
            "btn1Link": "https://calendly.com/debparna/15-min",
            "criteriaId": "ec-868df9ea-b029-4ca9-9e83-0140f8b376d0",
            "completed": false,
            'imageUrl': 'https://img.freepik.com/free-vector/colorful-letter-gradient-logo-design_474888-2309.jpg?size=338&ext=jpg&ga=GA1.1.735520172.1710576000&semt=ais',
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
            'imageUrl': 'https://img.freepik.com/free-vector/colorful-letter-gradient-logo-design_474888-2309.jpg?size=338&ext=jpg&ga=GA1.1.735520172.1710576000&semt=ais',
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
            'imageUrl': 'https://img.freepik.com/free-vector/colorful-letter-gradient-logo-design_474888-2309.jpg?size=338&ext=jpg&ga=GA1.1.735520172.1710576000&semt=ais',
            "longDescription": "Be sure to check out the Quest labs community for support, plus tips & tricks from Quest users"
        }
    ])


    if (online)
        return (<QuestProvider
            apiKey={apiKey}
            apiSecret="s-7462f377-2ce4-4593-a907-3a2a00cdf951be06358a-d95d-4576-b3b4-a07dda2dab36"
            entityId={entityId}
            featureFlags={{}}
            apiType="STAGING"
            // themeConfig={{fontFamily:'cursive'}}
        >
            <GetStarted
                questId={questId}
                userId={userId}
                token={token}
                // buttonColor="yellow"
                cardBackground="yellowGreen"
                cardBorderColor='red'
                // iconUrls={[
                //     "https://pin.questprotocol.xyz/ipfs/QmWSjM2BwmSW7pda3YmWxyFQ7sCJ9PVmVAwj1W9K7XAHhG",
                //     "https://pin.questprotocol.xyz/ipfs/QmRC5SwJpBup4wRB32DxjPV2fEnccpJkuMTBtzS9aiJg42",
                //     "https://pin.questprotocol.xyz/ipfs/QmcYB6T27vbqdaaeJdx1Cz3nz9oYMhTegpWjhSff7aX2Mi",
                //     "https://pin.questprotocol.xyz/ipfs/QmavuprWaHKvd5JZvkdgathYKLr5Zcshc1EPRzRzBJaPqw"
                // ]}
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
            
             showFooter={true}
             styleConfig={{
                // Card:{backgroundColor:'red',borderBottom:'1px solid blue'}
                // Topbar:{border:'none'}
             }}
             ButtonType='Buttons'
            />
        </QuestProvider>)

    return (<GetStartedOff

        iconUrls={[
            "https://pin.questprotocol.xyz/ipfs/QmWSjM2BwmSW7pda3YmWxyFQ7sCJ9PVmVAwj1W9K7XAHhG",
            "https://pin.questprotocol.xyz/ipfs/QmRC5SwJpBup4wRB32DxjPV2fEnccpJkuMTBtzS9aiJg42",
            "https://pin.questprotocol.xyz/ipfs/QmcYB6T27vbqdaaeJdx1Cz3nz9oYMhTegpWjhSff7aX2Mi",
            "https://pin.questprotocol.xyz/ipfs/QmavuprWaHKvd5JZvkdgathYKLr5Zcshc1EPRzRzBJaPqw"
        ]}
        ButtonType='Buttons'
        allowMultiClick={true}
        // width="50vw" 
        autoHide={false}

        // arrowColor='red'
        cardBorderColor='red'
        headingText="What’s new"
        onCompleteAllStatus={() => {
            // showToast.success({ text: "completed successfully" })
        }}
        // onLinkTrigger = {()=>{
            
        // }}
        
        template={1}
        styleConfig={{
            //   Topbar:{border:'none'}
            // SecondaryButton:{
            //     background:'radial-gradient(288.85% 77.24% at 100% 78.12%, #7175F2 0%, rgba(0, 101, 255, 0.00) 100%), radial-gradient(666.24% 220.15% at 105.03% -112.5%, #0065FF 0%, rgba(0, 101, 255, 0.00) 100%), radial-gradient(367.24% 88.88% at 4.78% -13.04%, #9035FF 0%, #9035FF 100%), #FFF',
            //     color:'white',
            //     padding:'8px 12px',
            //     height:'40px',
            //     borderRadius:'4px'
            // }
           
        }}
      
        offlineData={state}
    />)
}