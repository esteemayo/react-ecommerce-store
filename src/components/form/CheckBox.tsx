'use client';

import styled from 'styled-components';
import { useMemo } from 'react';

import { CheckBoxProps } from '@/types';
import { useDarkMode } from '@/hooks/useDarkMode';

const CheckBox = ({ name, label, ...rest }: CheckBoxProps) => {
  const mode = useDarkMode((state) => state.mode);

  const checkmarkClasses = useMemo(() => {
    if (mode) {
      return `checkmark dark`;
    }

    return `checkmark light`;
  }, [mode]);

  return (
    <Container className='checkContainer'>
      <StyledCheckBox {...rest} id={name} name={name} className='checkbox' />
      <CheckMark className={checkmarkClasses} />
      <Label htmlFor={name}>{label}</Label>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const StyledCheckBox = styled.input.attrs({ type: 'checkbox' })``;

const Label = styled.label`
  width: 10rem;
  display: inline-block;
  text-transform: capitalize;
  font-weight: 600;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.textLabel};
  margin-left: 3.5rem;
`;

const CheckMark = styled.span``;

export default CheckBox;
