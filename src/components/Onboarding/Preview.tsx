import React, { useState } from 'react'
import OnBoardingOff from './OfflineComponent'
import OnBoarding from './Onboarding'
import { QuestProvider } from '../QuestWrapper';
import { answer } from '../QuestForm/response';
import showToast from '../toast/toastService';
export const questId = 'q-2b37975b-30f7-4572-a5f4-c354439b3970';
export const apiKey = 'k-68a0c6b8-b27f-49c6-a315-b0c9cba15bf4'
export const apiSecret = 's-5bafb222-c5bd-4c14-9dfe-9d72fb5e275b9cacf740-3c56-44e9-afe3-b1c0aa6a8a42'
export const entityId = 'e-d97d4353-c517-4ce3-a5e0-f81b3dbb80b5'
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWUzYmVhMWQzLTE5MTctNGI5YS1iODU1LWYxM2Q0N2RmZTJlZCIsImlhdCI6MTY5NjY3MDA5OCwiZXhwIjoxNzI4MjI3Njk4fQ.E_hQ-o8E4jbAMmuJBqwwWFebr9_NoSIykGq_CavR7kE'
export const userId = 'u-e3bea1d3-1917-4b9a-b855-f13d47dfe2ed'

export default function OnBoardingPreview({ online = true }: {online?: boolean}) {

  const [answer, setAnswer] = useState<answer>([])
  function printAnswer() {
    showToast.success({ text: "You have submitted the form successfully you can find more on Quest admin dashboard" })
  }

  // Mock CustomButton Component
  const CustomButton = () => (
    <button>
      Submit
    </button>
  );

  const [state,setState] = useState({t:0,
    offlineFormData : [
      {
        "type": "USER_INPUT_TEXT",
        "question": "First name",
        "options": [""],
        "criteriaId": "ec-2733e056-350c-40d9-acfd-833882e99117",
        "required": true,
        "linkTitle": "",
        "linkUrl": "",
        "manualInput": false,
        placeholder: "",
      },
      {
        "type": "USER_INPUT_TEXT",
        "question": "Last name",
        "options": [""],
        "criteriaId": "ec-77026e10-1bdf-45fd-8523-29733212a359",
        "required": true,
        "linkTitle": "",
        "linkUrl": "",
        "manualInput": false,
        placeholder: ""
      },
      {
        "type": "USER_INPUT_DATE",
        "question": "Date Of Birth",
        "options": [""],
        "criteriaId": "ec-84192fef-c917-410f-9bc5-d4ace713aaea",
        "required": true,
        "linkTitle": "",
        "linkUrl": "",
        "manualInput": false,
        placeholder: "",
      },
      {
        "type": "USER_INPUT_TEXT",
        "question": "What is your company name?",
        "options": [""],
        "criteriaId": "ec-bf34d35d-11bd-4ebd-a1e1-76a81e1beec1",
        "required": true,
        "linkTitle": "",
        "linkUrl": "",
        "manualInput": false,
        placeholder: ""
      },
      {
        "type": "USER_INPUT_MULTI_CHOICE",
        "question": "Your hobbies?",
        "options": [ "Playing", "Coding", "Gaming"],
        "criteriaId": "ec-87fb0e54-c0e3-4fad-a865-37da2f9d68fb",
        "required": true,
        "linkTitle": "",
        "linkUrl": "",
        "manualInput": false,
        placeholder: ""
      },
      {
        "type": "USER_INPUT_TEXT",
        "question": "What is your role in the company?",
        "options": [""],
        "criteriaId": "ec-d8a11765-2493-40da-ad76-2d9f55ac8d9f",
        "required": true,
        "linkTitle": "",
        "linkUrl": "",
        "manualInput": false,
        placeholder: ""
      }
    ]
    })

    // setTimeout(() => {
    //   state.offlineFormData.pop();
    //   setState(c=>({...c}))
    // }, 2000);

  if (online)
    return (
      <QuestProvider
        apiKey={apiKey}
        apiSecret={apiSecret}
        entityId={entityId}
        featureFlags={{}}
        apiType="PRODUCTION"
      >
        <OnBoarding
          userId={userId}
          questId={questId}
          answer={answer}
          setAnswer={setAnswer}
          token={token}
          // answerFontSize="14px"
          // template={1}
          progress={["Personal sdrerwtr", "Professional", "Additional",]}
          // text="Go Back"
          // text="Submit and Continue"
          // color=""
          // bgColor="#fff"
          controlBtnType="Buttons"
          // headingSize="24px"
          // descSize="18px"
          // inputFieldType={{
          //   "ec-xxxxxxxxxxxxxxxxx": "textArea"
          // }}
          // btnColor=""
          // btnSize="200px"
          // inputBgColor=""
          // inputBorder="1px solid #6525B3"
          singleChoose="modal3"
          multiChoice="modal1"
          design={[[1, 2], [3, 4], [5, 6]]}
          // progressBarMultiLine = {true}
          // design={[]}
          headingScreen={[{ name: "Tell us about yourself", desc: "this is description" },
          // { name: "Tell us more about your company", desc: "description for this " },
          // { name: "A little more will help us guide you the best", desc: "description for this " }
        ]
        }
          customComponents={<CustomButton />}
          getAnswers={printAnswer}
          // screenHeight=""
          // progressBarType="modal1"
          
        />
      </QuestProvider>
    )
  return (
    <OnBoardingOff
      answer={answer}
      setAnswer={setAnswer}
      answerFontSize="14px"
      progress={["Personal", "Professional", "Additional",]}
      text="Go Back"
      // text="Submit and Continue"
      color=""
      bgColor="#fff"
      controlBtnType="Buttons"
      headingSize="24px"
      descSize="18px"
      inputFieldType={{
        "ec-xxxxxxxxxxxxxxxxx": "textArea"
      }}
      btnColor=""
      btnSize="200px"
      inputBgColor=""
      // inputBorder="1px solid #6525B3"
      singleChoose="modal2"
      multiChoice="modal1"
      design={[[1, 2], [3, 4], [5, 6]]}
      headingScreen={[{ name: "Tell us about yourself", desc: "this is description" },
      { name: "Tell us more about your company", desc: "description for this " },
      { name: "A little more will help us guide you the best", desc: "description for this " }]}
      customComponents={<CustomButton />}
      getAnswers={printAnswer}
      screenHeight=""
      progressBarType="modal1"
      offlineFormData={state.offlineFormData}
    />
  )
}
