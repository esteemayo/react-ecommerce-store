import styled from 'styled-components';

import { OverlayProps } from '../../types';

interface IProps {
  type: string;
  mode: string;
}

const Overlay = ({ type, mode, children, onClick }: OverlayProps) => {
  return (
    <StyledOverlay
      type={type}
      className='overlay'
      mode={mode}
      onClick={onClick}
    >
      <Container>{children}</Container>
    </StyledOverlay>
  );
};

const StyledOverlay = styled.aside<IProps>`
  width: 100vw;
  height: 100%;
  background-color: ${({ theme }) => theme.bgOverlay};
  backdrop-filter: ${({ mode }) => setBackDropFilter(mode)};
  position: fixed;
  top: 0;
  left: 0;
  display: ${({ type }) => setProperty(type, 'block', 'none')};
  visibility: ${({ type }) => setProperty(type, 'visible', 'hidden')};
  opacity: ${({ type }) => setProperty(type, 1, 0)};
  z-index: ${({ type }) => setProperty(type, 4000, -1)};
`;

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const setBackDropFilter = (mode: string) => {
  return mode === 'true' ? 'blur(2px)' : undefined;
};

const setProperty = (
  type: string,
  val1: string | number,
  val2: string | number
) => {
  return type === 'show' ? val1 : val2;
};

export default Overlay;
