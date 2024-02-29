
import { QuestProvider } from '../QuestWrapper'
import QuestMOdal from './Modal'
export const apiKey = 'k-2aa597b4-341f-4c3c-a022-f56877a585c9'
export const apiSecret = 's-5bafb222-c5bd-4c14-9dfe-9d72fb5e275b9cacf740-3c56-44e9-afe3-b1c0aa6a8a42'
export const entityId = 'e-5684609d-cfd7-4b2f-8bcb-f7d2cb316c7e'

export default function ModalPreview({ online = true }) {
    if (online) return (
        <QuestProvider
            apiKey={apiKey}
            apiSecret={apiSecret}
            entityId={entityId}
            featureFlags={{}}
            apiType="STAGING"
        >
            <QuestMOdal
                reward={true}
                invitationLink='https://discord.gg/hjYWqJvZHg'
                onUpload={(file) => console.log(file)}
                url={'https://staging.questprotocol.xyz/api/upload-img'}
                headers={{
                    Authorization: `Bearer ${apiKey}`, userId: 'u-8268f5e1-f5a1-440c-a333-0f5578a73847',
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTgyNjhmNWUxLWY1YTEtNDQwYy1hMzMzLTBmNTU3OGE3Mzg0NyIsImlhdCI6MTcwODQxOTU1MSwiZXhwIjoxNzA5MDI0MzUxfQ.XmHvdhNZSXgGncanDjWrEd_r2SyTQUYvyPXHRqBgviw',
                    apiKey:'k-6fe7e7dc-ac8f-44a1-8bbf-a1754ddf88be'
                }}
                // footerBackground='blue'
                // iconColor='yellow'
                
            />
        </QuestProvider>
    )
    return <></>
}
