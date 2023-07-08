import React from "react";
// Next
import Link from "next/link";
// Utils
import { BUTTON_CLASSNANE } from "@/utils/defaultClassNames";
// Interface & Types & Enums
import { ButtonTypes } from "@/ts/enums";
import { ButtonType } from "@/ts/types";
interface ButtonProps {
  title: string;
  Icon?: any;
  onClick?: () => void;
  type: ButtonType;
  href?: string;
  className?: string;
  iconClassName?: string;
  keepDefaultClassName?: boolean;
  onlyIcon?: boolean;
}
const Button = ({
  title = "",
  Icon,
  onClick = () => {},
  type,
  href,
  keepDefaultClassName,
  onlyIcon,
  iconClassName = "",
  className = "",
}: ButtonProps) => {
  if (type === ButtonTypes.BUTTON) {
    return (
      <button
        onClick={onClick}
        type="button"
        title={title}
        className={`${keepDefaultClassName && BUTTON_CLASSNANE} ${className}`}
      >
        {onlyIcon ? null : title}
        {Icon && <Icon className={iconClassName} />}
      </button>
    );
  } else {
    return (
      <Link
        href={href as string}
        title={title}
        className={`${keepDefaultClassName && BUTTON_CLASSNANE} ${className}`}
      >
        {onlyIcon ? null : title}
        {Icon && <Icon className={iconClassName} />}
      </Link>
    );
  }
};

export default Button;
