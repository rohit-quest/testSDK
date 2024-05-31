import { CSSProperties, useContext, useState } from "react";
import "./FeedbackOverview.css";
import Label from "../Modules/Label";
import { PrimaryButton } from "../Modules/PrimaryButton";
import QuestContext from "../QuestWrapper";
import QuestLabs from "../QuestLabs";
import { blackStar, deleteSvg, fileSvg, screenshotSvg, whiteStar } from "./SVG";

export interface GeneralFeedbackContentStyleConfig{
  Form?: React.CSSProperties;
  Heading?: React.CSSProperties;
  Description?: React.CSSProperties;
  Input?: React.CSSProperties;
  Label?: React.CSSProperties;
  EmailError?: {
    text?: string,
    errorStyle?: React.CSSProperties
  },
  TopBar?: React.CSSProperties;
  TextArea?: React.CSSProperties;
  PrimaryButton?: React.CSSProperties;
  SecondaryButton?: React.CSSProperties;
  Modal?: React.CSSProperties;
  Footer?: React.CSSProperties;
  listHeading?: React.CSSProperties;
  listDescription?: React.CSSProperties;
  Card?: React.CSSProperties;
  Star?: {
    Style?: React.CSSProperties;
    PrimaryColor?: string;
    SecondaryColor?: string;
    Size?: number;
  }
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
  },
}
export interface GeneralFeedbackContentProps {
  starColor?: string;
  btnTextColor?: string;
  starBorderColor?: string;
  formdata: Array<{ [key: string]: any }>;
  handleSubmit: () => void;
  handleUpdate: (e: any, id: string, j: string, k?: number) => void;
  answer: any;
  handleRemove?: (e: any) => void;
  ratingStyle?: "Star" | "Numbers" | "Smiles";
  labelStyle?: CSSProperties;
  normalInput: (
    question: string,
    criteriaId: string,
    placeholder?: string,
    required?: boolean
  ) => JSX.Element;
  emailInput: (
    question: string,
    criteriaId: string,
    placeholder?: string,
    required?: boolean
  ) => JSX.Element;
  normalInput2: (
    question: string,
    criteriaId: string,
    placeholder?: string,
    required?: boolean
  ) => JSX.Element;
  iconColor?: string;
  buttonStyle?: CSSProperties;
  PrimaryButtonText?: string;
  StarStyle?: {
    Style?: React.CSSProperties;
    PrimaryColor?: string;
    SecondaryColor?: string;
    Size?: number;
  };
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  screenshot: FileProp | null;
  onStartCapture: () => void;
  setScreenshot: (screenshot: FileProp | null) => void;
  uploadFileToBackend: (file: any) => any;
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  file: FileProp | null;
  setFile: (file: FileProp | null) => any;
  styleConfig?: GeneralFeedbackContentStyleConfig,
  BrandTheme?: BrandTheme,
  QuestThemeData?: QuestThemeData
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
}

interface QuestThemeData {
  accentColor: string;
  theme: string;
  borderRadius: string;
  buttonColor: string;
  images: string[]

}

interface FileProp {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  webkitRelativePath: string;
}
const GeneralFeedbackContent: React.FC<GeneralFeedbackContentProps> = ({
  formdata,
  handleUpdate,
  handleSubmit,
  ratingStyle,
  normalInput,
  emailInput,
  normalInput2,
  answer,
  buttonStyle = {},
  labelStyle = {},
  PrimaryButtonText = "Submit",
  StarStyle,
  isVisible,
  setIsVisible,
  screenshot,
  setScreenshot,
  onStartCapture,
  uploadFileToBackend,
  inputRef,
  file,
  setFile,
  styleConfig,
  BrandTheme,
  QuestThemeData,
  starBorderColor
}) => {
  console.log(starBorderColor)
  const [rating, setRating] = useState<number>(0);
  const handleRatingChange2 = (e: any, id: any, rating: number) => {
    setRating(rating);
    handleUpdate(e, id, "", rating);
  };

  const { themeConfig } = useContext(QuestContext.Context);

  const handleUploadImages = (e: any) => {
    e.preventDefault();
    let urlArr = [];
    if (file !== null) {
      urlArr.push(uploadFileToBackend(file));
    }
    if (screenshot !== null) {
      urlArr.push(uploadFileToBackend(screenshot));
    }
    for (let i = 0; i < formdata.length; i++) {
      if (formdata[i].type === "USER_INPUT_IMAGE") {
        answer[formdata[i].criteriaId] = [urlArr];
        break;
      }
    }
    handleSubmit();
  };

  return (
    <form className="q-fdov-ch-boxes" onSubmit={handleUploadImages}>
      {formdata?.length > 0 ? (
        <>
          {formdata.map((data: any) => {
            if (data.type === "USER_INPUT_TEXT") {
              return normalInput(
                data.question || "",
                data.criteriaId || "",
                data.placeholder || "",
                data.required || false
              );
            } else if (data.type === "USER_INPUT_EMAIL") {
              return emailInput(
                data.question || "",
                data.criteriaId || "",
                data.placeholder || "",
                data.required || false
              );
            } else if (data.type === "USER_INPUT_TEXTAREA") {
              return normalInput2(
                data.question || "",
                data.criteriaId || "",
                data.placeholder || "",
                data.required || false
              );
            } else if (data.type === "RATING") {
              return (
                <div key={data.criteriaId}>
                  <Label
                    htmlFor={"normalInput"}
                    children={
                      data.question
                        ? data.question
                        : "How would you rate your experience ?"
                    }
                    style={labelStyle}
                  />
                  <div>
                    {ratingStyle == "Numbers" ? (
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(5, 1fr)",
                          gap: "4px",
                        }}
                      >
                        {[1, 2, 3, 4, 5].map((num) => (
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "400",
                              color: num <= rating ? "#FFF" : "#8E8E8E",
                              borderRadius: "10px",
                              border:
                                num <= rating
                                  ? "2px solid var(--neutral-grey-100, #000)"
                                  : "2px solid var(--neutral-grey-100, #ECECEC)",
                              background: num <= rating ? "#000" : "#fff",
                              padding: "10px 12px",
                              textAlign: "center",
                              cursor: "pointer",
                              boxSizing: "content-box",
                            }}
                            key={num}
                            onClick={(e) =>
                              handleRatingChange2(e, data.criteriaId, num)
                            }
                          >
                            {num}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          ...StarStyle?.Style,
                        }}
                      >
                        {[1, 2, 3, 4, 5].map((star) => (
                          <div
                            style={{
                              width: `${StarStyle?.Size}px` || "32px",
                              height: `${StarStyle?.Size}px` || "32px",
                              lineHeight: `${StarStyle?.Size}px` || "32px",
                              cursor: "pointer",
                            }}
                            key={star}
                            onClick={(e) =>
                              handleRatingChange2(e, data.criteriaId, star)
                            }
                          >
                            {star <= rating
                              ? blackStar(
                                StarStyle?.Size,
                                StarStyle?.PrimaryColor,
                                starBorderColor
                              )
                              : whiteStar(
                                StarStyle?.Size,
                                StarStyle?.SecondaryColor,
                                starBorderColor
                              )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            } else if (data.type === "USER_INPUT_IMAGE") {
              return (
                <div style={{ position: "relative" }} >
                  <div style={{ display: "flex", justifyContent: "center", borderRadius: "10px", overflow: "hidden" }}>
                    <button style={{
                      width: "100%",
                      borderRadius: "10px 0px 0px 10px",
                      border: "1px solid #ECECEC",
                      background: "transparent",
                      position: "relative",
                      cursor: "pointer",
                      padding: "10px",
                      opacity: screenshot === null ? 1 : 0.5,
                    }} disabled={screenshot !== null} onClick={() => {
                      setIsVisible(!isVisible);
                      onStartCapture();
                    }}>
                      {screenshotSvg(styleConfig?.PrimaryButton?.color)}
                    </button>

                    <button style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: "0px 10px 10px 0px",
                      border: "1px solid #ECECEC",
                      position: "relative",
                      background: "transparent",
                      padding: "10px",
                      opacity: file === null ? 1 : 0.5,
                    }} disabled={file !== null} >
                      {fileSvg(styleConfig?.PrimaryButton?.color)}
                      <input type="file" style={{
                        opacity: 0,
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        cursor: file === null ? "pointer" : "no-drop",
                        display: "block"
                      }} ref={inputRef} onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          const selectedFile = e.target.files[0];
                          setFile(selectedFile);
                        }
                      }} disabled={file !== null} accept='image/*' />
                    </button>
                  </div>
                  {screenshot !== null &&
                    (
                      <div className="q-fdov-file-name" style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #ECECEC", borderRadius: "10px", padding: "10px 10px", marginTop: "10px", gap: "5px"
                      }}>
                        <div style={{
                          display: "flex",
                          alignItems: "center"
                        }}>
                          {screenshotSvg(styleConfig?.Form?.color)}
                        </div>
                        <p style={{
                          fontSize: "14px",
                          width: "100%",
                          textAlign: "left",
                          display: "flex",
                          alignItems: "center",
                          marginRight: "10px",
                          color: styleConfig?.Input?.color || styleConfig?.Form?.color || BrandTheme?.primaryColor || themeConfig.primaryColor
                        }}>
                          {screenshot.name}
                        </p>
                        <button style={{
                          width: "fit-content",
                          border: "none",
                          background: "transparent",
                          cursor: "pointer"
                        }} onClick={() => {
                          setScreenshot(null)
                        }}>
                          {deleteSvg(styleConfig?.Form?.color)}
                        </button>
                      </div>
                    )}
                  {
                    file && (
                      <div className="q-fdov-file-name" style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #ECECEC", borderRadius: "10px", padding: "10px 10px", marginTop: "10px", gap: "5px"
                      }}>
                        <div style={{
                          display: "flex",
                          alignItems: "center"
                        }}>
                          {fileSvg(styleConfig?.Form?.color)}
                        </div>
                        <p style={{
                          fontSize: "14px",
                          width: "100%",
                          textAlign: "left",
                          display: "flex",
                          alignItems: "center",
                          overflow: "hidden",
                          color: styleConfig?.Input?.color || styleConfig?.Form?.color || BrandTheme?.primaryColor || themeConfig.primaryColor
                        }}>
                          {file.name}
                        </p>
                        <button style={{
                          width: "fit-content",
                          border: "none",
                          background: "transparent",
                          cursor: "pointer",
                        }}
                          onClick={() => {
                            setFile(null);
                            if (inputRef.current) {
                              inputRef.current.value = "";
                            }
                          }}>
                          {deleteSvg(styleConfig?.Form?.color)}
                        </button>
                      </div>
                    )
                  }
                </div>
              );
            }
          })}
          <PrimaryButton
            children={PrimaryButtonText}
            style={buttonStyle}
            className="q-fdov-btn-continue"
            type="submit"
          />
        </>
      ) : (
        <div className="q-center">No data Found</div>
      )}
    </form>
  );
};

export default GeneralFeedbackContent;
