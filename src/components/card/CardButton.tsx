import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useMemo } from 'react';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

import { useAuth } from '../../hooks/useAuth';
import { CardButtonProps } from '../../types';

import { CommonButton } from '../buttons/CommonButton';

const CardButton = ({ inCart, onClick }: CardButtonProps) => {
  const navigate = useNavigate();
  const currentUser = useAuth((state) => state.user);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return navigate('/login');
      }
      onClick();
    },
    [currentUser, navigate, onClick]
  );

  const btnLabel = useMemo(() => {
    return `${inCart ? 'added' : 'add'} to cart`;
  }, [inCart]);

  return (
    <Button type='button' onClick={handleClick}>
      <FontAwesomeIcon icon={faShoppingCart} />
      &nbsp; {btnLabel}
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
`;

export default CardButton;
