import styled from 'styled-components';
import { useCallback } from 'react';
import { signInWithPopup } from 'firebase/auth';

import { CommonImage } from '../CommonImage';
import { auth, provider } from '../../firebase';

import { useAuth } from '../../hooks/useAuth';
import { googleLogin } from '../../services/authService';

const GoogleButton = () => {
  const { googleLoginFulfilled, googleLoginPending, googleLoginRejected } =
    useAuth();

  const signInWithGoogle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      googleLoginPending();

      signInWithPopup(auth, provider)
        .then(async (result) => {
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

          const { data } = await googleLogin(credentials);
          googleLoginFulfilled(data);
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((err: unknown | any) => {
          console.log(err);
          googleLoginRejected(err._FirebaseError.message);
        });
    },
    [googleLoginFulfilled, googleLoginPending, googleLoginRejected]
  );

  return (
    <Button type='button' onClick={signInWithGoogle}>
      <StyledImage
        src='/img/google-logo.png'
        width={23}
        height={23}
        alt='google'
      />
      Google
    </Button>
  );
};

const Button = styled.button`
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

export default GoogleButton;
