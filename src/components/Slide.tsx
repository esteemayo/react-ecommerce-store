import Slider from 'infinite-react-carousel';

import { SlideProps } from '../types';

const Slide = ({ slidesToShow, arrowsScroll, children }: SlideProps) => {
  return (
    <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll}>
      {children}
    </Slider>
  );
};

export default Slide;
