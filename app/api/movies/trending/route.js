export const GET = async (req) => {
  let type = new URLSearchParams(new URL(req.url).searchParams).get("type");
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/trending/${type}/day?api_key=235ba309beb6b48e95dc065bc6ac50cf`,
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
