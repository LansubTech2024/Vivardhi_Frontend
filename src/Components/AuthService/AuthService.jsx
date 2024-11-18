import axios from "axios";

const baseURL = "http://localhost:5000/api/";

const AxiosService = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosService;
