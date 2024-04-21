import React, { useEffect, useState } from "react";
import { QuestProvider } from "../QuestWrapper";
import HelpHub from "./HelpHub";
import HelpHubOffline from "./HelpHubOffline";
import { QuestCriteriaWithStatusType, QuestTypes } from "./HelpHub.type";
// import Survey from './Survey';
// import SurveyOffline from './OfflineComponent';

export const apiKey = "k-e6ec8094-6eef-4e80-a804-112a63607bf5";
export const apiSecret =
  "s-1719a62c-5ca6-418f-8d29-f1b2328936d2ff1db443-9ee5-4eee-99f0-3532bd2e7893";
export const entityId = "e-5768fd26-d226-4ac1-81e6-3c99427f3fb3";

export default function HelpHubPreview({ online = true }) {
  const [state, setState] = useState([
    {
      type: "USER_INPUT_TEXTAREA",
      question: "Message",
      options: [],
      criteriaId: "ec-6e6ece4b-228c-42ba-bb36-45fcdc50b28b",
      required: true,
      placeholder: "Enter your Message",
    },
    {
      type: "USER_INPUT_EMAIL",
      question: "Email",
      options: [],
      criteriaId: "ec-8ce32ce1-17f4-4fd8-ba4e-51d0b5512e2d",
      required: true,
      placeholder: "Enter your Email",
    },
    {
      type: "RATING",
      question: "How do you like our App?",
      options: [],
      criteriaId: "ec-ad7a31e7-d710-416c-8fbc-40e50a968a9a",
      required: true,
    },
    {
      type: "USER_INPUT_TEXT",
      question: "Name",
      options: [],
      criteriaId: "ec-fd1f7e9e-2d6b-4e71-aa4b-c89f97d5e98a",
      required: true,
      placeholder: "Enter your Name",
    },
    {
      type: "USER_INPUT_SINGLE_CHOICE",
      question: "One",
      options: ["one", "twwo", "three", "four"],
      criteriaId: "ec-cb60f960-0ef0-4324-9ca6-0decae5db64e",
      required: true,
      placeholder: "Enter your Name",
    },
    {
      type: "USER_INPUT_MULTI_CHOICE",
      question: "Multi",
      options: ["one", "twwo", "three", "four"],
      criteriaId: "ec-cb60f960-0ef0-4324-9ca6-0decae5db64d",
      required: true,
      placeholder: "Enter your Name",
    },
    {
      type: "USER_INPUT_DATE",
      question: "DOB",
      options: [],
      criteriaId: "ec-cd3b266f-c22a-4c8f-910c-a31c0fda01f3",
      required: true,
      placeholder: "Enter your Name",
    },
    {
      type: "USER_INPUT_PHONE",
      question: "Phone",
      options: [],
      criteriaId: "ec-cd3b266f-c22a-4c8f-910c-a31c0fda01f4",
      required: true,
      placeholder: "Enter your Name",
    },
  ]);
  // setIntervals(() => {
  //     state.pop();
  //     setState([...state]);
  //     // console.log(state)
  // }, 2000);
  const [parentQuest, setParentQuest] = useState<QuestTypes>({
    allowRepeatEntries: false,
    categories: [],
    childQuestIDs: [
      "q-6958228a-5238-48f0-9394-6d146f540324",
      "q-ecbd5453-8dee-45ee-9e09-312af325977b",
      "q-9c7cefdf-41cb-4a66-81cd-00524ff3a4fc",
      "q-98bf85f5-c135-48e0-bbab-1b5cc363ce6b",
    ],
    conditionRelations: [],
    conditions: [],
    createdAt: "2024-03-20T19:20:56.951Z",
    dependentQuests: [],
    description: "HelpHub",
    eligibilityCriterias: ["ec-05672184-f4c8-47c6-a765-789f06632860"],
    endsAt: "1774034455603",
    entityId: "e-5768fd26-d226-4ac1-81e6-3c99427f3fb3",
    hasReferral: false,
    imageURL: "",
    isDeleted: false,
    isDependentCriterias: false,
    isDependentQuests: false,
    isPrivate: false,
    minXPThreshold: 0,
    priority: 1,
    questId: "q-default-helphub",
    referralXP: 0,
    rewards: [],
    skills: [],
    status: "INACTIVE",
    title: "Helphub",
    type: "HELPHUB",
    visibility: "PUBLIC",
    xp: 10,
    _id: "65fb3718e521db098e49363a",
    __v: 0,
  });

  const [childQuest, setChildQuest] = useState<QuestCriteriaWithStatusType[][]>(
    [
      [
          {
            "type": "RATING",
            "question": "How do you like our App?",
            "description": "",
            "options": [],
            "criteriaId": "ec-9a22b6e1-4a46-4c2b-9b31-b7825561f290",
            "required": true,
            "linkTitle": "",
            "linkUrl": "",
            "manualInput": false,
            "completed": true,
            "answer": "",
            "createdAt": "2024-03-20T19:20:56.996Z",
            imageUrl: ""
          }
      ],
      [
          {
            "type": "VIEW_ONLY_TEXT",
            "question": "How can I assist you tomorrow?",
            "description": "",
            "options": [],
            "criteriaId": "ec-295f32f2-3a32-4437-ba33-b810ca760888",
            "required": true,
            "linkTitle": "",
            "linkUrl": "",
            "manualInput": false,
            "completed": false,
            "answer": "You can complete your user information details by sharing the details asked in the form",
            "createdAt": "2024-03-20T19:20:57.017Z",
            imageUrl: ""
          },
          {
            "type": "VIEW_ONLY_TEXT",
            "question": "How can I assist you day after tomorrow?",
            "description": "",
            "options": [],
            "criteriaId": "ec-48b4fbee-2d3f-4788-93d7-36bfa760dc32",
            "required": true,
            "linkTitle": "",
            "linkUrl": "",
            "manualInput": false,
            "completed": false,
            "answer": "You can complete your user information details by sharing the details asked in the form",
            "createdAt": "2024-03-20T19:20:57.017Z",
            imageUrl: ""
          },
          {
            "type": "VIEW_ONLY_TEXT",
            "question": "How can I assist you today?",
            "description": "",
            "options": [],
            "criteriaId": "ec-5a8b090d-852c-4892-adf8-7f7cf1915e74",
            "required": true,
            "linkTitle": "",
            "linkUrl": "",
            "manualInput": false,
            "completed": false,
            "answer": "You can complete your user information details by sharing the details asked in the form",
            "createdAt": "2024-03-20T19:20:57.016Z",
            imageUrl: ""
          }
      ],
      [
          {
            "type": "LINK_OPEN_READ",
            "question": "",
            "description": "Conect with us to explore more",
            "options": [],
            "criteriaId": "ec-132ab04f-7fc7-40d7-b4bc-238c898b7b4a",
            "required": true,
            "linkTitle": "Updates3",
            "linkUrl": "https://www.linkedin.com/company/questlabss/",
            "manualInput": false,
            "completed": true,
            "answer": "",
            "createdAt": "2024-03-20T19:20:57.040Z",
            imageUrl: ""
          },
          {
            "type": "LINK_OPEN_READ",
            "question": "",
            "description": "Play with our pre-made templates and create your frame",
            "options": [],
            "criteriaId": "ec-9f567862-dca8-4dea-9592-79459563ac66",
            "required": true,
            "linkTitle": "Update2",
            "linkUrl": "https://main.d2h2uj2sjo2c2h.amplifyapp.com/",
            "manualInput": false,
            "completed": true,
            "answer": "",
            "createdAt": "2024-03-20T19:20:57.040Z",
            imageUrl: ""
          },
          {
            "type": "LINK_OPEN_READ",
            "question": "",
            "description": "AI-Powered User Experiences to Increase in-app Adoption, Engagement & Revenue ",
            "options": [],
            "criteriaId": "ec-c6b5bf80-71b7-412e-a157-7a4402b885cc",
            "required": true,
            "linkTitle": "Update1",
            "linkUrl": "https://www.questlabs.ai/",
            "manualInput": false,
            "completed": true,
            "answer": "",
            "createdAt": "2024-03-20T19:20:57.039Z",
            imageUrl: ""
          }
      ],
      [
          {
            "type": "LINK_OPEN_READ",
            "question": "",
            "description": "Play with our pre-made templates and create your frame",
            "options": [],
            "criteriaId": "ec-4ec721c0-159b-4062-b4f2-29c51803b2d1",
            "required": true,
            "linkTitle": "Tasks-React Playground",
            "linkUrl": "https://main.d2h2uj2sjo2c2h.amplifyapp.com/",
            "manualInput": false,
            "completed": true,
            "answer": "",
            "createdAt": "2024-03-20T19:20:57.061Z",
            imageUrl: ""
          },
          {
            "type": "LINK_OPEN_READ",
            "question": "",
            "description": "Conect with us to explore more",
            "options": [],
            "criteriaId": "ec-848fcb3b-4b50-4711-b9bb-f4113611a435",
            "required": true,
            "linkTitle": "Tasks-Quest Linkedin",
            "linkUrl": "https://www.linkedin.com/company/questlabss/",
            "manualInput": false,
            "completed": true,
            "answer": "",
            "createdAt": "2024-03-20T19:20:57.061Z",
            imageUrl: ""
          },
          {
            "type": "LINK_OPEN_READ",
            "question": "",
            "description": "AI-Powered User Experiences to Increase in-app Adoption, Engagement & Revenue ",
            "options": [],
            "criteriaId": "ec-d6ea445b-2095-4e41-8ea7-33f1da282b47",
            "required": true,
            "linkTitle": "Tasks-QuestLabs",
            "linkUrl": "https://www.questlabs.ai/",
            "manualInput": false,
            "completed": true,
            "answer": "",
            "createdAt": "2024-03-20T19:20:57.061Z",
            imageUrl: ""
          }
      ]
  ]
  );

  if (online) {
    return (
      <QuestProvider
        apiKey={apiKey}
        apiSecret={apiSecret}
        entityId={entityId}
        apiType="STAGING"
        themeConfig={
          {
            // backgroundColor: "wheat",
            // borderColor: "red",
            // buttonColor: "pink",
            // fontFamily: "cursive",
            // primaryColor: "red",
            // secondaryColor: "green",
          }
        }
      >
        <HelpHub
          token={
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTg4MzUwY2FhLTQwODAtNDUwNS1hMTY5LTA5ZjNmMTVlODNiNyIsImlhdCI6MTcxMzE2NDEzOCwiZXhwIjoxNzEzNzY4OTM4fQ.tZENNsLVFUkWOMcmoOqKEVvAx97PLBZKDZGzhARP_tc"
          }
          userId="u-88350caa-4080-4505-a169-09f3f15e83b7"
          onlineComponent={online}
          // contentConfig={{
          //   Chat: {
          //     heading: "Chat heading",
          //     subHeading: "Chat Sub Heading",
          //   },
          //   Help: {
          //     heading: "Help Head",
          //     subHeading: "Help Sub Head",
          //   },
          //   Home: {
          //     box1: {
          //       heading: "B1 Haed",
          //       image: "Image",
          //       subHeading: "B1 Sub Head",
          //     },
          //     box4: {
          //       heading: "B4 Head",
          //       subHeading: "B4 sub head",
          //     },
          //     box5: {
          //       heading: "b5 had",
          //       subHeading: "b5 sub head",
          //     },
          //     chatButton: {
          //       heading: "chat head",
          //       subHeading: "chat sub head",
          //     },
          //   },
          //   Tasks: {
          //     heading: "atsk head",
          //     subHeading: "task sub head",
          //   },
          //   Updates: {
          //     heading: "uo head",
          //     subHeading: "up sub head",
          //   },
          // }}
          styleConfig={{
            Main: {
              height: "600px",
              width: "680px",
            },
            // Chat: {
            //   Card: {
            //     Heading: {
            //       color: "red",
            //     },
            //     SubHeading: {
            //       color: "yellow",
            //     },
            //   },
            //   Topbar: {
            //     Heading: {
            //       color: "red",
            //     },
            //     SubHeading: {
            //       color: "yellow",
            //     },
            //   },
            //   Form: {
            //     // color: "red",
            //   },
            // },
            // Footer: {
            //   // background: "red",
            // },
            // Help: {
            //   Card: {
            //     Heading: {
            //       color: "red",
            //     },
            //     SubHeading: {
            //       color: "blue",
            //     },
            //   },
            //   Form: {
            // color: "pink",
            //     // background: "red",
            //   },
            //   Searchbox: {
            //     color: "red",
            //     background: "red",
            //   },
            //   Topbar: {
            //     Heading: {
            //       color: "green",
            //     },
            //     SubHeading: {
            //       color: "greenyellow",
            //     },
            //   },
            // },
            // Home: {
            //   BannerText: {
            //     color: "red",
            //   },
            //   Button: {
            //     color: "red",
            //     background: "green",
            //   },
            //   Card: {
            //     // color: "red",
            //     // background: "red",
            //     // backgroundColor: "red",
            //   },
            //   Form: {
            //     // color: "red",
            //     // background: "red",
            //     // backgroundColor: "red",
            //   },
            //   Heading: {
            //     // color: "red",
            //     // background: "red",
            //   },
            //   SubHeading: {
            //     color: "red",
            //     background: "red",
            //   },
            // },
            // Tasks: {
            //   Card: {
            //     // Heading: {
            //     //   color: "red",
            //     //   background: "yellow",
            //     // },
            //     // SubHeading: {
            //     //   color: "red",
            //     //   background: "yellow",
            //     // },
            //   },
            //   Form: {
            //     // color: "red",
            //     // background: "yellow",
            //   },
            //   Searchbox: {},
            //   Topbar: {
            //     Heading: {
            //       color: "red",
            //       background: "yellow",
            //     },
            //     SubHeading: {
            //       color: "green",
            //       background: "yellow",
            //     },
            //   },
            // },
            // Updates: {
            //   Card: {
            //     // Heading: {
            //     //   color: "red",
            //     //   background: "yellow",
            //     // },
            //     // SubHeading: {
            //     //   color: "yellow",
            //     //   background: "red",
            //     // },
            //   },
            //   Form: {
            //     // color: "red",
            //     // background: "yellow",
            //   },
            //   // Searchbox
            //   Topbar: {
            //     Heading: {
            //       // color: "red",
            //       // background: "yellow",
            //     },
            //     SubHeading: {
            //       // color: "red",
            //       // background: "yellow",
            //     },
            //   },
            // },
          }}
          // claimStatusUpdates={claimStatusUpdates}
          // setClaimStatusUpdates={setClaimStatusUpdates}
        />
      </QuestProvider>
    );
  }

  return (
    <QuestProvider
      apiKey={apiKey}
      apiSecret={apiSecret}
      entityId={entityId}
      apiType="STAGING"
    >
      <HelpHubOffline
        token={
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTg4MzUwY2FhLTQwODAtNDUwNS1hMTY5LTA5ZjNmMTVlODNiNyIsImlhdCI6MTcxMjIwMjIxMCwiZXhwIjoxNzEyODA3MDEwfQ.yCkWcD5yVykmqAmiRKrzdTmqVsptlfq2VPBO4eztNYY"
        }
        userId="u-88350caa-4080-4505-a169-09f3f15e83b7"
        // ParentQuest={}
        // ChildQuest={}
        styleConfig={{
          Main: {
            height: "400px",
            width: "580px",
          },
        }}
        ParentQuest={parentQuest}
        ChildQuest={childQuest}
        onlineComponent={online}
        // claimStatusUpdates={claimStatusUpdates}
        // setClaimStatusUpdates={setClaimStatusUpdates}
      />
    </QuestProvider>
  );
}
