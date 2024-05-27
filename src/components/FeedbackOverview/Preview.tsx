import { useState } from "react";
import { QuestProvider } from "../QuestWrapper";
import FeedbackWorkflow from "./FeedbackOverview";

import FeedbackWorkflowOffline from "./OfflineComponent.tsx";
export const apiKey = "k-fe5a805c-77ed-4cae-bd33-9591ebed2805";
export const apiSecret =
  "s-3c35ebcb-c752-4c3c-8ce3-e6460ebbc9d479a7e122-d06b-4243-bbfa-e0889987f6c0";
export const entityId = "e-9850377b-f88f-4426-a2ac-56206c74655a";
export const questId = "q-99be1d8e-d883-4f07-bfb8-f78b8b75fff9";
export const userId = "u-8268f5e1-f5a1-440c-a333-0f5578a73847";
export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTgyNjhmNWUxLWY1YTEtNDQwYy1hMzMzLTBmNTU3OGE3Mzg0NyIsImlhdCI6MTcxNjcxODQ5MCwiZXhwIjoxNzE3MzIzMjkwfQ.7hnsMvPAbAWaC2JTSoMJ5jtOWXxFJaPlNgw0juQPqsA";

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
        apiSecret={apiSecret}
        entityId={entityId}
        featureFlags={{}}
        apiType="STAGING"
        themeConfig={
          {
            // primaryColor: "red",
            // fontFamily:"cursive"
            // backgroundColor:'red',
            // primaryColor:'white'
          }
        }
      >
        <FeedbackWorkflow
          userId={userId}
          token={token}
          showFooter={true}
          questIds={[
            'q-91ec02dc-8aca-49cc-9920-a153ce228a3a','q-d4c56764-7ffc-4b65-beac-69a40396cc93','q-18c25dc6-905f-43ac-84f3-e0a1c6facbf6','q-b0b66559-92aa-4e93-9ba8-5ec7900f0b67'
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
      GeneralFeedback={{
        heading: "General Fee",
        description: "Give general feedsdasdasdback on this page",
        formHeading: "General Feedbackasddffd",
        formDescription: "Welcome back,sdfsdf Please complete your details",
        // iconUrl: "https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?auto=compress&cs=tinysrgb&w=800",
      }}
      RequestFeature={{
        heading: "Request a Featureqwqewqewqe",
        description: "How can we msdsfdsdfake it better",
        formHeading: "Request a Feature",
        // iconUrl: "https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?auto=compress&cs=tinysrgb&w=800",
      }}
      ReportBug={{
        heading: "Reportasdasd a Bug",
        description: "Describazsdasde your issue",
        formHeading: "Report wewea Bug",
        formDescription: "Describe yosddffdur issue",
        // iconUrl: "https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?auto=compress&cs=tinysrgb&w=800",
      }}
      ContactUs={{
        heading: "Contacasasdt us",
        description: "Invite oasasdasdher admins and moderators",
        // iconUrl: "https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?auto=compress&cs=tinysrgb&w=800",
      }}
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
            required: false,
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
