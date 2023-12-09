import React, { useState } from "react";
// import { OnBoarding, QuestLogin } from '..'
import { QuestProvider } from "./components/QuestWrapper";
import QuestLogin from "./components/Login/Login";
import { answer } from "./components/QuestForm/response";
import { HelpCenter } from "./components/HelpCenter/HelpCenter";
import { ReferEarn, ReferShare } from "./components/Refer/ReferEarn"
import { showToast } from "./components/toast/toastService";
import { QuestForm } from "./components/QuestForm/index";
import Feedback from "./components/Feedback/Feedback";
import FeedbackWorkflow from "./components/FeedbackOverview/FeedbackOverview";
import Tutorial from "./components/TutorialScreen/TutorialScreen"
import OnBoarding from "./components/Onboarding/Onboarding";
import { confetti } from "./components/Confetti/confetti";
import GetStarted from "./components/GetStarted/GetStarted";
import ShareArticle from "./components/Share/ShareArticle";
import Search from "./components/Search/Search";
import { ChatIcon, LinkIcon } from "./components/HelpCenter/Svg";
import { copyLargeSVG, copySVG, discordSvg, googleImg, twitterPng, whatsappSvg } from "./assets/images";
// import dataArray from "./components/Search/mock.json"
// export const questId = 'q-f825ebd2-57f2-4f21-90a2-843e22b4a7f5';
// export const apiKey = 'k-0d087a04-f631-41e1-80dd-fdc9ab2abb07'
// export const apiSecret = 's-329b70b4-cd43-472d-bd41-c2fea09490e0c7196f7b-9020-4bc1-9a11-b70214e3eb48'
// export const entityId = 'e-0000000000'
// export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWUzYmVhMWQzLTE5MTctNGI5YS1iODU1LWYxM2Q0N2RmZTJlZCIsImlhdCI6MTY5NjQyODA5MSwiZXhwIjoxNjk2NTE0NDkxfQ.b-HXLyQwQ-R94fUNnHW2omE0JtFy4C1oSpjuQLFCb-o'
// export const userId = 'u-e3bea1d3-1917-4b9a-b855-f13d47dfe2ed'

export const questId = 'q-2b37975b-30f7-4572-a5f4-c354439b3970';
export const apiKey = 'k-68a0c6b8-b27f-49c6-a315-b0c9cba15bf4'
export const apiSecret = 's-5bafb222-c5bd-4c14-9dfe-9d72fb5e275b9cacf740-3c56-44e9-afe3-b1c0aa6a8a42'
export const entityId = 'e-d97d4353-c517-4ce3-a5e0-f81b3dbb80b5'
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWUzYmVhMWQzLTE5MTctNGI5YS1iODU1LWYxM2Q0N2RmZTJlZCIsImlhdCI6MTY5NjY3MDA5OCwiZXhwIjoxNzI4MjI3Njk4fQ.E_hQ-o8E4jbAMmuJBqwwWFebr9_NoSIykGq_CavR7kE'
export const userId = 'u-e3bea1d3-1917-4b9a-b855-f13d47dfe2ed'

function App() {

    const [answer, setAnswer] = useState<answer>([])

    // Mock CustomButton Component
    const CustomButton = () => (
        <button>
            Submit
        </button>
    );

    // Mocked function for getAnswers prop
    function printAnswer() {
        showToast.success({ text: "You have submitted the form successfully you can find more on Quest admin dashboard" })
    }

    const [complete, setComplete] = useState(false)

    const getstarted = {
        apiKey: "k-6fe7e7dc-ac8f-44a1-8bbf-a1754ddf88be",
        apiSecret: "s-7462f377-2ce4-4593-a907-3a2a00cdf951be06358a-d95d-4576-b3b4-a07dda2dab36",
        entityId: "e-0000000000"
    }

    const [data, setData] = useState([]);

    return (
        <div
        // style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", gap: "20px" }}
        >




            {/* <Search
                data={data}
                wholerScreen={true}
                open={true}
                defaultResult={dataArray.slice(0, 5)}
                defulatResultLength={10}
                isFilter
                // backgroundColor=""
                // color=""
                // inputColor=""
                onSearch={(str: string) => {
                    console.log('Search string:', str);
                    setData(str ? dataArray.filter(({ text }) => text.toLocaleLowerCase()
                        .includes(str.toLocaleLowerCase())).slice(0, 10) : []);
                }}
            /> */}












            {/* <VisitStreak color={'white'} backgroundColor={'black'}/> */}

            <QuestProvider
                apiKey={apiKey}
                apiSecret={apiSecret}
                entityId={entityId} featureFlags={{}}
            >


                {/* 
                <HelpCenter
                    userId={userId}
                    token={token}
                    questId="q-01533080-10f2-4309-b6b8-2e0757196d2b"
                    onClose={() => {
                        console.log("closed")
                    }}
                // backgroundColor="blue"
                // color="red"
                // headColor="yellow"
                // descriptioin="this is descripiton"
                /> */}



                {/* <QuestForm
                    userId={userId}
                    questId={questId}
                    answer={answer}
                    setAnswer={setAnswer}
                    token={token}
                /> */}



                 {/* <GetStarted
                    // questId="q-6b06e238-aece-40c6-a53d-0750f9130e1d"
                    // userId={"u-ee5f090e-6434-45de-8bcd-fce22d775bcf"}
                    // token={"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LWVlNWYwOTBlLTY0MzQtNDVkZS04YmNkLWZjZTIyZDc3NWJjZiIsImlhdCI6MTY5OTM3MDIyMCwiZXhwIjoxNjk5NDU2NjIwfQ.lj86UTiNxRi0riBGla85yr51blIQcJ1YRCfZgM3izUE"}
                    token={token}
                    userId={userId}
                    questId="q-7d780bbd-c41c-48dd-a29d-415309a23cc2"
                    buttonBg="blue"
                    // buttonColor="yellow"
                    // cardBG="grey"
                    cardHeadingColor="black"
                    icons={[ whatsappSvg,  discordSvg]}

                    completeAllStatus={() => {
                        showToast.success({ text: "completed successfully" })
                    }}
                    // onLinkTrigger={(url,id)=>{
                    //     console.log(url,id)
                    // }}
                />  */}








                {/* <button
                    onClick={() => {
                        confetti(5000)
                    }}>
                    Show Confetti</button> */}


                {/* <button onClick={() => { showToast.warn({ duration: 3000, text: "This is a warning message" }) }}>warning</button>
                <button onClick={() => { showToast.error({ duration: 2000, text: "" }) }}>Error</button>
                <button onClick={() => { showToast.info({ duration: 2000, text: "" }) }}>Info</button>
                <button onClick={() => { showToast.success({ duration: 2000, text: "" }) }}>Success</button>
 */}

                {/* <OnBoarding
                    userId={userId}
                    questId={questId}
                    answer={answer}
                    setAnswer={setAnswer}
                    token={token}
                    answerFontSize="14px"
                    progress={["Personal Details", "Professional Details", "Additional Details"]}
                    previousBtnText="previous"
                    nextBtnText="next"
                    color=""
                    bgColor="#fff"
                    controlBtnType="Arrow"
                    headingSize="24px"
                    descSize="18px"
                    inputFieldType={{
                        "ec-xxxxxxxxxxxxxxxxx": "textArea"
                    }}
                    btnColor=""
                    btnSize="200px"
                    inputBgColor=""
                    inputBorder=""
                    singleChoose="modal1"
                    multiChoice="modal2"
                    design={[[1, 2], [3, 4], [5, 6]]}
                    headingScreen={[{ name: "Tell us about yourself", desc: "" },
                    { name: "Tell us more about your company", desc: "" },
                    { name: "A little more will help us guide you the best", desc: "" }]}
                    customComponents={<CustomButton />}
                    getAnswers={printAnswer}
                    screenHeight=""
                /> */}




                <Tutorial
                    heading={"Tutorial Screen"}
                    subheading={"subheading"}
                    // bgColor="blue"
                    // btnColor="yellow"
                    // btnTextColor="red"
                    // font='sans'
                    questId="q-7d780bbd-c41c-48dd-a29d-415309a23cc2"
                    userId={userId}
                    token={token}
                    // textColor="blue"
                /> 




                {/* <FeedbackWorkflow
                    // font="sans"
                    // textColor="red"
                    isOpen={true}
                    // btnColor="yellow"
                    // btnTextColor="blue"
                    // backgroundColor="skyblue"
                    questIds={[
                        'q-general-feedback',
                        'q-report-a-bug',
                        'q-request-a-feature',
                        'q-contact-us',
                    ]}
                    userId={userId}
                    topbarColor=""
                    token={token}
                    contactUrl="https://calendly.com/shubham-quest/chat"
                /> */}


                {/* <Feedback
                    userId={userId}
                    token={token}
                    questId={"q-1a12c0e1-35a8-48a3-8cde-a8616f341b88"}
                    // bgColor={"gray"}
                    // font={"sans"}
                    // textColor={"red"}
                    // btnColor={"blue"}
                    // btnTextColor={"yellow"}
                    heading={"Share Your FeedBack"}
                    subHeading={"How was your experience?"}
                    supportUrl={"supportUrl"}
                    delay={5000}
                    isInline={true}
                />  */}

                {/* <ReferEarn
                    questId={questId}
                    token={token}
                    userId={userId}
                    isOpen={true}
                    // bgColor="red"
                    // color="white"
            />*/}









                {/* <ReferShare
                    questId={questId}
                    token={token}
                    userId={userId}
                    isOpen={true}
                    // bgColor="gray"
                    // color="blue"
                    // isArticle={true}
            /> */}







                {/* <QuestLogin
                    // questId=""
                    textColor=""
                    btnTextColor=""
                    backgroundColor="white"
                    btnColor=""
                    googleClientId="103575086200-2gijbo8rldrv5sg60u0u1rl4cmldhm8a.apps.googleusercontent.com"
                    redirectUri="http://localhost:3000"
                    redirectURL="https://www.questlabs.ai/"
                ></QuestLogin> */}

                {/* <ShareArticle
                    bgColor=""
                    // description=""
                    // heading=""
                    headingColor="black"
                    textColor=""
                    token={token}
                    questId="q-5976dbae-0c4d-4df6-ba70-231e53dd1532"
                    userId={userId}
                /> */}
            </QuestProvider>
            {/*  */}
        </div >
    )
}

export default App;
