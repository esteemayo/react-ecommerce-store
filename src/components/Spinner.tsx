'use client';

import styled, { keyframes } from 'styled-components';

interface SpinnerProps {
  size?: string;
}

interface IContainer {
  size?: string;
}

const Spinner = ({ size = 'sm' }: SpinnerProps) => {
  return <Container size={size}>&nbsp;</Container>;
};

const Rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div<IContainer>`
  width: ${({ size }) => setWidth(size)};
  height: ${({ size }) => setHeight(size)};
  border: 3px solid #f5f5f5;
  border-top-color: ${({ theme }) => theme.spnrBorTop};
  border-radius: 50%;
  animation: ${Rotate} 0.6s linear infinite;
`;

const setWidth = (size: string) => {
  if (size === 'xs') return '1.5rem';
  if (size === 'sm') return '2rem';
  if (size === 'md') return '5rem';
  if (size === 'lg') return '10rem';
};

const setHeight = (size: string) => {
  if (size === 'xs') return '1.5rem';
  if (size === 'sm') return '2rem';
  if (size === 'md') return '5rem';
  if (size === 'lg') return '10rem';
};

export default Spinner;
