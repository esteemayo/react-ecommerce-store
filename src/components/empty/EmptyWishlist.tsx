import styled from 'styled-components';

import { CommonImage } from '../CommonImage';

const EmptyWishlist = () => {
  return (
    <Container>
      <Wrapper>
        <Image
          src='/svg/empty-list.svg'
          width={300}
          height={400}
          alt='empty list'
        />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled(CommonImage)`
  display: inline-block;
  width: 30rem;
  height: 40rem;
  background-color: transparent;
  object-fit: contain;

  @media only screen and (max-width: 18.75em) {
    height: 35rem;
  }
`;

export default EmptyWishlist;
