import styled from 'styled-components';

import FormError from './FormError';
import { FormGroup } from './FormGroup';

import { TextAreaProps } from '../../types';

const TextArea = ({ name, label, error, ...rest }: TextAreaProps) => {
  return (
    <FormGroup>
      <Label htmlFor={name}>{label}</Label>
      <StyledTextArea {...rest} id={name} name={name} />
      {error && <FormError message={error} />}
    </FormGroup>
  );
};

const Label = styled.label`
  display: inline-block;
  font-weight: 600;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.textLabel};

  @media only screen and (min-width: 112.5em) {
    font-size: 2rem;
  }
`;

const StyledTextArea = styled.textarea`
  border: none;
  display: inline-block;
  font-family: inherit;
  font-size: 1.5rem;
  width: 100%;
  height: 10rem;
  padding: 1.5rem 1rem;
  background-color: ${({ theme }) => theme.bgInput};
  color: ${({ theme }) => theme.textInput};
  border-radius: 0.5rem;
  outline-color: ${({ theme }) => theme.inputOut};
  overflow: hidden;
  resize: none;
  caret-color: ${({ theme }) => theme.inputCaret};
  transition: all 0.3s ease;

  @media only screen and (min-width: 112.5em) {
    font-size: 2.3rem;
    padding: 2rem 1.5rem;
  }

  &:focus {
    background-color: transparent;
  }

  &::-webkit-input-placeholder {
    font-weight: 300;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.textRevPlace};

    @media only screen and (min-width: 112.5em) {
      font-size: 2rem;
    }
  }
`;

export default TextArea;
