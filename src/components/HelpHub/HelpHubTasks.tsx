import CancelButton from "../../assets/images/CancelButton.svg";
import SearchIcons from "../../assets/images/SearchIcons.svg";
import TaskStatusDone from "../../assets/images/TaskStatusDone.svg";
import TaskStatusPending from "../../assets/images/TaskStatusPending.svg";
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

  const [filterData, setFilterData] = useState<QuestCriteriaWithStatusType[]>(
    []
  );
  // const [claimStatus, setClaimStatus] = useState<string[]>([]);
  const [searchData, setSearchData] = useState<string | number>("");
  const { apiKey, entityId, apiType, themeConfig } = useContext(
    QuestContext.Context
  );
  let BACKEND_URL =
    apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL;

  useEffect(() => {
    let data = tasksData.filter((value: QuestCriteriaWithStatusType) => {
      return value?.linkTitle
        ?.toLowerCase()
        .includes(searchData?.toString().toLowerCase());
    });
    setFilterData(data);
  }, [tasksData, searchData]);

  // useEffect(() => {
  //     // let arr = tasksData.filter((ele: QuestCriteriaWithStatusType) => ele.completed === true).map((ele: QuestCriteriaWithStatusType) => ele.data.criteriaId)
  //     // if(onlineComponent){
  //     //     setClaimStatusTasks(arr);
  //     // }
  // }, [tasksData])
  // console.log(claimStatusTasks);
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
        let arr = claimStatusTasks.filter((item) =>
          item !== criteriaId ? item : criteriaId
        );
        // setClaimStatusTasks([...claimStatusTasks, criteriaId]);
        setClaimStatusTasks(arr);
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
      className={"helpHubTaskCont"}
      style={{
        background: themeConfig?.backgroundColor || "#fff",
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

      <div
        className="q-helphub-tasks-lower-cont"
        style={{
          background: themeConfig?.backgroundColor,
          ...styleConfig?.Home?.Card,
        }}
      >
        {/* search box  */}
        {/* <div
          className="q-helphub-tasks-search-cont"
          style={{ ...styleConfig?.Tasks?.Searchbox }}
        ></div> */}

        {/* progress bar  */}
        {/* <div className="q-helphub-tasks-progress-cont">
          <div className="q-helphub-tasks-progress-per">
            {Math.ceil(100 * (claimStatusTasks?.length / tasksData?.length)) ||
              0}
            %
          </div>
          <div className="q-helphub-tasks-progress-bar">
            <div
              style={{
                width: `${
                  100 * (claimStatusTasks?.length / tasksData?.length)
                }%`,
              }}
            ></div>
          </div>
        </div> */}
        <div className="q-helphub-tasks-progress-cont">
          <div
            className="q-helphub-tasks-progress-per"
            style={{
              fontFamily: themeConfig?.fontFamily,
            }}
          >
            STEP {claimStatusTasks?.length}/{tasksData?.length}
            {/* {Math.ceil(100 * (claimStatusTasks?.length / tasksData?.length)) ||
              0} */}
          </div>
          {/* <div className="q-helphub-tasks-progress-bar"> */}
          {/* <div
              style={{
                width: `${
                  100 * (claimStatusTasks?.length / tasksData?.length)
                }%`,
              }}
            ></div> */}

          {/* <div>
              {tasksData?.map(() => (
                <div>hi</div>
              ))}
            </div> */}
          {/* </div> */}

          <div
            style={{
              display: "flex",
              width: "100%",
              // background: "yellow",
              justifyContent: "space-between",
              gap: "8px",
            }}
          >
            {/* <div
              className="q-helphub-tasks-progress-bar"
              style={{
                width: `${Math.ceil(100 / tasksData.length)}%`,
              }}
            ></div> */}

            {onlineComponent &&
              tasksData?.map((value, index) => {
                // console.log(value);
                // console.log(value.completed);
                return (
                  <div
                    className="q-helphub-tasks-progress-bar-tabs "
                    style={{
                      width: `${Math.ceil(100 / tasksData.length)}%`,
                      // background: `${
                      //   openTaskDiv === index
                      //     ? "var(--Primary-Grape-400, #A357FF)"
                      //     : value.completed
                      //     ? "var(--Primary, linear-gradient(84deg, #9035FF 0.36%, #0065FF 100.36%))"
                      //     : ""
                      // }`,

                      background: `${
                        value.completed
                          ? "var(--Primary, linear-gradient(84deg, #9035FF 0.36%, #0065FF 100.36%))"
                          : openTaskDiv === index
                          ? "var(--Primary-Grape-400, #A357FF)"
                          : ""

                        // ? "var(--Primary-Grape-400, #A357FF)"
                        // : value.completed
                        // ? "var(--Primary, linear-gradient(84deg, #9035FF 0.36%, #0065FF 100.36%))"
                        // : ""
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
                    {/* {index === 0
                    ? "first"
                    : index === tasksData?.length - 1
                    ? "last"
                    : ""} */}
                    {/* <div
             style={{
               width: `${
                 100 * (claimStatusTasks?.length / tasksData?.length)
               }%`,
             }}
           ></div> */}

                    {/* <div>
             {tasksData?.map(() => (
               <div>hi</div>
             ))}
           </div> */}
                  </div>
                );
              })}

            {!onlineComponent &&
              tasksData?.map((value, index) => {
                // console.log(value);
                // console.log(value.data.criteriaId);
                // console.log(value.completed);
                return (
                  <div
                    className="q-helphub-tasks-progress-bar-tabs "
                    style={{
                      width: `${Math.ceil(100 / tasksData.length)}%`,
                      // background: `${
                      //   openTaskDiv === index
                      //     ? "var(--Primary-Grape-400, #A357FF)"
                      //     : claimStatusTasks.includes(value?.data?.criteriaId)
                      //     ? "var(--Primary, linear-gradient(84deg, #9035FF 0.36%, #0065FF 100.36%))"
                      //     : ""
                      // }`,
                      background: `${
                        claimStatusTasks.includes(value?.criteriaId)
                          ? "var(--Primary, linear-gradient(84deg, #9035FF 0.36%, #0065FF 100.36%))"
                          : openTaskDiv === index
                          ? "var(--Primary-Grape-400, #A357FF)"
                          : ""

                        // ? "var(--Primary-Grape-400, #A357FF)"
                        // : value.completed
                        // ? "var(--Primary, linear-gradient(84deg, #9035FF 0.36%, #0065FF 100.36%))"
                        // : ""
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
                    {/* {index === 0
                    ? "first"
                    : index === tasksData?.length - 1
                    ? "last"
                    : ""} */}
                    {/* <div
             style={{
               width: `${
                 100 * (claimStatusTasks?.length / tasksData?.length)
               }%`,
             }}
           ></div> */}

                    {/* <div>
             {tasksData?.map(() => (
               <div>hi</div>
             ))}
           </div> */}
                  </div>
                );
              })}
          </div>
        </div>

        <div className="q-helphub-tasks-task-cont">
          {filterData?.map(
            (ele: QuestCriteriaWithStatusType, index: number) => (
              <div
                className="q-helphub-tasks-single-task"
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
                  //   readUpdate(
                  //     ele?.data?.criteriaId,
                  //     ele?.data?.metadata?.linkActionUrl
                  //   );
                }}
                key={index}
              >
                <div
                  className="single-task-close-detail"
                  onClick={() => {
                    if (openTaskDiv === index) {
                      setOpenTaskDiv(undefined);
                    } else {
                      setOpenTaskDiv(index);
                    }
                    //   readUpdate(
                    //     ele?.data?.criteriaId,
                    //     ele?.data?.metadata?.linkActionUrl
                    //   );
                  }}
                >
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
                      claimStatusTasks?.includes(ele?.criteriaId)
                        ? TaskCompleted
                        : index === openTaskDiv
                        ? TaskUpButton
                        : TaskUpButton
                    }
                    alt=""
                  />
                </div>
                {index === openTaskDiv ? (
                  <div className="single-task-close-div">
                    <div className="single-task-close-div-text" style={{width: ele?.imageUrl ? "calc(100% - 176px)" : "100%"}}>
                      <p
                        style={{
                          fontFamily: themeConfig?.fontFamily,
                          color: themeConfig?.secondaryColor,
                          ...styleConfig?.Tasks?.Card?.SubHeading,
                        }}
                      >
                        You can complete your user information details by
                        sharing the details asked in the form
                      </p>
                      <button
                        style={{
                          background: themeConfig?.buttonColor,
                          cursor: "pointer",
                        }}
                        // disabled={
                        //   onlineComponent
                        //     ? claimStatusTasks.includes(ele?.data.criteriaId)
                        //     : claimStatusTasks.includes(ele?.data.criteriaId)
                        // }
                      >
                        <p
                          style={{
                            fontFamily: themeConfig?.fontFamily,
                          }}
                          onClick={() => {
                            readUpdate(
                              ele?.criteriaId,
                              ele?.linkUrl
                            );
                          }}
                        >
                          Start Now
                        </p>
                      </button>
                    </div>
                    {ele?.imageUrl &&
                      <div className="single-task-close-div-image-cont">
                        <div
                          style={{
                            // width: "152px",
                            height: "255px",
                            borderRadius: "5px",
                            border: "1px solid var(--Primary, #9035FF)",
                            background: `url(${ele?.imageUrl || UpdatesImage}) lightgray -8.338px -7px / 110.971% 102.745% no-repeat`,
                            overflow: "hidden",
                            boxSizing: "border-box",
                          }}
                        ></div>
                      </div>
                    }
                  </div>
                ) : (
                  ""
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpHubTasks;
