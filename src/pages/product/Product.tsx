import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import Reviews from '../../components/reviews/Reviews';
import Product from '../../components/products/Product';

import Loader from '../../components/Loader';
import Recommendations from '../../components/Recommendations';

import { useSubmenu } from '../../hooks/useSubmenu';
import { useAuth } from '../../hooks/useAuth';
import { useCartStore } from '../../hooks/useCartStore';

import * as productAPI from '../../services/productService';
import { CartValues, ProductValues, ReviewItem } from '../../types';

const SingleProduct = () => {
  const queryClient = useQueryClient();
  const { id: productId } = useParams();

  const currentUser = useAuth((state) => state.user);
  const cart = useCartStore((state) => state.cart);
  const closeSubmenu = useSubmenu((state) => state.closeSubmenu);

  const {
    isLoading,
    data: singleProduct,
    refetch,
  } = useQuery({
    queryKey: ['product'],
    queryFn: async () => {
      const { data } = await productAPI.getProduct(productId);
      setProduct(data);
      return data;
    },
  });

  const tags = singleProduct?.tags;

  const { data: recommendations } = useQuery({
    queryKey: ['recommendations'],
    queryFn: async () => {
      const { data } = await productAPI.getProductByTags(tags);
      return data;
    },
    enabled: !!tags,
  });

  const { data: productReviews } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const { data } = await productAPI.getReviewsOnProduct(productId!);
      return data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (productId: string) => {
      const { data } = await productAPI.updateViews(productId);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product'] });
    },
  });

  const [reviews, setReviews] = useState<ReviewItem>([]);
  const [sort, setSort] = useState('');
  const [product, setProduct] = useState<ProductValues | CartValues>(
    singleProduct
  );

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
    setReviews(productReviews);
  }, [productReviews]);

  useEffect(() => {
    if (productId) {
      mutate(productId);
      refetch();
    }
  }, [mutate, productId, refetch]);

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
          onFavorite={refetch}
        />
        <Line />
        <Recommendations productId={productId} data={recommendations} />
        <Reviews
          productId={productId}
          reviews={reviews}
          ratingsAverage={product?.ratingsAverage}
          ratingsQuantity={product?.ratingsQuantity}
          sortLabel={getSort}
          sort={sort}
          onSort={setSort}
          onReviews={setReviews}
          onRefetch={refetch}
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
