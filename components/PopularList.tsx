"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Skeleton from "@/components/Skeleton";
interface Movie {
  id: string;
  title: string;
  poster_path: string;
  blurDataUrl: string;
}
const PopularList = () => {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const router = useRouter();
  const getMovies = async () => {
    const movies = await fetch("/api/movies/popular");
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
                  alt={movie.title}
                  className="cursor-pointer"
                  onClick={() => router.push(`/movie/${movie.id}`)}
                  width={200}
                  height={300}
                />
              ))
            : // ✅ Show shimmer effect while loading
              Array.from({ length: 8 }).map((_, index) => (
                <Skeleton key={index} />
              ))}
        </div>
      </Suspense>
    </div>
  );
};
export default PopularList;
