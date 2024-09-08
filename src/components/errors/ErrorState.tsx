import { useCallback } from 'react';
import styled from 'styled-components';

import Heading from '../Heading';
import { useSubmenu } from '../../hooks/useSubmenu';

const ErrorState = () => {
  const closeSubmenu = useSubmenu((state) => state.closeSubmenu);

  const handleReload = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    window.location.assign(window.location.pathname);
  }, []);

  return (
    <Container onMouseOver={closeSubmenu}>
      <Wrapper>
        <Image
          src='/svg/qa-engineers.svg'
          width={300}
          height={300}
          alt='error icon'
        />
        <Heading
          title='Uh oh!'
          subtitle='It looks like something went wrong on our end. Please try again.'
          center
        />
        <Button type='button' onClick={handleReload}>
          Reload page
        </Button>
      </Wrapper>
    </Container>
  );
};

const Container = styled.main`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  padding: 10rem 0;

  @media only screen and (max-width: 56.25em) {
    height: 80vh;
  }

  @media only screen and (max-width: 31.25em) {
    height: 70vh;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 30rem;
  height: 30rem;
  display: inline-block;
  object-fit: contain;

  @media only screen and (min-width: 112.5em) {
    width: 40rem;
    height: 35rem;
  }
`;

const Button = styled.button`
  display: inline-block;
  border: none;
  text-align: center;
  font-weight: 500;
  font-size: 1.7rem;
  padding: 2rem 2.5rem;
  background-color: var(--clr-primary-red);
  color: var(--clr-white);
  border-radius: 10rem;
  outline-color: #e92222;
  cursor: pointer;
  transition: all 0.3s;

  @media only screen and (max-width: 31.25em) {
    padding: 1.5rem 2rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 2.3rem;
  }

  &:hover {
    background-color: var(--clr-secondary-red);
  }

  &:disabled {
    opacity: 0.85;
    cursor: not-allowed;
  }
`;

export default ErrorState;
