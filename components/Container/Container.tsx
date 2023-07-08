import React from "react";
// Interface
interface ContainerProps {
  className?: string;
  children: any;
}
const Container = ({ className = "", children }: ContainerProps) => {
  return (
    <div className={`container mx-auto my-10 ${className}`}>{children}</div>
  );
};

export default Container;
