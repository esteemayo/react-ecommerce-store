import { FaFacebookF } from 'react-icons/fa';
import { useCallback } from 'react';
import { signInWithPopup } from 'firebase/auth';
import styled from 'styled-components';

import { SocialButton } from './SocialButton';
import { auth, facebookProvider } from '../../firebase';

const FacebookButton = () => {
  const signInWithFacebook = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      signInWithPopup(auth, facebookProvider)
        .then((result) => {
          const user = result.user.providerData[0];
          console.log(user);

          const credentials = {
            name: user.displayName,
            email: user.email,
            username: user.displayName?.split(' ').shift()?.toLowerCase(),
            image: user.photoURL,
            phone: user.phoneNumber,
          };
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
