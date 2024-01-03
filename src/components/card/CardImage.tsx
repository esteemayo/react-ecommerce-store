import styled from 'styled-components';

import { CommonImage } from '../CommonImage';

interface CardImageProps {
  src: string;
}

const CardImage = ({ src }: CardImageProps) => {
  return (
    <Container>
      <StyledImage src={src} width={300} height={200} alt='' />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const StyledImage = styled(CommonImage)`
  width: 100%;
  height: 20rem;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;

  @media only screen and (max-width: 37.5em) {
    height: 17.5rem;
  }
`;

export default CardImage;
