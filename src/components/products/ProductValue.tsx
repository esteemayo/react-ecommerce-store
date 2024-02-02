import styled from 'styled-components';

import { CommonImage } from '../CommonImage';
import { ProductValueProps } from '../../types';

const ProductValue = ({ items, mode }: ProductValueProps) => {
  return (
    <Container>
      <ValueAdd>
        {items?.map((item) => {
          const { id, desc, img, src } = item;
          return (
            <ImageWrapper key={id}>
              <Image src={mode ? src : img} width={24} height={24} alt='icon' />
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

const Image = styled(CommonImage)`
  display: inline-block;
  width: 2.4rem;
  height: auto;
  background-color: transparent;
`;

export default ProductValue;
