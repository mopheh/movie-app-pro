"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Skeleton from "@/components/Skeleton";
import useFetch from "@/hooks/useFetch";

const PopularList = ({ type }: { type: string }) => {
  const router = useRouter();
  const { results: movies } = useFetch(`/api/movies/popular?type=${type}`);

  return (
    <div className="flex gap-4 overflow-x-scroll scroll-smooth hide-scrollbar">
      {movies?.length
        ? movies.map((movie) => (
            <Image
              key={movie.id}
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                  : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8z8AHAAMBAQAYj0lcAAAAAElFTkSuQmCC"
              }
              alt={movie.title || movie.name}
              className="cursor-pointer"
              onClick={() =>
                router.push(`/${type === "tv" ? "series" : type}/${movie.id}`)
              }
              width={200}
              height={300}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8z8AHAAMBAQAYj0lcAAAAAElFTkSuQmCC"
            />
          ))
        : Array.from({ length: 8 }).map((_, index) => <Skeleton key={index} />)}
    </div>
  );
};

export default PopularList;
