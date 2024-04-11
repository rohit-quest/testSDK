import QuestWhiteLogo from "../../assets/images/QuestWhiteLogo.svg";
import Modal1 from "../../assets/images/HelpHubModal1.jpeg";
import Modal2 from "../../assets/images/HelpHubModal2.jpeg";
import Modal3 from "../../assets/images/HelpHubModal3.jpeg";
import Man1 from "../../assets/images/Man1.svg";
import Man2 from "../../assets/images/Man2.svg";
import Woman1 from "../../assets/images/Woman1.svg";
import Woman2 from "../../assets/images/Woman2.svg";
import SendMessageAero from "../../assets/images/SendMessageAero.svg";
import QuestImage from "../../assets/images/HelphubQuest.png";

import HelpHubHomeEmoji1 from "../../assets/images/HelpHubHomeEmoji1.svg";
import HelpHubHomeEmoji2 from "../../assets/images/HelpHubHomeEmoji2.svg";
import HelpHubHomeEmoji3 from "../../assets/images/HelpHubHomeEmoji3.svg";
import HelpHubHomeEmoji4 from "../../assets/images/HelpHubHomeEmoji4.svg";
import HelpHubHomeEmoji5 from "../../assets/images/HelpHubHomeEmoji5.svg";
import OpenSectionButton from "../../assets/images/OpenSectionButton.svg";
import CustomerService from "../../assets/images/CustomerService.svg";
import { HelpHubHomeTypes, QuestCriteriaWithStatusType } from "./HelpHub.type";
import { useContext, useEffect, useState } from "react";
import QuestContext from "../QuestWrapper";
import config from "../../config";
import { claimQuest } from "./Helphub.service";

const HelpHubHome = (props: HelpHubHomeTypes) => {
  const {
    questsData,
    setSelectedSection,
    parentQuest,
    userId,
    token,
    styleConfig,
    contentConfig,
    taskStatus,
    onlineComponent,
    showFeedback = true,
    setShowFeedback,
  } = props;

  const [allQuestsData, setAllQuestsData] = useState<
    QuestCriteriaWithStatusType[][]
  >([]);
  // const [taskStatus, setTaskStatus] = useState<number>(0);
  const { apiKey, entityId, apiType, themeConfig } = useContext(
    QuestContext.Context
  );
  let BACKEND_URL =
    apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL;
  // let [showFeedback, setShowFeedback] = useState<boolean>(false);
  let [feedbackLoading, setFeedbackLoading] = useState<boolean>(false);
  useEffect(() => {
    setAllQuestsData(questsData);
    let arr =
      (!!questsData?.length &&
        questsData[3]
          ?.filter((ele: QuestCriteriaWithStatusType) => ele.completed === true)
          .map((ele: QuestCriteriaWithStatusType) => ele.data.criteriaId)) ||
      [];
    // setTaskStatus(
    //     Math.ceil(
    //         100 *
    //             (arr?.length /
    //                 (!!questsData?.length ? questsData[3]?.length : 0))
    //     ) || 0
    // );
    if (onlineComponent) {
      setShowFeedback(
        !!questsData?.length &&
          !!questsData[0][0] &&
          questsData[0][0]?.completed == false
      );
    } else {
      setShowFeedback(showFeedback);
    }
  }, [questsData]);

  const submitQuest = async (answer: number) => {
    setFeedbackLoading(true);
    if (onlineComponent) {
      let claimResponse = await claimQuest(
        BACKEND_URL,
        entityId,
        parentQuest?.childQuestIDs[0] || "",
        userId || "",
        token || "",
        apiKey,
        allQuestsData[0][0]?.data?.criteriaId,
        [answer]
      );
      setFeedbackLoading(false);
      if (claimResponse?.success) {
        setShowFeedback(false);
      }
    } else {
      setShowFeedback(false);
    }
  };

  return (
    <div className={"helpHubMainInnerCont"} style={styleConfig?.Home?.Form}>
      {/* upper div: div 1 */}
      <div className={"MainImgCont"}>
        <div className={"QuestWhiteLogoCont"}>
          <img src={QuestWhiteLogo} />
        </div>

        <div className={"helpHubTextCont"}>
          <div className={"helpHubHelloHead"}>Hello there 👋🏻</div>
          <div className={"helpHubHelpHead"}>How can we help?</div>
          {/* <div className={"helpHubImage"}>
            <img src={Modal3} />
          </div> */}
        </div>
      </div>

      {/* lower div : div 2 */}
      <div style={{ width: "100%" }} className="q-helphub-InnerCont">
        <div className={"SendMessageCont"}>
          {/* <div className={"HelloText"} style={styleConfig?.Home?.BannerText}>
            {contentConfig?.heading || "Hello there"}
          </div>
          {!contentConfig?.heading && (
            <div className={"HelloText"} style={styleConfig?.Home?.BannerText}>
              How can we help?
            </div>
          )} */}
          <div className="CustomerServiceCont">
            <div className={"CustomerServiceInnerCont"}>
              <div>
                <img src={CustomerService} alt="" />
              </div>
              <p>Customer Service</p>
            </div>
          </div>

          <div className={"CustomerServiceSendMessageTextCont"}>
            <p className={"CustomerServiceHead"}>Send us a message</p>
            <p className={"CustomerServiceDesc"}>
              Currently replying under a min
            </p>
          </div>

          <div className={"SendMessageButtonCont"}>
            <div className={"SendMessageButtonImagesCont"}>
              <img src={Man1} alt="" />
              <img
                src={Woman1}
                alt=""
                style={{
                  marginLeft: "-14px",
                }}
              />
              <img
                src={Man2}
                alt=""
                style={{
                  marginLeft: "-14px",
                }}
              />
              <img
                src={Woman2}
                alt=""
                style={{
                  marginLeft: "-14px",
                }}
              />
            </div>
            <div
              className={"SendMessageButton"}
              onClick={() => setSelectedSection("Chat")}
            >
              <p>Message Now</p>
              <img src={SendMessageAero} alt="" />
            </div>
          </div>

          {/* sent message */}
          {/* <div
            className="q-helhub-Send-Cont"
            onClick={() => setSelectedSection("Chat")}
            style={{
              background: themeConfig?.backgroundColor,
              ...styleConfig?.Home?.Card,
            }}
          >
            <div>
              <div
                className="q-helphub-send-msg"
                style={{
                  color: themeConfig?.primaryColor,
                  ...styleConfig?.Home?.Heading,
                }}
              >
                {contentConfig?.chatButton?.heading || "Send us a message"}
              </div>
              <div
                className="q-helphub-send-desc"
                style={{
                  color: themeConfig?.secondaryColor,
                  ...styleConfig?.Home?.SubHeading,
                }}
              >
                {contentConfig?.chatButton?.subHeading ||
                  "See how your customer service solution works"}
              </div>
            </div>
            <div className="q-helhub-Send-Cont-aero">
              <img src={OpenSectionButton} alt="" />
            </div>
          </div> */}
        </div>

        {/* community */}
        <div
          className="q-helphub-quest-community-cont"
          style={{
            background: themeConfig?.backgroundColor,
            ...styleConfig?.Home?.Card,
          }}
        >
          <div className="q-helphub-quest-community-imageCont">
            <img src={contentConfig?.box1?.image || QuestImage} />
          </div>

          <div className="q-helphub-quest-community-descCont">
            <div
              className="q-helphub-quest-community-desc"
              style={{
                color: themeConfig?.primaryColor,
                ...styleConfig?.Home?.Heading,
              }}
            >
              <p>{contentConfig?.box1?.heading || "The Questlabs community"}</p>
              <img src={OpenSectionButton} alt="" />
            </div>

            <div
              className="q-helphub-quest-community-full-desc"
              style={{
                color: themeConfig?.secondaryColor,
                ...styleConfig?.Home?.SubHeading,
              }}
            >
              {contentConfig?.box1?.subHeading ||
                "Be sure to check out the Quest labs community for support, plus tips & tricks from Quest users and much more coming soon"}
            </div>
          </div>
        </div>

        {/* search for help  */}
        <div className="q-helhub-search-community">
          <div className="search-input">
            <div className="q-helphub-search-input-cont">
              <input
                className="q-helphub-search-input"
                placeholder="Search for help..."
              />
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <g clip-path="url(#clip0_4762_1863)">
                    <circle
                      cx="7.66671"
                      cy="7.66659"
                      r="6.33333"
                      stroke="#B9B9B9"
                      stroke-width="1.5"
                    />
                    <path
                      d="M13.3334 13.3333L14.6667 14.6666"
                      stroke="#B9B9B9"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4762_1863">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          <div className="q-helphub-search-messege">
            {!!allQuestsData?.length &&
              allQuestsData[1]?.map(
                (value: QuestCriteriaWithStatusType, index: number) => (
                  <div
                    className="q-helphub-search-messege-cont"
                    key={index}
                    onClick={() => setSelectedSection("Help")}
                  >
                    <div
                      className="q-helphub-search-messege-title"
                      style={{
                        color: themeConfig?.secondaryColor,
                        ...styleConfig?.Home?.SubHeading,
                      }}
                    >
                      {value?.data?.metadata?.question}
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M5.67461 2.95363C5.88428 2.77392 6.19993 2.7982 6.37964 3.00787L10.3796 7.67453C10.5401 7.86178 10.5401 8.13808 10.3796 8.32532L6.37964 12.992C6.19993 13.2017 5.88428 13.2259 5.67461 13.0462C5.46495 12.8665 5.44067 12.5509 5.62038 12.3412L9.34147 7.99993L5.62038 3.65866C5.44067 3.44899 5.46495 3.13334 5.67461 2.95363Z"
                          fill="#B9B9B9"
                        />
                      </svg>
                    </div>
                  </div>
                )
              )}
          </div>
        </div>

        {/* get  updates */}
        <div className="q-helphub-update-mainCont">
          <div
            className="q-helphub-search-updates"
            style={{
              background: themeConfig?.backgroundColor,
              ...styleConfig?.Home?.Card,
            }}
          >
            <div className="q-helphub-updates-innercont">
              <div
                className="q-helphub-quest-community-desc"
                style={{
                  color: themeConfig?.primaryColor,
                  ...styleConfig?.Home?.Heading,
                  fontSize: "18px",
                }}
              >
                Get Updates
              </div>
              <div className="q-helphub-updates-desc">
                {!!allQuestsData?.length &&
                  allQuestsData[2]?.map(
                    (value: QuestCriteriaWithStatusType, index: number) =>
                      index < 2 && (
                        <div
                          className={`q-helphub-updates-innerCont${index + 1}`}
                          key={index}
                        >
                          <div
                            style={{
                              color: themeConfig?.primaryColor,
                              ...styleConfig?.Home?.Heading,
                            }}
                          >
                            {value?.data?.metadata?.linkActionName}
                          </div>
                          <div
                            style={{
                              color: themeConfig?.secondaryColor,
                              ...styleConfig?.Home?.SubHeading,
                            }}
                          >
                            {value?.data?.metadata?.description}
                          </div>
                        </div>
                      )
                  )}
              </div>
            </div>
            <button
              className="q-helphub-updates-button"
              onClick={() => setSelectedSection("Updates")}
              style={{
                background: themeConfig?.buttonColor,
                ...styleConfig?.Home?.Button,
              }}
            >
              See all updates
            </button>
          </div>
        </div>

        {/* complete profile */}
        <div
          className="q-helphub-compProfile"
          style={{
            background: themeConfig?.backgroundColor,
            ...styleConfig?.Home?.Card,
          }}
        >
          {/* one */}
          <div
            className="q-helphub-compProfile-heading-cont"
            onClick={() => setSelectedSection("Tasks")}
          >
            <div
              className="q-helphub-compProfile-heading-text"
              style={{
                color: themeConfig?.primaryColor,
                ...styleConfig?.Home?.Heading,
              }}
            >
              {contentConfig?.box4?.heading || "Complete your profile"}
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.67461 2.95363C5.88428 2.77392 6.19993 2.7982 6.37964 3.00787L10.3796 7.67453C10.5401 7.86178 10.5401 8.13808 10.3796 8.32532L6.37964 12.992C6.19993 13.2017 5.88428 13.2259 5.67461 13.0462C5.46495 12.8665 5.44067 12.5509 5.62038 12.3412L9.34147 7.99993L5.62038 3.65866C5.44067 3.44899 5.46495 3.13334 5.67461 2.95363Z"
                fill="#B9B9B9"
              />
            </svg>
          </div>

          {/* two  */}
          <div className="q-helphub-compProfile-progress-con">
            {/* progress percentage */}
            <div className="q-helphub-compProfile-progress-per">
              {taskStatus || 0}% Completed
            </div>
            {/* <div>
                            {Math.ceil(100 * (claimStatusTasks?.length / tasksData?.length)) || 0}%
                        </div> */}
            {/* progress bar container*/}
            <div className="q-helphub-compProfile-progress-bar-con">
              {/* progress bar */}
              <div
                className="q-helphub-compProfile-progress-bar"
                style={{ width: `${taskStatus || 0}%` }}
              ></div>
            </div>
          </div>

          <div
            className="q-helphub-compProfile-para-text"
            style={{
              color: themeConfig?.secondaryColor,
              ...styleConfig?.Home?.SubHeading,
            }}
          >
            {contentConfig?.box4?.subHeading ||
              "Be sure to check out the Quest labs community for support, plus tips & tricks from Quest users"}
          </div>
        </div>

        {/* review  */}
        <div
          className={`q-helphub-review ${showFeedback && "q-show-feedback"}`}
          style={{
            background: themeConfig?.backgroundColor,
            ...styleConfig?.Home?.Card,
          }}
        >
          <div className="q-helphub-review-text-emoji-cont">
            <div className="q-helphub-review-text-con">
              <div
                className="q-helphub-review-text-head"
                style={{
                  color: themeConfig?.primaryColor,
                  ...styleConfig?.Home?.Heading,
                }}
              >
                {contentConfig?.box5?.heading || "How satisfied are you?"}
              </div>

              <div
                className="q-helphub-review-text-para"
                style={{
                  color: themeConfig?.secondaryColor,
                  ...styleConfig?.Home?.SubHeading,
                }}
              >
                {contentConfig?.box5?.subHeading ||
                  "How would you rate this journey after using the product after so long?"}
              </div>
            </div>

            <div className="q-helphub-review-emoji-caption-con">
              <div className="q-helphub-review-emoji-cont">
                {[
                  HelpHubHomeEmoji1,
                  HelpHubHomeEmoji2,
                  HelpHubHomeEmoji3,
                  HelpHubHomeEmoji4,
                  HelpHubHomeEmoji5,
                ].map((e, i) => (
                  <img
                    src={e}
                    alt=""
                    key={i}
                    onClick={() => submitQuest(i + 1)}
                  />
                ))}
              </div>
              <div className="q-helphub-review-emoji-caption">
                <div
                  style={{
                    color: themeConfig?.secondaryColor,
                    ...styleConfig?.Home?.SubHeading,
                  }}
                >
                  Not satisfied
                </div>
                <div
                  style={{
                    color: themeConfig?.secondaryColor,
                    ...styleConfig?.Home?.SubHeading,
                  }}
                >
                  Very satisfied
                </div>
              </div>
            </div>
          </div>
          {feedbackLoading && (
            <div className="q-helphub-review-loader-con">
              <div className="q-helphub-review-loader"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpHubHome;
