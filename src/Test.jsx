import React, { useState } from 'react';
import { QuestProvider } from './components/QuestWrapper';
import OnBoarding from './components/Onboarding/Onboarding';

export default function Test() {
  const [answers, setAnswers] = useState(['A', 'B', 'C'])

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <QuestProvider
        apiKey="k-ac38b717-eb62-41aa-83f4-7eef8d3ff9b5"
        entityId="e-e6cc0ded-bf40-4f1f-94a3-a9ba73be098f"
        apiType='STAGING'
        themeConfig={{
            backgroundColor: "",
            borderColor: "",
            buttonColor: "",
            primaryColor: "",
            secondaryColor: "",
            fontFamily: ""
        }}
      >
        <OnBoarding
            questId="q-7ab5f7bf-2231-46cc-8f83-70f40cd99fdf"
            userId="u-5781462f-2674-4caa-b805-1c9184b496c9"
            token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTU3ODE0NjJmLTI2NzQtNGNhYS1iODA1LTFjOTE4NGI0OTZjOSIsImlhdCI6MTcxMzMzNjQ4NCwiZXhwIjoxNzEzOTQxMjg0fQ.1WRboHR3mgM7cC9qsRHGR8wqlHtJTaLvzRhrkiuR1zg"
            controlBtnType= "Buttons"
            headingScreen= {[{"name":"Identity Insights","desc":"Revealing dimensions beyond words"}]}
            singleChoose= "modal1"
            multiChoice= "modal2"
            styleConfig= {{"ProgressBar":{"completeTabColor":"","currentTabColor":"","pendingTabColor":""}}}
            answer={answers}
            setAnswer={setAnswers}
            enableVariation
        />
      </QuestProvider>
    </div>
  );
}