export interface RatingProps {
  defaultRating?: number;
  getCurrentRating?: (rating: number) => void;
  type?: string;
  count?: number;
  colouredButtons?: string[];
  RatingStyle?: {
    RatingContainer?: React.CSSProperties;
    SingleRating?: React.CSSProperties;
    RatingText?: React.CSSProperties;
    Hover?: React.CSSProperties;
    LeftRatingText?:string;
    RightRatingText?:string;
  };
}
