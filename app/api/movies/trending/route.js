export const GET = async (req) => {
  let type = new URLSearchParams(new URL(req.url).searchParams).get("type");
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/${type}/day?api_key=${process.env.TMDB_API_KEY}`,
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status} ${errorText}`,
      );
    }
    const data = await response.json();
    return new Response(JSON.stringify(data.results));
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
