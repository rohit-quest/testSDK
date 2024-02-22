import { CSSProperties, useContext, useEffect, useState } from "react";
import "./GetStarted.css";
import axios from "axios";
import config from "../../config";
import QuestContext from "../QuestWrapper";
import { toast } from "react-toastify";
import Loader from "../Login/Loader";
import Cookies from "universal-cookie";
import {
  greenCheck,
  gsTick,
  questLogo,
} from "../../assets/images";
import { arrowRight, downArroIcon, upArrow } from "./Svgs";
import QuestLabs from "../QuestLabs";
import { PrimaryButton } from "../Modules/PrimaryButton";
import { SecondaryButton } from "../Modules/SecondaryButton";

type GetStartedProps = {
  userId: string;
  token: string;
  questId: string;
  cardBackground?: string;
  mainBackground?: string;
  onCompleteAllStatus?: () => void;
  iconUrls: Array<string>;
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
  footerBackgroundColor?: string;
  questIconColor?: string;
  showFooter?: boolean;
  onLinkTrigger?: (url: string, index: number) => void;
  template?: 1 | 2;
  styleConfig ?: {
    Heading ?: CSSProperties,
    Description?: CSSProperties,
    PrimaryButton?: CSSProperties,
    SecondaryButton?: CSSProperties,
    Form?:CSSProperties,
    Footer?:CSSProperties
}
};
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

function GetStarted({
  userId,
  token,
  questId,
  cardBackground = 'transparent',
  onCompleteAllStatus,
  iconUrls,
  uniqueUserId,
  cardBorderColor = '#EFEFEF',
  headingText,
  descriptionText,
  uniqueEmailId,
  autoHide,
  showProgressBar = false,
  template = 1,
  arrowColor,
  showLoadingIndicator = true,
  showAnnouncement = false,
  allowMultiClick = false,
  footerBackgroundColor = 'transparent',
  questIconColor = '#939393',
  onLinkTrigger = (url:string, index: number)=>{window.location.href=url},
  showFooter = true,
  styleConfig
}: GetStartedProps) {
  const [formdata, setFormdata] = useState<TutorialStep[]>([]);
  const { apiKey, apiSecret, entityId, featureFlags, apiType, themeConfig } = useContext(
    QuestContext.Context
  );
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [allCriteriaCompleted, setAllCriteriaCompleted] = useState<boolean>(false);
  const [criteriaSubmit, setCriteriaSubmit] = useState<string[]>([]);
  const [dropdowns, setDropdown] = useState<Array<boolean>>([]);

  let BACKEND_URL = apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL;
  const cookies = new Cookies();
  const completedPercentage = (formdata.reduce((a, b) => a + (b.completed ? 1 : 0), 0) * 100) / formdata.length;
  let externalUserId = cookies.get("externalUserId");
  let questUserId = cookies.get("questUserId");
  let questUserToken = cookies.get("questUserToken");

  const handleCriteriaClick = (id: any, url: string) => {
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
    const request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}/verify?userId=${headers.userId}`;
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
      })
      .finally(() => {
        setShowLoader(false);
      });
  };


  useEffect(() => {
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
          });
      } else {
        fetchData(headers);
      }

  function fetchData(header: any) {
    const request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}?userId=${header.userId}`;
    axios.get(request, { headers: header }).then((res) => {
      let response = res.data;
      let criterias = response?.eligibilityData?.map((criteria: any) => {
        return {
          type: criteria?.data?.criteriaType,
          title: criteria?.data?.metadata?.linkActionName,
          url: criteria?.data?.metadata?.linkActionUrl,
          description:
            criteria?.data?.metadata?.description ||
            "this is the description",
          btn1: criteria?.data?.metadata?.btn1,
          btn2: criteria?.data?.metadata?.btn2,
          btn1Link: criteria?.data?.metadata?.btn1Link,
          criteriaId: criteria?.data?.criteriaId,
          completed: criteria?.completed,
          longDescription:
            criteria?.longDescription ||
            "Be sure to check out the Quest labs community for support, plus tips & tricks from Quest users",
          imageUrl: criteria?.imageUrl,
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
          });
      } else {
        fetchData(headers);
      }

      function fetchData(header: any) {
        const json = {
          userId: header.userId,
        };
        const request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}/claim?userId=${header.userId}`;
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
          })
          .finally(() => {
            setShowLoader(false);
          });
      }
    }
  }, [allCriteriaCompleted]);


  if (featureFlags[config.FLAG_CONSTRAINTS.GetStartedFlag]?.isEnabled == false) {
    return <div></div>;
  }

  return (
    formdata.length > 0 &&
    <div
      style={{
        background: styleConfig?.Form?.backgroundColor || themeConfig?.backgroundColor, height: styleConfig?.Form?.height || "auto", fontFamily: themeConfig.fontFamily || "'Figtree', sans-serif" , ...styleConfig?.Form
      }}
      className="get_started_box"
    >
      {showLoadingIndicator && showLoader && <Loader />}
      {(autoHide === true
        ? !!formdata.length && !allCriteriaCompleted
        : true) && (
        <div className="gs-heading-div">
          <div>
            <div style={{  color: styleConfig?.Heading?.color || themeConfig?.primaryColor, ...styleConfig?.Heading }} className="gs-heading">
              {headingText || "Quickstart Guide"}
            </div>
            <div style={{ color: styleConfig?.Description?.color || themeConfig?.secondaryColor, ...styleConfig?.Description }} className="gs-subheading">
              {descriptionText ||
                "Get started with Quest and explore how Quest can take your customer engagement to the next level"}
            </div>
          </div>
        </div>
      )}
      {(autoHide === true ? !!formdata.length && !allCriteriaCompleted : true) &&
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
      <div className="gs-cards-container" style={{ padding: showProgressBar ? '0px 20px 20px 20px' : '20px', gap: template == 2 ? '0px' : '16px' }}>
        {(autoHide === true ? !allCriteriaCompleted : true) &&
          formdata.map((e, i) =>
            template == 2 ? (
              <div
                key={i}
                style={{
                  background: cardBackground,
                  borderBottom: `1px solid ${cardBorderColor}`,
                }}
                onClick={() =>
                  setDropdown((prev) =>
                    prev.map((e, index) => (i === index ? !e : e))
                  )
                }
                className="gs-single-card-dropDown"
              >
                <div
                  className="gs_card_body_dropDown"
                >
                  <div className="gs_card_body_image">
                    <img
                      className="gs-card-icon"
                      src={e.imageUrl || iconUrls[i] || questLogo}
                      alt=""
                    />
                  </div>
                  <div className="gs-card-text">
                    <div
                      style={{ color: styleConfig?.Heading?.color || themeConfig?.primaryColor }}
                      className="gs-card-head"
                    >
                      {e.title}
                    </div>
                    <div
                       style={{ color: styleConfig?.Description?.color || themeConfig?.secondaryColor }}
                      className="gs-card-desc"
                    >
                      {e.description}
                    </div>
                  </div>
                  <div>
                    {
                      <div className="q_gt_dropdown">
                        {e.completed ? (
                          <img src={greenCheck} alt="" className="q_gt_arrow-completed" />
                        ) : (
                          <img
                            src={
                              dropdowns[i]
                                ? upArrow(arrowColor)
                                : e.completed
                                  ? gsTick
                                  : downArroIcon(arrowColor)
                            }
                            alt=""
                            className="q_gt_arrow"
                          />
                        )}
                      </div>
                    }
                  </div>
                </div>
                {dropdowns[i] && (
                  <div className="gs_card_dropdown">
                    <div className="gs_drop_desc"  style={{ color: styleConfig?.Description?.color || themeConfig?.secondaryColor }}>{e.longDescription}</div>
                    <div className="gs_drop_btns">
                      <PrimaryButton className={'gs_start_btn'} children={"Start Now"} onClick={(event) =>{
                          event.stopPropagation()
                          !(!allowMultiClick && e.completed) &&
                          handleCriteriaClick(e.criteriaId, e.url)
                         }
                        }
                        disabled={(!allowMultiClick && e.completed)}
                        style={{
                          background: styleConfig?.PrimaryButton?.background || themeConfig?.buttonColor,
                          ...styleConfig?.PrimaryButton
                         }}
                        />
                      <SecondaryButton
                       style={{...styleConfig?.SecondaryButton}}
                       onClick={() => window.open(e.url)} 
                      className="gs_visit_btn" 
                      children={ e.btn1 || "Visit Website"} />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div
                key={i}
                className="gs-single-card"
                onClick={() =>{
                  !(!allowMultiClick && e.completed) &&
                  handleCriteriaClick(e.criteriaId, e.url)
                  console.log(e.completed,allowMultiClick)
                  }
                }
              >
                <div
                  className="gs_card_body"
                  style={{ background: cardBackground }}
                >
                  <div className="gs_card_body_image">
                    <img
                      className="gs-card-icon"
                      width="24px"
                      src={iconUrls[i] || questLogo}
                      alt=""
                    />
                  </div>
                  <div className="gs-card-text">
                    <div
                      style={{ color: styleConfig?.Heading?.color || themeConfig?.primaryColor }}
                      className="gs-card-head"
                    >
                      {e.title}
                    </div>
                    <div
                      style={{ color: styleConfig?.Description?.color || themeConfig?.secondaryColor }}
                      className="gs-card-desc"
                    >
                      {e.description}
                    </div>
                  </div>
                  {/* <div className="gs-card-btn-container"> */}
                    <div
                      className="gs-card-img-button"
                    >
                      {e.completed ? (
                        <img src={greenCheck} className="q_gt_arrow-completed" alt="" />
                      ) : (
                        <img
                          className="q_gt_arrow"
                          src={arrowRight(arrowColor)}
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                </div>
              // </div>
            )
          )}
      </div>
      {(showFooter && (autoHide === true
        ? !!formdata.length && !allCriteriaCompleted
        : true)) &&
        <div>
          <QuestLabs style={styleConfig?.Footer} />
        </div>
      }
    </div>
  );
}

export default GetStarted;
