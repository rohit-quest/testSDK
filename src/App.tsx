import React, { useState } from "react";
import { QuestProvider } from "./components/QuestWrapper";
import QuestLogin from "./components/Login/Login";
import { answer } from "./components/QuestForm/response";
import { HelpCenter } from "./components/HelpCenter/HelpCenter";
import { ReferEarn as ReferEarn_, ReferShare } from "./components/Refer/ReferEarn";
// import { showToast } from "./components/toast/toastService";
import { QuestForm } from "./components/QuestForm/index";
import Feedback from "./components/Survey/Feedback";
import FeedbackWorkflow from "./components/FeedbackOverview/FeedbackOverview";
import Tutorial_ from "./components/TutorialScreen/TutorialScreen";
import Tutorial from "./components/TutorialScreen/Tutorial";
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
// import FeedbackPreview from "./components/Feedback/Preview";
import SurveyPreview from "./components/Survey/Preview";
import ModalPreview from "./components/Modals/Preview";
import PreviewLeaderboard from "./components/Leaderboard/Preview";
import HelpHub from "./components/HelpHub/HelpHub";
import HelpHubPreview from "./components/HelpHub/Preview";

import SurveyOffline from "./components/Survey/OfflineComponent";
import Modal from "./components/Modules/Modal";
// import { NormalInput } from './components/Modules/Input'
import OnBoarding from "./components/Onboarding/Onboarding";
import DailyStreak from "./components/Streak/DailyStreak";
import ChallengesPreview from "./components/Challenges/ChallengesPreview";
import GamifiedQuizPreview from "./components/GamifiedQuiz/GamifiedQuizPreview";
import { HelpChat } from "./components/HelpCenter/HelpChat";
import Walkthrough, { Align, Position } from "./components/Walkthrough/Walkthrough";
import showToast from "./components/toast/toastService";
import Toast from "./components/toast2/Toast";
import InlineFeedbackPreview from "./components/InlineFeedback/Preview";
import ModularPreview from "./components/Modules/ModulePreview/Preview";
import { Challenges } from "./components/Challenges/Challenges";
import Survey from "./components/Survey/Survey";
import Search from "./components/Search/Search";
import InlineFeedback from "./components/InlineFeedback/InlineFeedback";
import LeaderBoard from "./components/Leaderboard/LeaderBoard";
import { Referral } from './components/expansion/ReferEarn'
import GamifiedQuiz from "./components/GamifiedQuiz/GamifiedQuiz";
import { CrossSelling } from "./components/expansion/CrossSelling";
import Test from './Test'

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
  const [questions, setQuestions] = useState(0)

  // const CSGetstarted = new

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTA2ZDY1NDYxLTdjNWYtNDczNy05NDZkLWM4YWI4YzgwZWIyNSIsImlhdCI6MTcxNzEzMjkwMCwiZXhwIjoxNzE3NzM3NzAwfQ.THZ7lCmk2G9AdCjKSUljw3sJjm8CJTXmY4Jf3UN49SQ'
  const userId = 'u-06d65461-7c5f-4737-946d-c8ab8c80eb25'

  return (
    <div
    // style={{  alignItems: "center", justifyContent: "center", gap: "20px",background: "black",height: "100vh" }}
    >
      <QuestProvider
        apiKey={"k-ac38b717-eb62-41aa-83f4-7eef8d3ff9b5"}
        apiSecret={''}
        entityId={"e-e6cc0ded-bf40-4f1f-94a3-a9ba73be098f"}
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
        <Test />
        
        {/* ------------------- API v2 Test Started -------------------  */}
        {/* <Survey
          questId="c-91e2258c-a3e0-4ea1-97d0-184a74153547"
          token={token}
          userId={userId}
          heading="How was your experience?"
          subHeading="Welcome back, Please complete your details"
          itemsPerPage={2}
          ratingType="emoji"
          showFooter={true}
          styleConfig={{
            Heading: {},
            Description: {},
            Form: {},
            Label: {},
            Input: {},
            PrimaryButton: {},
            SecondaryButton: {},
            Footer: {},
            TopBar: {},
            Rating: { LeftRatingText: '', RightRatingText: '' },
            EmailError: { text: '' },
            MultiChoice: { style: {}, selectedStyle: {} },
          }}
          uniqueUserId="vivek-test-alerts"
        /> */}
        {/* <Survey
          questId="c-885da464-9539-48ad-9aca-ddadfc8a3ee6"
          token={token}
          userId={userId}
          bgColor="white"
          heading="How was your experience?"
          subHeading="Welcome back, Please complete your details"
          itemsPerPage={2}
          ratingType="number"
          showFooter={true}
          styleConfig={{
            Heading: {},
            Description: {},
            Form: {},
            Label: {},
            Input: {},
            PrimaryButton: {},
            SecondaryButton: {},
            Footer: {},
            TopBar: {},
            Rating: {
              RatingContainer: {},
              SingleRating: {},
              RatingText: {},
              Hover: {},
              LeftRatingText: '',
              RightRatingText: '',
            },
            EmailError: { text: '', errorStyle: {} },
            MultiChoice: { style: {}, selectedStyle: {} },
          }}
        /> */}
          {/* <Survey
            questId="c-0855c2a2-0bb1-4ab4-8e4e-299f074af2c1"
            token={token}
            userId={userId}
            heading="How was your experience?"
            subHeading="Welcome back, Please complete your details"
            itemsPerPage={2}
            ratingType="colored"
            showFooter={true}
            styleConfig={{
              Heading: {},
              Description: {},
              Form: {},
              Label: {},
              Input: {},
              PrimaryButton: {},
              SecondaryButton: {},
              Footer: {},
              TopBar: {},
              Rating: { LeftRatingText: '', RightRatingText: '' },
              EmailError: { text: '' },
              MultiChoice: { style: {}, selectedStyle: {} },
            }}
        /> */}
          {/* <Survey
            questId="c-244b0ae9-bf87-4bd6-a980-8235b5041a2b"
            token={token}
            userId={userId}
            heading="How was your experience?"
            subHeading="Welcome back, Please complete your details"
            itemsPerPage={5}
            ratingType="star"
            showFooter={true}
            styleConfig={{
              Heading: {},
              Description: {},
              Form: {},
              Label: {},
              Input: {},
              PrimaryButton: {},
              SecondaryButton: {},
              Footer: {},
              TopBar: {},
              Rating: { LeftRatingText: '', RightRatingText: '' },
              EmailError: { text: '' },
              MultiChoice: { style: {}, selectedStyle: {} },
            }}
          /> */}

          {/* <Survey
            questId="c-348f74bf-0392-46ab-8dd3-9dfc1d0d0f73"
            token={token}
            userId={userId}
            heading="How was your experience?"
            subHeading="Welcome back, Please complete your details"
            itemsPerPage={2}
            ratingType="star"
            showFooter={true}
            styleConfig={{
              Heading: {},
              Description: {},
              Form: {},
              Label: {},
              Input: {},
              PrimaryButton: {},
              SecondaryButton: {},
              Footer: {},
              TopBar: {},
              Rating: { LeftRatingText: '', RightRatingText: '' },
              EmailError: { text: '' },
              MultiChoice: { style: {}, selectedStyle: {} },
            }}
          /> */}
          {/* <Search
            userId={userId}
            token={token}
            questId="c-3b63adc6-4778-4dc9-8279-faa3c6ebba3d"
            open={true}
            showFooter={true}
            styleConfig={{
              Form: {},
              Heading: {},
              Description: {},
              Input: {},
              Label: {},
              Footer: {},
              Icon: {},
              listHover: {
                background: '',
                iconBackground: '',
                Heading: '',
                Description: '',
              },
            }}
          /> */}

        {/* <InlineFeedback
            questId="c-80b9ed47-b008-46f5-bbe6-2f556fcee503"
            userId={userId}
            token={token}
            type="emoji"
            styleConfig={{
              ActionButton: {},
              ActionContainer: {},
              ActionSelectedButton: {},
              Description: {},
              Footer: {},
              Form: {},
              Heading: {},
              IconStyle: {},
              MainHeading: {},
              SelectedIconStyle: {},
            }}
          /> */}
          {/* <Survey
            questId="c-73a6117c-ea29-4e25-8ea8-7ab38238e9d1"
            userId={userId}
            token={token}
            heading="Interactive Feedback Hub"
            subHeading="Empowering Seamless Communication"
            itemsPerPage={4}
            ratingType="star"
            showFooter={true}
            styleConfig={{
              Heading: {},
              Description: {},
              Form: {},
              Label: {},
              Input: {},
              PrimaryButton: {},
              SecondaryButton: {},
              Footer: {},
              TopBar: {},
              Rating: { LeftRatingText: '', RightRatingText: '' },
              EmailError: { text: '' },
              MultiChoice: { style: {}, selectedStyle: {} },
            }}
          /> */}
          {/* <DailyStreak
            userId={userId}
            token={token}
            pendingStreakImg=""
            filledStreakImg=""
            styleConfig={{ Heading: {}, Description: {}, Footer: {} }}
            stepDetails={[
              {
                  description: 'This is the longest streak you’ve ever head1',
                  title: 'Confident reader',
                  range: 3,
              },
              {
                  description: 'This is the longest streak you’ve ever head2',
                  title: 'Responsible reader',
                  range: 2,
              },
              {
                  description: 'This is the longest streak you’ve ever head3',
                  title: 'Serious learner',
                  range: 5,
              },
              {
                  description: 'This is the longest streak you’ve ever head4',
                  title: 'Absolute reader',
                  range: 3,
              },
            ]}
        /> */}
        {/* <LeaderBoard
          token={token}
          userId={userId}
          styleConfig={{
            Description: {},
            Footer: {},
            Form: {},
            Heading: {},
            IconStyle: {},
            IndexBackground: {},
            IndexColor: {},
            InnerBackground: {},
            MainHeading: {},
            PointsBackground: {},
            PointsColor: {},
            ProgressBarColor: {},
          }}
        /> */}
        {/* <ReferEarn_
          questId="c-3a4276f6-fb60-47e8-9e60-092329c23b2e"
          token={token}
          userId={userId}
          // To run below props run on the local react app
          isOpen={isOpen}
          heading="Copy"
      /> */}
      {/* <Referral
        questId="c-3a4276f6-fb60-47e8-9e60-092329c23b2e"
        token={token}
        userId={userId}
        showFooter={true}
        styleConfig={{
          Form: {},
          Heading: {},
          Description: {},
          Input: {},
          Label: {},
          TextArea: {},
          PrimaryButton: {},
          SecondaryButton: {},
          Modal: {},
          Footer: {},
          Icon: {},
        }}
      /> */}
      {/* <ShareArticle
          questId="c-b0578d03-a8ab-49a4-a234-110eae19f305"
          token={token}
          userId={userId}
          description="If you like this article share it with your friends"
          heading="Share this article"
        /> */}

        {/* <GetStarted
          userId={userId}
          token={token}
          questId="c-f43d309e-f6ed-483c-8872-bdb7b41548fd"
          template={1}
          headingText="Quickstart Guide"
          descriptionText="Get started with Quest and explore how Quest can take you to the next level"
          showProgressBar={true}
          arrowColor=""
          showFooter={true}
          ButtonType="Arrow"
          styleConfig={{
            Form: {},
            Heading: {},
            Description: {},
            PrimaryButton: {},
            SecondaryButton: {},
            Footer: {},
            Card: {},
            ProgressBar: { barColor: '', barParentColor: '' },
            CardContainer: {},
            Icon: {},
            Arrow: {
              Background: '',
              IconColor: '',
              CompletedBackground: '',
              CompletedIconColor: '',
            },
          }}
        /> */}

      {/* <OnBoarding
          questId="c-e3fbaae2-16ca-423f-8cec-69689a17934f"
          userId={userId}
          token={token}
          progress={['Personal Details']}
          controlBtnType="Buttons"
          headingScreen={[
            { name: 'Identity Insights', desc: 'Revealing dimensions beyond words' },
          ]}
          template="single-page"
          design={[
            [1, 2, 3],
          ]}
          singleChoose="modal1"
          multiChoice="modal2"
          styleConfig={{
            Form: {},
            Topbar: {},
            Heading: {},
            Description: {},
            Input: {},
            Label: {},
            TextArea: {},
            PrimaryButton: {},
            SecondaryButton: {},
            SingleChoice: { style: {}, selectedStyle: {} },
            MultiChoice: { style: {}, selectedStyle: {} },
            ProgressBar: {
              completeTabColor: '',
              currentTabColor: '',
              pendingTabColor: '',
            },
            Footer: {},
          }}
          getAnswers={() => {}}
          setAnswer={setAnswer}
          answer={answer}
          nextBtnText="Submit"
        /> */}

      {/* <OnBoarding
          questId="c-056d8d29-2623-41c6-b2c1-2db4375d644e"
          userId={userId}
          token={token}
          controlBtnType="Buttons"
          headingScreen={[
            {
              name: 'Identity Insightssss',
              desc: 'Revealing dimensions beyond words',
            },
          ]}
          singleChoose="modal1"
          multiChoice="modal2"
          styleConfig={{
            Form: {},
            Topbar: {},
            Heading: {},
            Description: {},
            Input: {},
            Label: {},
            TextArea: {},
            PrimaryButton: {},
            SecondaryButton: {},
            SingleChoice: { style: {}, selectedStyle: {} },
            MultiChoice: { style: {}, selectedStyle: {} },
            ProgressBar: {
              completeTabColor: '',
              currentTabColor: '',
              pendingTabColor: '',
            },
            Footer: {},
          }}
          getAnswers={() => {}}
          setAnswer={setAnswer}
          answer={answer}
        /> */}

      {/* <Tutorial
          userId={userId}
          token={token}
          questId="c-88a2b4bf-2a0e-4956-8cf8-04a7c0e1bd78"
          heading="Quest List"
          subheading="Discover our key features"
          styleConfig={{
            Form: {},
            TopBar: {},
            Heading: {},
            Description: {},
            Footer: {},
          }}
        /> */}

      {/* <GamifiedQuiz
          questId="c-c17a650f-c0e0-44da-985f-f2278a015be7"
          userId={userId}
          token={token}
          questionsPerSection={2}
          sectionSubHeading={['', 'Fill the details']}
          sectionHeading={['Fill the details', 'Fill the details']}
          showFooter={true}
          thanksPopUpFooter={true}
          styleConfig={{
            Heading: {},
            Input: {},
            PrimaryButton: {},
            SecondaryButton: {},
            Footer: {},
            FormContainer: {},
            Question: {},
            ThanksPopup: {},
            ThanksPopupHeading: {},
            ThanksPopupDescription: {},
            OptionsSelectedColor: {},
          }}
          gamifiedQuiz={true}
          questions={questions}
          setQuestions={setQuestions}
          functionOnSubmit={() => alert('submited')}
        /> */}
        
        {/* <CrossSelling
          questId="c-80398e9e-fbcf-492d-9fdb-c0e0cdda642d"
          token={token}
          userId={userId}
          expiryDate={0}
          showDays
          showFooter={true}
          gradientBackground={true}
          styleConfig={{
            BackgroundWrapper: {},
            Description: {},
            Footer: {},
            Form: {},
            Heading: {},
            PrimaryButton: {},
            SecondaryButton: {},
            Timer: { backgroundColor: '', primaryColor: '', secondaryColor: '' },
          }}
        /> */}

      {/* <FeedbackWorkflow
          isOpen
          userId={userId}
          token={token}
          questId='c-4004eb02-cc56-4c02-bb5a-3c4d42c8f432'
          GeneralFeedback={{
            heading: '',
            description: '',
            formHeading: '',
            formDescription: '',
          }}
          ReportBug={{
            heading: '',
            description: '',
            formHeading: '',
            formDescription: '',
          }}
          RequestFeature={{
            heading: '',
            description: '',
            formHeading: '',
            formDescription: '',
          }}
          ContactUs={{ heading: '', description: '', iconUrl: '' }}
          styleConfig={{
            Heading: {},
            Description: {},
            Form: { },
            Label: {},
            Input: {},
            PrimaryButton: {},
            SecondaryButton: {},
            Footer: {},
            listHeading: {},
            listDescription: {},
            Card: {},
            EmailError: { text: '' },
            listHover: {
              background: '',
              iconBackground: '',
              iconColor: '',
              Heading: '',
              Description: '',
              IconSize: '16px',
            },
            ThanksPopup: { ShowFooter: true },
          }}
          contactUrl="https://calendly.com/shubham-quest/chat"
          variation="test"
        /> */}

    {/* <HelpHub
      userId={userId}
      token={token}
      questId="c-a2b5782e-f3a1-4a33-bbca-8c6601a8ca62"
      styleConfig={{
      }}
      variation="test"
    /> */}

        {/* ------------------- API v2 Test Ended -------------------  */}

        {/* <ModularPreview /> */}

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
        {/* <SurveyPreview online={true}/> */}
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

        {/* <OnBoardingPreview online={true} /> */}

        {/* <GetStartedPreview online={false} /> */}

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
        {/* <PreviewLeaderboard online={false}/> */}
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
        {/* <ShareArticlePreview online={false}/> */}
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
        {/* <InlineFeedbackPreview online={false} /> */}

        {/* <Walkthrough
            isOpen={isOpen}
            id="app"
            steps={[
              {
                selector: '.gs-single-card-dropDown',
                data: {title: 'First Tab', description: 'Click on this'},
              },
              {
                selector: '.gs-heading-div',
                data: {title: 'Second Tab', description: 'Click on this'},
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
        /> */}



      </QuestProvider>
      {/* < div style={{height: 1999}}/> */}
    </div>
  );
}

export default App;
