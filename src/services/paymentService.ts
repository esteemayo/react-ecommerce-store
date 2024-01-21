import http from './httpService';

const apiEndpoint = '/checkout';

export const stripePayment = (data: object) =>
  http.post(`${apiEndpoint}/payment`, data);
