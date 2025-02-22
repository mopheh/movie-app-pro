import React from "react";
import { XIcon } from "lucide-react";

const SideContent = () => {
  return (
    <>
      <div
        className={"fixed inset-0 w-screen h-screen backdrop-blur-md z-20"}
      ></div>
      <div className="fixed right-0 top-0 w-1/3 h-screen bg-gray-800 z-30 p-4 shadow-lg">
        <div
          className="absolute top-8 right-8 flex items-center gap-1 text-white text-sm font-poppins cursor-pointer"
          // onClick={onClose}
        >
          <XIcon className="h-6 w-6" /> Close
        </div>

        <div className="text-white p-4">
          <h3 className={"font-poppins"}>Know More</h3>
        </div>
      </div>
    </>
  );
};
export default SideContent;
