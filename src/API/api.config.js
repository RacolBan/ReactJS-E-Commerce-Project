import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});
axiosClient.interceptors.request.use(request => {
 const token = localStorage.getItem('token');
 if(token) {
   const accessToken = `Bearer ${token}`;
   request.headers.Authorization = accessToken;
 }
  return request;
}, error => {
  return Promise.reject(error);
});
axiosClient.interceptors.response.use(
  (response) => {
      if (response && response.data) {
          return response.data;
      }
      return response;
  },
  error => {
      throw error;
  }
);
export default axiosClient;