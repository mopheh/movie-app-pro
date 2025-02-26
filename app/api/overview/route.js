export const GET = async (req) => {
  const type = req.nextUrl?.searchParams.get("type") || null;

  const today = new Date().toISOString().split("T")[0];
  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 10);
  const formattedFiveYearsAgo = fiveYearsAgo.toISOString().split("T")[0];
  // Helper function to fetch different pages
  const fetchPage = async (page, baseLink) => {
    const response = await fetch(`${baseLink}&page=${page}`);
    const data = await response.json();
    return data.results || [];
  };

  const links = [
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&release_date.gte=${formattedFiveYearsAgo}&release_date.lte=${today}&vote_count.gte=400`,
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}`,
    `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&first_air_date.gte=${formattedFiveYearsAgo}&first_air_date.lte=${today}&vote_count.gte=400`,
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.TMDB_API_KEY}`,
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,images,casts`,
  ];

  try {
    let baseLink;

    if (type === "tv") {
      baseLink = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&first_air_date.gte=${formattedFiveYearsAgo}&first_air_date.lte=${today}&vote_count.gte=400`;
    } else if (type === "movie") {
      baseLink = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&release_date.gte=${formattedFiveYearsAgo}&release_date.lte=${today}&vote_count.gte=400`;
    } else {
      baseLink = links[Math.floor(Math.random() * links.length)];
    }

    // Fetch two pages from the **same** baseLink
    const [page1, page2] = await Promise.all([
      fetchPage(1, baseLink),
      fetchPage(2, baseLink),
    ]);

    return new Response(JSON.stringify([...page1, ...page2]), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify({ message: "Error fetching data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
