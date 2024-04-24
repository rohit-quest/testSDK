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
import SurveyOffline from "./components/Feedback/OfflineComponent";
import Modal from "./components/Modules/Modal";
// import { NormalInput } from './components/Modules/Input'
import OnBoarding from "./components/Onboarding/Onboarding";
import DailyStreak from "./components/Streak/DailyStreak";
import ChallengesPreview from "./components/Challenges/ChallengesPreview";
import GamifiedQuizPreview from "./components/GamifiedQuiz/GamifiedQuizPreview";
import showToast from "./components/toast/toastService";
import Toast from "./components/toast2/Toast";
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
        themeConfig={
          {
            // backgroundColor: "black",
            // borderColor: "blue",
            // buttonColor: "green",
            //  primaryColor: "green",
            // secondaryColor: "blue",
            // fontFamily: "cursive"
          }
        }
      >
        {/* <TutorialPreview online={false} /> */}

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

        {/* <VisitStreak color={'white'} backgroundColor={'black'}/> */}
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
        {/* <OnBoardingPreview online={true} /> */}


        {/* <GetStartedPreview online={false} /> */}

        {/* <Modal isOpen={isOpen} onClose={()=> setIsOpen(false)}>
  <h1>ddddddddd</h1>
</Modal> */}
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
        <FeedbackWorkflowPreview online={true} />
        {/* <ChallengesPreview online={true} /> */}

        Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus nam, ut modi reprehenderit architecto vero quasi debitis, praesentium nihil hic voluptatem, fugit assumenda. A suscipit natus pariatur nisi consectetur nulla voluptates corrupti voluptatem officiis alias eveniet doloribus eos veritatis, quam dolorem praesentium, velit assumenda iusto rerum totam repellendus laudantium ratione est illum. Dolorum qui ut beatae esse odit rerum! Culpa reiciendis facilis consequuntur harum nesciunt, veritatis consectetur incidunt in exercitationem velit, modi natus doloribus ipsa numquam aut. Quo, ipsam fuga consectetur doloremque nesciunt ullam quam expedita accusantium minima sed eum repellendus reprehenderit eos laborum voluptatum itaque numquam maxime quae exercitationem.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti vel iusto, perferendis voluptatum aliquid eaque temporibus similique commodi saepe quidem, obcaecati, fugit quisquam placeat a quos doloremque reiciendis ipsum perspiciatis cupiditate impedit nisi animi beatae nemo. Laboriosam rerum recusandae dignissimos minus? Sed perferendis dolor illo veritatis recusandae, nesciunt quo minima asperiores harum eaque, doloribus ipsum repellendus distinctio sequi delectus saepe magnam similique, omnis voluptatibus! Debitis nam eveniet doloremque perspiciatis sint numquam ipsum sunt aspernatur quam quas, deserunt iure deleniti aliquid minus culpa recusandae praesentium aliquam voluptates at inventore placeat in, corporis dolore! Optio tempora iusto obcaecati unde sequi excepturi dolorem, quae qui hic eaque esse assumenda, at error. Suscipit asperiores cum, corrupti adipisci vero minus laboriosam alias nobis mollitia? Neque, fuga dignissimos asperiores sequi, aut laudantium modi quae vel rerum ad optio, magnam ea alias tenetur ipsa obcaecati facilis nihil. Architecto, ad quo tempora sapiente distinctio non laboriosam laudantium numquam accusantium est neque maiores perferendis quia accusamus facere, reprehenderit mollitia provident? Voluptas accusamus quas laudantium qui, enim voluptates corporis fugiat ullam possimus magnam quo repellendus corrupti saepe eum repellat mollitia est sint nulla? Similique repellat laudantium vero soluta quaerat facilis consequatur quasi quis esse atque officia beatae tempora odit voluptas, nam architecto dolore, aperiam explicabo ducimus? Nulla laboriosam autem dolor eveniet atque error distinctio inventore earum, optio repellendus corporis laudantium animi suscipit voluptatibus ex nobis saepe veritatis ut modi natus enim culpa soluta commodi. Incidunt fugit officiis animi, saepe, alias ipsa a molestiae voluptates laborum commodi explicabo earum vel optio rem harum cupiditate voluptate, provident ducimus asperiores dignissimos illo sapiente. Repellendus nihil qui necessitatibus doloribus labore beatae. Quas iusto quisquam molestiae, accusamus dolorum tenetur obcaecati aliquid soluta nostrum placeat mollitia aliquam provident asperiores nisi nulla saepe eum rerum culpa repellendus! Id aut eaque maiores quam omnis maxime est consectetur ad, nemo sapiente, sit nesciunt corrupti porro iste nulla esse autem tempora facilis, aliquid doloribus? Necessitatibus sequi debitis totam quae consequatur rerum nam odio nemo autem, optio libero sint! Repellat pariatur nostrum, fugit dignissimos qui alias voluptatibus adipisci placeat sunt quibusdam nobis iste quae doloremque delectus itaque ex similique aliquid fugiat at, neque quaerat quas. Nam veniam velit, non quis repellendus aspernatur possimus voluptates esse eum facere quia fugiat iure repudiandae consectetur aperiam error laborum dicta laboriosam a at aliquam tempora tempore quibusdam dolorum! Tempora aliquam harum eos est blanditiis repellat rem quidem corporis mollitia nisi nihil, asperiores rerum natus? Consectetur dolores sunt iste magnam repellendus expedita voluptatum cumque, debitis atque autem. Accusamus debitis natus labore expedita excepturi, eius unde, optio architecto tenetur inventore dolor libero reprehenderit amet accusantium. Porro et delectus natus facilis dolore, deserunt, doloremque pariatur saepe praesentium doloribus modi rem mollitia? Vitae consectetur accusamus soluta quisquam, autem exercitationem, ea culpa deserunt, tempora commodi impedit officiis atque voluptates aliquid laborum expedita rem debitis quibusdam magni facere? Quo quia animi ex, magnam nostrum reprehenderit pariatur delectus at ipsam esse? Consectetur, quis magni illo voluptas qui totam veniam culpa iure fugiat harum voluptates repudiandae! Maiores consectetur aliquam rerum fugiat illum debitis!
        {/* <FeedbackPreview online={false} /> */}

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
      </QuestProvider>
    </div>
  );
}

export default App;