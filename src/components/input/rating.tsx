import React from 'react';
import { RatingProps } from './input.types';

const Rating: React.FC<RatingProps> = ({
  rating, onChange, isChecked
}) => (
  <>
    <input
      className="rating__input"
      id={`star-${rating}`}
      type="radio"
      name="rating"
      value={rating}
      onChange={onChange}
      checked={isChecked}
    />
    <label className="rating__label" htmlFor={`star-${rating}`}>
      Rating {rating}
    </label>
  </>
);

const RatingMemo = React.memo(Rating);

export default RatingMemo;
