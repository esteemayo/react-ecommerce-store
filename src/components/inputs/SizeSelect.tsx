'use client';

import styled from 'styled-components';
import { useCallback } from 'react';

import { SizeSelectProps } from '@/types';

interface IProps {
  modal?: boolean;
  bcg?: boolean;
}

const SizeSelect = ({
  value,
  title,
  modal,
  selected,
  onAction,
  secondaryAction,
}: SizeSelectProps) => {
  const handleSelect = useCallback(
    (size: string | number) => {
      onAction(size);
      secondaryAction(size);
    },
    [onAction, secondaryAction]
  );

  return (
    <Container modal={modal}>
      <Heading modal={modal}>{title}</Heading>
      <Wrapper modal={modal}>
        {value?.map((item, index) => {
          return (
            <Size
              key={index}
              type='button'
              bcg={selected === item}
              onClick={() => handleSelect(item as string | number)}
              modal={modal}
            >
              {item}
            </Size>
          );
        })}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div<IProps>`
  margin-top: 1rem;
  margin-bottom: ${({ modal }) => (modal ? '1rem' : '4rem')};

  @media only screen and (max-width: 37.5em) {
    margin-bottom: ${({ modal }) => !modal && '2rem'};
  }
`;

const Heading = styled.h3<IProps>`
  display: inline-block;
  font-weight: 400;
  font-size: ${({ modal }) => (modal ? '1.5rem' : '1.65rem')};
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div<IProps>`
  margin-top: ${({ modal }) => (modal ? '0.5rem' : '1.5rem')};
  display: flex;
  align-items: center;
  gap: ${({ modal }) => (modal ? '0.5rem' : '1rem')};

  @media only screen and (max-width: 37.5em) {
    margin-top: ${({ modal }) => !modal && '1.3rem'};
  }
`;

const Size = styled.button<IProps>`
  display: inline-block;
  text-align: center;
  font-size: 1.4rem;
  min-width: 4rem;
  height: 3rem;
  padding: 1.6rem 0.4rem;
  line-height: 0.2;
  background-color: ${({ bcg, theme }) =>
    bcg ? theme.cartSelected : 'transparent'};
  color: ${({ bcg }) => (bcg ? 'var(--clr-white)' : 'inherit')};
  border: 2px solid
    ${({ bcg, theme }) => (bcg ? theme.cartSelected : theme.sizeHover)};
  border-radius: 0.4rem;
  outline-color: #ccc;
  margin-bottom: 0.8rem;
  cursor: ${({ bcg }) => (bcg ? 'default' : 'pointer')};
  transition: all 0.1s ease-in-out;

  @media only screen and (max-width: 37.5em) {
    min-width: ${({ modal }) => !modal && '3.75rem'};
    padding-top: ${({ modal }) => !modal && '1.4rem'};
    padding-bottom: ${({ modal }) => !modal && '1.4rem'};
    font-size: ${({ modal }) => !modal && '1.35rem'};
  }

  &:hover {
    background-color: ${({ bcg, theme }) =>
      bcg ? theme.cartSelected : theme.sizeHover};
  }
`;

export default SizeSelect;
