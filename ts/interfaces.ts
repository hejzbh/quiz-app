// Types
import { MethodAPI, EndpointAPI, FieldType } from "./types";

export interface FetchAPIParams {
  method: MethodAPI;
  endpoint: EndpointAPI;
  id?: string | null; // We will provide ID to "FetchAPI" function in case that we are trying to delete or edit quizz.
  data?: Quizz | undefined;
  errorMsg?: string;
}

export interface Quizz {
  id: string;
  name: string;
  questions: Question[];
}

export interface Question {
  id: string | number;
  question: string;
  answer: string;
}

export interface APIError {
  result: null;
  errorMsg?: string;
}

export interface QuizzFormField {
  type: FieldType;
  Component?: React.FC;
  name: string;
  key: number;
  placeholder: string;
  Tab: string;
  testValidation?: () => boolean;
  testValidationProps?: any;
}

export interface NavLink {
  name: string;
  href: string;
}

export interface SaveInLocalStorageParams {
  name: string;
  value: any;
}

export interface MakeArrayUniqueParams {
  unique: any[];
  notSameAs: any;
  uniqueProperty?: string;
}

export interface CalculateWinrateProps {
  correctAnswers: number;
  totalQuestions: number;
}
