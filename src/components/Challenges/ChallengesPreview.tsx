import { QuestProvider } from "../QuestWrapper";
import { Challenges } from "./Challenges";
import { ChallengesOffline } from "./OfflineComponent";

const ChallengesPreview = ({ online = true }) => {
  const apiKey = "k-fe5a805c-77ed-4cae-bd33-9591ebed2805";
  const apiSecret =
    "s-b1b50609-4728-4702-8bd8-679f4b6560f08bfe2b25-2d65-4ae2-a652-c344bae62a24";
  const entityId = "e-9850377b-f88f-4426-a2ac-56206c74655a";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTdiM2E2MzAxLTcxMWMtNGMwZC1hZTYzLWQ5M2RiZTJjZWVlOSIsImlhdCI6MTcxMDQwMTEyNCwiZXhwIjoxNzExMDA1OTI0fQ.IDN7NPFnBeNKKfUFJI44rXoiobVXaqDLId7CqmB0dyk";
  const userId = "u-7b3a6301-711c-4c0d-ae63-d93dbe2ceee9";
  const questId = "q-36693271-ba1e-41e6-a785-5277878a1406";

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
