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
  HelpHubPropsOffline,
  QuestCriteriaWithStatusType,
  QuestTypes,
} from "./HelpHub.type";
import { createDefaultQuest, getDefaultQuest } from "./Helphub.service";
import config from "../../config";

const HelpHubOffline = (props: HelpHubPropsOffline) => {
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
    ChildQuest = [],
    ParentQuest,
  } = props;

  const { apiKey, entityId, featureFlags, apiType, themeConfig } = useContext(
    QuestContext.Context
  );
  let BACKEND_URL =
    apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL;
  const [selectedSection, setSelectedSection] = useState("Home");
  const [helpHub, setHelpHub] = useState(true);
  // const [parentQuest, setParentQuest] = useState<QuestTypes>();
  // const [chieldQuestCriteria, setChieldQuestCriteria] = useState<
    // QuestCriteriaWithStatusType[][]
  // >([]);

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
        100 * (claimStatusTasks?.length / ChildQuest[3]?.length)
      )
    );
  }, [claimStatusTasks]);



  // useEffect(() => {
  //   setParentQuest(ParentQuest);
  //   setChieldQuestCriteria(ChildQuest);
  // }, []);

  useEffect(() => {
    let arr = taskData
      ?.filter((ele: QuestCriteriaWithStatusType) => ele.completed === true)
      .map((ele: QuestCriteriaWithStatusType) => ele.criteriaId);
    if (onlineComponent) {
      setClaimStatusTasks(arr);
    }
  }, [taskData]);

  useEffect(() => {
    let arr = updateData
      .filter((ele: QuestCriteriaWithStatusType) => ele.completed === true)
      .map((ele: QuestCriteriaWithStatusType) => ele.criteriaId);
    if (onlineComponent) {
      setClaimStatusUpdates(arr);
    }
  }, [updateData]);

  return (
    <div
      style={{ fontFamily: themeConfig.fontFamily || "'Figtree', sans-serif" }}
    >
      <div className={"helphubIconUpperCont"}>
        {/* help button  */}
        <div
          className={"helhubIconCont"}
          onClick={() => setHelpHub((prev) => !prev)}
        >
          <img src={helpIcon} />
        </div>

        {helpHub && (
          <div id="helpHub" className={"helpHubMainCont animated"}>
            {selectedSection === "Home" ? (
              <HelpHubHome
                questsData={ChildQuest}
                setSelectedSection={setSelectedSection}
                parentQuest={ParentQuest}
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
                  !!ChildQuest?.length ? ChildQuest[1] : []
                }
                styleConfig={styleConfig}
                contentConfig={contentConfig?.Help}
              />
            ) : (
              ""
            )}
            {selectedSection === "Updates" ? (
              <HelpHubUpdates
                updateData={
                  !!ChildQuest?.length ? ChildQuest[2] : []
                }
                contentConfig={contentConfig?.Updates}
                styleConfig={styleConfig}
                questId={ParentQuest?.childQuestIDs[2] || ""}
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
                tasksData={
                  !!ChildQuest?.length ? ChildQuest[3] : []
                }
                contentConfig={contentConfig?.Tasks}
                styleConfig={styleConfig}
                questId={ParentQuest?.childQuestIDs[3] || ""}
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
              {showBottomNavigation && (
                <div
                  className="helphubSvgCont"
                  style={{
                    background: themeConfig?.backgroundColor || "#fff",
                    ...styleConfig?.Footer,
                  }}
                >
                  {/* home  */}
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

                  {/* chat page */}
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

                  {/* help page  */}
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

                  {/* update page */}
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

                  {/* task page */}
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
              )}

              {/* Footer: powered by quest labs  */}
              {showFooter != false && (
                <div className="helphubFooterCont">
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

export default HelpHubOffline;
