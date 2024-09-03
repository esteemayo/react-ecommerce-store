import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { CommonButton } from '../buttons/CommonButton';
import { useCartControls } from '../../hooks/useCartControls';

import { CardButtonProps } from '../../types';

const CardButton = ({ actionId, onAction }: CardButtonProps) => {
  const { actionLabel } = useCartControls(actionId);

  return (
    <Button type='button' onClick={onAction}>
      <FontAwesomeIcon icon={faShoppingCart} />
      &nbsp; {actionLabel}
    </Button>
  );
};

const Button = styled(CommonButton)`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  width: 100%;
  text-transform: uppercase;
  padding: 1.5rem 1rem;
  font-size: 1.5rem;

  @media only screen and (max-width: 64em) {
    padding: 1.3rem 1rem;
    font-size: 1.4rem;
  }

  @media only screen and (max-width: 56.25em), only screen and (hover: none) {
    font-size: 1.498rem;
  }

  @media only screen and (max-width: 37.5em) {
    font-size: 1.4rem;
  }

  @media only screen and (min-width: 112.5em) {
    padding: 2rem 1.5rem;
    font-size: 1.8rem;
  }

  &:disabled {
    opacity: 0.75;
    cursor: default;
  }

  &:disabled:hover {
    background-position: 0%;
  }

  svg {
    font-size: inherit;

    @media only screen and (min-width: 112.5em) {
      font-size: 2.25rem;
    }
  }
`;

export default CardButton;
