import "./GamifiedQuiz.css";
import GamifiedQuizTaskLogo from "../../assets/images/GamifiedQuizTaskLogo.svg";
import CancelButton from "../../assets/images/CancelButton.svg";
import SubmitConfirmButton from "../../assets/images/SubmitConfirmButton.svg";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import QuestContext from "../QuestWrapper";
import Cookies from "universal-cookie";
import axios from "axios";
import config from "../../config";
import { Input, logoType } from "../Modules/Input";
import { PrimaryButton } from "../Modules/PrimaryButton";
import TextArea from "../Modules/TextArea";
import Label from "../Modules/Label";
import {
  Phone,
  SingleChoiceSVG,
  SingleChoiceSelectedSVG,
  MultiChoiceSelectedSVG,
  MultiChoiceSVG,
} from "./SVG";

interface GamifiedQuizProps {
  userId: string;
  token: string;
  questId: string;
  uniqueUserId?: string;
  uniqueEmailId?: string;
  heading?: string;

  showFooter?: boolean;
  thanksPopUpFooter?: boolean;

  questionSections: number[][];
  sectionSubHeading: string[];
  sectionHeading: string[];

  styleConfig?: {
    Heading?: React.CSSProperties;
    ComponentTheme?: React.CSSProperties;
    FormContainer?: React.CSSProperties;
    Input?: React.CSSProperties;
    Question?: React.CSSProperties;
    TextArea?: React.CSSProperties;
    PrimaryButton?: React.CSSProperties;
    SecondaryButton?: React.CSSProperties;
    Modal?: React.CSSProperties;
    Footer?: React.CSSProperties;
    FooterText?: React.CSSProperties;
    ThanksPopup?: React.CSSProperties;
    ThanksPopupHeading?: React.CSSProperties;
    ThanksPopupDescription?: React.CSSProperties;
    ThanksPopUpFooter?: React.CSSProperties;
    ThanksPopUpGotoHome?: React.CSSProperties;
    OptionsSelectedColor?: React.CSSProperties;
  };
  gamifiedQuiz?: boolean;
  setGamifiedQuiz: Dispatch<SetStateAction<boolean>>;
}
interface FormData {
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

const GamifiedQuiz: React.FC<GamifiedQuizProps> = ({
  userId,
  token,
  questId,
  uniqueUserId,
  uniqueEmailId,
  heading,

  styleConfig,
  showFooter,
  thanksPopUpFooter,

  sectionSubHeading,
  sectionHeading,
  questionSections,
  setGamifiedQuiz,
  gamifiedQuiz,
}) => {
  const { apiKey, apiSecret, entityId, featureFlags, apiType, themeConfig } =
    useContext(QuestContext.Context);

  const cookies = new Cookies();
  const [formdata, setFormdata] = useState<FormData[] | []>([]);
  const [answer, setAnswer] = useState<Record<string, string | Array<string>>>(
    {}
  );
  let BACKEND_URL =
    apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL;

  const [sectionNo, setSectionNo] = useState<number>(0);

  useEffect(() => {
    if (entityId) {
      let externalUserId = cookies.get("externalUserId");
      let questUserId = cookies.get("questUserId");
      let questUserToken = cookies.get("questUserToken");
      // let personalUserId = JSON.parse(localStorage.getItem("persana-user") || "{}");

      const headers = {
        apiKey: apiKey,
        // apisecret: apiSecret,
        userId: userId,
        token: token, // Replace with your actual token
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
        let header = { ...headers, ...{ questUserId, questUserToken } };
        axios.post(
          `${BACKEND_URL}api/entities/${entityId}/users/${questUserId}/metrics/onboarding-view?userId=${questUserId}&questId=${questId}`,
          { count: 1 },
          { headers: header }
        );
      } else if (!!uniqueUserId) {
        axios
          .post(`${BACKEND_URL}api/users/external/login`, body, { headers })
          .then((res) => {
            let { userId, token } = res.data;
            let header = { ...headers, ...{ userId, token } };

            const date = new Date();
            date.setHours(date.getHours() + 12);
            cookies.set("externalUserId", uniqueUserId, {
              path: "/",
              expires: date,
            });
            cookies.set("questUserId", userId, { path: "/", expires: date });
            cookies.set("questUserToken", token, { path: "/", expires: date });
            axios.post(
              `${BACKEND_URL}api/entities/${entityId}/users/${userId}/metrics/onboarding-view?userId=${userId}&questId=${questId}`,
              { count: 1 },
              { headers: header }
            );
          });
      }

      const getQuestData = async function getQuestData(
        userId: string,
        headers: object
      ) {
        // (loadingTracker && setLoading(true));

        const url = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}/criterias?userId=${userId}`;

        // const { data } = await axios.get(url, { headers: headers });
        const { data } = await axios.get(url, { headers: headers });
        console.log(data);
        let criterias = data?.data?.eligibilityData.map(
          (criteria: {
            criteriaType: string;
            metadata: {
              title: string;
              options: string[];
              isRequired: string;
              placeholder: string;
              linkActionName: string;
              linkActionUrl: string;
              manualInput: string;
            };
            criteriaId: string;
          }) => {
            // console.log(criteria?.metadata?.isRequired)
            return {
              type: criteria?.criteriaType,
              question: criteria?.metadata?.title,
              options: criteria?.metadata?.options || [],
              criteriaId: criteria?.criteriaId,
              required: criteria?.metadata?.isRequired,
              placeholder: criteria?.metadata?.placeholder,
              // linkTitle: criteria?.metadata?.linkActionName || "",
              // linkUrl: criteria?.metadata?.linkActionUrl || "",
              // manualInput: criteria?.metadata?.manualInput || false,
            };
          }
        );
        if (criterias?.length > 0) {
          setFormdata([...criterias]);
        } else {
          setFormdata([]);
        }
      };
      getQuestData(userId, headers);
    }
  }, []);

  const MultipleChoice = ({
    onClick,
    selectedValue,
    options,
  }: {
    index: number;
    onClick: (option: string) => void;
    selectedValue: string | Array<string>;
    options: Array<string>;
  }) => {
    // console.log(selectedValue)
    return (
      <div>
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => onClick(option)}
            className={`gamified-quiz-header-ques-options ${
              selectedValue.includes(option) ? "selected-option" : ""
            }`}
          >
            <p>{option}</p>
          </div>
        ))}
      </div>
    );
  };

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, Array<string>>
  >({});

  const [isSelected, setIsSelected] = useState(false);

  const [change, setChange] = useState(true);
  const [checkChange, setCheckChange] = useState(true);

  const handleCheckboxChange = (option: string, criteriaId: string): void => {
    if (selectedOptions[criteriaId]?.includes(option)) {
      setSelectedOptions((prev) => {
        return {
          ...prev,
          [criteriaId]: prev[criteriaId].filter((e) => e != option),
        };
      });
    } else {
      if (Array.isArray(selectedOptions[criteriaId])) {
        selectedOptions[criteriaId] = [...selectedOptions[criteriaId], option];
      } else {
        selectedOptions[criteriaId] = [];
        selectedOptions[criteriaId] = [...selectedOptions[criteriaId], option];
      }
    }
    setCheckChange((prev) => !prev);
  };

  const handleRadioChange = (option: string, criteriaId: string): void => {
    if (answer[criteriaId]?.includes(option)) {
      setAnswer((prev) => {
        return { ...prev, [criteriaId]: (prev[criteriaId] = []) };
      });
    } else {
      answer[criteriaId] = [];
      answer[criteriaId] = [...answer[criteriaId], option];
    }
    setChange((prev) => !prev);
    setIsSelected((prev) => !prev);
  };

  const [goToNextSection, setGoToNextSection] = useState(false);

  useEffect(() => {
    for (let i = 0; i < questionSections[sectionNo].length; i++) {
      if (!formdata[questionSections[sectionNo][i] - 1]?.required) {
      } else if (
        answer[formdata[questionSections[sectionNo][i] - 1]?.criteriaId]
          ?.length > 0 &&
        formdata[questionSections[sectionNo][i] - 1]?.required
      ) {
        setGoToNextSection(true);
      } else {
        setGoToNextSection(false);
        break;
      }
    }

    for (let i = 0; i < questionSections[sectionNo].length; i++) {
      if (!formdata[questionSections[sectionNo][i] - 1]?.required) {
      } else if (
        answer[formdata[questionSections[sectionNo][i] - 1]?.criteriaId]
          ?.length > 0 &&
        formdata[questionSections[sectionNo][i] - 1]?.required
      ) {
        setGoToNextSection(true);
      } else {
        setGoToNextSection(false);
        break;
      }
    }

    for (let i = 0; i < questionSections[sectionNo].length; i++) {
      if (
        formdata[questionSections[sectionNo][i] - 1]?.type ===
        "USER_INPUT_MULTI_CHOICE"
      ) {
        const ansOptions =
          selectedOptions[
            formdata[questionSections[sectionNo][i] - 1]?.criteriaId
          ];
        if (!formdata[questionSections[sectionNo][i] - 1]?.required) {
        } else if (
          ansOptions?.length > 0 &&
          formdata[questionSections[sectionNo][i] - 1]?.required
        ) {
          setGoToNextSection(true);
        } else {
          setGoToNextSection(false);
          break;
        }
      }
    }
  }, [answer, sectionNo, change, sectionNo, checkChange, sectionNo]);

  const MultiChoice = ({ value }: { value: FormData }) => {
    return (
      <div className="gamified-quiz-header-ques-options">
        {value?.options.map((option, index) => {
          const SelectedBorder = {
            border: `2px solid ${styleConfig?.OptionsSelectedColor?.color}`,
            // color: styleConfig?.OptionsSelectedColor?.color
          };
          const SelectedOptionColor = {
            color: styleConfig?.OptionsSelectedColor?.color,
          };
          return (
            <div
              key={index}
              onClick={() => handleCheckboxChange(option, value.criteriaId)}
              className={`${
                selectedOptions[value?.criteriaId]?.includes(option)
                  ? "selected-option"
                  : "not-selected"
              }`}
              style={
                selectedOptions[value?.criteriaId]?.includes(option)
                  ? SelectedBorder
                  : {}
              }
            >
              {selectedOptions[value?.criteriaId]?.includes(option)
                ? MultiChoiceSelectedSVG(
                    styleConfig?.OptionsSelectedColor?.color
                  )
                : MultiChoiceSVG()}
              <p
                style={
                  selectedOptions[value?.criteriaId]?.includes(option)
                    ? SelectedOptionColor
                    : {}
                }
              >
                {option}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  const SingleChoice = ({ value }: { value: FormData }) => {
    return (
      <div className="gamified-quiz-header-ques-options">
        {value?.options.map((option, index) => {
          const SelectedBorder = {
            border: `2px solid ${styleConfig?.OptionsSelectedColor?.color}`,
          };
          const SelectedOptionColor = {
            color: styleConfig?.OptionsSelectedColor?.color,
          };

          return (
            <div
              key={index}
              onClick={() => handleRadioChange(option, value.criteriaId)}
              className={`${
                answer[value?.criteriaId]?.includes(option)
                  ? "selected-option"
                  : "not-selected"
              }`}
              style={
                answer[value?.criteriaId]?.includes(option)
                  ? SelectedBorder
                  : {}
              }
            >
              {answer[value?.criteriaId]?.includes(option)
                ? SingleChoiceSelectedSVG(
                    styleConfig?.OptionsSelectedColor?.color
                  )
                : SingleChoiceSVG()}
              <p
                style={
                  answer[value?.criteriaId]?.includes(option)
                    ? SelectedOptionColor
                    : {}
                }
              >
                {" "}
                {option}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  const [thanksPopup, setThanksPopup] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState(
    "Thanks for submitting your feedback with us. We appreciate your review and will assure you to surely consider them"
  );
  const [popUpHead, setPopUpHead] = useState("Feedback Submitted");
  //   const [gamifiedQuiz, setGamifiedQuiz] = useState(true);

  const formSubmitHandler = () => {
    setGamifiedQuiz(false);
    for (const key in selectedOptions) {
      if (selectedOptions.hasOwnProperty(key)) {
        answer[key] = selectedOptions[key];
      }
    }
    let criterias = Object.keys(answer).map((key: string) => ({
      criteriaId: key,
      answer: typeof answer[key] === "object" ? answer[key] : [answer[key]],
      question:
        formdata[formdata.findIndex((ele) => ele.criteriaId == key)].question,
    }));

    let headers = {
      apikey: apiKey,
      apisecret: apiSecret,
      userId: uniqueUserId || userId,
      token: token,
    };
    const data = axios
      .post(
        `${BACKEND_URL}api/entities/${entityId}/quests/${questId}/verify-all?userId=${headers.userId}`,
        { criterias, userId: headers.userId },
        { headers }
      )
      .then((res) => {
        setThanksPopup(res.data.success);
        if (res.data.success) {
          setThanksPopup(res.data.success);
        } else {
          setPopUpHead("Feedback Not Submitted");
          setPopUpMessage(res.data.error);
          setThanksPopup(true);
        }
      })
      .catch((e) => {
        console.log("error", e);
      });
  };

  const handleUpdate = (e: any, criteriaId: string, j: string) => {
    setAnswer((prev) => {
      return { ...prev, [criteriaId]: e.target.value };
    });
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
        {/* {
                    (customComponentPositions == index + 1) &&
                    <div style={{ paddingBottom: "12px" }}>
                        {customComponents}
                    </div>
                } */}
        <p className="label-inputs">{`${question}${required ? "*" : ""}`}</p>

        <Input
          type={inputType}
          placeholder={placeholder}
          value={answer[criteriaId] as string}
          iconColor={
            styleConfig?.Input?.color || themeConfig?.primaryColor || "black"
          }
          onChange={(e) => handleUpdate(e, criteriaId, "")}
          style={{
            borderColor:
              styleConfig?.Input?.borderColor || themeConfig?.borderColor,
            color: styleConfig?.Input?.color || themeConfig?.primaryColor,
            ...styleConfig?.Input,
          }}
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
        {/* {
                    (customComponentPositions == index + 1) &&
                    <div style={{ paddingBottom: "12px" }}>
                        {customComponents}
                    </div>
                } */}
        {/* <Label htmlFor="dateInput" style={{ color: styleConfig?.Label?.color || themeConfig?.primaryColor, ...styleConfig?.Label }}>
                    {`${question} ${!!required && "*"}`}
                </Label> */}
        <p className="label-inputs">{`${question}${required ? "*" : ""}`}</p>
        <Input
          type={"date"}
          placeholder={placeholder}
          value={answer[criteriaId] as string}
          onChange={(e) => handleUpdate(e, criteriaId, "")}
          style={{
            borderColor:
              styleConfig?.Input?.borderColor || themeConfig?.borderColor,
            color: styleConfig?.Input?.color || themeConfig?.primaryColor,
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
        {/* {
                    (customComponentPositions == index + 1) &&
                    <div style={{ paddingBottom: "12px" }}>
                        {customComponents}
                    </div>
                } */}
        {/* <Label htmlFor="textAreaInput" style={{ color: styleConfig?.Label?.color || themeConfig?.primaryColor, ...styleConfig?.Label }}>
                    {`${question} ${!!required && "*"}`}
                </Label> */}
        <p className="label-inputs">{`${question}${required ? "*" : ""}`}</p>
        <TextArea
          onChange={(e) => handleUpdate(e, criteriaId, "")}
          placeholder={placeholder}
          value={answer[criteriaId] as string}
          style={{
            borderColor:
              styleConfig?.TextArea?.borderColor || themeConfig?.borderColor,
            color: styleConfig?.TextArea?.color || themeConfig?.primaryColor,
            ...styleConfig?.TextArea,
          }}
        />
      </div>
    );
  };

  useEffect(() => {}, [gamifiedQuiz]);
  return (
    <>
      {thanksPopup ? (
        <div className="thanks-popup-upper-div">
          <div
            className="gamified-thanks-pop-up"
            style={styleConfig?.ThanksPopup}
          >
            <div className="gamified-pop-up-cancel-btn-cont">
              <div>
                <div onClick={() => setThanksPopup((prev) => !prev)}>
                  <img src={CancelButton} alt="" />
                </div>
              </div>
            </div>

            <div className="gamified-pop-up-image-cont">
              <img src={SubmitConfirmButton} alt="" />
            </div>

            <div className="gamified-pop-up-message-cont">
              <div className="pop-up-message">
                <div
                  className="pop-up-message-heading"
                  style={{
                    color:
                      styleConfig?.ThanksPopupHeading?.color ||
                      "var(--Neutral-Black-400, #2C2C2C)",
                  }}
                >
                  {popUpHead}
                </div>
                <div
                  className="pop-up-message-para"
                  style={{
                    color:
                      styleConfig?.ThanksPopupDescription?.color ||
                      "var(--Neutral-Black-100, #939393)",
                  }}
                >
                  {popUpMessage}
                </div>
              </div>
              <div
                className="goto-home"
                style={styleConfig?.ThanksPopUpGotoHome}
                onClick={() => setThanksPopup((prev) => !prev)}
              >
                Go to home!
              </div>
            </div>

            {thanksPopUpFooter ? (
              <div
                className="gamified-quiz-footer-section"
                style={styleConfig?.ThanksPopUpFooter}
              >
                Powered by Quest Labs
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : null}

      {gamifiedQuiz ? (
        <div className="upper-div">
          <div className="gamified-quiz">
            <div
              className="gamified-quiz-header-section"
              style={styleConfig?.ComponentTheme}
            >
              <div className="gamified-quiz-title-section">
                <div
                  className="gamified-quiz-title-head"
                  style={styleConfig?.Heading}
                >
                  {heading ? heading : "Choose an option"}
                </div>
              </div>

              <div className="div">
                <div className="gamified-quiz-header-task-logo-cont">
                  <img src={GamifiedQuizTaskLogo} alt="" />
                </div>

                <form
                  className="gamified-quiz-header-form"
                  style={styleConfig?.FormContainer}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      // gap: "20px"
                    }}
                  >
                    <div className="heading-subheading-container">
                      <div className="quest-title">
                        {sectionSubHeading[sectionNo]}
                      </div>
                      {sectionHeading[sectionNo] ? (
                        <div className="question" style={styleConfig?.Question}>
                          {sectionHeading[sectionNo]}
                        </div>
                      ) : null}
                      {/* <div className="question" style={styleConfig?.Question}>
                                                {
                                                    sectionHeading[sectionNo]
                                                }
                                            </div> */}
                    </div>

                    {questionSections[sectionNo].map((question) => {
                      question = question - 1;
                      const value: FormData = formdata[question];
                      const index: number = question;

                      return (
                        <div className="gamified-quiz-criteria-div" key={index}>
                          <div className="gamified-quiz-header-ques-title-cont">
                            <div className="question-input-cont">
                              {formdata[question]?.type ===
                                "USER_INPUT_SINGLE_CHOICE" ||
                              formdata[question]?.type ===
                                "USER_INPUT_MULTI_CHOICE" ? (
                                <div
                                  className="question"
                                  style={styleConfig?.Question}
                                >
                                  {formdata[question]?.question}
                                  {`${formdata[question]?.required ? "*" : ""}`}
                                </div>
                              ) : null}

                              {formdata[question]?.type ===
                              "USER_INPUT_TEXT" ? (
                                normalInput(
                                  value.question,
                                  value.required || false,
                                  value.criteriaId,
                                  index,
                                  value.placeholder || value.question,
                                  "text"
                                )
                              ) : formdata[question]?.type ===
                                "USER_INPUT_EMAIL" ? (
                                normalInput(
                                  value.question,
                                  value.required || false,
                                  value.criteriaId,
                                  index,
                                  value.placeholder || value.question,
                                  "email"
                                )
                              ) : formdata[question]?.type ===
                                "USER_INPUT_PHONE" ? (
                                normalInput(
                                  value.question,
                                  value.required || false,
                                  value.criteriaId,
                                  index,
                                  value.placeholder || value.question,
                                  "number"
                                )
                              ) : formdata[question]?.type ===
                                "USER_INPUT_DATE" ? (
                                dateInput(
                                  value.question,
                                  value.required || false,
                                  value.criteriaId,
                                  index,
                                  value.placeholder || value.question
                                )
                              ) : formdata[question]?.type ===
                                "USER_INPUT_TEXTAREA" ? (
                                textAreaInput(
                                  value.question,
                                  value.required || false,
                                  value.criteriaId,
                                  index,
                                  value.placeholder || value.question
                                )
                              ) : formdata[question]?.type ===
                                "USER_INPUT_MULTI_CHOICE" ? (
                                <MultiChoice value={value} />
                              ) : formdata[question]?.type ===
                                "USER_INPUT_SINGLE_CHOICE" ? (
                                <SingleChoice value={value} />
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="gamified-quiz-header-ques-cancel-next">
                    <button
                      onClick={() => {
                        if (sectionNo > 0) {
                          setSectionNo(sectionNo - 1);
                        }
                      }}
                      type="button"
                      className="cancel-btn"
                      style={{
                        background:
                          styleConfig?.SecondaryButton?.background ||
                          "var(--Neutral-White-100, #FFF)",
                        color:
                          styleConfig?.SecondaryButton?.color ||
                          "var(--Neutral-Black-400, #2C2C2C)",
                      }}
                    >
                      {sectionNo > 0 ? "Previous" : "Cancel"}
                    </button>

                    <PrimaryButton
                      type={"button"}
                      onClick={() => {
                        const totalSections = Object.keys(questionSections);

                        if (sectionNo < totalSections.length - 1) {
                          setSectionNo(sectionNo + 1);
                        } else if (sectionNo >= totalSections.length - 1) {
                          formSubmitHandler();
                        }
                      }}
                      disabled={!goToNextSection}
                      className="q-onb-main-btn2"
                      style={{
                        font: "",
                        fontFamily: "Figtree",
                        background:
                          styleConfig?.PrimaryButton?.background ||
                          "linear-gradient(84deg, #9035FF 0.36%, #0065FF 100.36%)",
                        color:
                          styleConfig?.PrimaryButton?.color ||
                          "var(--Neutral-White-100, #FFF)",

                        border: "1.5px solid #D1ACFF",
                        fontStyle: "normal",
                        fontWeight: "600",

                        lineHeight: "20px",
                      }}
                    >
                      {sectionNo >= questionSections.length - 1
                        ? "Submit"
                        : "Next"}
                    </PrimaryButton>
                  </div>
                </form>
              </div>
            </div>

            {showFooter ? (
              <div
                className="gamified-quiz-footer-section"
                style={styleConfig?.Footer}
              >
                <div className="footer-content" style={styleConfig?.FooterText}>
                  Powered by Quest Labs
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default GamifiedQuiz;
