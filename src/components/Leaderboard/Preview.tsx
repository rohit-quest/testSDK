
import { QuestProvider } from '../QuestWrapper'
import LeaderBoard from './LeaderBoard'

const PreviewLeaderboard = () => {
  // const questId = 
  const apiKey = "k-6fe7e7dc-ac8f-44a1-8bbf-a1754ddf88be"
  const apiSecret = "s-7462f377-2ce4-4593-a907-3a2a00cdf951be06358a-d95d-4576-b3b4-a07dda2dab36"
  const entityId ="e-9850377b-f88f-4426-a2ac-56206c74655a"
  const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTgyNjhmNWUxLWY1YTEtNDQwYy1hMzMzLTBmNTU3OGE3Mzg0NyIsImlhdCI6MTcwOTI3ODEwMiwiZXhwIjoxNzA5ODgyOTAyfQ.sbdA5R6qYd7NHcUyFLgHAjOmvkJNkGhPj5aBmSBB73I"
  const userId  ="u-8268f5e1-f5a1-440c-a333-0f5578a73847"

  return (
    <QuestProvider apiKey={apiKey} apiSecret={apiSecret} entityId={entityId} apiType="STAGING">
      <LeaderBoard token={token} userId={userId}/>
    </QuestProvider>
  )
}

export default PreviewLeaderboard
