import ShareArticle from "./ShareArticle";
import ShareArticleOffline from "./ShareArticleOffline";
import { QuestProvider } from "../QuestWrapper";

export const apiKey = "k-e6ec8094-6eef-4e80-a804-112a63607bf5";
export const apiSecret =
  "s-70996671-ebe3-4b38-a528-64f167e8146921a53d84-45c8-4996-8904-9a34dc27ddb7";
export const entityId = "e-5768fd26-d226-4ac1-81e6-3c99427f3fb3";
export const userId = "u-88350caa-4080-4505-a169-09f3f15e83b7";
export const questId = "q-9e051247-a804-4c8a-8493-9d977509d551";
export const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTg4MzUwY2FhLTQwODAtNDUwNS1hMTY5LTA5ZjNmMTVlODNiNyIsImlhdCI6MTcxNTI1MTI5OSwiZXhwIjoxNzE1ODU2MDk5fQ.ZdLtIH5rvbRd3OtVXMFvuvYSXOireP1-ddZxR7rAqTg";

export default function ShareArticlePreview({ online }: { online: boolean }) {
  if (online) {
    return (
      <QuestProvider
        apiKey={apiKey}
        apiSecret={apiSecret}
        entityId={entityId}
        featureFlags={{}}
        apiType="STAGING"
        themeConfig={
          {
            // backgroundColor:'yellow',
            // borderColor:"",
            // buttonColor:"",
            // fontFamily:"cursive",
            // primaryColor:"red",
            // secondaryColor:"white"
          }
        }
      >
        <ShareArticle
          userId={userId}
          questId={questId}
          token={token}
          // bgColor="red"
          description={"My Desc"}
          enableVariation
          // heading="My Head"
          // headingColor="blue"
          key={""}
          // textColor="pink"
        />
      </QuestProvider>
    );
  }
  return (
    <QuestProvider
      apiKey={apiKey}
      apiSecret={apiSecret}
      entityId={entityId}
      featureFlags={{}}
      apiType="STAGING"
      themeConfig={
        {
          // backgroundColor:'yellow',
          // borderColor:"",
          // buttonColor:"",
          // fontFamily:"cursive",
          // primaryColor:"red",
          // secondaryColor:"white"
        }
      }
    >
      <ShareArticleOffline
        userId={userId}
        questId={questId}
        token={token}
        // bgColor="red"
        description={"My Desc"}
        enableVariation
        // heading="My Head"
        // headingColor="blue"
        key={""}
        metadata={{
          linkActionName: "QuestLabs",
          linkActionUrl: "https://youtube.com/",
        }}
        // textColor="pink"
      />
    </QuestProvider>
  );
}
