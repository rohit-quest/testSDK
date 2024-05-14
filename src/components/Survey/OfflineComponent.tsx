import React, { useContext, useEffect, useState } from "react";
import QuestContext from "../QuestWrapper";
import "./Feedback.css";
import "react-toastify/dist/ReactToastify.css";
import "../Onboarding/onboarding.css";
import "../FeedbackOverview/FeedbackOverview.css";
import Rating from "../Rating/Rating";
import QuestLabs from "../QuestLabs";
import { Input } from "../Modules/Input";
import Label from "../Modules/Label";
import TextArea from "../Modules/TextArea";
import TopBar from "../Modules/TopBar";
import { MultiChoiceTwo } from "../Modules/MultiChoice";
import General from "../../general";
import { PrimaryButton } from "../Modules/PrimaryButton";
import RadioInitial from "../../assets/images/RadioInitial.svg";
import RadioSelected from "../../assets/images/RadioSelected.svg";
import { cross, thanksPopUpTick } from "../../assets/assetsSVG";

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

interface FeedbackProps {
  heading?: string;
  subHeading?: string;
  //   userId?: string;
  //   token?: string;
  //   questId?: string;
  btnColor?: string;
  bgColor?: string;
  btnTextColor?: string;
  textColor?: string;
  font?: string;
  supportUrl?: string;
  onSubmit?: () => void;
  delay?: number;
  isInline?: boolean;
  crossLogoForInput?: boolean;
  onCancel?: Function;
  itemsPerPage?: number;
  iconColor?: string;
  offlineFormData: Array<FormDataItem>;
  BrandTheme?: BrandTheme;
  QuestThemeData?: QuestThemeData;
  ratingType?: string;
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
    Footer?: {
      FooterStyle?: React.CSSProperties;
      FooterText?: React.CSSProperties;
      FooterIcon?: React.CSSProperties;
    };
    EmailError?: {
      text?: string;
      errorStyle?: React.CSSProperties;
    };
    Rating?: {
      RatingContainer?: React.CSSProperties;
      SingleRating?: React.CSSProperties;
      RatingText?: React.CSSProperties;
      Hover?: React.CSSProperties;
    };
    MultiChoice?: {
      style?: React.CSSProperties;
      selectedStyle?: React.CSSProperties;
    };
  };
  showFooter?: boolean;
}
interface FormDataItem {
  type?: string;
  question?: string;
  options?: string[];
  criteriaId?: string;
  required?: boolean;
  placeholder?: string;
}
const SurveyOffline = ({
  heading,
  subHeading,
  //   userId,
  //   token,
  //   questId,
  btnColor,
  btnTextColor,
  textColor,
  font,
  bgColor,
  supportUrl,
  onSubmit,
  delay = 1000,
  isInline = false,
  crossLogoForInput = false,
  onCancel = () => { },
  itemsPerPage = 5,
  iconColor = "#939393",
  ratingType = "number",
  offlineFormData = [],
  styleConfig = {},
  BrandTheme,
  QuestThemeData,
  showFooter = true,
}: FeedbackProps) => {
  const [rating, setRating] = useState<number>(0);
  const [thanksPopup, setThanksPopup] = useState<boolean>(false);
  const [gradient, setGradient] = useState<boolean>(false);
  const { themeConfig, apiType } = useContext(QuestContext.Context);
  const [answer, setAnswer] = useState<any>({});
  const [page, setPage] = useState(0);

  let GeneralFunctions = new General("mixpanel", apiType);
  const handleNext = () => {
    const totalPages = Math.ceil(offlineFormData.length / itemsPerPage);
    if (page < totalPages - 1) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleRatingChange = (id: string, newRating: number) => {
    setRating(newRating);
    setAnswer({
      ...answer,
      [id]: newRating,
    });
  };

  const handleComments = (id: string, msg: string) => {
    if (msg.length > 0) {
      setAnswer({
        ...answer,
        [id]: msg,
      });
    } else {
      setAnswer({
        ...answer,
        [id]: "none",
      });
    }
    returnAnswers();
  };

  useEffect(() => {
    GeneralFunctions.fireTrackingEvent(
      "quest_survey_offline_loaded",
      "survey_offline"
    );
    if (bgColor) {
      setGradient(
        bgColor?.includes("linear-gradient") ||
        bgColor?.includes("radial-gradient")
      );
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
  };

  function returnAnswers() {
    GeneralFunctions.fireTrackingEvent(
      "quest_survey_offline_form_submitted",
      "survey_offline"
    );
    setThanksPopup(true);
    onSubmit && onSubmit();
  }

  function isValidEmail(email: string) {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email);
  }

  const normalInput = (
    question: string,
    criteriaId: string,
    type: string,
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
          type={type === "number" ? "number" : "text"}
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
          placeholder={placeholder}
        />
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
          {`${question} ${!!required ? "*" : ""}`}
        </Label>
        <MultiChoiceTwo
          options={options}
          checked={!!answer[criteriaId] && answer[criteriaId]}
          onChange={(e) => handleUpdate(e, criteriaId, "", "check")}
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
              BrandTheme?.primaryColor ||
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
    if (offlineFormData?.length > 0) {
      for (let i = 0; i < itemsPerPage; i++) {
        let questionNo = page * itemsPerPage + i;
        if (
          offlineFormData[questionNo]?.type === "RATING" &&
          offlineFormData[questionNo]?.required &&
          answer[offlineFormData[questionNo]?.criteriaId || 0] > 0
        ) {
          setGoToNextSection(true);
        } else if (!offlineFormData[questionNo]?.required) {
          setGoToNextSection(true);
        } else if (
          offlineFormData[questionNo]?.required &&
          answer[offlineFormData[questionNo]?.criteriaId || 0]?.length > 0
        ) {
          setGoToNextSection(true);
        } else {
          setGoToNextSection(false);
          break;
        }
      }
    }
  }, [answer, offlineFormData, page, answer, check]);

  const handleThanks = () => {
    setThanksPopup(false);
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
          QuestThemeData?.borderRadius ||
          BrandTheme?.borderRadius,
        height: styleConfig?.Form?.height || "auto",
        fontFamily:
          BrandTheme?.fontFamily ||
          themeConfig.fontFamily ||
          "'Figtree', sans-serif",
        ...styleConfig?.Form,
      }}
      className="q-feedback-cont"
      id="q-surveyOffline"
    >
      {offlineFormData.length > 0 && (
        <>
          {!thanksPopup && (
            <div>
              <TopBar
                heading={heading || ""}
                description={subHeading || ""}
                style={{
                  headingStyle: {
                    color:
                      styleConfig?.Heading?.color ||
                      BrandTheme?.titleColor ||
                      BrandTheme?.primaryColor ||
                      themeConfig?.primaryColor,
                    ...styleConfig?.Heading,
                  },
                  descriptionStyle: {
                    color:
                      styleConfig?.Description?.color ||
                      BrandTheme?.secondaryColor ||
                      themeConfig?.secondaryColor,
                    ...styleConfig?.Description,
                  },
                  iconStyle: { display: "none" },
                }}
              />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  offlineFormData.length / itemsPerPage <= page + 1
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
                {offlineFormData
                  .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
                  .map((data: any) => {
                    if (data.type === "USER_INPUT_TEXT") {
                      return normalInput(
                        data.question || "",
                        data.criteriaId || "",
                        "text",
                        data.required || false,
                        data.placeholder || undefined
                      );
                    } else if (data.type === "USER_INPUT_EMAIL") {
                      return emailInput(
                        data.question || "",
                        data.criteriaId || "",
                        data?.required || false,
                        data.placeholder || undefined
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
                        data?.required || false,
                        data.placeholder || undefined
                      );
                    } else if (data.type === "RATING") {
                      return (
                        <div className="mb">
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
                            {`${data.question ? data.question : "Rating Scale"
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
                              defaultRating={rating}
                              type={ratingType}
                              RatingStyle={styleConfig?.Rating}
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
                        data?.required || false,
                        data.placeholder || undefined
                      );
                    }
                  })}
                <div className="q_feedback_buttons">
                  <div
                    onClick={() => {
                      GeneralFunctions.fireTrackingEvent(
                        "quest_survey_offline_secondary_button_clicked",
                        "survey_offline"
                      );
                      0 == page ? onCancel() : setPage((c) => c - 1);
                    }}
                    className="q-fdov-btn-cancel"
                  >
                    {0 == page ? "Cancel" : "Previous"}
                  </div>

                  <PrimaryButton
                    style={{
                      background:
                        styleConfig?.PrimaryButton?.background ||
                        QuestThemeData?.buttonColor ||
                        BrandTheme?.buttonColor ||
                        themeConfig?.buttonColor ||
                        btnColor,
                      color: btnTextColor,
                      fontFamily: font,
                      border:
                        styleConfig?.PrimaryButton?.border ||
                        "1.5px solid #afafaf",
                      ...styleConfig?.PrimaryButton,
                    }}
                    onClick={() => {
                      GeneralFunctions.fireTrackingEvent(
                        "quest_survey_primary_button_clicked",
                        "survey"
                      );
                    }}
                    children={`${offlineFormData.length / itemsPerPage <= page + 1
                        ? "Submit"
                        : "Next"
                      }`}
                    type="submit"
                    disabled={!goToNextSection}
                  />
                </div>
              </form>
              {showFooter && (
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
          )}
        </>
      )}
    </div>
  );
};

export default SurveyOffline;
