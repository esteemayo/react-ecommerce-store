import styled from 'styled-components';
import { useCallback, useEffect, useMemo, useState } from 'react';

import WishlistCard from '../components/wishlists/WishlistCard';
import WishlistHeader from '../components/wishlists/WishlistHeader';

import CartModal from '../components/modals/CartModal';
import EmptyWishlist from '../components/empty/EmptyWishlist';

import { useCartModal } from '../hooks/useCartModal';
import { useSubmenu } from '../hooks/useSubmenu';
import { useWishlistModal } from '../hooks/useWishlistModal';
import { useCartStore } from '../hooks/useCartStore';

import { WishlistValues } from '../types';

const WishLists = () => {
  const cartModal = useCartModal();
  const wishlistModal = useWishlistModal();

  const closeSubmenu = useSubmenu((state) => state.closeSubmenu);
  const wishlists = useCartStore((state) => state.wishlists);
  const removeWishlist = useCartStore((state) => state.removeWishlist);

  const [products, setProducts] = useState<WishlistValues[]>([]);
  const [isSelectedId, setIsSelectedId] = useState<string | undefined>();
  const [isSelectedProduct, setIsSelectedProduct] = useState<
    WishlistValues | undefined
  >();

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

  let bodyContent: JSX.Element | undefined;

  if (products.length < 1) {
    bodyContent = <EmptyWishlist />;
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
        type='wishlists'
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

export default WishLists;
