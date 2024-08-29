import { FaFacebookF } from 'react-icons/fa';
import { useCallback } from 'react';
import { signInWithPopup } from 'firebase/auth';
import styled from 'styled-components';

import { useAuth } from '../../hooks/useAuth';
import { facebookLogin } from '../../services/authService';

import { SocialButton } from './SocialButton';
import { auth, facebookProvider } from '../../firebase';

const FacebookButton = () => {
  const {
    facebookLoginFulfilled,
    facebookLoginPending,
    facebookLoginRejected,
  } = useAuth();

  const signInWithFacebook = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      signInWithPopup(auth, facebookProvider)
        .then(async (result) => {
          const user = result.user.providerData[0];

          const credentials = {
            name: user.displayName,
            email: user.email,
            username: user.displayName?.split(' ').shift()?.toLowerCase(),
            image: user.photoURL,
            phone: user.phoneNumber,
          };

          facebookLoginPending();

          try {
            const { data } = await facebookLogin({ ...credentials });
            facebookLoginFulfilled(data);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (err: unknown | any) {
            facebookLoginRejected(err.response.data.message);
          }
        })
        .catch((err: unknown) => {
          console.log(err);
        });
    },
    [facebookLoginFulfilled, facebookLoginPending, facebookLoginRejected]
  );

  return (
    <Button type='button' onClick={signInWithFacebook}>
      <FaFacebookF />
      Facebook
    </Button>
  );
};

const Button = styled(SocialButton)`
  svg {
    font-size: 2.3rem;
    color: #3b5999;

    @media only screen and (max-width: 26.25em) {
      font-size: 2rem;
    }

    @media only screen and (min-width: 112.5em) {
      font-size: 2.5rem;
    }
  }
`;

export default FacebookButton;
