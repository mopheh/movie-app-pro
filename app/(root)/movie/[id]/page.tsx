"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

import { PlusIcon, Volume2, VolumeX } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import ReactPlayer from "react-player";

type genre = {
  id: number;
  name: string;
};
interface Movie {
  id: string;
  title: string;
  name: string;
  poster_path: string;
  genres: [genre];
  backdrop_path: string;
  runtime: number;
  release_date: string;
  overview: string;
  vote_average: number;
}
type MovieVideo = {
  key: string;
  site: string;
  type: string;
};

type MovieData = {
  results: MovieVideo[];
};
const Page = () => {
  const { id: movieId } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const router = useRouter();
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [trailer, setTrailer] = useState<string>();
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // @ts-ignore
  const playerRef = useRef<InstanceType<typeof ReactPlayer> | null>(null);

  const getMovieDetails = async () => {
    try {
      const movieDetails = await fetch(
        `/api/movies/details?id=${movieId}&type=movie`,
      );

      if (!movieDetails.ok) {
        throw new Error(`HTTP error! Status: ${movieDetails.status}`);
      }
      const movieText = await movieDetails.text(); // Read as text first
      const movieData = movieText.trim() ? JSON.parse(movieText) : {};
      setMovie(movieData);
      console.log(movieData);
      await fetchTrailer(movieData.videos);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchTrailer = async (movie: MovieData) => {
    const trailer = movie.results.find(
      (video: any) => video.type === "Trailer" && video.site === "YouTube",
    );

    if (trailer) {
      setTrailer(
        `https://www.youtube.com/watch?v=${trailer.key}?autoplay=1&mute=1`,
      );
      console.log(trailer);
    }
  };
  useEffect(() => {
    getMovieDetails();
    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);
  const toggleMute = () => {
    if (playerRef.current) {
      const internalPlayer = playerRef.current.getInternalPlayer();
      if (isMuted) {
        internalPlayer?.unMute();
        setIsMuted(false);
        console.log("🔊 Unmuted!");
      } else {
        internalPlayer?.mute();
        setIsMuted(true);
        console.log("🔇 Muted!");
      }
    }
  };
  // @ts-ignore
  return (
    movie && (
      <div className={"pl-7 xs:pl-12 md:pl-20 flex gap-3 h-[783px] relative"}>
        <div className={"flex flex-col gap-3 mt-16 w-[25%]"}>
          <div className={"flex justify-between items-center"}>
            <Button
              className={
                "bg-gray-600 text-xs rounded-full px-8 text-white font-poppins"
              }
              onClick={() => router.back()}
            >
              ⬅ Go Back
            </Button>
            <Button
              className={
                "rounded-full border-2 hover:bg-dark-400 border-white bg-transparent text-white"
              }
            >
              <PlusIcon />
            </Button>
          </div>
          <img
            // key={movie.id}
            src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
            alt={"movie"}
            className={"cursor-pointer"}
            width="100%"
            height="100%"
          />
        </div>
        <div
          className="inset-0 bg-top gap-4 bg-cover relative -z-0 transition-opacity duration-1000 w-[75%] h-[640px]"
          // style={{
          //   backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
          // }}
        >
          {!showVideo || !trailer ? (
            <div
              className="inset-0 bg-cover brightness-75 transition-opacity duration-1000"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path || ""})`,
              }}
            />
          ) : (
            trailer && (
              <ReactPlayer
                ref={(player) => (playerRef.current = player)}
                url={trailer}
                playing={true} // ✅ Auto Play
                muted={isMuted} // ✅ Start Muted
                volume={1} // ✅ Max Volume
                controls={false}
                loop={true}
                width="100%"
                height="100%"
                className="relative inset-0"
                onReady={() => {
                  console.log("✅ Video is ready");
                  setShowVideo(true);
                }}
              />
            )
          )}
          <div className="absolute inset-0 bg-black opacity-20"></div>
          {showVideo && (
            <button
              onClick={toggleMute}
              className="absolute bottom-36 right-5 z-30 bg-black/70 p-3 rounded-full text-gray-300 hover:text-white flex items-center justify-center"
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>
          )}
          <div className={"flex mt-3 font-poppins pr-7 xs:pr-12 md:pr-20"}>
            <div className={"flex flex-col flex-1 gap-4"}>
              <div className={"flex gap-4 text-xs  text-white"}>
                <div>Movie</div>
                <div>{movie.release_date}</div>
                <div>
                  {movie.runtime < 60
                    ? `${movie.runtime}mins`
                    : `${Math.floor(movie.runtime / 60)}h  ${movie.runtime % 60}m`}
                </div>
              </div>
              <div className={"text-xs text-white leading-[1.5]"}>
                {movie.overview}
              </div>
            </div>
            <div className={"flex flex-col gap-4 text-xs"}>
              <div className={"flex gap-2"}>
                <div className={"text-gray-400"}>Genre:</div>
                <div className={"capitalize text-white"}>
                  {movie.genres.map((genre) => `${genre.name}, `)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
export default Page;
