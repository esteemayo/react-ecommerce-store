import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ToggleButtonProps } from '../../types';

const ToggleButton = ({ icon, onClick }: ToggleButtonProps) => {
  return (
    <Button type='button' onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
    </Button>
  );
};

const Button = styled.button`
  display: inline-block;
  border: none;
  width: 4rem;
  height: 4rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textToggleBtn};
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
`;

export default ToggleButton;
