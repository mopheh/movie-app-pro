"use client";
import React, { useRef } from "react";
import Image from "next/image";

const Trending = () => {
  const scrollRef = useRef<null>(null);

  const scroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += offset;
    }
  };
  return (
    <div className={"flex flex-col gap-3 my-6 relative"}>
      <h1
        className={
          "font-poppins uppercase font-semibold text-white my-3 text-2xl px-7 xs:px-12 md:px-20"
        }
      >
        Trending
      </h1>
      <button
        onClick={() => scroll(-300)}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black text-white p-2"
      >
        {"<"}
      </button>
      <div
        ref={scrollRef}
        className={"flex gap-6 overflow-x-auto scroll-smooth hide-scrollbar "}
      >
        <div
          className={
            "flex overflow-y-hidden items-center w-[320px] relative min-w-[320px]"
          }
        >
          <div
            className={
              "text-[338px] leading-[0] h-[300px] flex justify-center items-center  text-center w-min font-anton absolute count"
            }
          >
            1
          </div>
          <Image
            src={"/images/movie7.jpg"}
            alt={"movie"}
            className={"cursor-pointer relative ml-auto"}
            width={200}
            height={300}
          />
        </div>
        <div
          className={
            "flex overflow-y-hidden items-center w-80 relative min-w-[320px]"
          }
        >
          <div
            className={
              "text-[338px] leading-[0]  h-[300px] flex justify-center items-center  text-center  w-min font-anton absolute count"
            }
          >
            2
          </div>
          <Image
            src={"/images/movie6.jpg"}
            alt={"movie"}
            className={"cursor-pointer relative ml-auto"}
            width={200}
            height={300}
          />
        </div>
        <div
          className={
            "flex overflow-y-hidden items-center w-80 relative min-w-[320px]"
          }
        >
          <div
            className={
              "text-[338px] leading-[0]  h-[300px] flex justify-center items-center  text-center text-center w-min font-anton absolute count"
            }
          >
            3
          </div>
          <Image
            src={"/images/movie3.jpg"}
            alt={"movie"}
            className={"cursor-pointer relative ml-auto"}
            width={200}
            height={300}
          />
        </div>
        <div
          className={
            "flex overflow-y-hidden items-center w-80 relative min-w-[320px]"
          }
        >
          <div
            className={
              "text-[338px] leading-[0]  h-[300px] flex justify-center items-center  text-center text-center w-min font-anton absolute count"
            }
          >
            4
          </div>
          <Image
            src={"/images/movie4.jpg"}
            alt={"movie"}
            className={"cursor-pointer relative ml-auto"}
            width={200}
            height={300}
          />
        </div>
        <div
          className={
            "flex overflow-y-hidden items-center w-80 relative min-w-[320px]"
          }
        >
          <div
            className={
              "text-[338px] leading-[0]  h-[300px] flex justify-center items-center  text-center text-center w-min font-anton absolute count"
            }
          >
            5
          </div>
          <Image
            src={"/images/movie5.jpg"}
            alt={"movie"}
            className={"cursor-pointer relative ml-auto"}
            width={200}
            height={300}
          />
        </div>
        <div
          className={
            "flex overflow-y-hidden items-center w-80 relative min-w-[320px]"
          }
        >
          <div
            className={
              "text-[338px] leading-[0]  h-[300px] flex justify-center items-center  text-center text-center w-min font-anton absolute count"
            }
          >
            6
          </div>
          <Image
            src={"/images/movie2.jpg"}
            alt={"movie"}
            className={"cursor-pointer relative ml-auto"}
            width={200}
            height={300}
          />
        </div>
        <div
          className={
            "flex overflow-y-hidden items-center w-80 relative min-w-[320px]"
          }
        >
          <div
            className={
              "text-[338px] leading-[0]  h-[300px] flex justify-center items-center  text-center text-center w-min font-anton absolute count"
            }
          >
            7
          </div>
          <Image
            src={"/images/movie1.jpg"}
            alt={"movie"}
            className={"cursor-pointer relative ml-auto"}
            width={200}
            height={300}
          />
        </div>
      </div>
      <button
        onClick={() => scroll(300)}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black text-white p-2"
      >
        {">"}
      </button>
    </div>
  );
};
export default Trending;
