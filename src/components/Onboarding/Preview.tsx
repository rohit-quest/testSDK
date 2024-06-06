import { useState } from "react";
import OnBoardingOff from "./OfflineComponent";
import OnBoarding from "./Onboarding";
import { QuestProvider } from "../QuestWrapper";
import { answer } from "../QuestForm/response";
import Toast from "../toast2/Toast";

export const apiKey = "k-6fe7e7dc-ac8f-44a1-8bbf-a1754ddf88be";
export const apiSecret =
  "s-3c35ebcb-c752-4c3c-8ce3-e6460ebbc9d479a7e122-d06b-4243-bbfa-e0889987f6c0";
export const entityId = "e-0000000000";
export const questId = "c-8e9e5ccf-9fde-46e0-bac7-1eec4524d80d";
export const userId = "u-8268f5e1-f5a1-440c-a333-0f5578a73847";
export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTgyNjhmNWUxLWY1YTEtNDQwYy1hMzMzLTBmNTU3OGE3Mzg0NyIsImlhdCI6MTcxNzYyMTcwNywiZXhwIjoxNzE4MjI2NTA3fQ.9jl54rhfpBv6noypbc_4aRIl05mCCJRFUZF9r5i4DQQ";

export default function OnBoardingPreview({
  online = true,
}: {
  online?: boolean;
}) {
  const [answer, setAnswer] = useState<answer>([]);
  function printAnswer() {
    Toast.success({
      text: "You have submitted the form successfully you can find more on Quest admin dashboard",
    });
  }

  // Mock CustomButton Component
  const CustomButton = () => <button>Submit</button>;

  const [state, setState] = useState({
    t: 0,
    offlineFormData: [
      {
        type: "USER_INPUT_TEXT",
        question: "First name",
        options: [""],
        criteriaId: "ec-2733e056-350c-40d9-acfd-833882e99117",
        required: false,
        linkTitle: "",
        linkUrl: "",
        manualInput: false,
        placeholder: "",
      },
      {
        type: "USER_INPUT_MULTI_CHOICE",
        question: "Your hobbies?",
        options: ["Playing", "Coding", "Gaming"],
        criteriaId: "ec-87fb0e54-c0e3-4fad-a865-37da2f9d68fb",
        required: false,
        linkTitle: "",
        linkUrl: "",
        manualInput: false,
        placeholder: "",
      },
      {
        type: "USER_INPUT_TEXT",
        question: "Last name",
        options: [""],
        criteriaId: "ec-77026e10-1bdf-45fd-8523-29733212a359",
        required: true,
        linkTitle: "",
        linkUrl: "",
        manualInput: false,
        placeholder: "",
      },
      {
        type: "USER_INPUT_DATE",
        question: "Date Of Birth",
        options: [""],
        criteriaId: "ec-84192fef-c917-410f-9bc5-d4ace713aaea",
        required: false,
        linkTitle: "",
        linkUrl: "",
        manualInput: false,
        placeholder: "",
      },
      {
        type: "USER_INPUT_TEXT",
        question: "What is your company name?",
        options: [""],
        criteriaId: "ec-bf34d35d-11bd-4ebd-a1e1-76a81e1beec1",
        required: false,
        linkTitle: "",
        linkUrl: "",
        manualInput: false,
        placeholder: "",
      },

      {
        type: "USER_INPUT_TEXT",
        question: "What is your role in the company?",
        options: [""],
        criteriaId: "ec-d8a11765-2493-40da-ad76-2d9f55ac8d9f",
        required: false,
        linkTitle: "",
        linkUrl: "",
        manualInput: false,
        placeholder: "",
      },
    ],
  });

  if (online)
    return (
      <QuestProvider
        apiKey={apiKey}
        apiSecret={apiSecret}
        entityId={entityId}
        featureFlags={{}}
        apiType="STAGING"
        themeConfig={
          {
            // backgroundColor: "blue",
            // borderColor: "red",
            // buttonColor: "green",
            // primaryColor: "pink",
            // secondaryColor: "gray",
            // fontFamily: "cursive"
          }
        }
      >
        <OnBoarding
          userId={userId}
          questId={questId}
          answer={answer}
          setAnswer={setAnswer}
          token={token}
          
          // uniqueUserId={Date.now().toString()}
          // uniqueEmailId={Date.now().toString()}
          // answerFontSize="14px"
          // template={''}
          // progress={["Personal sdrerwtr", "Professional", "Additional",]}

          // text="Go Back"
          // text="Submit and Continue"
          // color=""
          // bgColor="#fff"
          // showFooter={false}
          // controlBtnType="Arrow"
          // headingSize="24px"
          // descSize="18px"
          // inputFieldType={{
          //   "ec-xxxxxxxxxxxxxxxxx": "textArea"
          // }}
          // btnColor=""
          // btnSize="200px"
          // inputBgColor=""
          // inputBorder="1px solid #6525B3"
          progress={["person", "persn 2", 'persn3', 'persn4']}
          headingScreen={[
            {
              name: "Identity Insights",
              desc: "Revealing dimensions beyond words",
            },
            {
              name: "Professional Details",
              desc: "Tell us more about your company",
            },
            {
              name: "Professional Details",
              desc: "Tell us more about your company",
            },
            {
              name: "Professional Details",
              desc: "Tell us more about your company",
            },
          ]}
          styleConfig={{
            MultiChoice:{
              isLabel:false
            }
          }}
          
          template='single-page'
          // template="single-question"
          singleChoose="modal3"
          multiChoice="modal2"
          // design={[[3,2],[1,4],[5,6],[7,8,9,10]]}
          // progressBarMultiLine = {true}
          // design={[]}
          controlBtnType="Buttons"
          customComponents={<CustomButton />}
          getAnswers={printAnswer}
        // screenHeight=""
        // progressBarType="modal1"
        // styleConfig={{ Form: {background:'red'}, Footer: {FooterStyle:{background: 'blue'},FooterIcon:{color: 'green'},FooterText:{color: 'yellow'}} }}
        />
      </QuestProvider>
    );

  return (
    <OnBoardingOff
      answer={answer}
      setAnswer={setAnswer}
      // answerFontSize="14px"
      progress={["Personal", "Professional", "Additional"]}
      // text="Go Back"
      // text="Submit and Continue"
      // color=""
      // bgColor="#fff"
      controlBtnType="Arrow"
      // headingSize="24px"
      // descSize="18px"
      // inputFieldType={{
      //   "ec-xxxxxxxxxxxxxxxxx": "textArea"
      // }}
      // btnColor=""
      // btnSize="200px"
      // inputBgColor=""
      // inputBorder="1px solid #6525B3"
      template='multi-question'
      // template="multi-question"
      singleChoose="modal3"
      multiChoice="modal1"
      design={[
        [1, 2],
        [3, 4],
        [5, 6],
      ]}
      headingScreen={[
        { name: "Tell us about yourself", desc: "this is description" },
        {
          name: "Tell us more about your company",
          desc: "description for this ",
        },
        {
          name: "A little more will help us guide you the best",
          desc: "description for this ",
        },
      ]}
      customComponents={<CustomButton />}
      getAnswers={printAnswer}
      // screenHeight=""
      // progressBarType="modal1"
      offlineFormData={state.offlineFormData}
      styleConfig={{
        MultiChoice: {
          selectedStyle: { borderColor: 'blue', color: 'red', accentColor: 'green' },
          // isLabel: false,
        },
        SingleChoice: {
          // selectedStyle:{background:'blue'},
          hoverBackground: 'red'
        }
      }}
    />
  );
}
