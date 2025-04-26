import axios from "axios";

const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const Authorization = process.env.NEXT_PUBLIC_TMDB_API_AUTH;

export const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: apiKey,
  },
  headers: {
    "Accept": "application/json",
    "Authorization": `Bearer ${Authorization}`,
  }
});

export const searchMovie = (query: string) => {
  return tmdbApi.get("/search/movie", { params: { query } });
}
