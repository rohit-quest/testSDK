export interface RatingProps {
    defaultRating?: number;
    getCurrentRating?: (rating: number) => void;
    type?: 'emoji' | 'number' | 'colored' | 'star';
    count?: number;
    colouredButtons?: string[];
}
