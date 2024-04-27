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
import resize from "../../assets/images/resize.png";
import resize2 from "../../assets/images/resize2.png";

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
  const [entityImage, setEntityImage] = useState<string>("");
  const [entityName, setEntityName] = useState<string>("");
  const [position, setPosition] = useState<string>("SIDEBAR");


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
            src={messagesIcon}
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

        {/* {helpHub && ( */}
        <div
          id="helpHub"
          className={`${position == 'SIDEBAR' ? "helpHubMainCont-sidebar" : "helpHubMainCont"} ${helpHub ? "animated" : ""}`}
          style={{
            height: position === "SIDEBAR" ? "100vh" : styleConfig?.Main?.height,
            width: styleConfig?.Main?.width,
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
