import applyCaseMiddleware from 'axios-case-converter'
import axios from 'axios';
import Cookies from 'js-cookie';

const options = {
  ignoreHeaders: true
}

const apiClient = applyCaseMiddleware(axios.create({
  baseURL: 'http://localhost:3030/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
}), options);

apiClient.interceptors.request.use((config) => {
  const accessToken = Cookies.get('_access_token');
  const clientToken = Cookies.get('_client');
  const uid = Cookies.get('_uid');

  if (accessToken && clientToken && uid) {
    config.headers['access-token'] = accessToken;
    config.headers['client'] = clientToken;
    config.headers['uid'] = uid;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
