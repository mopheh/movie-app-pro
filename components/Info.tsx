import React from "react";
import Image from "next/image";
type genre = {
  id: number;
  name: string;
};
type spoken_language = {
  english_name: string;
};
interface Movie {
  movie: {
    id: number;
    title: string;
    name: string;
    first_air_date: string;
    poster_path: string;
    genres: [genre];
    spoken_languages: [spoken_language];
    last_episode_to_air: { runtime: number };
    next_episode_to_air: { runtime: number };
    backdrop_path: string;
    runtime: number;
    release_date: string;
    production_companies: [
      {
        name: string;
        id: number;
      },
    ];
    overview: string;
    vote_average: number;
  };
}

const Info = ({ movie }: Movie) => {
  return (
    <div className={"flex mt-3 font-poppins pr-7 gap-3 xs:pr-12 md:pr-20"}>
      <div className={"flex flex-col flex-auto w-[70%] gap-4 "}>
        <div className={"flex gap-4 text-xs items-center  text-white"}>
          <div>{movie.first_air_date ? "Series" : "Movie"}</div>
          <div>{movie.release_date ?? movie.first_air_date}</div>
          <div>
            {movie.next_episode_to_air
              ? movie.next_episode_to_air.runtime < 60
                ? `${movie.next_episode_to_air.runtime}mins`
                : `${Math.floor(movie.next_episode_to_air.runtime / 60)}h  ${movie.next_episode_to_air.runtime % 60}m`
              : movie.last_episode_to_air
                ? movie.last_episode_to_air.runtime < 60
                  ? `${movie.last_episode_to_air.runtime}mins`
                  : `${Math.floor(movie.last_episode_to_air.runtime / 60)}h  ${movie.last_episode_to_air.runtime % 60}m`
                : movie.runtime < 60
                  ? `${movie.runtime}mins`
                  : `${Math.floor(movie.runtime / 60)}h  ${movie.runtime % 60}m`}
          </div>
          <div className={"flex gap-1 items-center"}>
            <Image
              src={"/icons/star.svg"}
              alt={"rating star"}
              width={20}
              height={20}
            />
            <span className={"text-emerald-400"}>
              {movie.vote_average.toFixed(1)}{" "}
              <span className={"text-white"}>/ 10</span>
            </span>
          </div>
        </div>
        <div className={"text-xs text-white leading-[1.5]"}>
          {movie.overview}
        </div>
      </div>
      <div className={"flex flex-col gap-4 text-xs w-[30%] flex-auto"}>
        <div className={"flex gap-2"}>
          <div className={"text-gray-400"}>Genre:</div>
          <div className={"capitalize text-white"}>
            {movie.genres.map((genre) => `${genre.name}, `)}
          </div>
        </div>
        <div className={"flex gap-2"}>
          <div className={"text-gray-400"}>Languages:</div>
          <div className={"capitalize text-white"}>
            {movie.spoken_languages.map(
              (language) => `${language.english_name}, `,
            )}
          </div>
        </div>{" "}
        <div className={"gap-2"}>
          <div className={"text-gray-400"}>Production Companies:</div>
          <div className={"capitalize text-white flex gap-3"}>
            {movie.production_companies.map((company) => `${company.name},  `)}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Info;
