export const GET = async () => {
  const links = [
    "https://api.themoviedb.org/3/tv/top_rated?api_key=235ba309beb6b48e95dc065bc6ac50cf&append_to_response=videos,images,casts",
    "https://api.themoviedb.org/3/movie/popular?api_key=235ba309beb6b48e95dc065bc6ac50cf",
    "https://api.themoviedb.org/3/movie/top_rated?api_key=235ba309beb6b48e95dc065bc6ac50cf&append_to_response=videos,images,casts",
    "https://api.themoviedb.org/3/trending/movie/day?api_key=235ba309beb6b48e95dc065bc6ac50cf",
    "https://api.themoviedb.org/3/trending/tv/day?api_key=235ba309beb6b48e95dc065bc6ac50cf",
    "https://api.themoviedb.org/3/movie/upcoming?api_key=235ba309beb6b48e95dc065bc6ac50cf&append_to_response=videos,images,casts",
  ];
  const link = links[Math.floor(Math.random() * links.length)];
  try {
    const response = await fetch(link);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status} ${errorText}`,
      );
    }
    const data = await response.json();
    return new Response(JSON.stringify(data));
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
