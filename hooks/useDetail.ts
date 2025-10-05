import { useEffect, useState } from "react";

const useDetail = (url: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<MovieProps>();
  const [error, setError] = useState("");
  useEffect(() => {
    const getMovies = async () => {
      try {
        const movies = await fetch(url);

        const data = await movies.json().catch(() => ({}));
        if (!movies.ok) {
          throw new Error(data.error || "An unexpected error occurred");
        }
        setResult(data);
      } catch (err) {
        // @ts-ignore
        setError(err?.message);
      } finally {
        setIsLoading(false);
      }
    };
    getMovies();
  }, []);

  return { result, error, isLoading };
};
export default useDetail;
