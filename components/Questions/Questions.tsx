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
const Question = dynamic(() => import("./Question"));
// Interface
interface QuestionsProps {
  questions: { id: string; answer: string; question: string }[];
  onChange: (question: Question) => void;
  onQuestionDelete: (deletedQuestion: Question) => void;
  onDeleteAll: () => void;
}
const Questions = ({
  questions = [],
  onChange = () => {},
  onQuestionDelete,
  onDeleteAll = () => {},
}: QuestionsProps) => {
  const [questionModal, setQuestionModal] = useState<{
    type: "add" | "edit";
    open: boolean;
  }>({ type: "add", open: false });
  const [selectedQuestion, setSelectedQuestion] = useState<Question>();

  return (
    <div>
      {/** BTN - Open modal for add question */}
      <Button
        title="Add question"
        type={ButtonTypes.BUTTON}
        onClick={() => setQuestionModal({ type: "add", open: true })}
        keepDefaultClassName
        className="max-w-[180px] mx-auto mt-3"
      />
      {/** Btn for delete questions */}
      {questions?.length > 0 && (
        <Button
          title="Delete all questions"
          type={ButtonTypes.BUTTON}
          onClick={onDeleteAll}
          className="max-w-[250px] ml-2 mx-auto mt-3 !bg-[red] text-white py-2 px-6 rounded-lg"
        />
      )}
      {/** Question modal (for add if there are no questions or edit) */}
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
