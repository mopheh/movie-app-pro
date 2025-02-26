export const GET = async (req) => {
  const type = new URLSearchParams(new URL(req.url).searchParams).get("type")
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${type}/popular?api_key=${process.env.TMDB_API_KEY}&append_to_response=videos,images,casts`
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
