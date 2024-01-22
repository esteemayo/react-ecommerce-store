import http from './httpService';

const apiEndpoint = '/orders';

export const createOrder = (data: object) => http.post(apiEndpoint, data);
