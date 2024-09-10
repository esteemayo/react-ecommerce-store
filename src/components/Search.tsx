import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from 'styled-components';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import Spinner from './Spinner';
import SearchHistory from './SearchHistory';

import { useSearchModal } from '../hooks/useSearchModal';
import { useSearch } from '../hooks/useSearch';
import { useSearchStore } from '../hooks/useSearchStore';

const Search = () => {
  const isLoading = useSearchStore((state) => state.isLoading);
  const onClose = useSearchModal((state) => state.onClose);
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
        <Button type='submit' disabled={isLoading}>
          {isLoading ? <Spinner size='md' /> : 'Search'}
        </Button>
      </Form>
      {histories.length > 0 &&
        histories.slice(0, 5).map((item) => {
          return (
            <SearchHistory
              key={item.id}
              {...item}
              onClose={onClose}
              onDelete={handleDelete}
            />
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
  border: 3px solid ${({ theme }) => theme.searchBorder};
  border-right: none;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;

  svg {
    position: absolute;
    left: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.searchBorder};
    cursor: text;

    @media only screen and (min-width: 112.5em) {
      font-size: 2rem;
    }
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

  @media only screen and (min-width: 112.5em) {
    font-size: 2.3rem;
  }

  &::-webkit-input-placeholder {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.textRevPlace};
    letter-spacing: 1px;

    @media only screen and (min-width: 112.5em) {
      font-size: 2.2rem;
    }
  }
`;

const Button = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  border: 3px solid ${({ theme }) => theme.searchBorder};
  border: 3px solid transparent;
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

  @media only screen and (min-width: 112.5em) {
    font-size: 2.25rem;
    padding: 1.3rem 0;
  }

  &:hover {
    background-position: 100%;
  }

  &:disabled {
    opacity: 0.85;
  }
`;

export default Search;
