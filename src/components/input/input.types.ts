export type RatingInputProps = {
  onChange: (event?: React.ChangeEvent<HTMLInputElement>) => void;
  selectedValue: null | number;
};

export type RatingProps = {
  onChange: (event?: React.ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
  rating: number;
}
