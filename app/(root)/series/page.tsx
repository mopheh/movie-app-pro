import React from "react";
import Overview from "@/components/Overview";
import Trending from "@/components/Trending";
import Popular from "@/components/Popular";

const Page = () => {
  return (
    <div className={"font-poppins"}>
      <Overview type={"tv"} />
      <Popular type={"tv"} />
      <Trending type={"tv"} />
    </div>
  );
};
export default Page;
