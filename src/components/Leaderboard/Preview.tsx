import { useState } from "react";
import { QuestProvider } from "../QuestWrapper";
import LeaderBoard from "./LeaderBoard";
import LeaderBoardOffline from "./LeaderBoardOffline";

const PreviewLeaderboard = ({ online }: { online: boolean }) => {
  // const questId =
  // const apiKey = "k-2aea7cd1-1009-49cd-b261-10ae0795df00"
  // const apiSecret = "s-7462f377-2ce4-4593-a907-3a2a00cdf951be06358a-d95d-4576-b3b4-a07dda2dab36"
  // const entityId = "e-9946bedf-3c65-4111-b296-ca6fd2a3a738"
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTdiM2E2MzAxLTcxMWMtNGMwZC1hZTYzLWQ5M2RiZTJjZWVlOSIsImlhdCI6MTcxMDMwMjQ2NSwiZXhwIjoxNzEwOTA3MjY1fQ.tYNTVfLBscJSv0ih9RYSimbj4CQ_YTTlHFCVLHGXCpw"
  // const userId = "u-7b3a6301-711c-4c0d-ae63-d93dbe2ceee9"
  const apiKey = "k-e6ec8094-6eef-4e80-a804-112a63607bf5";
  const apiSecret =
    "s-7462f377-2ce4-4593-a907-3a2a00cdf951be06358a-d95d-4576-b3b4-a07dda2dab36";
  const entityId = "e-5768fd26-d226-4ac1-81e6-3c99427f3fb3";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTg4MzUwY2FhLTQwODAtNDUwNS1hMTY5LTA5ZjNmMTVlODNiNyIsImlhdCI6MTcxMzE2NDEzOCwiZXhwIjoxNzEzNzY4OTM4fQ.tZENNsLVFUkWOMcmoOqKEVvAx97PLBZKDZGzhARP_tc";
  const userId = "u-88350caa-4080-4505-a169-09f3f15e83b7";

  const [leaderBoardOfflineData, setLeaderBoardOfflineData] = useState([
    {
      counter: null,
      imageUrl:
        "https://quest-media-storage-bucket.s3.us-east-2.amazonaws.com/1710391805028-user-3.png",
      name: "Rohit Prajapati",
      runningXP: 2020,
      userId: "u-88350caa-4080-4505-a169-09f3f15e83b7",
    },
    {
      counter: null,
      runningXP: 130,
      userId: "u-1b0e7b83-25b5-4477-a4c0-5c622cfdd240",
    },
    {
      counter: 1,
      imageUrl: "QmSteN1xN7fLwqwVJRB3xMpZ8j69iUAj5niCWMyByZsF3X",
      name: "Pankaj Vashisht",
      runningXP: 80,
      userId: "u-8268f5e1-f5a1-440c-a333-0f5578a73847",
    },
    {
      counter: null,
      runningXP: 40,
      userId: "u-8268f5e1-f5a1-440c-a333-0f5578a73847",
    },
  ]);

  if (online) {
    return (
      <QuestProvider
        apiKey={apiKey}
        apiSecret={apiSecret}
        entityId={entityId}
        apiType="STAGING"
        themeConfig={{}}
      >
        <LeaderBoard token={token} userId={userId} />
      </QuestProvider>
    );
  }

  return (
    <QuestProvider
      apiKey={apiKey}
      apiSecret={apiSecret}
      entityId={entityId}
      apiType="STAGING"
      themeConfig={{}}
    >
      <LeaderBoardOffline
        token={token}
        userId={userId}
        offlineFormData={leaderBoardOfflineData}
        styleConfig={{}}
      />
    </QuestProvider>
  );
};

export default PreviewLeaderboard;
