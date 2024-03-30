
import React, { useState } from 'react'
import Feedback from './Feedback';
import { QuestProvider } from '../QuestWrapper';
import Survey from './Survey';
import SurveyOffline from './OfflineComponent';
export const questId = 'q-f9438032-3fc5-4f07-8ba2-c4575cc62ef4';
export const apiKey = 'k-4262ffa5-e6df-4303-b97a-30a6a59db6df'
export const apiSecret = 's-5bafb222-c5bd-4c14-9dfe-9d72fb5e275b9cacf740-3c56-44e9-afe3-b1c0aa6a8a42'
export const entityId = 'e-6294feab-376d-4d20-aa7e-afdfb3254323'
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTgyNjhmNWUxLWY1YTEtNDQwYy1hMzMzLTBmNTU3OGE3Mzg0NyIsImlhdCI6MTcxMTc4MTgzOCwiZXhwIjoxNzEyMzg2NjM4fQ.fFLnfzMmLAnLcIzi3X_WgoCu8XHPYLF5n6mkoCmT82c'
export const userId = 'u-8268f5e1-f5a1-440c-a333-0f5578a73847'

export default function FeedbackPreview({ online = true }) {
    const [state,setState] = useState([
        {
            "type": "USER_INPUT_TEXTAREA",
            "question": "Message",
            "options": [],
            "criteriaId": "ec-6e6ece4b-228c-42ba-bb36-45fcdc50b28b",
            "required": true,
            "placeholder": "Enter your Message"
        },
        {
            "type": "USER_INPUT_TEXT",
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
                    fontFamily:'cursive'
                }}
                apiType='STAGING'
            >
                <Survey
                    // userId={userId}
                    // token={token}
                    // questId={"q-1a12c0e1-35a8-48a3-8cde-a8616f341b88"}
                    // heading={"Share Your FeedBack"}
                    // subHeading={"How was your experience?"}
                    // styleConfig={{
                    //     Form: {
                    //         font: "sans",
                    //         color: "red",
                    //         // backgroundColor: "gray"
                    //     }
                    // }}
                    // showFooter={false}
                    // supportUrl={"supportUrl"}
                    // delay={5000}
                    // isInline={true}
                    questId={questId}
                    showFooter={false}
                    // heading="How much did you learn from this section?"
                    // ratingType="number"
                    userId={userId}
                    token={token}
                    itemsPerPage={2}
                />
            </QuestProvider>
        )
    return (<SurveyOffline
        heading={"Share Your Feedback"}
        subHeading={"How was your experience?"}
        itemsPerPage={2}
        offlineFormData={state}
        showFooter={false}

    />)
}
