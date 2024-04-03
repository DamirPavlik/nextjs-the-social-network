import { ButtonProps } from "@/types";

const Button: React.FC<ButtonProps> = ({
  title,
  containerStyles,
  textStyles,
  buttonType,
}) => {
  return (
    <button
      type={buttonType || "button"}
      className={`${containerStyles} text-primary-text bg-primary-bg-tint hover:bg-primary-bg  border-[2px] border-border-color rounded-md transition-all duration-300 ease-linear`}
    >
      <span className={`${textStyles}`}>{title}</span>
    </button>
  );
};

export default Button;
