import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

import { CartCounterProps } from '../../types';

const CartCounter = ({ value, onIncrement, onDecrement }: CartCounterProps) => {
  return (
    <Container>
      <Wrapper>
        <Button
          type='button'
          disabled={value >= 10}
          onClick={() => onIncrement('inc')}
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
        <Amount>{value}</Amount>
        <Button type='button' onClick={() => onDecrement('dec')}>
          <FontAwesomeIcon icon={faMinus} />
        </Button>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;

  @media only screen and (max-width: 31.25em) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;

  @media only screen and (max-width: 31.25em) {
    flex-direction: row;
  }
`;

const Button = styled.button`
  border: none;
  display: inline-block;
  width: 2.5rem;
  height: 2.5rem;
  font-weight: lighter;
  font-size: 1.4rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textCartBtn};
  border: 1px solid ${({ theme }) => theme.cartBtnBorder};
  border-radius: 50%;
  outline-color: #ddd;
  cursor: pointer;

  @media only screen and (max-width: 43.75em) {
    width: 2.45rem;
    height: 2.45rem;
    font-size: 1.3rem;
  }

  @media only screen and (min-width: 112.5em) {
    width: 3rem;
    height: 3rem;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.bgCartQty};
    color: ${({ theme }) => theme.cartBtnDis};
    cursor: default;
  }

  svg {
    font-size: inherit;
    fill: currentColor;
  }
`;

const Amount = styled.span`
  display: inline-block;
  font-size: 600;
  font-size: 2rem;
  color: ${({ theme }) => theme.text};

  @media only screen and (max-width: 43.75em) {
    font-size: 1.7rem;
  }

  @media only screen and (max-width: 18.75em) {
    font-size: 1.5rem;
  }
`;

export default CartCounter;
