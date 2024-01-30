import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface SignInButtonProps {
  onClose(): void;
}

const SignInButton = ({ onClose }: SignInButtonProps) => {
  return (
    <StyledLink to='/login' onClick={onClose}>
      Sign in
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  font-family: inherit;
  font-weight: 600;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.bgSideBtn};
  color: ${({ theme }) => theme.textBtn};
  border-radius: 3px;
  outline-color: ${({ theme }) => theme.btnOut};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.75;
  }
`;

export default SignInButton;
