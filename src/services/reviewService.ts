import http from './httpService';

const apiEndpoint = '/reviews';

export const getTopReviews = () => http.get(`${apiEndpoint}/top`);

export const getTotalReviewsOnProduct = (reviewId: string) =>
  http.get(`${apiEndpoint}/total-reviews/${reviewId}`);

export const createReview = (data: object) => http.post(apiEndpoint, data);
