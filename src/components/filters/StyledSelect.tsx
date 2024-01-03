import styled from 'styled-components';

interface ISelect {
  page?: string;
}

export const StyledSelect = styled.select<ISelect>`
  display: inline-block;
  text-transform: capitalize;
  width: 20rem;
  padding: 3px;
  font-family: inherit;
  font-size: 1.4rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textFilterSelect};
  border: 1px solid #ddd;
  border-radius: 3px;
  outline-color: ${({ theme }) => theme.filterOut};

  @media only screen and (max-width: 37.5em) {
    width: ${({ page }) => (page === 'product' ? '26rem' : '60rem')};
    padding: ${({ page }) => page !== 'product' && '0.7rem'};
  }

  @media only screen and (max-width: 35em) {
    width: ${({ page }) => page !== 'product' && '54rem'};
  }

  @media only screen and (max-width: 31.25em) {
    width: 40rem;
  }

  @media only screen and (max-width: 25em) {
    width: 39rem;
  }

  @media only screen and (max-width: 21.875em) {
    width: 37rem;
  }

  @media only screen and (max-width: 18.75em) {
    width: 31rem;
  }
`;
