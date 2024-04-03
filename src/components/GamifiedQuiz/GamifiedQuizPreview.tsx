import React, { useState } from 'react'
// import OnBoardingOff from './OfflineComponent'
// import OnBoarding from './Onboarding'
import { QuestProvider } from '../QuestWrapper';
import { answer } from '../QuestForm/response';
import showToast from '../toast/toastService';
// import GamifiedQuiz from './GamifiedQuizNew';
// import GamifiedQuizNew from './GamifiedQuizNew';
import GamifiedQuiz from './GamifiedQuiz';
// import GamifiedQuizOfflineNew from './GamifiedQuizOfflineNew';
import GamifiedQuizOffline from './GamifiedQuizOffline';
export const questId = 'q-d00f89ad-b89f-46bb-82a9-80a1cd7c5717';
export const apiKey = 'k-e6ec8094-6eef-4e80-a804-112a63607bf5'
export const apiSecret = 's-5bafb222-c5bd-4c14-9dfe-9d72fb5e275b9cacf740-3c56-44e9-afe3-b1c0aa6a8a42'
export const entityId = 'e-5768fd26-d226-4ac1-81e6-3c99427f3fb3'
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTg4MzUwY2FhLTQwODAtNDUwNS1hMTY5LTA5ZjNmMTVlODNiNyIsImlhdCI6MTcxMjExNTM1OSwiZXhwIjoxNzEyNzIwMTU5fQ.A0u4nEwrpsSJFk2c-EW8c7XoI1-nxMteic68YqLCFRc'
export const userId = 'u-88350caa-4080-4505-a169-09f3f15e83b7'

export default function GamifiedQuizPreviewNew({ online = false }: { online?: boolean }) {
    const [offlineAnswer, setOfflineAnswer] = useState<Record<string, string | Array<string>>>({});
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
            // placeholder: undefined,
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
            options: ['One', 'Two', 'Three', 'Four'],
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
            options: ['Blue', 'Red', 'Yellow', 'White'],
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
            options: ['Monitor', 'Mouse', 'Keyboard', 'CPU'],
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
            options: ['mongo', 'sql', 'mysql', 'reddis', 'oracle', 'mssql', 'other'],
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
            placeholder: '',
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
            placeholder: '',
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
            placeholder: '',
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
        }
    ];
    // setTimeout(() => {
    //   state.offlineFormData.pop();
    //   setState(c=>({...c}))
    // }, 2000);
    // console.log(offlineAnswer)
    if (online) {
        return (
            <QuestProvider
                apiKey={apiKey}
                apiSecret={apiSecret}
                entityId={entityId}
                featureFlags={{}}
                apiType="STAGING"
            >
                <GamifiedQuiz
                    userId={userId}
                    questId={questId}
                    // answer={answer}
                    // setAnswer={setAnswer}
                    token={token}
                    heading='Heading Online'

                    // questionSections={[[1, 2, 3, 4], [5, 6], [7, 8], [9, 10]]}
                    questionSections={[[1, 2, 3, 4], [5, 6], [7, 8], [9, 10],[11]]}
                    // questionSections={[[1], [5, 6], [7, 8], [9, 10]]}
                    sectionSubHeading={["Section 1", "Srction 2", "section 3", "Section 4"]}
                    // sectionSubHeading={["", "", "", ""]}
                    sectionHeading={["Section Head 1", "", "", "Section Head 4"]}

                    showFooter={true}
                    thanksPopUpFooter={true}

                    styleConfig={
                        {
                            Heading: {
                                // background: "yellow",
                                // margin: "25px"
                                // color: "red"
                            },
                            ComponentTheme: {
                                // color: 'yellow',
                                // fontSize: "58px",
                                // background: "yellow"
                            },
                            FormContainer: {
                                // background: "red"
                            },
                            Question: {
                                // color: "pink",
                            },
                            Input: {
                                // background: "blue",
                                // color: "white"
                            },
                            PrimaryButton: {
                                // background: 'yellow',
                                // color: "red"
                            },
                            SecondaryButton: {
                                // background: 'yellow',
                                // color: 'red'
                            },
                            Footer: {
                                // background:"red"
                            },
                            FooterText: {
                                // color:"yellowgreen"
                            },
                            ThanksPopup: {
                                // background: "red",
                                // color: "white"
                            },
                            ThanksPopupHeading: {
                                // color: "pink"
                            },
                            ThanksPopupDescription: {
                                // color: "pink"
                            },
                            ThanksPopUpFooter: {
                                // background: "yellow",
                                // color:"white"
                            },
                            ThanksPopUpGotoHome: {
                                // background: "yellow",
                                // color:"white"
                            },
                            OptionsSelectedColor: {
                                // color: 'red'
                            }
                        }
                    }

                // customComponents={<CustomButton />}
                // getAnswers={printAnswer}
                // screenHeight=""
                // progressBarType="modal1"

                />
            </QuestProvider>
        )
    }

    return (
        <QuestProvider
            apiKey={apiKey}
            apiSecret={apiSecret}
            entityId={entityId}
            featureFlags={{}}
            apiType="STAGING"
        >
            <GamifiedQuizOffline
                offlineAnswer={offlineAnswer}
                setOfflineAnswer={setOfflineAnswer}
                userId={userId}
                questId={questId}
                // answer={answer}
                // setAnswer={setAnswer}
                token={token}
                heading='Heading Offline'
                questionSections={[[1, 2, 3, 4], [5, 6], [7, 8], [9, 10]]}
                // questionSections={[[1], [5, 6], [7, 8], [9, 10]]}
                sectionSubHeading={["Section 1", "Srction 2", "section 3", "Section 4"]}
                sectionHeading={["Section Head 1", "", "section Head 3", "Section Head 4"]}
                singleChoiceTextHeading='single choice testing'
                multiChoiceTextHeading='Multi testing'

                showFooter={true}
                thanksPopUpFooter={true}

                styleConfig={
                    {
                        Heading: {
                            // background: "yellow",
                            // margin: "25px"
                            // color: "red"
                        },
                        ComponentTheme: {
                            // color: 'yellow',
                            // fontSize: "58px",
                            // background: "yellow"
                        },
                        FormContainer: {
                            // background: "red"
                        },
                        Question: {
                            // color: "pink",
                        },
                        Input: {
                            // background: "blue",
                            // color: "white"
                        },
                        PrimaryButton: {
                            // background: 'yellow',
                            // color: "red"
                        },
                        SecondaryButton: {
                            // background: 'yellow',
                            // color: 'red'
                        },
                        Footer: {
                            // background:"red"
                        },
                        FooterText: {
                            // color:"yellowgreen"
                        },
                        ThanksPopup: {
                            // background: "red",
                            // color: "white"
                        },
                        ThanksPopupHeading: {
                            // color: "pink"
                        },
                        ThanksPopupDescription: {
                            // color: "pink"
                        },
                        ThanksPopUpFooter: {
                            // background: "yellow",
                            // color:"white"
                        },
                        ThanksPopUpGotoHome: {
                            // background: "yellow",
                            // color:"white"
                        },
                        OptionsSelectedColor: {
                            // color: 'red'
                        }
                    }
                }
                formDataOffline={formDataOffline}

            // customComponents={<CustomButton />}
            // getAnswers={printAnswer}
            // screenHeight=""
            // progressBarType="modal1"

            />
        </QuestProvider>
    )

}
