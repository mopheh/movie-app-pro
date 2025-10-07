import { MovieData, movieVideo } from "@/index";
import { useEffect, useState } from "react";

const useDetail = (movie: MovieData) => {
  const [trailer, setTrailer] = useState<string>();
  useEffect(() => {
    const fetchTrailer = async () => {
      const clips = movie?.results.filter(
        (video: movieVideo) => video.type === "Clip" && video.site === "YouTube"
      );
      const trailers = movie?.results.filter(
        (video: movieVideo) =>
          video.type === "Trailer" && video.site === "YouTube"
      );
      const trailerList = clips.length > 0 ? clips : trailers;

      const trailer =
        trailerList[Math.floor(Math.random() * trailerList.length)];
      if (trailer) {
        setTrailer(
          `https://www.youtube.com/watch?v=${trailer.key}?autoplay=1&mute=1`
        );
      }
    };
    fetchTrailer();
  }, [movie]);

  return { trailer };
};
export default useDetail;
