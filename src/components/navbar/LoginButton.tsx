'use client';

import styled from 'styled-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { LoginButtonProps } from '@/types';

const LoginButton = ({
  isHover,
  onMouseOver,
  onMouseLeave,
}: LoginButtonProps) => {
  return (
    <Container>
      <Link href='/login' passHref>
        <Button
          type='button'
          onMouseOver={onMouseOver}
          onMouseLeave={onMouseLeave}
        >
          Sign in &nbsp;
          {isHover ? <ArrowForwardIcon /> : <ArrowForwardIosIcon />}
        </Button>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  a {
    &:link,
    &:visited {
      display: inline-block;
      text-decoration: none;
      color: currentColor;
      outline: none;
    }
  }
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

  svg {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 1.25rem;
    fill: currentColor;
    transition: 150ms cubic-bezier(0.22, 0.61, 0.36, 1);
  }

  &:hover {
    background-color: ${({ theme }) => theme.bgSignInBtnHov};
    opacity: 1;
  }
`;

export default LoginButton;
