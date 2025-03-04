import React from "react";
import dynamic from "next/dynamic";
import Overview from "@/components/Overview";
const Popular = dynamic(() => import("@/components/Popular"));

import Trending from "@/components/Trending";

const Page = () => {
  return (
    <div className={"font-poppins"}>
      <Overview type={"all"} />
      <Popular type={"movie"} />
      <Trending type={"all"} />
    </div>
  );
};
export default Page;
