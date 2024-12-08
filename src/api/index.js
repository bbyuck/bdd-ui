import axios from "axios";
import store from "../store";
import { loadingEnd, loadingStart } from "../store/slice/clientInfo";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
  headers: {
    // "Content-Type": "application/json;charset=UTF-8",
    "Content-Type": "multipart/form-data",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    store.dispatch(loadingStart());
    return config;
  },
  (err) => {
    store.dispatch(loadingEnd());
    return Promise.reject(err);
  }
);

api.interceptors.response.use(
  (resposne) => {
    store.dispatch(loadingEnd());
    return resposne;
  },
  (err) => {
    store.dispatch(loadingEnd());
    return Promise.reject(err);
  }
);

export default api;
