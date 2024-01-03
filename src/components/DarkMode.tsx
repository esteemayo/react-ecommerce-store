'use client';

import styled from 'styled-components';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';

import { useDarkMode } from '@/hooks/useDarkMode';

const Darkmode = () => {
  const mode = useDarkMode((state) => state.mode);
  const toggle = useDarkMode((state) => state.toggle);

  return (
    <Container>
      <Wrapper onClick={toggle}>
        {mode ? <LightModeOutlined /> : <DarkModeOutlined />}
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  left: 0;
  bottom: 0.5rem;
  width: 4.5rem;
  height: 4.5rem;
  background-color: ${({ theme }) => theme.bgMode};
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  -webkit-box-shadow: ${({ theme }) => theme.boxMode};
  -moz-box-shadow: ${({ theme }) => theme.boxMode};
  box-shadow: ${({ theme }) => theme.boxMode};

  @media only screen and (min-width: 50em) {
    display: none;
  }

  @media only screen and (max-width: 37.5em) {
    bottom: 1rem;
    width: 4rem;
    height: 4rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  background-color:  ${({ theme }) => theme.bgIconMode};
  border-radius: 50%;
  box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0 0 0.4rem rgba(0, 0, 0, 0.1);
  margin: 0.2rem;
  border: 0;
  transform: scale(0.75);
  cursor: pointer;
  transition: all 200ms ease-in;

  @media only screen and (max-width: 37.5em) {
    width: 3.5rem;
    height: 3.5rem;
  }

  svg {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.textMode};

    @media only screen and (max-width: 37.5em) {
      font-size: 2rem;
    }
  }
`;

export default Darkmode;
