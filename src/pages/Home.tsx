import styled from 'styled-components';

import CarouselSlider from '../components/sliders/CarouselSlider';
import Categories from '../components/categories/Categories';
import FeaturedProducts from '../components/products/FeaturedProducts';
import TopReviews from '../components/reviews/TopReviews';

import { useSubmenu } from '../hooks/useSubmenu';

const Home = () => {
  const closeSubmenu = useSubmenu((state) => state.closeSubmenu);

  return (
    <Container onMouseOver={closeSubmenu}>
      <CarouselSlider />
      {/* <Categories /> */}
      {/* <FeaturedProducts /> */}
      <TopReviews />
    </Container>
  );
};

const Container = styled.main``;

export default Home;
