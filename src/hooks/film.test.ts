import { useFilmRating } from './films';
describe('useFilmRating', () => {
  it('should return "Awesome" for a rating of 10 or greater', () => {
    expect(useFilmRating(10)).toBe('Awesome');
    expect(useFilmRating(11)).toBe('Awesome');
  });

  it('should return "Very good" for a rating between 8 and 10', () => {
    expect(useFilmRating(8.1)).toBe('Very good');
    expect(useFilmRating(9.9)).toBe('Very good');
  });

  it('should return "Good" for a rating between 5 and 8', () => {
    expect(useFilmRating(5)).toBe('Good');
    expect(useFilmRating(7.9)).toBe('Good');
  });

  it('should return "Normal" for a rating between 3 and 5', () => {
    expect(useFilmRating(3.1)).toBe('Normal');
    expect(useFilmRating(4.9)).toBe('Normal');
  });

  it('should return "Bad" for a rating less than 3', () => {
    expect(useFilmRating(2.9)).toBe('Bad');
    expect(useFilmRating(0)).toBe('Bad');
  });
});

