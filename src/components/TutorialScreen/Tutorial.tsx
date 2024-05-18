import axios from "axios";
import React, { useState, useEffect, useContext, CSSProperties } from "react";
import config from "../../config";
import QuestContext from "../QuestWrapper";
import "./TutorialScreen.css";
import "react-toastify/dist/ReactToastify.css";
import General from "../../general";
import { greenCheck, pendingIcon } from "../../assets/images";
import showToast from "../toast/toastService";
import Cookies from "universal-cookie";
import QuestLabs from "../QuestLabs";
import TopBar from "../Modules/TopBar";

const cookies = new Cookies();
let externalUserId = cookies.get("externalUserId");
let questUserId = cookies.get("questUserId");
let questUserToken = cookies.get("questUserToken");

interface TutorialStep {
  id: number;
  title: string;
  url: string;
  subheading?: string;
  criteriaId?: string;
  status?: boolean;
}

interface TutorialProps {
  heading: string;
  subheading: string;
  userId?: string;
  token?: string;
  questId?: string;
  bgColor?: string;
  btnTextColor?: string;
  textColor?: string;
  font?: string;
  isOpen?: boolean;
  uniqueUserId?: string;
  uniqueEmailId?: string;
  iconColor?: string;
  onLinkTrigger?: (link: string) => void;
  styleConfig?: {
    Form?: CSSProperties;
    Heading?: CSSProperties;
    Description?: CSSProperties;
    Footer?: CSSProperties;
    TopBar?: CSSProperties;
  };
  footerBackgroundColor?: string;
  showFooter?: boolean;
  variation?: string
}

interface QuestThemeData {
  accentColor: string;
  theme: string;
  borderRadius: string;
  buttonColor: string;
  images: string[];

}

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
};

const TutorialScreen: React.FC<TutorialProps> = ({
  heading,
  subheading,
  userId,
  token,
  questId,
  isOpen = true,
  uniqueUserId,
  uniqueEmailId,
  iconColor = "#939393",
  onLinkTrigger = (link) => {
    window.open(link, "smallWindow", "width=500,height=500");
  },
  styleConfig,
  showFooter = true,
  variation

}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const { apiKey, apiSecret, entityId, apiType, themeConfig } = useContext(
    QuestContext.Context
  );
  const [formdata, setFormdata] = useState<TutorialStep[]>([]);
  const [gradient, setGradient] = useState<boolean>(false);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [campaignVariationId, setCampaignVariationId] = useState('')
  const [hoverStates, setHoverStates] = useState(
    Array(formdata.length).fill(true)
  );
  const [questThemeData, setQuestThemeData] = useState<QuestThemeData>({
    accentColor: "",
    theme: "",
    borderRadius: "",
    buttonColor: "",
    images: [],
  });
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
    titleColor: "",
  });

  let BACKEND_URL =
    apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL;

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

  const handleNextStep = (id: any, url: string) => {
    GeneralFunctions.fireTrackingEvent(
      "quest_tutorial_step_link_clicked",
      "tutorial"
    );

    const headers = {
      apiKey: apiKey,
      apisecret: apiSecret,
      userId: userId,
      token: token,
    };

    const json = {
      actions: [
        {
          answers: [],
          actionId: id
        }
      ],
      campaignVariationId
    }
    const request = `${BACKEND_URL}api/v2/entities/${entityId}/campaigns/${questId}/verify`;

    setShowLoader(true);
    axios
      .post(request, json, { headers: headers })
      .then((response) => {
        if (response.data.success) {
          onLinkTrigger(url);
          const filterData = formdata.map((item) => {
            if (!item.status && item.id == id) {
              item["status"] = true;
              setCompletedSteps((prevSteps) => [...prevSteps, currentStep]);
            }
            return item;
          });
          setFormdata(filterData);
          showToast.success("Task completed");
        } else {
          showToast.error(response.data.error);
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
    GeneralFunctions.fireTrackingEvent("quest_tutorial_loaded", "tutorial");
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
          })
          .catch((error) => {
            console.error("Error:", error);
            GeneralFunctions.captureSentryException(error);
          });
      } else {
        fetchData(headers);
      }

      function fetchData(header: any) {
        let params = new URLSearchParams()
        params.set('platform', 'REACT')
        if(variation) params.set('variation', variation)

        const request = `${BACKEND_URL}api/v2/entities/${entityId}/campaigns/${questId}?${params.toString()}`;
        axios
          .get(request, { headers: header })
          .then((res) => {
            let response = res.data.data;
            if (response?.sdkConfig?.uiProps?.questThemeData) {
              setQuestThemeData(response.sdkConfig.uiProps.questThemeData)
              if (response.sdkConfig.uiProps?.questThemeData.theme) {
                // getTheme(response.data.uiProps.questThemeData.theme) disabled for now
              }
            }
            let actions = response?.actions?.map((action: any) => {
              return {
                type: action.actionType,
                title: action.title,
                url: action?.metadata?.link,
                subheading:
                action?.description ||
                  "this is the description",
                id: action.actionId,
                status: action?.isCompleted,
              };
            });
            setFormdata(actions);
            setCampaignVariationId(response.campaignVariationId)
          })
          .catch((error) => {
            console.error("Error:", error);
            GeneralFunctions.captureSentryException(error);
          });
      }
    }
  }, []);


  const handleStepLoad = (index: number, height: number) => {
    const connector = document.querySelector(
      `#q_tutorial_progress_connector_${index}`
    ) as HTMLElement;
    const nextContent = document.querySelector(
      `#q_tutorial_box_content_${index + 1}`
    ) as HTMLElement;
    //  console.log(height,nextContent.offsetHeight ,'187')
    if (connector && nextContent) {
      let connectorHeight =
        (height - 32) / 2 + (nextContent.offsetHeight - 32) / 2 + 32;

      connector.style.height = `${connectorHeight}px`;

      if (index === formdata.length - 1) {
        connector.style.display = "none";
      }
    }
  };

  if (!isOpen) return <></>;

  return (
    <div
      className="q-tutorial-cont"
      style={{
        background:
          styleConfig?.Form?.backgroundColor || BrandTheme?.background || themeConfig?.backgroundColor,
        height: styleConfig?.Form?.height || "auto",
        borderRadius: styleConfig?.Form?.borderRadius || questThemeData?.borderRadius || BrandTheme?.borderRadius,
        fontFamily: BrandTheme?.fontFamily || themeConfig.fontFamily || "'Figtree', sans-serif",
        ...styleConfig?.Form,
      }}
    >
      <TopBar
        heading={heading}
        iconColor={iconColor}
        onClose={() => { }}
        description={subheading}
        style={{
          headingStyle: {
            color: styleConfig?.Heading?.color || BrandTheme?.primaryColor || themeConfig?.primaryColor,
            ...styleConfig?.Heading,
          },
          descriptionStyle: {
            color:
              styleConfig?.Description?.color || BrandTheme?.secondaryColor || themeConfig?.secondaryColor,
            ...styleConfig?.Description,
          },
          topbarStyle: styleConfig?.TopBar,
        }}
      />
      <div className="q-tut-card-cont">
        {/* <div> */}
        {formdata.map((step, index) => (
          <div
            className="q_tutorial_box"
            id={`q_tutorial_box_${index}`}
            key={index}
            onClick={() => handleNextStep(step.id, step.url)}
          >
            <div className="q_tutorial_progress">
              <div
                className="q_tutorial_progress_img_cont"
                style={{
                  background: step.status ? "#01ff0111" : "#FBFBFB",
                }}
              >
                <img
                  className="q_tutorial_progress_icon"
                  style={{
                    width: "16px",
                    height: "16px",
                  }}
                  src={step.status ? greenCheck : pendingIcon}
                  alt=""
                />
              </div>

              {index < formdata.length - 1 && (
                <div
                  id={`q_tutorial_progress_connector_${index}`}
                  style={{ background: step.status ? "#73DCA7" : "#EFEFEF" }}
                  className="q_tutorial_progress_connector"
                ></div>
              )}
            </div>
            <div
              id={`q_tutorial_box_content_${index}`}
              className="q_tutorial_box_content"
              ref={(ref) => ref && handleStepLoad(index, ref.offsetHeight)}
            >
              <div
                className="q_tut_step"
                style={{
                  color:
                    styleConfig?.Description?.color ||
                    BrandTheme?.secondaryColor ||
                    themeConfig?.secondaryColor,
                }}
              >
                STEP {index + 1}
              </div>
              <div
                className="q_tut_box_head"
                style={{
                  color:
                    styleConfig?.Heading?.color ||
                    BrandTheme?.primaryColor ||
                    themeConfig?.primaryColor,
                }}
              >
                {step.title}
              </div>
              <div
                className="q_tut_box_desc"
                style={{
                  color:
                    styleConfig?.Description?.color ||
                    BrandTheme?.secondaryColor ||
                    themeConfig?.secondaryColor,
                }}
              >
                {step.subheading}
              </div>
            </div>
          </div>
        ))}
        {/* </div> */}
      </div>
      {showFooter && <QuestLabs style={{ background: styleConfig?.Footer?.backgroundColor || styleConfig?.Form?.backgroundColor || BrandTheme?.background || styleConfig?.Form?.background || themeConfig?.backgroundColor, ...styleConfig?.Footer }} />
      }
    </div>
  );
};

export default TutorialScreen;
