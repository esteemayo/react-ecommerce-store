import http from './httpService';

const apiEndpoint = '/users';

export const updateEmail = (credentials: object) =>
  http.patch(`${apiEndpoint}/update-email`, credentials);
