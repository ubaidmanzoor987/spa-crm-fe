import React, { MouseEventHandler } from "react";
import { ButtonStyled } from "./Button.styles";

interface IButtonProps {
  className?: string;
  type?: "reset" | "submit" | "button";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  name?: string;
  backgroundColor?: string;
  colorX?: string;
  borderColor?: string;
  hoverColor?: string;
  isBottom?: boolean;
  id?: string;
  isTransparent?: boolean;
  pan?: string;
  isLoading?: boolean;
  isHover?: boolean;
}

/**
 * Reusable button component
 */
const Button: React.FC<React.PropsWithChildren<IButtonProps>> = ({
  children,
  pan,
  ...props
}) => {
  return (
    <ButtonStyled Pan={pan} {...props}>
      {children}
    </ButtonStyled>
  );
};

export default Button;
