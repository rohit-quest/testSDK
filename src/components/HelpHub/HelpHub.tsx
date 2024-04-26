// import React from "react";
import helpIcon from "../../assets/images/helphubMessge.svg";
import "./HelpHub.css";
import QuestContext from "../QuestWrapper";
import HelphubSvg from "./HelphubSvg";
import { useContext, useEffect, useState } from "react";
import HelpHubHome from "./HelpHubHome";
import HelpHubChat from "./HelpHubChat";
import HelpHubHelp from "./HelpHubHelp";
import HelpHubTasks from "./HelpHubTasks";
import HelpHubUpdates from "./HelpHubUpdates";
import {
  HelpHubProps,
  QuestCriteriaWithStatusType,
  QuestTypes,
} from "./HelpHub.type";
import {
  createDefaultQuest,
  getDefaultQuest,
  getEntityDetails,
} from "./Helphub.service";
import config from "../../config";
import messagesIcon from "../../assets/images/messages.svg";
import addIcon from "../../assets/images/add.svg";

const HelpHub = (props: HelpHubProps) => {
  const {
    userId,
    token,
    questId,
    uniqueUserId,
    uniqueEmailId,
    styleConfig,
    contentConfig,
    showFooter,
  } = props;

  const { apiKey, entityId, featureFlags, apiType, themeConfig } = useContext(
    QuestContext.Context
  );
  let BACKEND_URL =
    apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL;
  const [selectedSection, setSelectedSection] = useState("Home");
  const [prevSelectedSection, setPrevSelectedSection] = useState("");

  const [helpHub, setHelpHub] = useState(true);
  const [parentQuest, setParentQuest] = useState<QuestTypes>();
  const [chieldQuestCriteria, setChieldQuestCriteria] = useState<
    QuestCriteriaWithStatusType[][]
  >([]);

  const [claimStatusUpdates, setClaimStatusUpdates] = useState<string[]>([]);
  const [claimStatusTasks, setClaimStatusTasks] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(true);
  const [showBottomNavigation, setShowBottomNavigation] = useState(true);
  const [taskStatus, setTaskStatus] = useState<number>(0);
  const [taskData, setTaskData] = useState<QuestCriteriaWithStatusType[]>([]);
  const [updateData, setUpdateData] = useState<QuestCriteriaWithStatusType[]>(
    []
  );
  const [entityImage, setEntityImage] = useState<string>("");
  const [entityName, setEntityName] = useState<string>("");

  useEffect(() => {
    setTaskStatus(
      Math.ceil(
        100 * (claimStatusTasks?.length / chieldQuestCriteria[3]?.length)
      )
    );
  }, [claimStatusTasks]);

  useEffect(() => {
    // console.log(showBottomNavigation);
  }, [showBottomNavigation]);

  const getOrCreateQuest = async () => {
    let qId = questId || "q-default-helphub";
    let getResult = await getDefaultQuest(
      BACKEND_URL,
      entityId,
      qId,
      userId,
      token,
      apiKey
    );
    if (!getResult?.success) {
      let createQuest = await createDefaultQuest(
        BACKEND_URL,
        entityId,
        userId,
        token,
        apiKey
      );
      setParentQuest(createQuest?.parentQuest);

      let criterias = getResult?.eligibilityCriterias?.map(
        (criteriaData: any) =>
          criteriaData?.map(
            (criteria: {
              data: {
                createdAt: string;
                criteriaType: string;
                metadata: {
                  imageUrl: string;
                  description: string;
                  question: string;
                  answer: string;
                  title: string;
                  options: string[];
                  isOptional: string;
                  placeholder: string;
                  linkActionName: string;
                  linkActionUrl: string;
                  manualInput: string;
                };
                criteriaId: string;
              };
              userAnswer: [];
              completed: boolean;
            }) => {
              return {
                type: criteria?.data?.criteriaType,
                question:
                  criteria?.data?.metadata?.title ||
                  criteria?.data?.metadata?.question ||
                  "",
                description: criteria?.data?.metadata?.description || "",
                options: criteria?.data?.metadata?.options || [],
                criteriaId: criteria?.data?.criteriaId || "",
                required: !criteria?.data?.metadata?.isOptional,
                linkTitle: criteria?.data?.metadata?.linkActionName || "",
                linkUrl: criteria?.data?.metadata?.linkActionUrl || "",
                manualInput: criteria?.data?.metadata?.manualInput || false,
                completed:
                  !!criteria?.userAnswer?.length || criteria?.completed,
                answer: criteria?.data?.metadata?.answer || "",
                createdAt: criteria?.data?.createdAt || "",
                imageUrl: criteria?.data?.metadata?.imageUrl || "",
              };
            }
          )
      );

      setChieldQuestCriteria(criterias);
    } else {
      let criterias = getResult?.eligibilityCriterias?.map(
        (criteriaData: any) =>
          criteriaData?.map(
            (criteria: {
              data: {
                createdAt: string;
                criteriaType: string;
                metadata: {
                  imageUrl: string;
                  description: string;
                  question: string;
                  answer: string;
                  title: string;
                  options: string[];
                  isOptional: string;
                  placeholder: string;
                  linkActionName: string;
                  linkActionUrl: string;
                  manualInput: string;
                };
                criteriaId: string;
              };
              userAnswer: [];
              completed: boolean;
            }) => {
              return {
                type: criteria?.data?.criteriaType,
                question:
                  criteria?.data?.metadata?.title ||
                  criteria?.data?.metadata?.question ||
                  "",
                description: criteria?.data?.metadata?.description || "",
                options: criteria?.data?.metadata?.options || [],
                criteriaId: criteria?.data?.criteriaId || "",
                required: !criteria?.data?.metadata?.isOptional,
                linkTitle: criteria?.data?.metadata?.linkActionName || "",
                linkUrl: criteria?.data?.metadata?.linkActionUrl || "",
                manualInput: criteria?.data?.metadata?.manualInput || false,
                completed:
                  !!criteria?.userAnswer?.length || criteria?.completed,
                answer: criteria?.data?.metadata?.answer || "",
                createdAt: criteria?.data?.createdAt || "",
                imageUrl: criteria?.data?.metadata?.imageUrl || "",
              };
            }
          )
      );
      setParentQuest(getResult?.parentQuest);
      setTaskData(criterias[3]);
      setUpdateData(criterias[2]);
      setChieldQuestCriteria(criterias);
    }
  };

  const entityDetails = async () => {
    let qId = questId || "q-default-helphub";
    let { data } = await getEntityDetails(
      BACKEND_URL,
      entityId,
      qId,
      userId,
      token,
      apiKey
    );
    setEntityImage(data.imageUrl);
    setEntityName(data.name);
    // https://staging.questprotocol.xyz/api/entities/e-9850377b-f88f-4426-a2ac-56206c74655a
  };

  useEffect(() => {
    getOrCreateQuest();
    entityDetails();
  }, []);

  useEffect(() => {
    let arr = taskData
      ?.filter((ele: QuestCriteriaWithStatusType) => ele.completed === true)
      .map((ele: QuestCriteriaWithStatusType) => ele.criteriaId);
    // if (onlineComponent) {
      setClaimStatusTasks(arr);
    // }
  }, [taskData]);

  useEffect(() => {
    let arr = updateData
      .filter((ele: QuestCriteriaWithStatusType) => ele.completed === true)
      .map((ele: QuestCriteriaWithStatusType) => ele.criteriaId);
    // if (onlineComponent) {
      setClaimStatusUpdates(arr);
    // }
  }, [updateData]);

  useEffect(() => {
    setPrevSelectedSection(selectedSection);
  }, [selectedSection]);

  return (
    <div
      style={{
        fontFamily: themeConfig.fontFamily || "'Figtree', sans-serif",
      }}
    >
      <div className={"helphubIconUpperCont"}>
        {/* help button  */}
        <div
          className={"helhubIconCont"}
          onClick={() => setHelpHub((prev) => !prev)}
        >
          <img
            src={addIcon}
            className={`helphub-open-addIcon ${helpHub ? "show-icon" : ""}`}
          />
          <img
            src={messagesIcon}
            className={`helphub-open-messagesIcon ${
              !helpHub ? "show-icon" : ""
            }`}
          />
        </div>

        {/* {helpHub && ( */}
        <div
          id="helpHub"
          className={`helpHubMainCont ${helpHub ? "animated" : ""}`}
          style={{
            height: styleConfig?.Main?.height,
            width: styleConfig?.Main?.width,
          }}
        >
          {selectedSection === "Home" ? (
            <HelpHubHome
              questsData={chieldQuestCriteria}
              setSelectedSection={setSelectedSection}
              parentQuest={parentQuest}
              userId={userId}
              token={token}
              styleConfig={styleConfig}
              contentConfig={contentConfig?.Home}
              claimStatusTasks={claimStatusTasks}
              taskStatus={taskStatus}
              onlineComponent={true}
              showFeedback={showFeedback}
              setShowFeedback={setShowFeedback}
              entityImage={entityImage}
            />
          ) : (
            ""
          )}
          {selectedSection === "Chat" ? (
            <HelpHubChat
              contentConfig={contentConfig?.Chat}
              apiType={apiType}
              entityId={entityId}
              userId={userId}
              token={token}
              apiKey={apiKey}
              styleConfig={styleConfig}
              showBottomNavigation={showBottomNavigation}
              setShowBottomNavigation={setShowBottomNavigation}
              entityImage={entityImage}
              entityName={entityName}
            />
          ) : (
            ""
          )}
          {selectedSection === "Help" ? (
            <HelpHubHelp
              faqData={
                !!chieldQuestCriteria?.length ? chieldQuestCriteria[1] : []
              }
              styleConfig={styleConfig}
              contentConfig={contentConfig?.Help}
            />
          ) : (
            ""
          )}
          {selectedSection === "Updates" ? (
            <HelpHubUpdates
              updateData={!!chieldQuestCriteria?.length ? updateData : []}
              contentConfig={contentConfig?.Updates}
              styleConfig={styleConfig}
              questId={parentQuest?.childQuestIDs[2] || ""}
              userId={userId}
              token={token}
              claimStatusUpdates={claimStatusUpdates}
              setClaimStatusUpdates={setClaimStatusUpdates}
              onlineComponent={true}
              showBottomNavigation={showBottomNavigation}
              setShowBottomNavigation={setShowBottomNavigation}
              entityImage={entityImage}
            />
          ) : (
            ""
          )}
          {selectedSection === "Tasks" ? (
            <HelpHubTasks
              tasksData={!!chieldQuestCriteria?.length ? taskData : []}
              contentConfig={contentConfig?.Tasks}
              styleConfig={styleConfig}
              questId={parentQuest?.childQuestIDs[3] || ""}
              userId={userId}
              token={token}
              claimStatusTasks={claimStatusTasks}
              setClaimStatusTasks={setClaimStatusTasks}
              onlineComponent={true}
            />
          ) : (
            ""
          )}

          <div className="helphubBottomCont">
            <div
              className={`helphubSvgCont ${
                showBottomNavigation ? "showNav" : "hideNav"
              }`}
            >
              <div>
                <div onClick={() => setSelectedSection("Home")}>
                  {/* Home icon  */}
                  <HelphubSvg
                    type={"home"}
                    primaryColor={
                      selectedSection == "Home" ? "#9035FF" : "#B9B9B9"
                    }
                    secondaryColor={
                      selectedSection == "Home" ? "white" : "#B9B9B9"
                    }
                  />
                  {/* Home text  */}
                  <div
                    style={{
                      color: selectedSection == "Home" ? "#9035FF" : "#b9b9b9",
                      fontWeight: selectedSection == "Home" ? "600" : "400",
                    }}
                    className="helphubSvgTitle"
                  >
                    Home
                  </div>
                </div>

                <div onClick={() => setSelectedSection("Chat")}>
                  {/* Chat icon  */}
                  <HelphubSvg
                    type={"Chat"}
                    primaryColor={
                      selectedSection == "Chat" ? "#9035FF" : "#B9B9B9"
                    }
                    secondaryColor={
                      selectedSection == "Chat" ? "white" : "#B9B9B9"
                    }
                  />
                  {/* chat text  */}
                  <div
                    style={{
                      color: selectedSection == "Chat" ? "#9035FF" : "#b9b9b9",
                      fontWeight: selectedSection == "Chat" ? "600" : "400",
                    }}
                    className="helphubSvgTitle"
                  >
                    Chat
                  </div>
                </div>

                <div onClick={() => setSelectedSection("Help")}>
                  {/* help icon  */}
                  <HelphubSvg
                    type={"Help"}
                    primaryColor={
                      selectedSection == "Help" ? "#9035FF" : "#B9B9B9"
                    }
                    secondaryColor={
                      selectedSection == "Help" ? "white" : "#B9B9B9"
                    }
                  />
                  {/* chat text  */}
                  <div
                    style={{
                      color: selectedSection == "Help" ? "#9035FF" : "#b9b9b9",
                      fontWeight: selectedSection == "Help" ? "600" : "400",
                    }}
                    className="helphubSvgTitle"
                  >
                    FAQs
                  </div>
                </div>

                <div onClick={() => setSelectedSection("Updates")}>
                  {/* update icon */}
                  <HelphubSvg
                    type={"Updates"}
                    primaryColor={
                      selectedSection == "Updates" ? "#9035FF" : "#B9B9B9"
                    }
                    secondaryColor={
                      selectedSection == "Updates" ? "white" : "#B9B9B9"
                    }
                  />

                  {/* update text  */}
                  <div
                    style={{
                      color:
                        selectedSection == "Updates" ? "#9035FF" : "#b9b9b9",
                      fontWeight: selectedSection == "Updates" ? "600" : "400",
                    }}
                    className="helphubSvgTitle"
                  >
                    Updates
                  </div>
                </div>

                <div onClick={() => setSelectedSection("Tasks")}>
                  {/* task icon  */}
                  <HelphubSvg
                    type={"Tasks"}
                    primaryColor={
                      selectedSection == "Tasks" ? "#9035FF" : "#B9B9B9"
                    }
                    secondaryColor={
                      selectedSection == "Tasks" ? "white" : "#B9B9B9"
                    }
                  />
                  {/* ttask text  */}
                  <div
                    style={{
                      color: selectedSection == "Tasks" ? "#9035FF" : "#b9b9b9",
                      fontWeight: selectedSection == "Tasks" ? "600" : "400",
                    }}
                    className="helphubSvgTitle"
                  >
                    Tasks
                  </div>
                </div>
              </div>
            </div>

            {/* Footer: powered by quest labs  */}
            {showFooter != false && (
              <div
                className="helphubFooterCont"
                onClick={() => {
                  window.open("https://www.questlabs.ai/");
                }}
              >
                <div className="helphubFooterText">Powered by Quest Labs</div>
                <div>
                  <HelphubSvg type="footerLogo" />
                </div>
              </div>
            )}
          </div>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default HelpHub;
