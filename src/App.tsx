import React, { useState } from "react";
// import { OnBoarding, QuestLogin } from '..'
import OnBoarding from "./components/Onboarding";
import CreditsPopup from "./components/CreditsPopup";
import CreditButton from "./components/CreditButton"

function App() {
    const [answer, setAnswer] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    function print() {
        console.log("ggg");
    }

    return (
        <div>
            {/* <OnBoarding
                apiKey="k-6fe7e7dc-ac8f-44a1-8bbf-a1754ddf88be"
                apiSecret="s-7462f377-2ce4-4593-a907-3a2a00cdf951be06358a-d95d-4576-b3b4-a07dda2dab36"
                entityId="e-0000000000"
                questId="q-296268eb-5731-43b2-8de2-8077f809f139"
                userId="u-4cc510a4-e670-4ed3-abe3-c351c19bb992"
                token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTRjYzUxMGE0LWU2NzAtNGVkMy1hYmUzLWMzNTFjMTliYjk5MiIsImlhdCI6MTY5MzU2NjA2NSwiZXhwIjoxNjkzNjUyNDY1fQ.SDtmrcqKvZs-29kBIB6imsWzZZgUh78f-RP6nlLsM8k"
                multiChoice="modal2"
                answer={answer}
                setAnswer={setAnswer}
                // customComponents={<Button answer={answer} setAnswer={setAnswer}/>}
                // customComponentPositions={2}
                inputFieldType={{
                    "ec-4289e9d2-320b-4063-9bc7-11f9250058f1": "textArea",
                }}
            /> */}
            <CreditsPopup
                isOpen={isOpen}
                onClose={setIsOpen}
                headingText="You’ve got free credits!"
                descText="We’ve added free $20 free credits to your account"
                isCloseble={true}
                continueButton={true}
                buttonText={"Continue"}
                buttonFunction={print}
            />
            <CreditButton
              addButton={true}
              btnText="Add more"
              fontSize="30"
              remainingCount={100}
              buttonFunction={print}
            />
        </div>
    );
}

export default App;
