import styled from 'styled-components';
import { useCallback } from 'react';
import { signInWithPopup } from 'firebase/auth';

import { CommonImage } from '../CommonImage';
import { auth, provider } from '../../firebase';

import { useAuth } from '../../hooks/useAuth';
import { googleLogin } from '../../services/authService';

import { SocialButton } from './SocialButton';

const GoogleButton = () => {
  const { googleLoginFulfilled, googleLoginPending, googleLoginRejected } =
    useAuth();

  const signInWithGoogle = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      signInWithPopup(auth, provider)
        .then(async (result) => {
          const credentials = {
            name: result.user.displayName,
            email: result.user.email,
            username: result.user.displayName
              ?.split(' ')
              .shift()
              ?.toLowerCase(),
            image: result.user.photoURL,
            phone: result.user.phoneNumber,
          };

          googleLoginPending();

          try {
            const { data } = await googleLogin(credentials);
            googleLoginFulfilled(data);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (err: unknown | any) {
            googleLoginRejected(err.response.data.message);
          }
        })
        .catch((err: unknown) => {
          console.log(err);
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

const Button = styled(SocialButton)``;

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
