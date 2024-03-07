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
`;

const CartQuantity = styled.span``;

export default CartTotal;
