"use client";
import React, { useEffect, useState } from "react";
interface Movie {
  id: string;
  title: string;
  poster_path: string;
}
const Popular = () => {
  const [movies, setMovies] = useState<Movie[] | null>(null);
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
    movies && (
      <div className={"flex flex-col gap-3 my-5 relative"}>
        <h1
          className={
            "font-poppins uppercase font-semibold text-white my-3 text-2xl px-7 xs:px-12 md:px-20"
          }
        >
          New & Popular
        </h1>
        <div
          className={
            "flex gap-4 overflow-x-scroll scroll-smooth hide-scrollbar "
          }
        >
          {movies
            ? movies.map((movie) => (
                <img
                  key={movie.id}
                  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                  alt={"movie"}
                  className={"cursor-pointer"}
                  width={200}
                  height={300}
                />
              ))
            : "Loading...."}
        </div>
      </div>
    )
  );
};
export default Popular;
