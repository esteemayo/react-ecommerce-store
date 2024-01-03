'use client';

import styled from 'styled-components';

import { ProductButtonProps } from '@/types';

interface IBtn {
  small?: boolean;
}

const ProductButton = ({
  small,
  actionLabel,
  inCart,
  onAction,
}: ProductButtonProps) => {
  return (
    <Button type='button' small={small} disabled={inCart} onClick={onAction}>
      {actionLabel}
    </Button>
  );
};

const Button = styled.button<IBtn>`
  display: inline-block;
  text-align: center;
  font-size: ${({ small }) => (small ? '1.5rem' : '1.8rem')};
  width: 100%;
  padding: ${({ small }) => (small ? '1.3rem 1rem' : '2rem 1rem')};
  background-color: ${({ theme, small }) =>
    small ? 'var(--clr-black)' : theme.bgProdBtn};
  color: var(--clr-white);
  background-image: linear-gradient(
    120deg,
    transparent 0%,
    transparent 50%,
    #333 50%
  );
  background-size: 220%;
  border: 1px solid var(--clr-black);
  border-radius: 0.5rem;
  outline-color: #777;
  line-height: ${({ small }) => (small ? '1em' : '1.3em')};
  margin: ${({ small }) => (small ? '1rem 0' : '3rem 0')};
  cursor: pointer;
  transition: all 0.3s;

  @media only screen and (max-width: 59.375em) {
    padding-top: ${({ small }) => !small && '1.75rem'};
    padding-bottom: ${({ small }) => !small && '1.75rem'};
  }

  @media only screen and (max-width: 56.25em), only screen and (hover: none) {
    font-size: ${({ small }) => small && '1.6rem'};
  }

  @media only screen and (max-width: 37.5em), only screen and (hover: none) {
    font-size: ${({ small }) => !small && '1.7rem'};
    padding-top: ${({ small }) => !small && '1.6rem'};
    padding-bottom: ${({ small }) => !small && '1.6rem'};
  }

  @media only screen and (max-width: 18.75em) {
    font-size: ${({ small }) => !small && '1.6rem'};
    padding-top: ${({ small }) => !small && '1rem'};
    padding-bottom: ${({ small }) => !small && '1rem'};
  }

  &:hover {
    background-position: 100%;
  }

  &:disabled {
    opacity: 0.75;
    cursor: default;
  }

  &:disabled:hover {
    background-position: 0%;
  }
`;

export default ProductButton;
