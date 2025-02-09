import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const Overview = () => {
  return (
    <div
      className={
        "w-full flex items-center h-[700px] bg-cover px-7 xs:px-12 md:px-20"
      }
      style={{ backgroundImage: "url('/images/bg-one.jpg')" }}
    >
      <div className={"text-white flex flex-col gap-6 max-w-xl"}>
        <h1 className={"text-7xl font-anton tracking-tight"}>
          Prison Cell 211
        </h1>
        <div className={"flex gap-5"}>
          <div className={"flex gap-3"}>
            <span className={"text-gray-300"}>Genres:</span>
            <span className={"text-emerald-300"}>Thriller / Suspense</span>
          </div>
          <div className={"flex gap-3"}>
            <Image
              src={"/icons/star.svg"}
              alt={"rating star"}
              width={20}
              height={20}
            />
            <span className={"text-emerald-400"}>
              4.5 <span className={"text-white"}>/ 50</span>
            </span>
          </div>
        </div>
        <p className={"overview-text text-base leading-[1.6]"}>
          As they arrive at the farmhouse in the dead of night, they're attacked
          by an unseen animal and barricade themselves inside the home as the
          creature prowls the perimeter.{" "}
        </p>
        <div className={"flex gap-3"}>
          <Button
            className={
              "bg-dark-300 text-white p-6 font-nunito-sans font-bold text-sm uppercase tracking-tight hover:text-dark-100"
            }
          >
            <Image
              src={"/icons/circle-info-solid.svg"}
              alt={"info"}
              width={20}
              className={"text-white"}
              height={20}
            />
            More Info
          </Button>
          <Button
            className={
              "bg-light-300 text-dark-100 p-6 font-nunito-sans font-bold text-sm uppercase tracking-tight hover:bg-light-400 "
            }
          >
            <Image
              src={"/icons/play-solid.svg"}
              alt={"info"}
              width={20}
              className={"text-white"}
              height={20}
            />
            Watch Now
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Overview;
