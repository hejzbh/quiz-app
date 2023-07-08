import React from "react";
// Next
import dynamic from "next/dynamic";
// Messages
import QuizzesMessages from "@/messages/quizzes";
// Utils
import { createQuizzURL } from "@/utils/urls";
// Components
const NoResultsFound = dynamic(() => import("@/components/NoResultsFound"));
const Button = dynamic(() => import("@/components/ui/Button"));
// Interface & Types
import { ButtonTypes } from "@/ts/enums";
interface NoQuizzesProps {
  errorMsg?: string;
}
const NoQuizzes = ({ errorMsg }: NoQuizzesProps) => {
  return (
    <div className="flex items-center justify-center flex-col space-y-3">
      <NoResultsFound
        title={QuizzesMessages?.NO_ACTIVE_QUIZZES}
        description={errorMsg}
      />
      {/** If error doesnt exists, user will be able to create his first quizz */}
      {!errorMsg && (
        <Button
          title="Create quizz"
          type={ButtonTypes.LINK}
          href={createQuizzURL()}
          keepDefaultClassName
        />
      )}
    </div>
  );
};

export default NoQuizzes;
