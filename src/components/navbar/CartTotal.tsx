import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

interface CartTotalProps {
  amount: number;
}

const CartTotal = ({ amount }: CartTotalProps) => {
  return (
    <Container>
      <StyledLink to='/'>
        <FontAwesomeIcon icon={faBagShopping} />
        <CartQuantity>{amount}</CartQuantity>
      </StyledLink>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: var(--clr-white);
  outline-color: ${({ theme }) => theme.navOut};

  svg {
    font-size: 2.3rem;
    color: currentColor;
  }
`;

const CartQuantity = styled.span`
  display: inline-block;
  width: 2rem;
  height: 2rem;
  font-size: 1rem;
  background-color: var(--clr-white);
  color: red;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default CartTotal;
