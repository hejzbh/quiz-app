import React from "react";
// Next
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
// Components
const NoQuizzes = dynamic(() => import("@/components/NoQuizzes"));
const Container = dynamic(() => import("@/components/Container"));
const Quizz = dynamic(() => import("@/components/Quizzes/Quizz"));
// Interface & Enums
import { APIEndpoints, APIMethods } from "@/ts/enums";
import { Quizz } from "@/ts/interfaces";
interface QuizzessProps {
  quizzes: Quizz[];
  errorMsg?: string;
}
const Quizzes = ({ quizzes, errorMsg }: QuizzessProps) => {
  const router = useRouter();

  const deleteQuizz = async (quizzID: string) => {
    try {
      if (!quizzID) return;

      // Import fetchAPI function (prevent unused code)
      const { fetchAPI } = await import("@/api/fetchAPI");

      // Trigger delete quiz from API
      await fetchAPI({
        method: APIMethods.DELETE,
        id: quizzID,
        endpoint: APIEndpoints.deleteQuiz,
      });

      // Make api call (POST Recycled Questions)
      await fetchAPI({
        method: APIMethods.POST,
        endpoint: APIEndpoints.postRecycledQuestions,
        data: quizzes?.find((quizz) => quizz?.id === quizzID)?.questions as any,
      });

      // Refresh get static props
      router.replace(router.asPath);
    } catch (err: any) {
      alert(err?.message);
    }
  };

  // If there are no quizzes or error happened..
  if (quizzes?.length === 0 || errorMsg)
    return <NoQuizzes errorMsg={errorMsg} />;

  return (
    <Container className="flex flex-col space-y-5">
      {quizzes?.map((quizz) => (
        <Quizz quizz={quizz} key={quizz.id} onQuizzDelete={deleteQuizz} />
      ))}
    </Container>
  );
};

export default Quizzes;
