"use client";
import React, { RefObject, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { LucideMoveLeft, LucideMoveRight } from "lucide-react";
import Skeleton from "@/components/Skeleton";
import useFetch from "@/hooks/useFetch";

const Trending = ({ type }: TrendingProps) => {
  const { results: movies } = useFetch(`/api/movies/trending?type=${type}`);
  console.log(movies);
  const scrollRef: RefObject<null> = useRef<null>(null);

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
        className="absolute left-0 top-1/2 z-20 -translate-y-1/2 h-[300px] bg-white bg-opacity-10 text-white p-2"
      >
        <LucideMoveLeft />
      </button>
      <div
        ref={scrollRef}
        className={"flex overflow-x-auto scroll-smooth hide-scrollbar "}
      >
        {movies?.length
          ? movies.slice(0, 10).map((movie: MovieProps, index) => (
              <div
                key={movie.id}
                className={
                  "flex overflow-y-hidden items-end w-[300px] relative min-w-[300px]"
                }
              >
                <div
                  className={
                    "text-[200px] leading-[0] h-[220px] w-1/2 -right-2 flex justify-end  tracking-tighter items-center text-right  font-anton relative count"
                  }
                >
                  {index + 1}
                </div>
                <Link href={`/${movie.media_type}/${movie.id}`}>
                  <Image
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                        : `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8z8AHAAMBAQAYj0lcAAAAAElFTkSuQmCC`
                    }
                    alt={"movie"}
                    className={"cursor-pointer relative "}
                    width={150}
                    height={226}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8z8AHAAMBAQAYj0lcAAAAAElFTkSuQmCC"
                  />
                </Link>
              </div>
            ))
          : Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} />
            ))}
      </div>
      <button
        onClick={() => scroll(300)}
        className="absolute right-0 top-1/2 -translate-y-1/2 h-[300px] bg-white bg-opacity-10 text-white p-2"
      >
        <LucideMoveRight />
      </button>
    </div>
  );
};
export default Trending;
