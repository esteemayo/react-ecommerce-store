import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import Reviews from '../../components/reviews/Reviews';
import Product from '../../components/products/Product';

import Loader from '../../components/Loader';
import Recommendations from '../../components/Recommendations';

import { useSubmenu } from '../../hooks/useSubmenu';
import { useAuth } from '../../hooks/useAuth';
import { useCartStore } from '../../hooks/useCartStore';

import {
  CartValues,
  ProductValues,
  RecommendationType,
  ReviewItem,
} from '../../types';
import {
  getProduct,
  getProductByTags,
  getReviewsOnProduct,
} from '../../services/productService';

const SingleProduct = () => {
  const { id: productId } = useParams();

  const cart = useCartStore((state) => state.cart);
  const closeSubmenu = useSubmenu((state) => state.closeSubmenu);
  const currentUser = useAuth((state) => state.user);

  const { isLoading, data: singleProduct } = useQuery({
    queryKey: ['product'],
    queryFn: async () => {
      const { data } = await getProduct(productId);
      setProduct(data);
      return data;
    },
  });

  const [reviews, setReviews] = useState<ReviewItem>([]);
  const [sort, setSort] = useState('');
  const [recommendations, setRecommendation] = useState<RecommendationType>([]);
  const [product, setProduct] = useState<ProductValues | CartValues>(
    singleProduct
  );

  const tags = product?.tags;

  const refetchProduct = useCallback(async () => {
    try {
      const { data } = await getProduct(productId);
      setProduct(data);
    } catch (err: unknown) {
      console.log(err);
    }
  }, [productId]);

  const inCart = useMemo(() => {
    const cartItem = cart.find((item) => item.id === productId);
    return !!cartItem;
  }, [cart, productId]);

  const actionLabel = useMemo(() => {
    return `${inCart ? 'Added' : 'Add'} to cart`;
  }, [inCart]);

  const getSort = useMemo(() => {
    if (sort === 'latest') return 'latest';
    if (sort === 'highest') return 'highest rating';
    if (sort === 'lowest') return 'lowest rating';
  }, [sort]);

  useEffect(() => {
    if (sort === 'latest') {
      setReviews((prev) => {
        return [...prev].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    }

    if (sort === 'highest') {
      setReviews((prev) => {
        return [...prev].sort((a, b) => b.rating - a.rating);
      });
    }

    if (sort === 'lowest') {
      setReviews((prev) => {
        return [...prev].sort((a, b) => a.rating - b.rating);
      });
    }
  }, [sort]);

  useEffect(() => {
    if (tags) {
      (async () => {
        try {
          const { data } = await getProductByTags(tags);
          setRecommendation(data);
        } catch (err) {
          console.log(err);
        }
      })();
    }
  }, [tags]);

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

  return (
    <Container onMouseOver={closeSubmenu}>
      <Wrapper>
        <Product
          product={product}
          inCart={inCart}
          actionLabel={actionLabel}
          currentUser={currentUser}
        />
        <Line />
        <Recommendations data={recommendations} productId={productId} />
        <Reviews
          productId={productId}
          reviews={reviews}
          ratingsAverage={product?.ratingsAverage}
          ratingsQuantity={product?.ratingsQuantity}
          sortLabel={getSort}
          sort={sort}
          onSort={setSort}
          onReviews={setReviews}
          onRefetch={refetchProduct}
        />
      </Wrapper>
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg};
  padding-top: 8rem;
  padding-bottom: 4rem;

  @media only screen and (max-width: 37.5em) {
    padding-top: 4rem;
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
