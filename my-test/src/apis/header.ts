import axios from "axios";
import { storeData } from "../redux/redux.function";
import { setIsLogged } from "../redux/user/userSlice";

const API_URL = 'http://localhost:3000'; // Set your API base URL here

const testAppInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

testAppInstance.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem('accessToken');
  
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

testAppInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!refreshToken) {
          // No refresh token available, redirect to login or handle accordingly
          // window.location.href = '/login';
          storeData(false, setIsLogged)
          return Promise.reject(error);
        }

        const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        // Update the failed request with new access token
        testAppInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

        return testAppInstance(originalRequest);
      } catch (refreshError) {
        // Handle token refresh errors
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // window.location.href = '/login';
        storeData(false, setIsLogged)
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default testAppInstance;
