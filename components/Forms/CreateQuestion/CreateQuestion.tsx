import React, { useEffect, useState } from "react";
// Next
import dynamic from "next/dynamic";
// NPM
import { v4 as uuidv4 } from "uuid";
// Components
const Button = dynamic(() => import("@/components/ui/Button"));
// Interface
import { Question } from "@/ts/interfaces";
import { ButtonTypes } from "@/ts/enums";
interface CreateQuestionProps {
  type: "add" | "edit";
  questionData?: Question; // required if type is EDIT
  onSubmit: (question: any) => void; // eslint-disable-line
}

const CreateQuestion = ({
  onSubmit = () => {},
  type = "add",
  questionData,
}: CreateQuestionProps) => {
  const [question, setQuestion] = useState<Question>({
    id: Math.random(),
    answer: "",
    question: "",
  });

  const createInitialQuestionData = () =>
    ({ id: uuidv4(), answer: "", question: "" } as Question);

  useEffect(() => {
    // If the type is "EDIT" load the data from the question we are editing
    if (type === "edit" && questionData) {
      setQuestion(questionData);
    } // otherwise (type is ADD) create initial question data (structure)
    else {
      setQuestion(createInitialQuestionData());
    }
  }, [type, questionData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setQuestion((question: Question) => ({
      ...question,
      [name]: value,
    }));
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent page refreshing
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
