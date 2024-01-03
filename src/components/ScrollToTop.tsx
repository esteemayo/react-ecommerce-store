'use client';

import styled from 'styled-components';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { useCallback, useEffect, useState } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    setIsVisible(window.scrollY > 500 ? true : false);
  }, []);

  const scrollHandler = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [toggleVisibility]);

  return (
    <Container>
      {isVisible && (
        <Wrapper onClick={scrollHandler}>
          <KeyboardDoubleArrowUpIcon />
        </Wrapper>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 3000;
  animation: fadeIn 700ms ease-in-out 1s both;

  @media only screen and (max-width: 64em) {
    right: 2rem;
    bottom: 3rem;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`;

const Wrapper = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: ${({ theme }) => theme.bgScroll};
  color: ${({ theme }) => theme.textScroll};
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.boxScroll};
  -webkit-box-shadow: ${({ theme }) => theme.bgScroll};
  -moz-box-shadow: ${({ theme }) => theme.bgScroll};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  cursor: pointer;

  @media only screen and (max-width: 31.25em) {
    width: 3.85rem;
    height: 3.85rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.soft};
    box-shadow: ${({ theme }) => theme.bgScrollHov};
    -webkit-box-shadow: ${({ theme }) => theme.bgScrollHov};
    -moz-box-shadow: ${({ theme }) => theme.bgScrollHov};
  }

  svg {
    font-size: 1.5rem;
    fill: ${({ theme }) => theme.textScroll};
  }
`;

export default ScrollToTop;
