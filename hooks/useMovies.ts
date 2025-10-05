import { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player/youtube";
import { toast } from "sonner";
import {logo, MovieData, MovieProps, movieVideo} from "..";

export const useMovie = (url: string, page?: string) => {
  const [movie, setMovie] = useState<MovieProps | null>(null);
  const [trailer, setTrailer] = useState<string>();
  const [showVideo, setShowVideo] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [englishLogo, setEnglishLogo] = useState<logo>();
  const [timeoutReached, setTimeoutReached] = useState<boolean>(false);
  const [collections, setCollections] = useState<MovieProps[]>([]);
  const playerRef = useRef<InstanceType<typeof ReactPlayer> | null>(null);
  console.log(url);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const detailsRes = await fetch(url);
        if (!detailsRes.ok)
          toast.error("An unexpected error occurred", {
            description: `HTTP error! Status: ${detailsRes.status}`,
          });

        const movieData = await detailsRes.json();
        setMovie(movieData);
        setEnglishLogo(
          movieData?.images.logos.find(
            (logo: { iso_639_1: string }) => logo.iso_639_1 === "en",
          ),
        );
        if (movieData.belongs_to_collection) {
          const collectionDetails = await fetch(
            `/api/movies/collection?id=${movieData.belongs_to_collection.id}`,
          );
          const data = await collectionDetails.json();
          // console.log(data);
          setCollections(data.parts);
        }
        await fetchTrailer(movieData.videos);
      } catch (error) {
        toast.error("Error fetching movies");
        console.error("Error fetching movies:", error);
      }
    };

    const fetchTrailer = async (movie: MovieData) => {
      const clips = movie.results.filter(
        (video: movieVideo) =>
          video.type === "Clip" && video.site === "YouTube",
      );
      const trailers = movie.results.filter(
        (video: movieVideo) =>
          video.type === "Trailer" && video.site === "YouTube",
      );
      const trailerList =
        clips.length > 0 && page === "home" ? clips : trailers;
      const selectedTrailer =
        trailerList[Math.floor(Math.random() * trailerList.length)];

      if (selectedTrailer) {
        setTrailer(
          `https://www.youtube.com/watch?v=${selectedTrailer.key}?autoplay=1&mute=1`,
        );
      }
    };

    getMovies();
    const timer = setTimeout(() => setShowVideo(true), 15000);
    return () => clearTimeout(timer);
  }, [url]);

  const toggleMute = () => {
    if (playerRef.current) {
      const internalPlayer = playerRef.current.getInternalPlayer();
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      isMuted ? internalPlayer?.unMute() : internalPlayer?.mute();
      setIsMuted(!isMuted);
    }
  };

  return {
    movie,
    trailer,
    showVideo,
    isMuted,
    englishLogo,
    timeoutReached,
    playerRef,
    collections,
    toggleMute,
    setTimeoutReached,
  };
};
