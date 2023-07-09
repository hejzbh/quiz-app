import React, { useState } from "react";
// Next
import dynamic from "next/dynamic";
// Components
const Toolbar = dynamic(() => import("@/components/Toolbar"));
// Interface & Types
import { Question } from "@/ts/interfaces";
interface QuestionProps {
  question: Question;
  onQuestionToggleEdit?: (question: Question) => void; // eslint-disable-line
  onQuestionToggleDelete?: (question: Question) => void; // eslint-disable-line
  disableToolbar?: boolean;
  className?: string;
  onQuestionSelected?: (question: Question) => void; // eslint-disable-line
  showAnswerOnDefault?: boolean;
}
const Question = ({
  question,
  onQuestionToggleEdit = () => {},
  onQuestionToggleDelete = () => {},
  disableToolbar = false,
  className = "",
  showAnswerOnDefault = false,
  onQuestionSelected = () => {},
}: QuestionProps) => {
  const [showAnswer, setShowAnswer] = useState<boolean>(showAnswerOnDefault);

  return (
    <div
      onClick={() => {
        if (onQuestionSelected) onQuestionSelected(question);
      }}
      className={`p-2 shadow-sm rounded-lg bg-cyan-600/70 relative flex flex-col items-start justify-start ${className}`}
    >
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
      {!disableToolbar && (
        <Toolbar
          className=" absolute top-2 right-2 z-10"
          toggleEditModeStatus={() => {
            onQuestionToggleEdit(question);
          }}
          onDelete={() => {
            onQuestionToggleDelete(question);
          }}
        />
      )}
    </div>
  );
};

export default Question;
