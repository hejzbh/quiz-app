import React from "react";
// Next
import dynamic from "next/dynamic";
// Messages
import { ARE_YOU_READY_TO_PLAY } from "@/messages/quizzes";
//  Enums
import { ButtonTypes } from "@/ts/enums";
// Components
const Button = dynamic(() => import("@/components/ui/Button"));
// Interface
interface ReadyToPlayProps {
  quizzName: string;
  onPressStart: () => void;
}
const ReadyToPlay = ({
  quizzName,
  onPressStart = () => {},
}: ReadyToPlayProps) => {
  return (
    <div className="text-center">
      {/** Title */}
      <h2 className="text-blueOne text-3xl drop-shadow-sm">
        {ARE_YOU_READY_TO_PLAY} {quizzName} ?
      </h2>
      {/** Play quizz button */}
      <Button
        type={ButtonTypes.BUTTON}
        title={"Start"}
        onClick={onPressStart}
        keepDefaultClassName
        className="mt-5 transition-all duration-300 ease-in-out hover:translate-y-1 hover:opactiy-90 hover:animate-pulse"
      />
    </div>
  );
};

export default ReadyToPlay;
