import React from "react";
import dynamic from "next/dynamic";
import Overview from "@/components/Overview";
const Popular = dynamic(() => import("@/components/Popular"));

import Trending from "@/components/Trending";

const Page = () => {
  return (
    <div className={"font-poppins"}>
      <Overview />
      <Popular />
      <Trending />
    </div>
  );
};
export default Page;
