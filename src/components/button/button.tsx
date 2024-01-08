import React, { ButtonHTMLAttributes, ReactNode, memo } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  withChildren?: boolean;
  label?: string;
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  withChildren = false,
  label,
  children,
  className,
  type = 'button',
  onClick,
}) => (
  <button data-testid="show-more" className={className} onClick={onClick} type={type}>
    {withChildren ? children : label}
  </button>
);

export const Button = memo(ButtonComponent);
