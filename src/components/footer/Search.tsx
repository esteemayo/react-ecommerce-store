'use client';

import styled from 'styled-components';

import { useSearch } from '@/hooks/useSearch';

const Search = () => {
  const { searchQuery, handleChange, handleSearch } = useSearch();

  return (
    <Container>
      <Form onSubmit={handleSearch}>
        <Input
          type='search'
          value={searchQuery}
          placeholder='Search store...'
          onChange={handleChange}
        />
      </Form>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 1rem 0;
  background-color: ${({ theme }) => theme.bgSearch};
  border-radius: 0.5rem;
  margin-bottom: 3rem;

  @media only screen and (max-width: 64em) {
    width: 30%;
  }

  @media only screen and (max-width: 37.5em) {
    display: none;
  }
`;

const Form = styled.form``;

const Input = styled.input`
  display: inline-block;
  border: none;
  outline: none;
  font-family: inherit;
  font-size: 1.5rem;
  width: 100%;
  padding: 0 1rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textInput};
  caret-color: var(--caret-light);

  &::placeholder {
    font-size: 1.4rem;
    color: #aaa;
  }
`;

export default Search;
