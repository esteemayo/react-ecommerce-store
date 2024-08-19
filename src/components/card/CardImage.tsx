import styled from 'styled-components';

import { CommonImage } from '../CommonImage';

interface CardImageProps {
  src: string;
  name: string;
}

const CardImage = ({ src, name }: CardImageProps) => {
  return (
    <Container>
      <StyledImage src={src} width={300} height={200} alt={name} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const StyledImage = styled(CommonImage)`
  width: 100%;
  height: 27rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  overflow: hidden;

  @media only screen and (max-width: 48em) {
    height: 33.75rem;
  }

  @media only screen and (max-width: 35em) {
    height: 25rem;
  }

  @media only screen and (max-width: 18.75em) {
    width: 30rem;
  }

  @media only screen and (min-width: 112.5em) {
    width: 35rem;
  }
`;

export default CardImage;
