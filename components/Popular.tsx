import React from "react";
import PopularList from "@/components/PopularList";

interface PopularProps {
  type?: string;
}

const Popular = ({ type }: PopularProps) => {
  return (
    <div className={"flex flex-col gap-3 my-5 relative"}>
      <h1
        className={
          "font-poppins uppercase font-semibold text-white my-3 text-2xl px-7 xs:px-12 md:px-20"
        }
      >
        New & Popular
      </h1>
      <PopularList type={type ?? ""} />
    </div>
  );
};
export default Popular;
