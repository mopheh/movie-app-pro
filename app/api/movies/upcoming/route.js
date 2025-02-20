export const GET = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=235ba309beb6b48e95dc065bc6ac50cf&append_to_response=videos,images,casts`,
    );

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
