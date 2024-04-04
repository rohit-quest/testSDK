import React, {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import "./GetStarted.css";
// import config from '../../config';
import QuestContext from "../QuestWrapper";
import Loader from "../Login/Loader";
import {
  greenCheck,
  gsTick,
  helpCenter1,
  questLogo,
} from "../../assets/images";
import QuestLabs from "../QuestLabs";
import { SecondaryButton } from "../Modules/SecondaryButton";
import { PrimaryButton } from "../Modules/PrimaryButton";
import GetStartedSvgs from "./Svgs";
import General from "../../general";

interface offlineData {
  id: number;
  title: string;
  url: string;
  criteriaId?: string;
  description?: string;
  btn1?: string;
  btn2?: string;
  completed?: boolean;
  btn1Link: string;
  longDescription?: string;
  imageUrl?: string;
}

type offlineGetStartedProps = {
  cardBackground?: string;
  cardHeadingColor?: string;
  onCompleteAllStatus?: () => void;
  iconUrls?: Array<string>;
  uniqueUserId?: string;
  uniqueEmailId?: string;
  cardBorderColor?: string;
  headingText?: string;
  descriptionText?: string;
  autoHide?: boolean;
  showProgressBar?: boolean;
  completedButtonColor?: string;
  completedButtonBackgroundColor?: string;
  arrowColor?: string;
  showLoadingIndicator?: boolean;
  allowMultiClick?: boolean;
  showFooter?: boolean;
  ButtonType?: "Arrow" | "Buttons";
  onLinkTrigger?: (url: string, index: number) => void;
  template?: 1 | 2;
  styleConfig?: {
    Heading?: CSSProperties;
    Description?: CSSProperties;
    PrimaryButton?: CSSProperties;
    SecondaryButton?: CSSProperties;
    Form?: CSSProperties;
    Footer?: CSSProperties;
    Card?: CSSProperties;
    Topbar?: CSSProperties;
    ProgressBar?: {
      barColor?: string,
      ProgressText?: CSSProperties
    }
    Icon?: CSSProperties
    Arrow?: {
      Background?: string,
      IconColor?: string,
      CompletedBackground?: string,
      CompletedIconColor?: string
    }

  };
  offlineData: offlineData[];
};

function OfflineGetStarted({
  iconUrls = [],
  headingText,
  descriptionText,
  autoHide,
  showProgressBar = false,
  template = 1,
  arrowColor,
  showLoadingIndicator = true,
  allowMultiClick = false,
  showFooter = true,
  styleConfig,
  offlineData,
  ButtonType = "Arrow",
  onLinkTrigger = (url: string, index: number) => { window.location.href = url },
}: offlineGetStartedProps) {
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [allCriteriaCompleted, setAllCriteriaCompleted] =
    useState<boolean>(false);
  // const [criteriaSubmit, setCriteriaSubmit] = useState<string[]>([])
  const { themeConfig,apiType } = useContext(QuestContext.Context);
  const [dropdowns, setDropdown] = useState<Array<boolean>>([]);
  const [data, setData] = useState(offlineData);

  const completedPercentage = data?.length
    ? (data?.reduce((a, b) => a + (b.completed ? 1 : 0), 0) * 100) /
    data?.length
    : 0;
  useEffect(() => {
    offlineData?.length && setData(offlineData);
  }, [offlineData]);

  let GeneralFunctions = new General('mixpanel', apiType);

  const handleCriteriaClick = (criteriaId: string | undefined, url: string) => {
    const update = data.map((item, index) => {
      if (item?.criteriaId == criteriaId) {
        item.completed = true;
        onLinkTrigger(url, index);
      }
      return item;
    });
    setData(update);
  };

  useEffect(() => {
    const eventFire = async () => {
      const data = await GeneralFunctions.fireTrackingEvent("quest_get_started_offline_loaded", "get_started_offline");
    }
    eventFire();
    setDropdown(new Array(offlineData.length).fill(false));
  }, []);

  return (
    <div
      style={{
        background:
          styleConfig?.Form?.backgroundColor || themeConfig?.backgroundColor,
        height: styleConfig?.Form?.height || "auto",
        fontFamily: themeConfig.fontFamily || "'Figtree', sans-serif",
        ...styleConfig?.Form,
      }}
      className="get_started_box"
    >
      {showLoadingIndicator && showLoader && <Loader />}
      {(autoHide === true ? !!data.length && !allCriteriaCompleted : true) && (
        <div className="gs-heading-div" style={{ ...styleConfig?.Topbar }}>
          <div>
            <div
              style={{
                color: styleConfig?.Heading?.color || themeConfig?.primaryColor,
                ...styleConfig?.Heading,
              }}
              className="gs-heading"
            >
              {headingText || "Quickstart Guide"}
            </div>
            <div
              style={{
                color:
                  styleConfig?.Description?.color ||
                  themeConfig?.secondaryColor,
                ...styleConfig?.Description,
              }}
              className="gs-subheading"
            >
              {descriptionText ||
                "Get started with Quest and explore how Quest can take your customer engagement to the next level"}
            </div>
          </div>
        </div>
      )}
      {(autoHide === true ? !!data.length && !allCriteriaCompleted : true) &&
        showProgressBar && (
          <div className="q_gt_progress">
            <div className="q_progress_percentage">
              {Math.floor(completedPercentage) || 0}% Completed
            </div>
            <div className="q_gt_progress_bar">
              <div
                className="q_progress_bar_completed"
                style={{ width: `${completedPercentage}%` }}
              ></div>
            </div>
          </div>
        )}
      <div
        className="gs-cards-container"
        style={{
          padding: showProgressBar ? "0px 20px 20px 20px" : "20px",
          gap: template == 2 ? "0px" : "16px",
        }}
      >
        {(autoHide === true ? !allCriteriaCompleted : true) &&
          data?.length &&
          data.map((e, i) =>
            template == 2 ? (
              <div
                key={i}
                style={{
                  ...styleConfig?.Card,
                }}
                onClick={() => {
                  const linkClick = async () => {
                    const data = await GeneralFunctions.fireTrackingEvent("quest_get_started_offline_link_clicked", "get_started_offline");
                  }
                  linkClick();
                  setDropdown((prev) =>
                    prev.map((e, index) => (i === index ? !e : e))
                  )
                }
                }
                className="gs-single-card-dropDown"
              >
                <div className="gs_card_body_dropDown">
                  <div className="gs_card_body_image" style={{ ...styleConfig?.Icon }}>
                    <img
                      className="gs-card-icon"
                      src={e.imageUrl || (!!iconUrls.length ? iconUrls?.[i] : "") || questLogo}
                      alt=""
                    />
                  </div>
                  <div className="gs-card-text">
                    <div
                      style={{
                        color:
                          styleConfig?.Heading?.color ||
                          themeConfig?.primaryColor,
                      }}
                      className="gs-card-head"
                    >
                      {e.title}
                    </div>
                    <div
                      style={{
                        color:
                          styleConfig?.Description?.color ||
                          themeConfig?.secondaryColor,
                      }}
                      className="gs-card-desc"
                    >
                      {e.description}
                    </div>
                  </div>
                  <div>
                    {
                      <div className="gs-card-img-button">
                        {e.completed ? (
                          <div className="q_gt_arrow-completed" style={{ background: styleConfig?.Arrow?.CompletedBackground }}>
                            <GetStartedSvgs
                              type={"greenCheck"}
                              color={styleConfig?.Arrow?.CompletedIconColor || "#098849"}
                            />
                          </div>
                        ) : (
                          <div className="q_gt_arrow" style={{ background: styleConfig?.Arrow?.Background }}>
                            {dropdowns[i] ? (
                              <GetStartedSvgs
                                type={"upArrow"}
                                color={styleConfig?.Arrow?.IconColor || arrowColor}
                              />
                            ) : e.completed ? (
                              <GetStartedSvgs type={"greenCheck"} color={styleConfig?.Arrow?.CompletedIconColor || "#098849"} />
                            ) : (
                              <GetStartedSvgs
                                type={"downArrowIcon"}
                                color={styleConfig?.Arrow?.IconColor || arrowColor}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    }
                  </div>
                </div>
                {dropdowns[i] && (
                  <div className="gs_card_dropdown">
                    <div
                      className="gs_drop_desc"
                      style={{
                        color:
                          styleConfig?.Description?.color ||
                          themeConfig?.secondaryColor,
                      }}
                    >
                      {e.longDescription}
                    </div>
                    <div className="gs_drop_btns">
                      <PrimaryButton
                        className={"gs_start_btn"}
                        children={e.btn2 || "Start Now"}
                        onClick={(event) => {
                          const eventFire = async () => {
                            const data = await GeneralFunctions.fireTrackingEvent("quest_get_started_offline_primary_button_clicked", "get_started_offline");
                          }
                          eventFire();
                          event.stopPropagation()
                          !(!allowMultiClick && e.completed) &&
                            handleCriteriaClick(e.criteriaId, e.url)
                        }
                        }
                        disabled={!allowMultiClick && e.completed}
                        style={{
                          flex: "inherit",
                          width: "fit-content",
                          background:
                            styleConfig?.PrimaryButton?.background ||
                            themeConfig?.buttonColor,
                          ...styleConfig?.PrimaryButton,
                        }}
                      />
                      <SecondaryButton
                        style={{
                          ...styleConfig?.SecondaryButton,
                          flex: "inherit",
                          width: "fit-content",
                        }}
                        onClick={() => {
                          const eventFire = async () => {
                            const data = await GeneralFunctions.fireTrackingEvent("quest_get_started_offline_secondary_button_clicked", "get_started_offline");
                          }
                          eventFire();
                          window.open(e.url)
                        }}
                        className="gs_visit_btn"
                        children={e.btn1 || "Visit Website"}
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div
                key={i}
                className="gs-single-card"
                onClick={() => {
                  const eventFire = async () => {
                    const data = await GeneralFunctions.fireTrackingEvent("quest_get_started_offline_link_clicked", "get_started_offline");
                  }
                  eventFire();
                  !(!allowMultiClick && e.completed) &&
                    handleCriteriaClick(e.criteriaId, e.url)
                }
                }
              >
                <div
                  className="gs_card_body"
                  style={{
                    // background: cardBackground,
                    // border: `1px solid ${cardBorderColor}`,
                    ...styleConfig?.Card,
                  }}
                >
                  <div className="gs_card_body_image" style={{ ...styleConfig?.Icon }}>
                    <img
                      className="gs-card-icon"
                      width="24px"
                      src={e.imageUrl || (!!iconUrls.length ? iconUrls?.[i] : "") || questLogo}
                      alt=""
                    />
                  </div>
                  <div className="gs-card-text">
                    <div
                      style={{
                        color:
                          styleConfig?.Heading?.color ||
                          themeConfig?.primaryColor,
                      }}
                      className="gs-card-head"
                    >
                      {e.title}
                    </div>
                    <div
                      style={{
                        color:
                          styleConfig?.Description?.color ||
                          themeConfig?.secondaryColor,
                      }}
                      className="gs-card-desc"
                    >
                      {e.description}
                    </div>
                  </div>

                  {ButtonType === "Buttons" &&
                    (!e.completed ? (
                      <div className="gs_drop_btns">
                        <SecondaryButton
                          style={{
                            flex: "inherit",
                            width: "fit-content",
                            border: "none",
                            ...styleConfig?.SecondaryButton,
                          }}
                          onClick={(event) => {
                            const eventFire = async () => {
                              const data = await GeneralFunctions.fireTrackingEvent("quest_get_started_offline_secondary_button_clicked", "get_started_offline");
                            }
                            eventFire();
                            event.stopPropagation(); window.open(e.btn1Link); }}
                          className="gs_visit_btn gs_tempalate1_btn"
                          children={e.btn1 || "Visit Website"}
                        />
                        <PrimaryButton
                          className={"gs_start_btn"}
                          children={e.btn2 || "Start Now"}
                          onClick={(event) => {
                            const eventFire = async () => {
                              const data = await GeneralFunctions.fireTrackingEvent("quest_get_started_offline_primary_button_clicked", "get_started_offline");
                            }
                            eventFire();
                            event.stopPropagation();
                            !(!allowMultiClick && e.completed) &&
                              handleCriteriaClick(e.criteriaId, e.url);
                          }}
                          disabled={!allowMultiClick && e.completed}
                          style={{
                            flex: "inherit",
                            width: "fit-content",
                            background:
                              styleConfig?.PrimaryButton?.background ||
                              themeConfig?.buttonColor,
                            ...styleConfig?.PrimaryButton,
                          }}
                        />
                      </div>
                    ) : (
                      <div className="gs-card-img-button">
                        <div className="q_gt_arrow-completed" style={{ background: styleConfig?.Arrow?.CompletedBackground }}>
                          <GetStartedSvgs type={"greenCheck"}  color={styleConfig?.Arrow?.CompletedIconColor || "#098849"} />
                        </div>
                      </div>

                    ))}
                  {ButtonType === "Arrow" && (
                    <div className="gs-card-img-button">
                      {e.completed ? (
                        <div className="q_gt_arrow-completed" style={{ background: styleConfig?.Arrow?.CompletedBackground }}>
                          <GetStartedSvgs
                            type={"greenCheck"}
                            color={styleConfig?.Arrow?.CompletedIconColor || "#098849"}
                          />
                        </div>
                      ) : (
                        <div className="q_gt_arrow" style={{ background: styleConfig?.Arrow?.Background }}>
                          <GetStartedSvgs
                            type={"arrowRight"}
                            color={ styleConfig?.Arrow?.IconColor || arrowColor }
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              // </div>
            )
          )}
      </div>
      {showFooter &&
        (autoHide === true ? !!data.length && !allCriteriaCompleted : true) && (
          <div>
            <QuestLabs style={styleConfig?.Footer} />
          </div>
        )}
    </div>
  );
}

export default OfflineGetStarted;
