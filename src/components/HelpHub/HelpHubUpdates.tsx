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
    entityImage
  } = props;
  const [filterData, setFilterData] = useState<QuestCriteriaWithStatusType[]>(
    []
  );
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


  const getTimeDifference = (date: string) => {
    let dateGap = (new Date().getTime() - new Date(date).getTime()) / 86400000;
    return dateGap > 1 ? `${Math.floor(dateGap)} days ago` : "Yesterday";
  };

  const readUpdate = async (criteriaId: string, links?: string) => {
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
  }, [updateOneoutAnimation, updateOutAnimation]);

  return (
    <>
      {!showOneUpdate && (
        <div
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
              <div className="q-helphub-updates-task-cont">
                {filterData.map(
                  (value: QuestCriteriaWithStatusType, index: number) =>
                    claimStatusUpdates.includes(value?.criteriaId) ? (
                      <div
                        className={`q-helphub-updates-single-update-read`}
                        key={index}
                        style={{
                          background: themeConfig?.backgroundColor,
                          ...styleConfig?.Home?.Card,
                        }}
                        onClick={() => {
                          handleShowUpdate(value);
                        }}
                      >
                        <div className="update-img">
                          <div
                            style={{
                              width: "60px",
                              height: "60px",
                              flexShrink: "0",
                              borderRadius: "2.237px",
                              border: " 0.447px solid var(--Primary, #9035FF)",
                              background: `url(${value?.imageUrl || entityImage}) lightgray -3.73px -3.132px / 110.971% 102.745% no-repeat`,
                              objectFit:"contain",
                              backgroundSize:"cover",
                              backgroundPosition:"center top"
                            }}
                          ></div>
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
                              height: "60px",
                              flexShrink: "0",
                              borderRadius: "2.237px",
                              border: " 0.447px solid var(--Primary, #9035FF)",
                              background: `url(${value?.imageUrl || entityImage}) lightgray -3.73px -3.132px / 110.971% 102.745% no-repeat`,
                            }}
                          ></div>
                        </div>

                        <div className="read-task-details-unread">
                          <div className="update-time">
                            <img src={UpdatesUnreadLogo} alt="" />
                            <p
                              style={{
                                color: themeConfig?.secondaryColor,
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
          className={`q-update-one-container ${
            !updateOneoutAnimation ? "updateOneIn" : "updateOneOut"
          }`}
        >
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
            <div className="update-one-img">
              <div
                style={{
                  background: `url(${updateOneData?.imageUrl || entityImage})  lightgray -10.312px -8.675px / 110.971% 102.745% no-repeat`,
                  objectFit:"contain"
                }}
              ></div>
            </div>

            <div className="update-one-text-cont">
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
                }}
              >
                {updateOneData?.description}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dicta quaerat ratione, a ex iusto! Culpa, obcaecati. Esse voluptate accusamus optio, ullam modi rerum ipsa perferendis perspiciatis impedit nesciunt, assumenda nam consequuntur molestias omnis? Aliquam aspernatur porro odio eligendi amet corporis omnis nobis dolores. Et, aperiam repellat omnis placeat, vero consequatur voluptas ipsum nihil eveniet provident accusamus, quaerat ipsa molestias debitis similique numquam! Quae dolores, vel reprehenderit, ipsa maxime assumenda, corrupti dicta voluptate omnis veniam quasi blanditiis sint? Nisi molestias atque nostrum laudantium, dolorem error eligendi dicta asperiores at voluptatum repudiandae repellat vero neque esse sed maxime! Illum, qui perspiciatis non unde magni iure quam debitis recusandae quisquam nam quasi, quo culpa facilis animi, ab molestiae. Eveniet, quod obcaecati eaque saepe animi cumque ut explicabo quas architecto enim, vitae, fugiat labore? Minus distinctio rerum excepturi ex quam quisquam modi maiores nemo nobis, optio at, quasi vel odio dolore incidunt. Eum eius eveniet minima rerum, veritatis aut expedita, voluptatibus vero dolore ullam, saepe aspernatur ex. Harum odit minus qui molestiae mollitia consequuntur numquam facilis ullam corrupti autem. Ab iure quaerat omnis reprehenderit minima, praesentium blanditiis vel, doloribus rem provident optio excepturi quia! Labore voluptatum deserunt corrupti, eaque, sapiente repellat saepe enim nam ab aliquam commodi est consequuntur nobis asperiores vero, ducimus odio nostrum modi ullam dolore beatae laboriosam? Aperiam perspiciatis repellat in architecto, voluptate officiis maiores, tempora iusto totam sit reprehenderit, accusantium id doloribus omnis quod adipisci obcaecati sint blanditiis culpa rem animi! Ad velit quidem neque, minima aspernatur aliquid explicabo.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HelpHubUpdates;
