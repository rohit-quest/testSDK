import React, { useState } from "react";
// import { OnBoarding, QuestLogin } from '..'
import OnBoarding from "./components/Onboarding/Onboarding";
import CreditsPopup from "./components/Credit/CreditsPopup";
import CreditButton from "./components/Credit/CreditButton";
import { QuestProvider } from "./components/QuestWrapper";
import Payment from "./components/Payment/Payment";
import ChatSupport from "./components/chatSupport/ChatSupport";
import Table from "./components/Analytics/Table"
import QuestChart from "./components/Analytics/QuestChart"




function App() {
    const [answer, setAnswer] = useState([]);
    const [isOpen, setIsOpen] = useState(true);

    const paymentBanefits = [
        {
            included: [
                "12 Campaigns / mo",
                "Campaign Insights",
                "Audience",
                "Integrations - Twitter, Discord",
            ],
            notIncluded: ["Custom Branding", "Automations", "Support"],
        },
        {
            included: [
                "12 Campaigns / mo",
                "Campaign Insights",
                "Audience",
                "Integrations - Twitter, Discord",
                "Custom Branding",
            ],
            notIncluded: ["Automations", "Support"],
        },
        {
            included: [
                "12 Campaigns / mo",
                "Campaign Insights",
                "Audience",
                "Integrations - Twitter, Discord",
                "Custom Branding",
                "Automations",
                "Support",
            ],
            notIncluded: [],
        },
    ];

    const getAnswers = () => {
        console.log("ggggggg")
    }

    return (
        <div>
            <QuestProvider
                apiKey="k-6fe7e7dc-ac8f-44a1-8bbf-a1754ddf88be"
                apiSecret="s-7462f377-2ce4-4593-a907-3a2a00cdf951be06358a-d95d-4576-b3b4-a07dda2dab36"
                entityId="e-0000000000"
                // apiKey="k-036784ba-8308-44d1-80f5-c094c5b39767"
                // apiSecret="s-7ab03405-87c6-463f-ad69-aa41e0d3a216d0668a5b-9c5e-478a-aca6-f8fab0ebed99"
                // entityId="e-5a4a908f-47fb-4f73-93a5-3cfb962b5750"
            >
                {/* <Payment
                    token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTRjYzUxMGE0LWU2NzAtNGVkMy1hYmUzLWMzNTFjMTliYjk5MiIsImlhdCI6MTY5NDA4NzMwMywiZXhwIjoxNjk0MTczNzAzfQ.oXm93jDBjvKyUiNw4zbAFH38DmMowFND0WwyAO9SRx4"
                    userId="u-4cc510a4-e670-4ed3-abe3-c351c19bb992"
                    description={[
                        "Basic yet functional UI design for cost-free exploration.",
                        "Polished interface with advanced features for enhanced user interaction.",
                        "Cutting-edge, personalized design for a luxurious and seamless user journey.",
                    ]}
                    paymentBanefits={paymentBanefits}
                    stripePublishableKey="pk_test_51NQ7BBSEjbArJKRyiAelVC0LVf1bNgYrlK7S1kJR9IeaeeDOJSiGXACoauoMWkyfSA7jDFThEczl5hJJhGmgcKTv00pKjFm9bq"
                /> */}
                {/* <Payment
                    token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTRjYzUxMGE0LWU2NzAtNGVkMy1hYmUzLWMzNTFjMTliYjk5MiIsImlhdCI6MTY5NDc3NzE1NiwiZXhwIjoxNjk0ODYzNTU2fQ.jN294yK8EaC-qWMsEtVNoo_X9FEtyS7Svr2Swbghfdk"
                    userId="u-4cc510a4-e670-4ed3-abe3-c351c19bb992"
                    description={[
                        "Basic yet functional UI design for cost-free exploration.",
                        "Polished interface with advanced features for enhanced user interaction.",
                        "Cutting-edge, personalized design for a luxurious and seamless user journey.",
                    ]}
                    paymentBanefits={paymentBanefits}
                    stripePublishableKey="pk_test_51NQ7BBSEjbArJKRyiAelVC0LVf1bNgYrlK7S1kJR9IeaeeDOJSiGXACoauoMWkyfSA7jDFThEczl5hJJhGmgcKTv00pKjFm9bq"
                /> */}
                <OnBoarding
                    token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTRjYzUxMGE0LWU2NzAtNGVkMy1hYmUzLWMzNTFjMTliYjk5MiIsImlhdCI6MTY5NTc3OTQzOCwiZXhwIjoxNjk1ODY1ODM4fQ.q_naM0_CcCV-lOqzEFEVTvhNlLYuq8OKnCud_rW3BjM"
                    userId="u-4cc510a4-e670-4ed3-abe3-c351c19bb992"
                    questId="q-e684c98e-55a0-4cd6-bcc5-0ccebaa4d86c"
                    answer={answer}
                    setAnswer={setAnswer}
                    // multiChoice="modal2"
                    // singleChoose="modal2"
                    // inputFieldType={{"ec-30012a21-0fcd-4331-b711-d2779e8a1303": "textArea"}}
                    // bgColor="aqua"
                    // btnColor="green"
                    // color="blue"
                    design={[[1,2,3],[6,4,5,7]]}
                    headingScreen={[{name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, eum.", desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, eum."},{name: "Lorem ipsum dolor sit amet consectetur adipisicing elit", desc:"Lorem ipsum dolor sit amet consectetur adipisicing elit"}]}
                    // inputBgColor="#ccc"
                    // inputBorder="2px solid red"
                    // headingSize="16px"
                    // descSize="12px"
                    // defaultFont = {false}
                    progress={["Basic details", "Presonal details"]}
                    // personalUserId="64f18c6c5554c919f7a3817c"
                    getAnswers={getAnswers}
                />
                
                {/* <ChatSupport/> */}
                {/* <Table
                    token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTRjYzUxMGE0LWU2NzAtNGVkMy1hYmUzLWMzNTFjMTliYjk5MiIsImlhdCI6MTY5NTA5MTk4MCwiZXhwIjoxNjk1MTc4MzgwfQ.5LxlZhhtSaA0y41DZPloLfPxXzFMrXEd4vYIyNg7f1k"
                    userId="u-4cc510a4-e670-4ed3-abe3-c351c19bb992"
                    questId="q-e684c98e-55a0-4cd6-bcc5-0ccebaa4d86c"
                    // headingBgColor="black"
                    // headingTextColor="white"
                    // bodyBgColor="gray"
                    // bodyTextColor="blue"
                    // horizontalBorder={true}
                    bodyTooltip={true}
                    headingTooltip={true}
                    hideQuestion={true}
                    showAvatar={true}
                /> */}
                {/* <QuestChart
                    token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTRjYzUxMGE0LWU2NzAtNGVkMy1hYmUzLWMzNTFjMTliYjk5MiIsImlhdCI6MTY5NTI2NTgyMSwiZXhwIjoxNjk1MzUyMjIxfQ.WXlNrSN6XZ9kNMvHdb-I93wody65UsZXfk8lEsajd9w"
                    userId="u-4cc510a4-e670-4ed3-abe3-c351c19bb992"
                    questId="q-e684c98e-55a0-4cd6-bcc5-0ccebaa4d86c"
                    boxWidth="400px"
                    chartType="Areachart"
                    // dataType="claim"
                    startDate="2023-08-10"
                    endDate="2023-09-10"
                    bgColor="black"
                    headingTextColor="yellow"
                    chartLineColor="yellow"
                    // disabledGrid={true}
                    // headingText="Hi"
                    metricChart={true}
                    metricIds={["view-onboardings", "clicks-on-connect-button",]}
                /> */}

                {/* <CreditButton remainingCount={100} addButton={true} btnText="add Credit"/> */}
                {/* <CreditsPopup isOpen={isOpen} buttonText="Continue" descText="Lorem ipsum dolor sit ame" headingText="Lorem ipsum dolor sit ame" isCloseble={true} continueButton={true} onClose={() => setIsOpen(!isOpen)}/> */}
                <ChatSupport />
            </QuestProvider>
        </div>
    );
}

export default App;
