import styled from 'styled-components';

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:last-of-type) {
    margin-bottom: 2rem;
  }

  label {
    display: inline-block;
    font-weight: 600;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.textLabel};
  }

  input {
    border: none;
    display: inline-block;
    font-family: inherit;
    font-size: 1.5rem;
    width: 100%;
    padding: 1.5rem 1rem;
    background-color: ${({ theme }) => theme.bgInput};
    color: ${({ theme }) => theme.textInput};
    border-radius: 0.5rem;
    outline-color: ${({ theme }) => theme.inputOut};
    caret-color: ${({ theme }) => theme.inputCaret};
    transition: all 0.3s ease;

    &:focus {
      background-color: transparent;
    }

    &::-webkit-input-placeholder {
      font-weight: 300;
      font-size: 1.5rem;
      color: ${({ theme }) => theme.textRevPlace};
    }
  }
`;
