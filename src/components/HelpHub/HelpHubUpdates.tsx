import { useContext, useEffect, useState } from "react";
import CancelButton from "../../assets/images/CancelButton.svg";
import OpenSectionButton from "../../assets/images/OpenSectionButton.svg";
import UpdatesImage from "../../assets/images/UpdatesImage.png";
import UpdatesUnreadLogo from "../../assets/images/UpdatesUnreadLogo.svg";
import UpdatesReadLogo from "../../assets/images/UpdatesReadLogo.svg";
import UnreadUpdateDarkArror from "../../assets/images/UnreadUpdateDarkArror.svg";
import {
  HelpHubUpdatesTypes,
  QuestCriteriaWithStatusType,
} from "./HelpHub.type";
import QuestContext from "../QuestWrapper";
import config from "../../config";
import { claimQuest } from "./Helphub.service";
import HelphubSvg from "./HelphubSvg";

const HelpHubUpdates = (props: HelpHubUpdatesTypes) => {
  const {
    updateData,
    questId,
    userId,
    token,
    contentConfig,
    styleConfig,
    claimStatusUpdates = [],
    setClaimStatusUpdates,
    onlineComponent,
    setShowBottomNavigation,
    showBottomNavigation,
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
    let data = updateData.filter((value: QuestCriteriaWithStatusType) => {
      return value?.linkTitle
        ?.toLowerCase()
        .includes(searchData?.toString().toLowerCase());
    });
    setFilterData(data);
  }, [updateData, searchData]);

  // useEffect(() => {
  //     // let arr = updateData.filter((ele: QuestCriteriaWithStatusType) => ele.completed === true).map((ele: QuestCriteriaWithStatusType) => ele.data.criteriaId)
  //     // if(onlineComponent){
  //     //     setClaimStatusUpdates(arr)
  //     // }
  // }, [updateData])

  const getTimeDifference = (date: string) => {
    let dateGap = (new Date().getTime() - new Date(date).getTime()) / 86400000;
    return dateGap > 1 ? `${Math.floor(dateGap)} days ago` : "Yesterday";
  };

  const readUpdate = async (criteriaId: string, links?: string) => {
    // window.open(links, "_blank");
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
        setClaimStatusUpdates([...claimStatusUpdates, criteriaId]);
      }
    } else {
      setClaimStatusUpdates([...claimStatusUpdates, criteriaId]);
    }
  };

  const [showOneUpdate, setshowOneUpdate] = useState(false);
  const [updateOneData, setUpdateOneData] = useState<QuestCriteriaWithStatusType>({});

  const [updateOneoutAnimation, setUpdateOneOutAnimation] = useState<
    boolean | null
  >(null);
  const [updateOutAnimation, setUpdateOutAnimation] = useState<boolean | null>(
    null
  );

  const [updateOutTempAnimation, setUpdateOutTempAnimation] = useState<
    boolean | null
  >(null);

  const handleShowUpdate = (value: any) => {
    setUpdateOutAnimation(true);
    setUpdateOneData(value);

    setTimeout(() => {
      setshowOneUpdate((prev) => !prev);
      setShowBottomNavigation((prev) => !prev);
      setUpdateOneOutAnimation(false);
    }, 100);
  };

  useEffect(() => {
    console.log("updateOutAnimation", updateOutAnimation);
    console.log("updateOneoutAnimation", updateOneoutAnimation);
  }, [updateOneoutAnimation, updateOutAnimation]);

  // console.log(object);
  return (
    <>
      {!showOneUpdate && (
        <div
          // className={"helpHubUpdatesCont"}
          // className={"helpHubUpdatesCont"}
          className={`helpHubUpdatesCont animatedDissolve ${
            updateOutAnimation
              ? "updateOutAnimation"
              : updateOutTempAnimation
              ? "updateInAnimation"
              : ""
          }`}
          style={{
            background: themeConfig?.backgroundColor,
            ...styleConfig?.Updates?.Form,
          }}
        >
          <div className="q-helphub-updates-upper-cont ">
            <div className="q-helphub-updates-upper-cont-text">
              <div>
                <div
                  className="q-helphub-updates-upper-cont-text-head"
                  style={{
                    color: themeConfig?.primaryColor,
                    ...styleConfig?.Updates?.Topbar?.Heading,
                  }}
                >
                  {contentConfig?.heading || "Updates"}
                </div>
                <div
                  className="q-helphub-updates-upper-cont-text-para"
                  style={{
                    color: themeConfig?.secondaryColor,
                    ...styleConfig?.Updates?.Topbar?.SubHeading,
                  }}
                >
                  {contentConfig?.subHeading ||
                    "Welcome back, Please talk to us to understand"}
                </div>
              </div>
              <div className="q-helphub-updates-upper-cont-text-button">
                <img src={CancelButton} alt="" />
              </div>
            </div>
          </div>

          <div className="q-helphub-updates-lower-cont">
            <div className="q-helphub-updates-lower-cont-data">
              {/* search box  */}
              {/* <div
            className="q-helphub-updates-search-cont"
            style={{ ...styleConfig?.Updates?.Searchbox }}
          >
            <input
              type="text"
              placeholder="Search for updates..."
              onChange={(e) => setSearchData(e.target.value)}
            />
            <img src={SearchIcons} alt="" />
          </div> */}

              <div className="q-helphub-updates-task-cont">
                {/* for one task */}
                {/* unread update  */}
                {filterData.map(
                  (value: QuestCriteriaWithStatusType, index: number) =>
                    // claimStatus.includes(value?.data?.criteriaId) ?
                    claimStatusUpdates.includes(value?.criteriaId) ? (
                      //   <div
                      //     className={`q-helphub-updates-single-update-read`}
                      //     key={index}
                      //     onClick={() =>
                      //       readUpdate(
                      //         value?.data?.criteriaId,
                      //         value?.data?.metadata?.linkActionUrl
                      //       )
                      //     }
                      //   >
                      //     <div className="update-time">
                      //       <img src={ReadUpdateLogo} alt="" />
                      //       <div
                      //         style={{
                      //           color: themeConfig?.secondaryColor,
                      //           ...styleConfig?.Updates?.Card?.SubHeading,
                      //         }}
                      //       >
                      //         {getTimeDifference(value?.data?.createdAt)}
                      //       </div>
                      //     </div>

                      //     <div className="update-question">
                      //       <div
                      //         className="ques"
                      //         style={{
                      //           color: themeConfig?.primaryColor,
                      //           ...styleConfig?.Updates?.Card?.Heading,
                      //         }}
                      //       >
                      //         {value?.data?.metadata?.linkActionName}
                      //       </div>
                      //       <div className="q-hh-btn">
                      //         <img src={OpenSectionButton} alt="" />
                      //       </div>
                      //     </div>

                      //     <div
                      //       className="update-message"
                      //       style={{
                      //         color: themeConfig?.secondaryColor,
                      //         ...styleConfig?.Updates?.Card?.SubHeading,
                      //       }}
                      //     >
                      //       {value?.data?.metadata?.description}
                      //     </div>
                      //   </div>
                      <div
                        className={`q-helphub-updates-single-update-read`}
                        key={index}
                        style={{
                          background: themeConfig?.backgroundColor,
                          ...styleConfig?.Home?.Card,
                        }}
                        onClick={() => {
                          handleShowUpdate(value);
                          // readUpdate(
                          //   value?.data?.criteriaId,
                          //   value?.data?.metadata?.linkActionUrl
                          // );
                        }}
                      >
                        <div className="update-img">
                          <div
                            // style={{
                            //   width: "68px",
                            //   height: "114.079px",
                            //   borderRadius: "2.237px",
                            //   border: "0.447px solid var(--Primary, #9035ff)",
                            //   background: `url(${UpdatesImage}) lightgray -3.73px -3.132px / 110.971% 102.745% no-repeat`,
                            //   overflow: "hidden",
                            //   boxSizing: "border-box",
                            //   backgroundPosition: "center",
                            //   objectFit: "cover",
                            //   objectPosition: "center top",
                            // }}
                            style={{
                              width: "60px",
                              height: "114.079px",
                              flexShrink: "0",
                              borderRadius: "2.237px",
                              border: " 0.447px solid var(--Primary, #9035FF)",
                              background: `url(${value?.imageUrl || UpdatesImage}) lightgray -3.73px -3.132px / 110.971% 102.745% no-repeat`,
                            }}
                          ></div>
                          {/* <img src={UpdatesImage} alt="" /> */}
                        </div>

                        <div className="read-task-details">
                          <div className="update-time">
                            <img src={UpdatesReadLogo} alt="" />
                            <p
                              style={{
                                color: themeConfig?.secondaryColor,
                                fontFamily: themeConfig?.fontFamily,
                                ...styleConfig?.Updates?.Card?.SubHeading,
                              }}
                            >
                              {getTimeDifference(value?.createdAt)}
                            </p>
                          </div>
                          <div className="update-head">
                            <p
                              style={{
                                color: themeConfig?.primaryColor,
                                fontFamily: themeConfig?.fontFamily,
                                ...styleConfig?.Updates?.Card?.Heading,
                              }}
                            >
                              {value?.linkTitle}
                            </p>
                            <img src={OpenSectionButton} alt="" />
                          </div>
                          <div
                            className="update-desc"
                            style={{
                              color: themeConfig?.secondaryColor,
                              fontFamily: themeConfig?.fontFamily,
                              ...styleConfig?.Updates?.Card?.SubHeading,
                            }}
                          >
                            {value?.description}
                          </div>
                        </div>
                      </div>
                    ) : (
                      //   <div
                      //     className={`q-helphub-updates-single-update-unread`}
                      //     key={index}
                      //     onClick={() =>
                      //       readUpdate(
                      //         value?.data?.criteriaId,
                      //         value?.data?.metadata?.linkActionUrl
                      //       )
                      //     }
                      //   >
                      //     <div className="update-time">
                      //       <div className="q-helphub-updates-unread">
                      //         <span className="q-helphub-updates-unread-span1"></span>
                      //         <span className="q-helphub-updates-unread-span2"></span>
                      //       </div>
                      //       <div
                      //         style={{
                      //           color: themeConfig?.secondaryColor,
                      //           ...styleConfig?.Updates?.Card?.SubHeading,
                      //         }}
                      //       >
                      //         {getTimeDifference(value?.data?.createdAt)}
                      //       </div>
                      //     </div>

                      //     <div className="update-question">
                      //       <div className="ques">
                      //         {value?.data?.metadata?.linkActionName}
                      //       </div>
                      //       <div className="q-hh-btn">
                      //         <img src={OpenSectionButton} alt="" />
                      //       </div>
                      //     </div>

                      //     <div
                      //       className="update-message"
                      //       style={{
                      //         color: themeConfig?.secondaryColor,
                      //         ...styleConfig?.Updates?.Card?.SubHeading,
                      //       }}
                      //     >
                      //       {value?.data?.metadata?.description}
                      //     </div>
                      //   </div>
                      <div
                        className={`q-helphub-updates-single-update-read`}
                        key={index}
                        onClick={() => {
                          handleShowUpdate(value);

                          readUpdate(
                            value?.criteriaId
                            // value?.data?.metadata?.linkActionUrl
                          );
                        }}
                      >
                        <div className="update-img">
                          <div
                            style={{
                              width: "60px",
                              height: "114.079px",
                              flexShrink: "0",
                              borderRadius: "2.237px",
                              border: " 0.447px solid var(--Primary, #9035FF)",
                              background: `url(${value?.imageUrl || UpdatesImage}) lightgray -3.73px -3.132px / 110.971% 102.745% no-repeat`,
                            }}
                          ></div>
                          {/* <img src={UpdatesImage} alt="" /> */}
                        </div>

                        <div className="read-task-details-unread">
                          <div className="update-time">
                            <img src={UpdatesUnreadLogo} alt="" />
                            <p
                              style={{
                                color: themeConfig?.secondaryColor,
                                // ...styleConfig?.Home?.Heading,
                                fontFamily: themeConfig?.fontFamily,
                              }}
                            >
                              {getTimeDifference(value?.createdAt)}
                            </p>
                          </div>
                          <div className="update-head">
                            <p
                              style={{
                                color: themeConfig?.primaryColor,
                                fontFamily: themeConfig?.fontFamily,
                                // ...styleConfig?.Home?.Heading,
                              }}
                            >
                              {value?.linkTitle}
                            </p>
                            <img src={UnreadUpdateDarkArror} alt="" />
                          </div>
                          <div
                            className="update-desc"
                            style={{
                              color: themeConfig?.primaryColor,
                              fontFamily: themeConfig?.fontFamily,
                              // ...styleConfig?.Home?.Heading,
                            }}
                          >
                            {value?.description}
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showOneUpdate && (
        <div
          // className="q-update-one-container"
          className={`q-update-one-container ${
            !updateOneoutAnimation ? "updateOneIn" : "updateOneOut"
          }`}
        >
          {/* back and chats */}
          <div
            className="q-update-one-container-header"
            style={{
              background: themeConfig?.backgroundColor,
              ...styleConfig?.Home?.Card,
            }}
          >
            <div
              className="image-div"
              style={{ cursor: "pointer" }}
              onClick={() => {
                setUpdateOneOutAnimation((prev) => !prev);
                setUpdateOutTempAnimation(true);
                setTimeout(() => {
                  setShowBottomNavigation(true);
                  setUpdateOutAnimation(false);
                  setshowOneUpdate((prev) => !prev);
                }, 250);
                // setShowBottomNavigation(true);
                // setshowOneUpdate((prev) => !prev);
              }}
            >
              <HelphubSvg type={"BackButton"} />
            </div>

            <div
              className="q-update-one-container-header-title"
              style={{
                color: themeConfig?.secondaryColor,
                ...styleConfig?.Home?.Heading,
                fontFamily: themeConfig?.fontFamily,
              }}
            >
              New Updates Details
            </div>
          </div>

          <div
            className="q-update-one-container-data"
            style={{
              background: themeConfig?.backgroundColor,
              // ...styleConfig?.Home?.Card,
            }}
          >
            {/* <div className="q-chat-personal-container-body">
              <div className="text">
                <div className="q-chat-personal-container-body-title">
                  General feedback
                </div>
                <div className="q-chat-personal-container-body-description">
                  Give general feedback of this page
                </div>
              </div>

              <div className="q-chat-personal-container-body-icons">
                <div
                  className="q-chat-personal-container-body-icons-img"
                  style={{
                    zIndex: 3,
                  }}
                >
                  <img src={QuestWhiteLogo} />
                </div>
                <div
                  className="q-chat-personal-container-body-icons-img1"
                  style={{ marginLeft: "-15px", zIndex: 2 }}
                >
                  <img src={Modal1} />
                </div>

                <div
                  className="q-chat-personal-container-body-icons-img1"
                  style={{ marginLeft: "-15px", zIndex: 1 }}
                >
                  <img src={ChatWoman} />
                </div>
              </div>
            </div> */}
            <div className="update-one-img">
              {/* <div
                style={{
                  background: `url(${UpdateOne}) lightgray -10.312px -8.675px / 110.971% 102.745% no-repeat`,
                  // backgroundSize: "cover",
                  backgroundSize: "contain",
                  borderRadius: "8px",
                  // border-radius: 8px;
                  // border: 0.447px solid var(--Primary, #9035FF);
                  // background: url(<path-to-image>)
                  backgroundPosition: "center-top",
                  width: "188px", // Fixed width
                  height: "316px", // Fixed height
                  // overflow: "hidden",
                }}
              ></div> */}
              <div
                style={{
                  // width: "188px",
                  // width: "50%",
                  // height: "316px",
                  // borderRadius: "8px",
                  // border: "0.447px solid var(--Primary, #9035ff)",
                  // background: `url(${UpdatesImage}) lightgray -3.73px -3.132px / 110.971% 102.745% no-repeat`,
                  background: `url(${updateOneData?.imageUrl || UpdatesImage})  lightgray -10.312px -8.675px / 110.971% 102.745% no-repeat`,
                  // overflow: "hidden",
                  // boxSizing: "border-box",
                }}
              ></div>
              {/* <img src={UpdatesImage} alt="" /> */}
            </div>

            <div className="update-one-text-cont">
              {/* <div className="update-text-head"></div> */}
              <div className="update-text-head-time">
                {updateOneData?.completed ? (
                  <div className="update-one-time-read">
                    <img src={UpdatesReadLogo} alt="" />
                    <p
                      style={{
                        color: themeConfig?.secondaryColor,
                        fontFamily: themeConfig?.fontFamily,
                        // ...styleConfig?.Home?.Heading,
                      }}
                    >
                      {getTimeDifference(updateOneData?.createdAt)}
                    </p>
                  </div>
                ) : (
                  <div className="update-one-time">
                    <img src={UpdatesUnreadLogo} alt="" />
                    <p
                      style={{
                        color: themeConfig?.secondaryColor,
                        fontFamily: themeConfig?.fontFamily,
                        // ...styleConfig?.Home?.Heading,
                      }}
                    >
                      {getTimeDifference(updateOneData?.createdAt || "")}
                    </p>
                  </div>
                )}
                <div
                  className="update-one-head"
                  style={{
                    color: themeConfig?.primaryColor,
                    fontFamily: themeConfig?.fontFamily,
                    // ...styleConfig?.Home?.Heading,
                  }}
                >
                  {updateOneData?.linkTitle}
                </div>
              </div>

              <div
                className="update-one-update-desc"
                style={{
                  color: themeConfig?.secondaryColor,
                  fontFamily: themeConfig?.fontFamily,
                  // ...styleConfig?.Home?.Heading,
                }}
              >
                {updateOneData?.description}
              </div>
            </div>
            {/* <div className="chat-container" id="chatContainer">
              {data &&
                data.map((message, index) => (
                  <div
                    style={{
                      display: "flex",
                      // position: "relative",
                      gap: "8px",
                      // backgroundColor: "yellow",
                    }}
                  >
                    {message.receiver && (
                      <div className="chat-profile-img-receiver">
                        <img src={QuestWhiteLogo} />
                      </div>
                    )}
                    <div
                      key={index}
                      className={`message ${
                        message.sender ? "sender" : "receiver"
                      }`}
                    >
                      {message.sender ? message.sender : message.receiver}
                    </div>

                    {message.sender && (
                      <div className="chat-profile-img-sender">
                        <img src={Modal1} />
                      </div>
                    )}
                  </div>
                ))}
              {senderMessageLoading && (
                <div className="chat-bubble">
                  <div className="typing">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </div>
                </div>
              )}
              {messageFailed && (
                <div
                  className="message-failed"
                  style={{
                    position: "absolute",
                  }}
                >
                  Something went wrong. PLease try again...
                </div>
              )}
            </div> */}
          </div>

          {/* <div className="q-chat-personal-container-footer">
            <input
              className="q-chat-personal-container-footer-input"
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  //   if (message.length > 0) {
                  //     setData((data) => [...data, { sender: message }]);
                  //     setTimeout(() => {
                  //       setData((data) => [
                  //         ...data,
                  //         {
                  //           receiver:
                  //             "I am not in the mood to answer, you come back later",
                  //         },
                  //       ]);
                  //     }, 1000);
                  //   }
                  //   setMessage("");
                  handleSave();
                }
              }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="q-chat-personal-container-footer-icons">
              <img src={SendMessageEmojiIcon} />
              <img src={SendMessageAttachIcon} />
              <img src={SendMessageSendIcon} onClick={handleSave} />
            </div>
          </div> */}
        </div>
      )}
    </>
  );
};

export default HelpHubUpdates;
