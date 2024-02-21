import React, { useState } from "react";
import { QuestProvider } from "./components/QuestWrapper";
import QuestLogin from "./components/Login/Login";
import { answer } from "./components/QuestForm/response";
import { HelpCenter } from "./components/HelpCenter/HelpCenter";
import { ReferEarn, ReferShare } from "./components/Refer/ReferEarn";
// import { showToast } from "./components/toast/toastService";
import { QuestForm } from "./components/QuestForm/index";
import Feedback from "./components/Feedback/Feedback";
import FeedbackWorkflow from "./components/FeedbackOverview/FeedbackOverview";
import Tutorial from "./components/TutorialScreen/TutorialScreen";
import { confetti } from "./components/Confetti/confetti";
import GetStarted from "./components/GetStarted/GetStarted";
import ShareArticle from "./components/Share/ShareArticle";
import { ChatIcon, LinkIcon } from "./components/HelpCenter/Svg";
import Payment from "./components/Payment/Payment";
import OnBoardingPreview from "./components/Onboarding/Preview";
import GetStartedPreview from "./components/GetStarted/Preview";
import TutorialPreview from "./components/TutorialScreen/Preview";
import SpinTheWheel from "./components/SpinTheWheel/SpinTheWheel";
import SearchPreview from "./components/Search/Preview";
import ReferEarnPreview from "./components/expansion/Preview";
import FeedbackMOdal from "./components/Modals/Modal";
import CrossSellingPreview from "./components/expansion/CrossPreview";
import SreakPreview from "./components/Streak/Preview";
import TourPreview from "./components/Tour/Preview";
import FeedbackWorkflowPreview from "./components/FeedbackOverview/Preview";
import FeedbackPreview from "./components/Feedback/Preview";
import Survey from "./components/Feedback/Survey";
import ModalPreview from "./components/Modals/Preview";
import SurveyOffline from "./components/Feedback/OfflineComponent";
import Modal from "./components/Modules/Modal";
import { NormalInput } from './components/Modules/Input'
import OnBoarding from "./components/Onboarding/Onboarding";
export const questId = "q-2b37975b-30f7-4572-a5f4-c354439b3970";
export const apiKey = "k-2aa597b4-341f-4c3c-a022-f56877a585c9";
export const apiSecret =
  "s-5bafb222-c5bd-4c14-9dfe-9d72fb5e275b9cacf740-3c56-44e9-afe3-b1c0aa6a8a42";
export const entityId = "e-5684609d-cfd7-4b2f-8bcb-f7d2cb316c7e";
export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWUzYmVhMWQzLTE5MTctNGI5YS1iODU1LWYxM2Q0N2RmZTJlZCIsImlhdCI6MTY5NjY3MDA5OCwiZXhwIjoxNzI4MjI3Njk4fQ.E_hQ-o8E4jbAMmuJBqwwWFebr9_NoSIykGq_CavR7kE";
export const userId = "u-e3bea1d3-1917-4b9a-b855-f13d47dfe2ed";

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

  const [complete, setComplete] = useState(false);

  const getstarted = {
    apiKey: "k-ac177ec6-3e03-4526-b198-d085822d261e",
    apiSecret:
      "s-3a33b9f7-275e-44df-8225-a6da1835e7db3c24e655-f7fb-428a-8b61-fc89a001ff22",
    entityId: "e-cbd250cc-3fcb-4085-a95e-712742ffa7ac",
  };

  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [answer, setAnswer] = useState([]);

  return (
    <div
    // style={{  alignItems: "center", justifyContent: "center", gap: "20px",background: "black",height: "100vh" }}
    >
      <QuestProvider
        apiKey={"k-6fe7e7dc-ac8f-44a1-8bbf-a1754ddf88be"}
        apiSecret={apiSecret}
        entityId={"e-0000000000"}
        featureFlags={{}}
        apiType="STAGING"
        themeConfig={{
          backgroundColor: "black",
          borderColor: "red",
          buttonColor: "green",
          primaryColor: "White",
          secondaryColor: "gray",
          fontFamily: ""
        }}
      >
        {/* <SpinTheWheel
                    userId={userId}
                    questId={questId}
                    token={token}
                    criteriaId="ec-7243720a-74b6-43e5-8e3e-45b09dab9b81"
                    rewards={['xp', 'gems', 'xp', 'xp', 'xp', 'xp', 'xp', 'gems', 'xp', 'gems']}
                    wheelColors={{ primary: '#C9A14C26', secondary: 'white' }}
                    maxSpins={10}
                    wheelImage={'https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1706540110821-wrapit2.png'} /> */}

        {/* <SearchPreview online={false}/> */}
        {/* <SreakPreview/> */}
        
        {/* { <Payment
                stripePublishableKey="pk_test_51IGxpeHv3bPcUa5dtAAgA2TZPWjga0FPxWlK3GAnWUfzRXzO8l6Kc3zF2WBpjrvFHAle0Cy3Jqxc7djZxptd9mHe00KjsN2Im7"
                userId="u-0000000000"
                description={[
                    "Basic yet functional UI design for cost-free exploration.",
                    "Polished interface with advanced features for enhanced user interaction.",
                    "Cutting-edge, personalized design for a luxurious and seamless user journey.",
                ]}
                paymentBanefits={paymentBanefits}
                forEntityId={"e-0000000000"}
            /> } */}

          {/* <button onClick={onSuccess}>success</button>
          <button onClick={onInfo}>info</button>
          <button onClick={onFailure}>error</button>
          <button onClick={onWarn}>warning</button>
          <button onClick={onDifferent}>error</button>
          <button onClick={onDifferentTwo}>warning</button> */}
        {/* <ModalPreview/> */}


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
        {/* <OnBoardingPreview online /> */}

        <GetStartedPreview
   online={false}
 />  */}
{/* <Modal isOpen={isOpen} onClose={()=> setIsOpen(false)}>
  <h1>ddddddddd</h1>
</Modal> */}
<OnBoarding
  questId="q-daf9940a-c2fb-4762-adce-57b9b1fda08c"
  answer={answer}
  setAnswer={setAnswer}
  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTRjYzUxMGE0LWU2NzAtNGVkMy1hYmUzLWMzNTFjMTliYjk5MiIsImlhdCI6MTcwODE1Njk3MSwiZXhwIjoxNzA4NzYxNzcxfQ.LedIalQtCHdsh9vjAPuOQmqyU9dNkcqWjuBC0o4RkXM"
  userId="u-4cc510a4-e670-4ed3-abe3-c351c19bb992"
  getAnswers={(e) => console.log(e)}
  singleChoose="modal1"
  multiChoice="modal1"
  template="multi-question"
  design={[[1,5,4,3], [2,6], [7]]}
  progress={["das", "dasa", "sasas"]}
  progressBarType="modal1"
  controlBtnType="Buttons"
  headingScreen= {[{"name":"Identity Insights","desc":"Revealing dimensions beyond words"},{"name":"Professional Details","desc":"Tell us more about your company"},{"name":"Title_3","desc":"Desc_3"}]}
  styleConfig={{
    Form: {
      
    },
    Input: {
      
    },
    ProgressBar: {
      // completeTabColor: "red",
      // currentTabColor: "green",
      // pendingTabColor: "blue",
    }
  }}
/>
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

        <TutorialPreview />

        <FeedbackWorkflowPreview online={true} />

        {/* <FeedbackPreview /> */}

        {/* <ReferEarnPreview/> */}

        {/* <CrossSellingPreview/> */}

        {/* <TourPreview /> */}

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

              {/* <NormalInput  type='text' placeholder ='god' iconColor="blue" />   */}
      </QuestProvider>
    </div>
  );
}

export default App;
