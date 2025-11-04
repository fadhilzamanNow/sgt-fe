import axios from "axios";

export const baseApi = axios.create({
  baseURL: "http://localhost:8001/api/web/v1",
  timeout: 10000,
});
