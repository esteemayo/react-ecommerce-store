import http from './httpService';
import { getFromStorage, tokenKey } from '../utils';

const apiEndpoint = '/auth';

export const loginUser = (credentials: object) =>
  http.post(`${apiEndpoint}/login`, credentials);

export const registerUser = (credentials: object) =>
  http.post(`${apiEndpoint}/register`, credentials);

export const updatePassword = (credentials: object) =>
  http.patch(`${apiEndpoint}/update-my-password`, credentials);

export const forgotPassword = (email: { email: string }) =>
  http.post(`${apiEndpoint}/forgot-password`, email);

export const resetPassword = (token: string | undefined, credentials: object) =>
  http.post(`${apiEndpoint}/reset-password/${token}`, credentials);

export const getJwt = () => getFromStorage(tokenKey)?.details?.token;
