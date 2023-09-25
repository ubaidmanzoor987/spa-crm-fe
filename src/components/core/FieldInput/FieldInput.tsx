import { FieldInputStyled } from "./FieldInput.styles";
import { IInputProps } from "./FieldInput.types";

const FieldInput = ({ isShadow,isEndContent ,Left, ...props }: IInputProps) => {
  const style = Left ? { paddingLeft: `${Left}rem` } : {};
  return (
    <FieldInputStyled
    isShadow={isShadow}
      {...props}
      isEndContent={isEndContent}
      {...props}
      InputProps={{
        style: { ...style },
      }}
    />
  );
};

export default FieldInput;
