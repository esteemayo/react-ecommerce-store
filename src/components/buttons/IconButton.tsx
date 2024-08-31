import styled from 'styled-components';

export const IconButton = styled.button`
  border: none;
  display: inline-block;
  font-weight: 500;
  font-size: 1.4rem;
  background-color: transparent;
  color: ${({ theme }) => theme.btnIcon};
  outline-color: ${({ theme }) => theme.btnIconHov};
  outline-offset: 3px;
  cursor: pointer;
  transition: all 0.3s ease;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media only screen and (max-width: 64em) {
    align-items: self-end;
  }

  @media only screen and (max-width: 35em) {
    font-size: 1.37rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 1.8rem;
  }

  &:hover {
    opacity: 0.75;
  }

  svg {
    font-size: 1.7rem;

    @media only screen and (max-width: 35em) {
      font-size: var(--default-font-size);
    }

    @media only screen and (min-width: 112.5em) {
      font-size: 2.2rem;
    }
  }
`;
