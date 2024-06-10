import { Referral as ReferEarn } from './ReferEarn'
import { QuestProvider } from '../QuestWrapper'

export const questId = 'c-b6e3b081-7b52-4c94-b2fa-58aaba7feb84';
export const apiKey = 'k-6fe7e7dc-ac8f-44a1-8bbf-a1754ddf88be'
export const apiSecret = 's-5bafb222-c5bd-4c14-9dfe-9d72fb5e275b9cacf740-3c56-44e9-afe3-b1c0aa6a8a42'
export const entityId = 'e-0000000000'
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTgyNjhmNWUxLWY1YTEtNDQwYy1hMzMzLTBmNTU3OGE3Mzg0NyIsImlhdCI6MTcxNzk1NjAxNSwiZXhwIjoxNzE4NTYwODE1fQ.CxVyWW9BIAQTmitNstnJ-83C7kjOwzPq8oc7bPBG3Cw'
export const userId = 'u-8268f5e1-f5a1-440c-a333-0f5578a73847'

export default function ReferEarnPreview() {
    return (

        <QuestProvider apiKey={apiKey} apiSecret={apiSecret} featureFlags={{}} entityId={entityId} 
        apiType="STAGING"
        themeConfig={{
            // fontFamily: 'cursive'
        }}
        >

            <ReferEarn 
            questId={questId}
            token={token} userId={userId} 
            onCopy={(referralCode) => console.log(referralCode)}
             referralLink='https://questlabs.ai/'
             styleConfig={{

                    // Form: {
                    //     backgroundColor: 'blue',
                    //     color: 'red'
                    // },
                    // Heading: {
                    //     color: 'red'
                    // },
                
             }}
            // iconColor='red'
            // secondaryIconColor='red'
            gradientBackground={true}
            showFooter={false}
            showReferralCode={false}
              />
        </QuestProvider>
    )
}
