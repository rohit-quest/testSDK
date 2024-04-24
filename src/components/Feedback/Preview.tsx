
import React, { useState } from 'react'
import Feedback from './Feedback';
import { QuestProvider } from '../QuestWrapper';
import Survey from './Survey';
import SurveyOffline from './OfflineComponent';

export const questId = 'q-1497e5f2-a787-4026-8824-bb6d3d10012b';
export const apiKey = 'k-fe5a805c-77ed-4cae-bd33-9591ebed2805'
export const apiSecret = 's-5bafb222-c5bd-4c14-9dfe-9d72fb5e275b9cacf740-3c56-44e9-afe3-b1c0aa6a8a42'
export const entityId = 'e-9850377b-f88f-4426-a2ac-56206c74655a'
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTgyNjhmNWUxLWY1YTEtNDQwYy1hMzMzLTBmNTU3OGE3Mzg0NyIsImlhdCI6MTcxMzg1MjEyOSwiZXhwIjoxNzE0NDU2OTI5fQ.yxm1cgS6bRwzuIr6SycJmEv52gXsVYSS7xi2TNa8lC8'
export const userId = 'u-8268f5e1-f5a1-440c-a333-0f5578a73847'

export default function FeedbackPreview({ online = true }) {
    const [state, setState] = useState([
        {
            "type": "USER_INPUT_TEXTAREA",
            "question": "Message",
            "options": [],
            "criteriaId": "ec-6e6ece4b-228c-42ba-bb36-45fcdc50b28b",
            "required": true,
            "placeholder": "Enter your Message"
        },
        {
            "type": "USER_INPUT_EMAIL",
            "question": "Email",
            "options": [],
            "criteriaId": "ec-8ce32ce1-17f4-4fd8-ba4e-51d0b5512e2d",
            "required": true,
            "placeholder": "Enter your Email"
        },
        {
            "type": "RATING",
            "question": "How do you like our App?",
            "options": [],
            "criteriaId": "ec-ad7a31e7-d710-416c-8fbc-40e50a968a9a",
            "required": true
        },
        {
            "type": "USER_INPUT_TEXT",
            "question": "Name",
            "options": [],
            "criteriaId": "ec-fd1f7e9e-2d6b-4e71-aa4b-c89f97d5e98a",
            "required": true,
            "placeholder": "Enter your Name"
        },
        {
            "type": "USER_INPUT_SINGLE_CHOICE",
            "question": "One",
            "options": ['one','twwo','three','four'],
            "criteriaId": "ec-cb60f960-0ef0-4324-9ca6-0decae5db64e",
            "required": true,
            "placeholder": "Enter your Name"
        },
        {
            "type": "USER_INPUT_MULTI_CHOICE",
            "question": "Multi",
            "options": ['one','twwo','three','four'],
            "criteriaId": "ec-cb60f960-0ef0-4324-9ca6-0decae5db64d",
            "required": true,
            "placeholder": "Enter your Name"
        },
        {
            "type": "USER_INPUT_DATE",
            "question": "DOB",
            "options": [],
            "criteriaId": "ec-cd3b266f-c22a-4c8f-910c-a31c0fda01f3",
            "required": true,
            "placeholder": "Enter your Name"
        },
        {
            "type": "USER_INPUT_PHONE",
            "question": "Phone",
            "options": [],
            "criteriaId": "ec-cd3b266f-c22a-4c8f-910c-a31c0fda01f4",
            "required": true,
            "placeholder": "Enter your Name"
        },

    ])
    // setIntervals(() => {
    //     state.pop();
    //     setState([...state]);
    //     // console.log(state)
    // }, 2000);

    if (online)
        return (
            <QuestProvider
                apiKey={apiKey}
                apiSecret={apiSecret}
                entityId={entityId}
                themeConfig={{
                    // fontFamily: 'cursive',
                    // primaryColor: 'blue'
                }}
                apiType='STAGING'
            >
                <Survey
                    // userId={userId}
                    // token={token}
                    // questId={"q-1a12c0e1-35a8-48a3-8cde-a8616f341b88"}
                    // heading={"Share Your FeedBack"}
                    // subHeading={"How was your experience?"}
                    // uniqueUserId={Date.now().toString()}
                    // uniqueEmailId='soumitra.petbindhi+25@gmail.com'
                    // styleConfig={{
                    //     Form: {
                    //         // font: "sans",
                    //         // color: "red",
                    //         // backgroundColor: "gray"
                    //     },
                    //     Heading: {
                    //         color: "red",
                    //         // fontSize:'10px'
                    //     },
                    //     Label: {
                    //         // color: "green"
                    //     },
                    //     TopBar: {
                    //         // display: "none"
                    //     },
                    //     Rating: {
                    //         RatingContainer: {
                    //             color: "red",


                    //         },
                    //         SingleRating: {
                    //             color: "red",
                    //             background: "yellow"

                    //         },
                    //         RatingText: {
                    //             color: "green"
                    //         },
                    //         Hover: {
                    //             color: "grey",
                    //             background: "yellow"
                    //         },
                    //         // LeftRatingText:'Not',
                    //         // RightRatingText:'Perfect'
                    //     }
                    // }}
                    // showFooter={false}
                    // supportUrl={"supportUrl"}
                    // delay={5000}
                    // isInline={true}
                    questId={questId}
                    showFooter={true}
                    // heading="How much did you learn from this section?"
                    // ratingType="number"

                    userId={userId}
                    token={token}
                    itemsPerPage={2}
                    // sections={[
                    //     {
                    //         heading: "General Feedback",
                    //         subHeading: "Please share your feedback",
                    //         button1Text: "cont",
                    //         button2Text: "Next",
                    //         placeholder: "Enter your Message",
                    //         showWordCount: true,
                    //         // showTopBar: false
                    //     },
                    //     {
                    //         heading: "Report a Bug",
                    //         subHeading: "Please describe your issue",
                    //         button1Text: "Cancel",
                    //         button2Text: "Next",
                    //         placeholder: "Enter your email",
                    //         showWordCount: true,
                    //         showTopBar: true
                    //     },
                    //     {
                    //         heading: "Request ",
                    //         subHeading: "Please describe your feature",
                    //         button1Text: "Cancel",
                    //         button2Text: "Next",
                    //         placeholder: "write",
                    //         showWordCount: true,
                    //         // showTopBar: false
                    //     },
                    //     {
                    //         heading: "Contact us",
                    //         subHeading: "Please describe your issue",
                    //         button1Text: "Cancel",
                    //         button2Text: "NExt",
                    //         placeholder: "write",
                    //         showWordCount: true,
                    //         // showTopBar: false
                    //     },
                    //     {
                    //         heading: "Contact us",
                    //         subHeading: "Please describe your issue",
                    //         button1Text: "Cancel",
                    //         button2Text: "Next",
                    //         placeholder: "write",
                    //         showWordCount: true,
                    //         // showTopBar: false
                    //     },
                    // ]}
                />
            </QuestProvider>
        )
    return (<SurveyOffline
        heading={"Share Your Feedback"}
        subHeading={"How was your experience?"}
        itemsPerPage={2}
        offlineFormData={state}
        showFooter={false}
        BrandTheme={{
            background: 'black',
            fontFamily: 'Cursive',
            primaryColor: 'white',
            secondaryColor: 'grey',
            tertiaryColor: 'white',
            accentColor: 'blue',
            borderRadius: '10px',
            titleColor: 'yellow',
            contentColor: '#3927F8',
            buttonColor: '#3927F8',
            logo: ''
        }}
        QuestThemeData={{
            accentColor: 'blue',
            theme: 'light',
            borderRadius: '16px',
            buttonColor: 'yellow',
            images: []
        }}
        styleConfig={{
            // Form: {
            //     font: "sans",
            //     // color: "red",
            //     // backgroundColor: "gray"
            // },
            // Rating: {
            //     RatingContainer: {
            //         color: "red",

            //     },
            //     SingleRating: {
            //         color: "red"
            //     },
            //     RatingText: {
            //         color: "green"
            //     },
            //     Hover: {
            //         color: "grey",
            //         background: "yellow",
            //     }
            // }
        }}
    />)
}
