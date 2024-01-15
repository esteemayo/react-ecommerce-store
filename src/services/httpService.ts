import axios from 'axios';
import { toast } from 'react-toastify';

import logger from './logService';
import { getFromStorage, tokenKey } from '../utils';

const devEnv = import.meta.env.MODE !== 'production';
const { VITE_APP_DEV_API_URL, VITE_APP_PROD_API_URL } = import.meta.env;

const API = axios.create({
  baseURL: devEnv ? VITE_APP_DEV_API_URL : VITE_APP_PROD_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

API.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response &&
    error.response.status < 500;

  if (!expectedError) {
    logger.log(error);
    toast.error('An unexpected error occurred');
  }

  return Promise.reject(error);
});

const token = getFromStorage(tokenKey)?.details?.token;

API.defaults.headers.common['Authorization'] = `Bearer ${token}`;

const http = {
  get: API.get,
  post: API.post,
  patch: API.patch,
  delete: API.delete,
};

export default http;
