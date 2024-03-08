import { FaFacebookF } from 'react-icons/fa';
import { useCallback } from 'react';
import { signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import styled from 'styled-components';

import { SocialButton } from './SocialButton';
import { auth, facebookProvider } from '../../firebase';

const FacebookButton = () => {
  const signInWithFacebook = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      signInWithPopup(auth, facebookProvider)
        .then((result) => {
          // The signed-in user info.
          const user = result.user;
          console.log(user);

          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          const credential = FacebookAuthProvider.credentialFromResult(result);
          const accessToken = credential?.accessToken;
          console.log(accessToken);
        })
        .catch((err: unknown) => {
          console.log(err);
        });
    },
    []
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
  }
`;

export default FacebookButton;
