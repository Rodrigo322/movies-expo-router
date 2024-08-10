import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "fe751a93e8df1bf6a516b0a3074d97d5",
    language: "pt-BR",
    include_adult: false,
  },
});
