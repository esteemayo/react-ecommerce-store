import styled from 'styled-components';

import { CommonImage } from '../CommonImage';

interface AvatarProps {
  src: string;
  name: string;
}

const Avatar = ({ src, name }: AvatarProps) => {
  return (
    <Container>
      <Image src={src} width={50} height={50} alt={name} />
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

  @media only screen and (min-width: 112.5em) {
    width: 6rem;
    height: 6rem;
  }
`;

export default Avatar;
