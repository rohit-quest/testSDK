// import React from "react";
import helpIcon from "../../assets/images/helphubMessge.svg";
import "./HelpHub.css";
import QuestContext from "../QuestWrapper";
import HelphubSvg from "./HelphubSvg";
import { useContext, useEffect, useRef, useState } from "react";
import HelpHubHome from "./HelpHubHome";
import HelpHubChat from "./HelpHubChat";
import HelpHubHelp from "./HelpHubHelp";
import HelpHubTasks from "./HelpHubTasks";
import HelpHubUpdates from "./HelpHubUpdates";
import {
  HelpHubPropsOffline,
  MessageTypes,
  QuestCriteriaWithStatusType,
} from "./HelpHub.type";
import { getEntityDetails, getMessages } from "./Helphub.service";
import config from "../../config";

const HelpHubOffline = (props: HelpHubPropsOffline) => {
  const {
    userId,
    token,
    questId,
    styleConfig,
    contentConfig,
    showFooter,
    ChildQuest = [],
    ParentQuest,
    entityLogo,
    defaultAutoPopupMessages,
    popupOpenDelay = 2,
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
  const [chat, setChat] = useState<MessageTypes[]>([]);
  const [filterChat, setFilterChat] = useState<MessageTypes[]>([]);
  const [fetchData, setFetchData] = useState<boolean>(false);
  const [entityImage, setEntityImage]=useState<string>("");
  const [entityName, setEntityName]=useState<string>("");
  const [sendAutoMessage, setSendAutoMessage] = useState<string>("")
  const [autoPopupMessage, setAutoPopupMessage] = useState<boolean>(false);
  const helpHubRef = useRef(helpHub);

  useEffect(() => {
    if (helpHub == true) {
      helpHubRef.current = helpHub;
    }
  }, [helpHub]);

  useEffect(() => {
    if (!!defaultAutoPopupMessages?.length) {
      const timer = setTimeout(() => {
        if (helpHubRef.current === false) {
          setAutoPopupMessage(true);
        }
      }, popupOpenDelay * 1000 );
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (helpHub == true) {
      setAutoPopupMessage(false);
    }
  }, [helpHub])

  useEffect(() => {
    if (sendAutoMessage != "") {
      setHelpHub(true);
      setSelectedSection("Chat");
    }
  }, [sendAutoMessage])

  const filterByLastMessage = (chatData: MessageTypes[]) => {
    let data = chatData.sort((a, b) => {
      return new Date(b?.conversations?.timestamp).getTime() - new Date(a?.conversations?.timestamp).getTime();
    });

    return data;
  }

  const fetchChat = async () => {
    setFetchData(true);
    let getResult: { data: MessageTypes[] } = await getMessages(
      BACKEND_URL,
      entityId,
      userId,
      token,
      apiKey,
      "",
      "",
      "",
      apiType
    );
    setChat(filterByLastMessage(getResult?.data));
    setFilterChat(filterByLastMessage(getResult?.data));
    setFetchData(false);
  }

  useEffect(() => {
    fetchChat();
  }, [])


  useEffect(() => {
    setTaskStatus(
      Math.ceil(
        100 * (claimStatusTasks?.length / ChildQuest[3]?.length)
      )
    );
  }, [claimStatusTasks]);

  const entityDetails = async () => {
    let qId = questId || "q-default-helphub";
    let {data} = await getEntityDetails(
      BACKEND_URL,
      entityId,
      qId,
      userId,
      token,
      apiKey
    );
    setEntityImage(data.imageUrl);
    setEntityName(data.name);
  }

  useEffect(() => {
    entityDetails()
  }, []);

  useEffect(() => {
    let arr = taskData
      ?.filter((ele: QuestCriteriaWithStatusType) => ele.completed === true)
      .map((ele: QuestCriteriaWithStatusType) => ele.criteriaId);
    // if (onlineComponent) {
    //   setClaimStatusTasks(arr);
    // }
  }, [taskData]);

  useEffect(() => {
    let arr = updateData
      .filter((ele: QuestCriteriaWithStatusType) => ele.completed === true)
      .map((ele: QuestCriteriaWithStatusType) => ele.criteriaId);
    // if (onlineComponent) {
    //   setClaimStatusUpdates(arr);
    // }
  }, [updateData]);

  return (
    <div
      style={{ fontFamily: themeConfig.fontFamily || "'Figtree', sans-serif" }}
    >
      <div className={"helphubIconUpperCont"} style={{position: "static"}}>
        <div
          className={"helhubIconCont"}
          onClick={() => setHelpHub((prev) => !prev)}
          style={{display: "none"}}
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
              position: "static",
            }}
          >
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
                onlineComponent={false}
                showFeedback={showFeedback}
                setShowFeedback={setShowFeedback}
                entityImage={entityLogo || entityImage}
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
                entityImage={entityLogo || entityImage}
                entityName={entityName}
                chat={chat}
                setChat={setChat}
                filterChat={filterChat}
                setFilterChat={setFilterChat}
                sendAutoMessage={sendAutoMessage}
                fetchData={fetchData}
                setFetchData={setFetchData}
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
                onlineComponent={false}
                showBottomNavigation={showBottomNavigation}
                setShowBottomNavigation={setShowBottomNavigation}
                entityImage={entityImage}
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
                onlineComponent={false}
              />
            ) : (
              ""
            )}

            {/* bottom navigation */}
            <div className="helphubBottomCont">
              <div
                className={`helphubSvgCont ${
                  showBottomNavigation ? "showNav" : "hideNav"
                }`}
              >
                <div
                  className={`${showBottomNavigation ? "showNav" : "hideNav"}`}
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
