"use client";
import React from "react";
import Image from "next/image";
import {casts, collection, movieVideo} from "..";

type Genre = {
  id: number;
  name: string;
};
type SpokenLanguage = {
  english_name: string;
};
interface Movie {
  movie: {
    id: string;
    title: string;
    name: string;
    poster_path: string;
    genres: [Genre];
    first_air_date: string;
    belongs_to_collection: collection;
    last_episode_to_air: { runtime: number };
    next_episode_to_air: { runtime: number };
    spoken_languages: [SpokenLanguage];
    backdrop_path: string;
    media_type: string;
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
    videos: movieVideo[];
    status: string;
    casts: {
      cast: casts[];
    };
  };
}

const Info = ({ movie }: Movie) => {
  const getRuntime = () => {
    const runtime =
      movie.next_episode_to_air?.runtime ??
      movie.last_episode_to_air?.runtime ??
      movie.runtime;

    if (!runtime) return "N/A";
    return runtime < 60
      ? `${runtime}m`
      : `${Math.floor(runtime / 60)}h ${runtime % 60}m`;
  };

  return (
    <div className="flex flex-col md:flex-row mt-3 font-poppins gap-6 text-white relative">
      {/* Left section (Overview + Info) */}
      <div className="flex flex-col flex-auto md:w-2/3 gap-4">
        {/* Top Row (Type, Date, Runtime, Rating) */}
        <div className="flex flex-wrap gap-3 text-xs items-center text-gray-200">
          <span>{movie.first_air_date ? "Series" : "Movie"}</span>
          <span>{movie.release_date ?? movie.first_air_date}</span>
          <span>{getRuntime()}</span>

          <div className="flex gap-1 items-center">
            <Image
              src="/icons/star.svg"
              alt="rating star"
              width={18}
              height={18}
              className="inline-block"
            />
            <span className="text-emerald-400">
              {movie.vote_average.toFixed(1)}
              <span className="text-gray-300"> / 10</span>
            </span>
          </div>
        </div>

        {/* Overview */}
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
          {movie.overview || "No description available."}
        </p>
      </div>

      {/* Right section (Details) */}
      <div className="flex flex-col gap-3 text-xs md:w-1/3">
        <div className="flex flex-wrap gap-2">
          <span className="text-gray-400 min-w-[100px]">Genre:</span>
          <span className="capitalize text-gray-100 break-words">
            {movie.genres.map((g) => g.name).join(", ") || "N/A"}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-gray-400 min-w-[100px]">Languages:</span>
          <span className="capitalize text-gray-100 break-words">
            {movie.spoken_languages.map((l) => l.english_name).join(", ") ||
              "N/A"}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-gray-400 min-w-[100px]">
            Production Companies:
          </span>
          <span className="capitalize text-gray-100 break-words">
            {movie.production_companies.map((c) => c.name).join(", ") || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Info;
