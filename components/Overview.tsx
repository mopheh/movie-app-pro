"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { VolumeX, Volume2 } from "lucide-react";
const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
});
import { motion, AnimatePresence } from "framer-motion";
import { useMovie } from "@/hooks/useMovies";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { OverviewProps } from "@/index";

const Overview = ({ type }: OverviewProps) => {
  const { movieId, mediaType } = useFetch(`/api/overview?type=${type}`);
  const {
    movie,
    trailer,
    showVideo,
    isMuted,
    englishLogo,
    timeoutReached,
    playerRef,
    toggleMute,
    setTimeoutReached,
  } = useMovie(`/api/movies/details?id=${movieId}&type=${mediaType}`, "home");
  const router = useRouter();

  return movie ? (
    <div
      className={
        "relative w-full flex flex-col justify-center items-start h-[500px] sm:h-[600px] md:h-[700px] px-4 xs:px-8 md:px-20"
      }
    >
      {/* Background or Video */}
      {!showVideo || timeoutReached || !trailer ? (
        <div
          className="absolute inset-0 bg-cover bg-center brightness-75 transition-opacity duration-1000"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${
              movie?.backdrop_path || ""
            })`,
          }}
        />
      ) : (
        trailer && (
          <ReactPlayer
            ref={(player: any) => (playerRef.current = player)}
            url={trailer}
            playing={true}
            muted={isMuted}
            volume={1}
            controls={false}
            loop={false}
            width="100%"
            height="100%"
            className="absolute inset-0 object-cover"
            onEnded={() => setTimeoutReached(true)}
          />
        )
      )}

      {/* Mute Button */}
      {!timeoutReached && (
        <button
          onClick={toggleMute}
          className="absolute bottom-20 sm:bottom-28 md:bottom-36 right-4 sm:right-5 z-30 bg-black/70 p-2 sm:p-3 rounded-full text-gray-300 hover:text-white flex items-center justify-center"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      )}

      <div className="absolute inset-0 bg-black opacity-10"></div>

      {/* Content */}
      <div className="text-white flex flex-col gap-4 sm:gap-5 md:gap-6 max-w-lg sm:max-w-xl md:max-w-2xl relative">
        {/* Title */}
        <div>
          <span className="text-xs sm:text-sm uppercase tracking-widest">
            {mediaType === "tv" ? "Series" : mediaType}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-anton tracking-tight leading-tight mt-2">
            {englishLogo ? (
              <Image
                src={`https://image.tmdb.org/t/p/original/${englishLogo.file_path}`}
                alt={movie?.title || movie?.name}
                width={300}
                height={100}
                className="w-[200px] sm:w-[250px] md:w-[300px] h-auto"
              />
            ) : (
              movie?.title || movie?.name
            )}
          </h1>
        </div>

        {/* Genres + Rating */}
        <div className="flex flex-wrap gap-3 sm:gap-5 text-sm sm:text-base">
          <div className="flex gap-2 sm:gap-3">
            <span className="text-gray-300">Genres:</span>
            <span className="text-emerald-300">
              {movie.genres.map((genre: { name: string }) => `${genre.name}, `)}
            </span>
          </div>
          <div className="flex gap-2 sm:gap-3 items-center">
            <Image
              src="/icons/star.svg"
              alt="rating star"
              width={18}
              height={18}
              className="w-[16px] sm:w-[18px]"
            />
            <span className="text-emerald-400">
              {movie.vote_average.toFixed(1)}{" "}
              <span className="text-white">/ 10</span>
            </span>
          </div>
        </div>

        {/* Overview Text */}
        <AnimatePresence>
          {(timeoutReached || !trailer) && (
            <motion.div
              className="relative z-10 text-white"
              initial={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{
                opacity: 0,
                y: -50,
                filter: "blur(10px)",
                transition: { duration: 1 },
              }}
            >
              <p className="mt-1 sm:mt-2 text-sm sm:text-base md:text-lg line-clamp-4">
                {movie?.overview}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <Button
            className={
              "bg-dark-300 text-white px-4 sm:px-6 py-4 font-nunito-sans font-bold text-xs sm:text-sm uppercase tracking-tight hover:text-dark-100"
            }
            onClick={() => router.push(`/${mediaType}/${movie?.id}`)}
          >
            <Image
              src="/icons/circle-info-solid.svg"
              alt="info"
              width={18}
              height={18}
              className="text-white"
            />
            More Info
          </Button>
          <Button
            className={
              "bg-light-300 text-dark-100 px-4 sm:px-6 py-4 font-nunito-sans font-bold text-xs sm:text-sm uppercase tracking-tight hover:bg-light-400"
            }
          >
            <Image
              src="/icons/play-solid.svg"
              alt="info"
              width={18}
              height={18}
              className="text-white"
            />
            Watch Now
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div className="animate-pulse bg-gray-800 rounded-lg w-full h-[500px] sm:h-[600px] md:h-[700px]" />
  );
};

export default Overview;
