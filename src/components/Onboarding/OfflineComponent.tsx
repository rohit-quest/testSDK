import { CSSProperties, useEffect, useRef, useState } from "react";
import config from "../../config";
import { useContext } from "react";
import QuestContext from "../QuestWrapper";
import "./onboarding.css";
import Cookies from "universal-cookie";
import calendly from "../../assets/images/calendly.png";
import discord from "../../assets/images/discord-color.png";
import twitter from "../../assets/images/twitter-color.png";
import slack from "../../assets/images/slack.png";
import link from "../../assets/images/links.png";
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

interface QuestThemeData {
  accentColor: string;
  theme: string;
  borderRadius: string;
  buttonColor: string;
  images: string[];
}

interface QuestLoginProps {
  userId?: string;
  token?: string;
  questId?: string;
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
  BrandTheme?: BrandTheme;
  QuestThemeData?: QuestThemeData;
  showFooter?: boolean;
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
    Footer?:{
      FooterStyle?: CSSProperties;
      FooterText?: CSSProperties;
      FooterIcon?: CSSProperties;
    };
    SingleChoice?: {
      style?: CSSProperties;
      selectedStyle?: CSSProperties;
    };
    MultiChoice?: {
      style?: CSSProperties;
      selectedStyle?: CSSProperties;
    };
    ProgressBar?: {
      completeTabColor?: string;
      currentTabColor?: string;
      pendingTabColor?: string;
    };

  };
  offlineFormData: offlineFormData[] | [];
}

interface offlineFormData {
  type: string;
  question: string;
  options: Array<string>;
  criteriaId: string;
  required: boolean;
  placeholder: string;
  linkTitle: string;
  linkUrl: string;
  manualInput: string | boolean;
}

function OnBoardingOffline(props: QuestLoginProps) {
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
    questId,
    loadingTracker,
    setLoading = () => {},
    nextBtnText,
    progressBarMultiLine,
    controlBtnType,
    uniqueUserId,
    uniqueEmailId,
    BrandTheme,
    QuestThemeData,
    template,
    design = [],
    styleConfig,
    offlineFormData,
    showFooter = true,
  } = props;

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [btnFlag, setButtonFlag] = useState<boolean>(false);
  const [steps, setSteps] = useState<number[]>([]);
  const { apiKey, apiSecret, entityId, featureFlags, apiType, themeConfig } =
    useContext(QuestContext.Context);
  const progressRef = useRef<HTMLDivElement>(null);
  const [designState, setDesign] = useState(design || []);

  let GeneralFunctions = new General("mixpanel", apiType);

  const templateDesign = () => {
    switch (template) {
      case "multi-question": {
        if(design.length > 0){
          setDesign([...design]);
        }
        break;
      }
      case "single-question": {
        let arr = [];
        for (let i = 1; i <= offlineFormData.length; i++) {
          let newArr = [i];
          arr.push(newArr);
        }
        setDesign(arr);
        break;
      }
      case 'single-page': {
       let arr = [];
        for (let i = 1; i <= offlineFormData.length; i++) {
          arr.push(i);
        }
        console.log(arr)
        setDesign([arr]);
        break;
      }
      default: {
        let arr = [];
        for (let i = 1; i <= offlineFormData.length; i++) {
          arr.push(i);
        }
        setDesign([arr]);
        break;
      }
    }
   
  };

  useEffect(() => {
    GeneralFunctions.fireTrackingEvent(
      "quest_onboarding_offline_loaded",
      "onboarding_offline"
    );

    if (entityId) {
      // let externalUserId = cookies.get("externalUserId");
      // let questUserId = cookies.get("questUserId");
      // let questUserToken = cookies.get("questUserToken");
      // // let personalUserId = JSON.parse(localStorage.getItem("persana-user") || "{}");

      // const headers = {
      //     apiKey: apiKey,
      //     apisecret: apiSecret,
      //     userId: userId,
      //     token: token, // Replace with your actual token
      // };

      // const body = {
      //     externalUserId: !!uniqueUserId && uniqueUserId,
      //     entityId: entityId,
      //     email: uniqueEmailId
      // }

      getQuestData(userId || "", {});

      // if (!!externalUserId && !!questUserId && !!questUserToken && externalUserId == uniqueUserId) {
      //     let header = {...headers, ...{questUserId, questUserToken}}
      //     axios.post(`${BACKEND_URL}api/entities/${entityId}/users/${questUserId}/metrics/onboarding-view?userId=${questUserId}&questId=${questId}`, {count: 1}, {headers: header})
      // } else if (!!uniqueUserId) {
      //     axios.post(`${BACKEND_URL}api/users/external/login`, body, {headers})
      //     .then((res) => {
      //         let {userId, token} = res.data;
      //         let header = {...headers, ...{userId, token}}

      //         const date = new Date();
      //         date.setHours(date.getHours() + 12)
      //         cookies.set("externalUserId", uniqueUserId, {path: "/", expires: date})
      //         cookies.set("questUserId", userId, {path: "/", expires: date})
      //         cookies.set("questUserToken", token, {path: "/", expires: date})
      //         axios.post(`${BACKEND_URL}api/entities/${entityId}/users/${userId}/metrics/onboarding-view?userId=${userId}&questId=${questId}`, {count: 1}, {headers: header})
      //     })
      // }

      async function getQuestData(userId: string, headers: object) {
        // (loadingTracker && setLoading(true));
        // const request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}/criterias?userId=${userId}`;
        // await axios.get(request, { headers: headers }).then((res) => {
        //     let response = res.data;
        //     let criterias = response?.data?.eligibilityData?.map(
        //         (criteria: {
        //             criteriaType: string;
        //             metadata: { title: string; options: string[], isOptional: string, placeholder: string, linkActionName: string, linkActionUrl: string, manualInput: string};
        //             criteriaId: string;
        //         }) => {
        //             return {
        //                 type: criteria?.criteriaType,
        //                 question: criteria?.metadata?.title,
        //                 options: criteria?.metadata?.options || [],
        //                 criteriaId: criteria?.criteriaId,
        //                 required: !criteria?.metadata?.isOptional,
        //                 placeholder: criteria?.metadata?.placeholder,
        //                 linkTitle: criteria?.metadata?.linkActionName || "",
        //                 linkUrl: criteria?.metadata?.linkActionUrl || "",
        //                 manualInput: criteria?.metadata?.manualInput || false,
        //             };
        //         }
        //     );
        let ansArray: any = {};

        offlineFormData.forEach((criteria: any) => {
          if (criteria.type == "USER_INPUT_MULTI_CHOICE") {
            if (!answer[criteria.criteriaId]) {
              ansArray[criteria.criteriaId] = [];
            }
            return;
          } else {
            if (!answer[criteria.criteriaId]) {
              ansArray[criteria.criteriaId] = "";
            }
            return;
          }
        });
        setAnswer({ ...answer, ...ansArray });
        // (loadingTracker && setLoading(false))
      }
    }
  }, []);

  useEffect(() => {
    templateDesign();
  }, [template, offlineFormData]);

  useEffect(() => {
    if (!offlineFormData.length) return;

    let currentQuestions: any;
    if (template === "multi-question") {
      currentQuestions = offlineFormData.map((e, i) => {
        return i + 1;
      });
      let temp = offlineFormData.map((e, i) => {
        if (designState[currentPage].includes(i + 1)) return i + 1;
      });
      let temp2 = temp.filter((e, i) => {
        if (designState[currentPage].includes(i + 1)) return true;
      });
      currentQuestions = temp2;
    } else if (template === "single-question") {
      currentQuestions = [currentPage + 1];
    } else {
      let current = offlineFormData.map((e, i) => {
        return i + 1;
      });
      currentQuestions = [...current];
    }

    let c = 0;
    for (let i = 0; i < currentQuestions.length; i++) {
      if (
        offlineFormData[currentQuestions[i] - 1].required == false ||
        offlineFormData[currentQuestions[i] - 1].type == "LINK_OPEN_READ"
      ) {
        c++;
      } else {
        if (
          !!answer[offlineFormData[currentQuestions[i] - 1].criteriaId] &&
          answer[offlineFormData[currentQuestions[i] - 1].criteriaId].length > 0
        ) {
          c++;
        }
      }
    }

    if (currentQuestions.length > 0 && c == currentQuestions.length) {
      setButtonFlag(true);
    } else {
      setButtonFlag(false);
    }
  }, [answer, offlineFormData, currentPage]);

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

  const handleRemove = (id: string) => {
    setAnswer({
      ...answer,
      [id]: "",
    });
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
                        maxWidth: `${
                          (wd - (progress.length - 1) * 15) / progress.length -
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
                        maxWidth: `${
                          (wd - (progress.length - 1) * 15) / progress.length -
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
                    {/* <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="20" height="20" fill="#2C2C2C"/>
                                            <path d="M-301 -113C-301 -114.105 -300.105 -115 -299 -115H2097C2098.1 -115 2099 -114.105 2099 -113V592C2099 593.105 2098.1 594 2097 594H-299C-300.105 594 -301 593.105 -301 592V-113Z" fill="#ECECEC"/>
                                            <rect width="376" height="68" transform="translate(-213 -20)" fill="white"/>
                                            <path id="Oval 3" d="M10 3.33337V5.00004C12.7614 5.00004 15 7.23862 15 10C15 12.7615 12.7614 15 10 15C7.23857 15 5 12.7615 5 10C5 9.13364 5.21992 8.30109 5.63312 7.56266L4.17866 6.74882C3.6272 7.73435 3.33333 8.84683 3.33333 10C3.33333 13.6819 6.3181 16.6667 10 16.6667C13.6819 16.6667 16.6667 13.6819 16.6667 10C16.6667 6.31814 13.6819 3.33337 10 3.33337Z" fill={styleConfig?.ProgressBar?.currentTabColor || "#2C2C2C"}/>
                                            <path d="M-299 -114H2097V-116H-299V-114ZM2098 -113V592H2100V-113H2098ZM2097 593H-299V595H2097V593ZM-300 592V-113H-302V592H-300ZM-299 593C-299.552 593 -300 592.552 -300 592H-302C-302 593.657 -300.657 595 -299 595V593ZM2098 592C2098 592.552 2097.55 593 2097 593V595C2098.66 595 2100 593.657 2100 592H2098ZM2097 -114C2097.55 -114 2098 -113.552 2098 -113H2100C2100 -114.657 2098.66 -116 2097 -116V-114ZM-299 -116C-300.657 -116 -302 -114.657 -302 -113H-300C-300 -113.552 -299.552 -114 -299 -114V-116Z" fill={styleConfig?.ProgressBar?.currentTabColor || "#AFAFAF"}/>
                                        </svg> */}
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
                        maxWidth: `${
                          (wd - (progress.length - 1) * 15) / progress.length -
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
                    {/* <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <rect width="20" height="20" fill="#E9E9E9"/>
                                            <path d="M-301 -113C-301 -114.105 -300.105 -115 -299 -115H2097C2098.1 -115 2099 -114.105 2099 -113V592C2099 593.105 2098.1 594 2097 594H-299C-300.105 594 -301 593.105 -301 592V-113Z" fill="#ECECEC"/>
                                            <rect width="376" height="68" transform="translate(-213 -20)" fill="white"/>
                                            <path id="Oval 3" d="M10 3.33337V5.00004C12.7614 5.00004 15 7.23862 15 10C15 12.7615 12.7614 15 10 15C7.23857 15 5 12.7615 5 10C5 9.13364 5.21992 8.30109 5.63312 7.56266L4.17866 6.74882C3.6272 7.73435 3.33333 8.84683 3.33333 10C3.33333 13.6819 6.3181 16.6667 10 16.6667C13.6819 16.6667 16.6667 13.6819 16.6667 10C16.6667 6.31814 13.6819 3.33337 10 3.33337Z" fill={styleConfig?.ProgressBar?.pendingTabColor || "#AFAFAF"}/>
                                            <path d="M-299 -114H2097V-116H-299V-114ZM2098 -113V592H2100V-113H2098ZM2097 593H-299V595H2097V593ZM-300 592V-113H-302V592H-300ZM-299 593C-299.552 593 -300 592.552 -300 592H-302C-302 593.657 -300.657 595 -299 595V593ZM2098 592C2098 592.552 2097.55 593 2097 593V595C2098.66 595 2100 593.657 2100 592H2098ZM2097 -114C2097.55 -114 2098 -113.552 2098 -113H2100C2100 -114.657 2098.66 -116 2097 -116V-114ZM-299 -116C-300.657 -116 -302 -114.657 -302 -113H-300C-300 -113.552 -299.552 -114 -299 -114V-116Z" fill={styleConfig?.ProgressBar?.pendingTabColor || "#AFAFAF"}/>
                                        </svg> */}
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
    criteriaId: string,
    index: number,
    placeholder: string,
    inputType: logoType
  ) => {
    return (
      <div key={criteriaId}>
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
          {`${question} ${!!required && "*"}`}
        </Label>
        <Input
          type={inputType}
          placeholder={placeholder}
          value={answer[criteriaId]}
          iconColor={
            styleConfig?.Input?.color ||
            BrandTheme?.primaryColor ||
            themeConfig?.primaryColor ||
            "#B9B9B9"
          }
          onChange={(e) => handleUpdate(e, criteriaId, "")}
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
    criteriaId: string,
    index: number,
    placeholder: string
  ) => {
    return (
      <div key={criteriaId}>
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
          {`${question} ${!!required && "*"}`}
        </Label>
        <Input
          type={"date"}
          placeholder={placeholder}
          value={answer[criteriaId]}
          onChange={(e) => handleUpdate(e, criteriaId, "")}
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
    criteriaId: string,
    index: number,
    placeholder: string
  ) => {
    return (
      <div key={criteriaId}>
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
          {`${question} ${!!required && "*"}`}
        </Label>
        <TextArea
          onChange={(e) => handleUpdate(e, criteriaId, "")}
          placeholder={placeholder}
          value={answer[criteriaId]}
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
    criteriaId: string,
    index: number,
    manualInput: string | boolean,
    singleChoose: "modal1" | "modal2" | "modal3"
  ) => {
    return (
      <div key={criteriaId}>
        {customComponentPositions == index + 1 && (
          <div style={{ paddingBottom: "12px" }}>{customComponents}</div>
        )}
        <Label
          htmlFor="textAreaInput"
          style={{
            color: styleConfig?.Label?.color || themeConfig?.primaryColor,
            ...styleConfig?.Label,
          }}
        >
          {`${question} ${!!required && "*"}`}
        </Label>
        <SingleChoice
          options={options}
          type={singleChoose}
          onChange={(e) =>
            singleChoose == "modal3"
              ? handleUpdate({ target: e }, criteriaId, "")
              : handleUpdate(e, criteriaId, "radio")
          }
          checked={answer[criteriaId]}
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
          selectedStyle={{
            accentColor:
              styleConfig?.SingleChoice?.selectedStyle?.accentColor ||
              QuestThemeData?.accentColor ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.SingleChoice?.selectedStyle,
          }}
        />
        {manualInput != false && answer[criteriaId] == manualInput && (
          <Input
            type="text"
            onChange={(e) => handleUpdate(e, criteriaId + "/manual", "")}
            value={answer[criteriaId + "/manual"]}
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
    criteriaId: string,
    index: number
  ) => {
    return (
      <div key={criteriaId}>
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
          {`${question} ${!!required && "*"}`}
        </Label>
        <MultiChoice
          options={options}
          checked={answer[criteriaId]}
          onChange={(e) => handleUpdate(e, criteriaId, "check")}
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
            color:
              styleConfig?.SingleChoice?.selectedStyle?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
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
    criteriaId: string,
    index: number
  ) => {
    return (
      <div key={criteriaId}>
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
          {`${question} ${!!required && "*"}`}
        </Label>
        <MultiChoiceTwo
          options={options}
          checked={!!answer[criteriaId] && answer[criteriaId]}
          onChange={(e) => handleUpdate(e, criteriaId, "check")}
          style={{
            borderColor:
              styleConfig?.MultiChoice?.style?.borderColor ||
              themeConfig?.borderColor,
            color:
              styleConfig?.MultiChoice?.style?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.MultiChoice?.style,
          }}
          selectedStyle={{
            color:
              styleConfig?.MultiChoice?.selectedStyle?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.MultiChoice?.selectedStyle,
          }}
        />
      </div>
    );
  };

  const chooseLogo = (links: string) => {
    if (links.includes("calendly")) {
      return calendly;
    } else if (links.includes("slack")) {
      return slack;
    } else if (links.includes("twitter")) {
      return twitter;
    } else if (links.includes("discord")) {
      return discord;
    } else {
      return link;
    }
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
      arr.length == offlineFormData.length &&
      Math.max(...arr) == offlineFormData.length
    ) {
      fl = true;
    }

    return fl;
  }

  function returnAnswers() {
    GeneralFunctions.fireTrackingEvent(
      "quest_onboarding_offline_answers_returned",
      "onboarding_offline"
    );

    if (currentPage < designState.length - 1) {
      console.log("no submit");
      setCurrentPage((prev) => prev + 1);
    } else {
      let crt: any = { ...answer };
      for (let i of Object.keys(crt)) {
        if (i.includes("/manual") && crt[i] != "") {
          let id: string = i.split("/manual")[0];
          let criteriaDetails: offlineFormData[] = offlineFormData.filter(
            (item) => item.criteriaId == id
          );
          if (criteriaDetails[0].manualInput == crt[id]) {
            crt[id] = crt[i];
          }
        }
      }
      getAnswers && getAnswers(crt);
    }
  }

  if (
    featureFlags[config.FLAG_CONSTRAINTS.OnboardingFlag]?.isEnabled == false
  ) {
    return <div></div>;
  }

  return (
    offlineFormData.length > 0 && (
      <div
        className="q-onb-home"
        style={{
          background:
            styleConfig?.Form?.backgroundColor ||
            BrandTheme?.background ||
            themeConfig?.backgroundColor ||
            "#fff",
          borderRadius:
            styleConfig?.Form?.borderRadius ||
            QuestThemeData?.borderRadius ||
            BrandTheme?.borderRadius,
          height: styleConfig?.Form?.height || "auto",
          fontFamily:
            BrandTheme?.fontFamily ||
            themeConfig.fontFamily ||
            "'Figtree', sans-serif",
          ...styleConfig?.Form,
        }}
      >
        <div className="q-onb-ch">
          {offlineFormData.length > 0 &&
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
              offlineFormData.length > 0 &&
              designState.length > 1 &&
              !!progress?.length && <ProgressBar />}
            {!!designState && designState.length > 0
              ? designState[currentPage].map((num: number) =>
                  offlineFormData[num - 1]?.type == "USER_INPUT_TEXT"
                    ? normalInput(
                        offlineFormData[num - 1]?.question || "",
                        offlineFormData[num - 1]?.required || false,
                        offlineFormData[num - 1].criteriaId || "",
                        num - 1,
                        offlineFormData[num - 1]?.placeholder ||
                          offlineFormData[num - 1]?.question ||
                          "",
                        "text"
                      )
                    : offlineFormData[num - 1]?.type == "USER_INPUT_EMAIL"
                    ? normalInput(
                        offlineFormData[num - 1]?.question || "",
                        offlineFormData[num - 1]?.required || false,
                        offlineFormData[num - 1].criteriaId || "",
                        num - 1,
                        offlineFormData[num - 1]?.placeholder ||
                          offlineFormData[num - 1]?.question ||
                          "",
                        "email"
                      )
                    : offlineFormData[num - 1]?.type == "USER_INPUT_PHONE"
                    ? normalInput(
                        offlineFormData[num - 1]?.question || "",
                        offlineFormData[num - 1]?.required || false,
                        offlineFormData[num - 1].criteriaId || "",
                        num - 1,
                        offlineFormData[num - 1]?.placeholder ||
                          offlineFormData[num - 1]?.question ||
                          "",
                        "number"
                      )
                    : offlineFormData[num - 1]?.type == "USER_INPUT_TEXTAREA"
                    ? textAreaInput(
                        offlineFormData[num - 1]?.question || "",
                        offlineFormData[num - 1]?.required || false,
                        offlineFormData[num - 1].criteriaId || "",
                        num - 1,
                        offlineFormData[num - 1]?.placeholder ||
                          offlineFormData[num - 1]?.question ||
                          ""
                      )
                    : offlineFormData[num - 1]?.type == "USER_INPUT_DATE"
                    ? dateInput(
                        offlineFormData[num - 1]?.question || "",
                        offlineFormData[num - 1]?.required || false,
                        offlineFormData[num - 1].criteriaId || "",
                        num - 1,
                        offlineFormData[num - 1]?.placeholder ||
                          offlineFormData[num - 1]?.question ||
                          ""
                      )
                    : offlineFormData[num - 1]?.type ==
                      "USER_INPUT_SINGLE_CHOICE"
                    ? !!singleChoose &&
                      singleChoiceTwo(
                        offlineFormData[num - 1].options || [],
                        offlineFormData[num - 1]?.question || "",
                        offlineFormData[num - 1]?.required || false,
                        offlineFormData[num - 1].criteriaId || "",
                        num - 1,
                        offlineFormData[num - 1]?.manualInput,
                        singleChoose
                      )
                    : offlineFormData[num - 1]?.type ==
                      "USER_INPUT_MULTI_CHOICE"
                    ? !!multiChoice && multiChoice == "modal2"
                      ? multiChoiceTwo(
                          offlineFormData[num - 1]?.options || [],
                          offlineFormData[num - 1]?.question || "",
                          offlineFormData[num - 1]?.required || false,
                          offlineFormData[num - 1].criteriaId || "",
                          num - 1
                        )
                      : multiChoiceOne(
                          offlineFormData[num - 1]?.options || [],
                          offlineFormData[num - 1]?.question || "",
                          offlineFormData[num - 1]?.required || false,
                          offlineFormData[num - 1].criteriaId || "",
                          num - 1
                        )
                    : null
                )
              : offlineFormData?.map((data, index) =>
                  data.type == "USER_INPUT_TEXT"
                    ? normalInput(
                        data?.question || "",
                        data?.required || false,
                        data.criteriaId || "",
                        index,
                        data?.placeholder || data?.question || "",
                        "text"
                      )
                    : data.type == "USER_INPUT_EMAIL"
                    ? normalInput(
                        data?.question || "",
                        data?.required || false,
                        data.criteriaId || "",
                        index,
                        data?.placeholder || data?.question || "",
                        "email"
                      )
                    : data.type == "USER_INPUT_PHONE"
                    ? normalInput(
                        data?.question || "",
                        data?.required || false,
                        data.criteriaId || "",
                        index,
                        data?.placeholder || data?.question || "",
                        "number"
                      )
                    : data.type == "USER_INPUT_TEXTAREA"
                    ? textAreaInput(
                        data?.question || "",
                        data?.required || false,
                        data.criteriaId || "",
                        index,
                        data?.placeholder || data?.question || ""
                      )
                    : data.type == "USER_INPUT_DATE"
                    ? dateInput(
                        data?.question || "",
                        data?.required || false,
                        data.criteriaId || "",
                        index,
                        data?.placeholder || data?.question || ""
                      )
                    : data.type == "USER_INPUT_SINGLE_CHOICE"
                    ? !!singleChoose &&
                      singleChoiceTwo(
                        data.options || [],
                        data?.question || "",
                        data?.required || false,
                        data.criteriaId || "",
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
                          data.criteriaId || "",
                          index
                        )
                      : multiChoiceOne(
                          data.options || [],
                          data?.question || "",
                          data?.required || false,
                          data.criteriaId || "",
                          index
                        )
                    : null
                )}

            {offlineFormData.length > 0 &&
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
                            "quest_onboarding_offline_secondary_btn_clicked",
                            "onboarding_offline"
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
                          "quest_onboarding_offline_primary_btn_clicked",
                          "onboarding_offline"
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
                          QuestThemeData?.buttonColor ||
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
                          "quest_onboarding_offline_secondary_btn_clicked",
                          "onboarding_offline"
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
                          "quest_onboarding_offline_primary_btn_clicked",
                          "onboarding_offline"
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
                          QuestThemeData?.buttonColor ||
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
                        "quest_onboarding_offline_single_page_submit_button_clicked",
                        "onboarding_offline"
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
                        QuestThemeData?.buttonColor ||
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
          {offlineFormData && showFooter && (
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

export default OnBoardingOffline;
