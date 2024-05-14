import { useState } from "react";
import { QuestProvider } from "../QuestWrapper";
import FeedbackWorkflow from "./FeedbackOverview";

import FeedbackWorkflowOffline from "./OfflineComponent.tsx";
export const questId = "q-ce583002-a614-40e3-bee0-00436b0f474d";
export const apiKey = "k-fe5a805c-77ed-4cae-bd33-9591ebed2805";
export const apiSecret =
  "s-5bafb222-c5bd-4c14-9dfe-9d72fb5e275b9cacf740-3c56-44e9-afe3-b1c0aa6a8a42";
export const entityId = "e-9850377b-f88f-4426-a2ac-56206c74655a";
export const userId = "u-8268f5e1-f5a1-440c-a333-0f5578a73847";
export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTgyNjhmNWUxLWY1YTEtNDQwYy1hMzMzLTBmNTU3OGE3Mzg0NyIsImlhdCI6MTcxNDYzMjcxNSwiZXhwIjoxNzE1MjM3NTE1fQ.zFJKcKV1d5Wx0nvVv6wvazJOXepWoZyRFK3wT3gFggo";

export default function FeedbackWorkflowPreview({
  online = false,
}: {
  online?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(true);
  if (online)
    return (
      <QuestProvider
        apiKey={apiKey}
        apiSecret="s-7462f377-2ce4-4593-a907-3a2a00cdf951be06358a-d95d-4576-b3b4-a07dda2dab36"
        entityId={entityId}
        featureFlags={{}}
        apiType="STAGING"
        themeConfig={{
          // primaryColor: "red",
          // fontFamily:"cursive"
          // backgroundColor:'red',
          // primaryColor:'white'
        }}
      >
        <FeedbackWorkflow
          userId={userId}
          token={token}
          showFooter={true}
          questIds={[
            "q-7c7656e8-73b4-4d1d-ac50-1638eda9a286",
            "q-3a2acdc9-1578-4c26-b93b-89779f28d244",
            "q-e6e53cbd-2b77-40a2-861f-242476c6c88c",
            "q-a4dac25f-4d48-45fc-ba5a-0b88cb750c1f",
          ]}
          GeneralFeedback={{
            heading: "General Fee",
            description: "Give general feedback on this page",
            formHeading: "General Feedback",
            formDescription: "Welcome back,sdfsdf Please complete your details",
            iconUrl:
              "https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?auto=compress&cs=tinysrgb&w=800",
          }}
          RequestFeature={{
            heading: "Request a Featureqwqewqewqe",
            description: "How can we msdsfdsdfake it better",
            formHeading: "Request a Feature",
            iconUrl:
              "https://cdn.pixabay.com/photo/2012/03/01/00/55/flowers-19830_640.jpg",
          }}
          ReportBug={{
            heading: "Reportasdasd a Bug",
            description: "Describazsdasde your issue",
            formHeading: "Report wewea Bug",
            formDescription: "Describe yosddffdur issue",
            iconUrl:
              "https://cdn.pixabay.com/photo/2012/03/01/00/55/flowers-19830_640.jpg",
          }}
          ContactUs={{
            heading: "Contacasasdt us",
            description: "Invite oasasdasdher admins and moderators",
            iconUrl:
              "https://cdn.pixabay.com/photo/2012/03/01/00/55/flowers-19830_640.jpg",
          }}
          contactUrl="https://calendly.com/sriya-persana/30min"
          // showPoweredBy={false}
          styleConfig={{
            Form: {},
            listHover: {
              // iconColor:'blue',
              // iconBackground:'grey',
              // background:'yellow',
              // Heading:'green',
              // Description:'red'
            },
            //  ThanksPopup:{Icon:{backgroundColor:'red'}},
            // Description: { color: 'red' },
            // listDescription:{color:'yellow'}
            // Heading: { color: 'red' },
            // listHeading: { color: 'blue' }
          }}
          // // footerBackgroundColor='red'
          // contactUrl="https://calendly.com/sriya-persana/30min"
          isOpen={true}
          onClose={() => setIsOpen((prev) => !prev)}
          // uniqueUserId="soumitra.petbindhi+25@gmail.com"
          // uniqueEmailId="soumitra.petbindhi+25@gmail.com"
        />
      </QuestProvider>
    );

  return (
    <FeedbackWorkflowOffline
      // contactUrl="https://calendly.com/sriya-persana/30min"

      isOpen={isOpen}
      onClose={() => setIsOpen((prev) => !prev)}
      showFooter={true}
      SecondaryButtonText="red"
      styleConfig={
        {
          // Description: { color: 'red' },
          // listDescription:{color:'yellow'}
          // Heading: { color: "blue" },
          // listHeading: { color: 'blue' },
        }
      }
      QuestThemeData={{
        accentColor: "",
        theme: "",
        borderRadius: "",
        buttonColor: "",
        images: [],
      }}
      BrandTheme={{
        accentColor: "",
        background: "",
        borderRadius: "",
        buttonColor: "",
        contentColor: "",
        fontFamily: "",
        logo: "",
        primaryColor: "",
        secondaryColor: "",
        tertiaryColor: "",
        titleColor: "",
      }}
      contactUrl="https://calendly.com/sriya-persana/30min"
      // GeneralFeedback={{
      //     heading: "General Fee",
      //     description: "Give general feedsdasdasdback on this page",
      //     formHeading: "General Feedbackasddffd",
      //     formDescription: "Welcome back,sdfsdf Please complete your details",
      //     iconUrl: "https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?auto=compress&cs=tinysrgb&w=800",
      // }}
      // RequestFeature={{
      //     heading: "Request a Featureqwqewqewqe",
      //     description: "How can we msdsfdsdfake it better",
      //     formHeading: "Request a Feature",
      //     iconUrl: "https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?auto=compress&cs=tinysrgb&w=800",
      // }}
      // ReportBug={{
      //     heading: "Reportasdasd a Bug",
      //     description: "Describazsdasde your issue",
      //     formHeading: "Report wewea Bug",
      //     formDescription: "Describe yosddffdur issue",
      //     iconUrl: "https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?auto=compress&cs=tinysrgb&w=800",
      // }}
      // ContactUs={{
      //     heading: "Contacasasdt us",
      //     description: "Invite oasasdasdher admins and moderators",
      //     iconUrl: "https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?auto=compress&cs=tinysrgb&w=800",
      // }}
      offlineFormData={[
        [
          {
            type: "RATING",
            question: "Rating",
            options: [""],
            criteriaId: "ec-84192fef-c91c5-d4ace713aaeb",
            required: true,
          },
          {
            type: "USER_INPUT_EMAIL",
            question: "Enter your Email",
            options: [""],
            criteriaId: "ec-84192fef-c917-410f-4ace713aae",
            required: true,
          },
          {
            type: "USER_INPUT_TEXTAREA",
            question: "Comment",
            options: [""],
            criteriaId: "ec-84192fef-c917-410f-9d4ace713aae",
            required: true,
          },
          {
            type: "USER_INPUT_IMAGE",
            question: "",
            criteriaId: "ec-e32b88d7-0e43-4254-9c94-44859ceedcdc",
            required: true,
          },
        ],
        [
          {
            type: "USER_INPUT_TEXT",
            question: "Title",
            options: [""],
            criteriaId: "ec-84192fef-c917-410f-4ace713aee",
            required: true,
            placeholder: "",
          },
          {
            type: "USER_INPUT_EMAIL",
            question: "Email",
            options: [""],
            criteriaId: "ec-84192fef-c917-410f-9ace713aef",
            required: true,
            placeholder: "",
          },
          {
            type: "USER_INPUT_TEXTAREA",
            question: "Bug",
            options: [""],
            criteriaId: "ec-84192fef-c7-410f-9bc5-d4ce713aaeg",
            required: true,
            placeholder: "",
          },
        ],
        [
          {
            type: "USER_INPUT_TEXT",
            question: "What feature are you missing?",
            options: [""],
            criteriaId: "ec-84192fef-c917-410f-d4ace713aeh",
            required: true,
            placeholder: "",
          },
          {
            type: "USER_INPUT_EMAIL",
            question: "Your email address",
            options: [""],
            criteriaId: "ec-84192fef-c917-4101jioaaei",
            required: true,
            placeholder: "",
          },
          {
            type: "USER_INPUT_TEXT",
            question: "Tell us more about the problem",
            options: [""],
            criteriaId: "ec-84192fef-c9170f-9bc5acjie713aaej",
            required: true,
            placeholder: "",
          },
        ],
        [
          {
            type: "LINK_OPEN_READ",
            question: "",
            criteriaId: "ec-e32b88d7-0e43-4254-9c94-44859ceedcdc",
            required: true,
          },
        ],
      ]}
    ></FeedbackWorkflowOffline>
  );
}
