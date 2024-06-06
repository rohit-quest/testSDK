import { CSSProperties, useEffect, useRef, useState } from "react";
import config from "../../config";
import axios from "axios";
import { useContext } from "react";
import QuestContext from "../QuestWrapper";
import "./onboarding.css";
import Cookies from "universal-cookie";
import { leftArrow, rightArrow } from "../../assets/assetsSVG.tsx";
import { Input, logoType } from "../Modules/Input.tsx";
import { MultiChoice, MultiChoiceTwo } from "../Modules/MultiChoice.tsx";
import Label from "../Modules/Label.tsx";
import SingleChoice from "../Modules/SingleChoice.tsx";
import TextArea from "../Modules/TextArea.tsx";
import { SecondaryButton } from "../Modules/SecondaryButton.tsx";
import { PrimaryButton } from "../Modules/PrimaryButton.tsx";
import QuestLabs from "../QuestLabs.tsx";
import General from "../../general.ts";

type HeadingScreen = {
  name: string;
  desc: string;
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
};

interface QuestLoginProps {
  userId: string;
  token: string;
  questId: string;
  uniqueUserId?: string;
  uniqueEmailId?: string;
  design?: Array<Array<number>> | undefined;
  headingScreen?: HeadingScreen | HeadingScreen[] | any;
  singleChoose?: "modal1" | "modal2" | "modal3";
  multiChoice?: "modal1" | "modal2";
  getAnswers: Function | undefined;
  answer: any;
  setAnswer: React.Dispatch<React.SetStateAction<any>>;
  customComponents?: React.JSX.Element;
  customComponentPositions?: number;
  progress?: string[];
  loadingTracker?: boolean;
  setLoading?: Function;
  nextBtnText?: string;
  progressBarMultiLine?: boolean;
  controlBtnType?: "Arrow" | "Buttons";
  template?: "multi-question" | "single-question" | 'single-page';
  showFooter?: false | true;
  styleConfig?: {
    Form?: CSSProperties;
    Topbar?: CSSProperties;
    Heading?: CSSProperties;
    Description?: CSSProperties;
    Input?: CSSProperties;
    EmailError?: {
      text?: string;
      errorStyle?: CSSProperties;
    };
    Label?: CSSProperties;
    TextArea?: CSSProperties;
    PrimaryButton?: CSSProperties;
    SecondaryButton?: CSSProperties;
    SingleChoice?: {
      style?: CSSProperties;
      selectedStyle?: CSSProperties;
      hoverBackground?: string
    };
    MultiChoice?: {
      style?: CSSProperties;
      selectedStyle?: CSSProperties;
      isLabel?: boolean;
    };
    ProgressBar?: {
      completeTabColor?: string;
      currentTabColor?: string;
      pendingTabColor?: string;
    };

    Footer?: {
      FooterStyle?: CSSProperties;
      FooterText?: CSSProperties;
      FooterIcon?: CSSProperties;
    };
  };
  variation?: string;
}

interface FormData {
  type: string;
  question: string;
  options: Array<string>;
  actionId: string;
  required: boolean;
  placeholder: string;
  linkTitle: string;
  linkUrl: string;
  manualInput: string | boolean;
}

interface QuestThemeData {
  accentColor: string;
  theme: string;
  borderRadius: string;
  buttonColor: string;
  images: string[];
}


function OnBoarding(props: QuestLoginProps) {
  const {
    headingScreen,
    singleChoose,
    multiChoice = "modal1",
    progress,
    getAnswers,
    answer,
    setAnswer,
    customComponents,
    customComponentPositions,
    userId,
    token,
    questId: campaignId,
    loadingTracker,
    setLoading = () => { },
    nextBtnText,
    progressBarMultiLine,
    controlBtnType,
    uniqueUserId,
    uniqueEmailId,
    template,
    design = [],
    styleConfig,
    showFooter = true,
    variation,
  } = props;

  const [formdata, setFormdata] = useState<FormData[] | []>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [btnFlag, setButtonFlag] = useState<boolean>(false);
  const [steps, setSteps] = useState<number[]>([]);
  const { apiKey, apiSecret, entityId, featureFlags, apiType, themeConfig } =
    useContext(QuestContext.Context);
  const cookies = new Cookies();
  const progressRef = useRef<HTMLDivElement>(null);
  const [designState, setDesign] = useState(design || []);
  const [questThemeData, setQuestThemeData] = useState<QuestThemeData>({
    accentColor: "",
    theme: "",
    borderRadius: "",
    buttonColor: "",
    images: [],
  });
  const [campaignVariationId, setCampaignVariationId] = useState("");

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


  const templateDesign = () => {
    switch (template) {
      case "multi-question": {
        if (design.length > 0) {
          setDesign([...design]);
        }
        break;
      }
      case "single-question": {
        let arr = [];
        for (let i = 1; i <= formdata.length; i++) {
          let newArr = [i];
          arr.push(newArr);
        }
        setDesign(arr);
        break;
      }
      case 'single-page': {
        let arr = [];
        for (let i = 1; i <= formdata.length; i++) {
          arr.push(i);
        }
        console.log(arr)
        setDesign([arr]);
        break;
      }
      default: {
        let arr = [];
        for (let i = 1; i <= formdata.length; i++) {
          arr.push(i);
        }
        setDesign([arr]);
        break;
      }
    }

  };


  const metricApi = (headers: any, body?: {[key: string]: any}) => {
    const api = async (page: string) => {
      const url = `${BACKEND_URL}api/entities/${entityId}/metrics/${page}/campaign`
      const response = await axios.post(url, {campaignId, campaignVariationId, ...body}, {headers})
      if(response.status && response.data.success) return response
      throw response.statusText
    }
  
    return {
      async view(){
        return api(`onboarding-view`)
      },
      async page(pageNumber: number){
        return api(`onboarding-complete-page-${pageNumber}`)
      },
      async complete(){
        return api(`onboarding-complete`)
      }
    }
  }

  // const getTheme = async (theme: string) => {
  //   try {
  //     const request = `${BACKEND_URL}api/entities/${entityId}?userId=${userId}`;
  //     const response = await axios.get(request, {
  //       headers: { apiKey, userId, token },
  //     });
  //     setBrandTheme(response.data.data.theme.BrandTheme[theme]);
  //   } catch (error) {
  //     GeneralFunctions.captureSentryException(error);
  //   }
  // };

  useEffect(() => {
    GeneralFunctions.fireTrackingEvent("quest_onboarding_loaded", "onboarding");

    const initialize = async () => {
      let externalUserId = cookies.get("externalUserId");
      let questUserId = cookies.get("questUserId");
      let questUserToken = cookies.get("questUserToken");
      // let personalUserId = JSON.parse(localStorage.getItem("persana-user") || "{}");

      const body = {
        externalUserId: !!uniqueUserId && uniqueUserId,
        entityId: entityId,
        email: uniqueEmailId,
      };

      let headers = {
        apiKey: apiKey,
        apisecret: apiSecret,
        userId, 
        token
      }

      if (
        !!externalUserId &&
        !!questUserId &&
        !!questUserToken &&
        externalUserId == uniqueUserId
      ) {
        headers.userId = questUserId
        headers.token = questUserToken
      }else if(uniqueUserId){
        const res = await axios.post(`${BACKEND_URL}api/users/external/login`, body, { headers })
        
        let { userId, token } = res.data;

        const date = new Date();
        date.setHours(date.getHours() + 12);
        cookies.set("externalUserId", uniqueUserId, {
          path: "/",
          expires: date,
        });
        cookies.set("questUserId", userId, { path: "/", expires: date });
        cookies.set("questUserToken", token, { path: "/", expires: date });
          
        headers.userId = userId
        headers.token = token
      }

      const response = await getQuestData(userId, headers)
      metricApi(headers, {campaignVariationId: response.data.campaignVariationId}).view()

      // API updated to v2
      async function getQuestData(userId: string, headers: object): Promise<any> {
        loadingTracker && setLoading(true);
        const params = new URLSearchParams();
        params.set('platform', 'REACT')
        if (variation) params.set('variation', variation)

        const request = `${BACKEND_URL}api/v2/entities/${entityId}/campaigns/${campaignId}?${params.toString()}`;
        return await axios
          .get(request, { headers: headers })
          .then((res) => {
            let response = res.data;

            if (response.data.sdkConfig?.uiProps?.questThemeData) {
              setQuestThemeData(response?.data?.sdkConfig?.uiProps?.questThemeData);
              if (response.data.sdkConfig?.uiProps?.questThemeData.theme) {
                // getTheme(response.data.uiProps.questThemeData.theme) disabled for now
              }
            }

            setCampaignVariationId(response?.data?.campaignVariationId)
            let actions = response?.data?.actions?.map(
              (action: any) => {
                return {
                  type: action?.actionType,
                  question: action?.title,
                  options: action?.options || [],
                  actionId: action?.actionId,
                  campaignVariationId: action?.campaignVariationId,
                  required: action?.isRequired,
                  placeholder: action?.metadata?.placeholder,
                  linkTitle: action?.title || "",
                  linkUrl: action?.metadata?.link || "",
                  manualInput: Boolean(action?.metadata?.manualInput),
                };
              }
            );

            setFormdata([...actions]);
            let ansArray: any = {};
            actions.forEach((action: any) => {
              if (action.type == "USER_INPUT_MULTI_CHOICE") {
                if (!answer[action.actionId]) {
                  ansArray[action.actionId] = [];
                }
                return;
              } else {
                if (!answer[action.actionId]) {
                  ansArray[action.actionId] = "";
                }
                return;
              }
            });
            setAnswer({ ...answer, ...ansArray });

            return response
          })
          .catch((error) => {
            GeneralFunctions.captureSentryException(error);
          });
        loadingTracker && setLoading(false);
      }
    }

    if (entityId) initialize()
  }, []);

  useEffect(() => {
    templateDesign();
  }, [template, formdata]);

  useEffect(() => {

    if (!formdata.length) return;

    let currentQuestions: any;
    if (template === "multi-question") {
      currentQuestions = formdata.map((e, i) => {
        return i + 1;
      });
      let temp = formdata.map((e, i) => {
        if (designState[currentPage].includes(i + 1)) return i + 1;
      });
      let temp2 = temp.filter((e, i) => {
        if (designState[currentPage].includes(i + 1)) return true;
      });
      currentQuestions = temp2;
    } else if (template === "single-question") {
      currentQuestions = [currentPage + 1];
    } else {
      let current = formdata.map((e, i) => {
        return i + 1;
      });
      currentQuestions = [...current];
    }

    let c = 0;
    for (let i = 0; i < currentQuestions.length; i++) {
      if (
        formdata[currentQuestions[i] - 1].required == false ||
        formdata[currentQuestions[i] - 1].type == "LINK_OPEN_READ"
      ) {
        c++;
      } else {
        if (
          !!answer[formdata[currentQuestions[i] - 1].actionId] &&
          answer[formdata[currentQuestions[i] - 1].actionId].length > 0
        ) {
          c++;
        }
      }
    }

    if (currentQuestions.length > 0 && c == currentQuestions.length) {
      // let questUserId = cookies.get("questUserId");
      // let questUserToken = cookies.get("questUserToken");

      // let headers = {
      //   apikey: apiKey,
      //   apisecret: apiSecret,
      //   userId: questUserId ? questUserId : userId,
      //   token: questUserToken ? questUserToken : token,
      // };
      // if (!!designState && Number(currentPage) + 1 != designState?.length) {
      //   try {
      //     metricApi(headers).page(+currentPage + 1)
      //   } catch (error) {
      //     GeneralFunctions.captureSentryException(error);
      //   }
      // }

      setButtonFlag(true);
    } else {
      setButtonFlag(false);
    }
  }, [answer, formdata, currentPage]);

  useEffect(() => {
    let questUserId = cookies.get("questUserId");
    let questUserToken = cookies.get("questUserToken");

    let headers = {
      apikey: apiKey,
      apisecret: apiSecret,
      userId: questUserId ? questUserId : userId,
      token: questUserToken ? questUserToken : token,
    };

    if(currentPage > 0 && currentPage < designState?.length){
      metricApi(headers).page(currentPage)
    }
  }, [currentPage])

  useEffect(() => {
    if (btnFlag == true) {
      setSteps([...steps, currentPage]);
    } else {
      if (steps.includes(currentPage)) {
        const updatedSteps = steps.filter((step) => step !== currentPage);
        setSteps(updatedSteps);
      }
    }
  }, [btnFlag, currentPage]);

  const handleUpdate = (e: any, id: string, j: string) => {
    if (e.target.checked == true && j == "check") {
      let ans = answer[id] || [];
      ans.push(e.target.value);
      setAnswer({
        ...answer,
        [id]: ans,
      });
    } else if (
      e.target.checked == false &&
      typeof answer[id] == "object" &&
      j == "check"
    ) {
      let ans = answer[id];
      let mod_ans = ans.filter((an: string | number) => an != e.target.value);
      setAnswer({
        ...answer,
        [id]: mod_ans,
      });
    } else {
      setAnswer({
        ...answer,
        [id]: e.target.value,
      });
    }
  };


  const [wd, setWd] = useState(0);

  const ProgressBar = () => {
    useEffect(() => {
      if (!!progressRef.current && progressRef.current.clientWidth != wd) {
        setWd(progressRef?.current?.clientWidth);
      }
    }, []);
    return (
      <div className="q-onb-progress">
        <div
          style={{
            gridTemplateColumns: progress
              ? `repeat(${progress.length}, 1fr)`
              : "",
          }}
          ref={progressRef}
        >
          {!!progress &&
            !!design &&
            progress.length == design?.length &&
            progress.map((prog: string, i: number) => (
              <div key={i}>
                {steps.includes(i) == true ? (
                  <div
                    className="q-onb-progress-comp"
                    style={{
                      borderColor:
                        styleConfig?.ProgressBar?.completeTabColor || "#098849",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: `${(wd - (progress.length - 1) * 15) / progress.length -
                          32
                          }px`,
                        whiteSpace: progressBarMultiLine ? "normal" : "nowrap",
                        overflow: progressBarMultiLine ? "" : "hidden",
                        textOverflow: progressBarMultiLine ? "" : "ellipsis",
                        color:
                          styleConfig?.ProgressBar?.completeTabColor ||
                          "#098849",
                      }}
                    >
                      {prog}
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 21 20"
                      fill="none"
                    >
                      <path
                        opacity="0.3"
                        d="M10.8333 18.3333C15.4357 18.3333 19.1667 14.6023 19.1667 9.99996C19.1667 5.39759 15.4357 1.66663 10.8333 1.66663C6.23095 1.66663 2.49999 5.39759 2.49999 9.99996C2.49999 14.6023 6.23095 18.3333 10.8333 18.3333Z"
                        fill={"#098849"}
                      />
                      <path
                        d="M14.8074 6.51474C15.1215 6.17828 15.6488 6.1601 15.9853 6.47412C16.3217 6.78815 16.3399 7.31548 16.0259 7.65193L10.1925 13.9019C9.88787 14.2284 9.38003 14.2566 9.041 13.9661L6.12434 11.4661C5.7749 11.1665 5.73443 10.6404 6.03395 10.291C6.33347 9.94157 6.85955 9.9011 7.20899 10.2006L9.51916 12.1808L14.8074 6.51474Z"
                        fill={
                          styleConfig?.ProgressBar?.completeTabColor ||
                          "#098849"
                        }
                      />
                    </svg>
                  </div>
                ) : i == currentPage ? (
                  <div
                    className="q-onb-progress-comp"
                    style={{
                      borderColor:
                        styleConfig?.ProgressBar?.currentTabColor || "#2C2C2C",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: `${(wd - (progress.length - 1) * 15) / progress.length -
                          32
                          }px`,
                        whiteSpace: progressBarMultiLine ? "normal" : "nowrap",
                        overflow: progressBarMultiLine ? "" : "hidden",
                        textOverflow: progressBarMultiLine ? "" : "ellipsis",
                        color:
                          styleConfig?.ProgressBar?.currentTabColor ||
                          "#2C2C2C",
                      }}
                    >
                      {prog}
                    </div>
                  </div>
                ) : (
                  <div
                    className="q-onb-progress-comp"
                    style={{
                      borderColor:
                        styleConfig?.ProgressBar?.pendingTabColor || "#ECECEC",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: `${(wd - (progress.length - 1) * 15) / progress.length -
                          32
                          }px`,
                        whiteSpace: progressBarMultiLine ? "normal" : "nowrap",
                        overflow: progressBarMultiLine ? "" : "hidden",
                        textOverflow: progressBarMultiLine ? "" : "ellipsis",
                        color:
                          styleConfig?.ProgressBar?.pendingTabColor ||
                          "#AFAFAF",
                      }}
                    >
                      {prog}
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    );
  };

  const normalInput = (
    question: string,
    required: boolean,
    actionId: string,
    index: number,
    placeholder: string,
    inputType: logoType
  ) => {
    return (
      <div key={actionId}>
        {customComponentPositions == index + 1 && (
          <div style={{ paddingBottom: "12px" }}>{customComponents}</div>
        )}
        <Label
          htmlFor="normalInput"
          style={{
            color:
              styleConfig?.Label?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.Label,
          }}
        >
          {`${question} ${!!required ? "*" : ""}`}
        </Label>
        <Input
          type={inputType}
          placeholder={placeholder}
          value={answer[actionId]}
          iconColor={
            styleConfig?.Input?.color ||
            BrandTheme?.primaryColor ||
            themeConfig?.primaryColor ||
            "#B9B9B9"
          }
          onChange={(e) => handleUpdate(e, actionId, "")}
          style={{
            borderColor:
              styleConfig?.Input?.borderColor || themeConfig?.borderColor,
            color:
              styleConfig?.Input?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.Input,
          }}
          emailtext={
            styleConfig?.EmailError?.text == undefined
              ? "Invalid email format"
              : styleConfig?.EmailError?.text
          }
          emailErrorStyle={styleConfig?.EmailError?.errorStyle}
        />
      </div>
    );
  };

  const dateInput = (
    question: string,
    required: boolean,
    actionId: string,
    index: number,
    placeholder: string
  ) => {
    return (
      <div key={actionId}>
        {customComponentPositions == index + 1 && (
          <div style={{ paddingBottom: "12px" }}>{customComponents}</div>
        )}
        <Label
          htmlFor="dateInput"
          style={{
            color:
              styleConfig?.Label?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.Label,
          }}
        >
          {`${question} ${!!required ? "*" : ""}`}
        </Label>
        <Input
          type={"date"}
          placeholder={placeholder}
          value={answer[actionId]}
          onChange={(e) => handleUpdate(e, actionId, "")}
          style={{
            borderColor:
              styleConfig?.Input?.borderColor || themeConfig?.borderColor,
            color:
              styleConfig?.Input?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.Input,
          }}
        />
      </div>
    );
  };

  const textAreaInput = (
    question: string,
    required: boolean,
    actionId: string,
    index: number,
    placeholder: string
  ) => {
    return (
      <div key={actionId}>
        {customComponentPositions == index + 1 && (
          <div style={{ paddingBottom: "12px" }}>{customComponents}</div>
        )}
        <Label
          htmlFor="textAreaInput"
          style={{
            color:
              styleConfig?.Label?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.Label,
          }}
        >
          {`${question} ${!!required ? "*" : ""}`}
        </Label>
        <TextArea
          onChange={(e) => handleUpdate(e, actionId, "")}
          placeholder={placeholder}
          value={answer[actionId]}
          style={{
            borderColor:
              styleConfig?.TextArea?.borderColor || themeConfig?.borderColor,
            color:
              styleConfig?.TextArea?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.TextArea,
          }}
        />
      </div>
    );
  };

  const singleChoiceTwo = (
    options: string[] | [],
    question: string,
    required: boolean,
    actionId: string,
    index: number,
    manualInput: string | boolean,
    singleChoose: "modal1" | "modal2" | "modal3"
  ) => {
    return (
      <div key={actionId}>
        {customComponentPositions == index + 1 && (
          <div style={{ paddingBottom: "12px" }}>{customComponents}</div>
        )}
        <Label
          htmlFor="textAreaInput"
          style={{
            color:
              styleConfig?.Label?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.Label,
          }}
        >
          {`${question} ${!!required ? "*" : ""}`}
        </Label>
        <SingleChoice
          options={options}
          type={singleChoose}
          onChange={(e) =>
            singleChoose == "modal3"
              ? handleUpdate({ target: e }, actionId, "")
              : handleUpdate(e, actionId, "radio")
          }
          checked={answer[actionId]}
          style={{
            borderColor:
              styleConfig?.SingleChoice?.style?.borderColor ||
              themeConfig?.borderColor,
            color:
              styleConfig?.SingleChoice?.style?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.secondaryColor,
            ...styleConfig?.SingleChoice?.style,
          }}
          hoverBackground={styleConfig?.SingleChoice?.hoverBackground}
          selectedStyle={{
            accentColor:
              styleConfig?.SingleChoice?.selectedStyle?.accentColor ||
              questThemeData?.accentColor ||
              BrandTheme?.accentColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.SingleChoice?.selectedStyle,
          }}
        />
        {manualInput != false && answer[actionId] == manualInput && (
          <Input
            type="text"
            onChange={(e) => handleUpdate(e, actionId + "/manual", "")}
            value={answer[actionId + "/manual"]}
            placeholder="Please fill manually"
            style={{
              borderColor:
                styleConfig?.Input?.borderColor || themeConfig?.borderColor,
              color:
                styleConfig?.Input?.color ||
                BrandTheme?.primaryColor ||
                themeConfig?.primaryColor,
              ...styleConfig?.Input,
            }}
          />
        )}
      </div>
    );
  };

  const multiChoiceOne = (
    options: string[] | [],
    question: string,
    required: boolean,
    actionId: string,
    index: number
  ) => {
    return (
      <div key={actionId}>
        {customComponentPositions == index + 1 && (
          <div style={{ paddingBottom: "12px" }}>{customComponents}</div>
        )}
        {(styleConfig?.MultiChoice?.isLabel !== false) &&
          <Label
            htmlFor="textAreaInput"
            style={{
              color: styleConfig?.Label?.color || themeConfig?.primaryColor,
              ...styleConfig?.Label,
            }}
          >
            {`${question} ${!!required ? "*" : ""}`}
          </Label>
        }
        <MultiChoice
          options={options}
          checked={answer[actionId]}
          onChange={(e) => handleUpdate(e, actionId, "check")}
          style={{
            borderColor:
              styleConfig?.MultiChoice?.style?.borderColor ||
              themeConfig?.borderColor,
            color:
              styleConfig?.MultiChoice?.style?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.secondaryColor,
            ...styleConfig?.MultiChoice?.style,
          }}
          selectedStyle={{
            borderColor:
              styleConfig?.MultiChoice?.selectedStyle?.borderColor,
            color:
              styleConfig?.MultiChoice?.selectedStyle?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
            accentColor:
              styleConfig?.MultiChoice?.selectedStyle?.accentColor ||
              questThemeData?.accentColor,
            ...styleConfig?.SingleChoice?.selectedStyle,
          }}
        />
      </div>
    );
  };

  const multiChoiceTwo = (
    options: string[] | [],
    question: string,
    required: boolean,
    actionId: string,
    index: number
  ) => {
    return (
      <div key={actionId}>
        {customComponentPositions == index + 1 && (
          <div style={{ paddingBottom: "12px" }}>{customComponents}</div>
        )}
        {(styleConfig?.MultiChoice?.isLabel !== false) &&
          <Label
            htmlFor="textAreaInput"
            style={{
              color:
                styleConfig?.Label?.color ||
                BrandTheme?.primaryColor ||
                themeConfig?.primaryColor,
              ...styleConfig?.Label,
            }}
          >
            {`${question} ${!!required ? "*" : ""}`}
          </Label>
        }
        <MultiChoiceTwo
          options={options}
          checked={!!answer[actionId] && answer[actionId]}
          onChange={(e) => handleUpdate(e, actionId, "check")}
          style={{
            borderColor:
              styleConfig?.MultiChoice?.style?.borderColor ||
              themeConfig?.borderColor,
            ...styleConfig?.MultiChoice?.style,
            color:
              styleConfig?.MultiChoice?.style?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.MultiChoice?.style,
          }}
          selectedStyle={{
            color:
              styleConfig?.MultiChoice?.selectedStyle?.color ||
              questThemeData?.accentColor ||
              BrandTheme?.accentColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.MultiChoice?.selectedStyle,
          }}
        />
      </div>
    );
  };

  function checkDesignCriteria() {
    if (!designState?.length) return;

    let fl = false;
    let arr: number[] = [];

    for (let i = 0; i < designState?.length; i++) {
      if (typeof designState[i] != "object" && designState[i][0] == null) {
        return false;
      }
      for (let j = 0; j < designState[i].length; j++) {
        if (!arr.includes(designState[i][j])) {
          arr.push(designState[i][j]);
        }
      }
    }
    if (
      arr.length == formdata.length &&
      Math.max(...arr) == formdata.length &&
      Math.min(...arr) == 1
    ) {
      fl = true;
    }

    return fl;
  }

  function returnAnswers() {
    GeneralFunctions.fireTrackingEvent(
      "quest_onboarding_submit_btn_clicked",
      "onboarding"
    );

    if (currentPage < designState.length - 1) {
      setCurrentPage((prev) => prev + 1);
    } else {
      let crt: any = { ...answer };
      for (let i of Object.keys(crt)) {
        if (i.includes("/manual") && crt[i] != "") {
          let id: string = i.split("/manual")[0];
          let criteriaDetails: FormData[] = formdata.filter(
            (item) => item.actionId == id
          );
          if (criteriaDetails[0].manualInput == crt[id]) {
            crt[id] = crt[i];
          }
        }
      }

      let actions = Object.keys(crt)
        .filter((key: string) => !key.includes("/manual"))
        .map((key: string) => ({
          actionId: key,
          answers: typeof crt[key] === "object" ? crt[key] : [crt[key]]
        }));

      let questUserId = cookies.get("questUserId");
      let questUserToken = cookies.get("questUserToken");
      let externalUserId = cookies.get("externalUserId");

      let headers = {
        apikey: apiKey,
        apisecret: apiSecret,
        userId:
          !!externalUserId &&
            !!questUserId &&
            !!questUserToken &&
            externalUserId == uniqueUserId
            ? questUserId
            : userId,
        token:
          !!externalUserId &&
            !!questUserId &&
            !!questUserToken &&
            externalUserId == uniqueUserId
            ? questUserToken
            : token,
      };

      getAnswers && getAnswers(crt);


      try {
        axios.post(
          `${BACKEND_URL}api/v2/entities/${entityId}/campaigns/${campaignId}/verify`,
          { actions, campaignVariationId },
          { headers }
        );
      } catch (error) {
        GeneralFunctions.captureSentryException(error);
      }

      try {
        metricApi(headers).complete()
      } catch (error) {
        GeneralFunctions.captureSentryException(error);
      }
    }
  }


  if (
    featureFlags[config.FLAG_CONSTRAINTS.OnboardingFlag]?.isEnabled == false
  ) {
    return <div></div>;
  }

  return (
    formdata.length > 0 && (
      <div
        className="q-onb-home"
        style={{
          background:
            styleConfig?.Form?.backgroundColor ||
            BrandTheme?.background ||
            themeConfig?.backgroundColor ||
            "#fff",
          height: styleConfig?.Form?.height || "auto",
          borderRadius:
            styleConfig?.Form?.borderRadius ||
            questThemeData?.borderRadius ||
            BrandTheme?.borderRadius,
          fontFamily:
            BrandTheme?.fontFamily ||
            themeConfig.fontFamily ||
            "'Figtree', sans-serif",
          ...styleConfig?.Form,
        }}
      >
        <div className="q-onb-ch">
          {formdata.length > 0 &&
            !!headingScreen &&
            (typeof headingScreen == "object" && !!headingScreen.name ? (
              <div className="q-onb-main-heading" style={styleConfig?.Topbar}>
                <div
                  className="q-onb-main-h3"
                  style={{
                    color:
                      styleConfig?.Heading?.color ||
                      BrandTheme?.titleColor ||
                      BrandTheme?.primaryColor ||
                      themeConfig?.primaryColor,
                    ...styleConfig?.Heading,
                  }}
                >
                  {headingScreen?.name}
                </div>
                <div
                  className="q-onb-main-h4"
                  style={{
                    color:
                      styleConfig?.Description?.color ||
                      BrandTheme?.secondaryColor ||
                      themeConfig?.secondaryColor,
                    ...styleConfig?.Description,
                  }}
                >
                  {headingScreen?.desc}
                </div>
              </div>
            ) : !!headingScreen[currentPage] ? (
              <div className="q-onb-main-heading" style={styleConfig?.Topbar}>
                <div
                  className="q-onb-main-h3"
                  style={{
                    color:
                      styleConfig?.Heading?.color ||
                      BrandTheme?.titleColor ||
                      BrandTheme?.primaryColor ||
                      themeConfig?.primaryColor,
                    ...styleConfig?.Heading,
                  }}
                >
                  {headingScreen[currentPage]?.name}
                </div>
                <div
                  className="q-onb-main-h4"
                  style={{
                    color:
                      styleConfig?.Description?.color ||
                      BrandTheme?.secondaryColor ||
                      themeConfig?.secondaryColor,
                    ...styleConfig?.Description,
                  }}
                >
                  {headingScreen[currentPage]?.desc}
                </div>
              </div>
            ) : (
              <div className="q-onb-main-heading" style={styleConfig?.Topbar}>
                <div
                  className="q-onb-main-h3"
                  style={{
                    color:
                      styleConfig?.Heading?.color ||
                      BrandTheme?.primaryColor ||
                      themeConfig?.primaryColor,
                    ...styleConfig?.Heading,
                  }}
                >
                  {headingScreen[0]?.name}
                </div>
                <div
                  className="q-onb-main-h4"
                  style={{
                    color:
                      styleConfig?.Description?.color ||
                      BrandTheme?.secondaryColor ||
                      themeConfig?.secondaryColor,
                    ...styleConfig?.Description,
                  }}
                >
                  {headingScreen[0]?.desc}
                </div>
              </div>
            ))}

          <div className="q-onb-main-first">
            {template === "multi-question" &&
              formdata.length > 0 &&
              designState.length > 1 &&
              !!progress?.length && <ProgressBar />}

            {!!designState && designState.length > 0
              ? designState[currentPage].map((num: number) =>
                formdata[num - 1]?.type == "USER_INPUT_TEXT"
                  ? normalInput(
                    formdata[num - 1]?.question || "",
                    formdata[num - 1]?.required || false,
                    formdata[num - 1].actionId || "",
                    num - 1,
                    formdata[num - 1]?.placeholder ||
                    formdata[num - 1]?.question ||
                    "",
                    "text"
                  )
                  : formdata[num - 1]?.type == "USER_INPUT_EMAIL"
                    ? normalInput(
                      formdata[num - 1]?.question || "",
                      formdata[num - 1]?.required || false,
                      formdata[num - 1].actionId || "",
                      num - 1,
                      formdata[num - 1]?.placeholder ||
                      formdata[num - 1]?.question ||
                      "",
                      "email"
                    )
                    : formdata[num - 1]?.type == "USER_INPUT_PHONE"
                      ? normalInput(
                        formdata[num - 1]?.question || "",
                        formdata[num - 1]?.required || false,
                        formdata[num - 1].actionId || "",
                        num - 1,
                        formdata[num - 1]?.placeholder ||
                        formdata[num - 1]?.question ||
                        "",
                        "number"
                      )
                      : formdata[num - 1]?.type == "USER_INPUT_TEXTAREA"
                        ? textAreaInput(
                          formdata[num - 1]?.question || "",
                          formdata[num - 1]?.required || false,
                          formdata[num - 1].actionId || "",
                          num - 1,
                          formdata[num - 1]?.placeholder ||
                          formdata[num - 1]?.question ||
                          ""
                        )
                        : formdata[num - 1]?.type == "USER_INPUT_DATE"
                          ? dateInput(
                            formdata[num - 1]?.question || "",
                            formdata[num - 1]?.required || false,
                            formdata[num - 1].actionId || "",
                            num - 1,
                            formdata[num - 1]?.placeholder ||
                            formdata[num - 1]?.question ||
                            ""
                          )
                          : formdata[num - 1]?.type == "USER_INPUT_SINGLE_CHOICE"
                            ? !!singleChoose &&
                            singleChoiceTwo(
                              formdata[num - 1].options || [],
                              formdata[num - 1]?.question || "",
                              formdata[num - 1]?.required || false,
                              formdata[num - 1].actionId || "",
                              num - 1,
                              formdata[num - 1]?.manualInput,
                              singleChoose
                            )
                            : formdata[num - 1]?.type == "USER_INPUT_MULTI_CHOICE"
                              ? !!multiChoice && multiChoice == "modal2"
                                ? multiChoiceTwo(
                                  formdata[num - 1].options || [],
                                  formdata[num - 1]?.question || "",
                                  formdata[num - 1]?.required || false,
                                  formdata[num - 1].actionId || "",
                                  num - 1
                                )
                                : multiChoiceOne(
                                  formdata[num - 1].options || [],
                                  formdata[num - 1]?.question || "",
                                  formdata[num - 1]?.required || false,
                                  formdata[num - 1].actionId || "",
                                  num - 1
                                )
                              : null
              )
              : formdata?.map((data, index) =>
                data.type == "USER_INPUT_TEXT"
                  ? normalInput(
                    data?.question || "",
                    data?.required || false,
                    data.actionId || "",
                    index,
                    data?.placeholder || data?.question || "",
                    "text"
                  )
                  : data.type == "USER_INPUT_EMAIL"
                    ? normalInput(
                      data?.question || "",
                      data?.required || false,
                      data.actionId || "",
                      index,
                      data?.placeholder || data?.question || "",
                      "email"
                    )
                    : data.type == "USER_INPUT_PHONE"
                      ? normalInput(
                        data?.question || "",
                        data?.required || false,
                        data.actionId || "",
                        index,
                        data?.placeholder || data?.question || "",
                        "number"
                      )
                      : data.type == "USER_INPUT_TEXTAREA"
                        ? textAreaInput(
                          data?.question || "",
                          data?.required || false,
                          data.actionId || "",
                          index,
                          data?.placeholder || data?.question || ""
                        )
                        : data.type == "USER_INPUT_DATE"
                          ? dateInput(
                            data?.question || "",
                            data?.required || false,
                            data.actionId || "",
                            index,
                            data?.placeholder || data?.question || ""
                          )
                          : data.type == "USER_INPUT_SINGLE_CHOICE"
                            ? !!singleChoose &&
                            singleChoiceTwo(
                              data.options || [],
                              data?.question || "",
                              data?.required || false,
                              data.actionId || "",
                              index,
                              data?.manualInput,
                              singleChoose
                            )
                            : data.type == "USER_INPUT_MULTI_CHOICE"
                              ? !!multiChoice && multiChoice == "modal2"
                                ? multiChoiceTwo(
                                  data.options || [],
                                  data?.question || "",
                                  data?.required || false,
                                  data.actionId || "",
                                  index
                                )
                                : multiChoiceOne(
                                  data.options || [],
                                  data?.question || "",
                                  data?.required || false,
                                  data.actionId || "",
                                  index
                                )
                              : null
              )}
            {formdata.length > 0 &&
              (!!designState && designState.length > 1 ? (
                controlBtnType == "Buttons" ? (
                  <div className="q-onb-main-criteria">
                    {currentPage > 0 && (
                      <SecondaryButton
                        style={{
                          opacity: currentPage == 0 ? "0" : "1",
                          cursor: currentPage == 0 ? "context-menu" : "pointer",
                          borderColor:
                            styleConfig?.SecondaryButton?.borderColor ||
                            themeConfig?.borderColor,
                          background:
                            styleConfig?.SecondaryButton?.backgroundColor ||
                            themeConfig?.backgroundColor,
                          color:
                            styleConfig?.SecondaryButton?.color ||
                            themeConfig?.primaryColor,
                          ...styleConfig?.SecondaryButton,
                        }}
                        className="q-onb-main-btn"
                        onClick={() => {
                          GeneralFunctions.fireTrackingEvent(
                            "quest_onboarding_secondary_btn_clicked",
                            "onboarding"
                          );
                          currentPage > 0 && setCurrentPage(currentPage - 1);
                        }}
                      >
                        Previous
                      </SecondaryButton>
                    )}

                    <PrimaryButton
                      onClick={() => {
                        GeneralFunctions.fireTrackingEvent(
                          "quest_onboarding_primary_btn_clicked",
                          "onboarding"
                        );
                        currentPage != designState.length - 1
                          ? setCurrentPage(currentPage + 1)
                          : returnAnswers();
                      }}
                      disabled={!btnFlag}
                      className="q-onb-main-btn2"
                      style={{
                        background:
                          styleConfig?.PrimaryButton?.background ||
                          questThemeData?.buttonColor ||
                          BrandTheme?.buttonColor ||
                          themeConfig?.buttonColor,
                        ...styleConfig?.PrimaryButton,
                      }}
                    >
                      {currentPage == designState.length - 1
                        ? nextBtnText
                          ? nextBtnText
                          : "Submit"
                        : "Continue"}
                    </PrimaryButton>
                  </div>
                ) : (
                  <div className="q-onb-main-arrow-div">
                    <SecondaryButton
                      className="q-onb-main-arrow"
                      onClick={() => {
                        GeneralFunctions.fireTrackingEvent(
                          "quest_onboarding_secondary_btn_clicked",
                          "onboarding"
                        );

                        currentPage > 0 && setCurrentPage(currentPage - 1);
                      }}
                      style={{
                        height: styleConfig?.SecondaryButton?.width || "44px",
                        width: styleConfig?.SecondaryButton?.width || "44px",
                        borderRadius:
                          styleConfig?.SecondaryButton?.borderRadius || "50%",
                        padding:
                          styleConfig?.SecondaryButton?.padding || "10px",
                        border:
                          styleConfig?.SecondaryButton?.border ||
                          "1.5px solid #afafaf",
                        opacity: currentPage == 0 ? "0" : "1",
                        cursor: currentPage == 0 ? "context-menu" : "pointer",
                        borderColor:
                          styleConfig?.SecondaryButton?.borderColor ||
                          themeConfig?.borderColor,
                        backgroundColor:
                          styleConfig?.SecondaryButton?.backgroundColor ||
                          themeConfig?.backgroundColor,
                        color:
                          styleConfig?.SecondaryButton?.color ||
                          themeConfig?.primaryColor,
                        ...styleConfig?.SecondaryButton,
                      }}
                    >
                      {leftArrow()}
                    </SecondaryButton>
                    <PrimaryButton
                      className="q-onb-main-arrow2"
                      onClick={() => {
                        GeneralFunctions.fireTrackingEvent(
                          "quest_onboarding_primary_btn_clicked",
                          "onboarding"
                        );

                        currentPage != designState.length - 1
                          ? setCurrentPage(currentPage + 1)
                          : returnAnswers();
                      }}
                      disabled={!btnFlag}
                      style={{
                        height: styleConfig?.PrimaryButton?.height || "44px",
                        width: styleConfig?.PrimaryButton?.width || "44px",
                        borderRadius:
                          styleConfig?.PrimaryButton?.borderRadius || "50%",
                        padding: styleConfig?.PrimaryButton?.padding || "10px",
                        border:
                          styleConfig?.PrimaryButton?.border ||
                          "1.5px solid #D1ACFF",
                        background:
                          styleConfig?.PrimaryButton?.background ||
                          questThemeData?.buttonColor ||
                          BrandTheme?.buttonColor ||
                          themeConfig?.buttonColor,
                        ...styleConfig?.PrimaryButton,
                      }}
                    >
                      {rightArrow()}
                    </PrimaryButton>
                  </div>
                )
              ) : (
                <div>
                  <PrimaryButton
                    className="q-onb-main-btn3"
                    onClick={() => {
                      GeneralFunctions.fireTrackingEvent(
                        "quest_onboarding_single_page_submit_button_clicked",
                        "onboarding"
                      );
                      returnAnswers();
                    }}
                    disabled={!btnFlag}
                    style={{
                      border:
                        styleConfig?.SecondaryButton?.border ||
                        "1.5px solid #afafaf",
                      background:
                        styleConfig?.PrimaryButton?.background ||
                        questThemeData?.buttonColor ||
                        BrandTheme?.buttonColor ||
                        themeConfig?.buttonColor,
                      ...styleConfig?.PrimaryButton,
                    }}
                  >
                    {nextBtnText ? nextBtnText : "Continue"}
                  </PrimaryButton>
                </div>
              ))}
          </div>
          {formdata && showFooter && (
            <QuestLabs
              style={{
                ...{
                  background: styleConfig?.Footer?.FooterStyle?.backgroundColor ||
                    styleConfig?.Form?.backgroundColor ||
                    styleConfig?.Form?.background ||
                    BrandTheme?.background ||
                    themeConfig?.backgroundColor,
                },
                ...styleConfig?.Footer?.FooterStyle,

              }}
              textStyle={styleConfig?.Footer?.FooterText}
              iconStyle={styleConfig?.Footer?.FooterIcon}
            />
          )}
        </div>
      </div>
    )
  );
}

export default OnBoarding;
