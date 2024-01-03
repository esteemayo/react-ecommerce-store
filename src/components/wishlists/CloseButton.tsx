'use client';

import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';

import { CloseButtonProps } from '@/types';

const CloseButton = ({ id, onOpen }: CloseButtonProps) => {
  return (
    <Button type='button' onClick={() => onOpen(id)}>
      <CloseIcon />
    </Button>
  );
};

const Button = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 3rem;
  display: inline-block;
  border: none;
  width: 2rem;
  height: 2rem;
  font-weight: lighter;
  font-size: 2rem;
  background-color: transparent;
  color: #d2d3d2;
  outline-color: #f1e4f4;
  cursor: pointer;

  @media only screen and (max-width: 37.5em) {
    right: 1.5rem;
  }

  @media only screen and (max-width: 18.75em) {
    top: 1px;
    right: 1rem;
  }

  svg {
    font-weight: inherit;
    font-size: 2rem;
    fill: currentColor;
  }
`;

export default CloseButton;
