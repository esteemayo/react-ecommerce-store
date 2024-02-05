import styled from 'styled-components';
import { CommonImage } from '../CommonImage';

const EmptyWishlist = () => {
  return (
    <Container>
      <Image
        src='/svg/empty-list.svg'
        width={500}
        height={400}
        alt='empty list'
      />
    </Container>
  );
};

const Container = styled.div``;

const Image = styled(CommonImage)`
  background-color: transparent;
`;

export default EmptyWishlist;
