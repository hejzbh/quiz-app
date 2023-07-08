// Components
import Questions from "@/components/Questions";
// Interface & Enum
import { Tabs } from "@/ts/enums";
import { QuizzFormField } from "@/ts/interfaces";
// Utils
import { MAX_QUIZZ_NAME_LENGTH } from "@/utils/constants";
import { maxStringLength } from "@/utils/helpers";

export const createQuizzFormFields: QuizzFormField[] = [
  {
    type: "INPUT",
    name: "name",
    placeholder: "Quizz name",
    Tab: Tabs.TITLE,
    key: 1,
    testValidation: maxStringLength as any,
    testValidationProps: {
      max: MAX_QUIZZ_NAME_LENGTH, // Max name length for quiz is 40, otherwise we will get error
    },
  },
  {
    type: "COMPONENT",
    name: "name",
    placeholder: "Quizz name",
    Tab: Tabs.QUESTIONS,
    key: 1,
    Component: Questions as React.FC,
  },
];
