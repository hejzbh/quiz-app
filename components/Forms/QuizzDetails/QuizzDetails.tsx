import React, { useEffect, useState } from "react";
// Next
import dynamic from "next/dynamic";
// Setup
import { createQuizzFormFields } from "@/setup/CreateQuizzFormFields";
// Utils
import { sortFieldByTabs } from "@/utils/helpers";
// Interfaces & Enums
import {
  APIEndpoints,
  APIMethods,
  FieldTypes,
  LocalStorageKey,
} from "@/ts/enums";
import { Question, QuizzFormField } from "@/ts/interfaces";
// Components
const Tab = dynamic(() => import("@/components/Tab"));
const Actions = dynamic(() => import("@/components/Actions"));

interface QuizzDetailsProps {
  type: "edit" | "add";
  data?: { name: string; questions: Question[]; id: string };
  onSubmit?: () => void;
}

const QuizzDetails = ({
  type,
  data,
  onSubmit = () => {},
}: QuizzDetailsProps) => {
  const [quizzId, setQuizzId] = useState<any>(Math.random());
  const [quizzData, setQuizzData] = useState<{
    id: string;
    name: string;
    questions: Question[];
  }>({ name: "", questions: [], id: Math.random().toString() });

  useEffect(() => {
    setQuizzId(Math.random());
  }, []);

  useEffect(() => {
    if (!data) return;
    setQuizzData(data);
  }, [data]);

  useEffect(() => {
    if (!type) return;
    getSavedQuizzData(type); // eslint-disable-line (We cant await async function inside useEffect, it is unnecessary too)
  }, [type]);

  const getSavedQuizzData = async (quizzId: string) => {
    // Import helpers functions - We dont need them until we call this function, so this is the best way to prevent unused code
    const { readFromLocalStorage } = await import("../../../utils/helpers");

    // Try to get saved quizz data for EDIT mode
    if (type === "add") {
      const savedCreateQuizzData = readFromLocalStorage(
        LocalStorageKey.CREATE_QUIZZ
      );
      if (!savedCreateQuizzData) return;
      setQuizzData(savedCreateQuizzData);
    } //Try to get saved quizz data for specific quizz
    else {
      const savedQuizzData = readFromLocalStorage(
        LocalStorageKey.QUIZZ + `/${quizzId}`
      );
      if (!savedQuizzData) return;
      setQuizzData(savedQuizzData);
    }
  };

  const handleInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    validation?: { validationFunction: any; validationProps?: any }
  ) => {
    // Get value and name of input
    const { value, name } = e.target;

    // If validation is required for this change
    if (validation?.validationFunction) {
      const isValueCorrect: boolean = validation?.validationFunction(
        value,
        validation?.validationProps
      );

      // If input value is incorrect, return;

      if (!isValueCorrect) return;
    }

    // Update form..
    setQuizzData((quizData) => ({
      ...quizData,
      [name]: value,
    }));

    // Import helpers functions - We dont need them until we call this function, so this is the best way to prevent unused code
    const { saveInLocalStorage } = await import("../../../utils/helpers");

    // Save the current changes in case the user accidentally refreshes the page.
    saveInLocalStorage({
      name:
        type === "add"
          ? LocalStorageKey.CREATE_QUIZZ
          : LocalStorageKey.QUIZZ + `/${quizzId}`,
      value: {
        ...quizzData,
        [name]: value,
      },
    });
  };

  const handleQuestionsChange = async (question: Question) => {
    // Import helpers functions - We dont need them until we call this function, so this is the best way to prevent
    // unused code
    const { arrayValueExists, saveInLocalStorage } = await import(
      "../../../utils/helpers"
    );

    // Does question already exists ?
    const questionExists = arrayValueExists(
      quizzData?.questions as any,
      question,
      "id"
    );

    // Edit..
    if (questionExists) {
      setQuizzData((quizzData) => ({
        ...quizzData,
        questions: quizzData?.questions?.map((existingQuestion) =>
          existingQuestion?.id === question?.id ? question : existingQuestion
        ), // update value..
      }));

      // Save the current changes in case the user accidentally refreshes the page.
      saveInLocalStorage({
        name:
          type === "add"
            ? LocalStorageKey.CREATE_QUIZZ
            : LocalStorageKey.QUIZZ + `/${quizzId}`,
        value: {
          ...quizzData,
          questions: quizzData?.questions?.map((existingQuestion) =>
            existingQuestion?.id === question?.id ? question : existingQuestion
          ),
        },
      });
    } else {
      // add
      setQuizzData((quizzData) => ({
        ...quizzData,
        questions: [...quizzData?.questions, question], // new value, new question.
      }));

      // Save the current changes in case the user accidentally refreshes the page.
      saveInLocalStorage({
        name:
          type === "add"
            ? LocalStorageKey.CREATE_QUIZZ
            : LocalStorageKey.QUIZZ + `/${quizzId}`,
        value: {
          ...quizzData,
          questions: [...quizzData?.questions, question],
        },
      });
    }
  };

  const handleQuestionDelete = async (
    deletedQuestion: Question,
    isAll?: boolean
  ) => {
    // Import helpers functions - We dont need them until we call this function, so this is the best way to prevent unused code
    const { saveInLocalStorage } = await import("../../../utils/helpers");
    // Update quizz (delete)
    setQuizzData((quizzData) => ({
      ...quizzData,
      questions: isAll
        ? []
        : quizzData?.questions?.filter(
            (quizzQuestion) => quizzQuestion?.id !== deletedQuestion?.id
          ),
    }));
    // Update local storage value for this quizz
    saveInLocalStorage({
      name:
        type === "add"
          ? LocalStorageKey.CREATE_QUIZZ
          : LocalStorageKey.QUIZZ + `/${quizzId}`,
      value: {
        ...quizzData,
        questions: isAll
          ? []
          : quizzData?.questions?.filter(
              (quizzQuestion) => quizzQuestion?.id !== deletedQuestion?.id
            ),
      },
    });
  };

  const submitQuizz = async () => {
    try {
      // Import functions (prevent unused code)
      const [fetchAPI, removeFromLocalStorage] = await Promise.all([
        import("@/api/fetchAPI").then((res) => res.fetchAPI),
        import("../../../utils/helpers").then(
          (res) => res.removeFromLocalStorage
        ),
      ]);

      // Make api call
      await fetchAPI({
        method: type === "edit" ? APIMethods.PUT : APIMethods.POST,
        id: type === "edit" ? quizzData?.id : null,
        endpoint:
          type === "edit" ? APIEndpoints.editQuizz : APIEndpoints.postQuizz,
        data: quizzData,
      });

      // Remove saved data from local storage...
      removeFromLocalStorage(
        type === "add"
          ? LocalStorageKey.CREATE_QUIZZ
          : LocalStorageKey.QUIZZ + `/${quizzId}`
      );

      onSubmit(); // if we want to do something after submiting the form.
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div>
      <div className="flex flex-col space-y-10">
        {sortFieldByTabs(createQuizzFormFields)?.map(
          (
            { tab, fields }: { tab: string; fields: QuizzFormField[] },
            i: number
          ) => {
            return (
              <Tab name={tab} defaultOpenStatus={i === 0} key={i}>
                {/** Render fields for current tab */}
                {fields?.map((field) => {
                  switch (field?.type) {
                    case FieldTypes.INPUT:
                      return (
                        <input
                          key={field?.name}
                          // Input name (event.target.name)
                          name={field?.name}
                          // Input value (event.target.value)
                          value={(quizzData as any)[field?.name]}
                          // On change
                          onChange={(e) =>
                            handleInputChange(e, {
                              validationFunction: field?.testValidation,
                              validationProps:
                                field?.testValidationProps || null,
                            })
                          }
                          // Style classname
                          className={
                            "py-2 px-10 rounded-md border-[2px] mx-auto w-full max-w-[400px]  border-cyan-500 text-gray-500 outline-none"
                          }
                          // Label / Placeholder
                          placeholder={field?.placeholder}
                        />
                      );
                    case FieldTypes.COMPONENT:
                      const Component: React.FC<any> =
                        field.Component as React.FC;
                      return (
                        <Component
                          {...field}
                          questions={quizzData?.questions}
                          onChange={handleQuestionsChange}
                          onQuestionDelete={handleQuestionDelete}
                          onDeleteAll={() =>
                            handleQuestionDelete(undefined as any, true)
                          }
                        />
                      );
                    default:
                      return null;
                  }
                })}
              </Tab>
            );
          }
        )}
      </div>
      {quizzData?.questions?.length > 0 && (
        <Actions enableSubmit onSubmit={submitQuizz} />
      )}
    </div>
  );
};

export default QuizzDetails;
