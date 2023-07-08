import React, { useEffect, useState } from "react";
// Next
import dynamic from "next/dynamic";
// Components
const Button = dynamic(() => import("@/components/ui/Button"));
// Interface
import { Question } from "@/ts/interfaces";
import { ButtonTypes } from "@/ts/enums";
interface CreateQuestionProps {
  type: "add" | "edit";
  questionData?: Question; // required if type is EDIT
  onSubmit: (question: any) => void; // eslint-disable-line
  onChange?: (question: any) => void; // required if type is EDIT  // eslint-disable-line
}

const CreateQuestion = ({
  onSubmit = () => {},
  onChange = () => {},
  type = "add",
  questionData,
}: CreateQuestionProps) => {
  const [question, setQuestion] = useState<Question>({
    id: Math.random(),
    answer: "",
    question: "",
  });

  useEffect(() => {
    if (type === "edit" && questionData) {
      setQuestion(questionData);
    }
  }, [type, questionData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (type === "edit" && onChange) {
      onChange({ ...questionData, [name]: value });
    }

    setQuestion((question: Question) => ({
      ...question,
      [name]: value,
    }));
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent app from refreshing
    if (!onSubmit) return;

    onSubmit(question);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md min-w-[50%]">
      <h2 className="text-blue-500 my-4 font-semibold uppercase text-2xl text-center">
        {type === "add" ? "Add" : "Edit"} Question
      </h2>
      {/** Form */}
      <form
        className="flex flex-col justify-center items-center space-y-4"
        onSubmit={submitForm}
      >
        <input
          name="question"
          placeholder="Question"
          value={question?.question}
          key={5353}
          onChange={handleInputChange}
          className={
            "py-2 px-10 rounded-md border-[2px] mx-auto w-full max-w-[400px]  border-cyan-500 text-gray-500 outline-none"
          }
        />
        <input
          name="answer"
          placeholder="Answer"
          value={question?.answer}
          key={6236236}
          onChange={handleInputChange}
          className={
            "py-2 px-10 rounded-md border-[2px] mx-auto w-full max-w-[400px]  border-cyan-500 text-gray-500 outline-none"
          }
        />
        <Button
          type={ButtonTypes.SUBMIT}
          title={`${type === "add" ? "Add" : "Edit"} Question`}
          keepDefaultClassName
          className="mt-10"
          onClick={submitForm as any}
        />
      </form>
    </div>
  );
};

export default CreateQuestion;
