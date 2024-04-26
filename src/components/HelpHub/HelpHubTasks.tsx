import CancelButton from "../../assets/images/CancelButton.svg";
import { HelpHubTasksTypes, QuestCriteriaWithStatusType } from "./HelpHub.type";
import QuestContext from "../QuestWrapper";
import { useContext, useEffect, useState } from "react";
import config from "../../config";
import { claimQuest } from "./Helphub.service";
import UpdatesImage from "../../assets/images/UpdatesImage.png";
import TaskUpButton from "../../assets/images/TaskUpButton.svg";
import TaskCompleted from "../../assets/images/TaskCompleted.svg";
const HelpHubTasks = (props: HelpHubTasksTypes) => {
  const {
    tasksData,
    questId,
    userId,
    token,
    contentConfig,
    styleConfig,
    claimStatusTasks = [],
    setClaimStatusTasks,
    onlineComponent,
  } = props;

  const { apiKey, entityId, apiType, themeConfig } = useContext(
    QuestContext.Context
  );
  
  let BACKEND_URL =
    apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL;


  const readUpdate = async (criteriaId: string, links?: string) => {
    window.open(links, "_blank");
    if (onlineComponent) {
      let claimResponse = await claimQuest(
        BACKEND_URL,
        entityId,
        questId,
        userId,
        token,
        apiKey,
        criteriaId
      );
      if (claimResponse.success) {
        setClaimStatusTasks([...claimStatusTasks, criteriaId]);
      }
    } else {
      if (!claimStatusTasks.includes(criteriaId)) {
        setClaimStatusTasks([...claimStatusTasks, criteriaId]);
      }
    }
  };

  const [openTaskDiv, setOpenTaskDiv] = useState<number | undefined>(undefined);

  return (
    <div
      className={"helpHubTaskCont animatedDissolve"}
      style={{
        background: themeConfig?.backgroundColor,
        ...styleConfig?.Tasks?.Form,
      }}
    >
      {/* for heading  */}
      <div
        className="q-helphub-tasks-upper-cont"
        style={{
          background: themeConfig?.backgroundColor,
          ...styleConfig?.Home?.Card,
        }}
      >
        <div className="task-head-text-div">
          <div
            className="q-helphub-tasks-upper-cont-text-head"
            style={{
              color: themeConfig?.primaryColor,
              ...styleConfig?.Tasks?.Topbar?.Heading,
            }}
          >
            {contentConfig?.heading || "Tasks"}
          </div>
          <div
            className="q-helphub-tasks-upper-cont-text-para"
            style={{
              color: themeConfig?.secondaryColor,
              ...styleConfig?.Tasks?.Topbar?.SubHeading,
            }}
          >
            {contentConfig?.subHeading ||
              "Welcome back, Please talk to us to understand"}
          </div>
        </div>
        <div className="q-helphub-tasks-upper-cont-text-button">
          <img src={CancelButton} alt="" />
        </div>
      </div>

      <div className="helphub-task-container">
        <div className="q-helphub-tasks-progress-cont">
          <div
            className="q-helphub-tasks-progress-per"
            style={{
              fontFamily: themeConfig?.fontFamily,
            }}
          >
            STEP {claimStatusTasks?.length}/{tasksData?.length}
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              gap: "8px",
            }}
          >

            {onlineComponent &&
              tasksData?.map((value, index) => {
                return (
                  <div
                    className="q-helphub-tasks-progress-bar-tabs "
                    style={{
                      width: `${Math.ceil(100 / tasksData.length)}%`,
                      background: `${
                        (value.completed || claimStatusTasks.includes(value?.criteriaId))
                          ? "var(--Primary, linear-gradient(84deg, #9035FF 0.36%, #0065FF 100.36%))"
                          : openTaskDiv === index
                          ? "var(--Primary-Grape-400, #A357FF)"
                          : ""
                      }`,

                      boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.12)",
                      borderRadius: `${
                        index == 0
                          ? "14px 0px 0px 14px"
                          : index === tasksData?.length - 1
                          ? "0px 14px 14px 0px"
                          : ""
                      }`,
                    }}
                  >
                  </div>
                );
              })}

            {!onlineComponent &&
              tasksData?.map((value, index) => {
                return (
                  <div
                    className="q-helphub-tasks-progress-bar-tabs "
                    style={{
                      width: `${Math.ceil(100 / tasksData.length)}%`,
                      background: `${
                        claimStatusTasks.includes(value?.criteriaId)
                          ? "var(--Primary, linear-gradient(84deg, #9035FF 0.36%, #0065FF 100.36%))"
                          : openTaskDiv === index
                          ? "var(--Primary-Grape-400, #A357FF)"
                          : ""
                      }`,
                      boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.12)",
                      borderRadius: `${
                        index == 0
                          ? "14px 0px 0px 14px"
                          : index === tasksData?.length - 1
                          ? "0px 14px 14px 0px"
                          : ""
                      }`,
                    }}
                  >
                  </div>
                );
              })}
          </div>
        </div>
        <div className="q-helphub-tasks-task-cont">
          {tasksData?.map(
            (ele: QuestCriteriaWithStatusType, index: number) => (
              <div
                className={"q-helphub-tasks-single-task"}
                style={{
                  background: themeConfig?.backgroundColor,
                  ...styleConfig?.Home?.Card,
                }}
                onClick={() => {
                  if (openTaskDiv === index) {
                    setOpenTaskDiv(undefined);
                  } else {
                    setOpenTaskDiv(index);
                  }
                }}
                key={index}
              >
                <div className="single-task-close-detail">
                  <div className="q-helphub-tasks-single-task-detail">
                    <div
                      className="q-helphub-tasks-single-task-step"
                      style={{
                        color: themeConfig?.secondaryColor,
                        fontFamily: themeConfig?.fontFamily,
                        ...styleConfig?.Tasks?.Card?.SubHeading,
                      }}
                    >
                      STEP {index + 1}
                    </div>
                    <div
                      className="q-helphub-tasks-single-task-head"
                      style={{
                        fontFamily: themeConfig?.fontFamily,
                        color: themeConfig?.primaryColor,
                        ...styleConfig?.Tasks?.Card?.Heading,
                      }}
                    >
                      {ele?.linkTitle}
                    </div>
                    <div
                      className="q-helphub-tasks-single-task-para"
                      style={{
                        fontFamily: themeConfig?.fontFamily,
                        color: themeConfig?.secondaryColor,
                        ...styleConfig?.Tasks?.Card?.SubHeading,
                      }}
                    >
                      {ele?.description}
                    </div>
                  </div>
                  <img
                    style={{
                      padding: claimStatusTasks?.includes(ele?.criteriaId)
                        ? "5px 4px"
                        : "",
                      rotate: claimStatusTasks?.includes(ele?.criteriaId)
                        ? ""
                        : index === openTaskDiv
                        ? ""
                        : "180deg",
                    }}
                    src={
                      (ele.completed || claimStatusTasks?.includes(ele?.criteriaId))
                        ? TaskCompleted
                        : index === openTaskDiv
                        ? TaskUpButton
                        : TaskUpButton
                    }
                    alt=""
                  />
                </div>

                <div
                  className={` ${
                    index === openTaskDiv
                      ? "single-task-open-div-cont"
                      : "single-task-close-div-cont"
                  }`}
                >
                  <div>
                    <div
                      className="single-task-close-div-text"
                      style={{
                        width: !!ele?.imageUrl ? "calc(100% - 176px)" : "100%",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: themeConfig?.fontFamily,
                          color: themeConfig?.secondaryColor,
                          ...styleConfig?.Tasks?.Card?.SubHeading,
                        }}
                      >
                        You can complete your user information details by
                        sharing the details asked in the form.
                      </p>
                      <button
                        style={{
                          background: themeConfig?.buttonColor,
                          cursor: "pointer",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: themeConfig?.fontFamily,
                          }}
                          onClick={() => {
                            readUpdate(ele?.criteriaId, ele?.linkUrl);
                          }}
                        >
                          Start Now
                        </p>
                      </button>
                    </div>
                    {ele?.imageUrl && (
                      <div className="single-task-close-div-image-cont">
                        <div
                          style={{
                            width: "100%",
                            height: "255px",
                            borderRadius: "5px",
                            border: "1px solid var(--Primary, #9035FF)",
                            background: `url(${
                              ele?.imageUrl || UpdatesImage
                            }) lightgray -5.338px -7px / 110.971% 102.745% no-repeat`,
                          }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        <div
          className="q-helphub-tasks-lower-cont"
          style={{
            background: themeConfig?.backgroundColor,
            ...styleConfig?.Home?.Card,
          }}
        >
        </div>
      </div>
    </div>
  );
};

export default HelpHubTasks;
