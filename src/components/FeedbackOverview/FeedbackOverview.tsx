import React, { useState, useEffect, useRef } from "react";
import GeneralFeedbackContent from "./GenralFb";
import BugContent from "./Bug";
import FeatureContent from "./Feature";
import { useContext } from "react";
import QuestContext from "../QuestWrapper";
import config from "../../config";
import axios from "axios";
import Loader from "../Login/Loader";
import Cookies from "universal-cookie";
import showToast from "../toast/toastService";
import QuestLabs from "../QuestLabs";
import { Input } from "../Modules/Input";
import Label from "../Modules/Label";
import TextArea from "../Modules/TextArea";
import Modal from "../Modules/Modal";
import TopBar from "../Modules/TopBar";
import General from "../../general";
import { ScreenCapture } from "react-screen-capture";
import imageCompression from "browser-image-compression";
import { bug, contact, cross, feature, feedback, thanksPopUpTick } from "./SVG";

type optionType =
  | "ContactUs"
  | "RequestFeature"
  | "ReportBug"
  | "GeneralFeedback";

interface feedbackCompProps {
  userId: string;
  token: string;
  questIds: string[];
  answer?: any;
  setAnswer?: any;
  getAnswers?: any;
  btnTextColor?: string;
  contactUrl?: string;
  isOpen: boolean;
  onClose?: () => void;
  backgroundColor?: string;
  starColor?: string;
  starBorderColor?: string;
  GeneralFeedback?: {
    heading?: string;
    description?: string;
    formHeading?: string;
    formDescription?: string;
    iconUrl?: string;
  };
  ReportBug?: {
    heading?: string;
    description?: string;
    formHeading?: string;
    formDescription?: string;
    iconUrl?: string;
  };
  RequestFeature?: {
    heading?: string;
    description?: string;
    formHeading?: string;
    formDescription?: string;
    iconUrl?: string;
  };
  ContactUs?: {
    heading?: string;
    description?: string;
    iconUrl?: string;
  };
  tickBg?: string;
  ratingStyle?: "Star" | "Numbers" | "Smiles";
  uniqueUserId?: string;
  uniqueEmailId?: string;
  descriptions?: Record<optionType, string>;
  backBtn?: boolean;
  iconColor?: string;
  showFooter?: boolean;
  PrimaryButtonText?: string;
  SecondaryButtonText?: string;
  StarSize?: number;
  styleConfig?: {
    Form?: React.CSSProperties;
    Heading?: React.CSSProperties;
    Description?: React.CSSProperties;
    Input?: React.CSSProperties;
    Label?: React.CSSProperties;
    EmailError?: {
      text?: string;
      errorStyle?: React.CSSProperties;
    };
    TopBar?: React.CSSProperties;
    TextArea?: React.CSSProperties;
    PrimaryButton?: React.CSSProperties;
    SecondaryButton?: React.CSSProperties;
    Modal?: React.CSSProperties;
    Footer?: {
      FooterStyle?: React.CSSProperties;
      FooterText?: React.CSSProperties;
      FooterIcon?: React.CSSProperties;
    };
    listHeading?: React.CSSProperties;
    listDescription?: React.CSSProperties;
    Card?: React.CSSProperties;
    Star?: {
      Style?: React.CSSProperties;
      PrimaryColor?: string;
      SecondaryColor?: string;
      Size?: number;
    };
    listHover?: {
      background?: string;
      iconBackground?: string;
      iconColor?: string;
      Heading?: string;
      Description?: string;
      IconSize?: string;
      Icon?: React.CSSProperties;
    };
    ThanksPopup?: {
      Style?: React.CSSProperties;
      Heading?: React.CSSProperties;
      Description?: React.CSSProperties;
      ShowFooter?: boolean;
      Icon?: React.CSSProperties;
    };
  };
  enableVariation?: boolean;
}
interface FormDataItem {
  type?: string;
  question?: string;
  options?: [string];
  criteriaId?: string;
  required?: boolean;
  placeholder?: string;
}
interface FileProp {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  webkitRelativePath: string;
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
interface QuestThemeData {
  accentColor: string;
  theme: string;
  borderRadius: string;
  buttonColor: string;
  images: string[];
}

const FeedbackWorkflow: React.FC<feedbackCompProps> = ({
  userId,
  token,
  questIds,
  contactUrl,
  isOpen,
  onClose,
  starColor,
  starBorderColor,
  ratingStyle,
  uniqueUserId,
  uniqueEmailId,
  GeneralFeedback,
  ReportBug,
  RequestFeature,
  ContactUs,
  PrimaryButtonText = "Submit",
  SecondaryButtonText = "Go to home!",
  iconColor = "#939393",
  styleConfig = {},
  showFooter = true,
  enableVariation = false,
}) => {
  const [selectedOption, setSelectedOption] = useState<optionType | null>(null);
  const [selectedQuest, setSelectedQuest] = useState<string | null>(null);
  const [formdata, setFormdata] = useState<{ [key: number]: [FormDataItem] }>(
    {}
  );
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [submit, setSubmit] = useState<boolean>(false);
  const { apiKey, apiSecret, entityId, featureFlags, apiType, themeConfig } =
    useContext(QuestContext.Context);
  const [answer, setAnswer] = useState<Record<string, string>>({});
  const [cardHovered, setCardHovered] = useState([false, false, false, false]);
  const [session, setSession] = useState<{ [key: string]: string }>({});
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

  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [screenshot, setScreenshot] = useState<FileProp | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<FileProp | null>(null);

  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let target = e.target as Element;
    if (ref.current?.contains(target)) {
    } else {
      onClose && onClose();
    }
  };
  const uploadFileToBackend: any = async (file: any) => {
    if (file?.size > 1000000) {
      try {
        // Resize the image to below 1MB
        const compressedImage = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
          initialQuality: 1,
        });

        // Call the uploadImageToBackend function recursively with the compressed image
        return await uploadFileToBackend(compressedImage);
      } catch (error) {
        return null;
      }
    }
    const formData = new FormData();
    formData.append("uploaded_file", file);
    try {
      let res = await axios.post(
        "https://staging.questprotocol.xyz/api/upload-img",
        formData,
        {
          headers: {
            userId,
            token,
            apiKey,
            apiSecret,
            "Content-Type": "form-data",
          },
        }
      );
      if (
        res == null ||
        !res?.data ||
        res?.data.success == false ||
        !res?.data?.imageUrl
      ) {
        console.log(null);
      } else {
        return res.data.imageUrl;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ref = React.useRef<HTMLDivElement>(null);

  let GeneralFunctions = new General("mixpanel", apiType);

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
    GeneralFunctions.fireTrackingEvent(
      "quest_feedback_workflow_loaded",
      "feedback_workflow"
    );
  }, []);

  const handleOptionClick = (option: optionType, quest: string) => {
    let cookies = new Cookies();
    let externalUserId = cookies.get("externalUserId");
    let questUserId = cookies.get("questUserId");
    let questUserToken = cookies.get("questUserToken");

    if (
      !!externalUserId &&
      !!questUserId &&
      !!questUserToken &&
      externalUserId == uniqueUserId
    ) {
      let header = {
        apiKey: apiKey,
        apisecret: apiSecret,
        userId: questUserId,
        token: questUserToken,
      };
      try {
        axios.post(
          `${BACKEND_URL}api/entities/${entityId}/users/${userId}/metrics/feedback-${quest}?userId=${userId}&questId=${quest}`,
          { count: 1 },
          { headers: header }
        );
      } catch (error) {
        GeneralFunctions.captureSentryException(error);
      }
    } else if (uniqueUserId) {
      const body = {
        externalUserId: !!uniqueUserId && uniqueUserId,
        entityId: entityId,
        email: uniqueEmailId,
      };

      const headers = {
        apiKey: apiKey,
        apisecret: apiSecret,
        userId: userId,
        token: token,
      };

      axios
        .post(`${BACKEND_URL}api/users/external/login`, body, { headers })
        .then((res) => {
          let { userId, token } = res.data;
          let header = { ...headers, ...{ userId, token } };
          let cookies = new Cookies();
          const date = new Date();
          date.setHours(date.getHours() + 12);
          cookies.set("externalUserId", uniqueUserId, {
            path: "/",
            expires: date,
          });
          cookies.set("questUserId", userId, { path: "/", expires: date });
          cookies.set("questUserToken", token, { path: "/", expires: date });
          axios.post(
            `${BACKEND_URL}api/entities/${entityId}/users/${userId}/metrics/feedback-${quest}?userId=${userId}&questId=${quest}`,
            { count: 1 },
            { headers: header }
          );
        })
        .catch((error) => {
          console.error("Error:", error);
          GeneralFunctions.captureSentryException(error);
        });
    }

    if (option === "ContactUs" && contactUrl) {
      window.open(contactUrl, "_blank");
    } else {
      setSelectedOption(option);
      setSelectedQuest(quest);
      setAnswer({});
    }
  };

  function returnAnswers(index: number) {
    GeneralFunctions.fireTrackingEvent(
      `quest_feedback_workflow_${selectedOption}_form_submitted`,
      `feedback_workflow_${selectedOption}_form`
    );
    const headers = {
      apiKey: apiKey,
      apisecret: apiSecret,
      userId: userId,
      token: token,
    };
    let cookies = new Cookies();
    let externalUserId = cookies.get("externalUserId");
    let questUserId = cookies.get("questUserId");
    let questUserToken = cookies.get("questUserToken");
    if (Object.keys(answer).length !== 0) {
      const ansArr = formdata[index].map((ans: any) => ({
        question: ans?.question || "",
        answer: [answer[ans?.criteriaId] || ""],
        criteriaId: ans?.criteriaId || "",
      }));
      if (
        !!externalUserId &&
        !!questUserId &&
        !!questUserToken &&
        externalUserId == uniqueUserId
      ) {
        let header = {
          apiKey: apiKey,
          apisecret: apiSecret,
          userId: questUserId,
          token: questUserToken,
        };
        setResult(header, header.userId);
      } else {
        setResult(headers, userId);
      }

      function setResult(headers: { userId?: string }, userId: string) {
        const request = `${BACKEND_URL}api/entities/${entityId}/quests/${selectedQuest}/verify-all?userId=${userId}&getVariation=${enableVariation}`;
        const requestData = {
          criterias: ansArr,
          userId: headers?.userId,
          session: session[selectedQuest ?? ""],
        };
        setShowLoader(true);
        axios
          .post(request, requestData, { headers: headers })
          .then((response) => {
            if (response.data.success) {
              setSubmit(true);
              setTimeout(() => {
                setSubmit(false);
                setSelectedOption(null);
              }, 4000);
              axios.post(
                `${BACKEND_URL}api/entities/${entityId}/users/${userId}/metrics/feedback-${selectedQuest}-com?userId=${userId}&questId=${selectedQuest}`,
                { count: 1 },
                { headers: headers }
              );
            } else {
              console.log(response.data.error)
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
    } else {
      showToast.error("Please fill in all required fields.");
    }
  }

  const handleBackClick = () => {
    GeneralFunctions.fireTrackingEvent(
      `quest_feedback_workflow_${selectedOption}_form_closed`,
      `feedback_workflow_${selectedOption}_form`
    );
    setSelectedOption(null);
  };

  function isDefaultQuestId(questId: string): boolean {
    const defaultIdPattern = [
      "q-general-feedback",
      "q-report-a-bug",
      "q-request-a-feature",
      "q-contact-us",
    ].includes(questId);
    // /^q-[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    // /^q-[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return defaultIdPattern;
  }

  const getParentQuestData = async (questId: string) => {
    const request = `${BACKEND_URL}api/entities/${entityId}/quests/${questId}/parent?userId=${userId}`;
    await axios
      .get(request, {
        headers: {
          apiKey: apiKey,
          apisecret: apiSecret,
          userId: userId,
          token: token,
        },
      })
      .then((res) => {
        let response = res.data;
        if (response?.parentQuest?.uiProps?.questThemeData) {
          setQuestThemeData(response?.parentQuest?.uiProps?.questThemeData);
          if (response?.parentQuest?.uiProps?.questThemeData.theme) {
            // getTheme(response?.parentQuest?.uiProps.questThemeData.theme) disabled for now
          }
        }
      });
  };

  useEffect(() => {
    const headers = {
      apiKey: apiKey,
      apisecret: apiSecret,
      userId: userId,
      token: token,
    };
    let request;
    let count = 0;
    {
      questIds.map((id, index) => {
        const isDefault = isDefaultQuestId(id);
        if (isDefault) {
          request = `${BACKEND_URL}api/entities/${entityId}/default-quest/?userId=${userId}&defaultId=${id}`;
          axios
            .post(request, {}, { headers: headers })
            .then((res) => {
              let response = res.data.data;
              setSession((prev) => ({ ...prev, [id]: response.session }));
              let criterias = response?.eligibilityData?.map(
                (criteria: any) => {
                  return {
                    type: criteria?.data?.criteriaType,
                    question: criteria?.data?.metadata?.title,
                    options: criteria?.data?.metadata?.options || [],
                    criteriaId: criteria?.data?.criteriaId,
                    required: !criteria?.data?.metadata?.isOptional,
                    placeholder: criteria?.data?.metadata?.placeholder,
                  };
                }
              );
              criterias = Array.isArray(criterias) ? criterias : [];
              setFormdata((prevFormdata) => {
                const updatedFormdata = { ...prevFormdata };
                updatedFormdata[index] = criterias;
                return updatedFormdata;
              });
            })
            .catch((error) => {
              console.error("Error:", error);
              GeneralFunctions.captureSentryException(error);
            });
        } else {
          request = `${BACKEND_URL}api/entities/${entityId}/quests/${id}?userId=${userId}&getVariation=${enableVariation}`;
          axios
            .get(request, { headers: headers })
            .then((res) => {
              let response = res.data;
              if (count == 0 && response?.data?.parentQuestId) {
                getParentQuestData(response?.data?.parentQuestId);
                count++;
              }
              setSession((prev) => ({ ...prev, [id]: response.session }));
              let criterias = response?.eligibilityData?.map(
                (criteria: any) => {
                  return {
                    type: criteria?.data?.criteriaType,
                    question: criteria?.data?.metadata?.title,
                    options: criteria?.data?.metadata?.options || [],
                    criteriaId: criteria?.data?.criteriaId,
                    required: !criteria?.data?.metadata?.isOptional,
                    placeholder: criteria?.data?.metadata?.placeholder,
                  };
                }
              );
              criterias = Array.isArray(criterias) ? criterias : [];
              setFormdata((prevFormdata) => {
                const updatedFormdata = { ...prevFormdata };
                updatedFormdata[index] = criterias;
                return updatedFormdata;
              });
            })
            .catch((error) => {
              console.error("Error:", error);
              GeneralFunctions.captureSentryException(error);
            });
        }
      });
    }
  }, [questIds]);

  const handleUpdate = (e: any, id: string, j: string, k?: number) => {
    setAnswer({
      ...answer,
      [id]: e.target.value || k,
    });
  };
  const handleThanks = () => {
    setSubmit(false);
    setSelectedOption(null);
  };

  const handleRemove = (id: string) => {
    setAnswer({
      ...answer,
      [id]: "",
    });
  };
  function isValidEmail(email: string) {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email);
  }

  const normalInput = (
    question: string,
    criteriaId: string,
    placeholder?: string,
    required?: boolean
  ) => {
    return (
      <div className="" key={criteriaId}>
        <Label
          htmlFor={"normalInput"}
          children={`${question}${required === true ? "*" : ""}`}
          style={{
            color:
              styleConfig?.Label?.color ||
              styleConfig?.Heading?.color ||
              BrandTheme?.primaryColor ||
              themeConfig.primaryColor,
            ...styleConfig.Label,
          }}
        />
        <Input
          type="text"
          style={{
            color:
              styleConfig?.Input?.color ||
              styleConfig?.Heading?.color ||
              BrandTheme?.primaryColor ||
              themeConfig.primaryColor,
            ...styleConfig.Input,
          }}
          placeholder={placeholder}
          value={answer[criteriaId]}
          onChange={(e) => handleUpdate(e, criteriaId, "")}
          required={required}
        />
      </div>
    );
  };
  const emailInput = (
    question: string,
    criteriaId: string,
    placeholder?: string,
    required?: boolean
  ) => {
    return (
      <div className="" key={criteriaId}>
        <Label
          htmlFor={"normalInput"}
          children={`${question}${required === true ? "*" : ""}`}
          style={{
            color:
              styleConfig?.Label?.color ||
              styleConfig?.Heading?.color ||
              BrandTheme?.primaryColor ||
              themeConfig.primaryColor,
            ...styleConfig.Label,
          }}
        />
        <Input
          type="email"
          style={{
            color:
              styleConfig?.Input?.color ||
              styleConfig?.Heading?.color ||
              BrandTheme?.primaryColor ||
              themeConfig.primaryColor,
            ...styleConfig.Input,
          }}
          placeholder={placeholder}
          value={answer[criteriaId]}
          onChange={(e) => handleUpdate(e, criteriaId, "")}
          emailtext={
            styleConfig?.EmailError?.text == undefined
              ? "This is not a valid email"
              : styleConfig?.EmailError?.text
          }
          emailErrorStyle={styleConfig?.EmailError?.errorStyle}
          required={required}
        />
      </div>
    );
  };

  const normalInput2 = (
    question: string,
    criteriaId: string,
    placeholder?: string,
    required?: boolean
  ) => {
    return (
      <div className="" key={criteriaId}>
        <Label
          htmlFor={"normalInput"}
          children={`${question}${required === true ? "*" : ""}`}
          style={{
            color:
              styleConfig?.Label?.color ||
              styleConfig?.Heading?.color ||
              BrandTheme?.primaryColor ||
              themeConfig.primaryColor,
            ...styleConfig.Label,
          }}
        />
        <TextArea
          onChange={(e) => handleUpdate(e, criteriaId, "")}
          value={answer[criteriaId]}
          placeholder={placeholder}
          style={{
            borderColor: themeConfig.borderColor,
            color:
              styleConfig?.TextArea?.color ||
              styleConfig?.Heading?.color ||
              BrandTheme?.primaryColor ||
              themeConfig.primaryColor,
            ...styleConfig.TextArea,
          }}
          required={required}
        />
      </div>
    );
  };

  if (
    featureFlags[config.FLAG_CONSTRAINTS.FeedbackWorkflowFlag]?.isEnabled ==
    false
  ) {
    return <div></div>;
  }

  const handleScreenCapture = async (capture: string) => {
    setIsVisible(true);
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const time = hours + ":" + minutes + ":" + seconds;
    let fileName = "screenshot" + time + ".jpg"; // Ensure file name has proper format

    try {
      const response = await axios.get(capture, { responseType: "blob" });

      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: "image/jpeg" });

      // Create a File object from the Blob
      const file = new File([blob], fileName, { type: "image/jpeg" });

      // If you need to update state with the new file object
      setScreenshot(file);
    } catch (error) {
      console.error("An error occurred while fetching the image:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose || (() => { })}
      style={{ padding: 0, background: "transparent", ...styleConfig.Modal }}
    >
      <ScreenCapture onEndCapture={handleScreenCapture}>
        {({ onStartCapture }: any) => (
          <div
            className="q_modal_overlay"
            onClick={(e) => closeModal(e)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: !isVisible ? "transparent" : "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              opacity: isVisible ? 1 : 0,
            }}
          >
            {!submit && (
              <div
                className="q_modal"
                ref={ref}
                id="modal_box"
                style={{
                  padding: 0,
                  background: "transparent",
                  opacity: isVisible ? 1 : 0,
                  ...styleConfig.Modal,
                }}
              >
                {showLoader && <Loader />}
                <div
                  className="q-fw-div"
                  style={{
                    background:
                      styleConfig?.Form?.backgroundColor ||
                      BrandTheme?.background ||
                      themeConfig?.backgroundColor,
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
                  id="disabledClick"
                >
                  {selectedOption && !submit ? (
                    <div>
                      <TopBar
                        style={{
                          topbarStyle: styleConfig?.TopBar,
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
                        }}
                        description={
                          selectedOption == "ContactUs"
                            ? ContactUs?.description ||
                            "Invite other admins and moderators"
                            : selectedOption == "RequestFeature"
                              ? RequestFeature?.formDescription ||
                              "How can we make it better"
                              : selectedOption == "ReportBug"
                                ? ReportBug?.formDescription ||
                                "Describe your issue"
                                : GeneralFeedback?.formDescription ||
                                "Give general feedback on this page"
                        }
                        heading={
                          selectedOption == "ContactUs"
                            ? ContactUs?.heading || "Contact us"
                            : selectedOption == "RequestFeature"
                              ? RequestFeature?.formHeading || "Request a Feature"
                              : selectedOption == "ReportBug"
                                ? ReportBug?.formHeading || "Report a Bug"
                                : GeneralFeedback?.formHeading || "General Feedback"
                        }
                        iconColor={iconColor}
                        onClose={handleBackClick}
                      />
                      <div style={{ padding: "20px" }}>
                        {selectedOption === "GeneralFeedback" && (
                          <GeneralFeedbackContent
                            starColor={starColor}
                            handleSubmit={() => returnAnswers(0)}
                            handleUpdate={handleUpdate}
                            formdata={formdata[0]}
                            normalInput={normalInput}
                            emailInput={emailInput}
                            normalInput2={normalInput2}
                            starBorderColor={starBorderColor}
                            answer={answer}
                            handleRemove={handleRemove}
                            ratingStyle={ratingStyle}
                            iconColor={iconColor}
                            buttonStyle={{
                              background:
                                styleConfig.PrimaryButton?.background ||
                                questThemeData?.buttonColor ||
                                BrandTheme?.buttonColor ||
                                themeConfig.buttonColor,
                              ...styleConfig.PrimaryButton,
                            }}
                            PrimaryButtonText={PrimaryButtonText}
                            StarStyle={styleConfig?.Star}
                            labelStyle={{
                              ...styleConfig?.Label,
                              color:
                                styleConfig?.Label?.color ||
                                styleConfig?.Heading?.color ||
                                BrandTheme?.primaryColor ||
                                themeConfig.primaryColor,
                            }}
                            isVisible={isVisible}
                            setIsVisible={setIsVisible}
                            screenshot={screenshot}
                            setScreenshot={setScreenshot}
                            onStartCapture={onStartCapture}
                            uploadFileToBackend={uploadFileToBackend}
                            inputRef={inputRef}
                            file={file}
                            setFile={setFile}
                          />
                        )}
                        {selectedOption === "ReportBug" && (
                          <BugContent
                            handleSubmit={() => returnAnswers(1)}
                            handleUpdate={handleUpdate}
                            formdata={formdata[1]}
                            answer={answer}
                            normalInput={normalInput}
                            normalInput2={normalInput2}
                            emailInput={emailInput}
                            handleRemove={handleRemove}
                            PrimaryButtonText={PrimaryButtonText}
                            buttonStyle={{
                              background:
                                styleConfig.PrimaryButton?.background ||
                                questThemeData?.buttonColor ||
                                BrandTheme?.buttonColor ||
                                themeConfig.buttonColor,
                              ...styleConfig.PrimaryButton,
                            }}
                          />
                        )}
                        {selectedOption === "RequestFeature" && (
                          <FeatureContent
                            handleSubmit={() => returnAnswers(2)}
                            handleUpdate={handleUpdate}
                            formdata={formdata[2]}
                            normalInput={normalInput}
                            normalInput2={normalInput2}
                            emailInput={emailInput}
                            answer={answer}
                            handleRemove={handleRemove}
                            PrimaryButtonText={PrimaryButtonText}
                            buttonStyle={{
                              background:
                                styleConfig.PrimaryButton?.background ||
                                questThemeData?.buttonColor ||
                                BrandTheme?.buttonColor ||
                                themeConfig.buttonColor,
                              ...styleConfig.PrimaryButton,
                            }}
                          />
                        )}
                        {selectedOption === "ContactUs" && <div></div>}
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
                  ) : !submit ? (
                    <div>
                      <div className="q-fw-crossBtn">
                        <div onClick={() => onClose?.()}>
                          {cross(iconColor)}
                        </div>
                      </div>
                      <div className="q-fw-content-box">
                        {questIds[0] && (
                          <div
                            onClick={() => {
                              GeneralFunctions.fireTrackingEvent(
                                "quest_feedback_workflow_general_feedback_clicked",
                                "feedback_workflow_general_feedback"
                              );
                              handleOptionClick("GeneralFeedback", questIds[0]);
                            }}
                            className="q-hover q-fw-cards"
                            onMouseEnter={() =>
                              setCardHovered([true, false, false, false])
                            }
                            onMouseLeave={() =>
                              setCardHovered([false, false, false, false])
                            }
                            style={{
                              background: cardHovered[0]
                                ? styleConfig.listHover?.background || "#FBFBFB"
                                : "transparent",
                              borderRadius: "8px",
                              ...styleConfig?.Card,
                            }}
                          >
                            <div
                              className="q_feedback_icon"
                              style={{
                                background: cardHovered[0]
                                  ? styleConfig.listHover?.iconBackground ||
                                  "#F4EBFF"
                                  : "#FBFBFB",
                                ...styleConfig?.listHover?.Icon,
                              }}
                            >
                              {GeneralFeedback?.iconUrl ? (
                                <img
                                  className="q_feedback_icon_imgurl"
                                  src={GeneralFeedback?.iconUrl}
                                />
                              ) : (
                                feedback(
                                  cardHovered[0]
                                    ? styleConfig.listHover?.iconColor ||
                                    "#9035FF"
                                    : iconColor,
                                  styleConfig.listHover?.IconSize
                                )
                              )}
                            </div>
                            <div>
                              <div
                                className="q-fw-tab-heading"
                                style={{
                                  color: cardHovered[0]
                                    ? styleConfig?.listHover?.Heading ||
                                    styleConfig.listHeading?.color ||
                                    styleConfig?.Heading?.color ||
                                    BrandTheme?.primaryColor ||
                                    themeConfig?.primaryColor
                                    : styleConfig.listHeading?.color ||
                                    styleConfig?.Heading?.color ||
                                    BrandTheme?.primaryColor ||
                                    themeConfig?.primaryColor,
                                  ...styleConfig?.listHeading,
                                }}
                              >
                                {GeneralFeedback?.heading || "General Feedback"}
                              </div>
                              <div
                                className="q-fw-tab-description"
                                style={{
                                  color: cardHovered[0]
                                    ? styleConfig?.listHover?.Description ||
                                    styleConfig?.listDescription?.color ||
                                    styleConfig?.Description?.color ||
                                    BrandTheme?.secondaryColor ||
                                    themeConfig?.secondaryColor
                                    : styleConfig?.listDescription?.color ||
                                    styleConfig?.Description?.color ||
                                    BrandTheme?.secondaryColor ||
                                    themeConfig?.secondaryColor,
                                  ...styleConfig?.listDescription,
                                }}
                              >
                                {GeneralFeedback?.description ||
                                  "Give general feedback on this page"}
                              </div>
                            </div>
                          </div>
                        )}
                        {questIds[1] && (
                          <div
                            onClick={() => {
                              GeneralFunctions.fireTrackingEvent(
                                "quest_feedback_workflow_report_bug_clicked",
                                "feedback_workflow_report_bug"
                              );
                              handleOptionClick("ReportBug", questIds[1]);
                            }}
                            className="q-hover q-fw-cards"
                            onMouseEnter={() =>
                              setCardHovered([false, true, false, false])
                            }
                            onMouseLeave={() =>
                              setCardHovered([false, false, false, false])
                            }
                            style={{
                              background: cardHovered[1]
                                ? styleConfig.listHover?.background || "#FBFBFB"
                                : "transparent",
                              borderRadius: "8px",
                              ...styleConfig?.Card,
                            }}
                          >
                            <div
                              className="q_feedback_icon"
                              style={{
                                background: cardHovered[1]
                                  ? styleConfig.listHover?.iconBackground ||
                                  "#F4EBFF"
                                  : "#FBFBFB",
                                ...styleConfig?.listHover?.Icon,
                              }}
                            >
                              {ReportBug?.iconUrl ? (
                                <img
                                  className="q_feedback_icon_imgurl"
                                  src={ReportBug?.iconUrl}
                                />
                              ) : (
                                bug(
                                  cardHovered[1]
                                    ? styleConfig.listHover?.iconColor ||
                                    styleConfig?.listHover?.Icon?.color ||
                                    "#9035FF"
                                    : iconColor,
                                  styleConfig.listHover?.IconSize
                                )
                              )}
                            </div>
                            <div>
                              <div>
                                <div
                                  className="q-fw-tab-heading"
                                  style={{
                                    color: cardHovered[1]
                                      ? styleConfig?.listHover?.Heading ||
                                      styleConfig.listHeading?.color ||
                                      styleConfig?.Heading?.color ||
                                      BrandTheme?.primaryColor ||
                                      themeConfig?.primaryColor
                                      : styleConfig.listHeading?.color ||
                                      styleConfig?.Heading?.color ||
                                      BrandTheme?.primaryColor ||
                                      themeConfig?.primaryColor,
                                    ...styleConfig?.listHeading,
                                  }}
                                >
                                  {ReportBug?.heading || "Report a Bug"}
                                </div>
                              </div>
                              <div>
                                <div
                                  className="q-fw-tab-description"
                                  style={{
                                    color: cardHovered[1]
                                      ? styleConfig?.listHover?.Description ||
                                      styleConfig?.listDescription?.color ||
                                      styleConfig?.Description?.color ||
                                      BrandTheme?.secondaryColor ||
                                      themeConfig?.secondaryColor
                                      : styleConfig?.listDescription?.color ||
                                      styleConfig?.Description?.color ||
                                      BrandTheme?.secondaryColor ||
                                      themeConfig?.secondaryColor,
                                    ...styleConfig?.listDescription,
                                  }}
                                >
                                  {ReportBug?.description ||
                                    "Let us know what's broken"}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {questIds[2] && (
                          <div
                            onClick={() => {
                              GeneralFunctions.fireTrackingEvent(
                                "quest_feedback_workflow_request_feature_clicked",
                                "feedback_workflow_request_feature"
                              );
                              handleOptionClick("RequestFeature", questIds[2]);
                            }}
                            className="q-hover q-fw-cards"
                            onMouseEnter={() =>
                              setCardHovered([false, false, true, false])
                            }
                            onMouseLeave={() =>
                              setCardHovered([false, false, false, false])
                            }
                            style={{
                              background: cardHovered[2]
                                ? styleConfig.listHover?.background || "#FBFBFB"
                                : "transparent",
                              borderRadius: "8px",
                              ...styleConfig?.Card,
                            }}
                          >
                            <div
                              className="q_feedback_icon"
                              style={{
                                background: cardHovered[2]
                                  ? styleConfig.listHover?.iconBackground ||
                                  "#F4EBFF"
                                  : "#FBFBFB",
                                ...styleConfig?.listHover?.Icon,
                              }}
                            >
                              {RequestFeature?.iconUrl ? (
                                <img
                                  className="q_feedback_icon_imgurl"
                                  src={RequestFeature?.iconUrl}
                                />
                              ) : (
                                feature(
                                  cardHovered[2]
                                    ? styleConfig.listHover?.iconColor ||
                                    "#9035FF"
                                    : iconColor,
                                  styleConfig.listHover?.IconSize
                                )
                              )}
                            </div>
                            <div>
                              <div>
                                <div
                                  className="q-fw-tab-heading"
                                  style={{
                                    color: cardHovered[2]
                                      ? styleConfig?.listHover?.Heading ||
                                      styleConfig.listHeading?.color ||
                                      styleConfig?.Heading?.color ||
                                      themeConfig?.primaryColor ||
                                      themeConfig?.primaryColor
                                      : styleConfig.listHeading?.color ||
                                      styleConfig?.Heading?.color ||
                                      themeConfig?.primaryColor ||
                                      themeConfig?.primaryColor,
                                    ...styleConfig?.listHeading,
                                  }}
                                >
                                  {RequestFeature?.heading ||
                                    "Request a Feature"}
                                </div>
                              </div>
                              <div>
                                <div
                                  className="q-fw-tab-description"
                                  style={{
                                    color: cardHovered[2]
                                      ? styleConfig?.listHover?.Description ||
                                      styleConfig?.listDescription?.color ||
                                      styleConfig?.Description?.color ||
                                      BrandTheme?.secondaryColor ||
                                      themeConfig?.secondaryColor
                                      : styleConfig?.listDescription?.color ||
                                      styleConfig?.Description?.color ||
                                      BrandTheme?.secondaryColor ||
                                      themeConfig?.secondaryColor,
                                    ...styleConfig?.listDescription,
                                  }}
                                >
                                  {RequestFeature?.description ||
                                    "Tell us how we can improve"}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {questIds[3] && (
                          <div
                            onClick={() => {
                              GeneralFunctions.fireTrackingEvent(
                                "quest_feedback_workflow_contactus_clicked",
                                "feedback_workflow_contactus"
                              );
                              handleOptionClick("ContactUs", questIds[3]);
                            }}
                            className="q-hover q-fw-cards"
                            onMouseEnter={() =>
                              setCardHovered([false, false, false, true])
                            }
                            onMouseLeave={() =>
                              setCardHovered([false, false, false, false])
                            }
                            style={{
                              background: cardHovered[3]
                                ? styleConfig.listHover?.background || "#FBFBFB"
                                : "transparent",
                              borderRadius: "8px",
                              ...styleConfig?.Card,
                            }}
                          >
                            <div
                              className="q_feedback_icon"
                              style={{
                                background: cardHovered[3]
                                  ? styleConfig.listHover?.iconBackground ||
                                  "#F4EBFF"
                                  : "#FBFBFB",
                                ...styleConfig?.listHover?.Icon,
                              }}
                            >
                              {ContactUs?.iconUrl ? (
                                <img
                                  className="q_feedback_icon_imgurl"
                                  src={ContactUs?.iconUrl}
                                />
                              ) : (
                                contact(
                                  cardHovered[3]
                                    ? styleConfig.listHover?.iconColor ||
                                    "#9035FF"
                                    : iconColor,
                                  styleConfig.listHover?.IconSize
                                )
                              )}
                            </div>
                            <div>
                              <div>
                                <div
                                  className="q-fw-tab-heading"
                                  style={{
                                    color: cardHovered[3]
                                      ? styleConfig?.listHover?.Heading ||
                                      styleConfig.listHeading?.color ||
                                      styleConfig?.Heading?.color ||
                                      BrandTheme?.primaryColor ||
                                      themeConfig?.primaryColor
                                      : styleConfig.listHeading?.color ||
                                      styleConfig?.Heading?.color ||
                                      BrandTheme?.primaryColor ||
                                      themeConfig?.primaryColor,
                                    ...styleConfig?.listHeading,
                                  }}
                                >
                                  {ContactUs?.heading || "Contact us"}
                                </div>
                              </div>
                              <div>
                                <div
                                  style={{
                                    color: cardHovered[3]
                                      ? styleConfig?.listHover?.Description ||
                                      styleConfig?.listDescription?.color ||
                                      styleConfig?.Description?.color ||
                                      BrandTheme?.secondaryColor ||
                                      themeConfig?.secondaryColor
                                      : styleConfig?.listDescription?.color ||
                                      styleConfig?.Description?.color ||
                                      BrandTheme?.secondaryColor ||
                                      themeConfig?.secondaryColor,
                                    ...styleConfig?.listDescription,
                                  }}
                                  className="q-fw-tab-description"
                                >
                                  {ContactUs?.description ||
                                    "Tell us how we can help"}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
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
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            )}

            {submit && (
              <div
                className="q-fw-div"
                style={{
                  background:
                    styleConfig?.ThanksPopup?.Style?.background ||
                    styleConfig?.Form?.backgroundColor ||
                    BrandTheme?.background ||
                    themeConfig?.backgroundColor,
                  height:
                    styleConfig?.ThanksPopup?.Style?.height ||
                    styleConfig?.Form?.height ||
                    "auto",
                  fontFamily: themeConfig.fontFamily || "'Figtree', sans-serif",
                  borderRadius:
                    styleConfig?.Form?.borderRadius ||
                    questThemeData?.borderRadius ||
                    BrandTheme?.borderRadius,
                  ...styleConfig?.ThanksPopup?.Style,
                }}
                id="disabledClick"
              >
                <div className="q_submit_cross_icon" onClick={handleThanks}>
                  {cross(iconColor, handleBackClick)}
                </div>
                <div className="q-fw-thanks">
                  <div>
                    <div className="q-svg-thanks">
                      {thanksPopUpTick(
                        styleConfig?.ThanksPopup?.Icon?.backgroundColor
                      )}
                    </div>
                    <div className="q_fw_submit_box">
                      <div className="q_feedback_text_submitted">
                        <div
                          className="q_feedback_text_cont"
                          style={{
                            color:
                              styleConfig?.Heading?.color ||
                              BrandTheme?.primaryColor ||
                              themeConfig?.primaryColor,
                            ...styleConfig?.ThanksPopup?.Heading,
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
                            ...styleConfig?.ThanksPopup?.Description,
                          }}
                        >
                          Thanks for submitting your feedback with us. We
                          appreciate your review and will assure you to surely
                          consider them
                        </div>
                      </div>
                      <div
                        className="q_fw_submit_back"
                        style={{ ...styleConfig?.SecondaryButton }}
                      >
                        {SecondaryButtonText}
                      </div>
                    </div>
                  </div>
                </div>
                {(styleConfig?.ThanksPopup?.ShowFooter || showFooter) && (
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
          </div>
        )}
      </ScreenCapture>
    </Modal>
  );
};

export default FeedbackWorkflow;
