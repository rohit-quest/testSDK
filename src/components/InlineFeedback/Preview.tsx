import { QuestProvider } from '../QuestWrapper'
import InlineFeedback from './InlineFeedback'

export default function Preview({type}: {type: 'numbering' | 'emoji' | 'like' | 'star'}) {
  return (
    <QuestProvider
        apiSecret={''}
        apiKey="k-ac38b717-eb62-41aa-83f4-7eef8d3ff9b5"
        entityId="e-e6cc0ded-bf40-4f1f-94a3-a9ba73be098f"
        featureFlags={{}}
        apiType="STAGING"
        themeConfig={undefined}
    >
        <InlineFeedback
          userId='u-06d65461-7c5f-4737-946d-c8ab8c80eb25'
          token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTA2ZDY1NDYxLTdjNWYtNDczNy05NDZkLWM4YWI4YzgwZWIyNSIsImlhdCI6MTcxNDA1MDAxMSwiZXhwIjoxNzE0NjU0ODExfQ.EUgwEH6JwADsfZIBZlshixGKdugIW-VCba8NvWtN6_8'
          questId={'q-5944f1e4-48d0-499d-8219-f3823735fe55'}
          styleConfig={{Form: {border: '1px solid whitesmoke'}}}
          // type={type}
          type='emoji'
        />
    </QuestProvider>
  )
}
