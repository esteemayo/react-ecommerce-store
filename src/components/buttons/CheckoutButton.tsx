import styled from 'styled-components';
import StripeCheckout from 'react-stripe-checkout';

import { CheckoutButtonProps } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';

interface IBtn {
  btnType?: string;
}

const CheckoutButton = ({
  email,
  total,
  stripeKey,
  onToken,
}: CheckoutButtonProps) => {
  return (
    <StripeCheckout
      name='eStore'
      image='https://media.istockphoto.com/vectors/shopping-cart-line-icon-fast-buy-vector-logo-vector-id1184670036?k=20&m=1184670036&s=612x612&w=0&h=FpKQukhJ4X8WQkucHPbCqANJROKYB2v3k9ov3x-3vdI='
      email={email}
      billingAddress
      shippingAddress
      description={`Your total is ${formatCurrency(total)}`}
      amount={total * 100}
      currency='USD'
      stripeKey={stripeKey}
      token={onToken}
    >
      <Button type='button' className='btn-pay'>
        Checkout Now
      </Button>
    </StripeCheckout>
  );
};

const Button = styled.button<IBtn>`
  border: none;
  display: inline-block;
  font-size: 1.5rem;
  width: 100%;
  padding: 1rem 0.5rem;
  background-color: ${({ theme }) => theme.bgCartBtn};
  color: ${({ theme }) => theme.textBtn};
  background-image: linear-gradient(
    120deg,
    transparent 0%,
    transparent 50%,
    #333 50%
  );
  background-size: 220%;
  border: 1px solid var(--clr-black);
  border-radius: 0.5rem;
  outline-color: #777;
  line-height: 1.3em;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all 0.3s;

  @media only screen and (max-width: 56.25em), only screen and (hover: none) {
    font-size: 1.49rem;
  }

  @media only screen and (max-width: 43.75em) {
    font-size: 1.47rem;
  }

  &:hover {
    background-position: 100%;
  }
`;

export default CheckoutButton;
