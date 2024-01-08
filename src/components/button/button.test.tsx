import { render } from '@testing-library/react';
import { Button } from '.';

describe('Button Component', () => {
  it('renders a button with the provided class', () => {
    const { container } = render(<Button className="custom-button" />);
    const button = container.querySelector('button.custom-button');
    expect(button).toBeInTheDocument();
  });

  it('renders a button with the provided label', () => {
    const { getByText } = render(<Button label="Click Me" />);
    const button = getByText('Click Me');
    expect(button).toBeInTheDocument();
  });
});
