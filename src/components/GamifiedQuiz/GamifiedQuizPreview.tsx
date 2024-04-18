import { useState } from "react";
import { QuestProvider } from "../QuestWrapper";
import GamifiedQuiz from "./GamifiedQuiz";
import GamifiedQuizOffline from "./GamifiedQuizOffline";
// export const questId = "q-0b37396e-ccaa-45a6-959f-44700e95967d";
// export const apiKey = "k-fe5a805c-77ed-4cae-bd33-9591ebed2805";
// export const apiSecret =
//   "s-5bafb222-c5bd-4c14-9dfe-9d72fb5e275b9cacf740-3c56-44e9-afe3-b1c0aa6a8a42";
// export const entityId = "e-9850377b-f88f-4426-a2ac-56206c74655a";
// export const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTgyNjhmNWUxLWY1YTEtNDQwYy1hMzMzLTBmNTU3OGE3Mzg0NyIsImlhdCI6MTcxMjgyMDkyOSwiZXhwIjoxNzEzNDI1NzI5fQ.RQXNgNM83WfWhgHRFnRilFaXqmx0x-cvVhaL1TvhlBc";
// export const userId = "u-8268f5e1-f5a1-440c-a333-0f5578a73847";

export const questId = "q-89aee979-b16f-4575-868a-c8714c632302";
export const apiKey = "k-e6ec8094-6eef-4e80-a804-112a63607bf5";
export const apiSecret =
  "s-772ea55b-1f58-4f1a-bcb1-5ba5e1cc8e4f9edf825c-bdf9-4b2d-a182-bdbef8c071d4";
export const entityId = "e-5768fd26-d226-4ac1-81e6-3c99427f3fb3";
export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTg4MzUwY2FhLTQwODAtNDUwNS1hMTY5LTA5ZjNmMTVlODNiNyIsImlhdCI6MTcxMzE2NDEzOCwiZXhwIjoxNzEzNzY4OTM4fQ.tZENNsLVFUkWOMcmoOqKEVvAx97PLBZKDZGzhARP_tc";
export const userId = "u-88350caa-4080-4505-a169-09f3f15e83b7";

export default function GamifiedQuizPreviewNew({
  online = false,
}: {
  online?: boolean;
}) {
  const [offlineAnswer, setOfflineAnswer] = useState<
    Record<string, string | Array<string>>
  >({});

  const formDataOffline = [
    {
      criteriaId: "ec-3a814772-4d3b-46a4-89ee-32d8de00f4b2",
      options: [],
      question: "First Name",
      required: true,
      type: "USER_INPUT_TEXT",
      placeholder: "",
      linkTitle: "",
      linkUrl: "",
      manualInput: false,
    },
    {
      criteriaId: "ec-3208ee0d-c390-441d-a7d4-852640234e12",
      options: [],
      question: "Last Name",
      required: false,
      type: "USER_INPUT_TEXT",
      placeholder: "",
      linkTitle: "",
      linkUrl: "",
      manualInput: false,
    },
    {
      criteriaId: "ec-aea1254c-252a-47d9-9903-b5c537d87122",
      options: ["One", "Two", "Three", "Four"],
      placeholder: "",
      question: "Choose One",
      required: false,
      type: "USER_INPUT_SINGLE_CHOICE",

      linkTitle: "",
      linkUrl: "",
      manualInput: false,
    },
    {
      criteriaId: "ec-43aa47ea-7515-4edc-8e5e-f487449a1973",
      options: ["Blue", "Red", "Yellow", "White"],
      placeholder: "",
      question: "One Color",
      required: true,
      type: "USER_INPUT_SINGLE_CHOICE",

      linkTitle: "",
      linkUrl: "",
      manualInput: false,
    },
    {
      criteriaId: "ec-fd584529-9f28-4900-98d2-3fab44323449",
      options: ["Monitor", "Mouse", "Keyboard", "CPU"],
      placeholder: "",
      question: "Equipments choose multiple",
      required: true,
      type: "USER_INPUT_MULTI_CHOICE",
      linkTitle: "",
      linkUrl: "",
      manualInput: false,
    },
    {
      criteriaId: "ec-9aa36b63-c6eb-4cc6-b54f-0a1e77fe9611",
      options: ["mongo", "sql", "mysql", "reddis", "oracle", "mssql", "other"],
      placeholder: "",
      question: "Choose dbs",
      required: true,
      type: "USER_INPUT_MULTI_CHOICE",
      linkTitle: "",
      linkUrl: "",
      manualInput: false,
    },
    {
      criteriaId: "ec-56c25931-294a-4a11-b226-59aa320bfedd",
      options: [],
      placeholder: "",
      question: "DOB",
      required: true,
      type: "USER_INPUT_DATE",
      linkTitle: "",
      linkUrl: "",
      manualInput: false,
    },
    {
      criteriaId: "ec-6783e379-95cd-490d-837f-87086e069830",
      options: [],
      placeholder: "",
      question: "About you",
      required: true,
      type: "USER_INPUT_TEXTAREA",
      linkTitle: "",
      linkUrl: "",
      manualInput: false,
    },
    {
      criteriaId: "ec-be381719-4546-4d70-933d-a09b557c28d4",
      options: [],
      placeholder: "",
      question: "Email",
      required: true,
      type: "USER_INPUT_EMAIL",
      linkTitle: "",
      linkUrl: "",
      manualInput: false,
    },
    {
      criteriaId: "ec-6edb1683-6663-4a85-a649-d0f3815eb05d",
      options: [],
      placeholder: "",
      question: "Phone",
      required: false,
      type: "USER_INPUT_PHONE",
      linkTitle: "",
      linkUrl: "",
      manualInput: false,
    },
  ];

  const [gamifiedQuiz, setGamifiedQuiz] = useState(true);
  const [questions, setQuestions] = useState<number>(0);

  const closeme = () => {
    setGamifiedQuiz((c) => !c);
  };
  const functionOnSubmit = () => {
    console.log("Done");
  };

  if (online) {
    return (
      <QuestProvider
        apiKey={apiKey}
        apiSecret={apiSecret}
        entityId={entityId}
        featureFlags={{}}
        apiType="STAGING"
        themeConfig={{
          // backgroundColor: "yellow", //done
          // borderColor: "green", //done
          // buttonColor: "red", //done
          fontFamily: "cursive", //done
          // primaryColor: "red", //
          // secondaryColor: "yellow",
        }}
      >
        {gamifiedQuiz && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
              flexDirection: "column",
              position: "fixed",
              top: "0px",
              left: "0px",
              width: "100%",
              height: "100vh",
            }}
          >
            <GamifiedQuiz
              feedbackContent={{
                FeedbackDescription: "Fedd desc",
                FeedbackHeading: "Feed head",
              }}
              setGamifiedQuiz={closeme}
              gamifiedQuiz={gamifiedQuiz}
              userId={userId}
              questId={questId}
              // answer={answer}
              // setAnswer={setAnswer}
              functionOnSubmit={functionOnSubmit}
              token={token}
              heading="Heading Online"
              // questionSections={[[1, 2, 3, 4], [5, 6], [7, 8], [9, 10]]}
              // questionsPerSection={5}
              questionSections={[[1, 2, 3, 4], [5, 6], [7]]}
              // questionSections={[[1], [5, 6], [7, 8], [9, 10]]}
              sectionSubHeading={
                [
                  // "Section 1",
                  // "Srction 2",
                  // "section 3",
                  // "Section 4",
                ]
              }
              // sectionSubHeading={["", "", "", ""]}
              // sectionHeading={["Section Head 1", "", "", "Section Head 4"]}
              showFooter={true}
              thanksPopUpFooter={true}
              questions={questions}
              setQuestions={setQuestions}
              styleConfig={{
                Form: {
                  // color: "yellow",
                  // fontSize: "58px",
                  // background: "red", //done
                },
                IconColor: {
                  // color: "red",
                },
                LabelColor: {
                  // color: "green", //done
                },
                EmailError: {
                  // errorStyle: {
                  //   color: "blue",
                  // },
                  // text: "asdfasd",
                },
                Heading: {
                  // background: "yellow",
                  // margin: "25px"
                  // color: "red",
                },
                FormContainer: {
                  // background: "red",
                },
                Question: {
                  // color: "pink", //done
                },
                SubHeading: {
                  color: "red",
                },
                // inut par only date ka change h raha baaki ka nahi,to mujhe input me change karni padegi style
                Input: {
                  // background: "blue",
                  // color: "yellow",
                },
                PrimaryButton: {
                  //done
                  // background: "yellow",
                  // color: "red",
                  // borderColor: "blue",
                },
                SecondaryButton: {
                  // background: "yellow",
                  // color: "red",
                  // borderColor: "blue",
                },
                Footer: {
                  // background: "red",
                  // color: "white",
                },
                TextArea: {},
                ThanksPopup: {
                  background: "red",
                  // color: "white",
                },
                ThanksPopupHeading: {
                  // color: "pink",
                },
                ThanksPopupDescription: {
                  // color: "pink",
                },
                ThanksPopUpFooter: {
                  // background: "yellow",
                  // color: "white",
                },
                ThanksPopUpGotoHome: {
                  // background: "yellow",
                  // borderColor: "black",
                  // backgroundColor: "yellow",
                  // color: "white",
                },
                OptionsSelectedColor: {
                  // color: "red",
                },
              }}

              // customComponents={<CustomButton />}
              // getAnswers={printAnswer}
              // screenHeight=""
              // progressBarType="modal1"
            />
          </div>
        )}
      </QuestProvider>
    );
  }

  return (
    <QuestProvider
      apiKey={apiKey}
      apiSecret={apiSecret}
      entityId={entityId}
      featureFlags={{}}
      apiType="STAGING"
      themeConfig={
        {
          // backgroundColor: "green", //done
          // borderColor: "red", //done
          // buttonColor: "yellow", //done
          // fontFamily: "cursive", //done
          // primaryColor: "red", //done
          // secondaryColor: "red", //done
        }
      }
    >
      {gamifiedQuiz && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
            flexDirection: "column",
            position: "fixed",
            top: "0px",
            left: "0px",
            width: "100%",
            height: "100vh",
          }}
        >
          <GamifiedQuizOffline
            feedbackContent={{
              FeedbackDescription: "Fedd desc",
              FeedbackHeading: "Feed head",
            }}
            functionOnSubmit={functionOnSubmit}
            // questionsPerSection={3}
            offlineAnswer={offlineAnswer}
            setOfflineAnswer={setOfflineAnswer}
            gamifiedQuiz={gamifiedQuiz}
            setGamifiedQuiz={setGamifiedQuiz}
            userId={userId}
            questId={questId}
            setQuestions={setQuestions}
            questions={questions}
            // answer={answer}
            // setAnswer={setAnswer}

            token={token}
            heading="Heading Offline"
            // questionSections={[
            //   [1, 2, 3, 4],
            //   [5, 6],
            //   [7, 8],
            //   [9, 10],
            // ]}
            questionSections={[
              [1, 2, 3, 4],
              [5, 6, 7],
              [8, 9, 10],
            ]}
            sectionSubHeading={[
              "Section 1",
              "Srction 2",
              "section 3",
              "Section 4",
            ]}
            sectionHeading={[
              "Section Head 1",
              "",
              "section Head 3",
              "Section Head 4",
            ]}
            // singleChoiceTextHeading="single choice testing"
            // multiChoiceTextHeading="Multi testing"
            showFooter={true}
            thanksPopUpFooter={true}
            styleConfig={{
              Form: {
                // background: "yellow", //done
              },
              Heading: {
                // background: "yellow",
                // margin: "25px"
                // color: "black",
              },
              IconColor: {
                // color: "red",
              },
              FormContainer: {
                // background: "red",
              },
              Question: {
                // color: "pink",
              },
              SubHeading: {
                // color: "yellow",
              },
              EmailError: {
                // errorStyle: {
                //   color: "blue",
                // },
                // text: "asdfasd",
              },
              LabelColor: {
                // color: "yellow",
              },
              Input: {
                // background: "blue",
                // color: "yellow",
              },
              PrimaryButton: {
                // background: "red",
                // color: "red",
                // border: "blue",
                // borderColor: "blue",
              },
              SecondaryButton: {
                // background: "yellow",
                // color: "red",
                // border: "red",
                // borderColor: "red",
              },
              Footer: {
                // background: "red",
                // color: "black",
              },
              FooterText: {
                // color:"yellowgreen"
              },
              ThanksPopup: {
                // background: "red",
                // color: "white",
              },
              ThanksPopupHeading: {
                // color: "pink",
              },

              ThanksPopupDescription: {
                // color: "pink",
              },
              ThanksPopUpFooter: {
                // background: "yellow",
                // color: "white",
              },
              ThanksPopUpGotoHome: {
                // background: "yellow",
                // color: "white",
              },
              OptionsSelectedColor: {
                color: "red",
              },
            }}
            formDataOffline={formDataOffline}

            // customComponents={<CustomButton />}
            // getAnswers={printAnswer}
            // screenHeight=""
            // progressBarType="modal1"
          />
        </div>
      )}
    </QuestProvider>
  );
}
