import styled from 'styled-components';

import GoogleButton from '../../components/buttons/GoogleButton';
import FacebookButton from '../../components/buttons/FacebookButton';

const SocialLogin = () => {
  return (
    <Container>
      <GoogleButton />
      <FacebookButton />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin: 2rem 0;

  @media only screen and (max-width: 64em) {
    margin: 1.8rem 0;
  }

  @media only screen and (max-width: 26.25em) {
    flex-direction: column;
    gap: 1rem;
  }
`;

export default SocialLogin;
