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
import PreviewLeaderboard from "./components/Leaderboard/Preview";
import HelpHub from "./components/HelpHub/HelpHub";
import HelpHubPreview from "./components/HelpHub/Preview";

import SurveyOffline from "./components/Feedback/OfflineComponent";
import Modal from "./components/Modules/Modal";
// import { NormalInput } from './components/Modules/Input'
import OnBoarding from "./components/Onboarding/Onboarding";
import DailyStreak from "./components/Streak/DailyStreak";
import ChallengesPreview from "./components/Challenges/ChallengesPreview";
import GamifiedQuizPreview from "./components/GamifiedQuiz/GamifiedQuizPreview";
import { HelpChat } from "./components/HelpCenter/HelpChat";
import Walkthrough, {
  Align,
  Position,
} from "./components/Walkthrough/WalkThrough";
import showToast from "./components/toast/toastService";
import Toast from "./components/toast2/Toast";
import InlineFeedbackPreview from "./components/InlineFeedback/Preview";
import ModularPreview from "./components/Modules/ModulePreview/Preview";

export const questId = "q-2b37975b-30f7-4572-a5f4-c354439b3970";
export const apiKey = "k-9986f82d-cbd0-4923-bf9a-ea01b4795fa1";
export const apiSecret =
  "s-5bafb222-c5bd-4c14-9dfe-9d72fb5e275b9cacf740-3c56-44e9-afe3-b1c0aa6a8a42";
export const entityId = "e-ba6a2a04-546c-48d4-9369-64524756c0e8";
export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTdiM2E2MzAxLTcxMWMtNGMwZC1hZTYzLWQ5M2RiZTJjZWVlOSIsImlhdCI6MTcxMzk0MzIzMywiZXhwIjoxNzE0NTQ4MDMzfQ.8iaRzlT62QUh7I8uihYuo7ywR0FP33kec-lSnbt3U4M";
export const userId = "u-7b3a6301-711c-4c0d-ae63-d93dbe2ceee9";

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

  // const CSGetstarted = new
  return (
    <div
    // style={{  alignItems: "center", justifyContent: "center", gap: "20px",background: "black",height: "100vh" }}
    >
      <QuestProvider
        apiKey={"k-fe5a805c-77ed-4cae-bd33-9591ebed2805"}
        apiSecret={apiSecret}
        entityId={"e-9850377b-f88f-4426-a2ac-56206c74655a"}
        featureFlags={{}}
        apiType="STAGING"
        themeConfig={
          {
            // backgroundColor: "black",
            // borderColor: "blue",
            // buttonColor: "green",
            //  primaryColor: "red",
            // secondaryColor: "red",
            // fontFamily: "cursive"
          }
        }
      >
        <ModularPreview />
        
        {/* <TutorialPreview online={true} /> */}

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
        {/* <TutorialPreview online={false}/> */}
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

        {/* <HelpHub
          token={'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTg4MzUwY2FhLTQwODAtNDUwNS1hMTY5LTA5ZjNmMTVlODNiNyIsImlhdCI6MTcxMjIwMjIxMCwiZXhwIjoxNzEyODA3MDEwfQ.yCkWcD5yVykmqAmiRKrzdTmqVsptlfq2VPBO4eztNYY'} 
          userId="u-88350caa-4080-4505-a169-09f3f15e83b7"
          /> */}

        {/* <HelpHubPreview online={true} /> */}

        {/* <VisitStreak color={'white'} backgroundColor={'black'}/> */}
        {/* <GamifiedQuizPreview online={true} /> */}
        {/* <GamifiedQuizPreview online={true} /> */}

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

        {/* <OnBoardingPreview online={false} /> */}

        {/* <GetStartedPreview online={true} /> */}

        {/* <Modal isOpen={isOpen} onClose={()=> setIsOpen(false)}>
  <h1>ddddddddd</h1>
</Modal> */}
        {/* <OnBoarding
        {/* <OnBoarding
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
  // progressBarType="modal1"
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
/> */}
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

        {/* <button onClick={() => { showToast.warn({ duration: 100000, text: "This is a warning message", template: 2, descritption: "WARNING" }) }}>Warning</button>
        <button onClick={() => { showToast.error({ duration: 100000, text: "This is a error message", template: 2, descritption: "ERROR" }) }}>Error</button>
        <button onClick={() => { showToast.info({ duration: 100000, text: "This is a info message", template: 2, descritption: "INFO" }) }}>Info</button>
        <button onClick={() => { showToast.success({ duration: 100000, text: "This is a success message", template: 2, descritption: "SUCCESS" }) }}>Success</button> */}

        {/* <button onClick={() => Toast.success({ text: "This is a success messageThis is a success messageThis is a success messageThis is a success messageThis is a success messageThis is a success messageThis is a success messageThis is a success message", position: 'top-right', autoClose: 100000, template: 2, description: "SUCCESSSUCCESSSUCCESSSUCCESSSUCCESSSUCCESSSUCCESSSUCCESSSUCCESSSUCCESSSUCCESSSUCCESSSUCCESSSUCCESSSUCCESSSUCCESSSUCCESSSUCCESSSUCCESSSUCCESSSUCCESSSUCCESSSUCCESSSUCCESSSUCCESSSUCCESSSUCCESS" })}>Success</button>
        <button onClick={() => Toast.info({ text: "This is a info message", position: 'bottom-center', autoClose: 1000, template: 2, description: "INFO" })}>Info</button>
        <button onClick={() => Toast.error({ text: "This is a error message", position: 'bottom-center', autoClose: 1000, template: 2, description: "Error" })}>Error</button>
        <button onClick={() => Toast.warning({ text: "This is a succes warning message", position: 'bottom-center', autoClose: 1000, template: 2, description: "WARNING" })}>Warning</button> */}
        {/* <FeedbackWorkflowPreview online={true} /> */}
        {/* <ChallengesPreview online={true} /> */}

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
        {/* <PreviewLeaderboard online={true}/> */}
        {/* <QuestLogin
                    // questId=""
                    textColor=""
                    btnTextColor=""
                    backgroundColor="white"
                    btnColor=""
                    googleClientId="103575086200-2gijbo8rldrv5sg60u0u1rl4cmldhm8a.apps.googleusercontent.com"
                    redirectUri="http://localhost:3000"
                    redirectURL="https://www.questlabs.ai/"
                    styleConfig={{
                      Heading :{
                        // fontSize:'29px',
                        color:'red'
                      },
                      OtpInput:{
                        background:'green',
                        color:'white'
                      },
                      IconStyle :{
                        color:'blue',
                        Background:'red',
                        BorderColor:'linear-gradient(84deg, #9035FF 0.36%, #0065FF 100.36%'
                      },
                      SecondaryButton :{
                        color:'red',
                        background:"grey"
                      },
                      Input:{
                        // color:'red'
                      }
                    }}
                ></QuestLogin> */}
        {/* <DailyStreak
                    token={token}
                    userId={userId}
                    metric='daily-visit'
                    stepDetails={[
                      {description:"This is the longest streak you’ve ever head1",title: "Confident reader",range: 3},
                      {description:"This is the longest streak you’ve ever head2",title: "Responsible reader",range: 2},
                      {description:"This is the longest streak you’ve ever head3",title: "Serious learner",range: 5},
                      {description:"This is the longest streak you’ve ever head4",title: "Absolute reader",range: 3},
                      {description:"This is the longest streak you’ve ever head5",title: "Professional reader",range: 1},
                      
                  ]} 
                  // filledStreakImg=""
                  styleConfig={{
                    // IconBackground:{background:"#facdcd"},
                    // IconColor:{color:"red"},
                    // Form:{borderRadius:"1px"},
                    // Count:{color:"red"},
                    // Heading:{color:"orange"},
                    // Description:{color:"green"},
                    // Footer:{}
                  }}
                  
                    /> */}
        {/* <SreakPreview/> */}

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
        {/* <SreakPreview online /> */}
        {/* <InlineFeedbackPreview /> */}

        {/* <Walkthrough
            isOpen={isOpen}
            id="app"
            steps={[
              {
                selector: '.gs-single-card-dropDown',
                data: {title: 'First Tab', description: 'Click on this'},
                position: Position.RIGHT,
                align: Align.END
              },
              {
                selector: '.gs-heading-div',
                data: {title: 'Second Tab', description: 'Click on this'},
                align: Align.CENTER
              }
            ]}
            styleConfig={{
              Form: {background: 'green'},
              Background: {background: 'red'}, 
              Footer: {background: 'blue'}
            }}
            onComplete={() => {alert('Welcome to the page'); setIsOpen(false)}}
            onRequestClose={() => setIsOpen(false)}
            onAfterOpen={() => document.documentElement.style.overflow = 'hidden'}
            onBeforeClose={() => document.documentElement.style.overflow = ''}
        />*/}
      </QuestProvider>
      {/* < div style={{height: 1999}}/> */}
    </div>
  );
}

export default App;
