import React, { useContext, useEffect, useRef, useState } from "react";
import QuestContext from "../QuestWrapper";
import axios from "axios";
import config from "../../config";
import "./Feedback.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "../Onboarding/onboarding.css";
import "../FeedbackOverview/FeedbackOverview.css";
import Rating from "../Rating/Rating";
import QuestLabs from "../QuestLabs";
import General from "../../general";
import Label from "../Modules/Label";
import { Input } from "../Modules/Input";
import TextArea from "../Modules/TextArea";
import { PrimaryButton } from "../Modules/PrimaryButton";
import { SecondaryButton } from "../Modules/SecondaryButton";
import TopBar from "../Modules/TopBar";
import { MultiChoiceTwo } from "../Modules/MultiChoice";
import Toast from "../toast2/Toast";
import Cookies from "universal-cookie";
import RadioInitial from "../../assets/images/RadioInitial.svg";
import RadioSelected from "../../assets/images/RadioSelected.svg";
import { cross, thanksPopUpTick } from "../../assets/assetsSVG";

interface FeedbackProps {
  heading?: string;
  subHeading?: string;
  userId?: string;
  token?: string;
  questId?: string;
  btnColor?: string;
  bgColor?: string;
  btnTextColor?: string;
  textColor?: string;
  font?: string;
  supportUrl?: string;
  onSubmit?: () => void;
  delay?: number;
  crossLogoForInput?: boolean;
  onCancel?: Function;
  itemsPerPage?: number;
  iconColor?: string;
  ratingType?: string;
  uniqueEmailId?: string;
  uniqueUserId?: string;
  sections?: {
    heading?: string;
    subHeading?: string;
    button1Text?: string;
    button2Text?: string;
    placeholder?: string;
    showWordCount?: boolean;
    showTopBar?: boolean;
  }[];
  styleConfig?: {
    Form?: React.CSSProperties;
    Heading?: React.CSSProperties;
    Description?: React.CSSProperties;
    Input?: React.CSSProperties;
    Label?: React.CSSProperties;
    TextArea?: React.CSSProperties;
    PrimaryButton?: React.CSSProperties;
    SecondaryButton?: React.CSSProperties;
    Modal?: React.CSSProperties;
    Footer?: React.CSSProperties;
    TopBar?: React.CSSProperties;
    Rating?: {
      RatingContainer?: React.CSSProperties;
      SingleRating?: React.CSSProperties;
      RatingText?: React.CSSProperties;
      Hover?: React.CSSProperties;
      LeftRatingText?: string;
      RightRatingText?: string;
    };
    EmailError?: {
      text?: string;
      errorStyle?: React.CSSProperties;
    };
    MultiChoice?: {
      style?: React.CSSProperties;
      selectedStyle?: React.CSSProperties;
    };
  };
  showFooter?: boolean;
  enableVariation?: boolean;
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

const Survey: React.FC<FeedbackProps> = ({
  heading = "Feedback",
  subHeading = "Please share your feedback",
  userId,
  token,
  questId,
  textColor,
  font,
  bgColor,
  supportUrl,
  onSubmit,
  ratingType = "number",
  onCancel = () => {},
  itemsPerPage = 5,
  iconColor = "#939393",
  uniqueEmailId,
  uniqueUserId,
  showFooter = true,
  styleConfig = {},
  sections,
  enableVariation = false,
}) => {
  interface FormDataItem {
    type?: string;
    question?: string;
    options?: [string];
    criteriaId?: any;
    required?: boolean;
    placeholder?: string;
  }

  const [rating, setRating] = useState<number>(0);
  const [thanksPopup, setThanksPopup] = useState<boolean>(false);
  const [formdata, setFormdata] = useState<FormDataItem[]>([]);
  const [gradient, setGradient] = useState<boolean>(false);
  const { apiKey, apiSecret, entityId, apiType, themeConfig } = useContext(
    QuestContext.Context
  );
  const [answer, setAnswer] = useState<any>({});
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [session, setSession] = useState<string>("");
  const [page, setPage] = useState(0);
  const [data, setData] = useState<FormDataItem[]>([]);
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

  const cookies = new Cookies();
  let BACKEND_URL =
    apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL;

  let GeneralFunctions = new General("mixpanel", apiType);

  const handleRatingChange = (id: string, newRating: number) => {
    setRating(newRating);
    setAnswer({
      ...answer,
      [id]: newRating,
    });
  };

  const getTheme = async (theme: string) => {
    try {
      const request = `${BACKEND_URL}api/entities/${entityId}?userId=${userId}`;
      const response = await axios.get(request, {
        headers: { apiKey, userId, token },
      });
      setBrandTheme(response.data.data.theme.BrandTheme[theme]);
    } catch (error) {
      GeneralFunctions.captureSentryException(error);
    }
  };

  useEffect(() => {
    GeneralFunctions.fireTrackingEvent("quest_survey_loaded", "survey");
    if (bgColor) {
      setGradient(
        bgColor?.includes("linear-gradient") ||
          bgColor?.includes("radial-gradient")
      );
    }
    if (entityId) {
      const headers = {
        apiKey: apiKey,
        apisecret: apiSecret,
        userId: userId,
        token: token,
      };
      const request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}?userId=${userId}&getVariation=${enableVariation}`;

      axios
        .get(request, { headers: headers })
        .then((res) => {
          let response = res.data;
          if (response.data.uiProps?.questThemeData) {
            setQuestThemeData(response?.data?.uiProps?.questThemeData);
            if (response.data.uiProps?.questThemeData.theme) {
              // getTheme(response.data.uiProps.questThemeData.theme) disabled for now
            }
          }
          setSession(response.session);
          let criterias = response?.eligibilityData?.map((criteria: any) => {
            return {
              type: criteria?.data?.criteriaType,
              question: criteria?.data?.metadata?.title,
              options: criteria?.data?.metadata?.options || [],
              criteriaId: criteria?.data?.criteriaId,
              required: criteria?.data?.metadata?.isRequired,
              placeholder: criteria?.data?.metadata?.placeholder,
            };
          });
          criterias = Array.isArray(criterias) ? criterias : [];
          setFormdata([...criterias]);
          setData([...criterias]);
        })
        .catch((error) => {
          console.error("Error:", error);
          GeneralFunctions.captureSentryException(error);
        });
    }

    if (entityId && uniqueUserId) {
      const functions = new General("");
      functions.getExternalLogin({
        apiType,
        uniqueUserId,
        entityId,
        userId,
        apiKey,
        apiSecret,
        token,
        uniqueEmailId,
      });
    }
  }, []);

  const [check, setCheck] = useState(false);

  const handleUpdate = (
    e: any,
    id: string,
    j: string,
    type?: string,
    k?: number
  ) => {
    setCheck((prev) => !prev);
    if (type === "check") {
      if (answer[id]?.length > 0) {
        if (answer[id]?.includes(e.target.value)) {
          answer[id] = answer[id].filter((value: any) => {
            if (value != e.target.value) {
              return true;
            }
          });
        } else {
          answer[id] = [e.target.value, ...answer[id]];
        }
      } else {
        answer[id] = [e.target.value];
      }

      // if (arr.includes(e.target.value)) {
      //   console.log("value is already");
      //   arr=arr.filter((value: any) => {
      //     if (value != e.target.value) {
      //       // console.log("un")
      //       return true;
      //     }
      //   });
      //   console.log(arr)
      //   answer[id] = [...arr];
      // } else {
      //   arr.push(e.target.value);
      //   answer[id] = [...arr];
      // }
    } else if (answer[id] === j) {
      setAnswer({
        ...answer,
        [id]: undefined,
      });
    } else {
      if (j) {
        setAnswer({
          ...answer,
          [id]: j,
        });
      } else {
        setAnswer({
          ...answer,
          [id]: e.target.value,
        });
        setCheck((prev) => !prev);
      }
    }

    // if (e.target.checked === true && j === "check") {
    //   let ans = answer[id as unknown as number] || [];
    //   ans.push(e.target.value);
    //   setAnswer({
    //     ...answer,
    //     [id]: ans,
    //   });
    // } else if (k) {
    //   setAnswer({
    //     ...answer,
    //     [id]: k,
    //   });
    // } else if (
    //   e.target.checked === false &&
    //   typeof answer[id as unknown as number] === "object" &&
    //   j === "check"
    // ) {
    //   let ans = answer[id as unknown as number];
    //   let mod_ans = ans.filter((an: string | number) => an !== e.target.value);
    //   setAnswer({
    //     ...answer,
    //     [id]: mod_ans,
    //   });
    // } else {
    //   setAnswer({
    //     ...answer,
    //     [id]: e.target.value,
    //   });
    // }
  };

  function returnAnswers() {
    GeneralFunctions.fireTrackingEvent("quest_survey_form_submitted", "survey");
    let callApi = false;

    for (let i = 0; i < formdata.length; i++) {
      if (!formdata[i].required) {
      } else if (
        (formdata[i].required && answer[formdata[i]?.criteriaId]?.length > 0) ||
        (formdata[i].required && answer[formdata[i]?.criteriaId] > 0)
      ) {
        callApi = true;
      } else {
        callApi = false;
        return Toast.error({ text: "Please fill some of the details" });
      }
    }

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
    // const arr = Object.values(answer);
    // if (!answer || !arr?.length || arr.length < FormData?.length){
    //     return showToast.error("Please fill some of the details");
    // }

    // for (let e of arr){
    //   if (!e || (Array.isArray(e) && !e.length)){
    //     return showToast.error("Please fill Some of the details");
    //   }
    // }
    // if (arr.length < data?.length) {
    //   showToast.error("Please fill Some of the details");
    //   return
    // };

    if (callApi) {
      const ansArr = formdata.map((ans: any) => ({
        question: ans?.question || "",
        answer: [answer[ans?.criteriaId] || ""],
        criteriaId: ans?.criteriaId || "",
      }));
      const request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}/verify-all?userId=${headers.userId}&getVariation=${enableVariation}`;
      const requestData = {
        criterias: ansArr,
        userId: headers.userId,
        session,
      };
      setShowLoader(true);
      axios
        .post(request, requestData, { headers: headers })
        .then((response) => {
          if (response.data.success) {
            setThanksPopup(true);
            onSubmit && onSubmit();
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
    } else {
      toast.error("Please fill in all required fields.");
    }
  }

  const normalInput = (
    question: string,
    criteriaId: string,
    type: "number" | "text",
    required: boolean,
    placeholder?: string
  ) => {
    return (
      <div className="" key={criteriaId}>
        <Label
          htmlFor="normalInput"
          children={`${question}${required === true ? "*" : ""}`}
          style={{
            color:
              styleConfig?.Label?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.Label,
          }}
        />
        <Input
          type={type}
          style={{
            borderColor:
              styleConfig?.Input?.borderColor || themeConfig?.borderColor,
            color:
              styleConfig?.Input?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.Input,
          }}
          onChange={(e) => handleUpdate(e, criteriaId, "")}
          value={answer[criteriaId]}
          placeholder={placeholder}
        />
      </div>
    );
  };
  const emailInput = (
    question: string,
    criteriaId: string,
    required: boolean,
    placeholder?: string
  ) => {
    return (
      <div className="" key={criteriaId}>
        <Label
          htmlFor="normalInput"
          children={`${question}${required === true ? "*" : ""}`}
          style={{
            color:
              styleConfig?.Label?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.Label,
          }}
        />
        <Input
          type="email"
          style={{
            borderColor:
              styleConfig?.Input?.borderColor || themeConfig?.borderColor,
            color:
              styleConfig?.Input?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.Input,
          }}
          onChange={(e) => handleUpdate(e, criteriaId, "")}
          value={answer[criteriaId]}
          placeholder={placeholder}
          emailtext={
            styleConfig?.EmailError?.text == undefined
              ? "This is not a valid email"
              : styleConfig?.EmailError?.text
          }
          emailErrorStyle={styleConfig?.EmailError?.errorStyle}
        />
      </div>
    );
  };

  const normalInput2 = (
    question: string,
    criteriaId: string,
    required: boolean,
    placeholder?: string
  ) => {
    return (
      <div className="" key={criteriaId}>
        <Label
          htmlFor="normalInput"
          children={`${question}${required === true ? "*" : ""}`}
          style={{
            color:
              styleConfig?.Label?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.Label,
          }}
        />
        <TextArea
          style={{
            borderColor:
              styleConfig?.TextArea?.borderColor || themeConfig?.borderColor,
            color:
              styleConfig?.TextArea?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.TextArea,
          }}
          onChange={(e) => handleUpdate(e, criteriaId, "")}
          value={answer[criteriaId]}
          placeholder={(sections && sections[page].placeholder) || placeholder}
          maxLength={sections && sections[page].showWordCount ? 120 : undefined}
        />
        {sections && sections[page].showWordCount && (
          <p
            style={{
              color: "var(--Neutral-White-500, #B9B9B9)",
              fontFamily: "Figtree",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "16px",
            }}
          >
            {answer[criteriaId]?.length || 0}/120 characters
          </p>
        )}
      </div>
    );
  };

  const singleChoiceOne = (
    options: string[],
    question: string,
    required: boolean,
    criteriaId: string
  ) => {
    return (
      <div key={criteriaId}>
        <Label
          className="q-onb-singleChoiceOne-lebel"
          children={`${question}${required === true ? "*" : ""}`}
          style={{
            color:
              styleConfig?.Label?.color ||
              BrandTheme?.primaryColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.Label,
          }}
        />

        <div className="q-onb-singleChoiceOne-optDiv">
          {options.map((option: string, id: number) => (
            <div
              className="q_onb_singlehoiceOne_lebel"
              key={id}
              onClick={(e) => handleUpdate(e, criteriaId, option, "radio")}
              style={{
                border:
                  answer[criteriaId] == option
                    ? // ? "1px solid var(--Primary-Grape-300, #bf8aff)"
                      // : "1px solid var(--Neutral-White-300, #ececec)",
                      "1px solid var(--Primary-Grape-300, #bf8aff)"
                    : "1px solid var(--Neutral-White-300, #ececec)",
              }}
            >
              <img
                src={
                  answer[criteriaId] == option ? RadioSelected : RadioInitial
                }
                alt=""
              />
              <p className="q-onb-singleChoiceOne-lebel3">{option}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleThanks = () => {
    setThanksPopup(false);
    // setSelectedOption(null);
  };

  const multiChoiceTwo = (
    options: string[] | [],
    question: string,
    required: boolean,
    criteriaId: string,
    index?: number
  ) => {
    return (
      <div key={criteriaId}>
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
          {`${question}${required === true ? "*" : ""}`}
        </Label>
        <MultiChoiceTwo
          options={options}
          checked={!!answer[criteriaId] && answer[criteriaId]}
          onChange={(e) => {
            handleUpdate(e, criteriaId, "", "check");
          }}
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
              questThemeData?.accentColor ||
              BrandTheme?.accentColor ||
              themeConfig?.primaryColor,
            ...styleConfig?.MultiChoice?.selectedStyle,
          }}
        />
      </div>
    );
  };

  const dateInput = (
    question: string,
    required: boolean,
    criteriaId: string,
    placeholder: string,
    index?: number
  ) => {
    return (
      <div key={criteriaId}>
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

  const [goToNextSection, setGoToNextSection] = useState(false);

  useEffect(() => {
    if (formdata?.length > 0) {
      for (let i = 0; i < itemsPerPage; i++) {
        let questionNo = page * itemsPerPage + i;
        if (
          formdata[questionNo]?.type === "RATING" &&
          formdata[questionNo]?.required &&
          answer[formdata[questionNo]?.criteriaId] > 0
        ) {
          setGoToNextSection(true);
        } else if (!formdata[questionNo]?.required) {
          setGoToNextSection(true);
        } else if (
          formdata[questionNo]?.required &&
          answer[formdata[questionNo]?.criteriaId]?.length > 0
        ) {
          setGoToNextSection(true);
        } else {
          setGoToNextSection(false);
          break;
        }
      }
    }
  }, [answer, formdata, data, page, answer, check]);

  const handleNext = () => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    if (page < totalPages - 1) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div
      style={{
        background:
          styleConfig?.Form?.backgroundColor ||
          BrandTheme?.background ||
          themeConfig?.backgroundColor,
        borderRadius:
          styleConfig?.Form?.borderRadius ||
          questThemeData?.borderRadius ||
          BrandTheme?.borderRadius,
        height: styleConfig?.Form?.height || "auto",
        fontFamily:
          BrandTheme?.fontFamily ||
          themeConfig.fontFamily ||
          "'Figtree', sans-serif",
        ...styleConfig?.Form,
      }}
      className="q-feedback-cont"
    >
      {formdata.length > 0 && (
        <>
          {!thanksPopup && (
            <div>
              <TopBar
                heading={(sections && sections[page]?.heading) || heading || ""}
                description={
                  (sections && sections[page]?.subHeading) || subHeading || ""
                }
                style={{
                  headingStyle: {
                    color:
                      styleConfig?.Heading?.color || BrandTheme?.primaryColor,
                    ...styleConfig?.Heading,
                  },
                  descriptionStyle: {
                    color:
                      styleConfig?.Description?.color ||
                      BrandTheme?.secondaryColor,
                    ...styleConfig?.Description,
                  },
                  iconStyle: { display: "none" },
                  topbarStyle: {
                    display:
                      sections && sections[page]?.showTopBar == false
                        ? "none"
                        : "block",
                    ...styleConfig?.TopBar,
                  },
                }}
              />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  data.length / itemsPerPage <= page + 1
                    ? returnAnswers()
                    : handleNext();
                }}
                style={{
                  padding: "20px",
                  boxSizing: "content-box",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {formdata
                  .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                  .map((data: any) => {
                    if (data.type === "USER_INPUT_TEXT") {
                      return normalInput(
                        data.question || "",
                        data.criteriaId || "",
                        "text",
                        data.required || false,
                        data.placeholder || sections?.[page]?.placeholder || ""
                      );
                    } else if (data.type === "USER_INPUT_EMAIL") {
                      return emailInput(
                        data.question || "",
                        data.criteriaId || "",
                        data.required || false,
                        data.placeholder || sections?.[page]?.placeholder || ""
                      );
                    } else if (data.type === "USER_INPUT_SINGLE_CHOICE") {
                      return singleChoiceOne(
                        data.options || [],
                        data?.question || "",
                        data?.required || false,
                        data.criteriaId || ""
                      );
                    } else if (data.type === "USER_INPUT_TEXTAREA") {
                      return normalInput2(
                        data.question || "",
                        data.criteriaId || "",
                        data.required || false,
                        data.placeholder || sections?.[page]?.placeholder || ""
                      );
                    } else if (data.type === "RATING") {
                      return (
                        <div className="mb-4">
                          <Label
                            className="q-fd-lebels"
                            style={{
                              color:
                                styleConfig?.Label?.color ||
                                BrandTheme?.primaryColor ||
                                themeConfig?.primaryColor,
                              ...styleConfig?.Label,
                            }}
                          >
                            {`${
                              data.question ? data.question : "Rating Scale"
                            }${data.required === true ? "*" : ""} `}
                          </Label>
                          <div
                            style={{
                              display: "flex",
                              marginTop: "6px",
                            }}
                          >
                            <Rating
                              count={5}
                              getCurrentRating={(item) =>
                                handleRatingChange(data.criteriaId, item)
                              }
                              //  defaultRating={Number(answer[0])}
                              RatingStyle={styleConfig?.Rating}
                              type={ratingType}
                            />
                          </div>
                        </div>
                      );
                    } else if (data.type === "USER_INPUT_MULTI_CHOICE") {
                      return multiChoiceTwo(
                        data.options || [],
                        data.question || "",
                        data.required || false,
                        data.criteriaId || ""
                      );
                    } else if (data.type === "USER_INPUT_DATE") {
                      return dateInput(
                        data.question || "",
                        data.required || false,
                        data.criteriaId || "",
                        data.placeholder || "Choose Date"
                      );
                    } else if (data.type === "USER_INPUT_PHONE") {
                      return normalInput(
                        data.question || "",
                        data.criteriaId || "",
                        "number",
                        data.required || false,
                        data.placeholder || undefined
                      );
                    }
                  })}
                <div className="q_feedback_buttons">
                  <SecondaryButton
                    children={
                      sections && sections[page]?.button1Text
                        ? sections[page].button1Text
                        : 0 == page
                        ? "Cancel"
                        : "Previous"
                    }
                    onClick={(e) => {
                      GeneralFunctions.fireTrackingEvent(
                        "quest_survey_secondary_button_clicked",
                        "survey"
                      );
                      e.preventDefault();
                      e.stopPropagation();
                      if (page === 0) {
                        onCancel();
                      } else {
                        setPage(page - 1);
                      }
                    }}
                    style={styleConfig?.SecondaryButton}
                  />
                  <PrimaryButton
                    style={{
                      border:
                        styleConfig?.PrimaryButton?.border ||
                        "1.5px solid #afafaf",
                      background:
                        styleConfig?.PrimaryButton?.background ||
                        questThemeData?.buttonColor ||
                        BrandTheme?.buttonColor ||
                        themeConfig?.buttonColor,
                      ...styleConfig?.PrimaryButton,
                    }}
                    onClick={() => {
                      GeneralFunctions.fireTrackingEvent(
                        "quest_survey_primary_button_clicked",
                        "survey"
                      );
                    }}
                    children={
                      sections && sections[page]?.button2Text
                        ? sections[page].button2Text
                        : data.length / itemsPerPage <= page + 1
                        ? "Submit"
                        : "Next"
                    }
                    type="submit"
                    disabled={!goToNextSection}
                  />
                </div>
              </form>
              {showFooter && (
                <QuestLabs
                  style={{
                    background:
                      styleConfig?.Footer?.backgroundColor ||
                      styleConfig?.Form?.backgroundColor ||
                      BrandTheme?.background ||
                      styleConfig?.Form?.background ||
                      themeConfig?.backgroundColor,
                    ...styleConfig?.Footer,
                  }}
                />
              )}
            </div>
          )}
          {thanksPopup && (
            <div>
              <div
                className="q_submit_cross_icon"
                onClick={handleThanks}
                style={{
                  cursor: "pointer",
                }}
              >
                {cross(iconColor)}
              </div>
              <div className="q-fw-thanks">
                <div>
                  <div className="q-svg-thanks">{thanksPopUpTick()}</div>
                  <div className="q_fw_submit_box">
                    <div className="q_feedback_text_submitted">
                      <div
                        className="q_feedback_text_cont"
                        style={{
                          color:
                            styleConfig?.Heading?.color ||
                            BrandTheme?.primaryColor ||
                            themeConfig?.primaryColor,
                        }}
                      >
                        Feedback Submitted
                      </div>
                      <div
                        className="q_fw_submit_desc"
                        style={{
                          color:
                            styleConfig?.Description?.color ||
                            BrandTheme?.secondaryColor ||
                            themeConfig?.secondaryColor,
                        }}
                      >
                        Thanks for submitting your feedback with us. We
                        appreciate your review and will assure you to surely
                        consider them
                      </div>
                    </div>
                    <div
                      onClick={() => setThanksPopup(false)}
                      className="q_fw_submit_back"
                      style={{
                        ...styleConfig?.SecondaryButton,
                        color:
                          styleConfig?.SecondaryButton?.color ||
                          BrandTheme?.secondaryColor ||
                          themeConfig?.secondaryColor,
                      }}
                    >
                      Go to home!
                    </div>
                  </div>
                </div>
              </div>
              {showFooter && (
                <QuestLabs
                  style={{
                    background:
                      styleConfig?.Footer?.backgroundColor ||
                      styleConfig?.Form?.backgroundColor ||
                      BrandTheme?.background ||
                      styleConfig?.Form?.background ||
                      themeConfig?.backgroundColor,
                    ...styleConfig?.Footer,
                  }}
                />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Survey;
