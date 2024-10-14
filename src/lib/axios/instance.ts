import axios from "axios";

const header = {
  Accept: "application/json",
  "content-type": "application/json",
  "Cache-Control": "no-cache",
  Expires: "0",
};

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: header,
  timeout: 60 * 1000,
});

instance.interceptors.request.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default instance;
