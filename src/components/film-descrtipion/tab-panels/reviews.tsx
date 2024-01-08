import { FC, memo } from 'react';
import { useAppSelector } from '../../../hooks/store';
import { ReducerName } from '../../../types/reducer-name';
import { Review } from '../../../types/review';

const ReviewComponent: FC<Review> = ({ comment, user, date, rating }) => {
  const getDateString = (postDate: Date) =>
    `${postDate.toLocaleString('eng', {
      month: 'long',
    })} ${postDate.getDate()}, ${postDate.getFullYear()}`;

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user}</cite>
          <time
            className="review__date"
            dateTime={getDateString(new Date(date))}
          >
            {getDateString(new Date(date))}
          </time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
};

const ReviewsComponent: FC = () => {
  const reviews = useAppSelector((state) => state[ReducerName.Film].reviews);

  return reviews.length ? (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {reviews.slice(reviews.length / 2, reviews.length).map((review) => (
          <ReviewComponent key={review.id} {...review} />
        ))}
      </div>
      <div className="film-card__reviews-col">
        {reviews.slice(0, reviews.length / 2).map((review) => (
          <ReviewComponent key={review.id} {...review} />
        ))}
      </div>
    </div>
  ) : (
    <h1 style={{ color: 'black' }}>Комментариев еще нет...</h1>
  );
};

export const Reviews = memo(ReviewsComponent);
