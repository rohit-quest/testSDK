import { CSSProperties, useContext, useEffect, useState } from "react";
import "./GetStarted.css";
import axios from "axios";
import config from "../../config";
import QuestContext from "../QuestWrapper";
import { toast } from "react-toastify";
import Loader from "../Login/Loader";
import Cookies from "universal-cookie";
import { greenCheck, gsTick, questLogo } from "../../assets/images";
import GetStartedSvgs from "./Svgs";
import QuestLabs from "../QuestLabs";
import { PrimaryButton } from "../Modules/PrimaryButton";
import { SecondaryButton } from "../Modules/SecondaryButton";
import General from "../../general";

type GetStartedProps = {
  userId: string;
  token: string;
  questId: string;
  cardBackground?: string;
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
  showAnnouncement?: boolean;
  allowMultiClick?: boolean;
  ButtonType?: "Arrow" | "Buttons";
  showFooter?: boolean;
  onLinkTrigger?: (url: string, index: number) => void;
  template?: 1 | 2;
  isImageOpen?: boolean;
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
      barColor?: string;
      ProgressText?: CSSProperties;
      barParentColor?: string;
    };
    CardContainer?: CSSProperties;
    Icon?: CSSProperties;
    Arrow?: {
      Background?: string,
      IconColor?: string,
      CompletedBackground?: string,
      CompletedIconColor?: string
    }
  };
  IsImageOpen?: {
    ContainerDiv?: CSSProperties;
    ImageContainer?: {
      ImageContainerProperties?: CSSProperties;
      Image?: CSSProperties;
    };
  };
  enableVariation?: boolean;
};
type BrandTheme = {
  accentColor?: string;
  background?: string;
  borderRadius?: string;
  buttonColor?: string;
  contentColor?: string;
  fontFamily?: string;
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  tertiaryColor?: string;
  titleColor?: string;
}
interface TutorialStep {
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

interface QuestThemeData {
  accentColor: string;
  theme: string;
  borderRadius: string;
  buttonColor: string;
  images: string[]

}

function GetStarted({
  userId,
  token,
  questId,
  onCompleteAllStatus,
  iconUrls = [],
  uniqueUserId,
  headingText,
  descriptionText,
  uniqueEmailId,
  autoHide,
  showProgressBar = false,
  template = 1,
  arrowColor,
  showLoadingIndicator = true,
  showAnnouncement = false,
  ButtonType = "Arrow",
  allowMultiClick = false,
  onLinkTrigger = (url: string, index: number) => {
    window.location.href = url;
  },
  showFooter = true,
  styleConfig,
  enableVariation = false
  isImageOpen,
}: GetStartedProps) {
  const [formdata, setFormdata] = useState<TutorialStep[]>([]);
  const { apiKey, apiSecret, entityId, featureFlags, apiType, themeConfig } =
    useContext(QuestContext.Context);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [allCriteriaCompleted, setAllCriteriaCompleted] =
    useState<boolean>(false);
  const [criteriaSubmit, setCriteriaSubmit] = useState<string[]>([]);
  const [dropdowns, setDropdown] = useState<Array<boolean>>([]);
  const [questThemeData, setQuestThemeData] = useState<QuestThemeData>({
    accentColor: "",
    theme: "",
    borderRadius: "",
    buttonColor: "",
    images: []
})
const [BrandTheme, setBrandTheme] = useState<BrandTheme>({
    accentColor: "",
    background: "",
    borderRadius: "",
    buttonColor: "",
    contentColor: "",
    fontFamily: "",
    logo: "",
    primaryColor: "",
    secondaryColor: "",
    tertiaryColor: "",
    titleColor: ""
})

  let BACKEND_URL =
    apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL;
  const cookies = new Cookies();
  const completedPercentage =
    (formdata?.reduce((a, b) => a + (b.completed ? 1 : 0), 0) * 100) /
    formdata.length;
  let externalUserId = cookies.get("externalUserId");
  let questUserId = cookies.get("questUserId");
  let questUserToken = cookies.get("questUserToken");

  let GeneralFunctions = new General("mixpanel", apiType);




  const getTheme = async (theme: string) => {
    try {
        const request = `${BACKEND_URL}api/entities/${entityId}?userId=${userId}`;
        const response = await axios.get(request, { headers: { apiKey, userId, token } })
        setBrandTheme(response.data.data.theme.BrandTheme[theme])
    } catch (error) {
        GeneralFunctions.captureSentryException(error);
    }
}

  const handleCriteriaClick = (id: any, url: string) => {
    // clg
    if (showLoader) return;
    const headers = {
      apiKey: apiKey,
      apisecret: apiSecret,
      userId: uniqueUserId ? questUserId : userId,
      token: uniqueUserId ? questUserToken : token,
    };

    if (showAnnouncement) return onLinkTrigger(url, id);

    const json = {
      criteriaId: id,
    };

    const request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}/verify?userId=${headers.userId}&getVariation=${enableVariation}`;
    setShowLoader(true);
    axios
      .post(request, json, { headers: headers })
      .then((response) => {
        if (response.data.success) {
          setCriteriaSubmit([...criteriaSubmit, id]);
          onLinkTrigger(url, id);
        } else {
          toast.error(response.data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        GeneralFunctions.captureSentryException(error);
      })
      .finally(() => {
        setShowLoader(false);
      });
  };

  useEffect(() => {
    GeneralFunctions.fireTrackingEvent(
      "quest_get_started_loaded",
      "get_started"
    );

    if (entityId) {
      const headers = {
        apiKey: apiKey,
        apisecret: apiSecret,
        userId: userId,
        token: token,
      };

      const body = {
        externalUserId: !!uniqueUserId && uniqueUserId,
        entityId: entityId,
        email: uniqueEmailId,
      };

      if (
        !!externalUserId &&
        !!questUserId &&
        !!questUserToken &&
        externalUserId == uniqueUserId
      ) {
        let header = {
          ...headers,
          ...{ userId: questUserId, token: questUserToken },
        };
        fetchData(header);

        axios
          .post(`${BACKEND_URL}api/users/external/login`, body, { headers })
          .then((res) => {
            let { userId, token } = res.data;
            let header = { ...headers, ...{ userId, token } };
            fetchData(header);
            const date = new Date();
            date.setHours(date.getHours() + 12);
            cookies.set("externalUserId", uniqueUserId, {
              path: "/",
              expires: date,
            });
            cookies.set("questUserId", userId, { path: "/", expires: date });
            cookies.set("questUserToken", token, { path: "/", expires: date });
          })
          .catch((error) => {
            GeneralFunctions.captureSentryException(error);
          });
      } else {
        fetchData(headers);
      }

      function fetchData(header: any) {
        const request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}?userId=${header.userId}&getVariation=${enableVariation}`;
        axios
          .get(request, { headers: header })
          .then((res) => {
            let response = res.data;
            if (response.data.uiProps?.questThemeData) {
            setQuestThemeData(response?.data?.uiProps?.questThemeData)
            if (response.data.uiProps?.questThemeData.theme) {
                // getTheme(response.data.uiProps.questThemeData.theme) disabled for now
            }
        }
            let criterias = response?.eligibilityData?.map((criteria: any) => {
              return {
                type: criteria?.data?.criteriaType,
                title: criteria?.data?.metadata?.linkActionName,
                url: criteria?.data?.metadata?.linkActionUrl,
                description: criteria?.data?.metadata?.description,
                btn1: criteria?.data?.metadata?.btn1,
                btn2: criteria?.data?.metadata?.btn2,
                btn1Link: criteria?.data?.metadata?.btn1Link,
                criteriaId: criteria?.data?.criteriaId,
                completed: criteria?.completed,
                longDescription:
                  criteria?.data?.metadata?.longDescription ||
                  "Be sure to check out the Quest labs community for support, plus tips & tricks from Quest users",
                imageUrl: criteria?.data?.metadata?.imageUrl,
              };
            });
            const allCriteriasCompleted = criterias.every(
              (criteria: any) => criteria.completed === true
            );
            if (allCriteriasCompleted) {
              setAllCriteriaCompleted(true);
            }
            criterias = Array.isArray(criterias) ? criterias : [];
            if (!dropdowns.length)
              setDropdown(new Array(criterias.length).fill(false));
            setFormdata([...criterias]);
          })
          .catch((error) => {
            GeneralFunctions.captureSentryException(error);
          });
      }
    }
  }, [criteriaSubmit]);

  useEffect(() => {
    if (allCriteriaCompleted) {
      const headers = {
        apiKey: apiKey,
        apisecret: apiSecret,
        userId: userId,
        token: token,
      };

      const body = {
        externalUserId: !!uniqueUserId && uniqueUserId,
        entityId: entityId,
        email: uniqueEmailId,
      };

      if (
        !!externalUserId &&
        !!questUserId &&
        !!questUserToken &&
        externalUserId == uniqueUserId
      ) {
        let header = {
          ...headers,
          ...{ userId: questUserId, token: questUserToken },
        };
        fetchData(header);
      } else if (!!uniqueUserId) {
        axios
          .post(`${BACKEND_URL}api/users/external/login`, body, { headers })
          .then((res) => {
            let { userId, token } = res.data;
            let header = { ...headers, ...{ userId, token } };
            fetchData(header);
            const date = new Date();
            date.setHours(date.getHours() + 12);
            cookies.set("externalUserId", uniqueUserId, {
              path: "/",
              expires: date,
            });
            cookies.set("questUserId", userId, { path: "/", expires: date });
            cookies.set("questUserToken", token, { path: "/", expires: date });
          })
          .catch((error) => {
            GeneralFunctions.captureSentryException(error);
          });
      } else {
        fetchData(headers);
      }

      function fetchData(header: any) {
        const json = {
          userId: header.userId,
        };
        const request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}/claim?userId=${header.userId}&getVariation=${enableVariation}`;
        setShowLoader(true);
        axios
          .post(request, json, { headers: header })
          .then((response) => {
            if (response.data.success) {
              const cookies = new Cookies();
              cookies.set("getStartedScreenComplete", true, { path: "/" });
              onCompleteAllStatus && onCompleteAllStatus();
              return;
            } else {
              toast.error(response.data.error);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            GeneralFunctions.captureSentryException(error);
          })
          .finally(() => {
            setShowLoader(false);
          });
      }
    }
  }, [allCriteriaCompleted]);

  if (
    featureFlags[config.FLAG_CONSTRAINTS.GetStartedFlag]?.isEnabled == false
  ) {
    return <div></div>;
  }
  if (showLoadingIndicator && showLoader) {
    return <Loader />;
  }
  return (
    formdata.length > 0 &&
    <div
      style={{
        background: styleConfig?.Form?.backgroundColor || BrandTheme?.background || themeConfig?.backgroundColor, height: styleConfig?.Form?.height || "auto", fontFamily: themeConfig.fontFamily || "'Figtree', sans-serif", borderRadius: styleConfig?.Form?.borderRadius || questThemeData?.borderRadius || BrandTheme?.borderRadius, ...styleConfig?.Form
      }}
      className="get_started_box"
    >

      {(autoHide === true
        ? !!formdata.length && !allCriteriaCompleted
        : true) && (
          <div className="gs-heading-div" style={{...styleConfig?.Topbar}}>
            <div>
              <div style={{ color: styleConfig?.Heading?.color || BrandTheme?.titleColor || BrandTheme?.primaryColor || themeConfig?.primaryColor, ...styleConfig?.Heading }} className="gs-heading">
                {headingText || "Quickstart Guide"}
              </div>
              <div style={{ color: styleConfig?.Description?.color || BrandTheme?.secondaryColor || themeConfig?.secondaryColor, ...styleConfig?.Description }} className="gs-subheading">


                {descriptionText ||
                  "Get started with Quest and explore how Quest can take your customer engagement to the next level"}
              </div>
            </div>
          </div>
        )}
        {(autoHide === true
          ? !!formdata.length && !allCriteriaCompleted
          : true) &&
          showProgressBar && (
            <div className="q_gt_progress">
              <div
                className="q_progress_percentage"
                style={{
                  color:
                    styleConfig?.ProgressBar?.ProgressText?.color || "#9035ff",
                }}
              >
                {Math.floor(completedPercentage) || 0}% Completed

              </div>
              <div
                className="q_gt_progress_bar"
                style={{ background: styleConfig?.ProgressBar?.barParentColor }}
              >
                <div
                  className="q_progress_bar_completed"
                  style={{
                    width: `${completedPercentage}%`,
                    background: styleConfig?.ProgressBar?.barColor || "#9035ff",
                  }}
                ></div>
              </div>
            </div>
          )}
        <div
          className="gs-cards-container"
          style={{
            padding: showProgressBar ? "0px 20px 20px 20px" : "20px",
            gap:
              template == 2
                ? styleConfig?.CardContainer?.gap || "0px"
                : styleConfig?.CardContainer?.gap || "16px",
            ...styleConfig?.CardContainer,
          }}
        >
          {(autoHide === true ? !allCriteriaCompleted : true) &&
            formdata.map((e, i) =>
              template == 2 ? (
                <div
                  key={i}
                  style={{
                    // background: cardBackground,
                    // borderBottom: `1px solid ${cardBorderColor}`,
                    ...styleConfig?.Card,
                  }}
                  onClick={(e) => {
                    GeneralFunctions.fireTrackingEvent(
                      "quest_get_started_link_clicked",
                      "get_started"
                    );

                    setDropdown((prev) =>
                      prev.map((e, index) => (i === index ? !e : e))
                    );
                  }}
                  className="gs-single-card-dropDown"
                >
                  <div className="gs_card_body_dropDown">
                    {!dropdowns[i] ? (
                      <div
                        className="gs_card_body_image"
                        style={{ ...styleConfig?.Icon }}
                      >
                        <img
                          className="gs-card-icon"
                          src={
                            e.imageUrl ||
                            (!!iconUrls.length ? iconUrls?.[i] : "") ||
                            questLogo
                          }
                          alt=""
                        />
                      </div>
                    ) : !isImageOpen ? (
                      <div
                        className="gs_card_body_image"
                        style={{ ...styleConfig?.Icon }}
                      >
                        <img
                          className="gs-card-icon"
                          src={
                            e.imageUrl ||
                            (!!iconUrls.length ? iconUrls?.[i] : "") ||
                            questLogo
                          }
                          alt=""
                        />
                      </div>
                    ) : (
                      ""
                    )}

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
                            <div
                              className="q_gt_arrow-completed"
                              style={{
                                background:
                                  styleConfig?.Arrow?.CompletedBackground,
                              }}
                            >
                              <GetStartedSvgs
                                type={"greenCheck"}
                                color={
                                  styleConfig?.Arrow?.CompletedIconColor ||
                                  "#098849"
                                }
                              />
                            </div>
                          ) : (
                            <div
                              className="q_gt_arrow"
                              style={{
                                background: styleConfig?.Arrow?.Background,
                              }}
                            >
                              {dropdowns[i] ? (
                                <GetStartedSvgs
                                  type={"upArrow"}
                                  color={
                                    styleConfig?.Arrow?.IconColor || arrowColor
                                  }
                                />
                              ) : e.completed ? (
                                <GetStartedSvgs
                                  type={"greenCheck"}
                                  color={
                                    styleConfig?.Arrow?.CompletedIconColor ||
                                    "#098849"
                                  }
                                />
                              ) : (
                                <GetStartedSvgs
                                  type={"downArrowIcon"}
                                  color={
                                    styleConfig?.Arrow?.IconColor || arrowColor
                                  }
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
                      {isImageOpen && (
                        <div
                          className="card-drop-down-cont"
                          style={{
                            ...styleConfig?.IsImageOpen?.ContainerDiv,
                          }}
                        >
                          <div
                            style={{
                              ...styleConfig?.IsImageOpen?.ImageContainer
                                ?.ImageContainerProperties,
                            }}
                          >
                            {/* <img src={e.imageUrl} alt="" /> */}
                            <img
                              src={
                                e.imageUrl ||
                                (!!iconUrls.length ? iconUrls?.[i] : "") ||
                                questLogo
                              }
                              alt=""
                              style={{
                                borderRadius:
                                  styleConfig?.IsImageOpen?.ImageContainer
                                    ?.Image?.borderRadius || "50%",
                                ...styleConfig?.IsImageOpen?.ImageContainer
                                  ?.Image,
                              }}
                            />
                            {/* hi */}
                          </div>
                          {/* hi */}
                        </div>
                      )}
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
                            GeneralFunctions.fireTrackingEvent(
                              "quest_get_started_primary_button_clicked",
                              "get_started"
                            );
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
                              questThemeData?.buttonColor || BrandTheme?.buttonColor ||
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
                            GeneralFunctions.fireTrackingEvent(
                              "quest_get_started_secondary_button_clicked",
                              "get_started"
                            );
                            window.open(e.url);
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
                    !(!allowMultiClick && e.completed) &&
                      handleCriteriaClick(e.criteriaId, e.url);
                  }}
                >
                  <div
                    className="gs_card_body"
                    style={{
                      ...styleConfig?.Card,
                    }}
                  >
                    <div
                      className="gs_card_body_image"
                      style={{ ...styleConfig?.Icon }}
                    >
                      <img
                        className="gs-card-icon"
                        src={
                          e.imageUrl ||
                          (!!iconUrls.length ? iconUrls?.[i] : "") ||
                          questLogo
                        }
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
                    {/* <div className="gs-card-btn-container"> */}
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
                              GeneralFunctions.fireTrackingEvent(
                                "quest_get_started_secondary_button_clicked",
                                "get_started"
                              );
                              event.stopPropagation();
                              window.open(e.btn1Link);
                            }}
                            className="gs_visit_btn gs_tempalate1_btn"
                            children={e.btn1 || "Visit Website"}
                          />
                          <PrimaryButton
                            className={"gs_start_btn"}
                            children={e.btn2 || "Start Now"}
                            onClick={(event) => {
                              GeneralFunctions.fireTrackingEvent(
                                "quest_get_started_primary_button_clicked",
                                "get_started"
                              );
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
                          <div
                            className="q_gt_arrow-completed"
                            style={{
                              background:
                                styleConfig?.Arrow?.CompletedBackground,
                            }}
                          >
                            <GetStartedSvgs
                              type={"greenCheck"}
                              color={
                                styleConfig?.Arrow?.CompletedIconColor ||
                                "#098849"
                              }
                            />
                          </div>
                        </div>
                      ))}
                    {ButtonType === "Arrow" && (
                      <div className="gs-card-img-button">
                        {e.completed ? (
                          <div
                            className="q_gt_arrow-completed"
                            style={{
                              background:
                                styleConfig?.Arrow?.CompletedBackground,
                            }}
                          >
                            <GetStartedSvgs
                              type={"greenCheck"}
                              color={
                                styleConfig?.Arrow?.CompletedIconColor ||
                                "#098849"
                              }
                            />
                          </div>
                        ) : (
                          <div
                            className="q_gt_arrow"
                            style={{
                              background: styleConfig?.Arrow?.Background,
                            }}
                          >
                            <GetStartedSvgs
                              type={"arrowRight"}
                              color={
                                styleConfig?.Arrow?.IconColor || arrowColor
                              }
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
          (autoHide === true
            ? !!formdata.length && !allCriteriaCompleted
            : true) && (
            <div>
             <QuestLabs style={{ background: styleConfig?.Footer?.backgroundColor || styleConfig?.Form?.backgroundColor || BrandTheme?.background || styleConfig?.Form?.background || themeConfig?.backgroundColor, ...styleConfig?.Footer }} />
            </div>
          )}
      </div>
  );
}

export default GetStarted;
