import React from "react";
// Next
import dynamic from "next/dynamic";
// Components
const NoQuizzes = dynamic(() => import("@/components/NoQuizzes"));
// Interface
import { Quizz } from "@/ts/interfaces";
interface QuizzessProps {
  quizzes: Quizz[];
  errorMsg?: string;
}
const Quizzes = ({ quizzes, errorMsg }: QuizzessProps) => {
  // If there are no quizzes or error happened..
  if (quizzes?.length === 0 || errorMsg)
    return <NoQuizzes errorMsg={errorMsg} />;

  return <div>Quizzes</div>;
};

export default Quizzes;
