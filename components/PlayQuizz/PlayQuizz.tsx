import React, { useState, useMemo } from "react";
// Next
import dynamic from "next/dynamic";
// Components
const ReadyToPlay = dynamic(() => import("@/components/PlayQuizz/ReadyToPlay"));
const Button = dynamic(() => import("@/components/ui/Button"));
const QuizzCompleted = dynamic(
  () => import("@/components/PlayQuizz/QuizzCompleted")
);
// Interface & Types
import { Quizz } from "@/ts/interfaces";
import { ButtonTypes } from "@/ts/enums";
interface PlayQuizzProps {
  quizz: Quizz;
}
const PlayQuizz = ({ quizz }: PlayQuizzProps) => {
  const [start, setStart] = useState<boolean>(false);
  const [finish, setFinish] = useState<boolean>(false);

  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<any[]>([]);

  const [userAnswer, setUserAnswer] = useState<string>("");

  const isLastQuestion = useMemo(
    () => activeQuestionIdx + 1 >= quizz?.questions?.length,
    [activeQuestionIdx, quizz]
  );

  const endQuizz = () => {
    setFinish(true);
    setStart(false);
  };

  const checkIsAnswerCorrect = () => {
    // Get correct answer
    const correctAnswer = quizz?.questions[activeQuestionIdx]?.answer;

    // Check is our answer correct
    const isAnswerCorrect =
      userAnswer?.toLowerCase()?.replaceAll(" ", "") ===
      correctAnswer?.toLocaleLowerCase()?.replaceAll(" ", ""); // because user can type "michaEl" but correct answer is "Michael"

    // If our answer is correct, store them inside correctAnswers
    if (isAnswerCorrect) {
      setCorrectAnswers((correctAnswers) => [
        ...correctAnswers,
        quizz?.questions[activeQuestionIdx],
      ]);
    }
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    checkIsAnswerCorrect();
    setUserAnswer("");

    if (isLastQuestion) {
      endQuizz();
    } else {
      setActiveQuestionIdx((idx) => idx + 1);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center my-5">
      {finish ? (
        <QuizzCompleted
          totalQuestions={+quizz?.questions?.length}
          correctAnswers={+correctAnswers?.length}
        />
      ) : (
        <>
          {start ? (
            <form
              onSubmit={onFormSubmit}
              className="flex flex-col justify-center items-center w-full"
            >
              <h2 className="text-2xl font-semibold mb-2 text-cyan-500">
                {quizz?.questions[activeQuestionIdx]?.question}
              </h2>
              <input
                name="answer"
                placeholder="Answer"
                value={userAnswer}
                key={5353}
                onChange={(e) => setUserAnswer(e.target.value)}
                className={
                  "py-2 px-10 rounded-md border-[2px] mx-auto w-full max-w-[800px]  border-cyan-500 text-gray-500 outline-none"
                }
              />
              <Button
                type={ButtonTypes.SUBMIT}
                title={isLastQuestion ? "Finish" : "Next"}
                disabled={!userAnswer}
                keepDefaultClassName
                className="mt-5 disabled:opacity-50"
                onClick={onFormSubmit as any}
              />
              <Button
                type={ButtonTypes.BUTTON}
                title={"Show the answer"}
                className="mt-5 underline text-gray-700"
                onClick={() => {
                  setUserAnswer(quizz?.questions[activeQuestionIdx]?.answer);
                }}
              />
              <p className="text-center mt-5 text-blue-700">
                {activeQuestionIdx + 1} of {quizz?.questions?.length} questions
              </p>
            </form>
          ) : (
            <ReadyToPlay
              quizzName={quizz?.name}
              onPressStart={() => setStart(true)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PlayQuizz;
