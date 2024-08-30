import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

import { CartQuantityProps } from '../../types';

const CartQuantity = ({ amount }: CartQuantityProps) => {
  return (
    <Container>
      <StyledLink to='/cart'>
        <FontAwesomeIcon icon={faBagShopping} />
        <CartTotal>{amount}</CartTotal>
      </StyledLink>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.bgToggleModeIcon};
  outline-color: ${({ theme }) => theme.navOut};

  &:active {
    color: ${({ theme }) => theme.bgToggleModeIcon};
  }

  svg {
    font-size: 2.3rem;
    color: currentColor;

    @media only screen and (min-width: 112.5em) {
      font-size: 3rem;
    }
  }
`;

const CartTotal = styled.span`
  width: 2rem;
  height: 2rem;
  font-size: 1.23rem;
  background-color: ${({ theme }) => theme.bgToggleMode};
  color: ${({ theme }) => theme.textCartQty};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: -1rem;
  right: -1rem;
  cursor: pointer;

  @media only screen and (min-width: 112.5em) {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.5rem;
    right: -1.25rem;
  }
`;

export default CartQuantity;
