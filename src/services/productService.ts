import http from './httpService';

const apiEndpoint = '/products';

const productUrl = (productId: string) => `${apiEndpoint}/${productId}`;

export const getProducts = () => http.get(apiEndpoint);

export const getCategoryCount = () =>
  http.get(`${apiEndpoint}/count-by-category`);

export const getFeaturedProducts = () =>
  http.get(`${apiEndpoint}?featured=true`);

export const getProductCategory = (category: string) =>
  http.get(`${apiEndpoint}?category=${category}`);

export const getProduct = (productId: string) =>
  http.get(productUrl(productId));

export const getProductByTags = (tags: string[]) =>
  http.get(`${apiEndpoint}/tags?tags=${tags}`);
