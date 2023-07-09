import React, { useState } from "react";
// Next
import dynamic from "next/dynamic";
// Icons
import { BiDotsVerticalRounded as DotsIcon } from "react-icons/bi";
import {
  AiFillDelete as DeleteIcon,
  AiOutlineEdit as EditIcon,
  AiOutlineClose as CloseIcon,
} from "react-icons/ai";
import { FaPlay as PlayIcon } from "react-icons/fa";
// Components
const Button = dynamic(() => import("@/components/ui/Button"));
// Interface & Types
import { ButtonTypes } from "@/ts/enums";
interface ToolbarProps {
  toggleEditModeStatus?: () => void;
  onStartPlay?: () => void;
  onDelete: () => void;
  className?: string;
  includePlayBTN?: boolean;
}
const Toolbar = ({
  className = "",
  toggleEditModeStatus = () => {},
  onStartPlay = () => {},
  onDelete = () => {},
  includePlayBTN = false,
}: ToolbarProps) => {
  const [openToolbar, setOpenToolbar] = useState<boolean>(false);
  return (
    <div className={`${className}`}>
      {openToolbar ? (
        <div className="absolute top-0 right-0 min-w-[60px]  min-h-[5em]  p-1 bg-white drop-shadow-lg rounded-md flex flex-col space-y-2 items-center justify-center">
          {includePlayBTN && (
            <Button
              type={ButtonTypes.BUTTON}
              title="Play"
              onlyIcon
              onClick={() => {
                onStartPlay();
                setOpenToolbar(false);
              }}
              Icon={PlayIcon}
              iconClassName="text-2xl text-blue-500 drop-shadow-md"
            />
          )}
          <Button
            type={ButtonTypes.BUTTON}
            title="Edit"
            onlyIcon
            onClick={() => {
              toggleEditModeStatus();
              setOpenToolbar(false);
            }}
            Icon={EditIcon}
            iconClassName="text-2xl text-blue-500 drop-shadow-md"
          />
          <Button
            type={ButtonTypes.BUTTON}
            title="Delete"
            onlyIcon
            onClick={() => {
              onDelete();
              setOpenToolbar(false);
            }}
            Icon={DeleteIcon}
            iconClassName="text-2xl text-blue-500 drop-shadow-md"
          />
          <Button
            type={ButtonTypes.BUTTON}
            title="Close"
            onlyIcon
            onClick={() => {
              setOpenToolbar(false);
            }}
            Icon={CloseIcon}
            iconClassName="text-2xl text-[red] drop-shadow-md"
          />
        </div>
      ) : (
        <Button
          type={ButtonTypes.BUTTON}
          title="Open toolbar"
          onlyIcon
          onClick={() => setOpenToolbar(true)}
          Icon={DotsIcon}
          iconClassName="text-2xl text-white drop-shadow-md"
        />
      )}
    </div>
  );
};

export default Toolbar;
