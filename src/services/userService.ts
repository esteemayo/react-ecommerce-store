import http from './httpService';

const apiEndpoint = '/users';

export const getCurrentUserData = () => http.get(`${apiEndpoint}/me`);

export const updateData = (data: object) =>
  http.patch(`${apiEndpoint}/update-me`, data);

export const updateEmail = (credentials: object) =>
  http.patch(`${apiEndpoint}/update-email`, credentials);

export const deleteUser = () => http.delete(`${apiEndpoint}/delete-me`);
