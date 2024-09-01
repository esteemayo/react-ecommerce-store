import styled from 'styled-components';

import { CommonImage } from '../CommonImage';
import { EmptyStateProps } from '../../types';

const EmptyState = ({ src = '/img/404.png', title }: EmptyStateProps) => {
  return (
    <Container>
      <Wrapper>
        <StyledImage src={src} width={300} height={300} alt='404' />
        {title && <Message>{title}</Message>}
      </Wrapper>
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  height: 100vh;

  @media only screen and (max-width: 48em) {
    height: 90vh;
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

const StyledImage = styled(CommonImage)`
  width: 30rem;
  height: 30rem;
  background-color: transparent;

  @media only screen and (min-width: 112.5em) {
    width: 40rem;
    height: 40rem;
  }
`;

const Message = styled.span`
  font-size: 2rem;
  color: ${({ theme }) => theme.textNotFound};
  margin-top: -5rem;

  @media only screen and (min-width: 112.5em) {
    font-size: 2.5rem;
  }
`;

export default EmptyState;
