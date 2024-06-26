import "./GamifiedQuiz.css";
import GamifiedQuizTaskLogo from "../../assets/images/GamifiedQuizTaskLogo.svg";
import { CancelButton } from "./SVG";
import SubmitConfirmButton from "../../assets/images/SubmitConfirmButton.svg";
import {
  Dispatch,
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

import {
  SingleChoiceSVG,
  SingleChoiceSelectedSVG,
  MultiChoiceSelectedSVG,
  MultiChoiceSVG,
} from "./SVG";
import General from "../../general";

interface GamifiedQuizProps {
  userId: string;
  token: string;
  questId: string;
  uniqueUserId?: string;
  uniqueEmailId?: string;
  heading?: string;
  showFooter?: boolean;
  thanksPopUpFooter?: boolean;
  questionSections?: number[][];
  sectionSubHeading?: string[];
  sectionHeading?: string[];
  feedbackContent?: {
    FeedbackHeading?: string;
    FeedbackDescription?: string;
  };
  styleConfig?: {
    Heading?: React.CSSProperties;
    Form?: React.CSSProperties;
    FormContainer?: React.CSSProperties;
    LabelColor?: React.CSSProperties;
    Input?: React.CSSProperties;
    IconColor?: React.CSSProperties;
    Question?: React.CSSProperties;
    SubHeading?: React.CSSProperties;
    TextArea?: React.CSSProperties;
    PrimaryButton?: React.CSSProperties;
    SecondaryButton?: React.CSSProperties;
    Modal?: React.CSSProperties;
    Footer?: React.CSSProperties;
    ThanksPopup?: React.CSSProperties;
    ThanksPopupHeading?: React.CSSProperties;
    ThanksPopupDescription?: React.CSSProperties;
    ThanksPopUpFooter?: React.CSSProperties;
    ThanksPopUpGotoHome?: React.CSSProperties;
    OptionsSelectedColor?: React.CSSProperties;
    EmailError?: {
      text?: string;
      errorStyle?: React.CSSProperties;
    };
  };
  gamifiedQuiz?: boolean;
  setGamifiedQuiz: Dispatch<SetStateAction<boolean>>;
  functionOnSubmit?: any;
  questions?: number;
  setQuestions?: any;
  questionsPerSection?: number;
  variation?: string;
  isV1Api?: boolean;
}

interface FormData {
  type: string;
  question: string;
  options: Array<string>;
  actionId: string;
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
  questId: campaignId,
  uniqueUserId,
  uniqueEmailId,
  heading,
  styleConfig,
  showFooter,
  thanksPopUpFooter,
  sectionSubHeading = [],
  sectionHeading = [],
  questionSections = [],
  setGamifiedQuiz,
  gamifiedQuiz,
  setQuestions,
  questionsPerSection = 2,
  functionOnSubmit,
  feedbackContent,
  variation,
  isV1Api
}) => {
  const { apiKey, apiSecret, entityId, apiType, themeConfig } = useContext(
    QuestContext.Context
  );

  const newId = isV1Api ? "criteriaId" : "actionId";

  const cookies = new Cookies();
  const [formdata, setFormdata] = useState<FormData[] | []>([]);
  const [answer, setAnswer] = useState<Record<string, string | Array<string>>>(
    {}
  );
  const [campaignVariationId, setCampaignVariationId] = useState('')
  const [totalSectionsPerSectionQuestion, setTotalSectionsPerSectionQuestion] =
    useState<number>(0);
  const [currentSection, setCurrentSection] = useState<number>(0);

  let BACKEND_URL =
    apiType == "STAGING" ? config.BACKEND_URL_STAGING : config.BACKEND_URL;

  const [sectionNo, setSectionNo] = useState<number>(0);

  let GeneralFunctions = new General("mixpanel", apiType);

  useEffect(() => {
    GeneralFunctions.fireTrackingEvent(
      "quest_gamifiedquiz_loaded",
      "gamifiedquiz"
    );

    if (entityId) {
      let externalUserId = cookies.get("externalUserId");
      let questUserId = cookies.get("questUserId");
      let questUserToken = cookies.get("questUserToken");

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
        let header = { ...headers, ...{ questUserId, questUserToken } };
        try {
          axios.post(
            `${BACKEND_URL}api/entities/${entityId}/users/${questUserId}/metrics/onboarding-view?userId=${questUserId}&campaignId=${campaignId}`,
            { count: 1 },
            { headers: header }
          );
        } catch (error) {
          GeneralFunctions.captureSentryException(error);
        }
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
            try {
              axios.post(
                `${BACKEND_URL}api/entities/${entityId}/users/${userId}/metrics/onboarding-view?userId=${userId}&campaignId=${campaignId}`,
                { count: 1 },
                { headers: header }
              );
            } catch (error) {
              GeneralFunctions.captureSentryException(error);
            }
          })
          .catch((error) => {
            GeneralFunctions.captureSentryException(error);
          });
      }

      const getQuestData = async function getQuestData(
        userId: string,
        headers: object
      ) {
        let params = new URLSearchParams()
        params.set('platform', 'REACT')
        if (variation) params.set('variation', variation)

        const url = `${BACKEND_URL}api/v2/entities/${entityId}/campaigns/${campaignId}?${params.toString()}`;

        try {
          const { data } = await axios.get(url, { headers: headers });

          setQuestions(data.data.actions.length);

          let actions = data?.data?.actions.map(
            (action: any) => {
              return {
                type: action?.actionType,
                question: action?.title,
                options: action?.options || [],
                actionId: action?.actionId,
                required: action?.isRequired,
                placeholder: action?.metadata?.placeholder,
              };
            }
          );

          if (questionsPerSection > 0) {
            setTotalSectionsPerSectionQuestion(
              Math.ceil(
                data.data.actions.length / questionsPerSection
              )
            );
          }

          if (actions?.length > 0) {
            setFormdata([...actions]);
          } else {
            setFormdata([]);
          }
          setCampaignVariationId(data.data.campaignVariationId)
        } catch (error) {
          console.log(error)
          GeneralFunctions.captureSentryException(error);
        }
      };

      const getQuestDataV1 = async function getQuestData(
        userId: string,
        headers: object
      ) {
        const url = `${BACKEND_URL}api/entities/${entityId}/quests/${campaignId}/criterias?userId=${userId}&getVariation=${variation || false}`;
        const { data } = await axios.get(url, { headers: headers });
        setQuestions(data.data.eligibilityCriterias.length);
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
            return {
              type: criteria?.criteriaType,
              question: criteria?.metadata?.title,
              options: criteria?.metadata?.options || [],
              criteriaId: criteria?.criteriaId,
              required: criteria?.metadata?.isRequired,
              placeholder: criteria?.metadata?.placeholder,
            };
          }
        );
        if (questionsPerSection > 0) {
          setTotalSectionsPerSectionQuestion(
            Math.ceil(
              data.data.eligibilityCriterias.length / questionsPerSection
            )
          );
        }
        if (criterias?.length > 0) {
          setFormdata([...criterias]);
        } else {
          setFormdata([]);
        }

      }
      if (isV1Api) {
        getQuestDataV1(userId, headers)
      } else {
        getQuestData(userId, headers);
      }
    }
  }, []);

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, Array<string>>
  >({});

  const [change, setChange] = useState(true);
  const [checkChange, setCheckChange] = useState(true);

  const handleCheckboxChange = (option: string, actionId: string): void => {
    if (selectedOptions[actionId]?.includes(option)) {
      setSelectedOptions((prev) => {
        return {
          ...prev,
          [actionId]: prev[actionId].filter((e) => e != option),
        };
      });
    } else {
      if (Array.isArray(selectedOptions[actionId])) {
        selectedOptions[actionId] = [...selectedOptions[actionId], option];
      } else {
        selectedOptions[actionId] = [];
        selectedOptions[actionId] = [...selectedOptions[actionId], option];
      }
    }
    setCheckChange((prev) => !prev);
  };

  const handleRadioChange = (option: string, actionId: string): void => {
    if (answer[actionId]?.includes(option)) {
      setAnswer((prev) => {
        return { ...prev, [actionId]: (prev[actionId] = []) };
      });
    } else {
      answer[actionId] = [];
      answer[actionId] = [...answer[actionId], option];
    }
    setChange((prev) => !prev);
  };

  const [goToNextSection, setGoToNextSection] = useState(false);

  useEffect(() => {
    if (questionSections?.length > 0) {
      for (let i = 0; i < questionSections[sectionNo].length; i++) {
        if (
          formdata[questionSections[sectionNo][i] - 1]?.type ===
          "USER_INPUT_MULTI_CHOICE"
        ) {
          const ansOptions =
            selectedOptions[
            formdata[questionSections[sectionNo][i] - 1][newId]
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
        } else if (!formdata[questionSections[sectionNo][i] - 1]?.required) {
        } else if (
          answer[formdata[questionSections[sectionNo][i] - 1][newId]]
            ?.length > 0 &&
          formdata[questionSections[sectionNo][i] - 1]?.required
        ) {
          setGoToNextSection(true);
        } else {
          setGoToNextSection(false);
          break;
        }
      }
    } else {
      for (let i = 0; i < questionsPerSection; i++) {
        let queNo = currentSection * questionsPerSection + i;
        if (formdata[queNo]?.type === "USER_INPUT_MULTI_CHOICE") {
          const ansOptions = selectedOptions[formdata[queNo][newId]];
          if (!formdata[queNo]?.required) {
          } else if (ansOptions?.length > 0 && formdata[queNo]?.required) {
            setGoToNextSection(true);
          } else {
            setGoToNextSection(false);
            break;
          }
        } else if (!formdata[queNo]?.required) {
        } else if (
          answer[formdata[queNo][newId]]?.length > 0 &&
          formdata[queNo]?.required
        ) {
          setGoToNextSection(true);
        } else {
          setGoToNextSection(false);
          break;
        }
      }
    }
  }, [
    answer,
    sectionNo,
    change,
    sectionNo,
    checkChange,
    sectionNo,
    currentSection,
  ]);

  const MultiChoice = ({ value }: { value: FormData }) => {
    return (
      <div className="gamified-quiz-header-ques-options multi-option">
        {value?.options.map((option, index) => {
          const SelectedBorder = {
            border: `2px solid ${styleConfig?.OptionsSelectedColor?.color}`,
            fontFamily: themeConfig?.fontFamily,
          };
          const SelectedOptionColor = {
            color: styleConfig?.OptionsSelectedColor?.color,
            fontFamily: themeConfig?.fontFamily,
          };
          return (
            <div
              key={index}
              onClick={() => handleCheckboxChange(option, value[newId])}
              className={`${selectedOptions[value[newId]]?.includes(option)
                ? "selected-option"
                : "not-selected"
                }`}
              style={
                selectedOptions[value[newId]]?.includes(option)
                  ? SelectedBorder
                  : { borderColor: themeConfig?.borderColor }
              }
            >
              {selectedOptions[value[newId]]?.includes(option)
                ? MultiChoiceSelectedSVG(
                  styleConfig?.OptionsSelectedColor?.color
                )
                : MultiChoiceSVG(themeConfig?.borderColor)}
              <p
                style={
                  selectedOptions[value[newId]]?.includes(option)
                    ? SelectedOptionColor
                    : {
                      color: themeConfig?.primaryColor,
                      fontFamily: themeConfig?.fontFamily,
                    }
                }
              >
                {option}
              </p>
            </div>
          );
        })
        }
      </div >
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
            fontFamily: themeConfig?.fontFamily,
          };

          return (
            <div
              key={index}
              onClick={() => handleRadioChange(option, value[newId])}
              className={`${answer[value[newId]]?.includes(option)
                ? "selected-option"
                : "not-selected"
                }`}
              style={
                answer[value[newId]]?.includes(option)
                  ? SelectedBorder
                  : {
                    borderColor: themeConfig?.borderColor,
                  }
              }
            >
              {answer[value[newId]]?.includes(option)
                ? SingleChoiceSelectedSVG(
                  styleConfig?.OptionsSelectedColor?.color
                )
                : SingleChoiceSVG(themeConfig?.borderColor)}
              <p
                style={
                  answer[value[newId]]?.includes(option)
                    ? SelectedOptionColor
                    : {
                      color: themeConfig?.primaryColor,
                      fontFamily: themeConfig?.fontFamily,
                    }
                }
              >
                {" "}
                {option}
              </p>
            </div>
          );
        })
        }
      </div >
    );
  };

  const [thanksPopup, setThanksPopup] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState(
    "Thanks for submitting your feedback with us. We appreciate your review and will assure you to surely consider them"
  );
  const [popUpHead, setPopUpHead] = useState("Feedback Submitted");

  const formSubmitHandler = () => {
    GeneralFunctions.fireTrackingEvent(
      "quest_gamifiedquiz_submit_button_clicked",
      "gamifiedquiz"
    );
    for (const key in selectedOptions) {
      if (selectedOptions.hasOwnProperty(key)) {
        answer[key] = selectedOptions[key];
      }
    }
    if (!isV1Api) {

      let actions = Object.keys(answer).map((key: string) => ({
        actionId: key,
        answers: Array.isArray(answer[key]) ? answer[key] : [answer[key]],
      }));

      let headers = {
        apikey: apiKey,
        apisecret: apiSecret,
        userId: uniqueUserId || userId,
        token: token,
      };

      const data = axios
        .post(
          `${BACKEND_URL}api/v2/entities/${entityId}/campaigns/${campaignId}/verify`,
          { actions, campaignVariationId },
          { headers }
        )
        .then((res) => {
          functionOnSubmit?.();
          setThanksPopup(res.data.success);
          if (res.data.success) {
            setThanksPopup(res.data.success);
          } else {
            setPopUpHead("Feedback Not Submitted");
            setPopUpMessage(res.data.error);
            setThanksPopup(true);
          }
        })
        .catch((error) => {
          GeneralFunctions.captureSentryException(error);
          console.log("error", error);
        });
    }
    else {
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
          `${BACKEND_URL}api/entities/${entityId}/quests/${campaignId}/verify-all?userId=${headers.userId}`,
          { criterias, userId: headers.userId },
          { headers }
        )
        .then((res) => {
          functionOnSubmit?.();
          setThanksPopup(res.data.success);
          if (res.data.success) {
            setThanksPopup(res.data.success);
          } else {
            setPopUpHead("Feedback Not Submitted");
            setPopUpMessage(res.data.error);
            setThanksPopup(true);
          }
        })
        .catch((error) => {
          GeneralFunctions.captureSentryException(error);
          console.log("error", error);
        });
    }
  };

  const handleUpdate = (e: any, actionId: string, j: string) => {
    setAnswer((prev) => {
      return { ...prev, [actionId]: e.target.value };
    });
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
        <p
          className="label-inputs"
          style={{
            color: styleConfig?.LabelColor?.color || themeConfig?.primaryColor,
            fontFamily: themeConfig?.fontFamily,
          }}
        >{`${question}${required ? "*" : ""}`}</p>

        <Input
          type={inputType}
          placeholder={placeholder}
          value={answer[actionId] as string}
          iconColor={styleConfig?.IconColor?.color}
          onChange={(e) => handleUpdate(e, actionId, "")}
          style={{
            borderColor:
              styleConfig?.Input?.borderColor || themeConfig?.borderColor,
            color: styleConfig?.Input?.color || themeConfig?.primaryColor,
            // ...styleConfig?.Input,
          }}
          emailtext={
            styleConfig?.EmailError?.text == undefined
              ? "Invalid email format"
              : styleConfig?.EmailError?.text
          }
          emailErrorStyle={{
            fontFamily: themeConfig?.fontFamily || "Figtree",
            ...styleConfig?.EmailError?.errorStyle,
          }}
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
        <p
          className="label-inputs"
          style={{
            color: styleConfig?.LabelColor?.color || themeConfig?.primaryColor,
            fontFamily: themeConfig?.fontFamily || "Figtree",
          }}
        >{`${question}${required ? "*" : ""}`}</p>
        <Input
          type={"date"}
          placeholder={placeholder}
          value={answer[actionId] as string}
          onChange={(e) => handleUpdate(e, actionId, "")}
          iconColor={styleConfig?.IconColor?.color}
          style={{
            borderColor:
              styleConfig?.Input?.borderColor || themeConfig?.borderColor,
            color: styleConfig?.Input?.color || themeConfig?.primaryColor,
            fontFamily: themeConfig?.fontFamily || "Figtree",
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
        <p
          className="label-inputs"
          style={{
            color: styleConfig?.LabelColor?.color || themeConfig?.primaryColor,
            fontFamily: themeConfig?.fontFamily,
          }}
        >{`${question}${required ? "*" : ""}`}</p>
        <TextArea
          onChange={(e) => handleUpdate(e, actionId, "")}
          placeholder={placeholder}
          value={answer[actionId] as string}
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

  useEffect(() => { }, [gamifiedQuiz]);

  const QuestionArray = [];

  for (let i = 0; i < questionsPerSection; i++) {
    let question = currentSection * questionsPerSection + i;
    let value = formdata[question];
    let index = question;

    QuestionArray.push(
      <div className="gamified-quiz-action-div" key={index}>
        <div className="gamified-quiz-header-ques-title-cont">
          <div className="question-input-cont">
            {formdata[question]?.type === "USER_INPUT_SINGLE_CHOICE" ||
              formdata[question]?.type === "USER_INPUT_MULTI_CHOICE" ? (
              <div
                className="question"
                style={{
                  fontFamily: themeConfig?.fontFamily,
                  ...styleConfig?.Question,
                  color:
                    styleConfig?.Question?.color || themeConfig?.primaryColor,
                }}
              >
                {formdata[question]?.question}
                {`${formdata[question]?.required ? "*" : ""}`}
              </div>
            ) : null}

            {formdata[question]?.type === "USER_INPUT_TEXT" ? (
              normalInput(
                value.question,
                value.required || false,
                value[newId],
                index,
                value.placeholder || value.question,
                "text"
              )
            ) : formdata[question]?.type === "USER_INPUT_EMAIL" ? (
              normalInput(
                value.question,
                value.required || false,
                value[newId],
                index,
                value.placeholder || value.question,
                "email"
              )
            ) : (formdata[question]?.type === "USER_INPUT_PHONE") || (formdata[question]?.type === "USER_INPUT_NUMBER") ? (
              normalInput(
                value.question,
                value.required || false,
                value[newId],
                index,
                value.placeholder || value.question,
                "number"
              )
            ) : formdata[question]?.type === "USER_INPUT_DATE" ? (
              dateInput(
                value.question,
                value.required || false,
                value[newId],
                index,
                value.placeholder || value.question
              )
            ) : formdata[question]?.type === "USER_INPUT_TEXTAREA" ? (
              textAreaInput(
                value.question,
                value.required || false,
                value[newId],
                index,
                value.placeholder || value.question
              )
            ) : formdata[question]?.type === "USER_INPUT_MULTI_CHOICE" ? (
              <MultiChoice value={value} />
            ) : formdata[question]?.type === "USER_INPUT_SINGLE_CHOICE" ? (
              <SingleChoice value={value} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {thanksPopup ? (
        <div className="thanks-popup-upper-div">
          <div
            className="gamified-thanks-pop-up"
            style={{
              background:
                styleConfig?.ThanksPopup?.background ||
                themeConfig?.backgroundColor,
              fontFamily: themeConfig?.fontFamily,
            }}
          >
            <div className="gamified-pop-up-cancel-btn-cont">
              <div>
                <div
                  onClick={() => {
                    GeneralFunctions.fireTrackingEvent(
                      "quest_gamifiedquiz_feedback_close_button_clicked",
                      "gamifiedquiz"
                    );
                    setGamifiedQuiz(false);
                    setThanksPopup(false);
                  }}
                  style={{
                    background: styleConfig?.ThanksPopUpFooter?.background,
                  }}
                >
                  {CancelButton(styleConfig?.IconColor?.color)}
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
                      themeConfig?.primaryColor ||
                      "var(--Neutral-Black-400, #2C2C2C)",
                    fontFamily: themeConfig?.fontFamily,
                  }}
                >
                  {feedbackContent?.FeedbackHeading || popUpHead}
                </div>
                <div
                  className="pop-up-message-para"
                  style={{
                    color:
                      styleConfig?.ThanksPopupDescription?.color ||
                      themeConfig?.secondaryColor ||
                      "var(--Neutral-Black-100, #939393)",
                    fontFamily: themeConfig?.fontFamily,
                  }}
                >
                  {feedbackContent?.FeedbackDescription || popUpMessage}
                </div>
              </div>
              <div
                className="goto-home"
                style={{
                  borderColor:
                    styleConfig?.ThanksPopUpGotoHome?.borderColor ||
                    themeConfig?.borderColor,
                  background: styleConfig?.ThanksPopUpGotoHome?.background,
                  color: styleConfig?.ThanksPopUpGotoHome?.color,
                }}
                onClick={() => {
                  GeneralFunctions.fireTrackingEvent(
                    "quest_gamifiedquiz_feedback_gotohome_button_clicked",
                    "gamifiedquiz"
                  );
                  setThanksPopup((prev) => !prev);
                }}
              >
                Go to home!
              </div>
            </div>

            {thanksPopUpFooter ? (
              <div
                className="gamified-quiz-footer-section"
                style={{
                  background: styleConfig?.ThanksPopUpFooter?.background,
                  color:
                    styleConfig?.ThanksPopUpFooter?.color ||
                    themeConfig?.secondaryColor,
                  fontFamily: themeConfig?.fontFamily,
                }}
              >
                Powered by Quest Labs
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : null}

      {gamifiedQuiz && !thanksPopup ? (
        <div className="upper-div">
          <div className="gamified-quiz">
            <div
              className="gamified-quiz-header-section"
              style={{
                background:
                  styleConfig?.Form?.background || themeConfig?.backgroundColor,
              }}
            >
              <div className="gamified-quiz-title-section">
                <div
                  className="gamified-quiz-title-head"
                  style={{
                    color:
                      styleConfig?.Heading?.color || themeConfig?.primaryColor,
                    fontFamily: themeConfig?.fontFamily,
                  }}
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
                    }}
                  >
                    <div className="heading-subheading-container">
                      <div
                        className="quest-title"
                        style={{
                          color:
                            styleConfig?.SubHeading?.color ||
                            themeConfig?.secondaryColor,
                          fontFamily: themeConfig?.fontFamily,
                          paddingBottom: "4px",
                        }}
                      >
                        {sectionSubHeading.length > 0
                          ? sectionSubHeading[sectionNo]
                          : "Fill out the Details"}
                      </div>
                      {(sectionHeading?.length > 0 &&
                        sectionHeading[sectionNo]) && (
                          <div
                            className="question"
                            style={{
                              color:
                                styleConfig?.Question?.color ||
                                themeConfig?.primaryColor,
                              fontFamily: themeConfig?.fontFamily,
                            }}
                          >
                            {sectionHeading[sectionNo] || "Fill out the Details"}
                          </div>
                          // ) : (
                          //   <div
                          //     className="question"
                          //     style={{
                          //       color:
                          //         styleConfig?.Question?.color ||
                          //         themeConfig?.primaryColor,
                          //       fontFamily: themeConfig?.fontFamily,
                          //     }}
                          //   >
                          //     {sectionHeading[sectionNo] || "Fill out the Details"}
                          //   </div>
                        )}
                    </div>

                    {questionSections?.length > 0
                      ? questionSections[sectionNo].map((question) => {
                        question = question - 1;
                        const value: FormData = formdata[question];
                        const index: number = question;

                        return (
                          <div
                            className="gamified-quiz-action-div"
                            key={index}
                          >
                            <div className="gamified-quiz-header-ques-title-cont">
                              <div className="question-input-cont">
                                {formdata[question]?.type ===
                                  "USER_INPUT_SINGLE_CHOICE" ||
                                  formdata[question]?.type ===
                                  "USER_INPUT_MULTI_CHOICE" ? (
                                  <div
                                    className="question"
                                    style={{
                                      color:
                                        styleConfig?.Question?.color ||
                                        themeConfig?.primaryColor,
                                      fontFamily: themeConfig?.fontFamily,
                                    }}
                                  >
                                    {formdata[question]?.question}
                                    {`${formdata[question]?.required ? "*" : ""
                                      }`}
                                  </div>
                                ) : null}

                                {formdata[question]?.type ===
                                  "USER_INPUT_TEXT" ? (
                                  normalInput(
                                    value.question,
                                    value.required || false,
                                    value[newId],
                                    index,
                                    value.placeholder || value.question,
                                    "text"
                                  )
                                ) : formdata[question]?.type ===
                                  "USER_INPUT_EMAIL" ? (
                                  normalInput(
                                    value.question,
                                    value.required || false,
                                    value[newId],
                                    index,
                                    value.placeholder || value.question,
                                    "email"
                                  )
                                ) : (formdata[question]?.type === "USER_INPUT_PHONE") || (formdata[question]?.type === "USER_INPUT_NUMBER") ? (
                                  normalInput(
                                    value.question,
                                    value.required || false,
                                    value[newId],
                                    index,
                                    value.placeholder || value.question,
                                    "number"
                                  )
                                ) : formdata[question]?.type ===
                                  "USER_INPUT_DATE" ? (
                                  dateInput(
                                    value.question,
                                    value.required || false,
                                    value[newId],
                                    index,
                                    value.placeholder || value.question
                                  )
                                ) : formdata[question]?.type ===
                                  "USER_INPUT_TEXTAREA" ? (
                                  textAreaInput(
                                    value.question,
                                    value.required || false,
                                    value[newId],
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
                      })
                      : QuestionArray}

                    { }
                  </div>

                  {questionSections?.length > 0 ? (
                    <div className="gamified-quiz-header-ques-cancel-next">
                      <button
                        onClick={() => {
                          if (sectionNo > 0) {
                            setSectionNo(sectionNo - 1);
                            GeneralFunctions.fireTrackingEvent(
                              "quest_gamifiedquiz_previous_section_button_clicked",
                              "gamifiedquiz"
                            );
                          } else {
                            setGamifiedQuiz(false);
                            GeneralFunctions.fireTrackingEvent(
                              "quest_gamifiedquiz_cancel_button_clicked",
                              "gamifiedquiz"
                            );
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
                          fontFamily: themeConfig?.fontFamily,
                          borderColor:
                            styleConfig?.SecondaryButton?.borderColor,
                        }}
                      >
                        {sectionNo > 0 ? "Previous" : "Cancel"}
                      </button>

                      <PrimaryButton
                        type={"button"}
                        onClick={() => {
                          const totalSections = Object.keys(questionSections);

                          if (sectionNo < totalSections.length - 1) {
                            GeneralFunctions.fireTrackingEvent(
                              "quest_gamifiedquiz_next_section_button_clicked",
                              "gamifiedquiz"
                            );
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
                            themeConfig?.buttonColor ||
                            "linear-gradient(84deg, #9035FF 0.36%, #0065FF 100.36%)",
                          color:
                            styleConfig?.PrimaryButton?.color ||
                            "var(--Neutral-White-100, #FFF)",

                          border: `1.5px solid ${styleConfig?.PrimaryButton?.borderColor
                            ? styleConfig?.PrimaryButton?.borderColor
                            : themeConfig?.buttonColor
                              ? themeConfig?.buttonColor
                              : "#D1ACFF"
                            }`,
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
                  ) : (
                    <div className="gamified-quiz-header-ques-cancel-next">
                      <button
                        onClick={() => {
                          if (currentSection > 0) {
                            GeneralFunctions.fireTrackingEvent(
                              "quest_gamifiedquiz_previous_section_button_clicked",
                              "gamifiedquiz"
                            );
                            setCurrentSection(currentSection - 1);
                          } else {
                            setGamifiedQuiz(false);
                            GeneralFunctions.fireTrackingEvent(
                              "quest_gamifiedquiz_cancel_button_clicked",
                              "gamifiedquiz"
                            );
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
                          fontFamily: themeConfig?.fontFamily,
                          borderColor:
                            styleConfig?.SecondaryButton?.borderColor ||
                            themeConfig?.borderColor,
                        }}
                      >
                        {sectionNo > 0 ? "Previous" : "Cancel"}
                      </button>

                      <PrimaryButton
                        type={"button"}
                        onClick={() => {
                          if (
                            currentSection <
                            totalSectionsPerSectionQuestion - 1
                          ) {
                            GeneralFunctions.fireTrackingEvent(
                              "quest_gamifiedquiz_next_section_button_clicked",
                              "gamifiedquiz"
                            );
                            setCurrentSection(currentSection + 1);
                          } else if (
                            currentSection >=
                            totalSectionsPerSectionQuestion - 1
                          ) {
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
                            themeConfig?.buttonColor ||
                            "linear-gradient(84deg, #9035FF 0.36%, #0065FF 100.36%)",
                          color:
                            styleConfig?.PrimaryButton?.color ||
                            "var(--Neutral-White-100, #FFF)",

                          border: `1.5px solid ${styleConfig?.PrimaryButton?.borderColor
                            ? styleConfig?.PrimaryButton?.borderColor
                            : themeConfig?.buttonColor
                              ? themeConfig?.buttonColor
                              : "#D1ACFF"
                            }`,
                          fontStyle: "normal",
                          fontWeight: "600",
                          lineHeight: "20px",
                        }}
                      >
                        {currentSection >= totalSectionsPerSectionQuestion - 1
                          ? "Submit"
                          : "Next"}
                      </PrimaryButton>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {showFooter ? (
              <div
                className="gamified-quiz-footer-section"
                style={styleConfig?.Footer}
              >
                <div
                  className="footer-content"
                  style={{
                    color:
                      styleConfig?.Footer?.color || themeConfig?.secondaryColor,
                    fontFamily: themeConfig?.fontFamily,
                  }}
                >
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
