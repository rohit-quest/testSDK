import { QuestProvider } from '../QuestWrapper';
import FeedbackWorkflow from './FeedbackOverview';
import FeedbackWorkflowOffline from './OfflineComponent.tsx';
export const questId = 'q-2b37975b-30f7-4572-a5f4-c354439b3970';
export const apiKey = 'k-68a0c6b8-b27f-49c6-a315-b0c9cba15bf4'
export const apiSecret = 's-5bafb222-c5bd-4c14-9dfe-9d72fb5e275b9cacf740-3c56-44e9-afe3-b1c0aa6a8a42'
export const entityId = 'e-d97d4353-c517-4ce3-a5e0-f81b3dbb80b5'
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWUzYmVhMWQzLTE5MTctNGI5YS1iODU1LWYxM2Q0N2RmZTJlZCIsImlhdCI6MTY5NjY3MDA5OCwiZXhwIjoxNzI4MjI3Njk4fQ.E_hQ-o8E4jbAMmuJBqwwWFebr9_NoSIykGq_CavR7kE'
export const userId = 'u-e3bea1d3-1917-4b9a-b855-f13d47dfe2ed'

export default function FeedbackWorkflowPreview({ online = false }: { online?: boolean }) {

    if (online)
        return (<QuestProvider
            apiKey={apiKey}
            apiSecret="s-7462f377-2ce4-4593-a907-3a2a00cdf951be06358a-d95d-4576-b3b4-a07dda2dab36"
            entityId={entityId}
            featureFlags={{}}
            apiType="PRODUCTION"
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
                    iconUrl:'https://cdn.pixabay.com/photo/2012/03/01/00/55/flowers-19830_640.jpg'
                }}
                ReportBug={{
                    heading: "Reportasdasd a Bug",
                    description: "Describazsdasde your issue",
                    formHeading: "Report wewea Bug",
                    formDescription: "Describe yosddffdur issue",
                    iconUrl:'https://cdn.pixabay.com/photo/2012/03/01/00/55/flowers-19830_640.jpg'
                }}
                ContactUs={{
                    heading: "Contacasasdt us",
                    description: "Invite oasasdasdher admins and moderators",
                    iconUrl:'https://cdn.pixabay.com/photo/2012/03/01/00/55/flowers-19830_640.jpg'
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
                //     }
                //     // Description: { color: 'red' },
                //     // listDescription:{color:'yellow'}
                //     // Heading: { color: 'red' },
                //     // listHeading: { color: 'blue' }
                // }}
                // // footerBackgroundColor='red'
                // contactUrl="https://calendly.com/sriya-persana/30min"
                isOpen={true}
                // // onClose={() => setIsOpen(!isOpen)}
                // uniqueUserId="soumitra.petbindhi+25@gmail.com"
                // uniqueEmailId="soumitra.petbindhi+25@gmail.com"
                
 
            />

        </QuestProvider>)

    return (<FeedbackWorkflowOffline
        // contactUrl="https://calendly.com/sriya-persana/30min"
        isOpen={true}
        // onClose={() => setIsOpen(!isOpen)}
        showFooter={true}
        SecondaryButtonText='red'
        styleConfig={{
            // Description: { color: 'red' },
            // listDescription:{color:'yellow'}
            Heading: { color: 'red' },
            // listHeading: { color: 'blue' },

            listHover :{
                iconColor:'blue',
                iconBackground:'grey',
                background:'yellow',
                Heading:'green',
                Description:'red',
                IconSize:'20px',
                Icon:{padding:'16px',border:'1px solid blue'}
            }
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
        offlineFormData={
            [
                [{
                    "type": "RATING",
                    "question": "Rating",
                    "options": [""],
                    "criteriaId": "ec-84192fef-c91c5-d4ace713aaeb",
                    "required": true,
                },
                {
                    "type": "USER_INPUT_EMAIL",
                    "question": "Enter your Email",
                    "options": [""],
                    "criteriaId": "ec-84192fef-c917-410f-4ace713aae",
                    "required": true,
                },
                {
                    "type": "USER_INPUT_TEXTAREA",
                    "question": "Comment",
                    "options": [""],
                    "criteriaId": "ec-84192fef-c917-410f-9d4ace713aae",
                    "required": true,
                }],
                [
                    {
                        "type": "USER_INPUT_TEXT",
                        "question": "Title",
                        "options": [""],
                        "criteriaId": "ec-84192fef-c917-410f-4ace713aee",
                        "required": true,
                        placeholder: ""
                    },
                    {
                        "type": "USER_INPUT_EMAIL",
                        "question": "Email",
                        "options": [""],
                        "criteriaId": "ec-84192fef-c917-410f-9ace713aef",
                        "required": true,
                        placeholder: ""
                    },
                    {
                        "type": "USER_INPUT_TEXTAREA",
                        "question": "Bug",
                        "options": [""],
                        "criteriaId": "ec-84192fef-c7-410f-9bc5-d4ce713aaeg",
                        "required": true,
                        placeholder: ""
                    }
                ],
                [
                    {
                        "type": "USER_INPUT_TEXT",
                        "question": "What feature are you missing?",
                        "options": [""],
                        "criteriaId": "ec-84192fef-c917-410f-d4ace713aeh",
                        "required": true,
                        placeholder: ""
                    },
                    {
                        "type": "USER_INPUT_EMAIL",
                        "question": "Your email address",
                        "options": [""],
                        "criteriaId": "ec-84192fef-c917-4101jioaaei",
                        "required": true,
                        placeholder: ""
                    },
                    {
                        "type": "USER_INPUT_TEXT",
                        "question": "Tell us more about the problem",
                        "options": [""],
                        "criteriaId": "ec-84192fef-c9170f-9bc5acjie713aaej",
                        "required": true,
                        placeholder: ""
                    }]
                , [
                    {
                        "type": "LINK_OPEN_READ",
                        "question": "",
                        "criteriaId": "ec-e32b88d7-0e43-4254-9c94-44859ceedcdc",
                        "required": true,
                    },
                ]
            ]
        }
    >

    </FeedbackWorkflowOffline>)
}
