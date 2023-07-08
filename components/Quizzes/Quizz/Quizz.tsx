import React from "react";
// Next
import Link from "next/link";
import dynamic from "next/dynamic";
// Utils
import { quizzDetailsURL } from "@/utils/urls";
// Interface & Types
import { Quizz } from "@/ts/interfaces";
// Components
const Toolbar = dynamic(() => import("@/components/Toolbar"));
interface QuizzProps {
  quizz: Quizz;
}
const Quizz = ({ quizz }: QuizzProps) => {
  return (
    <Link
      href={quizzDetailsURL(quizz.id)}
      title={`View ${quizz.name}`}
      onClick={(e) => {
        const userClickedOnToolbar = (e as any)?.target?.closest(".toolbar");
        if (userClickedOnToolbar) {
          e.preventDefault();
        }
      }}
    >
      <div className="bg-cyan-500 p-2 rounded-lg shadow-md relative">
        <h2 className="text-white  text-2xl">Quizz: {quizz.name}</h2>
        <Toolbar
          className="toolbar absolute top-2 right-2 z-20"
          onDelete={() => {}}
          toggleEditModeStatus={() => {}}
        />
      </div>
    </Link>
  );
};

export default Quizz;
