import { useState } from 'react'
import OnBoarding from './components/Onboarding/Onboarding'
import GetStarted from './components/GetStarted/GetStarted'
import Tutorial from './components/TutorialScreen/Tutorial'
import FeedbackWorkflow from './components/FeedbackOverview/FeedbackOverview'
import HelpHub from './components/HelpHub/HelpHub'
import Survey from './components/Survey/Survey'
import Search from './components/Search/Search'
import InlineFeedback from './components/InlineFeedback/InlineFeedback'
import DailyStreak from './components/Streak/DailyStreak'
import GamifiedQuiz from './components/GamifiedQuiz/GamifiedQuiz'
import {Referral} from './components/expansion/ReferEarn'
import ShareArticle from './components/Share/ShareArticle'
import { CrossSelling } from './components/expansion/CrossSelling'


// Testing done by vivek

export default function Test() {
    const [answers, setAnswers] = useState([])
    const getAnswers = () => { }

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTA2ZDY1NDYxLTdjNWYtNDczNy05NDZkLWM4YWI4YzgwZWIyNSIsImlhdCI6MTcxNzA0NTI5NSwiZXhwIjoxNzE3NjUwMDk1fQ.8CJuQA2I-zF8zFRLLCnnmzX6ceHsegKztOe5vYyYcXU'
    const userId = 'u-06d65461-7c5f-4737-946d-c8ab8c80eb25'

    return (
        <>
            {/* <OnBoarding
                questId="c-785e232d-5ec1-483a-ba12-2b8cdf344ca2"
                userId={userId}
                token={token}
                progress={['Personal Details', 'Professional Details']}
                controlBtnType="Buttons"
                headingScreen={[
                    { name: 'Identity Insights', desc: 'Revealing dimensions beyond words' },
                    { name: 'Professional Details', desc: 'Tell us more about your company' },
                ]}
                template="multi-question"
                design={[
                    [1, 2, 3],
                    [4, 5, 6],
                ]}
                singleChoose="modal1"
                multiChoice="modal2"
                styleConfig={{
                    Form: {},
                    Topbar: {},
                    Heading: {},
                    Description: {},
                    Input: {},
                    Label: {},
                    TextArea: {},
                    PrimaryButton: {},
                    SecondaryButton: {},
                    SingleChoice: { style: {}, selectedStyle: {} },
                    MultiChoice: { style: {}, selectedStyle: {} },
                    ProgressBar: {
                        completeTabColor: '',
                        currentTabColor: '',
                        pendingTabColor: '',
                    },
                    Footer: { FooterStyle: {}, FooterText: {}, FooterIcon: {} },
                }}
                getAnswers={getAnswers}
                setAnswer={setAnswers}
                answer={answers}
                uniqueUserId='1234'
            /> */}
            {/* <GetStarted
                userId={userId}
                token={token}
                questId="c-87d9f5a5-e327-45d2-a02c-f4e766c72b13"
                template={1}
                headingText="Quickstart Guide"
                descriptionText="Get started with Quest and explore how Quest can take you to the next level"
                showProgressBar={true}
                arrowColor=""
                showFooter={true}
                ButtonType="Arrow"
                styleConfig={{
                Form: {},
                Heading: {},
                Description: {},
                PrimaryButton: {},
                SecondaryButton: {},
                Footer: { FooterStyle: {}, FooterText: {}, FooterIcon: {} },
                Card: {},
                ProgressBar: { },
                CardContainer: {},
                Icon: {},
                Arrow: {
                    Background: '',
                    IconColor: '',
                    CompletedBackground: '',
                    CompletedIconColor: '',
                },
                }}
                variation='test'
            /> */}
            {/* <Tutorial
                userId={userId}
                token={token}
                questId="c-9b35d312-feab-4ed7-98f1-55b127354e40"
                heading="Quest List"
                subheading="Discover our key features"
                variation='test'
            /> */}
            {/* <FeedbackWorkflow
                userId={userId}
                token={token}
                questId="c-70178e40-bc6f-434f-81b4-806a47472961"
                GeneralFeedback={{
                heading: '',
                description: '',
                formHeading: '',
                formDescription: '',
                }}
                ReportBug={{
                heading: '',
                description: '',
                formHeading: '',
                formDescription: '',
                }}
                RequestFeature={{
                heading: '',
                description: '',
                formHeading: '',
                formDescription: '',
                }}
                ContactUs={{ heading: '', description: '', iconUrl: '' }}
                styleConfig={{
                Heading: {},
                Description: {},
                Form: {},
                Label: {},
                Input: {},
                PrimaryButton: {},
                SecondaryButton: {},
                Footer: { FooterStyle: {}, FooterText: {}, FooterIcon: {} },
                listHeading: {},
                listDescription: {},
                Card: {},
                EmailError: { text: '' },
                listHover: {
                    background: '',
                    iconBackground: '',
                    iconColor: '',
                    Heading: '',
                    Description: '',
                    IconSize: '16px',
                },
                ThanksPopup: { ShowFooter: true },
                }}
                contactUrl="https://calendly.com/shubham-quest/chat"
                isOpen={true}
                variation='test'
            /> */}
            {/* <HelpHub
                userId={userId}
                token={token}
                questId="c-418eedf1-7d52-476f-85d6-54c8f9c7e3d0"
                variation='test'
            /> */}
            {/* <Survey
                questId="c-6dfbd527-6a72-4778-8673-317b51f11d5e"
                token={token}
                userId={userId}
                heading="How was your experience?"
                subHeading="Welcome back, Please complete your details"
                itemsPerPage={2}
                ratingType="emoji"
                showFooter={true}
                styleConfig={{
                Heading: {},
                Description: {},
                Form: {},
                Label: {},
                Input: {},
                PrimaryButton: {},
                SecondaryButton: {},
                Footer: { FooterStyle: {}, FooterText: {}, FooterIcon: {} },
                TopBar: {},
                Rating: { LeftRatingText: '', RightRatingText: '' },
                EmailError: { text: '' },
                MultiChoice: { style: {}, selectedStyle: {} },
                }}
                variation='number'
            /> */}
              {/* <Search
                userId={userId}
                token={token}
                questId="c-67726bed-52c4-4ea3-b9a0-5d9070cfffcf"
                open={true}
                showFooter={true}
                styleConfig={{
                Form: {},
                Heading: {},
                Description: {},
                Input: {},
                Label: {},
                Footer: { FooterStyle: {}, FooterText: {}, FooterIcon: {} },
                Icon: {},
                listHover: {
                    background: '',
                    iconBackground: '',
                    Heading: '',
                    Description: '',
                },
                }}
                variation='test'
            /> */}
              {/* <InlineFeedback
                questId="c-7ff8e9fa-ddc9-43d0-a9f7-090aba370370"
                userId={userId}
                token={token}
                type="emoji"
                styleConfig={{
                ActionButton: {},
                ActionContainer: {},
                ActionSelectedButton: {},
                Description: {},
                Footer: {},
                Form: {},
                Heading: {},
                IconStyle: {},
                MainHeading: {},
                SelectedIconStyle: {},
                }}
                variation='test'
            /> */}
            {/* <DailyStreak
                userId={userId}
                token={token}
                metric="undefined"
                pendingStreakImg=""
                filledStreakImg=""
                styleConfig={{ Heading: {}, Description: {}, Footer: {} }}
                stepDetails={[
                {
                    description: 'This is the longest streak you’ve ever head1',
                    title: 'Confident reader',
                    range: 3,
                },
                {
                    description: 'This is the longest streak you’ve ever head2',
                    title: 'Responsible reader',
                    range: 2,
                },
                {
                    description: 'This is the longest streak you’ve ever head3',
                    title: 'Serious learner',
                    range: 5,
                },
                {
                    description: 'This is the longest streak you’ve ever head4',
                    title: 'Absolute reader',
                    range: 3,
                },
                ]}
            /> */}
            {/* <GamifiedQuiz
                questId="c-dbc51e1e-82fd-426c-bbd4-1fbd4ae06764"
                userId={userId}
                token={token}
                questionsPerSection={2}
                sectionSubHeading={['', 'Fill the details']}
                sectionHeading={['Fill the details', 'Fill the details']}
                showFooter={true}
                thanksPopUpFooter={true}
                styleConfig={{
                Heading: {},
                Input: {},
                PrimaryButton: {},
                SecondaryButton: {},
                Footer: {},
                FormContainer: {},
                Question: {},
                ThanksPopup: {},
                ThanksPopupHeading: {},
                ThanksPopupDescription: {},
                OptionsSelectedColor: {},
                }}
                setGamifiedQuiz={setAnswers as any}
                gamifiedQuiz={answers as any}
                questions={1}
                setQuestions={(() => {}) as any}
                variation='test'
            /> */}
              {/* <Referral
                questId="c-a75b5d03-0bf5-4fb3-9bdf-bb7c0f2c3688"
                token={token}
                userId={userId}
                showFooter={true}
                styleConfig={{
                  Form: {},
                  Heading: {},
                  Description: {},
                  Input: {},
                  Label: {},
                  TextArea: {},
                  PrimaryButton: {},
                  SecondaryButton: {},
                  Modal: {},
                  Footer: { FooterStyle: {}, FooterText: {}, FooterIcon: {} },
                  Icon: {},
                }}
            /> */}
              {/* <ShareArticle
                questId="c-394a4c97-c52b-4458-8a4b-95e557a78212"
                token={token}
                userId={userId}
                description="If you like this article share it with your friends"
                heading="Share this article"
                styleConfig={{ Description: {}, Form: {}, Heading: {} }}
                variation='test'
            /> */}
              {/* <CrossSelling
                questId="c-964523c0-c900-4dfc-81d8-d9f2783a48ba"
                token={token}
                userId={userId}
                expiryDate={0}
                showFooter={true}
                gradientBackground={true}
                styleConfig={{
                BackgroundWrapper: {},
                Description: {},
                Footer: { FooterStyle: {}, FooterText: {}, FooterIcon: {} },
                Form: {},
                Heading: {},
                PrimaryButton: {},
                SecondaryButton: {},
                Timer: { backgroundColor: '', primaryColor: '', secondaryColor: '' },
                }}
            /> */}
        </>
    )
}
