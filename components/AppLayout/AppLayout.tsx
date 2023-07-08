import React from "react";
// Next
import dynamic from "next/dynamic";
// Components
const Header = dynamic(() => import("@/components/Header"));
// Interface
interface AppLayoutProps {
  children: any;
}
const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default AppLayout;
