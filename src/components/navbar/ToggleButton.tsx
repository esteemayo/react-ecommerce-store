'use client';

import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ToggleButtonProps } from '@/types';

const ToggleButton = ({ icon: Icon, onClick }: ToggleButtonProps) => {
  return (
    <Button type='button' onClick={onClick}>
      <FontAwesomeIcon icon={Icon} />
    </Button>
  );
};

const Button = styled.button`
  display: inline-block;
  border: none;
  width: 4rem;
  height: 4rem;
  background-color: transparent;
  color: var(--clr-white);
  margin-right: 2rem;
  transition: all 0.5s ease;

  &:hover {
    transform: rotate(90deg);
  }

  svg {
    width: 3rem;
    height: 3rem;
    fill: inherit;
  }

  @media only screen and (min-width: 50em) {
    display: none;
  }
`;

export default ToggleButton;
