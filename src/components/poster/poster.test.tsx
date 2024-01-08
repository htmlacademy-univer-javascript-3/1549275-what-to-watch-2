import { render, screen } from '@testing-library/react';
import { Poster } from './poster';

describe('Poster Component', () => {
  it('should render the poster image with the provided src and alt text', () => {
    render(
      <Poster src="poster-image.jpg" alt="Movie Poster" />
    );

    const posterImage = screen.getByAltText('Movie Poster');
    expect(posterImage).toBeInTheDocument();
    expect(posterImage).toHaveAttribute('src', 'poster-image.jpg');
  });

  it('should set custom width and height if provided', () => {
    render(
      <Poster src="poster-image.jpg" alt="Movie Poster" width={200} height={300} />
    );

    const posterImage = screen.getByAltText('Movie Poster');
    expect(posterImage).toHaveAttribute('width', '200');
    expect(posterImage).toHaveAttribute('height', '300');
  });
});
