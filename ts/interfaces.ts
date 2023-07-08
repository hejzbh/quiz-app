// Types
import { MethodAPI, EndpointAPI } from "./types";

export interface FetchAPIParams {
  method: MethodAPI;
  endpoint: EndpointAPI;
  id?: string; // We will provide ID to "FetchAPI" function in case that we are trying to delete or edit quizz.
  data?: Quizz | undefined;
  errorMsg?: string;
}

export interface Quizz {
  id: string;
  name: string;
  questions: Question[];
}

export interface Question {
  id: string;
  question: string;
  answer: string;
}

export interface APIError {
  result: null;
  errorMsg?: string;
}
