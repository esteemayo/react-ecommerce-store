import http from './httpService';

const apiEndpoint = '/orders';

export const getUserOrders = () => http.get(`${apiEndpoint}/my-orders`);

export const createOrder = (data: object) => http.post(apiEndpoint, data);
