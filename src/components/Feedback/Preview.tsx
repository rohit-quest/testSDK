
import React, { useState } from 'react'
import Feedback from './Feedback';
import { QuestProvider } from '../QuestWrapper';
import Survey from './Survey';
import SurveyOffline from './OfflineComponent';
export const questId = 'q-0fb00a2e-4eac-4049-b3c2-bd716d86700d';
export const apiKey = 'k-e6ec8094-6eef-4e80-a804-112a63607bf5'
export const apiSecret = 's-000b6012-ee89-4193-bfb8-49873edaaa501e5a0e3f-effb-4f6f-bf62-30c885d62679'
export const entityId = 'e-5768fd26-d226-4ac1-81e6-3c99427f3fb3'
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTg4MzUwY2FhLTQwODAtNDUwNS1hMTY5LTA5ZjNmMTVlODNiNyIsImlhdCI6MTcxMTY4MzM3NCwiZXhwIjoxNzEyMjg4MTc0fQ.8RG2GO96kRbfc-2P2_Ber4aRobswLfAK2mGQUVEpS3A'
export const userId = 'u-88350caa-4080-4505-a169-09f3f15e83b7'

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
                    heading={"Share Your FeedBack"}
                    subHeading={"How was your experience?"}
                    styleConfig={{
                        Form: {
                            // font: "sans",
                            // color: "red",
                            // backgroundColor: "gray"
                        },
                        Heading: {
                            color: "red",
                            // fontSize:'10px'
                        },
                        Label: {
                            // color: "green"
                        },
                        TopBar: {
                            // display: "none"
                        },
                        Rating: {
                            RatingContainer: {
                                color: "red",


                            },
                            SingleRating: {
                                color: "red",
                                background: "yellow"

                            },
                            RatingText: {
                                color: "green"
                            },
                            Hover: {
                                color: "grey",
                                background: "yellow"
                            },
                            // LeftRatingText:'Not',
                            // RightRatingText:'Perfect'
                        }
                    }}
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
                    itemsPerPage={1}

                    sections={[
                        {
                            heading: "General Feedback",
                            subHeading: "Please share your feedback",
                            button1Text: "cont",
                            button2Text: "Next",
                            placeholder: "Enter your Message",
                            showWordCount: true,
                            // showTopBar: false
                        },
                        {
                            heading: "Report a Bug",
                            subHeading: "Please describe your issue",
                            button1Text: "Cancel",
                            button2Text: "Next",
                            placeholder: "Enter your email",
                            showWordCount: true,
                            showTopBar: true
                        },
                        {
                            heading: "Request ",
                            subHeading: "Please describe your feature",
                            button1Text: "Cancel",
                            button2Text: "Next",
                            placeholder: "write",
                            showWordCount: true,
                            // showTopBar: false
                        },
                        {
                            heading: "Contact us",
                            subHeading: "Please describe your issue",
                            button1Text: "Cancel",
                            button2Text: "NExt",
                            placeholder: "write",
                            showWordCount: true,
                            // showTopBar: false
                        },
                        {
                            heading: "Contact us",
                            subHeading: "Please describe your issue",
                            button1Text: "Cancel",
                            button2Text: "Next",
                            placeholder: "write",
                            showWordCount: true,
                            // showTopBar: false
                        },
                    ]}
                />
            </QuestProvider>
        )
    return (<SurveyOffline
        heading={"Share Your Feedback"}
        subHeading={"How was your experience?"}
        itemsPerPage={2}
        offlineFormData={state}
        showFooter={false}
        styleConfig={{
            Form: {
                font: "sans",
                // color: "red",
                // backgroundColor: "gray"
            },
            Rating: {
                RatingContainer: {
                    color: "red",

                },
                SingleRating: {
                    color: "red"
                },
                RatingText: {
                    color: "green"
                },
                Hover: {
                    color: "grey",
                    background: "yellow",
                }
            }
        }}
    />)
}
