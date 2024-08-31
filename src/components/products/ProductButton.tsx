import styled, { DefaultTheme, css } from 'styled-components';

import { ProductButtonProps } from '../../types';

interface IBtn {
  small?: string;
}

const ProductButton = ({
  small,
  actionLabel,
  inCart,
  onAction,
}: ProductButtonProps) => {
  return (
    <Button
      type='button'
      small={small?.toString()}
      disabled={inCart}
      onClick={onAction}
    >
      {actionLabel}
    </Button>
  );
};

const Button = styled.button<IBtn>`
  display: inline-block;
  border: none;
  text-align: center;
  font-size: ${({ small }) => (small === 'true' ? '1.5rem' : '1.8rem')};
  width: 100%;
  padding: ${({ small }) => (small === 'true' ? '1.3rem 1rem' : '2rem 1rem')};
  background-color: ${({ theme, small }) => setBcg(theme, small)};
  color: ${({ theme }) => theme.textBtn};
  background-image: ${({ theme }) => css`
  linear-gradient(
    120deg,
    transparent 0%,
    transparent 50%,
    ${theme.bgBtnCart} 50%
  );
  `};
  background-size: 220%;
  border-radius: 0.5rem;
  outline-color: ${({ theme }) => theme.btnCartOut};
  line-height: ${({ small }) => (small === 'true' ? '1em' : '1.3em')};
  margin: ${({ small }) => (small === 'true' ? '1rem 0' : '3rem 0')};
  cursor: pointer;
  transition: all 0.3s;

  @media only screen and (max-width: 59.375em) {
    padding-top: ${({ small }) => small !== 'true' && '1.75rem'};
    padding-bottom: ${({ small }) => small !== 'true' && '1.75rem'};
  }

  @media only screen and (max-width: 56.25em), only screen and (hover: none) {
    font-size: ${({ small }) => small === 'true' && '1.6rem'};
  }

  @media only screen and (max-width: 37.5em), only screen and (hover: none) {
    font-size: ${({ small }) => small !== 'true' && '1.7rem'};
    padding-top: ${({ small }) => small !== 'true' && '1.6rem'};
    padding-bottom: ${({ small }) => small !== 'true' && '1.6rem'};
  }

  @media only screen and (max-width: 18.75em) {
    font-size: ${({ small }) => small !== 'true' && '1.6rem'};
    padding-top: ${({ small }) => small !== 'true' && '1rem'};
    padding-bottom: ${({ small }) => small !== 'true' && '1rem'};
  }

  @media only screen and (min-width: 112.5em) {
    font-size: ${({ small }) => (small === 'true' ? '1.8rem' : '2.3rem')};
    padding: ${({ small }) =>
      small === 'true' ? '1.8rem 1.5rem' : '2.5rem 1.5rem'};
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

const setBcg = (theme: DefaultTheme, small?: string) => {
  if (small === 'true') return theme.bgAddBtn;
  return theme.bgProdBtn;
};

export default ProductButton;
