import React from "react";
// Next
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
// Utils
import { playQuizzURL, quizzDetailsURL } from "@/utils/urls";
// Interface & Types
import { Quizz } from "@/ts/interfaces";
// Components
const Toolbar = dynamic(() => import("@/components/Toolbar"));

interface QuizzProps {
  quizz: Quizz;
  onQuizzDelete: (quizzID: string) => void; // eslint-disable-line
}

const Quizz = ({ quizz, onQuizzDelete = () => {} }: QuizzProps) => {
  const router = useRouter();

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
        {/** Quizz name */}
        <h2 className="text-white  text-2xl">Quizz: {quizz.name}</h2>
        {/** Quizz toolbar options (PLAY,EDIT,DELETE) */}
        <Toolbar
          className="toolbar absolute top-0 right-0 z-20 p-2"
          includePlayBTN
          onStartPlay={() => router.push(playQuizzURL(quizz?.id))}
          onDelete={() => onQuizzDelete(quizz?.id)}
          toggleEditModeStatus={() => router.push(quizzDetailsURL(quizz?.id))}
        />
      </div>
    </Link>
  );
};

export default Quizz;
