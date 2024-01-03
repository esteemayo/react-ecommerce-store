'use client';

import styled from 'styled-components';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { CounterProps } from '@/types';

interface IProps {
  modal?: boolean;
}

const Counter = ({ value, title, modal, onClick }: CounterProps) => {
  const handleQuantity = useCallback(
    (type: string) => {
      type === 'dec' && value > 1 && onClick(value - 1);
      type === 'inc' && value < 10 ? onClick(value + 1) : value;
    },
    [value, onClick]
  );

  return (
    <Container modal={modal}>
      <Heading modal={modal}>{title}</Heading>
      <Wrapper modal={modal}>
        <Button
          type='button'
          modal={modal}
          disabled={value <= 1}
          onClick={() => handleQuantity('dec')}
        >
          <FontAwesomeIcon icon={faMinus} />
        </Button>
        <Amount modal={modal}>{value}</Amount>
        <Button
          type='button'
          modal={modal}
          disabled={value >= 10}
          onClick={() => handleQuantity('inc')}
        >
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div<IProps>`
  margin: ${({ modal }) => (modal ? '0.5rem 0' : '2rem 0')};
`;

const Heading = styled.h3<IProps>`
  display: inline-block;
  text-transform: capitalize;
  font-weight: 400;
  font-size: ${({ modal }) => (modal ? '1.5rem' : '1.65rem')};
  color: ${({ theme }) => theme.text};
  margin-bottom: ${({ modal }) => (modal ? '0.5rem' : '1rem')};
`;

const Wrapper = styled.div<IProps>`
  display: flex;
  align-items: center;
  gap: ${({ modal }) => (modal ? '1rem' : '2rem')};

  @media only screen and (max-width: 37.5em) {
    gap: ${({ modal }) => !modal && '1.5rem'};
  }
`;

const Button = styled.button<IProps>`
  border: none;
  display: inline-block;
  text-align: center;
  font-size: ${({ modal }) => (modal ? '1.3rem' : '1.4rem')};
  min-width: ${({ modal }) => (modal ? '2.5rem' : '3rem')};
  height: ${({ modal }) => (modal ? '2.5rem' : '3rem')};
  padding: 0 0.4rem;
  line-height: 0.2;
  background-color: transparent;
  color: inherit;
  border: 2px solid
    ${({ theme, modal }) => (modal ? theme.sizeHovModal : theme.sizeHover)};
  border-radius: 0.4rem;
  outline-color: #ccc;
  cursor: pointer;
  transition: all 0.3s ease;

  @media only screen and (max-width: 37.5em) {
    min-width: 2.85rem;
    height: 2.85rem;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.bgAddBtnDis};
    color: #999;
    cursor: default;
  }

  svg {
    font-size: ${({ modal }) => (modal ? '1.4rem' : '1.6rem')};
    fill: currentColor;

    @media only screen and (max-width: 37.5em) {
      font-size: ${({ modal }) => !modal && '1.4rem'};
    }
  }
`;

const Amount = styled.span<IProps>`
  width: ${({ modal }) => (modal ? '2.5rem' : '3rem')};
  height: ${({ modal }) => (modal ? '2.5rem' : '3rem')};
  font-size: ${({ modal }) => (modal ? '1.3rem' : '1.4rem')};
  border: 1px solid ${({ theme }) => theme.cartSelected};
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 37.5em) {
    width: ${({ modal }) => !modal && '2.85rem'};
    height: ${({ modal }) => !modal && '2.85rem'};
    font-size: ${({ modal }) => !modal && '1.3rem'};
  }
`;

export default Counter;
