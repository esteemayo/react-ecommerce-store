import styled, { css } from 'styled-components';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SearchHistory from './SearchHistory';
import { useSearch } from '@/hooks/useSearch';

const Search = () => {
  const { histories, searchQuery, handleChange, handleDelete, handleSearch } =
    useSearch();

  return (
    <Container>
      <Form onSubmit={handleSearch}>
        <FormGroup>
          <Input
            type='search'
            value={searchQuery}
            placeholder='Search store...'
            onChange={handleChange}
          />
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </FormGroup>
        <Button type='submit'>Search</Button>
      </Form>
      {histories.length > 0 &&
        histories.slice(0, 5).map((item) => {
          return (
            <SearchHistory key={item.id} {...item} onDelete={handleDelete} />
          );
        })}
    </Container>
  );
};

const Container = styled.div`
  padding: 3rem 0;
`;

const Form = styled.form`
  width: 100%;
  border-radius: 0.3rem;
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  flex: 3;
  padding: 1rem 0;
  border: 3px solid ${({ theme }) => theme.textScroll};
  border-right: none;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;

  svg {
    position: absolute;
    left: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.textScroll};
    cursor: text;
  }
`;

const Input = styled.input`
  display: inline-block;
  border: none;
  outline: none;
  width: 100%;
  font-family: inherit;
  font-size: 1.5rem;
  padding-left: 4.25rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textInput};
  caret-color: ${({ theme }) => theme.inputCaret};

  &::-webkit-input-placeholder {
    font-size: 1.4rem;
    color: #bbb;
    letter-spacing: 1px;
  }
`;

const Button = styled.button`
  flex: 1;
  border: 3px solid ${({ theme }) => theme.textScroll};
  border-left: none;
  outline: none;
  font-weight: 500;
  font-size: 1.45rem;
  padding: 1.49rem 0;
  background-color: ${({ theme }) => theme.bgBtn};
  color: ${({ theme }) => theme.textBtn};
  background-image: ${({ theme }) => css`
    linear-gradient(
      120deg,
      transparent 0%,
      transparent 50%,
      ${theme.bgImgBtn} 50%
    );
  `};
  background-size: 250%;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-position: 100%;
  }

  &:disabled {
    opacity: 0.85;
  }
`;

export default Search;
