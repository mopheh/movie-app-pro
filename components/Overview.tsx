"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { VolumeX, Volume2 } from "lucide-react";

const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
});
import { motion, AnimatePresence } from "framer-motion";
import { router } from "next/client";
import { useRouter } from "next/navigation";
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
const Overview = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [trailer, setTrailer] = useState<string>();
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [mediaType, setMediaType] = useState<string>("");
  const [englishLogo, setEnglishLogo] = useState<string>("");
  const [timeoutReached, setTimeoutReached] = useState<boolean>(false);
  const router = useRouter();
  // @ts-ignore
  const playerRef = useRef<InstanceType<typeof ReactPlayer> | null>(null);

  const getMovies = async () => {
    try {
      const movies = await fetch("/api/overview");

      if (!movies.ok) {
        throw new Error(`HTTP error! Status: ${movies.status}`);
      }

      const text = await movies.text(); // Read as text first
      const data = text.trim() ? JSON.parse(text) : {};
      const randNum = Math.floor(Math.random() * data.results.length);

      const movieId = data.results[randNum]?.id;
      setMediaType(
        data.results[randNum]?.first_air_date
          ? "tv"
          : data.results[randNum]?.release_date
            ? "movie"
            : "tv",
      );
      console.log(movieId);
      console.log(data.results);
      const movieDetails = await fetch(
        `/api/movies/details?id=${movieId}&type=${
          data.results[randNum]?.first_air_date
            ? "tv"
            : data.results[randNum]?.release_date
              ? "movie"
              : "tv"
        }`,
      );
      if (!movieDetails.ok) {
        throw new Error(`HTTP error! Status: ${movieDetails.status}`);
      }

      const detailsText = await movieDetails.text(); // Read as text first
      const movieData = detailsText.trim() ? JSON.parse(detailsText) : {};
      setMovie(movieData);
      setEnglishLogo(
        movieData?.images.logos.find((logo) => logo.iso_639_1 === "en"),
      );
      await fetchTrailer(movieData.videos);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const fetchTrailer = async (movie: MovieData) => {
    const clips = movie.results.filter(
      (video) => video.type === "Clip" && video.site === "YouTube",
    );
    const trailers = movie.results.filter(
      (video) => video.type === "Trailer" && video.site === "YouTube",
    );
    const trailerList = clips.length > 0 ? clips : trailers;

    const trailer = trailerList[Math.floor(Math.random() * trailerList.length)];

    if (trailer) {
      setTrailer(
        `https://www.youtube.com/watch?v=${trailer.key}?autoplay=1&mute=1`,
      );
    }
  };

  useEffect(() => {
    getMovies();

    const timer = setTimeout(() => {
      setShowVideo(true);
    }, 15000);

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

  return movie ? (
    <div
      className={"w-full flex items-center h-[700px] px-7 xs:px-12 md:px-20"}
      // style={{
      //   backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
      // }}
    >
      {!showVideo || timeoutReached || !trailer ? (
        <div
          className="absolute inset-0 bg-cover brightness-75 transition-opacity duration-1000"
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
            loop={false}
            width="100%"
            height="100%"
            className="absolute inset-0"
            onReady={() => {
              console.log("✅ Video is ready");
              setShowVideo(true);
            }}
            onEnded={() => {
              setTimeoutReached(true);
              setShowVideo(false);
            }}
          />
        )
      )}

      {showVideo && (
        <button
          onClick={toggleMute}
          className="absolute bottom-36 right-5 z-30 bg-black/70 p-3 rounded-full text-gray-300 hover:text-white flex items-center justify-center"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      )}
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className={"text-white flex flex-col gap-6 max-w-2xl relative"}>
        <div>
          <span className={"text-sm uppercase tracking-widest"}>
            {mediaType === "tv" ? "Series" : mediaType}
          </span>
          <h1 className={"text-7xl font-anton tracking-tight"}>
            {englishLogo ? (
              <img
                src={`https://image.tmdb.org/t/p/original/${englishLogo.file_path}`}
                alt={movie?.title || movie?.name}
                width={showVideo ? "50%" : "60%"}
              />
            ) : (
              movie?.title || movie?.name
            )}
          </h1>
        </div>
        <div className={"flex gap-5"}>
          <div className={"flex gap-3"}>
            <span className={"text-gray-300"}>Genres:</span>
            <span className={"text-emerald-300"}>
              {movie.genres.map((genre) => `${genre.name}, `)}
            </span>
          </div>
          <div className={"flex gap-3"}>
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
        <AnimatePresence>
          {(!showVideo || !trailer) && (
            <motion.div
              className="relative z-10 text-white"
              initial={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{
                opacity: 0,
                y: -50,
                filter: "blur(10px)", // Blur effect
                transition: { duration: 1 },
              }}
            >
              <p className="mt-2 text-lg line-clamp-3">{movie?.overview}</p>
            </motion.div>
          )}
        </AnimatePresence>
        <div className={"flex gap-3"}>
          <Button
            className={
              "bg-dark-300 text-white p-6 font-nunito-sans font-bold text-sm uppercase tracking-tight hover:text-dark-100"
            }
            onClick={() => router.push(`/${mediaType}/${movie?.id}`)}
          >
            <Image
              src={"/icons/circle-info-solid.svg"}
              alt={"info"}
              width={20}
              className={"text-white"}
              height={20}
            />
            More Info
          </Button>
          <Button
            className={
              "bg-light-300 text-dark-100 p-6 font-nunito-sans font-bold text-sm uppercase tracking-tight hover:bg-light-400 "
            }
          >
            <Image
              src={"/icons/play-solid.svg"}
              alt={"info"}
              width={20}
              className={"text-white"}
              height={20}
            />
            Watch Now
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div className="animate-pulse bg-gray-800 rounded-lg w-full h-[700px]" />
  );
};
export default Overview;
