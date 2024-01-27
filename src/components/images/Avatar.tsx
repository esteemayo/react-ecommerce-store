import styled from 'styled-components';

import { CommonImage } from '../CommonImage';

interface AvatarProps {
  src: string;
}

const Avatar = ({ src }: AvatarProps) => {
  return (
    <Container>
      <Image src={src} width={50} height={50} alt='' />
    </Container>
  );
};

const Container = styled.div``;

const Image = styled(CommonImage)`
  width: 5rem;
  height: 5rem;
  display: inline-block;
  border-radius: 50%;

  @media only screen and (max-width: 31.25em) {
    width: 4.5rem;
    height: 4.5rem;
  }

  @media only screen and (max-width: 25em) {
    width: 3.5rem;
    height: 3.5rem;
  }

  @media only screen and (max-width: 18.75em) {
    width: 3rem;
    height: 3rem;
  }
`;

export default Avatar;
