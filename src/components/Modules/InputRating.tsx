import { CSSProperties, useState } from "react";
import "./css/TextArea.css";

interface TextAreaProps {
  style?: CSSProperties | undefined;
  className?: string;
  id?: string;
  key?: string | number;
  StarStyle?: {
    Style?: React.CSSProperties;
    PrimaryColor?: string;
    SecondaryColor?: string;
    Size?: number;
  };
  ratingStyle?: "Star" | "Numbers";
  setRating?: any;
}

export const InputRating = ({
  style,
  className,
  id,
  key,
  StarStyle,
  ratingStyle,
  setRating,
}: TextAreaProps) => {
  const [rating, setRatings] = useState<number>(0);
  const handleRatingChange2 = ( rating: number) => {
    setRatings(rating);
    setRating(rating);
  };

  const whiteStar = (size: number = 32, color: string = "#E2E2E2") => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_415_158)">
        <path
          d="M15.455 13.7626L3.4925 15.497L3.28063 15.5401C2.95989 15.6252 2.66749 15.794 2.4333 16.0291C2.19911 16.2642 2.03151 16.5573 1.94762 16.8783C1.86373 17.1994 1.86655 17.537 1.9558 17.8566C2.04506 18.1762 2.21753 18.4664 2.45563 18.6976L11.1219 27.1332L9.07813 39.0489L9.05375 39.2551C9.03412 39.5868 9.103 39.9178 9.25335 40.2142C9.40369 40.5105 9.6301 40.7616 9.90938 40.9417C10.1887 41.1218 10.5108 41.2244 10.8428 41.2391C11.1748 41.2537 11.5047 41.1799 11.7988 41.0251L22.4975 35.4001L33.1719 41.0251L33.3594 41.1114C33.6689 41.2333 34.0052 41.2706 34.3339 41.2196C34.6626 41.1687 34.9718 41.0312 35.2299 40.8212C35.4879 40.6113 35.6854 40.3365 35.8022 40.025C35.919 39.7136 35.9508 39.3767 35.8944 39.0489L33.8488 27.1332L42.5188 18.6957L42.665 18.5364C42.8739 18.279 43.0109 17.9709 43.062 17.6435C43.1131 17.316 43.0764 16.9808 42.9558 16.6721C42.8352 16.3634 42.6349 16.0922 42.3753 15.8861C42.1157 15.68 41.8062 15.5464 41.4781 15.4988L29.5156 13.7626L24.1681 2.9251C24.0134 2.6111 23.7738 2.34669 23.4766 2.16179C23.1794 1.9769 22.8363 1.87891 22.4863 1.87891C22.1362 1.87891 21.7931 1.9769 21.4959 2.16179C21.1987 2.34669 20.9591 2.6111 20.8044 2.9251L15.455 13.7626Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_415_158">
          <rect width="45" height="45" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
  const blackStar = (size: number = 32, color: string = "#F9C23C") => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_415_239)">
        <path
          d="M15.455 13.7626L3.4925 15.497L3.28063 15.5401C2.95989 15.6252 2.66749 15.794 2.4333 16.0291C2.19911 16.2642 2.03151 16.5573 1.94762 16.8783C1.86373 17.1994 1.86655 17.537 1.9558 17.8566C2.04506 18.1762 2.21753 18.4664 2.45563 18.6976L11.1219 27.1332L9.07813 39.0489L9.05375 39.2551C9.03412 39.5868 9.103 39.9178 9.25335 40.2142C9.40369 40.5105 9.6301 40.7616 9.90938 40.9417C10.1887 41.1218 10.5108 41.2244 10.8428 41.2391C11.1748 41.2537 11.5047 41.1799 11.7988 41.0251L22.4975 35.4001L33.1719 41.0251L33.3594 41.1114C33.6689 41.2333 34.0052 41.2706 34.3339 41.2196C34.6626 41.1687 34.9718 41.0312 35.2299 40.8212C35.4879 40.6113 35.6854 40.3365 35.8022 40.025C35.919 39.7136 35.9508 39.3767 35.8944 39.0489L33.8488 27.1332L42.5188 18.6957L42.665 18.5364C42.8739 18.279 43.0109 17.9709 43.062 17.6435C43.1131 17.316 43.0764 16.9808 42.9558 16.6721C42.8352 16.3634 42.6349 16.0922 42.3753 15.8861C42.1157 15.68 41.8062 15.5464 41.4781 15.4988L29.5156 13.7626L24.1681 2.9251C24.0134 2.6111 23.7738 2.34669 23.4766 2.16179C23.1794 1.9769 22.8363 1.87891 22.4863 1.87891C22.1362 1.87891 21.7931 1.9769 21.4959 2.16179C21.1987 2.34669 20.9591 2.6111 20.8044 2.9251L15.455 13.7626Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_415_239">
          <rect width="45" height="45" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  return (
    <div style={style} className={`${className}`} id={id} key={key}>
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
              onClick={(e) => {
                console.log("click", num);
                handleRatingChange2(num);
              }}
            >
              {num}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: "flex", gap: "8px", ...StarStyle?.Style }}>
          {[1, 2, 3, 4, 5].map((star) => (
            <div
              style={{
                width: `${StarStyle?.Size}px` || "32px",
                height: `${StarStyle?.Size}px` || "32px",
                lineHeight: `${StarStyle?.Size}px` || "32px",
                cursor: "pointer",
              }}
              key={star}
              onClick={(e) => handleRatingChange2(star)}
            >
              {star <= rating
                ? blackStar(StarStyle?.Size, StarStyle?.PrimaryColor)
                : whiteStar(StarStyle?.Size, StarStyle?.SecondaryColor)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

