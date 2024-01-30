import { ReferEarn } from './ReferEarn'
import { QuestProvider } from '../QuestWrapper'
import { CrossSelling } from './CrossSelling';

const entityId='e-d97d4353-c517-4ce3-a5e0-f81b3dbb80b5';
const questId="q-2b37975b-30f7-4572-a5f4-c354439b3970";
const userId = "u-e3bea1d3-1917-4b9a-b855-f13d47dfe2ed";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWUzYmVhMWQzLTE5MTctNGI5YS1iODU1LWYxM2Q0N2RmZTJlZCIsImlhdCI6MTY5NjY3MDA5OCwiZXhwIjoxNzI4MjI3Njk4fQ.E_hQ-o8E4jbAMmuJBqwwWFebr9_NoSIykGq_CavR7kE"
const apiKey = "k-68a0c6b8-b27f-49c6-a315-b0c9cba15bf4"
const apiSecret = ""

export default function CrossSellingPreview() {
    return (
        <QuestProvider apiKey={apiKey} apiSecret={apiSecret} featureFlags={{}} entityId={entityId}>
            <CrossSelling questId={questId}
            //  invitationLink='https://questlabs.ai/'
            // iconColor='red'
            // secondaryIconColor='red'
              token={token} userId={userId} />
        </QuestProvider>
    )
}
