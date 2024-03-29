import { Dispatch, SetStateAction } from "react";

export interface TitleContextProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}