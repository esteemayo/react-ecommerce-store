import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

import ActiveButton from './ActiveButton';
import SliderItem from './SliderItem';
import SliderButton from './SliderButton';

import { sliderItems } from '../../data';

const CarouselSlider = () => {
  const [slideNumber, setSlideNumber] = useState(0);

  const handlePrev = useCallback(() => {
    setSlideNumber((value) => {
      return value - 1;
    });
  }, []);

  const handleNext = useCallback(() => {
    setSlideNumber((value) => {
      return value + 1;
    });
  }, []);

  useEffect(() => {
    const lastIndex = sliderItems.length - 1;

    if (slideNumber < 0) {
      setSlideNumber(lastIndex);
    }

    if (slideNumber > lastIndex) {
      setSlideNumber(0);
    }
  }, [slideNumber]);

  useEffect(() => {
    const slider = setInterval(() => {
      setSlideNumber((value) => {
        return value + 1;
      });
    }, 5000);

    return () => clearInterval(slider);
  }, [slideNumber]);

  return (
    <Container>
      <Wrapper>
        {sliderItems.map((item, index) => {
          let position = 'nextSlide';

          if (index === slideNumber) {
            position = 'activeSlide';
          }

          if (
            index === slideNumber - 1 ||
            (slideNumber === 0 && index === sliderItems.length - 1)
          ) {
            position = 'lastSlide';
          }

          return (
            <SliderItem
              {...item}
              key={item.id}
              index={index}
              position={position}
            />
          );
        })}
        <SliderButton
          icon={faChevronLeft}
          direction='left'
          onClick={handlePrev}
        />
        <SliderButton
          icon={faChevronRight}
          direction='right'
          onClick={handleNext}
        />
        <ActiveButton
          items={sliderItems}
          slideNumber={slideNumber}
          setSlideNumber={setSlideNumber}
        />
      </Wrapper>
    </Container>
  );
};

const Container = styled.header`
  width: 100%;
  height: 40vw;
  background-color: #f1ede7;

  @media only screen and (max-width: 48em) {
    height: 90vw;
  }

  @media only screen and (min-width: 112.5em) {
    height: 45vw;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  overflow: hidden;
`;

export default CarouselSlider;
