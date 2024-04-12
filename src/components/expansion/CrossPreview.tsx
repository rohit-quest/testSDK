import { QuestProvider } from '../QuestWrapper'
import { CrossSelling } from './CrossSelling';

export const questId = "q-0b37396e-ccaa-45a6-959f-44700e95967d";
export const apiKey = "k-fe5a805c-77ed-4cae-bd33-9591ebed2805";
export const apiSecret =
  "s-5bafb222-c5bd-4c14-9dfe-9d72fb5e275b9cacf740-3c56-44e9-afe3-b1c0aa6a8a42";
export const entityId = "e-9850377b-f88f-4426-a2ac-56206c74655a";
export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTgyNjhmNWUxLWY1YTEtNDQwYy1hMzMzLTBmNTU3OGE3Mzg0NyIsImlhdCI6MTcxMjgyMDkyOSwiZXhwIjoxNzEzNDI1NzI5fQ.RQXNgNM83WfWhgHRFnRilFaXqmx0x-cvVhaL1TvhlBc";
export const userId = "u-8268f5e1-f5a1-440c-a333-0f5578a73847";


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
                expiryDate={1716611499655}
                showDays={false}
                token={token} userId={userId} 
                claimRewardHandler={(email:string)=>{console.log(email)}}
                // backButtonTrigger={undefined} 
                gradientBackground={true}
              
                
                styleConfig={{
                    // Form: {
                    //     backgroundColor: 'blue',
                    //     color: 'red'
                    // },
                    // Heading: {
                    //     color: 'red'
                    // },
                    Timer: {
                        // primaryColor: 'red',
                        // secondaryColor: 'blue',
                        // backgroundColor: 'yellow',
                        TimerCard: {
                            // backgroundColor: 'green',
                            // width: '100px'
                        }
                    },
                    BackgroundWrapper: {
                        background: 'linear-gradient(13deg, #1B1B1B 38.24%, #9035FF 59.39%, #0065FF 70.7%)'
                    },
                }}
                />
        </QuestProvider>
    )
}
