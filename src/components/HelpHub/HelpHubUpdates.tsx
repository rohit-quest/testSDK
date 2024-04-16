import { useContext, useEffect, useState } from "react";
import CancelButton from "../../assets/images/CancelButton.svg";
import SearchIcons from "../../assets/images/SearchIcons.svg";
import OpenSectionButton from "../../assets/images/OpenSectionButton.svg";
import UnreadUpdateLogo from "../../assets/images/UnreadUpdateLogo.svg";
import ReadUpdateLogo from "../../assets/images/ReadUpdateLogo.svg";
import UpdatesImage from "../../assets/images/UpdatesImage.png";
import UpdateOne from "../../assets/images/UpdateOne.png";
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
      return value?.data?.metadata?.linkActionName
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
  const [updateOneData, setUpdateOneData] = useState<any>({});
  const handleShowUpdate = (value: any) => {
    setUpdateOneData(value);
    setshowOneUpdate((prev) => !prev);
    setShowBottomNavigation((prev) => !prev);
  };

  return (
    <>
      {!showOneUpdate && (
        <div
          className={"helpHubUpdatesCont"}
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
                    claimStatusUpdates.includes(value?.data?.criteriaId) ? (
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
                            style={{
                              width: "68px",
                              height: "114.079px",
                              borderRadius: "2.237px",
                              border: "0.447px solid var(--Primary, #9035ff)",
                              background: `url(${UpdatesImage}) lightgray -3.73px -3.132px / 110.971% 102.745% no-repeat`,
                              overflow: "hidden",
                              boxSizing: "border-box",
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
                              {getTimeDifference(value?.data?.createdAt)}
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
                              {value?.data?.metadata?.linkActionName}
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
                            {value?.data?.metadata?.description}
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
                          console.log("click");
                          console.log(value);
                          handleShowUpdate(value);
                          readUpdate(
                            value?.data?.criteriaId
                            // value?.data?.metadata?.linkActionUrl
                          );
                        }}
                      >
                        <div className="update-img">
                          <div
                            style={{
                              width: "68px",
                              height: "114.079px",
                              borderRadius: "2.237px",
                              border: "0.447px solid var(--Primary, #9035ff)",
                              background: `url(${UpdatesImage}) lightgray -3.73px -3.132px / 110.971% 102.745% no-repeat`,
                              overflow: "hidden",
                              boxSizing: "border-box",
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
                              {getTimeDifference(value?.data?.createdAt)}
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
                              {value?.data?.metadata?.linkActionName}
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
                            {value?.data?.metadata?.description}
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
        <div className="q-update-one-container">
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
                setShowBottomNavigation(true);
                setshowOneUpdate((prev) => !prev);
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
                  width: "188px",
                  height: "316px",
                  borderRadius: "8px",
                  border: "0.447px solid var(--Primary, #9035ff)",
                  // background: `url(${UpdatesImage}) lightgray -3.73px -3.132px / 110.971% 102.745% no-repeat`,
                  background: `url(${UpdatesImage}) lightgray -10.312px -8.675px / 110.971% 102.745% no-repeat`,
                  overflow: "hidden",
                  boxSizing: "border-box",
                }}
              ></div>
              {/* <img src={UpdatesImage} alt="" /> */}
            </div>

            <div className="update-one-text-cont">
              {/* <div className="update-text-head"></div> */}
              <div className="update-text-head-time">
                {updateOneData.completed ? (
                  <div className="update-one-time-read">
                    <img src={UpdatesReadLogo} alt="" />
                    <p
                      style={{
                        color: themeConfig?.secondaryColor,
                        fontFamily: themeConfig?.fontFamily,
                        // ...styleConfig?.Home?.Heading,
                      }}
                    >
                      {getTimeDifference(updateOneData?.data?.createdAt)}
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
                      {getTimeDifference(updateOneData?.data?.createdAt)}
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
                  {updateOneData?.data?.metadata?.linkActionName}
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
                {updateOneData?.data?.metadata?.description}
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Dolores nobis illum cum, dolorem exercitationem doloremque atque
                odit modi blanditiis, repellat excepturi omnis corporis ducimus
                tempora quas quod officia adipisci impedit! Quam tempore
                quisquam nobis nam voluptatem incidunt laborum sed magni
                aliquid. Maiores dolorum molestiae eius quo fuga alias magni, ad
                tempore accusamus dignissimos aliquid quaerat, esse velit
                cumque. Quod sunt amet ullam nobis voluptatibus omnis, soluta
                accusantium, tenetur adipisci sed molestias libero ipsa
                perspiciatis, accusamus culpa molestiae. Placeat ipsa nihil
                omnis explicabo, nostrum aliquid voluptate, recusandae rerum
                molestias, quibusdam incidunt. Provident sint eos ducimus odio
                facilis quis voluptatibus explicabo sapiente veritatis minima
                facere sunt non omnis, earum voluptatem illum? Voluptates illum
                consectetur non ad itaque aut cumque aliquid corrupti quia in,
                nostrum temporibus quam earum, eligendi harum inventore
                reiciendis nobis deleniti quibusdam placeat dolor exercitationem
                mollitia voluptatibus. Voluptas quasi voluptatibus neque
                assumenda veniam! Unde, labore ipsa maxime itaque odio iste hic
                commodi totam voluptatem sequi voluptate fugiat voluptas aut
                inventore culpa dolorem tenetur vero amet voluptates officiis
                mollitia. Distinctio magnam vel quos eius esse dignissimos
                excepturi non et delectus architecto deleniti, rerum tenetur
                earum aperiam sapiente neque error harum eum cumque vitae fugit
                deserunt maiores! Assumenda, vel neque ipsa natus voluptatibus
                est illo beatae molestias atque facere non et perferendis! Ex a
                assumenda hic maiores. Ratione iusto quam ad facere quia
                temporibus velit unde ut pariatur odit asperiores totam soluta
                facilis est repudiandae inventore ab voluptas officiis enim
                blanditiis, laboriosam nobis iure saepe. Harum cum dolorem
                quisquam, atque libero accusantium aperiam facilis. Cum fugiat
                nulla laudantium, explicabo amet blanditiis facilis eligendi
                harum animi ullam sed autem id a voluptas quidem illum iure vero
                asperiores eaque, est repellendus placeat ab ipsa. Perspiciatis,
                sit vel velit rem quia similique magni aliquid, minus, sint
                asperiores illum exercitationem deleniti rerum. Unde veniam aut
                temporibus vitae? Autem, rerum? Assumenda molestiae iusto minus
                expedita optio error repellendus repellat odio minima dolor
                magni accusantium, voluptas doloribus dicta voluptatum fugiat
                quibusdam? Dolores dolorem ducimus similique iusto rerum
                temporibus fugit nostrum quia sapiente mollitia a sequi ipsum
                facilis reiciendis, labore nisi magnam nesciunt aperiam? Fuga,
                exercitationem reprehenderit, quam, expedita earum consequuntur
                eveniet atque dolorem adipisci autem voluptas ipsa ipsum culpa
                ab! Voluptates in eos, fugit facilis est quae rerum, tenetur
                nisi dicta blanditiis itaque veniam cum magni neque ipsam ab
                unde, ex mollitia id? Ipsa, deserunt quo aspernatur eligendi
                illum aut amet voluptate repellendus corporis nam, doloribus
                iusto quod doloremque facilis ducimus cupiditate ex sapiente
                quasi? Placeat labore obcaecati quos molestiae minus, deserunt
                iusto cum sunt eum quia veniam nisi voluptates, sit iure fugit
                dolorum repellendus quaerat voluptate aliquam. Dolor voluptates
                culpa voluptatem voluptatum officia et laborum officiis harum ut
                magnam ipsum labore est cum voluptas porro molestias doloremque
                expedita tenetur, aliquam quam soluta ipsam beatae maxime
                maiores? Dolorum, eius odit voluptatem quod laboriosam ipsa
                illum eum sed voluptate ducimus reprehenderit voluptas unde sunt
                facilis quam assumenda? Similique excepturi illum beatae quaerat
                laudantium tempora nesciunt, minima animi commodi sint ipsa,
                esse officiis a eius unde ducimus eveniet ab facere.
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
