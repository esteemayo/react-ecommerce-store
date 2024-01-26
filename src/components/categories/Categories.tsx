import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';

import Category from './Category';
import Header from '../Header';
import Spinner from '../Spinner';

import { getCategoryCount } from '../../services/productService';

const Categories = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await getCategoryCount();
      return data;
    },
  });

  const images = [
    '/img/category-1.jpg',
    '/img/category-2.jpg',
    '/img/category-3.jpg',
    '/img/category-4.jpg',
    '/img/category-5.jpg',
  ];

  return (
    <Container>
      <Wrapper>
        <Header title='Shop by category' />
        {isLoading ? (
          <SpinnerWrapper>
            <Spinner size='md' />
          </SpinnerWrapper>
        ) : (
          <Box>
            {data &&
              images.map((item, index) => {
                return (
                  <Category key={index} data={data} src={item} index={index} />
                );
              })}
          </Box>
        )}
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  width: 100vw;
  background-color: ${({ theme }) => theme.bg};
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  padding: 10rem 0;

  @media only screen and (max-width: 64em) {
    max-width: 100rem;
    padding: 8rem 0;
  }

  @media only screen and (max-width: 59.375em) {
    max-width: 80rem;
  }

  @media only screen and (max-width: 50em) {
    max-width: 70rem;
  }

  @media only screen and (max-width: 37.5em) {
    padding-left: 5rem;
    padding-right: 5rem;
  }

  @media only screen and (max-width: 25em) {
    padding-left: 3rem;
    padding-right: 3rem;
  }

  @media only screen and (max-width: 23.75em) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 3rem;

  @media only screen and (max-width: 64em) {
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  @media only screen and (max-width: 59.375em) {
    gap: 4rem;
  }

  @media only screen and (max-width: 37.5em) {
    gap: 2rem;
  }

  @media only screen and (max-width: 31.25em) {
    gap: 1.5rem;
  }

  @media only screen and (max-width: 26.25em) {
    gap: 3rem;
  }

  @media only screen and (max-width: 18.75em) {
    gap: 1rem;
  }
`;

export default Categories;
