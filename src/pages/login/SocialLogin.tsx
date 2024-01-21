import { FaFacebookF } from 'react-icons/fa';
import { useCallback } from 'react';
import { signInWithPopup } from 'firebase/auth';
import styled from 'styled-components';

import { useAuth } from '../../hooks/useAuth';
import { CommonImage } from '../../components/CommonImage';

import { auth, provider } from '../../firebase';

const SocialLogin = () => {
  const { googleLoginFulfilled, googleLoginPending, googleLoginRejected } =
    useAuth();

  const signInWithGoogle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      googleLoginPending();

      signInWithPopup(auth, provider)
        .then((result) => {
          console.log(result.user);
          const credentials = {
            name: result.user.displayName,
            email: result.user.email,
            username: result.user.displayName
              ?.split(' ')
              .shift()
              ?.toLowerCase(),
            fromGoogle: true,
            image: result.user.photoURL,
          };

          googleLoginFulfilled(credentials);
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((err: unknown | any) => {
          console.log(err);
          googleLoginRejected(err);
        });
    },
    [googleLoginFulfilled, googleLoginPending, googleLoginRejected]
  );

  return (
    <Container>
      <GoogleButton type='button' onClick={signInWithGoogle}>
        <StyledImage
          src='/img/google-logo.png'
          width={23}
          height={23}
          alt='google'
        />
        Google
      </GoogleButton>
      <FacebookButton type='button'>
        <FaFacebookF />
        Facebook
      </FacebookButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
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

const GoogleButton = styled.button`
  width: 50%;
  padding: 1rem 4rem;
  font-weight: 400;
  font-size: 1.5rem;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: 0.5rem;
  outline-color: #ccc;
  cursor: pointer;
  transition: all 0.3s ease;

  display: flex;
  align-items: center;
  gap: 0.8rem;

  @media only screen and (max-width: 56.25em), only screen and (hover: none) {
    font-size: 1.495rem;
  }

  @media only screen and (max-width: 26.25em) {
    width: 100%;
    justify-content: center;
  }

  &:hover {
    opacity: 0.7;
  }
`;

const StyledImage = styled(CommonImage)`
  width: 2.3rem;
  height: 2.3rem;
  background-color: transparent;

  @media only screen and (max-width: 26.25em) {
    width: 2rem;
    height: 2rem;
  }
`;

const FacebookButton = styled.button`
  width: 50%;
  padding: 1rem 4rem;
  font-weight: 400;
  font-size: 1.5rem;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  border: 1px solid ${({ theme }) => theme.inputBorder};
  border-radius: 0.5rem;
  outline-color: #ccc;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.7;
  }

  display: flex;
  align-items: center;
  gap: 0.8rem;

  @media only screen and (max-width: 56.25em), only screen and (hover: none) {
    font-size: 1.495rem;
  }

  @media only screen and (max-width: 26.25em) {
    width: 100%;
    justify-content: center;
  }

  svg {
    font-size: 2.3rem;
    color: #3b5999;

    @media only screen and (max-width: 26.25em) {
      font-size: 2rem;
    }
  }
`;

export default SocialLogin;
