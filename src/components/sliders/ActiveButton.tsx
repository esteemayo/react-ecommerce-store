import styled from 'styled-components';

import { ActiveButtonProps } from '../../types';

interface IBtn {
  active: string;
}

const ActiveButton = ({
  items,
  slideNumber,
  setSlideNumber,
}: ActiveButtonProps) => {
  return (
    <Container>
      {items.map((_, index) => {
        return (
          <Button
            key={index}
            type='button'
            active={String(index === slideNumber)}
            onClick={() => setSlideNumber(index)}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 90%;
  left: 50%;
  transform: translate(-90%, -50%);
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media only screen and (max-width: 37.5em) {
    top: 80%;
  }
`;

const Button = styled.button<IBtn>`
  border: none;
  width: ${({ active }) => (active === 'true' ? '2rem' : '1.5rem')};
  height: ${({ active }) => (active === 'true' ? '2rem' : '1.5rem')};
  background-color: ${({ active, theme }) =>
    active === 'true' ? theme.bgActiveBtn : theme.bgCarActiveBtn};
  border-radius: 50%;
  outline-color: #f5f5f5;
  cursor: pointer;

  @media only screen and (max-width: 25em) {
    width: ${({ active }) => (active === 'true' ? '1.8rem' : '1.3rem')};
    height: ${({ active }) => (active === 'true' ? '1.8rem' : '1.3rem')};
  }
`;

export default ActiveButton;
