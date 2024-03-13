
import { QuestProvider } from '../QuestWrapper'
import LeaderBoard from './LeaderBoard'

const PreviewLeaderboard = () => {
  // const questId = 
  const apiKey = "k-2aea7cd1-1009-49cd-b261-10ae0795df00"
  const apiSecret = "s-7462f377-2ce4-4593-a907-3a2a00cdf951be06358a-d95d-4576-b3b4-a07dda2dab36"
  const entityId = "e-9946bedf-3c65-4111-b296-ca6fd2a3a738"
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTdiM2E2MzAxLTcxMWMtNGMwZC1hZTYzLWQ5M2RiZTJjZWVlOSIsImlhdCI6MTcxMDMwMjQ2NSwiZXhwIjoxNzEwOTA3MjY1fQ.tYNTVfLBscJSv0ih9RYSimbj4CQ_YTTlHFCVLHGXCpw"
  const userId = "u-7b3a6301-711c-4c0d-ae63-d93dbe2ceee9"

  return (
    <QuestProvider apiKey={apiKey} apiSecret={apiSecret} entityId={entityId} apiType="STAGING" themeConfig={{}}>
      <LeaderBoard token={token} userId={userId} />
    </QuestProvider>
  )
}

export default PreviewLeaderboard
