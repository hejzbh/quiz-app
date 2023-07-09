import React, { useState } from "react";
// Next
import dynamic from "next/dynamic";
// Types & Interfaces
import { ButtonTypes } from "@/ts/enums";
import { Question } from "@/ts/interfaces";
// Components
const Button = dynamic(() => import("@/components/ui/Button"));
const Modal = dynamic(() => import("@/components/Modal"));
const CreateQuestion = dynamic(
  () => import("@/components/Forms/CreateQuestion")
);
const RecycledQuestions = dynamic(
  () => import("@/components/RecycledQuestions")
);
const Question = dynamic(() => import("./Question"));
// Interface
interface QuestionsProps {
  questions: Question[];
  recycledQuestions?: Question[];
  onChange: (question: Question) => void; // eslint-disable-line
  onQuestionDelete: (deletedQuestion: Question) => void; // eslint-disable-line
  onDeleteAll: () => void;
  handleSetRecycledQuestions?: (selectedRecycledQuestions: Question[]) => void; // eslint-disable-line
}
const Questions = ({
  questions = [],
  onChange = () => {},
  onQuestionDelete,
  onDeleteAll = () => {},
  handleSetRecycledQuestions = () => {},
  recycledQuestions = [],
}: QuestionsProps) => {
  const [questionModal, setQuestionModal] = useState<{
    type: "add" | "edit";
    open: boolean;
  }>({ type: "add", open: false });
  const [openRecycledQuestions, setOpenRecycledQuestions] =
    useState<boolean>(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question>();

  return (
    <div className="w-full">
      <div className="mt-2 flex items-center justify-start flex-col  md:flex-row space-y-2 md:space-y-0 md:space-x-2">
        {/** BTN - Open modal for add question */}
        <Button
          title="Add question"
          type={ButtonTypes.BUTTON}
          onClick={() => setQuestionModal({ type: "add", open: true })}
          keepDefaultClassName
          className="max-w-[180px] min-w-[230px] md:min-w-0"
        />

        {/** Btn for recycled Questions */}
        {recycledQuestions?.length > 0 && (
          <Button
            title="Get recycled questions"
            type={ButtonTypes.BUTTON}
            onClick={() => setOpenRecycledQuestions(true)}
            keepDefaultClassName
            className="min-w-[230px] md:min-w-0"
          />
        )}
        {/** Btn for delete questions */}
        {questions?.length > 0 && (
          <Button
            title="Delete all questions"
            type={ButtonTypes.BUTTON}
            onClick={onDeleteAll}
            className="max-w-[250px]  !bg-[red] text-white py-2 px-6 rounded-lg min-w-[230px] md:min-w-0"
          />
        )}
      </div>

      {/** Question modal (for add  or edit questions) */}
      {questionModal.open && (
        <Modal onClose={() => setQuestionModal({ type: "add", open: false })}>
          <CreateQuestion
            type={questionModal?.type}
            onSubmit={(question) => {
              onChange(question);
              // CLose modal
              setQuestionModal({ type: "add", open: false });
            }}
            questionData={selectedQuestion}
          />
        </Modal>
      )}

      {/** Recycled questions MODAL */}
      {openRecycledQuestions && recycledQuestions?.length > 0 && (
        <Modal onClose={() => setOpenRecycledQuestions(false)}>
          <RecycledQuestions
            questions={recycledQuestions}
            onSubmit={(recycledQuestions) => {
              handleSetRecycledQuestions(recycledQuestions);
              setOpenRecycledQuestions(false);
            }}
            notSameAs={questions} // We dont want to have same questions as questions we already have in our quizz
          />
        </Modal>
      )}

      {/** Questions list */}
      <div className="flex flex-col space-y-2 mt-5">
        {questions?.map((question) => (
          <Question
            key={question?.id}
            question={question}
            onQuestionToggleEdit={(selectedQuestion) => {
              setSelectedQuestion(selectedQuestion);
              setQuestionModal({ type: "edit", open: true });
            }}
            onQuestionToggleDelete={(deletedQuestion: Question) =>
              onQuestionDelete(deletedQuestion)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Questions;
