import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';

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
`;

export default CartQuantity;
