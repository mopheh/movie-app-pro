import React from "react";
import dynamic from "next/dynamic";
import Overview from "@/components/Overview";
import Trending from "@/components/Trending";
import Popular from "@/components/Popular";

const Page = () => {
  return (
    <div className={"font-poppins"}>
      <Overview type={"movie"} />
      <Popular type={"movie"} />
      <Trending type={"movie"} />
    </div>
  );
};
export default Page;
