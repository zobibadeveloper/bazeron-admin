import axios from "axios";

const axiosIns = axios.create({
  baseURL: import.meta.env.VITE_APP_IS_DEVELOPMENT === "true" ? import.meta.env.VITE_APP_DOMAIN_DEVELOPMENT : import.meta.env.VITE_APP_DOMAIN,
  headers: { "Content-Type": "application/json" },
  withCredentials: true
});

export default axiosIns;
