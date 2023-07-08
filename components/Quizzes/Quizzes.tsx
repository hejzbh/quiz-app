import React from "react";
// Next
import dynamic from "next/dynamic";
// Components
const NoQuizzes = dynamic(() => import("@/components/NoQuizzes"));
const Container = dynamic(() => import("@/components/Container"));
const Quizz = dynamic(() => import("@/components/Quizzes/Quizz"));
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

  return (
    <Container className="flex flex-col space-y-5">
      {quizzes?.map((quizz) => (
        <Quizz quizz={quizz} key={quizz.id} />
      ))}
    </Container>
  );
};

export default Quizzes;
