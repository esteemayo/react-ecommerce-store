import http from './httpService';

const apiEndpoint = '/reviews';

export const createReview = (data: object) => http.post(apiEndpoint, data);
