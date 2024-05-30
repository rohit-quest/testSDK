import { CSSProperties, useContext, useState } from "react";
import "./FeedbackOverview.css";
import Label from "../Modules/Label";
import { PrimaryButton } from "../Modules/PrimaryButton";
import QuestContext from "../QuestWrapper";
import QuestLabs from "../QuestLabs";
import { blackStar, whiteStar } from "./SVG";

interface GeneralFeedbackContentProps {
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
  styleConfig?: {
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
  },
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
  QuestThemeData
}) => {
  const [rating, setRating] = useState<number>(0);
  const handleRatingChange2 = (e: any, id: any, rating: number) => {
    setRating(rating);
    handleUpdate(e, id, "", rating);
  };

  const whiteStar = (size: number = 32, color: string = "#E2E2E2") => (
    <svg width={size} height={size} viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_415_158)">
        <path d="M15.455 13.7626L3.4925 15.497L3.28063 15.5401C2.95989 15.6252 2.66749 15.794 2.4333 16.0291C2.19911 16.2642 2.03151 16.5573 1.94762 16.8783C1.86373 17.1994 1.86655 17.537 1.9558 17.8566C2.04506 18.1762 2.21753 18.4664 2.45563 18.6976L11.1219 27.1332L9.07813 39.0489L9.05375 39.2551C9.03412 39.5868 9.103 39.9178 9.25335 40.2142C9.40369 40.5105 9.6301 40.7616 9.90938 40.9417C10.1887 41.1218 10.5108 41.2244 10.8428 41.2391C11.1748 41.2537 11.5047 41.1799 11.7988 41.0251L22.4975 35.4001L33.1719 41.0251L33.3594 41.1114C33.6689 41.2333 34.0052 41.2706 34.3339 41.2196C34.6626 41.1687 34.9718 41.0312 35.2299 40.8212C35.4879 40.6113 35.6854 40.3365 35.8022 40.025C35.919 39.7136 35.9508 39.3767 35.8944 39.0489L33.8488 27.1332L42.5188 18.6957L42.665 18.5364C42.8739 18.279 43.0109 17.9709 43.062 17.6435C43.1131 17.316 43.0764 16.9808 42.9558 16.6721C42.8352 16.3634 42.6349 16.0922 42.3753 15.8861C42.1157 15.68 41.8062 15.5464 41.4781 15.4988L29.5156 13.7626L24.1681 2.9251C24.0134 2.6111 23.7738 2.34669 23.4766 2.16179C23.1794 1.9769 22.8363 1.87891 22.4863 1.87891C22.1362 1.87891 21.7931 1.9769 21.4959 2.16179C21.1987 2.34669 20.9591 2.6111 20.8044 2.9251L15.455 13.7626Z" fill={color} />
      </g>
      <defs>
        <clipPath id="clip0_415_158">
          <rect width="45" height="45" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
  const blackStar = (size: number = 32, color: string = "#F9C23C") => (
    <svg width={size} height={size} viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_415_239)">
        <path d="M15.455 13.7626L3.4925 15.497L3.28063 15.5401C2.95989 15.6252 2.66749 15.794 2.4333 16.0291C2.19911 16.2642 2.03151 16.5573 1.94762 16.8783C1.86373 17.1994 1.86655 17.537 1.9558 17.8566C2.04506 18.1762 2.21753 18.4664 2.45563 18.6976L11.1219 27.1332L9.07813 39.0489L9.05375 39.2551C9.03412 39.5868 9.103 39.9178 9.25335 40.2142C9.40369 40.5105 9.6301 40.7616 9.90938 40.9417C10.1887 41.1218 10.5108 41.2244 10.8428 41.2391C11.1748 41.2537 11.5047 41.1799 11.7988 41.0251L22.4975 35.4001L33.1719 41.0251L33.3594 41.1114C33.6689 41.2333 34.0052 41.2706 34.3339 41.2196C34.6626 41.1687 34.9718 41.0312 35.2299 40.8212C35.4879 40.6113 35.6854 40.3365 35.8022 40.025C35.919 39.7136 35.9508 39.3767 35.8944 39.0489L33.8488 27.1332L42.5188 18.6957L42.665 18.5364C42.8739 18.279 43.0109 17.9709 43.062 17.6435C43.1131 17.316 43.0764 16.9808 42.9558 16.6721C42.8352 16.3634 42.6349 16.0922 42.3753 15.8861C42.1157 15.68 41.8062 15.5464 41.4781 15.4988L29.5156 13.7626L24.1681 2.9251C24.0134 2.6111 23.7738 2.34669 23.4766 2.16179C23.1794 1.9769 22.8363 1.87891 22.4863 1.87891C22.1362 1.87891 21.7931 1.9769 21.4959 2.16179C21.1987 2.34669 20.9591 2.6111 20.8044 2.9251L15.455 13.7626Z" fill={color} />
      </g>
      <defs>
        <clipPath id="clip0_415_239">
          <rect width="45" height="45" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  const screenshotSvg = (color: string | undefined) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M4.25 8.67499C2.53832 8.32753 1.25 6.81422 1.25 5C1.25 2.92893 2.92893 1.25 5 1.25C6.81422 1.25 8.32753 2.53832 8.67499 4.25H15.325C15.6725 2.53832 17.1858 1.25 19 1.25C21.0711 1.25 22.75 2.92893 22.75 5C22.75 6.81422 21.4617 8.32753 19.75 8.67499V15.325C21.4617 15.6725 22.75 17.1858 22.75 19C22.75 21.0711 21.0711 22.75 19 22.75C17.1858 22.75 15.6725 21.4617 15.325 19.75H8.67499C8.32753 21.4617 6.81422 22.75 5 22.75C2.92893 22.75 1.25 21.0711 1.25 19C1.25 17.1858 2.53832 15.6725 4.25 15.325L4.25 8.67499ZM2.75 5C2.75 3.75736 3.75736 2.75 5 2.75C6.24264 2.75 7.25 3.75736 7.25 5C7.25 6.24264 6.24264 7.25 5 7.25C3.75736 7.25 2.75 6.24264 2.75 5ZM5.75 15.325L5.75 8.67499C7.21935 8.37673 8.37672 7.21935 8.67499 5.75H15.325C15.6233 7.21935 16.7807 8.37673 18.25 8.67499V15.325C16.7807 15.6233 15.6233 16.7807 15.325 18.25H8.67499C8.37672 16.7807 7.21935 15.6233 5.75 15.325ZM5 16.75C3.75736 16.75 2.75 17.7574 2.75 19C2.75 20.2426 3.75736 21.25 5 21.25C6.24264 21.25 7.25 20.2426 7.25 19C7.25 17.7574 6.24264 16.75 5 16.75ZM21.25 5C21.25 6.24264 20.2426 7.25 19 7.25C17.7574 7.25 16.75 6.24264 16.75 5C16.75 3.75736 17.7574 2.75 19 2.75C20.2426 2.75 21.25 3.75736 21.25 5ZM16.75 19C16.75 17.7574 17.7574 16.75 19 16.75C20.2426 16.75 21.25 17.7574 21.25 19C21.25 20.2426 20.2426 21.25 19 21.25C17.7574 21.25 16.75 20.2426 16.75 19Z" fill={color || "#8E8E8E"} />
    </svg>
  )

  const fileSvg = (color: string | undefined) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M3.95526 2.25C3.97013 2.25001 3.98505 2.25001 4.00001 2.25001L20.0448 2.25C20.4776 2.24995 20.8744 2.24991 21.1972 2.29331C21.5527 2.3411 21.9284 2.45355 22.2374 2.76257C22.5465 3.07159 22.6589 3.44732 22.7067 3.8028C22.7501 4.12561 22.7501 4.52245 22.75 4.95526V5.04475C22.7501 5.47757 22.7501 5.8744 22.7067 6.19721C22.6589 6.55269 22.5465 6.92842 22.2374 7.23744C21.9437 7.53121 21.5896 7.64733 21.25 7.69914V13.0564C21.25 14.8942 21.25 16.3498 21.0969 17.489C20.9392 18.6615 20.6071 19.6104 19.8588 20.3588C19.1104 21.1071 18.1615 21.4392 16.989 21.5969C15.8498 21.75 14.3942 21.75 12.5564 21.75H11.4436C9.60583 21.75 8.1502 21.75 7.01098 21.5969C5.83856 21.4392 4.88961 21.1071 4.14125 20.3588C3.39289 19.6104 3.06077 18.6615 2.90314 17.489C2.74998 16.3498 2.74999 14.8942 2.75001 13.0564L2.75001 7.69914C2.41038 7.64733 2.05634 7.53121 1.76257 7.23744C1.45355 6.92842 1.3411 6.55269 1.29331 6.19721C1.24991 5.8744 1.24995 5.47757 1.25 5.04476C1.25001 5.02988 1.25001 5.01496 1.25001 5.00001C1.25001 4.98505 1.25001 4.97013 1.25 4.95526C1.24995 4.52244 1.24991 4.12561 1.29331 3.8028C1.3411 3.44732 1.45355 3.07159 1.76257 2.76257C2.07159 2.45355 2.44732 2.3411 2.8028 2.29331C3.12561 2.24991 3.52244 2.24995 3.95526 2.25ZM4.25001 7.75001V13C4.25001 14.9068 4.2516 16.2615 4.38977 17.2892C4.52503 18.2952 4.7787 18.8749 5.20191 19.2981C5.62512 19.7213 6.20477 19.975 7.21086 20.1102C8.19303 20.2423 9.47389 20.2496 11.25 20.25V13.9545L9.55748 15.8351C9.28038 16.1429 8.80617 16.1679 8.49828 15.8908C8.1904 15.6137 8.16544 15.1395 8.44254 14.8316L11.4425 11.4983C11.5848 11.3402 11.7874 11.25 12 11.25C12.2126 11.25 12.4152 11.3402 12.5575 11.4983L15.5575 14.8316C15.8346 15.1395 15.8096 15.6137 15.5017 15.8908C15.1938 16.1679 14.7196 16.1429 14.4425 15.8351L12.75 13.9545V20.25C14.5261 20.2496 15.807 20.2423 16.7892 20.1102C17.7952 19.975 18.3749 19.7213 18.7981 19.2981C19.2213 18.8749 19.475 18.2952 19.6102 17.2892C19.7484 16.2615 19.75 14.9068 19.75 13V7.75001H4.25001ZM2.82324 3.82324L2.82568 3.82187C2.82761 3.82086 2.83093 3.81924 2.83597 3.81717C2.85775 3.80821 2.90611 3.79291 3.00267 3.77993C3.21339 3.7516 3.5074 3.75001 4.00001 3.75001H20C20.4926 3.75001 20.7866 3.7516 20.9973 3.77993C21.0939 3.79291 21.1423 3.80821 21.164 3.81717C21.1691 3.81924 21.1724 3.82086 21.1743 3.82187L21.1768 3.82323L21.1781 3.82568C21.1792 3.82761 21.1808 3.83093 21.1828 3.83597C21.1918 3.85775 21.2071 3.90611 21.2201 4.00267C21.2484 4.21339 21.25 4.5074 21.25 5.00001C21.25 5.49261 21.2484 5.78662 21.2201 5.99734C21.2071 6.0939 21.1918 6.14226 21.1828 6.16404C21.1808 6.16909 21.1792 6.1724 21.1781 6.17434L21.1768 6.17678L21.1743 6.17815C21.1724 6.17916 21.1691 6.18077 21.164 6.18285C21.1423 6.19181 21.0939 6.2071 20.9973 6.22008C20.7866 6.24841 20.4926 6.25001 20 6.25001H4.00001C3.5074 6.25001 3.21339 6.24841 3.00267 6.22008C2.90611 6.2071 2.85775 6.19181 2.83597 6.18285C2.83093 6.18077 2.82761 6.17916 2.82568 6.17815L2.82324 6.17677L2.82187 6.17434C2.82086 6.1724 2.81924 6.16909 2.81717 6.16404C2.80821 6.14226 2.79291 6.0939 2.77993 5.99734C2.7516 5.78662 2.75001 5.49261 2.75001 5.00001C2.75001 4.5074 2.7516 4.21339 2.77993 4.00267C2.79291 3.90611 2.80821 3.85775 2.81717 3.83597C2.81924 3.83093 2.82086 3.82761 2.82187 3.82568L2.82324 3.82324ZM2.82324 6.17677C2.82284 6.17636 2.82297 6.17644 2.82324 6.17677V6.17677Z" fill={color || "#8E8E8E"} />
    </svg>
  )

  const deleteSvg = (color: string | undefined) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M10.3094 2.25002H13.6908C13.9072 2.24988 14.0957 2.24976 14.2737 2.27819C14.977 2.39049 15.5856 2.82915 15.9146 3.46084C15.9978 3.62073 16.0573 3.79961 16.1256 4.00494L16.2373 4.33984C16.2562 4.39653 16.2616 4.41258 16.2661 4.42522C16.4413 4.90933 16.8953 5.23659 17.4099 5.24964C17.4235 5.24998 17.44 5.25004 17.5001 5.25004H20.5001C20.9143 5.25004 21.2501 5.58582 21.2501 6.00004C21.2501 6.41425 20.9143 6.75004 20.5001 6.75004H3.5C3.08579 6.75004 2.75 6.41425 2.75 6.00004C2.75 5.58582 3.08579 5.25004 3.5 5.25004H6.50008C6.56013 5.25004 6.5767 5.24998 6.59023 5.24964C7.10488 5.23659 7.55891 4.90936 7.73402 4.42524C7.73863 4.41251 7.74392 4.39681 7.76291 4.33984L7.87452 4.00496C7.94281 3.79964 8.00233 3.62073 8.08559 3.46084C8.41453 2.82915 9.02313 2.39049 9.72643 2.27819C9.90445 2.24976 10.093 2.24988 10.3094 2.25002ZM9.00815 5.25004C9.05966 5.14902 9.10531 5.04404 9.14458 4.93548C9.1565 4.90251 9.1682 4.86742 9.18322 4.82234L9.28302 4.52292C9.37419 4.24941 9.39519 4.19363 9.41601 4.15364C9.52566 3.94307 9.72853 3.79686 9.96296 3.75942C10.0075 3.75231 10.067 3.75004 10.3553 3.75004H13.6448C13.9331 3.75004 13.9927 3.75231 14.0372 3.75942C14.2716 3.79686 14.4745 3.94307 14.5842 4.15364C14.605 4.19363 14.626 4.2494 14.7171 4.52292L14.8169 4.82216L14.8556 4.9355C14.8949 5.04405 14.9405 5.14902 14.992 5.25004H9.00815Z" fill={color || "#939393"} />
      <path d="M5.91509 8.45015C5.88754 8.03685 5.53016 7.72415 5.11686 7.7517C4.70357 7.77925 4.39086 8.13663 4.41841 8.54993L4.88186 15.5017C4.96736 16.7844 5.03642 17.8205 5.19839 18.6336C5.36679 19.4789 5.65321 20.185 6.2448 20.7385C6.8364 21.2919 7.55995 21.5308 8.4146 21.6425C9.23662 21.7501 10.275 21.7501 11.5606 21.75H12.4395C13.7251 21.7501 14.7635 21.7501 15.5856 21.6425C16.4402 21.5308 17.1638 21.2919 17.7554 20.7385C18.347 20.185 18.6334 19.4789 18.8018 18.6336C18.9638 17.8206 19.0328 16.7844 19.1183 15.5017L19.5818 8.54993C19.6093 8.13663 19.2966 7.77925 18.8833 7.7517C18.47 7.72415 18.1126 8.03685 18.0851 8.45015L17.6251 15.3493C17.5353 16.6971 17.4713 17.6349 17.3307 18.3406C17.1943 19.025 17.004 19.3873 16.7306 19.6431C16.4572 19.8989 16.083 20.0647 15.391 20.1552C14.6776 20.2485 13.7376 20.25 12.3868 20.25H11.6134C10.2626 20.25 9.32255 20.2485 8.60915 20.1552C7.91715 20.0647 7.54299 19.8989 7.26958 19.6431C6.99617 19.3873 6.80583 19.025 6.66948 18.3406C6.52892 17.6349 6.46489 16.6971 6.37503 15.3493L5.91509 8.45015Z" fill={color || "#939393"} />
      <path d="M9.42546 10.2538C9.83762 10.2125 10.2052 10.5133 10.2464 10.9254L10.7464 15.9254C10.7876 16.3376 10.4869 16.7051 10.0747 16.7463C9.66256 16.7875 9.29503 16.4868 9.25381 16.0747L8.75381 11.0747C8.7126 10.6625 9.01331 10.295 9.42546 10.2538Z" fill={color || "#939393"} />
      <path d="M14.5747 10.2538C14.9869 10.295 15.2876 10.6625 15.2464 11.0747L14.7464 16.0747C14.7052 16.4868 14.3376 16.7875 13.9255 16.7463C13.5133 16.7051 13.2126 16.3376 13.2538 15.9254L13.7538 10.9254C13.795 10.5133 14.1626 10.2125 14.5747 10.2538Z" fill={color || "#939393"} />
    </svg>
  )

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
                                StarStyle?.PrimaryColor
                              )
                              : whiteStar(
                                StarStyle?.Size,
                                StarStyle?.SecondaryColor
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
