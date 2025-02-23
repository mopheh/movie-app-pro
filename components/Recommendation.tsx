import React, { useEffect, useState } from "react";
import Skeleton from "@/components/Skeleton";
import { useRouter } from "next/navigation";
interface Movie {
    id: number;
    title: string;
    name: string;
    first_air_date: string;
    poster_path: string;
    last_episode_to_air: { runtime: number };
    next_episode_to_air: { runtime: number };
    backdrop_path: string;
    runtime: number;
    release_date: string;
    production_companies: [
      {
        name: string;
        id: number;
      }
    ]
    overview: string;
    vote_average: number;
  };

const Recommendation = ({ id, type }: { id: number; type: string }) => {
  const [movies, setMovies] = useState();
  const router = useRouter();

  const getRecommendations = async () => {
    try {
      const recommendations = await fetch(
        `/api/movies/recommendations?id=${id}&type=${type}`,
      );
      // const data = await recommendations.json();
      const movieText = await recommendations.text(); // Read as text first
      const movieData = movieText.trim() ? JSON.parse(movieText) : {};
      setMovies(movieData.results);
      console.log(movieData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRecommendations();
  }, []);

  return (
    <div className={"flex flex-col gap-4"}>
      <h2 className={"font-bold text-white font-lato"}>Recommendations</h2>
      <div className={"flex gap-2 flex-wrap"}>
        {movies
          ? movies
              .slice(0, 10)
              .map((movie: Movie) => (
                <img
                  key={movie.id}
                  src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                  alt={movie.name || movie.title}
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
    </div>
  );
};
export default Recommendation;
