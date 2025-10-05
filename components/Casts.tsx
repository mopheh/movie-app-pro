"use client";
import React from "react";
import Image from "next/image";
import Skeleton from "@/components/Skeleton";
import {MovieProps} from "@/index";


const Casts = ({ movie }: { movie: MovieProps | null }) => {
  const casts = movie?.casts?.cast?.slice(0, 12) || [];

  return (
    <section className="flex flex-col gap-4 mt-8">
      <h2 className="font-bold text-white font-lato text-lg md:text-xl">
        Casts
      </h2>

      {/* Responsive grid / horizontal scroll */}
      <div
        className="
          flex md:grid
          gap-3
          overflow-x-auto md:overflow-x-visible
          md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6
          pb-2 scrollbar-hide
        "
      >
        {casts.length > 0
          ? casts.map((cast) => (
              <div
                key={cast.id}
                className="
                  flex-shrink-0
                  w-[120px] sm:w-[140px] md:w-auto
                  flex flex-col items-center text-center
                  gap-2 cursor-pointer
                  hover:scale-105 transition-transform
                "
              >
                <div className="w-full h-[180px] sm:h-[200px] md:h-[220px] relative">
                  <Image
                    src={
                      cast.profile_path
                        ? `https://image.tmdb.org/t/p/original/${cast.profile_path}`
                        : `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8z8AHAAMBAQAYj0lcAAAAAElFTkSuQmCC`
                    }
                    alt={cast.name}
                    fill
                    className="object-cover rounded-md"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8z8AHAAMBAQAYj0lcAAAAAElFTkSuQmCC"
                  />
                </div>
                <p
                  className="text-white text-xs sm:text-sm font-poppins truncate w-[100px] sm:w-[120px]"
                  title={cast.name}
                >
                  {cast.name}
                </p>
                <h3
                  className="font-nunito-sans text-gray-400 text-[0.7rem] sm:text-xs font-semibold truncate w-[100px] sm:w-[120px]"
                  title={cast.character}
                >
                  {cast.character}
                </h3>
              </div>
            ))
          : Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[120px] sm:w-[140px] md:w-auto"
              >
                <Skeleton />
              </div>
            ))}
      </div>
    </section>
  );
};

export default Casts;
