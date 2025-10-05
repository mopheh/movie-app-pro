import { useEffect, useState } from "react";
import { toast } from "sonner";

const UseFetch = (url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<MovieProps[]>([]);
  const [error, setError] = useState("");
  const [movieId, setMovieId] = useState("");
  const [mediaType, setMediaType] = useState("");
  useEffect(() => {
    const getMovies = async () => {
      try {
        const movies = await fetch(url);

        // if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const data = await movies.json();
        const randNum = Math.floor(Math.random() * data.length);
        setMovieId(data[randNum]?.id);
        const detectedType = data[randNum]?.first_air_date
          ? "tv"
          : data[randNum]?.release_date
            ? "movie"
            : "tv";
        setMediaType(detectedType);
        if (!movies.ok) {
          toast.error("An unexpected error occurred", {
            description: `HTTP error! Status: ${movies.status}`,
          });
        }
        setResults(data);
      } catch (err) {
        // @ts-ignore
        setError(err?.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, [url]);

  return { results, error, isLoading, movieId, mediaType };
};
export default UseFetch;
