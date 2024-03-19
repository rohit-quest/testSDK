import { QuestProvider } from "../QuestWrapper";
import { Challenges } from "./Challenges";
import { ChallengesOffline } from "./OfflineComponent";

const ChallengesPreview = ({ online = true }) => {
  const apiKey = "k-fe5a805c-77ed-4cae-bd33-9591ebed2805";
  const apiSecret =
    "s-b1b50609-4728-4702-8bd8-679f4b6560f08bfe2b25-2d65-4ae2-a652-c344bae62a24";
  const entityId = "e-9850377b-f88f-4426-a2ac-56206c74655a";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTgyNjhmNWUxLWY1YTEtNDQwYy1hMzMzLTBmNTU3OGE3Mzg0NyIsImlhdCI6MTcxMDgzMjg0NSwiZXhwIjoxNzExNDM3NjQ1fQ.y5GASBV304K4Vr_AxRa66mnJyMM2e0xEV0c4dDXYj2o";
  const userId = "u-8268f5e1-f5a1-440c-a333-0f5578a73847";
  const questId = "q-a3c879ba-522a-4b7a-af57-90418f9def77";

  return (
    <QuestProvider
      apiKey={apiKey}
      apiSecret={apiSecret}
      entityId={entityId}
      apiType="STAGING"
    // themeConfig={{
    //   primaryColor: "#551717",
    //   secondaryColor: "#35a52d",
    //   backgroundColor: "#a19090",
    //   fontFamily: "sans-serif",
    // }}
    >
      {online ?
        <Challenges
          token={token}
          userId={userId}
          questId={questId}
        // styleConfig={{
        //   Form: { backgroundColor: "#000000" },
        //   MainHeading: { color: "#551717" },
        //   Heading: { color: "#35a52d" },
        //   PointsColor: { color: "#d7429e" },
        //   InnerBackground: { background: "#5dcad4" },
        //   ProgressBarColor: { background: "#30d410" },
        // }}
        />
        :
        <ChallengesOffline
          token={token}
          userId={userId}
          questId={questId}
        // styleConfig={{
        //   Form: { backgroundColor: "#000000" },
        //   MainHeading: { color: "#551717" },
        //   Heading: { color: "#35a52d" },
        //   PointsColor: { color: "#d7429e" },
        //   InnerBackground: { background: "#5dcad4" },
        //   ProgressBarColor: { background: "#30d410" },
        // }}
        />
      }

    </QuestProvider>
  );
};

export default ChallengesPreview;
