'use client';

import styled from 'styled-components';

import { CartInfoProps } from '@/types';
import { formatCurrency } from '@/utils/formatCurrency';

import { CommonImage } from '../CommonImage';

interface IColor {
  color: string | string[];
}

const CartInfo = ({
  id,
  color,
  name,
  image,
  price,
  size,
  onAction,
}: CartInfoProps) => {
  return (
    <Container>
      <ImageContainer>
        <StyledImage src={image} width={120} height={120} alt='' />
      </ImageContainer>
      <CartDetails>
        <Title>{name}</Title>
        <PriceContainer>
          <Label>Price:</Label>
          <Price>{formatCurrency(price)}</Price>
        </PriceContainer>
        <ColorContainer>
          <Label>Color:</Label>
          <Color color={color}>{color}</Color>
        </ColorContainer>
        {size && (
          <SizeContainer>
            <Label>Size:</Label>
            <Size>{size}</Size>
          </SizeContainer>
        )}
        <RemoveButton type='button' onClick={() => onAction(id)}>
          Remove
        </RemoveButton>
      </CartDetails>
    </Container>
  );
};

const Container = styled.div`
  flex: 3;
  display: flex;
  align-items: flex-start;
  gap: 2rem;
`;

const ImageContainer = styled.div`
  width: 8rem;
  height: 8rem;
  background-color: #ede9e6;
  border-radius: 3px;
`;

const StyledImage = styled(CommonImage)`
  width: 100%;
  height: 100%;
  border-radius: 2px;
`;

const CartDetails = styled.div`
  width: 30rem;
`;

const Title = styled.h2`
  display: block;
  font-weight: 500;
  font-size: 2rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;

  @media only screen and (max-width: 43.75em) {
    font-size: 1.8rem;
  }

  @media only screen and (max-width: 31.25em) {
    word-wrap: break-word;
    word-break: break-all;
  }

  @media only screen and (max-width: 18.75em) {
    font-size: var(--default-font-size);
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Label = styled.p`
  text-transform: capitalize;
  font-weight: 500;
  font-size: var(--default-font-size);
  color: ${({ theme }) => theme.text};

  @media only screen and (max-width: 43.75em) {
    font-size: 1.5rem;
  }
`;

const Price = styled.span`
  display: block;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.textCartItem};

  @media only screen and (max-width: 43.75em) {
    font-size: 1.45rem;
  }
`;

const ColorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Color = styled.span<IColor>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: capitalize;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.textCartItem};

  @media only screen and (max-width: 43.75em) {
    font-size: 1.45rem;
  }

  &::before {
    content: '';
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    background-color: ${({ color }) => setBackground(color)};
    border: 1px solid ${({ color }) => color};
    border-radius: 50%;

    @media only screen and (max-width: 43.75em) {
      width: 1.4rem;
      height: 1.4rem;
    }
  }
`;

const SizeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Size = styled.span`
  display: block;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.textCartItem};

  @media only screen and (max-width: 43.75em) {
    font-size: 1.45rem;
  }
`;

const RemoveButton = styled.button`
  display: inline-block;
  border: none;
  text-transform: capitalize;
  font-weight: 500;
  font-size: 1.45rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textRemoveCart};
  outline-color: #eee;
  outline-offset: 3px;
  margin-top: 1rem;
  cursor: pointer;
`;

const setBackground = (color: string) => {
  if (color === 'white') return '#f9f9f9';
  return color;
};

export default CartInfo;
