'use client';

import styled from 'styled-components';
import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';

import { useDarkMode } from '@/hooks/useDarkMode';

interface IMode {
  mode: string;
}

const DarkModeToggle = () => {
  const mode = useDarkMode((state) => state.mode);
  const toggle = useDarkMode((state) => state.toggle);

  return (
    <Container onClick={toggle}>
      <Icon>
        <DarkModeOutlined />
      </Icon>
      <Icon>
        <LightModeOutlined />
      </Icon>
      <Ball mode={mode.toString()} />
    </Container>
  );
};

const Container = styled.div`
  width: 4.2rem;
  height: 2.4rem;
  padding: 2px;
  border: 2px solid ${({ theme }) => theme.bgToggleMode};
  border-radius: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  cursor: pointer;
`;

const Icon = styled.div`
  display: flex;
  align-items: center;

  svg {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.bgModeToggleIcon};
  }
`;

const Ball = styled.div<IMode>`
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${({ theme }) => theme.bgToggleMode};
  border-radius: 50%;
  position: absolute;
  left: ${({ mode }) => mode === 'false' && '2px'};
  right: ${({ mode }) => mode === 'true' && '2px'};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.bgToggleModeHov};
  }
`;

export default DarkModeToggle;
