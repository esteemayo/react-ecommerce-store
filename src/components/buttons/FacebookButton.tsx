import styled from 'styled-components';
import { FaFacebookF } from 'react-icons/fa';

import { SocialButton } from './SocialButton';

const FacebookButton = () => {
  return (
    <Button type='button'>
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
