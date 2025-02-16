import React from "react";
import Image from "next/image";
import Skeleton from "@/components/Skeleton";

type cast = {
  id: number;
  name: string;
  profile_path: string;
  character: string;
};
interface Movie {
  movie: {
    casts: { cast: cast[] };
  };
}
const Casts = ({ movie }: Movie) => {
  return (
    <div className={"flex flex-col gap-3 text-white"}>
      <h2 className={"text-bold"}>Casts</h2>
      <div className={"flex gap-2 flex-wrap"}>
        {movie
          ? movie.casts.cast.slice(0, 12).map((cast) => (
              <div
                key={cast.id}
                className={"flex flex-col gap-1 font-poppins items-center"}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/original/${cast.profile_path}`}
                  alt={cast.name}
                  className="cursor-pointer"
                  // onClick={() => router.push(`/movie/${movie.id}`)}
                  width={200}
                  height={300}
                />
                <p className={"text-sm"}>{cast.name}</p>
                <h3 className={"font-nunito-sans m-0 text-base font-bold"}>
                  {cast.character}
                </h3>
              </div>
            ))
          : Array.from({ length: 12 }).map((_, index) => (
              <Skeleton key={index} />
            ))}
      </div>
    </div>
  );
};
export default Casts;
