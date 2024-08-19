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

  @media only screen and (max-width: 37.5em) {
    height: 17.5rem;
  }
`;

export default CardImage;
