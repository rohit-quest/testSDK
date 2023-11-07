import React, { useState } from "react";
// import { OnBoarding, QuestLogin } from '..'
import { QuestProvider } from "./components/QuestWrapper";
import QuestLogin from "./components/Login/Login";
import { answer } from "./components/QuestForm/response";
import { HelpCenter } from "./components/HelpCenter/HelpCenter";

// export const questId = 'q-f825ebd2-57f2-4f21-90a2-843e22b4a7f5';
// export const apiKey = 'k-0d087a04-f631-41e1-80dd-fdc9ab2abb07'
// export const apiSecret = 's-329b70b4-cd43-472d-bd41-c2fea09490e0c7196f7b-9020-4bc1-9a11-b70214e3eb48'
// export const entityId = 'e-0000000000'
// export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWUzYmVhMWQzLTE5MTctNGI5YS1iODU1LWYxM2Q0N2RmZTJlZCIsImlhdCI6MTY5NjQyODA5MSwiZXhwIjoxNjk2NTE0NDkxfQ.b-HXLyQwQ-R94fUNnHW2omE0JtFy4C1oSpjuQLFCb-o'
// export const userId = 'u-e3bea1d3-1917-4b9a-b855-f13d47dfe2ed'

export const questId = 'q-2b37975b-30f7-4572-a5f4-c354439b3970';
export const apiKey = 'k-68a0c6b8-b27f-49c6-a315-b0c9cba15bf4'
export const apiSecret = 's-5bafb222-c5bd-4c14-9dfe-9d72fb5e275b9cacf740-3c56-44e9-afe3-b1c0aa6a8a42'
export const entityId = 'e-d97d4353-c517-4ce3-a5e0-f81b3dbb80b5'
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWUzYmVhMWQzLTE5MTctNGI5YS1iODU1LWYxM2Q0N2RmZTJlZCIsImlhdCI6MTY5NjY3MDA5OCwiZXhwIjoxNzI4MjI3Njk4fQ.E_hQ-o8E4jbAMmuJBqwwWFebr9_NoSIykGq_CavR7kE'
export const userId = 'u-e3bea1d3-1917-4b9a-b855-f13d47dfe2ed'
function App() {


    // const [answer, setAnswer] = useState<answer>([])

    // console.log(answer)

    return (
        <div onClick={() => {
            // showToast('', 2000)
        }}>

            {/* <VisitStreak color={'white'} backgroundColor={'black'}/> */}

            <QuestProvider apiKey={apiKey} apiSecret={apiSecret} entityId={entityId} featureFlags={{}}>
                {/* <ReferShare questId={questId} token={token} userId={userId} isOpen={true}/> */}

                {/* <QuestLogin
                    // questId=""
                    textColor=""
                    btnTextColor=""
                    backgroundColor="white"
                    btnColor=""
                    googleClientId="103575086200-2gijbo8rldrv5sg60u0u1rl4cmldhm8a.apps.googleusercontent.com"
                    redirectUri="http://localhost:3000"
                    redirectURL="https://www.questlabs.ai/"
                ></QuestLogin> */}

                <HelpCenter
                    userId={userId}
                    token={token}
                    questId="q-01533080-10f2-4309-b6b8-2e0757196d2b"
                />

            </QuestProvider>
            {/*  */}
        </div >
    )
}

export default App;
