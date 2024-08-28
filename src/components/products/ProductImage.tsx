import styled from 'styled-components';

import { CommonImage } from '../CommonImage';
import { ProductImageProps } from '../../types';

const ProductImage = ({ image, index, onOpen }: ProductImageProps) => {
  return (
    <Image
      src={image}
      width={350}
      height={350}
      alt={`image ${index + 1}`}
      onClick={() => onOpen(index)}
    />
  );
};

const Image = styled(CommonImage)`
  width: 35rem;
  height: 35rem;
  border-radius: 2px;
  cursor: pointer;

  @media only screen and (max-width: 64em) {
    width: 30rem;
  }

  @media only screen and (max-width: 59.375em) {
    width: 23rem;
    height: 30rem;
  }

  @media only screen and (max-width: 50em) {
    width: 225px;
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
    width: 40rem;
    height: 40rem;
  }
`;

export default ProductImage;
