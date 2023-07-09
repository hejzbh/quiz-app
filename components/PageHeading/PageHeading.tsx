import React from "react";

// Interface
interface PageHeadingProps {
  title: string;
  description?: string;
  className?: string;
}

const PageHeading = ({
  className = "",
  title = "",
  description,
}: PageHeadingProps) => {
  return (
    <div
      className={`bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-b-3xl shadow-lg  ${className}`}
    >
      {/** Title & Description */}
      <div className="text-center min-h-[20vh] flex items-center justify-center flex-col">
        <h1 className="text-white text-[35px] sm:text-[42px] md:text-[55px] drop-shadow-md font-semibold uppercase">
          {title}
        </h1>
        {description && (
          <p className="text-lightGray mt-2 text-xl">{description}</p>
        )}
      </div>
    </div>
  );
};

export default PageHeading;
