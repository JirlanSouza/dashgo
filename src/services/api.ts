import axios from "axios";
import { parseCookies } from "nookies";

const cookies = parseCookies();

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const authApi = axios.create({
  baseURL: "http://localhost:3333",
  headers: {
    Authorization: `Barear ${cookies["dashgo.token"]}`,
  },
});
