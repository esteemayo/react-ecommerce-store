'use client';

import styled from 'styled-components';

import { ProductValueProps } from '@/types';
import { CommonImage } from '../CommonImage';

interface IMode {
  mode: string;
}

const ProductValue = ({ items, mode }: ProductValueProps) => {
  return (
    <Container>
      <ValueAdd>
        {items?.map((item) => {
          const { id, desc, img } = item;
          return (
            <ImageWrapper key={id}>
              <StyledImage
                src={img}
                width={24}
                height={24}
                alt=''
                mode={mode}
              />
              <span>{desc}</span>
            </ImageWrapper>
          );
        })}
      </ValueAdd>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-top: 2.4rem;
  margin-bottom: 2rem;
`;

const ValueAdd = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 3.2rem;
  color: ${({ theme }) => theme.text};

  span {
    font-size: 1.25rem;
    line-height: 1.2;
  }
`;

const ImageWrapper = styled.div`
  color: inherit;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const StyledImage = styled(CommonImage)<IMode>`
  width: 2.4rem;
  height: auto;
  background-color: ${({ mode }) => mode === 'true' && '#1b1a1a'};
  display: inline-block;
`;

export default ProductValue;
