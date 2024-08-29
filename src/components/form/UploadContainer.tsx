import styled from 'styled-components';

export const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  label {
    display: inline-block;
    font-weight: 600;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.textLabel};

    @media only screen and (min-width: 112.5em) {
      font-size: 1.8rem;
    }
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

    @media only screen and (min-width: 112.5em) {
      font-size: 2rem;
      padding: 2rem 1.5rem;
    }

    &:focus {
      background-color: transparent;
    }

    &::placeholder {
      font-weight: 300;
      font-size: 1.5rem;
      color: ${({ theme }) => theme.textRevPlace};
    }
  }
`;
