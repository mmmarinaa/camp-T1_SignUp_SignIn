import axios from "axios";

const API_URL = "http://193.19.100.32:7000";

const $host = axios.create({
  baseURL: API_URL,
});

export { $host };
