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
}, async error => {
  return await Promise.reject(error);
});
// axiosClient.interceptors.response.use(async res => {
//   return await Promise.resolve(res);
// }, async err => {
 
//   return await Promise.reject(err);
// });
export default axiosClient;