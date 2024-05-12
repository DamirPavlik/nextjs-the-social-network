import { User } from "firebase/auth";

export interface authFormProps {
  isRegister: boolean;
}

export interface ButtonProps {
  title: string;
  buttonType?: "button" | "submit";
  containerStyles?: string;
  textStyles?: string;
}

export interface UserProps {
  user: User | null;
}

export interface PostProps {
  id: string;
  content: string;
  likes: number;
  title: string;
  username: string;
  profilePicture: string;
}

export interface ErrorProps {
  errors: boolean | { [key: string]: string };
  type: string;
}
