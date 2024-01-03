'use client';

import styled from 'styled-components';

import DateTime from '../DateTime';
import { DateOptions } from '@/types';

interface WishlistHeaderProps {
  wishlistLabel: 'wishlists' | 'wishlist';
}

const WishlistHeader = ({ wishlistLabel }: WishlistHeaderProps) => {
  const today = new Date();

  const options: DateOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  return (
    <Container>
      <HeadingContainer>
        <Heading>My {wishlistLabel}</Heading>
        <DateTime date={today} options={options} />
      </HeadingContainer>
      <Button type='button'>Send wishlist</Button>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.bgWlHeader};
  padding: 2rem 2.5rem;
`;

const HeadingContainer = styled.div`
  line-height: 1.1;
`;

const Heading = styled.h1`
  display: block;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.text};

  @media only screen and (max-width: 56.25em) {
    font-size: var(--default-font-size);
  }

  @media only screen and (max-width: 18.75em) {
    font-size: 1.4rem;
  }
`;

const Button = styled.button`
  border: none;
  display: inline-block;
  text-transform: capitalize;
  padding: 1rem 3rem;
  background-color: ${({ theme }) => theme.bgWlHeaderBtn};
  color: ${({ theme }) => theme.textWlHeaderBtn};
  border-radius: 0.5rem;
  outline-color: #ccc;
  cursor: pointer;

  @media only screen and (max-width: 56.25em) {
    font-size: 1.47rem;
    padding: 1rem 2.5rem;
  }

  @media only screen and (max-width: 18.75em) {
    font-size: 1.4rem;
    padding: 0.87rem 1rem;
  }
`;

export default WishlistHeader;
