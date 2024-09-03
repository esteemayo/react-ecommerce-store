import styled from 'styled-components';

import { CommonImage } from '../CommonImage';
import { ProductImageProps } from '../../types';

const ProductImage = ({ image, index, onOpen }: ProductImageProps) => {
  return (
    <Image
      src={image}
      width={350}
      height='100%'
      alt={`image ${index + 1}`}
      onClick={() => onOpen(index)}
    />
  );
};

const Image = styled(CommonImage)`
  width: 37.5rem;
  height: 100%;
  border-radius: 2px;
  cursor: pointer;

  @media only screen and (max-width: 64em) {
    width: 31.5rem;
  }

  @media only screen and (max-width: 59.375em) {
    width: 24.835rem;
  }

  @media only screen and (max-width: 50em) {
    width: 225px;
    height: 30rem;
    border-radius: revert;
    cursor: default;
  }

  @media only screen and (max-width: 37.5em) {
    height: 20rem;
  }

  @media only screen and (max-width: 18.75em) {
    height: 15rem;
  }

  @media only screen and (min-width: 112.5em) {
    width: 42.16rem;
  }
`;

export default ProductImage;
