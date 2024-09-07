import styled from 'styled-components';

import { CommonImage } from '../CommonImage';

interface ReviewImageProps {
  name?: string;
  photo?: string;
}

const ReviewImage = ({ name, photo }: ReviewImageProps) => {
  return (
    <Container>
      <StyledImage src={photo} alt={name} />
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.bgRevImg};

  @media only screen and (max-width: 62.5em) {
    height: 45.2rem;
  }

  @media only screen and (max-width: 50em) {
    height: 40.3rem;
  }
`;

const StyledImage = styled(CommonImage)`
  width: 100%;
  height: 100%;
`;

export default ReviewImage;
