export interface RatingProps {
    defaultRating?: number;
    getCurrentRating?: (rating: number) => void;
    type?: string
    count?: number;
    colouredButtons?: string[];
}
