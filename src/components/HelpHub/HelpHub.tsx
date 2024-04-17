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
import { createDefaultQuest, getDefaultQuest } from "./Helphub.service";
import config from "../../config";

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
    onlineComponent,
  } = props;
  //   console.log(props);
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

  useEffect(() => {
    setTaskStatus(
      Math.ceil(
        100 * (claimStatusTasks?.length / chieldQuestCriteria[3]?.length)
      )
    );
  }, [claimStatusTasks]);

  useEffect(() => {
    console.log(showBottomNavigation);
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

      setChieldQuestCriteria(createQuest?.eligibilityCriterias);
    } else {
      setParentQuest(getResult?.parentQuest);
      setTaskData(getResult?.eligibilityCriterias[3]);
      setUpdateData(getResult?.eligibilityCriterias[2]);
      setChieldQuestCriteria(getResult?.eligibilityCriterias);
    }
  };

  useEffect(() => {
    getOrCreateQuest();
  }, []);

  useEffect(() => {
    let arr = taskData
      ?.filter((ele: QuestCriteriaWithStatusType) => ele.completed === true)
      .map((ele: QuestCriteriaWithStatusType) => ele.data.criteriaId);
    if (onlineComponent) {
      setClaimStatusTasks(arr);
    }
  }, [taskData]);

  useEffect(() => {
    let arr = updateData
      .filter((ele: QuestCriteriaWithStatusType) => ele.completed === true)
      .map((ele: QuestCriteriaWithStatusType) => ele.data.criteriaId);
    if (onlineComponent) {
      setClaimStatusUpdates(arr);
    }
  }, [updateData]);

  useEffect(() => {
    setPrevSelectedSection(selectedSection);
  }, [selectedSection]);

  return (
    <div
      style={{
        fontFamily: themeConfig.fontFamily || "'Figtree', sans-serif",
        background: "red",
      }}
    >
      <div
        className={"helphubIconUpperCont"}
        style={{
          background: "yellow",
        }}
      >
        {/* help button  */}
        <div
          className={"helhubIconCont"}
          onClick={() => setHelpHub((prev) => !prev)}
        >
          <img src={helpIcon} />
        </div>

        {helpHub && (
          <div
            id="helpHub"
            className={"helpHubMainCont animated"}
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
                onlineComponent={onlineComponent}
                showFeedback={showFeedback}
                setShowFeedback={setShowFeedback}
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
                onlineComponent={onlineComponent}
                showBottomNavigation={showBottomNavigation}
                setShowBottomNavigation={setShowBottomNavigation}
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
                onlineComponent={onlineComponent}
              />
            ) : (
              ""
            )}

            {/* bottom navigation */}
            <div className="helphubBottomCont">
              {/* {showBottomNavigation && (
                <div
                  // className="helphubSvgCont"
                  className={`helphubSvgCont ${
                    showBottomNavigation ? "showNav" : "hideNav"
                  }`}
                  style={{
                    background: themeConfig?.backgroundColor || "#fff",
                    ...styleConfig?.Footer,
                  }}
                >
                  <div onClick={() => setSelectedSection("Home")}>
                    <HelphubSvg
                      type={"home"}
                      primaryColor={
                        selectedSection == "Home" ? "#9035FF" : "#B9B9B9"
                      }
                      secondaryColor={
                        selectedSection == "Home" ? "white" : "#B9B9B9"
                      }
                    />

                    <div
                      style={{
                        color:
                          selectedSection == "Home" ? "#9035FF" : "#b9b9b9",
                        fontWeight: selectedSection == "Home" ? "600" : "400",
                      }}
                      className="helphubSvgTitle"
                    >
                      Home
                    </div>
                  </div>

                  <div onClick={() => setSelectedSection("Chat")}>
                    <HelphubSvg
                      type={"Chat"}
                      primaryColor={
                        selectedSection == "Chat" ? "#9035FF" : "#B9B9B9"
                      }
                      secondaryColor={
                        selectedSection == "Chat" ? "white" : "#B9B9B9"
                      }
                    />

                    <div
                      style={{
                        color:
                          selectedSection == "Chat" ? "#9035FF" : "#b9b9b9",
                        fontWeight: selectedSection == "Chat" ? "600" : "400",
                      }}
                      className="helphubSvgTitle"
                    >
                      Chat
                    </div>
                  </div>

                  <div onClick={() => setSelectedSection("Help")}>
                    <HelphubSvg
                      type={"Help"}
                      primaryColor={
                        selectedSection == "Help" ? "#9035FF" : "#B9B9B9"
                      }
                      secondaryColor={
                        selectedSection == "Help" ? "white" : "#B9B9B9"
                      }
                    />

                    <div
                      style={{
                        color:
                          selectedSection == "Help" ? "#9035FF" : "#b9b9b9",
                        fontWeight: selectedSection == "Help" ? "600" : "400",
                      }}
                      className="helphubSvgTitle"
                    >
                      Help
                    </div>
                  </div>

                  <div onClick={() => setSelectedSection("Updates")}>
                    <HelphubSvg
                      type={"Updates"}
                      primaryColor={
                        selectedSection == "Updates" ? "#9035FF" : "#B9B9B9"
                      }
                      secondaryColor={
                        selectedSection == "Updates" ? "white" : "#B9B9B9"
                      }
                    />

                    <div
                      style={{
                        color:
                          selectedSection == "Updates" ? "#9035FF" : "#b9b9b9",
                        fontWeight:
                          selectedSection == "Updates" ? "600" : "400",
                      }}
                      className="helphubSvgTitle"
                    >
                      Updates
                    </div>
                  </div>

                  <div onClick={() => setSelectedSection("Tasks")}>
                    <HelphubSvg
                      type={"Tasks"}
                      primaryColor={
                        selectedSection == "Tasks" ? "#9035FF" : "#B9B9B9"
                      }
                      secondaryColor={
                        selectedSection == "Tasks" ? "white" : "#B9B9B9"
                      }
                    />

                    <div
                      style={{
                        color:
                          selectedSection == "Tasks" ? "#9035FF" : "#b9b9b9",
                        fontWeight: selectedSection == "Tasks" ? "600" : "400",
                      }}
                      className="helphubSvgTitle"
                    >
                      Tasks
                    </div>
                  </div>
                </div>
              )} */}

              <div
                // className="helphubSvgCont"
                className={`helphubSvgCont ${
                  showBottomNavigation ? "showNav" : "hideNav"
                }`}
                // style={{
                //   background: themeConfig?.backgroundColor || "#fff",
                //   ...styleConfig?.Footer,
                // }}
              >
                <div
                // className={`${showBottomNavigation ? "showNav" : "hideNav"}`}
                >
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
                        color:
                          selectedSection == "Home" ? "#9035FF" : "#b9b9b9",
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
                        color:
                          selectedSection == "Chat" ? "#9035FF" : "#b9b9b9",
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
                        color:
                          selectedSection == "Help" ? "#9035FF" : "#b9b9b9",
                        fontWeight: selectedSection == "Help" ? "600" : "400",
                      }}
                      className="helphubSvgTitle"
                    >
                      Help
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
                        fontWeight:
                          selectedSection == "Updates" ? "600" : "400",
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
                        color:
                          selectedSection == "Tasks" ? "#9035FF" : "#b9b9b9",
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
        )}
      </div>
    </div>
  );
};

export default HelpHub;
