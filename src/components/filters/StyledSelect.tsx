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
  border: 1px solid ${({ theme }) => theme.textFilterBorder};
  border-radius: 3px;
  outline-color: ${({ theme }) => theme.filterOut};

  @media only screen and (max-width: 37.5em) {
    width: 100%;
    padding: ${({ page }) => page !== 'product' && '0.7rem'};
  }

  @media only screen and (min-width: 112.5em) {
    width: 29.75rem;
    padding: 1rem;
    font-size: 2.3rem;
  }

  option {
    font-size: 1.4rem;

    @media only screen and (min-width: 112.5em) {
      font-size: 1.45rem;
    }
  }
`;
