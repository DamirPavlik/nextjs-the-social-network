import { ErrorProps } from "@/types";

const Error: React.FC<ErrorProps> = ({ errors, type }) => {
  if (typeof errors === "object" && errors !== null && type in errors) {
    return <div>{errors[type]}</div>;
  } else {
    return null;
  }
};

export default Error;
