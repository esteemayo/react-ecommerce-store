import http from './httpService';

const apiEndpoint = '/products';

const productUrl = (productId?: string) => `${apiEndpoint}/${productId}`;

export const getProducts = (page?: number) =>
  http.get(`${apiEndpoint}?page=${page}`);

export const getCategoryCount = () =>
  http.get(`${apiEndpoint}/count-by-category`);

export const getFeaturedProducts = () =>
  http.get(`${apiEndpoint}?featured=true`);

export const getProductCategory = (category: string | undefined) =>
  http.get(`${apiEndpoint}?category=${category}`);

export const getProduct = (productId?: string) =>
  http.get(productUrl(productId));

export const getProductByTags = (tags: string[]) =>
  http.get(`${apiEndpoint}/tags?tags=${tags}`);

export const searchProducts = (searchQuery: string) =>
  http.get(`${apiEndpoint}/search?query=${searchQuery}`);

export const createProduct = <T extends object>(product: T) =>
  http.post(apiEndpoint, product);

export const likeProduct = (productId: string) =>
  http.patch(`${apiEndpoint}/like/${productId}`);
