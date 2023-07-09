import React, { useState, useEffect } from "react";
// Next
import dynamic from "next/dynamic";
// Components
const Question = dynamic(() => import("@/components/Questions/Question"));
const Button = dynamic(() => import("@/components/ui/Button"));
// Interface
import { Question as QuestionType } from "@/ts/interfaces";
import { ButtonTypes } from "@/ts/enums";

interface RecycledQuestionsProps {
  questions: QuestionType[];
  notSameAs?: QuestionType[];
  onSubmit: (selectedRecycledQuestions: QuestionType[]) => void; // eslint-disable-line
}
const RecycledQuestions = ({
  questions,
  notSameAs = [],
  onSubmit = () => {},
}: RecycledQuestionsProps) => {
  const [recycledQuestions, setRecycledQuestions] = useState<QuestionType[]>(
    []
  );
  const [selectedQuestions, setSelectedQuestions] = useState<QuestionType[]>(
    []
  );

  useEffect(() => {
    // We dont want to filter unique questions
    if (!notSameAs) {
      setRecycledQuestions(questions);
      return;
    }

    // We want to have unique recycled quesitons (not same as "notSameAs" array);
    import("../../utils/helpers").then(({ makeArrayUnique }) => {
      const uniqueRecycledQuestions: any = makeArrayUnique({
        unique: questions,
        notSameAs,
        uniqueProperty: ["id", "question"],
      });

      setRecycledQuestions(uniqueRecycledQuestions);
    });
  }, [questions, notSameAs]);

  const selectQuestion = (question: QuestionType) => {
    const questionAlreadySelected = selectedQuestions?.some(
      (selectedQuestion) => selectedQuestion?.id === question?.id
    );

    if (questionAlreadySelected) {
      setSelectedQuestions((selectedQuestions) =>
        selectedQuestions?.filter(
          (selectedQuestion) => selectedQuestion?.id !== question?.id
        )
      );
    } else {
      setSelectedQuestions((selectedQuestions) => [
        ...selectedQuestions,
        question,
      ]);
    }
  };

  return (
    <div className="bg-white p-2 rounded-lg min-w-[50%] min-h-[10em]">
      {/** Title */}
      <h2 className="text-2xl font-semibold text-center drop-shadow-md text-blue-500">
        {recycledQuestions?.length > 0
          ? "Recycled questions:"
          : "There is no recycled questions"}
      </h2>
      {/** List of recycled questions */}
      <div className="flex flex-col space-y-2 mt-3">
        {recycledQuestions?.map((question) => {
          const isQuestionSelected = selectedQuestions?.some(
            (selectedQuestion) => selectedQuestion?.id === question?.id
          );
          return (
            <Question
              key={question?.id}
              showAnswerOnDefault
              question={question}
              disableToolbar
              className={`cursor-pointer transition-all duration-200 ease-in-out hover:scale-90 hover:animate-pulse ${
                isQuestionSelected ? "opacity-100 !bg-green-500" : "opacity-70"
              }`}
              onQuestionSelected={selectQuestion}
            />
          );
        })}
      </div>
      {/** Submit button (Recycled questions --->>> quizz questions) */}
      {selectedQuestions?.length > 0 && (
        <Button
          title="Add"
          type={ButtonTypes.BUTTON}
          onClick={() => onSubmit(selectedQuestions)}
          keepDefaultClassName
          className="mt-5 float-right"
        />
      )}
    </div>
  );
};

export default RecycledQuestions;
