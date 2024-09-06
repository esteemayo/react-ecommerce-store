import styled from 'styled-components';

import Spinner from './Spinner';

interface LoaderProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  title?: string;
}

const Loader = ({ size, title }: LoaderProps) => {
  return (
    <Container>
      <Wrapper>
        <Spinner size={size} />
        {title && <Text>{title}</Text>}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100%;
  background-color: ${({ theme }) => theme.bgOverlay};
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 4000;
`;

const Wrapper = styled.div`
  width: 40rem;
  height: 30rem;
  background-color: ${({ theme }) => theme.bgModal};
  border-radius: 1.5rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 30em) {
    width: 35rem;
    height: 25rem;
  }

  @media only screen and (min-width: 112.5em) {
    width: 50rem;
    height: 35rem;
  }

  & > div {
    @media only screen and (min-width: 112.5em) {
      width: 7rem;
      height: 7rem;
    }
  }
`;

const Text = styled.span`
  margin-top: 1rem;
  font-size: 100%;
  color: ${({ theme }) => theme.text};

  @media only screen and (min-width: 112.5em) {
    margin-top: 2rem;
    font-size: 2rem;
  }
`;

export default Loader;
