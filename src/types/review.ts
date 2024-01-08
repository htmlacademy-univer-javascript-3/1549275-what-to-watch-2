export interface Review {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: string;
}

export interface IAddReview {
  backToFilm: () => void;
  data: Review;
}
