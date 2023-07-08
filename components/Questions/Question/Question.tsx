import React, { useState } from "react";
// Next
import dynamic from "next/dynamic";
// Components
const Toolbar = dynamic(() => import("@/components/Toolbar"));
// Interface & Types
import { Question } from "@/ts/interfaces";
interface QuestionProps {
  question: Question;
  onQuestionToggleEdit: (question: Question) => void;
  onQuestionToggleDelete: (question: Question) => void;
}
const Question = ({
  question,
  onQuestionToggleEdit = () => {},
  onQuestionToggleDelete = () => {},
}: QuestionProps) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(false);

  return (
    <div className="p-2 shadow-sm rounded-lg bg-cyan-600/70 relative flex flex-col items-start justify-start">
      {/** QUESTION */}
      <h2 className="text-white text-2xl drop-shadow-sm">
        {question?.question}
      </h2>
      {/** Answw */}
      {showAnswer ? (
        <p className="ml-2 text-gray-200">-{question?.answer}</p>
      ) : (
        <span
          className="underline text-white cursor-pointer"
          onClick={() => setShowAnswer(true)}
        >
          Show answer
        </span>
      )}
      {/** Question toolbar (DELETE & EDIT - options) */}
      <Toolbar
        className=" absolute top-2 right-2 z-10"
        toggleEditModeStatus={() => {
          onQuestionToggleEdit(question);
        }}
        onDelete={() => {
          onQuestionToggleDelete(question);
        }}
      />
    </div>
  );
};

export default Question;
