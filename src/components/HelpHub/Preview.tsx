import React, { useEffect, useState } from "react";
import { QuestProvider } from "../QuestWrapper";
import HelpHub from "./HelpHub";
import HelpHubOffline from "./HelpHubOffline";
import { QuestCriteriaWithStatusType, QuestTypes } from "./HelpHub.type";
// import Survey from './Survey';
// import SurveyOffline from './OfflineComponent';

export const apiKey = "k-6fe7e7dc-ac8f-44a1-8bbf-a1754ddf88be";
export const apiSecret =
  "s-1719a62c-5ca6-418f-8d29-f1b2328936d2ff1db443-9ee5-4eee-99f0-3532bd2e7893";
export const entityId = "e-0000000000";

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
      "q-12a6240b-91af-4d9f-97fd-aec0f3d6880b",
      "q-47fb257f-752f-4f11-a761-51e93d82b011",
      "q-ce505afd-1239-4564-822b-32c195ab4f06",
      "q-676666f4-60c7-4aff-81a1-7edca2e1c85a",
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
          type: "RATING",
          question: "How do you like our App?",
          description: "",
          options: [],
          criteriaId: "ec-9a22b6e1-4a46-4c2b-9b31-b7825561f290",
          required: true,
          linkTitle: "",
          linkUrl: "",
          manualInput: false,
          completed: true,
          answer: "",
          createdAt: "2024-03-20T19:20:56.996Z",
          imageUrl: "",
        },
      ],
      [
        {
          type: "VIEW_ONLY_TEXT",
          question: "How can I assist you tomorrow?",
          description: "",
          options: [],
          criteriaId: "ec-295f32f2-3a32-4437-ba33-b810ca760888",
          required: true,
          linkTitle: "",
          linkUrl: "",
          manualInput: false,
          completed: false,
          answer:
            "You can complete your user information details by sharing the details asked in the form",
          createdAt: "2024-03-20T19:20:57.017Z",
          imageUrl: "",
        },
        {
          type: "VIEW_ONLY_TEXT",
          question: "How can I assist you day after tomorrow?",
          description: "",
          options: [],
          criteriaId: "ec-48b4fbee-2d3f-4788-93d7-36bfa760dc32",
          required: true,
          linkTitle: "",
          linkUrl: "",
          manualInput: false,
          completed: false,
          answer:
            "You can complete your user information details by sharing the details asked in the form",
          createdAt: "2024-03-20T19:20:57.017Z",
          imageUrl: "",
        },
        {
          type: "VIEW_ONLY_TEXT",
          question: "How can I assist you today?",
          description: "",
          options: [],
          criteriaId: "ec-5a8b090d-852c-4892-adf8-7f7cf1915e74",
          required: true,
          linkTitle: "",
          linkUrl: "",
          manualInput: false,
          completed: false,
          answer:
            "You can complete your user information details by sharing the details asked in the form",
          createdAt: "2024-03-20T19:20:57.016Z",
          imageUrl: "",
        },
      ],
      [
        {
          type: "LINK_OPEN_READ",
          question: "",
          description: "Conect with us to explore more",
          options: [],
          criteriaId: "ec-132ab04f-7fc7-40d7-b4bc-238c898b7b4a",
          required: true,
          linkTitle: "Updates3",
          linkUrl: "https://www.linkedin.com/company/questai/",
          manualInput: false,
          completed: true,
          answer: "",
          createdAt: "2024-03-20T19:20:57.040Z",
          imageUrl: "",
        },
        {
          type: "LINK_OPEN_READ",
          question: "",
          description: "Play with our pre-made templates and create your frame",
          options: [],
          criteriaId: "ec-9f567862-dca8-4dea-9592-79459563ac66",
          required: true,
          linkTitle: "Update2",
          linkUrl: "https://main.d2h2uj2sjo2c2h.amplifyapp.com/",
          manualInput: false,
          completed: true,
          answer: "",
          createdAt: "2024-03-20T19:20:57.040Z",
          imageUrl: "",
        },
        {
          type: "LINK_OPEN_READ",
          question: "",
          description:
            "AI-Powered User Experiences to Increase in-app Adoption, Engagement & Revenue ",
          options: [],
          criteriaId: "ec-c6b5bf80-71b7-412e-a157-7a4402b885cc",
          required: true,
          linkTitle: "Update1",
          linkUrl: "https://www.questlabs.ai/",
          manualInput: false,
          completed: true,
          answer: "",
          createdAt: "2024-03-20T19:20:57.039Z",
          imageUrl: "",
        },
      ],
      [
        {
          type: "LINK_OPEN_READ",
          question: "",
          description: "Play with our pre-made templates and create your frame",
          options: [],
          criteriaId: "ec-4ec721c0-159b-4062-b4f2-29c51803b2d1",
          required: true,
          linkTitle: "Tasks-React Playground",
          linkUrl: "https://main.d2h2uj2sjo2c2h.amplifyapp.com/",
          manualInput: false,
          completed: false,
          answer: "",
          createdAt: "2024-03-20T19:20:57.061Z",
          imageUrl: "",
        },
        {
          type: "LINK_OPEN_READ",
          question: "",
          description: "Conect with us to explore more",
          options: [],
          criteriaId: "ec-848fcb3b-4b50-4711-b9bb-f4113611a435",
          required: true,
          linkTitle: "Tasks-Quest Linkedin",
          linkUrl: "https://www.linkedin.com/company/questai/",
          manualInput: false,
          completed: false,
          answer: "",
          createdAt: "2024-03-20T19:20:57.061Z",
          imageUrl: "",
        },
        {
          type: "LINK_OPEN_READ",
          question: "",
          description:
            "AI-Powered User Experiences to Increase in-app Adoption, Engagement & Revenue ",
          options: [],
          criteriaId: "ec-d6ea445b-2095-4e41-8ea7-33f1da282b47",
          required: true,
          linkTitle: "Tasks-QuestLabs",
          linkUrl: "https://www.questlabs.ai/",
          manualInput: false,
          completed: false,
          answer: "",
          createdAt: "2024-03-20T19:20:57.061Z",
          imageUrl: "",
        },
      ],
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
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTRjYzUxMGE0LWU2NzAtNGVkMy1hYmUzLWMzNTFjMTliYjk5MiIsImlhdCI6MTcxNzc2MDIzMiwiZXhwIjoxNzE4MzY1MDMyfQ.zGDbjiKnPakxAwTb61q310rqA20UklqvtB95Ff4ZIuU"
          }
          userId="u-4cc510a4-e670-4ed3-abe3-c351c19bb992"
          questId="c-13cd83b3-59df-4a5d-9765-9fb9d5aa1981"
        defaultAutoPopupMessages={["Hello there👋, How can I help youasdad dadas d a das dasd adsaa s ?"]}
        autoPopupOpenAfter="ONCE"
          // uniqueUserId="741852101s@gmail.com"
          // uniqueUserId="741852101"
          // helphubPosition="USER_CHOICE"
          // onlineComponent={online}
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
              height: "700px",
              // width: "400px",
              boxShadow: "0px 0px 48px 0px rgba(34, 34, 34, 0.20)"
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
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTRjYzUxMGE0LWU2NzAtNGVkMy1hYmUzLWMzNTFjMTliYjk5MiIsImlhdCI6MTcxNjM3ODc4NiwiZXhwIjoxNzE2OTgzNTg2fQ.erYh8kpMpdoOxftIdvglRAzMNKh3Qyg9DwSZQ8aWqkE"
        }
        userId="u-4cc510a4-e670-4ed3-abe3-c351c19bb992"
        // ParentQuest={}
        // ChildQuest={}
        styleConfig={{
          Main: {
            height: "500px",
            width: "400px",
          },
        }}
        ParentQuest={parentQuest}
        ChildQuest={childQuest}
        // claimStatusUpdates={claimStatusUpdates}
        // setClaimStatusUpdates={setClaimStatusUpdates}
      />
    </QuestProvider>
  );
}
