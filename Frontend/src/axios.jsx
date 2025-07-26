// src/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: "/api", // No domain needed
  withCredentials: true,
});

export default axiosInstance;