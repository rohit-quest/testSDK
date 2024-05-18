import { useState } from "react";
import OnBoardingOff from "./OfflineComponent";
import OnBoarding from "./Onboarding";
import { QuestProvider } from "../QuestWrapper";
import { answer } from "../QuestForm/response";
import Toast from "../toast2/Toast";

export const apiKey = "k-e6ec8094-6eef-4e80-a804-112a63607bf5";
export const apiSecret = "s-70996671-ebe3-4b38-a528-64f167e8146921a53d84-45c8-4996-8904-9a34dc27ddb7";
export const entityId = "e-5768fd26-d226-4ac1-81e6-3c99427f3fb3";
export const userId = "u-88350caa-4080-4505-a169-09f3f15e83b7";
export const questId = "q-e1f5a174-4c3d-4dd1-949c-5547c1ec5f3e";
export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTg4MzUwY2FhLTQwODAtNDUwNS1hMTY5LTA5ZjNmMTVlODNiNyIsImlhdCI6MTcxNTI1MTI5OSwiZXhwIjoxNzE1ODU2MDk5fQ.ZdLtIH5rvbRd3OtVXMFvuvYSXOireP1-ddZxR7rAqTg";

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
        required: true,
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
        required: true,
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
        required: true,
        linkTitle: "",
        linkUrl: "",
        manualInput: false,
        placeholder: "",
      },
      {
        type: "USER_INPUT_SINGLE_CHOICE",
        question: "Your hobbies?",
        options: ["Playing", "Coding", "Gaming"],
        criteriaId: "ec-87fb0e54-c0e3-4fad-a865-37da2f9d68fb",
        required: true,
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
        required: true,
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
          progress={["person", "persn 2", "person 3", "person 4"]}
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
          template='multi-question'
          // template="single-question"
          singleChoose="modal3"
          multiChoice="modal2"
          design={[[8, 7, 6], [5], [4, 3], [2, 1]]}
          // progressBarMultiLine = {true}
          // design={[]}
          controlBtnType="Buttons"
          customComponents={<CustomButton />}
          getAnswers={printAnswer}
          // screenHeight=""
          // progressBarType="modal1"
          styleConfig={{ Form: {background:'red'}, Footer: {FooterStyle:{background: 'blue'},FooterIcon:{color: 'green'},FooterText:{color: 'yellow'}} }}
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
      singleChoose="modal1"
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
        Form: {
          backgroundColor: "red"
        },
        ProgressBar: {
          completeTabColor: "red",
          currentTabColor: "green",
          pendingTabColor: "blue",
        },
      }}
    />
  );
}
