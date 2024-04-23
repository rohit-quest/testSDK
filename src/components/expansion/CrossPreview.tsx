import { QuestProvider } from '../QuestWrapper'
import { CrossSelling } from './CrossSelling';

export const questId = 'q-3225e0c4-9bbe-46c6-a0a0-0bffd77e004f';
export const apiKey = 'k-fe5a805c-77ed-4cae-bd33-9591ebed2805'
export const apiSecret = 's-5bafb222-c5bd-4c14-9dfe-9d72fb5e275b9cacf740-3c56-44e9-afe3-b1c0aa6a8a42'
export const entityId = 'e-9850377b-f88f-4426-a2ac-56206c74655a'
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTgyNjhmNWUxLWY1YTEtNDQwYy1hMzMzLTBmNTU3OGE3Mzg0NyIsImlhdCI6MTcxMzc5NTk2OCwiZXhwIjoxNzE0NDAwNzY4fQ.YB5kwwQ5BwIS-kITDGncRxrcms1dNaQ873LIrpnsmwI'
export const userId = 'u-8268f5e1-f5a1-440c-a333-0f5578a73847'

export default function CrossSellingPreview() {
    return (
        <QuestProvider apiKey={apiKey} apiSecret={apiSecret} featureFlags={{}} entityId={entityId}
        themeConfig={{
            fontFamily: 'cursive'
        }}
        apiType="STAGING"
        >
            <CrossSelling 
                questId={questId}
                //  invitationLink='https://questlabs.ai/'
                // iconColor='red'
                // secondaryIconColor='red'
                expiryDate={1716611}
                showDays
                token={token} userId={userId} 
                // claimRewardHandler={undefined} 
                // backButtonTrigger={undefined} 
                // gradientBackground={true}
                styleConfig={{
                    Footer: {
                        // backgroundColor: 'black'
                    }
                }}
                />
        </QuestProvider>
    )
}
