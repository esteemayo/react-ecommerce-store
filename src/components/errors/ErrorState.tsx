import styled from 'styled-components';

import Heading from '../Heading';
import { useSubmenu } from '../../hooks/useSubmenu';

const ErrorState = () => {
  const closeSubmenu = useSubmenu((state) => state.closeSubmenu);

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
        <ButtonWrap>
          <Button type='button'>Reload page</Button>
        </ButtonWrap>
      </Wrapper>
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
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

const ButtonWrap = styled.div``;

const Button = styled.button`
  display: inline-block;
  border: none;
  outline: none;
  text-align: center;
  text-transform: capitalize;
  font-weight: 500;
  font-size: 1.7rem;
  padding: 2rem 2.5rem;
  background-color: var(--clr-primary-red);
  color: var(--clr-white);
  border-radius: 10rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: var(--clr-secondary-red);
  }
`;

export default ErrorState;
