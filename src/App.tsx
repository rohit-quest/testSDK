import React, { useState } from "react";
// import { OnBoarding, QuestLogin } from '..'
import { QuestProvider } from "./components/QuestWrapper";
import QuestLogin from "./components/Login/Login";
import { answer } from "./components/QuestForm/response";

export const questId = 'q-f825ebd2-57f2-4f21-90a2-843e22b4a7f5';
export const apiKey = 'k-0d087a04-f631-41e1-80dd-fdc9ab2abb07'
export const apiSecret = 's-329b70b4-cd43-472d-bd41-c2fea09490e0c7196f7b-9020-4bc1-9a11-b70214e3eb48'
export const entityId = 'e-0000000000'
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWUzYmVhMWQzLTE5MTctNGI5YS1iODU1LWYxM2Q0N2RmZTJlZCIsImlhdCI6MTY5NjQyODA5MSwiZXhwIjoxNjk2NTE0NDkxfQ.b-HXLyQwQ-R94fUNnHW2omE0JtFy4C1oSpjuQLFCb-o'
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
                
            </QuestProvider>
            {/*  */}
        </div >
    )
}

export default App;
