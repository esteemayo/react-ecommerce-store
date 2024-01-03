'use client';

import styled from 'styled-components';
import Link from 'next/link';

const ReviewLink = () => {
  return (
    <StyledLink href='/products' passHref>
      <Button>Shop now</Button>
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  width: 9rem;
  text-decoration: none;
  color: inherit;
  outline-color: #ccc;

  &:active {
    color: currentColor;
  }
`;

const Button = styled.button`
  border: none;
  display: inline-block;
  text-align: left;
  font-weight: 600;
  font-size: 1.8rem;
  width: 9rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textRevBtn};
  outline-color: #ccc;
  cursor: pointer;
  transition: all 0.3s ease;

  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 18.75em) {
    font-size: 1.7rem;
  }

  &:hover {
    opacity: 0.7;
  }

  &::after {
    content: '';
    display: inline-block;
    width: 8.5rem;
    height: 1px;
    background-color: ${({ theme }) => theme.star};
  }
`;

export default ReviewLink;
