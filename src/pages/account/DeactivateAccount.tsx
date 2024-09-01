import styled from 'styled-components';

interface DeactivateAccountProps {
  onOpen(): void;
}

const DeactivateAccount = ({ onOpen }: DeactivateAccountProps) => {
  return (
    <Container>
      <Header>Delete your account</Header>
      <Warning>
        You will receive an email to confirm your decision. Please note, that
        all your data will be permanently erased.
      </Warning>
      <Button type='button' onClick={onOpen}>
        Delete account
      </Button>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 3rem;
`;

const Header = styled.h2`
  display: inline-block;
  text-transform: capitalize;
  font-weight: 500;
  font-size: 1.385rem;
  color: ${({ theme }) => theme.textDelHeader};

  @media only screen and (max-width: 43.75em) {
    font-size: 1.58rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 1.785rem;
  }
`;

const Warning = styled.p`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.textDelWarning};
  line-height: 1.2;
  word-wrap: break-word;

  @media only screen and (max-width: 43.75em) {
    font-size: 1.5rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 1.7rem;
  }
`;

const Button = styled.button`
  display: inline-block;
  border: none;
  padding: 0.5rem 2rem;
  background-color: transparent;
  color: var(--clr-primary-red);
  border: 1px solid var(--clr-primary-red);
  border-radius: 0.5rem;
  outline-color: #e92222;
  margin-top: 2rem;
  cursor: pointer;
  transition: all 0.3s ease;

  @media only screen and (max-width: 43.75em) {
    font-size: 1.5rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: var(--default-font-size);
    padding: 1rem 2.5rem;
  }

  &:hover {
    background-color: rgba(222, 10, 10, 0.1);
  }
`;

export default DeactivateAccount;
