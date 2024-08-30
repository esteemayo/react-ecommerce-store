import styled from 'styled-components';
import { useCallback, useMemo } from 'react';

import { ColorSelectProps } from '../../types';

interface IProps {
  modal?: string;
  mode?: string;
  color: string;
  selected: string;
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
    (e: React.MouseEvent<HTMLButtonElement>, color: string) => {
      e.stopPropagation();

      onAction(color);
      secondaryAction(color);
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
      <Heading modal={modalValue}>{title}</Heading>
      <Wrapper modal={modalValue}>
        {value?.map((item, index) => {
          return (
            <Color
              key={index}
              type='button'
              color={item}
              mode={mode}
              selected={String(item === selected)}
              onClick={(e) => handleSelect(e, item as string)}
              onDoubleClick={handleRemove}
              modal={modalValue}
            />
          );
        })}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div<IProps>`
  margin: ${({ modal }) => (modal === 'true' ? '0.5rem 0' : '2rem 0')};
`;

const Heading = styled.h2<IProps>`
  display: inline-block;
  text-transform: capitalize;
  font-weight: 400;
  font-size: ${({ modal }) => (modal === 'true' ? '1.5rem' : '1.7rem')};
  color: ${({ theme }) => theme.text};

  @media only screen and (min-width: 112.5em) {
    font-size: ${({ modal }) => (modal === 'true' ? '2rem' : '2.3rem')};
  }
`;

const Wrapper = styled.div<IProps>`
  display: flex;
  align-items: center;
  gap: ${({ modal }) => (modal === 'true' ? '1rem' : '2.6rem')};
  margin: ${({ modal }) => (modal === 'true' ? '1rem 0' : '1.5rem 0')};

  @media only screen and (max-width: 59.375em) {
    gap: ${({ modal }) => modal !== 'true' && '2.35rem'};
  }

  @media only screen and (max-width: 37.5em) {
    margin-top: ${({ modal }) => modal !== 'true' && '1.3rem'};
  }

  @media only screen and (max-width: 18.75em) {
    gap: ${({ modal }) => modal !== 'true' && '2rem'};
  }
`;

const Color = styled.button<IProps>`
  border: none;
  display: block;
  width: 2.2rem;
  height: 2.2rem;
  background-color: ${({ color, mode }) => setBcg(color, mode)};
  border-radius: 50%;
  outline: 1px solid
    ${({ theme, selected }) =>
      setProperty(selected, theme.cartSelected, 'transparent')};
  outline-offset: 2px;
  cursor: ${({ selected }) => setProperty(selected, 'default', 'pointer')};

  @media only screen and (max-width: 37.5em) {
    width: ${({ modal }) => modal !== 'true' && '2rem'};
    height: ${({ modal }) => modal !== 'true' && '2rem'};
  }

  @media only screen and (min-width: 112.5em) {
    width: 3rem;
    height: 3rem;
  }
`;

const setBcg = (color: string, mode?: string) => {
  if (mode !== 'true' && color === 'white') return '#f9f9f9';
  return color;
};

const setProperty = (selected: string, val1: string, val2: string) => {
  return selected === 'true' ? val1 : val2;
};

export default ColorSelect;
