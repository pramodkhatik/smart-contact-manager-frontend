import axios from "axios";

export const BASE_URL = "http://172.30.85.94:8081/api/";

export const myAxios = axios.create({
  baseURL: BASE_URL,
});
