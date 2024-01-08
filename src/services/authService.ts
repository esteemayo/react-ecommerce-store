import http from './httpService';
import { getFromStorage, tokenKey } from '../utils';

const apiEndpoint = '/auth';

export const loginUser = (credentials: object) =>
  http.post(`${apiEndpoint}/login`, credentials);

export const registerUser = (credentials: object) =>
  http.post(`${apiEndpoint}/register`, credentials);

export const getJwt = () => getFromStorage(tokenKey)?.token;
