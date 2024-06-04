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
import arrow_forward from "../../assets/images/arrow_forward.svg"
import {
  HelpHubProps,
  MessageTypes,
  QuestCriteriaWithStatusType,
  QuestTypes,
} from "./HelpHub.type";
import {
  createDefaultQuest,
  getDefaultQuest,
  getEntityDetails,
  getMessages,
} from "./Helphub.service";
import config from "../../config";
import messagesIcon from "../../assets/images/messages.svg";
import addIcon from "../../assets/images/add.svg";
import resize from "../../assets/images/resize.png";
import resize2 from "../../assets/images/resize2.png";
import quest_white from "../../assets/images/quest_white.svg";

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
    helphubPosition = "USER_CHOICE",
    variation,
    entityLogo,
    defaultAutoPopupMessages = [],
    popupOpenDelay = 2,
  } = props;

  const { apiKey, entityId, featureFlags, apiType, themeConfig } = useContext(
    QuestContext.Context
  );
  let BACKEND_URL =
    apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL;
  const [selectedSection, setSelectedSection] = useState("Home");
  const [prevSelectedSection, setPrevSelectedSection] = useState("");

  const [helpHub, setHelpHub] = useState(false);
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
  const [chat, setChat] = useState<MessageTypes[]>([]);
  const [filterChat, setFilterChat] = useState<MessageTypes[]>([]);
  const [fetchData, setFetchData] = useState<boolean>(false);
  const [entityImage, setEntityImage] = useState<string>("");
  const [entityName, setEntityName] = useState<string>("");
  const [position, setPosition] = useState<string>("SIDEBAR");
  const [autoPopupMessage, setAutoPopupMessage] = useState<boolean>(false);
  const [sendAutoMessage, setSendAutoMessage] = useState<string>("");
  const helpHubRef = useRef(helpHub);


  useEffect(() => {
    if (helpHub == true) {
      helpHubRef.current = helpHub;
    }
  }, [helpHub]);

  useEffect(() => {
    if (!!defaultAutoPopupMessages.length) {
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


  const getPositionInLocal = async () => {
    let position = localStorage.getItem("helphubPosition");
    if (position) {
      setPosition(position);
    } else {
      setPosition("SIDEBAR");
    }
  }

  const setPositionInLocal = (position: string) => {
    localStorage.setItem("helphubPosition", position);
    setPosition(position);
  }

  useEffect(() => {
    if (helphubPosition != "USER_CHOICE") {
      setPosition(helphubPosition)
    } else {
      getPositionInLocal();
    }
  }, [])


  useEffect(() => {
    setTaskStatus(
      Math.ceil(
        100 * (claimStatusTasks?.length / chieldQuestCriteria[3]?.length)
      )
    );
  }, [claimStatusTasks]);


  const getOrCreateQuest = async () => {
    let qId = questId || "q-default-helphub";
    let getResult = await getDefaultQuest(
      BACKEND_URL,
      entityId,
      qId,
      userId,
      token,
      apiKey,
      uniqueUserId,
      uniqueEmailId,
      apiType,
      variation
    );
    if (!getResult?.success) {
      // let createQuest = await createDefaultQuest(
      //   BACKEND_URL,
      //   entityId,
      //   userId,
      //   token,
      //   apiKey,
      //   uniqueUserId,
      //   uniqueEmailId,
      //   apiType
      // );
      // setParentQuest(createQuest?.parentQuest);

      // let criterias = getResult?.eligibilityCriterias?.map(
      //   (criteriaData: any) =>
      //     criteriaData?.map(
      //       (criteria: {
      //         data: {
      //           createdAt: string;
      //           criteriaType: string;
      //           metadata: {
      //             imageUrl: string;
      //             description: string;
      //             question: string;
      //             answer: string;
      //             title: string;
      //             options: string[];
      //             isOptional: string;
      //             placeholder: string;
      //             linkActionName: string;
      //             linkActionUrl: string;
      //             manualInput: string;
      //           };
      //           criteriaId: string;
      //         };
      //         userAnswer: [];
      //         completed: boolean;
      //       }) => {
      //         return {
      //           type: criteria?.data?.criteriaType,
      //           question:
      //             criteria?.data?.metadata?.title ||
      //             criteria?.data?.metadata?.question ||
      //             "",
      //           description: criteria?.data?.metadata?.description || "",
      //           options: criteria?.data?.metadata?.options || [],
      //           criteriaId: criteria?.data?.criteriaId || "",
      //           required: !criteria?.data?.metadata?.isOptional,
      //           linkTitle: criteria?.data?.metadata?.linkActionName || "",
      //           linkUrl: criteria?.data?.metadata?.linkActionUrl || "",
      //           manualInput: criteria?.data?.metadata?.manualInput || false,
      //           completed:
      //             !!criteria?.userAnswer?.length || criteria?.completed,
      //           answer: criteria?.data?.metadata?.answer || "",
      //           createdAt: criteria?.data?.createdAt || "",
      //           imageUrl: criteria?.data?.metadata?.imageUrl || "",
      //         };
      //       }
      //     )
      // );

      // setChieldQuestCriteria(criterias);
    } else {
      let criterias = getResult?.data.childCampaignActions?.map(
        ({actions}: any) =>
          actions?.map(
            (action: any) => {
              return {
                type: action.actionType,
                question: action.title || '',
                description: action.description || '',
                options: action.options || [],
                criteriaId: action.actionId,
                required: action.isRequired,
                linkTitle: action.metadata?.linkActionName || action.title || "",
                linkUrl: action.metadata?.link || "",
                manualInput: false,
                completed: Boolean(action.isCompleted),
                answer: action.metadata?.answer || "",
                createdAt: action.createdAt || "",
                imageUrl: action.metadata?.imageUrl || "",
              };
            }
          )
      );
      setParentQuest(getResult?.data);
      setTaskData(criterias[3]);
      setUpdateData(criterias[2]);
      setChieldQuestCriteria(criterias);
    }
  };

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
      uniqueUserId,
      uniqueEmailId,
      apiType
    );
    setChat(filterByLastMessage(getResult?.data));
    setFilterChat(filterByLastMessage(getResult?.data));
    setFetchData(false);
  }

  useEffect(() => {
    fetchChat();
  }, [])

  const entityDetails = async () => {
    let qId = questId || "q-default-helphub";
    let { data } = await getEntityDetails(
      BACKEND_URL,
      entityId,
      qId,
      userId,
      token,
      apiKey,
      uniqueUserId,
      uniqueEmailId,
      apiType
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

  const box_ref = useRef<HTMLDivElement>(null);
  const trigger_ref = useRef<HTMLDivElement>(null);
  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let target = e.target as Element;
    if (box_ref.current?.contains(target) || trigger_ref.current?.contains(target)) {
    } else {
      setHelpHub(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: themeConfig.fontFamily || "'Figtree', sans-serif",
        width: (position == 'SIDEBAR' && helpHub) ? "100vw" : "",
        height: (position == 'SIDEBAR' && helpHub) ? "100vh" : "",
        position: (position == 'SIDEBAR' && helpHub) ? "fixed" : "static",
        top: "0",
        left: "0",
      }}
      onClick={(e) => closeModal(e)}
    >
      <div className={"helphubIconUpperCont"} ref={trigger_ref}>
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
            src={quest_white}
            className={`helphub-open-messagesIcon ${
              !helpHub ? "show-icon" : ""
            }`}
          />
        </div>
        {helphubPosition == "USER_CHOICE" && 
          // <div className="helphub-open-resizeIcon" onClick={() => setPositionInLocal(position == "POPUP" ? "SIDEBAR" : "POPUP")}>
            <img src={position == "POPUP" ? resize2 : resize} alt="" className="helphub-open-resizeIcon" onClick={() => setPositionInLocal(position == "POPUP" ? "SIDEBAR" : "POPUP")}/>
          // </div>
        }

        {
          !!defaultAutoPopupMessages.length?
          <div className={`helpHubMainCont-default-popup ${autoPopupMessage ? "helpHubMainCont-default-popup-animated" : ""}`}>
            <div className="home-back-btn">
              <img src={arrow_forward} alt="" onClick={() => setAutoPopupMessage(false)}/>
            </div>
            <div className="home-assistant-msg">
              <img src={entityLogo || entityImage} alt="" />
              <p>Hello there👋, How can I help you?</p>
            </div>
            <div className="home-user-msg">
              {
                defaultAutoPopupMessages.map((ele, index) => {
                  return (
                    <p key={index} onClick={() => setSendAutoMessage(ele)}>{ele}</p>
                  )
                })
              }
            </div>
          </div>
          : ""
        }

        {/* {helpHub && ( */}
        <div
          id="helpHub"
          className={`${position == 'SIDEBAR' ? "helpHubMainCont-sidebar" : "helpHubMainCont"} ${helpHub ? "animated" : ""}`}
          style={{
            height: position === "SIDEBAR" ? "100vh" : styleConfig?.Main?.height,
            width: styleConfig?.Main?.width,
            boxShadow: styleConfig?.Main?.boxShadow,
          }}
          ref={box_ref}
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
              entityImage={entityLogo || entityImage}
              uniqueUserId={uniqueUserId}
              uniqueEmailId={uniqueEmailId}
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
              setHelpHub={setHelpHub}
              uniqueUserId={uniqueUserId}
              uniqueEmailId={uniqueEmailId}
              position={position}
              sendAutoMessage={sendAutoMessage}
              setSendAutoMessage={setSendAutoMessage}
              chat={chat}
              setChat={setChat}
              filterChat={filterChat}
              setFilterChat={setFilterChat}
              fetchData={fetchData}
              setFetchData={setFetchData}
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
              setHelpHub={setHelpHub}
              uniqueUserId={uniqueUserId}
              uniqueEmailId={uniqueEmailId}
            />
          ) : (
            ""
          )}
          {selectedSection === "Updates" ? (
            <HelpHubUpdates
              updateData={!!chieldQuestCriteria?.length ? updateData : []}
              contentConfig={contentConfig?.Updates}
              styleConfig={styleConfig}
              questId={parentQuest?.childCampaignActions[2].campaignId || ""}
              campaignVariationId={parentQuest?.childCampaignActions[2].campaignVariationId || ""}
              userId={userId}
              token={token}
              claimStatusUpdates={claimStatusUpdates}
              setClaimStatusUpdates={setClaimStatusUpdates}
              onlineComponent={true}
              showBottomNavigation={showBottomNavigation}
              setShowBottomNavigation={setShowBottomNavigation}
              entityImage={entityImage}
              setHelpHub={setHelpHub}
              uniqueUserId={uniqueUserId}
              uniqueEmailId={uniqueEmailId}
            />
          ) : (
            ""
          )}
          {selectedSection === "Tasks" ? (
            <HelpHubTasks
              tasksData={!!chieldQuestCriteria?.length ? taskData : []}
              contentConfig={contentConfig?.Tasks}
              styleConfig={styleConfig}
              questId={parentQuest?.childCampaignActions[3].campaignId || ""}
              campaignVariationId={parentQuest?.childCampaignActions[3].campaignVariationId || ""}
              userId={userId}
              token={token}
              claimStatusTasks={claimStatusTasks}
              setClaimStatusTasks={setClaimStatusTasks}
              onlineComponent={true}
              setHelpHub={setHelpHub}
              uniqueUserId={uniqueUserId}
              uniqueEmailId={uniqueEmailId}
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
