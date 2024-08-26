import styled from 'styled-components';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { LoginButtonProps } from '../../types';

const LoginButton = ({
  isHover,
  onMouseOver,
  onMouseLeave,
}: LoginButtonProps) => {
  return (
    <Container>
      <StyledLink to='/login'>
        <Button
          type='button'
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
        >
          Sign in &nbsp;
          {isHover ? <ArrowForwardIcon /> : <ArrowForwardIosIcon />}
        </Button>
      </StyledLink>
    </Container>
  );
};

const Container = styled.div``;

const StyledLink = styled(Link)`
  display: inline-block;
  text-decoration: none;
  color: currentColor;
  outline: none;
`;

const Button = styled.button`
  border: none;
  display: inline-block;
  font-weight: 600;
  font-size: 1.5rem;
  padding: 0.75rem 2rem;
  background-color: ${({ theme }) => theme.bgSignInBtn};
  color: ${({ theme }) => theme.textSignInBtn};
  border-radius: 10rem;
  outline-color: ${({ theme }) => theme.bgSignInBtn};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  @media only screen and (min-width: 112.5em) {
    font-size: 1.7rem;
    padding: 1rem 2rem;
  }

  svg {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.25rem;
    fill: currentColor;
    transition: 150ms cubic-bezier(0.22, 0.61, 0.36, 1);

    @media only screen and (min-width: 112.5em) {
      top: 1.05rem;
      font-size: 1.5rem;
    }
  }

  &:hover {
    background-color: ${({ theme }) => theme.bgSignInBtnHov};
    opacity: 1;
  }
`;

export default LoginButton;
