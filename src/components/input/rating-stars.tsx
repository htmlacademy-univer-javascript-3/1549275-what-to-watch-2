import React from 'react';
import { ratings } from '../../data/constants/ratings';
import { RatingInputProps } from './input.types';
import Rating from './rating';

const RatingInput: React.FC<RatingInputProps> = ({ onChange, selectedValue }) => (
  <div className="rating__stars">
    {ratings.map((rating) => (
      <Rating
        key={rating}
        rating={rating}
        onChange={onChange}
        isChecked={selectedValue === rating}
      />))}
  </div>
);

const RatingInputMemo = React.memo(RatingInput);

export default RatingInputMemo;
