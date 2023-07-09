import React, { useState, useEffect } from "react";
// Next
import dynamic from "next/dynamic";
// Messages
import MESSAGES from "@/messages/quizzes";
import { CALCULATION_PROCCESS } from "@/messages/default";
// Utils
import { MIN_QUIZZ_WIN_PERCENTAGE } from "@/utils/constants";
// Components
const Button = dynamic(() => import("@/components/ui/Button"));
// Interface & Types
import { ButtonTypes } from "@/ts/enums";
interface QuizzCompletedProps {
  correctAnswers: number;
  totalQuestions: number;
}

const QuizzCompleted = ({
  correctAnswers,
  totalQuestions,
}: QuizzCompletedProps) => {
  const [isWin, setIsWin] = useState<boolean>(false);
  const [calculationProcess, setCalculationProcess] = useState<boolean>(true);

  useEffect(() => {
    import("../../../utils/helpers").then(({ calculateWinratePercentage }) => {
      const winrate = calculateWinratePercentage({
        correctAnswers,
        totalQuestions,
      });

      if (winrate >= MIN_QUIZZ_WIN_PERCENTAGE) {
        setIsWin(true);
      }

      setCalculationProcess(false);
    });
  }, [correctAnswers, totalQuestions]);

  return (
    <div className="mt-3 flex flex-col space-y-2 items-center justify-center">
      {/** Notify the user that the calculation process is in progress*/}
      {calculationProcess && (
        <h1 className="text-2xl text-blue-500 drop-shadow-md">
          {CALCULATION_PROCCESS}
        </h1>
      )}
      {/** Message & Review */}
      {!calculationProcess && (
        <div className="my-5">
          {/** Lose or win message */}
          <h2
            className={`text-2xl md:text-4xl mt-3 drop-shadow-sm text-center ${
              isWin ? "text-green-500" : "text-red-500"
            }`}
          >
            {isWin ? MESSAGES.WIN_MESSAGE : MESSAGES.LOSE_MESSAGE}
          </h2>
          {/** Correct : Total */}
          <p className="text-center text-gray-500">
            You have successfully answered {correctAnswers} questions out of{" "}
            {totalQuestions}.
          </p>
        </div>
      )}
      {/** Link to the homepage */}
      <Button
        type={ButtonTypes.LINK}
        title="Go back to homepage"
        href={"/"}
        keepDefaultClassName
      />
    </div>
  );
};

export default QuizzCompleted;
