"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
  setId,
  setShowTrailer,
}: {
  items: {
    overview: string;
    name: string;
    title: string;
    id: number;
    backdrop_path: string;
    media_type: string;
    runtime: number;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
  setId?: (id: number) => void;
  setShowTrailer?: boolean;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
    console.log(items);
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };
  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20  max-w-screen-2xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          " flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
          start && "animate-scroll ",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items &&
          items.map((item, idx) => (
            <li
                key={idx}
              className="w-[500px] max-w-full relative h-[386px]  bg-cover rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[700px]"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${item?.backdrop_path})`,
              }}
              key={item?.title || item?.name}
            >
              <div className="absolute z-20 inset-0 bg-black opacity-40"></div>
              <div
                className={
                  "flex flex-col justify-items-center justify-around h-full"
                }
              >
                <h1 className="relative z-20 text-4xl leading-[1.6] text-white font-anton font-normal">
                  <img
                    src={
                      item?.images?.logos?.find(
                        (logo) => logo.iso_639_1 === "en",
                      )?.file_path &&
                      `https://image.tmdb.org/t/p/original/${
                        item.images.logos.find(
                          (logo) => logo.iso_639_1 === "en",
                        ).file_path
                      }`
                    }
                    alt={item?.title || item?.name}
                    width={"40%"}
                  />
                </h1>
                <span className="relative z-20 text-sm leading-[1.6] text-gray-50 font-poppins font-normal">
                  <div className={"flex gap-5 my-2"}>
                    <div className={"flex gap-3"}>
                      <span className={"text-gray-300"}>Genres:</span>
                      <span className={"text-[#10E305]"}>
                        {item.genres.map((genre) => `${genre.name}, `)}
                      </span>
                    </div>
                    <div className={"flex gap-1"}>
                      <Image
                        src={"/icons/star.svg"}
                        alt={"rating star"}
                        width={20}
                        height={20}
                      />
                      <span className={"text-[#10E305]"}>
                        {item.runtime < 60
                          ? `${item.runtime}mins`
                          : `${Math.floor(item.runtime / 60)}h  ${item.runtime % 60}m`}
                      </span>
                    </div>
                    <div className={"flex gap-3"}>
                      <span className={"text-gray-300"}>Streaming Date:</span>
                      <span className={"text-[#10E305]"}>3 PM WAT</span>
                    </div>
                  </div>
                  <span className=" relative z-20 text-sm leading-[1.6] line-clamp-3 text-white font-normal">
                    {item?.overview}
                  </span>
                </span>
                <div className={"flex relative z-20 mt-6 gap-3"}>
                  <Button
                    className={
                      "bg-dark-300 text-white p-6 font-nunito-sans font-bold text-sm uppercase tracking-tight hover:text-dark-100"
                    }
                    // onClick={() => router.push(`/${mediaType}/${movie?.id}`)}
                  >
                    <Image
                      src={"/icons/circle-info-solid.svg"}
                      alt={"info"}
                      width={15}
                      className={"text-white"}
                      height={15}
                    />
                    More Info
                  </Button>
                  <Button
                    className={
                      "bg-light-300 text-dark-100 p-6 font-nunito-sans font-bold text-sm uppercase tracking-tight hover:bg-light-400 "
                    }
                    onClick={() => {
                      setId(item?.id);
                      setShowTrailer(true);
                    }}
                  >
                    <Image
                      src={"/icons/play-solid.svg"}
                      alt={"info"}
                      width={15}
                      className={"text-white"}
                      height={15}
                    />
                    Watch Trailer
                  </Button>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};
