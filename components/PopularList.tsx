"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Skeleton from "@/components/Skeleton";

interface Movie {
  id: string;
  name: string;
  title: string;
  poster_path: string;
  blurDataUrl: string;
}

interface PopularListProps {
  type?: string | undefined;
}

const PopularList = ({ type }: PopularListProps) => {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const router = useRouter();
  const getMovies = async () => {
    const movies = await fetch(`/api/movies/popular?type=${type}`);
    const data = await movies.json();
    console.log(data);
    setMovies(data.results);
  };

  useEffect(() => {
    getMovies();
  }, []);
  return (
    <div
      className={"flex gap-4 overflow-x-scroll scroll-smooth hide-scrollbar "}
    >
      <Suspense
        fallback={Array.from({ length: 10 }).map((_, index) => (
          <Skeleton key={index} />
        ))}
      >
        <div className="flex gap-4 overflow-x-scroll scroll-smooth hide-scrollbar">
          {movies
            ? movies.map((movie) => (
                <Image
                  key={movie.id}
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className="cursor-pointer"
                  onClick={() =>
                    router.push(
                      `/${type === "tv" ? "series" : type}/${movie.id}`,
                    )
                  }
                  width={200}
                  height={300}
                />
              ))
            : Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} />
              ))}
        </div>
      </Suspense>
    </div>
  );
};
export default PopularList;
