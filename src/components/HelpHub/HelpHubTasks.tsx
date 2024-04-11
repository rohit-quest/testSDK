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
      return value?.data?.metadata?.linkActionName
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
      console.log("offline no api");
      setClaimStatusTasks([...claimStatusTasks, criteriaId]);
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
      <div className="q-helphub-tasks-upper-cont">
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
              ...styleConfig?.Tasks?.Topbar?.Heading,
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

      <div className="q-helphub-tasks-lower-cont">
        {/* search box  */}
        <div
          className="q-helphub-tasks-search-cont"
          style={{ ...styleConfig?.Tasks?.Searchbox }}
        ></div>

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
          <div className="q-helphub-tasks-progress-per">
            STEP {claimStatusTasks?.length}/{tasksData?.length}
            {/* {Math.ceil(100 * (claimStatusTasks?.length / tasksData?.length)) ||
              0} */}
          </div>
          <div className="q-helphub-tasks-progress-bar">
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
          <div
            style={{
              display: "flex",
              width: "100%",
              background: "yellow",
              justifyContent: "space-between",
              gap: "8px",
            }}
          >
            {tasksData?.map(() => (
              <div
                className="q-helphub-tasks-progress-bar"
                style={{
                  width: "10%",
                }}
              >
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
            ))}
          </div>
        </div>

        <div className="q-helphub-tasks-task-cont">
          {filterData?.map(
            (ele: QuestCriteriaWithStatusType, index: number) => (
              <div className="q-helphub-tasks-single-task">
                <div
                  className="single-task-close-detail"
                  onClick={() => {
                    console.log(index);
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
                        ...styleConfig?.Tasks?.Card?.SubHeading,
                      }}
                    >
                      STEP {index + 1}
                    </div>
                    <div
                      className="q-helphub-tasks-single-task-head"
                      style={{
                        color: themeConfig?.primaryColor,
                        ...styleConfig?.Tasks?.Card?.Heading,
                      }}
                    >
                      {ele?.data?.metadata?.linkActionName}
                    </div>
                    <div
                      className="q-helphub-tasks-single-task-para"
                      style={{
                        color: themeConfig?.secondaryColor,
                        ...styleConfig?.Tasks?.Card?.SubHeading,
                      }}
                    >
                      {ele?.data?.metadata?.description}
                    </div>
                  </div>
                  <img
                    style={{
                      padding: claimStatusTasks?.includes(ele?.data?.criteriaId)
                        ? "5px 4px"
                        : "",
                      rotate: index === openTaskDiv ? "" : "180deg",
                    }}
                    src={
                      !claimStatusTasks?.includes(ele?.data?.criteriaId)
                        ? TaskStatusDone
                        : index === openTaskDiv
                        ? TaskUpButton
                        : TaskUpButton
                    }
                    alt=""
                  />
                </div>
                {index === openTaskDiv ? (
                  <div className="single-task-close-div">
                    <div className="single-task-close-div-text">
                      <p>
                        You can complete your user information details by
                        sharing the details asked in the form
                      </p>
                      <button>
                        <p>Start Now</p>
                      </button>
                    </div>
                    <div className="single-task-close-div-image-cont">
                      <div
                        style={{
                          width: "152px",
                          height: "255px",
                          borderRadius: "5px",
                          border: "1px solid var(--Primary, #9035FF)",
                          background: `url(${UpdatesImage}) lightgray -8.338px -7px / 110.971% 102.745% no-repeat`,
                          overflow: "hidden",
                          boxSizing: "border-box",
                        }}
                      ></div>
                    </div>
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
