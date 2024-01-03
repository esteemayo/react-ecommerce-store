'use client';

import styled from 'styled-components';
import { useCallback } from 'react';

import { ColorSelectProps } from '@/types';

interface IProps {
  modal?: boolean;
  mode?: boolean;
  selected?: boolean;
}

const ColorSelect = ({
  title,
  mode,
  value,
  modal,
  selected,
  onAction,
  secondaryAction,
}: ColorSelectProps) => {
  const handleSelect = useCallback(
    (color: string) => {
      onAction(color);
      secondaryAction(color);
    },
    [onAction, secondaryAction]
  );

  return (
    <Container modal={modal}>
      <Heading modal={modal}>{title}</Heading>
      <Wrapper modal={modal}>
        {value?.map((item, index) => {
          return (
            <Color
              key={index}
              type='button'
              color={item}
              mode={mode}
              selected={item === selected}
              onClick={() => handleSelect(item as string)}
              modal={modal}
            />
          );
        })}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div<IProps>`
  margin: ${({ modal }) => (modal ? '0.5rem 0' : '2rem 0')};
`;

const Heading = styled.h2<IProps>`
  display: inline-block;
  text-transform: capitalize;
  font-weight: 400;
  font-size: ${({ modal }) => (modal ? '1.5rem' : '1.7rem')};
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div<IProps>`
  display: flex;
  align-items: center;
  gap: ${({ modal }) => (modal ? '1rem' : '2.6rem')};
  margin: ${({ modal }) => (modal ? '1rem 0' : '1.5rem 0')};

  @media only screen and (max-width: 59.375em) {
    gap: ${({ modal }) => !modal && '2.35rem'};
  }

  @media only screen and (max-width: 37.5em) {
    margin-top: ${({ modal }) => !modal && '1.3rem'};
  }

  @media only screen and (max-width: 18.75em) {
    gap: ${({ modal }) => !modal && '2rem'};
  }
`;

const Color = styled.button<IProps>`
  border: none;
  display: block;
  width: 2.2rem;
  height: 2.2rem;
  background-color: ${({ color, mode, modal }) =>
    mode && !modal && color === 'black' ? '#111' : color};
  background-color: ${({ color, mode }) =>
    !mode && color === 'white' && '#f9f9f9'};
  border-radius: 50%;
  outline: 1px solid
    ${({ theme, selected }) => (selected ? theme.cartSelected : 'transparent')};
  outline-offset: 2px;
  cursor: ${({ selected }) => (selected ? 'default' : 'pointer')};

  @media only screen and (max-width: 37.5em) {
    width: ${({ modal }) => !modal && '2rem'};
    height: ${({ modal }) => !modal && '2rem'};
  }
`;

export default ColorSelect;
