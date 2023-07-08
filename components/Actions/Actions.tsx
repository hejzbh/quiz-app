import React from "react";
// Next
import dynamic from "next/dynamic";
// Components
const Button = dynamic(() => import("@/components/ui/Button"));
// Interface  & Types
import { ButtonTypes } from "@/ts/enums";
interface ActionsProps {
  enableCancel?: boolean;
  enableSubmit?: boolean;
  onSubmit?: () => void;
  onCancel?: () => void;
}
const Actions = ({
  enableCancel,
  enableSubmit,
  onSubmit = () => {},
  onCancel = () => {},
}: ActionsProps) => {
  return (
    <div className="flex items-center justify-end space-x-2 w-full mt-10">
      {enableCancel && (
        <Button
          type={ButtonTypes.BUTTON}
          title="Cancel"
          onClick={onCancel}
          className="!bg-[red] text-white py-1 px-3  hover:translate-y-1 transition-all duration-200 ease-out"
        />
      )}
      {enableSubmit && (
        <Button
          type={ButtonTypes.BUTTON}
          title="Submit"
          onClick={onSubmit}
          className="!bg-blue-500 text-white py-1 px-3 hover:translate-y-1 transition-all duration-200 ease-out"
        />
      )}
    </div>
  );
};

export default Actions;
