import styled from 'styled-components';

interface FormErrorProps {
  message?: string;
}

const FormError = ({ message }: FormErrorProps) => {
  return <ErrorMessage>{message}</ErrorMessage>;
};

const ErrorMessage = styled.span`
  font-size: 1.3rem;
  color: var(--clr-secondary-red);
  margin-top: 1px;

  @media only screen and (min-width: 112.5em) {
    font-size: var(--default-font-size);
  }
`;

export default FormError;
