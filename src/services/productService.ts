import http from './httpService';

const apiEndpoint = '/products';

const productUrl = (productId?: string) => `${apiEndpoint}/${productId}`;

const productReviewUrl = (productId: string) =>
  `${apiEndpoint}/${productId}/reviews`;

export const getProducts = (page?: number) =>
  http.get(`${apiEndpoint}?page=${page}&limit=12`);

export const getCategoryCount = () =>
  http.get(`${apiEndpoint}/count-by-category`);

export const getFeaturedProducts = () =>
  http.get(`${apiEndpoint}?featured=true&limit=3`);

export const getProductCategory = (category: string | undefined) =>
  http.get(`${apiEndpoint}?category=${category}`);

export const getProduct = (productId?: string) =>
  http.get(productUrl(productId));

export const getProductByTags = (tags: string[]) =>
  http.get(`${apiEndpoint}/tags?tags=${tags}`);

export const searchProducts = (searchQuery: string) =>
  http.get(`${apiEndpoint}/search?query=${searchQuery}`);

export const getReviewsOnProduct = (productId: string) =>
  http.get(productReviewUrl(productId));

export const getWeeklyViews = (productId: string) =>
  http.get(`${apiEndpoint}/views/weekly/${productId}`);

export const createProduct = <T extends object>(product: T) =>
  http.post(apiEndpoint, product);

export const createReviewOnProduct = <T extends object>(
  data: T,
  productId: string
) => http.post(productReviewUrl(productId), data);

export const likeProduct = (productId: string) =>
  http.patch(`${apiEndpoint}/like/${productId}`);

export const updateViews = (productId: string) =>
  http.patch(`${apiEndpoint}/views/${productId}`);
