import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
  headers: {
    // "Content-Type": "application/json;charset=UTF-8",
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});

export default api;
