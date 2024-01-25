import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import Reviews from '../../components/reviews/Reviews';
import Product from '../../components/products/Product';

import EmptyState from '../../components/EmptyState';
import Loader from '../../components/Loader';
import Recommendation from '../../components/Recommendation';

import { useSubmenu } from '../../hooks/useSubmenu';
import { useCartStore } from '../../hooks/useCartStore';

import { RecommendationType, ReviewItem } from '../../types';
import {
  getProduct,
  getProductByTags,
  getReviewsOnProduct,
} from '../../services/productService';

interface IContainer {
  type?: string;
}

const SingleProduct = () => {
  const { id: productId } = useParams();

  const cart = useCartStore((state) => state.cart);
  const closeSubmenu = useSubmenu((state) => state.closeSubmenu);

  const [reviews, setReviews] = useState<ReviewItem>([]);
  const [sort, setSort] = useState('');
  const [recommendations, setRecommendation] = useState<RecommendationType>([]);

  const { isLoading, data: product } = useQuery({
    queryKey: ['product'],
    queryFn: async () => {
      const res = await getProduct(productId);
      return res.data;
    },
  });

  const inCart = useMemo(() => {
    const cartItem = cart.find((item) => item.id === productId);
    return !!cartItem;
  }, [cart, productId]);

  const actionLabel = useMemo(() => {
    return `${inCart ? 'Added' : 'Add'} to cart`;
  }, [inCart]);

  const getSort = useMemo(() => {
    if (sort === 'newest') return 'newest';
    if (sort === 'highest') return 'highest rating';
    if (sort === 'lowest') return 'lowest rating';
  }, [sort]);

  useEffect(() => {
    if (sort === 'newest') {
      setReviews((prev) =>
        [...prev].sort((a, b) => +a.createdAt - +b.createdAt)
      );
    }

    if (sort === 'highest') {
      setReviews((prev) => [...prev].sort((a, b) => b.rating - a.rating));
    }

    if (sort === 'lowest') {
      setReviews((prev) => [...prev].sort((a, b) => a.rating - b.rating));
    }
  }, [sort]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getProductByTags(product?.tags);
        setRecommendation(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [product]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getReviewsOnProduct(productId!);
        setReviews(data);
      } catch (err: unknown) {
        console.log(err);
      }
    })();
  }, [productId]);

  if (isLoading) {
    return (
      <Container>
        <Loader size='md' title='Loading...' />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container type='error' onMouseOver={closeSubmenu}>
        <Wrapper>
          <EmptyState />
        </Wrapper>
      </Container>
    );
  }

  return (
    <Container onMouseOver={closeSubmenu}>
      <Wrapper>
        <Product product={product} inCart={inCart} actionLabel={actionLabel} />
        <Line />
        <Recommendation data={recommendations} productId={productId} />
        <Reviews
          productId={productId}
          reviews={reviews}
          ratingsAverage={product.ratingsAverage}
          ratingsQuantity={product.ratingsQuantity}
          sortLabel={getSort}
          sort={sort}
          onSort={setSort}
        />
      </Wrapper>
    </Container>
  );
};

const Container = styled.main<IContainer>`
  width: 100vw;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg};
  padding-top: ${({ type }) => type !== 'error' && '8rem'};
  padding-bottom: ${({ type }) => type !== 'error' && '4rem'};

  @media only screen and (max-width: 37.5em) {
    padding-top: ${({ type }) => type !== 'error' && '4rem'};
  }
`;

const Wrapper = styled.div`
  width: 100%;
`;

const Line = styled.hr`
  width: 93%;
  height: 1px;
  border: none;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.cartModalBorder};
`;

export default SingleProduct;
