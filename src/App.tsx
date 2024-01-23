import React, { useState } from "react";
import { QuestProvider } from "./components/QuestWrapper";
import QuestLogin from "./components/Login/Login";
import { answer } from "./components/QuestForm/response";
import { HelpCenter } from "./components/HelpCenter/HelpCenter";
import { ReferEarn, ReferShare } from "./components/Refer/ReferEarn"
import { showToast } from "./components/toast/toastService";
import { QuestForm } from "./components/QuestForm/index";
import Feedback from "./components/Feedback/Feedback";
import FeedbackWorkflow from "./components/FeedbackOverview/FeedbackOverview";
import Tutorial from "./components/TutorialScreen/TutorialScreen"
import { confetti } from "./components/Confetti/confetti";
import GetStarted from "./components/GetStarted/GetStarted";
import ShareArticle from "./components/Share/ShareArticle";
import Search from "./components/Search/Search";
import { ChatIcon, LinkIcon } from "./components/HelpCenter/Svg";
import Payment from "./components/Payment/Payment";
import OnBoardingPreview from './components/Onboarding/Preview';
import GetStartedPreview from './components/GetStarted/Preview';
import TutorialPreview from './components/TutorialScreen/Preview';

export const questId = 'q-2b37975b-30f7-4572-a5f4-c354439b3970';
export const apiKey = 'k-68a0c6b8-b27f-49c6-a315-b0c9cba15bf4'
export const apiSecret = 's-5bafb222-c5bd-4c14-9dfe-9d72fb5e275b9cacf740-3c56-44e9-afe3-b1c0aa6a8a42'
export const entityId = 'e-d97d4353-c517-4ce3-a5e0-f81b3dbb80b5'
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWUzYmVhMWQzLTE5MTctNGI5YS1iODU1LWYxM2Q0N2RmZTJlZCIsImlhdCI6MTY5NjY3MDA5OCwiZXhwIjoxNzI4MjI3Njk4fQ.E_hQ-o8E4jbAMmuJBqwwWFebr9_NoSIykGq_CavR7kE'
export const userId = 'u-e3bea1d3-1917-4b9a-b855-f13d47dfe2ed'
const paymentBanefits = [
    {
        included: [
            "12 Campaigns / mo",
            "Campaign Insights",
            "Audience",
            "Integrations - Twitter, Discord",
        ],
        notIncluded: ["Custom Branding", "Automations", "Support"],
    },
    {
        included: [
            "12 Campaigns / mo",
            "Campaign Insights",
            "Audience",
            "Integrations - Twitter, Discord",
            "Custom Branding",
        ],
        notIncluded: ["Automations", "Support"],
    },
    {
        included: [
            "12 Campaigns / mo",
            "Campaign Insights",
            "Audience",
            "Integrations - Twitter, Discord",
            "Custom Branding",
            "Automations",
            "Support",
        ],
        notIncluded: [],
    },
];
function App() {


    // Mocked function for getAnswers prop


    const [complete, setComplete] = useState(false)

    const getstarted = {
        apiKey: "k-ac177ec6-3e03-4526-b198-d085822d261e",
        apiSecret: "s-3a33b9f7-275e-44df-8225-a6da1835e7db3c24e655-f7fb-428a-8b61-fc89a001ff22",
        entityId: "e-cbd250cc-3fcb-4085-a95e-712742ffa7ac"
    }

    const [data, setData] = useState([]);

    return (
        <div
        // style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", gap: "20px" }}
        >

<QuestProvider 
    apiKey={apiKey}
    apiSecret={apiSecret}
    entityId={entityId}
    featureFlags={{}}
    apiType="PRODUCTION"
>



            {/* <Search
                data={data}
                wholerScreen={true}
                open={true}
                defaultResult={dataArray.slice(0, 5)}
                defulatResultLength={10}
                isFilter
                // backgroundColor=""
                // color=""
                // inputColor=""
                onSearch={(str: string) => {
                    console.log('Search string:', str);
                    setData(str ? dataArray.filter(({ text }) => text.toLocaleLowerCase()
                        .includes(str.toLocaleLowerCase())).slice(0, 10) : []);
                }}
            /> */}





            { /*<Payment
                stripePublishableKey="pk_test_51IGxpeHv3bPcUa5dtAAgA2TZPWjga0FPxWlK3GAnWUfzRXzO8l6Kc3zF2WBpjrvFHAle0Cy3Jqxc7djZxptd9mHe00KjsN2Im7"
                userId="u-0000000000"
                description={[
                    "Basic yet functional UI design for cost-free exploration.",
                    "Polished interface with advanced features for enhanced user interaction.",
                    "Cutting-edge, personalized design for a luxurious and seamless user journey.",
                ]}
                paymentBanefits={paymentBanefits}
                forEntityId={"e-0000000000"}
            />*/}






            {/* <VisitStreak color={'white'} backgroundColor={'black'}/> */}




            {/* 
                <HelpCenter
                    userId={userId}
                    token={token}
                    questId="q-01533080-10f2-4309-b6b8-2e0757196d2b"
                    onClose={() => {
                        console.log("closed")
                    }}
                // backgroundColor="blue"
                // color="red"
                // headColor="yellow"
                // descriptioin="this is descripiton"
                /> */}
{/* <OnBoardingPreview /> */}
{/* <GetStartedPreview
   online={true}
 />  */}

            {/* <QuestForm
                    userId={userId}
                    questId={questId}
                    answer={answer}
                    setAnswer={setAnswer}
                    token={token}
                /> */}
{/* https://staging.questprotocol.xyz/api/entities/e-0000000000/quests/q-9727caa3-3ecf-4ee9-ad39-860f70466012?userId=u-e61750ac-8734-4e42-a56c-df49bcda9f49 */}

         








            {/* <button
                    onClick={() => {
                        confetti(5000)
                    }}>
                    Show Confetti</button> */}


            {/* <button onClick={() => { showToast.warn({ duration: 3000, text: "This is a warning message" }) }}>warning</button>
                <button onClick={() => { showToast.error({ duration: 2000, text: "" }) }}>Error</button>
                <button onClick={() => { showToast.info({ duration: 2000, text: "" }) }}>Info</button>
                <button onClick={() => { showToast.success({ duration: 2000, text: "" }) }}>Success</button>
 */}

 

<TutorialPreview online/>


            {/* <FeedbackWorkflow
                    userId="u-fb6fd0be-24d4-4914-bed0-aac01c899758"
                    token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWZiNmZkMGJlLTI0ZDQtNDkxNC1iZWQwLWFhYzAxYzg5OTc1OCIsImlhdCI6MTY5Mzg4MDUxMSwiZXhwIjoxODUxNjY4NTExfQ.lIHjlJqrTIAcfnIGrACJN3SHKDjJ6NQ7OPuzAL6jCzI"
                    questIds={[
                        'q-general-feedback',
                        'q-report-a-bug',
                        'q-request-a-feature',
                        'q-contact-us',
                    ]}
                    contactUrl="https://calendly.com/sriya-persana/30min"
                    isOpen={true}
                    // onClose={() => setIsOpen(!isOpen)}
                    zIndex={10}
                    // btnColor={"#1972f5"}
                    // topbarColor={"#1972f5"}
                    // starBorderColor={"#1972f5"}
                    // starColor={"#1972f5"}
                    // tickBg={"#1972f5"}
                    uniqueUserId="soumitra.petbindhi+25@gmail.com"
                    uniqueEmailId="soumitra.petbindhi+25@gmail.com"
                /> */}


            {/* <Feedback
                    userId={userId}
                    token={token}
                    questId={"q-1a12c0e1-35a8-48a3-8cde-a8616f341b88"}
                    // bgColor={"gray"}
                    // font={"sans"}
                    // textColor={"red"}
                    // btnColor={"blue"}
                    // btnTextColor={"yellow"}
                    heading={"Share Your FeedBack"}
                    subHeading={"How was your experience?"}
                    supportUrl={"supportUrl"}
                    delay={5000}
                    isInline={true}
                />  */}

            {/* <ReferEarn
                    questId={questId}
                    token={token}
                    userId={userId}
                    isOpen={true}
                    // bgColor="red"
                    // color="white"
            />*/}









            {/* <ReferShare
                    questId={questId}
                    token={token}
                    userId={userId}
                    isOpen={true}
                    // bgColor="gray"
                    // color="blue"
                    // isArticle={true}
            /> */}







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

            {/* <ShareArticle
                    bgColor=""
                    // description=""
                    // heading=""
                    headingColor="black"
                    textColor=""
                    token={token}
                    questId="q-5976dbae-0c4d-4df6-ba70-231e53dd1532"
                    userId={userId}
                /> */}
        </QuestProvider>
        </div >
    )
}

export default App;
