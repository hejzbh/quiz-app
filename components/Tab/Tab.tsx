import React, { useEffect, useState } from "react";
// Interface
interface TabProps {
  name: string;
  children: any;
  defaultOpenStatus?: boolean;
}
const Tab = ({ name = "", children, defaultOpenStatus }: TabProps) => {
  const [isTabOpened, setIsTabOpened] = useState<boolean>(
    defaultOpenStatus as boolean
  );

  useEffect(() => {
    if (!defaultOpenStatus) return;
    setIsTabOpened(defaultOpenStatus);
  }, [defaultOpenStatus]);

  const toggleIsTabOpened = () =>
    setIsTabOpened((openStatus: boolean) => !openStatus);

  return (
    <div className="flex flex-col space-y-2">
      {/** Tab name */}
      <div
        className="py-2 px-6 shadow-md rounded-lg bg-lightGray cursor-pointer transition-all duration-300 ease-in-out hover:opacity-80"
        onClick={toggleIsTabOpened}
      >
        <h1 className="text-black text-2xl drop-shadow-sm">{name}</h1>
      </div>
      {/** Open children (TAB) if isTabOpened state is true */}
      {children && isTabOpened && children}
    </div>
  );
};

export default Tab;
