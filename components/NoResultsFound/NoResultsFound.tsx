import React from "react";
// Next
import Image from "next/image";
// Interface
interface NoResultsFoundProps {
  title: string;
  description?: string;
  altImage?: string;
}
const NoResultsFound = ({
  title,
  description,
  altImage = "No Results",
}: NoResultsFoundProps) => {
  return (
    <div className="p-2 w-fit  flex items-center justify-center flex-col">
      {/** No results image */}
      <Image
        src="/images/noResultsFound.webp"
        alt={altImage}
        loading="lazy"
        width={350}
        height={280}
      />
      {/** Title */}
      <h2 className="text-blueOne text-3xl drop-shadow-sm">{title}</h2>
      {/** Info message or error message */}
      {description && (
        <p className="mt-2 text-gray-600 text-lg drop-shadow-sm">
          {description}
        </p>
      )}
    </div>
  );
};

export default NoResultsFound;
