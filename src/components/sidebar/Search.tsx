import styled from 'styled-components';

import Spinner from '../Spinner';
import { SidebarSearch } from '../../types';

const Search = ({ query, loading, onChange, onSubmit }: SidebarSearch) => {
  return (
    <Form onSubmit={onSubmit}>
      <Input
        type='search'
        value={query}
        placeholder='Search store...'
        onChange={onChange}
      />
      <Button type='submit' disabled={loading}>
        {loading ? <Spinner /> : 'Search'}
      </Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  display: inline-block;
  font-family: inherit;
  font-size: 1.5rem;
  width: 75%;
  padding: 1rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textInput};
  border: 2px solid ${({ theme }) => theme.modalInputBorder};
  border-right: none;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  outline-color: ${({ theme }) => theme.inputOut};
  outline: none;
  caret-color: ${({ theme }) => theme.inputCaret};

  @media only screen and (max-width: 25rem) {
    width: 65%;
  }

  @media only screen and (max-width: 18.75rem) {
    padding-top: 0.7rem;
    padding-bottom: 0.7rem;
  }

  &::-webkit-input-placeholder {
    font-weight: 300;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.textRevPlace};
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  font-weight: 500;
  font-size: 1.45rem;
  padding: 1.4rem 2.5rem;
  background-color: ${({ theme }) => theme.bgSideBtn};
  color: ${({ theme }) => theme.textBtn};
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  outline-color: ${({ theme }) => theme.btnOut};
  cursor: pointer;

  @media only screen and (max-width: 18.75rem) {
    padding-top: 1.1rem;
    padding-bottom: 1.1rem;
  }
`;

export default Search;
