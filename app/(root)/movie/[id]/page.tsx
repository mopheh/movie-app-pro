"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, Volume2, VolumeX } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
const ReactPlayer = dynamic(() => import("react-player/youtube"), {
  ssr: false,
});
import Info from "@/components/Info";
import Casts from "@/components/Casts";
import Head from "next/head";
import Recommendation from "@/components/Recommendation";
import { useMovie } from "@/hooks/useMovies";
import dynamic from "next/dynamic";

const Page = () => {
  const { id: movieId } = useParams();
  const router = useRouter();

  const {
    movie,
    showVideo,
    isMuted,
    trailer,
    collections,
    playerRef,
    toggleMute,
  } = useMovie(`/api/movies/details?id=${movieId}&type=movie`);

  useEffect(() => {
    document.title = `${movie?.title || movie?.name} || Strimz`;
  }, [movie]);

  return (
    <>
      <Head>
        <title>{movie?.title || movie?.name} || Strimz</title>
        <meta name="description" content={movie?.overview} />
      </Head>
      <div className="flex flex-col gap-3 mt-5 px-3 md:px-0">
        {/* Main Video + Poster Section */}
        <div className="sm:pl-7 md:pl-12 lg:pl-20 flex flex-col lg:flex-row gap-6 lg:gap-3 h-auto lg:h-[783px] relative">
          {/* Poster Section */}
          <div className="flex flex-col gap-3 mt-8 lg:mt-16 w-full lg:w-[25%]">
            <div className="flex justify-between items-center">
              <Button
                className="bg-gray-600 text-xs rounded-full px-6 sm:px-8 text-white font-poppins"
                onClick={() => router.back()}
              >
                ⬅ Go Back
              </Button>
              <Button className="rounded-full border-2 hover:bg-dark-400 border-white bg-transparent text-white">
                <PlusIcon />
              </Button>
            </div>
            {movie ? (
              <div className="relative w-full aspect-[2/3] overflow-hidden rounded-lg">
                <Image
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                      : `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8z8AHAAMBAQAYj0lcAAAAAElFTkSuQmCC`
                  }
                  alt="movie"
                  fill
                  className="object-cover transition-opacity duration-700 ease-in-out opacity-0"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAoMBgAqJ2H8AAAAASUVORK5CYII="
                  onLoadingComplete={(img) => img.classList.remove("opacity-0")}
                />
              </div>
            ) : (
              <div className="animate-pulse bg-gray-800 rounded-lg w-full h-[400px]" />
            )}
          </div>

          {/* Video Section */}
          {movie ? (
            <>
              <div className="relative w-full lg:w-[75%] h-[400px] sm:h-[500px] lg:h-[640px] transition-opacity duration-1000">
                {!showVideo || !trailer ? (
                  <div
                    className="h-full w-full bg-cover bg-center brightness-75 transition-opacity duration-1000 rounded-lg"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path || ""})`,
                    }}
                  />
                ) : (
                  trailer && (
                    <ReactPlayer
                      ref={(player: any) => (playerRef.current = player)}
                      url={trailer}
                      playing
                      muted={isMuted}
                      volume={1}
                      controls={false}
                      loop
                      width="100%"
                      height="100%"
                      className="rounded-lg overflow-hidden"
                    />
                  )
                )}
                <div className="absolute inset-0 bg-black opacity-20 rounded-lg"></div>
                {showVideo && (
                  <button
                    onClick={toggleMute}
                    className="absolute bottom-10 right-5 z-30 bg-black/70 p-3 rounded-full text-gray-300 hover:text-white flex items-center justify-center"
                  >
                    {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                  </button>
                )}
              </div>
              <Info movie={movie} />
            </>
          ) : (
            <div className="animate-pulse bg-gray-800 rounded-lg w-full lg:w-[75%] h-[640px]" />
          )}
        </div>

        {/* Recommendations + Collections */}
        <div className="w-full px-4 sm:px-7 md:px-12 lg:px-20 mt-6">
          <div className="flex flex-col lg:flex-row w-full gap-6 lg:gap-10">
            <div className="w-full lg:w-[70%]">
              <Recommendation id={movieId} type="movie" />
            </div>
            <div className="w-full lg:w-[30%]">
              <h2 className="font-bold text-white font-lato mb-2">
                Collections ({collections.length})
              </h2>
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                {collections.length > 0 &&
                  collections.map((collection) => (
                    <div
                      key={collection.id}
                      className="relative w-[140px] sm:w-[180px] h-[210px] sm:h-[260px] cursor-pointer rounded-lg overflow-hidden"
                      onClick={() => router.push(`/movie/${collection.id}`)}
                    >
                      <Image
                        src={`https://image.tmdb.org/t/p/original/${collection?.poster_path}`}
                        alt={collection.name || collection.title}
                        fill
                        className="object-cover transition-opacity duration-700 ease-in-out opacity-0"
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAoMBgAqJ2H8AAAAASUVORK5CYII="
                        onLoadingComplete={(img) =>
                          img.classList.remove("opacity-0")
                        }
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <Casts movie={movie} />
        </div>
      </div>
    </>
  );
};
export default Page;
