import http from './httpService';

const apiEndpoint = '/categories';

export const getCategories = () => http.get(apiEndpoint);
