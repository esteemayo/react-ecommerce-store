import styled from 'styled-components';
import { useCallback, useMemo } from 'react';

import { SizeSelectProps } from '../../types';

interface IProps {
  modal?: string;
  bcg: string;
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
    (e: React.MouseEvent<HTMLButtonElement>, size: string) => {
      e.stopPropagation();

      onAction(size);
      secondaryAction(size);
    },
    [onAction, secondaryAction]
  );

  const handleRemove = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      onAction('');
      secondaryAction(null);
    },
    [onAction, secondaryAction]
  );

  const modalValue = useMemo(() => {
    return modal?.toString();
  }, [modal]);

  return (
    <Container modal={modalValue}>
      <Heading>{title}</Heading>
      <Wrapper modal={modalValue}>
        {value?.map((item, index) => {
          return (
            <Size
              key={index}
              type='button'
              bcg={String(selected === item)}
              onClick={(e) => handleSelect(e, item as string)}
              onDoubleClick={handleRemove}
              modal={modalValue}
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
  margin-bottom: ${({ modal }) => (modal === 'true' ? '1rem' : '4rem')};

  @media only screen and (max-width: 37.5em) {
    margin-bottom: ${({ modal }) => modal !== 'true' && '2rem'};
  }
`;

const Heading = styled.h3<IProps>`
  display: inline-block;
  font-weight: 400;
  font-size: ${({ modal }) => (modal === 'true' ? '1.5rem' : '1.65rem')};
  color: ${({ theme }) => theme.text};

  @media only screen and (min-width: 112.5em) {
    font-size: ${({ modal }) => (modal === 'true' ? '1.7rem' : '1.95rem')};
  }
`;

const Wrapper = styled.div<IProps>`
  margin-top: ${({ modal }) => (modal === 'true' ? '0.5rem' : '1.5rem')};
  display: flex;
  align-items: center;
  gap: ${({ modal }) => (modal === 'true' ? '0.5rem' : '1rem')};

  @media only screen and (max-width: 37.5em) {
    margin-top: ${({ modal }) => modal !== 'true' && '1.3rem'};
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
    setProperty(bcg, theme.cartSelected, 'transparent')};
  color: ${({ bcg, theme }) =>
    setProperty(bcg, 'var(--clr-white)', theme.textSize)};
  border: 2px solid
    ${({ bcg, theme }) => setProperty(bcg, theme.cartSelected, theme.sizeHover)};
  border-radius: 0.4rem;
  outline-color: #ccc;
  margin-bottom: 0.8rem;
  cursor: ${({ bcg }) => setProperty(bcg, 'default', 'pointer')};
  transition: all 0.1s ease-in-out;

  @media only screen and (max-width: 37.5em) {
    min-width: ${({ modal }) => modal !== 'true' && '3.75rem'};
    padding-top: ${({ modal }) => modal !== 'true' && '1.4rem'};
    padding-bottom: ${({ modal }) => modal !== 'true' && '1.4rem'};
    font-size: ${({ modal }) => modal !== 'true' && '1.35rem'};
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 1.6rem;
    min-width: 4.25rem;
    height: 3.25rem;
    padding: 1.8rem 0.6rem;
  }

  &:hover {
    background-color: ${({ bcg, theme }) =>
      setProperty(bcg, theme.cartSelected, theme.sizeHover)};
  }
`;

const setProperty = (bcg: string, val1: string, val2: string) => {
  return bcg === 'true' ? val1 : val2;
};

export default SizeSelect;
