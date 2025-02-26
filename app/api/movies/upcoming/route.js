export const GET = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,images,casts`
    )

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(
        `Request failed with status ${response.status} ${errorText}`
      )
    }
    const data = await response.json()
    return new Response(JSON.stringify(data))
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}
