import Slider from 'react-slick';

import { SlideProps } from '../types';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Slide = ({ slidesToShow, children }: SlideProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} slidesToShow={slidesToShow}>
      {children}
    </Slider>
  );
};

export default Slide;
