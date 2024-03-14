import { Dispatch, SetStateAction } from "react";

export interface LoaderContextProps {
  showLoader: boolean;
  setShowLoader: Dispatch<SetStateAction<boolean>>;
}