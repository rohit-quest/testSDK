import { useState } from "react";
import { QuestProvider } from "../QuestWrapper";
import InlineFeedback from "./InlineFeedback";
import InlineFeedbackOffline from "./InlineFeedbackOffline";

export const apiKey = "k-e6ec8094-6eef-4e80-a804-112a63607bf5";
export const apiSecret =
  "s-9503fd7a-8f44-4e5a-bf37-f5a023510b03606feb6c-15cb-4640-88a1-0addfba3b2ef";
export const entityId = "e-5768fd26-d226-4ac1-81e6-3c99427f3fb3";
export const userId = "u-88350caa-4080-4505-a169-09f3f15e83b7";
export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTg4MzUwY2FhLTQwODAtNDUwNS1hMTY5LTA5ZjNmMTVlODNiNyIsImlhdCI6MTcxNTE0NzkxMywiZXhwIjoxNzE1NzUyNzEzfQ.102Im3ojxlgDCo4lOflzIvtFnZuEsTMN334ObhTSvEs";
export const questId = "q-a4f7a07a-8344-41af-bbea-01682480e609";

export default function Preview({ online }: { online: boolean }) {
  // questData?.data?.eligibilityCriterias
  const inlineFeedbackOffline = [
    {
      type: "RATING",
      question: "First name",
      options: [""],
      criteriaId: "ec-85661bb7-9df4-4a22-8209-b3c6efb99240",
      required: true,
      linkTitle: "",
      linkUrl: "",
      manualInput: false,
      placeholder: "",
    },
  ];
  const [answer, setAnswer] = useState({});
  // console.log(answer)

  if (online) {
    return (
      <QuestProvider
        apiSecret={""}
        apiKey={apiKey}
        entityId={entityId}
        featureFlags={{}}
        apiType="STAGING"
        themeConfig={undefined}
      >
        <InlineFeedback
          userId={userId}
          token={token}
          questId={questId}
          styleConfig={{
            ActionButton: {
              // background:"red",
              // color:'red',
              // border:"5px solid yellow"
            },
            ActionContainer: {
              // background:'yellow'
            },
            ActionSelectedButton: {
              // background:'yellow',
              // border:"5px solid black"
            },
            Description: {
              // background:'red'
              // color:'red'
            },
            Footer: {
              // background:'red'
              // color:'red'
            },
            Form: {
              // background:'red'
              // width:"300px"
            },
            Heading: {
              // background:'red'
              // color:"yellow"
            },
            IconStyle: {},
            MainHeading: {
              //  background:'red'
            },
            SelectedIconStyle: {
              // background:'red'
            },
          }}
          type="like"
        />
      </QuestProvider>
    );
  }
  return (
    <QuestProvider
      apiSecret={""}
      apiKey={apiKey}
      entityId={entityId}
      featureFlags={{}}
      apiType="STAGING"
      themeConfig={undefined}
    >
      <InlineFeedbackOffline
        userId={userId}
        token={token}
        questId={questId}
        type="like"
        offlineFormData={inlineFeedbackOffline}
        setAnswer={setAnswer}
        styleConfig={{
          ActionButton: {
            // background:"red",
            // color:'red',
            // border:"5px solid yellow"
          },
          ActionContainer: {
            // background:'yellow'
          },
          ActionSelectedButton: {
            // background:'yellow',
            // border:"5px solid black"
          },
          Description: {
            // background:'red'
            // color:'red'
          },
          Footer: {
            // background:'red'
            // color:'red'
          },
          Form: {
            // background:'red'
          },
          Heading: {
            // background:'red'
            // color:"yellow"
          },
          IconStyle: {},
          MainHeading: {
            //  background:'red'
          },
          SelectedIconStyle: {
            // background:'red'
          },
        }}
      />
    </QuestProvider>
  );
}
