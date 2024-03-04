import styled from 'styled-components';

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  width: 100%;
  padding: 2rem 1rem;
  font-size: 1.8rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textSize};
  border: 1px solid ${({ theme }) => theme.sizeHover};
  border-radius: 0.5rem;
  line-height: 1.3em;
  outline-color: #eee;
  margin-bottom: 3rem;
  cursor: pointer;
  transition: all 0.3s;

  @media only screen and (max-width: 59.375em) {
    padding: 1.75rem 0;
  }

  @media only screen and (max-width: 37.5em), only screen and (hover: none) {
    font-size: 1.7rem;
    padding: 1.6rem 0;
  }

  @media only screen and (max-width: 26.875em) {
    font-size: 1.55rem;
  }

  @media only screen and (max-width: 18.75em) {
    font-size: 1.4rem;
    padding: 1rem 0;
  }

  &:hover {
    background-color: ${({ theme }) => theme.sizeHover};
    border-color: ${({ theme }) => theme.cartSelected};
  }

  svg {
    font-size: 2rem;
    fill: currentColor;
  }
`;
