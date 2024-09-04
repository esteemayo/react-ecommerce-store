import http from './httpService';
import { getFromStorage, tokenKey } from '../utils';

const apiEndpoint = '/auth';

export const loginUser = (credentials: object) =>
  http.post(`${apiEndpoint}/login`, credentials);

export const googleLogin = (credentials: object) =>
  http.post(`${apiEndpoint}/google-login`, credentials);

export const facebookLogin = (credentials: object) =>
  http.post(`${apiEndpoint}/facebook-login`, credentials);

export const registerUser = (credentials: object) =>
  http.post(`${apiEndpoint}/register`, credentials);

export const updatePassword = (credentials: object) =>
  http.patch(`${apiEndpoint}/update-my-password`, credentials);

export const forgotPassword = (email: { email: string }) =>
  http.post(`${apiEndpoint}/forgot-password`, email);

export const resetPassword = (token: string | undefined, credentials: object) =>
  http.post(`${apiEndpoint}/reset-password/${token}`, credentials);

export const logout = () => http.post(`${apiEndpoint}/logout`);

export const getJwt = () => getFromStorage(tokenKey)?.details?.token;
