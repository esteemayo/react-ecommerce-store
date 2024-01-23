import http from './httpService';

const apiEndpoint = '/orders';

const orderUrl = (orderId: string) => `${apiEndpoint}/${orderId}`;

export const getUserOrders = () => http.get(`${apiEndpoint}/my-orders`);

export const getOrder = (orderId: string) => http.get(orderUrl(orderId));

export const createOrder = (data: object) => http.post(apiEndpoint, data);
