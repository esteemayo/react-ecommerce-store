import styled from 'styled-components';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { ReviewFilterProps } from '../../types';

interface IWrapper {
  sort: string | null;
}

interface IList {
  type: string;
}

const ReviewFilter = ({
  sort,
  value,
  isOpen,
  onClick,
  onSort,
}: ReviewFilterProps) => {
  return (
    <Container>
      <Wrapper sort={sort} onClick={onClick}>
        <Filter>Sort:</Filter>
        <FilterText>{value ?? 'Select'}</FilterText>
        <FilterIcon>
          <ArrowDropDownIcon />
        </FilterIcon>
      </Wrapper>
      <FilterListContainer type={isOpen ? 'show' : ''}>
        <FilterList onClick={() => onSort('latest')}>Latest</FilterList>
        <FilterList onClick={() => onSort('highest')}>
          Highest rating
        </FilterList>
        <FilterList onClick={() => onSort('lowest')}>Lowest rating</FilterList>
      </FilterListContainer>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;

const Wrapper = styled.div<IWrapper>`
  width: ${({ sort }) => setWidth(sort)};
  color: ${({ theme }) => theme.text};
  padding: 2rem 0;
  padding-right: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 20.75em) {
    width: 100%;
    padding-right: 0;
    justify-content: flex-end;
  }

  @media only screen and (min-width: 112.5em) {
    width: 25rem;
  }
`;

const Filter = styled.span`
  display: inline-block;
  font-size: 1.45rem;
  margin-right: 3px;

  @media only screen and (max-width: 26.875em) {
    font-size: 1.55rem;
  }

  @media only screen and (max-width: 18.75em) {
    font-size: 1.4rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 2rem;
  }
`;

const FilterText = styled.span`
  display: inline-block;
  text-transform: capitalize;
  font-size: 1.45rem;
  cursor: pointer;

  @media only screen and (max-width: 26.875em) {
    font-size: 1.55rem;
  }

  @media only screen and (max-width: 18.75em) {
    font-size: 1.35rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 2rem;
  }
`;

const FilterIcon = styled.span`
  padding-left: 0.5rem;
  display: flex;
  align-items: flex-end;
  cursor: pointer;

  svg {
    font-size: 2rem;
    fill: ${({ theme }) => theme.star};

    @media only screen and (min-width: 112.5em) {
      font-size: 3rem;
    }
  }
`;

const FilterListContainer = styled.ul<IList>`
  position: absolute;
  right: ${({ type }) => (type === 'show' ? 0 : '-30rem')};
  top: 6rem;
  list-style: none;
  width: 20rem;
  padding: 0.4rem;
  text-align: left;
  background-color: ${({ theme }) => theme.bgProdCard};
  border: 1px solid ${({ theme }) => theme.filterBorder};
  border-radius: 3px;
  visibility: ${({ type }) => (type === 'show' ? 'visible' : 'hidden')};
  opacity: ${({ type }) => (type === 'show' ? 1 : 0)};
  transform: scale(${({ type }) => (type === 'show' ? 1 : 0)});
  z-index: ${({ type }) => (type === 'show' ? 1000 : -1)};
  transition: all 0.3s linear;

  @media only screen and (min-width: 112.5em) {
    width: 23rem;
    padding: 0.6rem;
  }
`;

const FilterList = styled.li`
  display: block;
  text-transform: capitalize;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.text};
  width: 100%;
  padding: 0.7rem 0.9rem 0.9rem 1.2rem;
  object-fit: contain;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.3s ease;

  @media only screen and (min-width: 112.5em) {
    font-size: 1.8rem;
    padding: 1rem 1.2rem 1.2rem 1.6rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.filterHov};
  }
`;

const setWidth = (sort: string | null) => {
  if (sort === 'highest' || sort === 'lowest') return '20rem';
  return '13rem';
};

export default ReviewFilter;
