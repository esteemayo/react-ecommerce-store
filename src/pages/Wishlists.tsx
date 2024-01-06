import styled from 'styled-components';
import { useCallback, useEffect, useMemo, useState } from 'react';

import CartModal from '../components/modals/CartModal';
import WishlistHeader from '../components/wishlists/WishlistHeader';

import { useCartModal } from '../hooks/useCartModal';
import { useSubmenu } from '../hooks/useSubmenu';
import useWishlistModal from '../hooks/useWishlistModal';

import { WishlistValues } from '../types';
import { useCartStore } from '../hooks/useCartStore';
import WishlistCard from '../components/wishlists/WishlistCard';

const WishLists = () => {
  const cartModal = useCartModal();
  const wishlists = useCartStore((state) => state.wishlists);
  const wishlistModal = useWishlistModal();
  const removeWishlist = useCartStore((state) => state.removeWishlist);
  const closeSubmenu = useSubmenu((state) => state.closeSubmenu);

  const [products, setProducts] = useState<WishlistValues[]>([]);
  const [isSelectedId, setIsSelectedId] = useState<string | null>(null);
  const [isSelectedProduct, setIsSelectedProduct] =
    useState<WishlistValues | null>(null);

  const handleClick = useCallback(
    (wishlist: WishlistValues) => {
      cartModal.onOpen();
      setIsSelectedProduct(wishlist);
    },
    [cartModal, setIsSelectedProduct]
  );

  const handleOpenModal = useCallback(
    (id: string) => {
      setIsSelectedId(id);
      wishlistModal.onOpen();
    },
    [wishlistModal]
  );

  const handleDelete = useCallback(
    (id: string) => {
      setProducts((prev) => prev.filter((item) => item.id !== id));
      removeWishlist(id);
    },
    [removeWishlist]
  );

  const wishlistLabel = useMemo(() => {
    return wishlists.length > 1 ? 'wishlists' : 'wishlist';
  }, [wishlists]);

  useEffect(() => {
    setProducts(wishlists);
  }, [wishlists]);

  let bodyContent: JSX.Element | undefined = undefined;

  if (products.length < 1) {
    bodyContent = <Text>Your wishlist is currently empty!</Text>;
  }

  if (products.length > 0) {
    bodyContent = (
      <>
        <WishlistHeader wishlistLabel={wishlistLabel} />
        <WishlistCard
          isOpen={wishlistModal.isOpen}
          onOpen={handleOpenModal}
          selected={isSelectedId}
          wishlists={products}
          wishlistLabel={wishlistLabel}
          onAction={handleClick}
          onClose={wishlistModal.onClose}
          onDelete={handleDelete}
        />
      </>
    );
  }

  return (
    <Container onMouseOver={closeSubmenu}>
      <Wrapper>{bodyContent}</Wrapper>
      <CartModal
        product={isSelectedProduct}
        isOpen={cartModal.isOpen}
        onClose={cartModal.onClose}
        onSelect={setIsSelectedProduct}
      />
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  padding: 10rem 0;
  background-color: ${({ theme }) => theme.bg};

  @media only screen and (max-width: 64em) {
    padding: 8rem 0;
  }

  @media only screen and (max-width: 37.5em) {
    padding-left: 5rem;
    padding-right: 5rem;
  }

  @media only screen and (max-width: 25em) {
    padding-left: 3rem;
    padding-right: 3rem;
  }

  @media only screen and (max-width: 23.75em) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;

  @media only screen and (max-width: 50em) {
    max-width: 70rem;
  }
`;

const Text = styled.p`
  font-size: 4rem;
  text-align: center;
  color: ${({ theme }) => theme.textCartHeader};

  @media only screen and (max-width: 37.5em) {
    font-size: 3.5rem;
  }

  @media only screen and (max-width: 26.25em) {
    font-size: 3rem;
  }

  @media only screen and (max-width: 25em) {
    font-size: 2.8rem;
  }

  @media only screen and (max-width: 18.75em) {
    font-size: 2rem;
  }
`;

export default WishLists;
