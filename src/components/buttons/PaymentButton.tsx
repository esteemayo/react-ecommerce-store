import styled, { css } from 'styled-components';

interface PaymentButtonProps {
  onOpen(e: React.MouseEvent<HTMLButtonElement>): void;
}

const PaymentButton = ({ onOpen }: PaymentButtonProps) => {
  return (
    <Button type='button' className='btn-pay' onClick={onOpen}>
      Pay on Delivery
    </Button>
  );
};

const Button = styled.button`
  border: none;
  display: inline-block;
  font-size: 1.5rem;
  width: 100%;
  padding: 1rem 0.5rem;
  background-color: ${({ theme }) => theme.bgCartBtn};
  color: ${({ theme }) => theme.textBtn};
  background-image: ${({ theme }) => css`
  linear-gradient(
    120deg,
    transparent 0%,
    transparent 50%,
    ${theme.bgImgCartBtn} 50%
  );
  `};
  background-size: 220%;
  border: 1px solid ${({ theme }) => theme.btnBorder};
  border-radius: 0.5rem;
  outline-color: ${({ theme }) => theme.btnCartOut};
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

  @media only screen and (max-width: 18.75em) {
    padding: 0.7rem 0.5rem;
  }

  &:hover {
    background-position: 100%;
  }
`;

export default PaymentButton;
