import { useState } from "react";
import { QuestProvider } from "../QuestWrapper";
import FeedbackWorkflow from "./FeedbackOverview";

import FeedbackWorkflowOffline from "./OfflineComponent.tsx";
export const questId = "q-290aef93-4b20-45e2-b2f6-4bc19b5bd8ef";
export const apiKey = "k-9986f82d-cbd0-4923-bf9a-ea01b4795fa1";
export const apiSecret =
  "s-5bafb222-c5bd-4c14-9dfe-9d72fb5e275b9cacf740-3c56-44e9-afe3-b1c0aa6a8a42";
export const entityId = "e-ba6a2a04-546c-48d4-9369-64524756c0e8";
export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTdiM2E2MzAxLTcxMWMtNGMwZC1hZTYzLWQ5M2RiZTJjZWVlOSIsImlhdCI6MTcxMzk0MzIzMywiZXhwIjoxNzE0NTQ4MDMzfQ.8iaRzlT62QUh7I8uihYuo7ywR0FP33kec-lSnbt3U4M";
export const userId = "u-7b3a6301-711c-4c0d-ae63-d93dbe2ceee9";

export default function FeedbackWorkflowPreview({ online = false }: { online?: boolean }) {
  const [isOpen, setIsOpen] = useState(true);
  if (online)
    return (<QuestProvider
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
          'q-general-feedback',
          'q-report-a-bug',
          'q-request-a-feature',
          'q-contact-us',
        ]}
        GeneralFeedback={{
          heading: "General Fee",
          description: "Give general feedsdasdasdback on this page",
          formHeading: "General Feedbackasddffd",
          formDescription: "Welcome back,sdfsdf Please complete your details",
          iconUrl: "https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?auto=compress&cs=tinysrgb&w=800",
        }}
        RequestFeature={{
          heading: "Request a Featureqwqewqewqe",
          description: "How can we msdsfdsdfake it better",
          formHeading: "Request a Feature",
          iconUrl: 'https://cdn.pixabay.com/photo/2012/03/01/00/55/flowers-19830_640.jpg'
        }}
        ReportBug={{
          heading: "Reportasdasd a Bug",
          description: "Describazsdasde your issue",
          formHeading: "Report wewea Bug",
          formDescription: "Describe yosddffdur issue",
          iconUrl: 'https://cdn.pixabay.com/photo/2012/03/01/00/55/flowers-19830_640.jpg'
        }}
        ContactUs={{
          heading: "Contacasasdt us",
          description: "Invite oasasdasdher admins and moderators",
          iconUrl: 'https://cdn.pixabay.com/photo/2012/03/01/00/55/flowers-19830_640.jpg'
        }}
        contactUrl="https://calendly.com/sriya-persana/30min"

        // showPoweredBy={false}
        // styleConfig={{
        //     Form: {

        //     },
        //     listHover :{
        //         iconColor:'blue',
        //         iconBackground:'grey',
        //         background:'yellow',
        //         Heading:'green',
        //         Description:'red'
        //     },
        //     // ThanksPopUp:{backgroundColor:"red"}
        //     // Description: { color: 'red' },
        //     // listDescription:{color:'yellow'}
        //     // Heading: { color: 'red' },
        //     // listHeading: { color: 'blue' }
        // }}
        // // footerBackgroundColor='red'
        // contactUrl="https://calendly.com/sriya-persana/30min"
        isOpen={true}
      onClose={() => setIsOpen(prev=>!prev)}
      // uniqueUserId="soumitra.petbindhi+25@gmail.com"
      // uniqueEmailId="soumitra.petbindhi+25@gmail.com"


      />


    </QuestProvider>
    );

  return (
    <FeedbackWorkflowOffline
      // contactUrl="https://calendly.com/sriya-persana/30min"
    
      isOpen={isOpen}
      onClose={() => setIsOpen(prev=>!prev)}
      showFooter={true}
      SecondaryButtonText="red"
      styleConfig={{
        // Description: { color: 'red' },
        // listDescription:{color:'yellow'}
        Heading: { color: "red" },
        // listHeading: { color: 'blue' },

      }}
      QuestThemeData={{
        accentColor: "blue",
        theme: "light",
        borderRadius: "16px",
        buttonColor: "blue",
        images: [],
      }}
      BrandTheme={{
        accentColor: "blue",
        background: "black",
        borderRadius: "10px",
        buttonColor: "yellow",
        contentColor: "yellow",
        fontFamily: "Cursive",
        logo: "",
        primaryColor: "white",
        secondaryColor: "grey",
        tertiaryColor: "white",
        titleColor: "yellow",
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
          }
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
          }
        ],
      ]}
    ></FeedbackWorkflowOffline>
  );
}
