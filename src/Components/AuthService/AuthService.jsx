import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/auth/";

const AxiosService = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosService;
