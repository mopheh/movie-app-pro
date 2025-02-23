import React, { useState, useEffect } from "react";
import { XIcon } from "lucide-react";
import ReactPlayer from "react-player";

const SideContent = ({ id, onClose }: { id: number; onClose: void }) => {
  const [movie, setMovie] = useState([]);
  const [englishLogo, setEnglishLogo] = useState<string>("");
  const [trailer, setTrailer] = useState<string>();
  const getMovies = async () => {
    console.log(id);
    try {
      const movieDetails = await fetch(
        `/api/movies/details?id=${id}&type=movie`,
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
  const fetchTrailer = async (movie) => {
    const trailers = movie.results.filter(
      (video) => video.type === "Trailer" && video.site === "YouTube",
    );
    const trailerList = trailers;

    const trailer = trailerList[Math.floor(Math.random() * trailerList.length)];

    if (trailer) {
      setTrailer(
        `https://www.youtube.com/watch?v=${trailer.key}?autoplay=1&mute=1`,
      );
    }
  };
  useEffect(() => {
    getMovies();
  }, []);
  return (
    <>
      <div
        className={"fixed inset-0 w-screen h-screen backdrop-blur-md z-20"}
      ></div>
      <div className="fixed right-0 top-0 w-1/3 h-screen bg-gray-800 z-30 p-4 shadow-lg">
        <div
          className="absolute top-8 right-8 flex items-center gap-1 text-white text-sm font-poppins cursor-pointer"
          onClick={onClose}
        >
          <XIcon className="h-6 w-6" /> Close
        </div>

        <div className="text-white p-4">
          <h3 className={"font-poppins"}>
            {englishLogo ? (
              <img
                src={`https://image.tmdb.org/t/p/original/${englishLogo.file_path}`}
                alt={movie?.title || movie?.name}
                width={"50%"}
              />
            ) : (
              movie?.title || movie?.name
            )}
          </h3>
        </div>
        <div className={"p-2 h-[330px]"}>
          {trailer && (
            <ReactPlayer
              url={trailer}
              playing={true} // ✅ Auto Play
              volume={1} // ✅ Max Volume
              controls={false}
              loop={false}
              width="100%"
              height="100%"
              className={"select-none"}
            />
          )}
        </div>
      </div>
    </>
  );
};
export default SideContent;
