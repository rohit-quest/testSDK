import React from "react";
import { OnBoarding } from '..'
import "../dist/style.css";

function App() {
    const answers = (ans) => {
        console.log(ans);
    };
    return (
        <div>
            <OnBoarding
                entityId="e-0000000000"
                questId="q-296268eb-5731-43b2-8de2-8077f809f139"
                userId="u-4cc510a4-e670-4ed3-abe3-c351c19bb992"
                design={[
                    [1, 4],
                    [2, 3],
                ]}
                answers={answers}
                multiChoice="modal2"
                headingScreen={[
                    { name: "n1", desc: "sdes" },
                    { name: "dd", desc: "es" },
                ]}
                color="red"
                btnColor="blue"
            />
        </div>
    );
}

export default App;
