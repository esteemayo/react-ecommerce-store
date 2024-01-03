'use client';

import styled from 'styled-components';

import { FormProps } from '@/types';

interface IForm {
  type?: string;
}

const Form = ({ type, children, onSubmit }: FormProps) => {
  return (
    <StyledForm type={type} onSubmit={onSubmit}>
      {children}
    </StyledForm>
  );
};

const StyledForm = styled.form<IForm>`
  margin: 2rem 0;

  @media only screen and (max-width: 64em) {
    margin: ${({ type }) => type === 'login' && '1.8rem 0'};
  }
`;

export default Form;
