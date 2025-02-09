import React from "react";
import Overview from "@/components/Overview";
import Popular from "@/components/Popular";
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
