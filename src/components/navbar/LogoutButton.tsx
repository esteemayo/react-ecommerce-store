import styled from 'styled-components';

const LogoutButton = () => {
  return <Button>Logout</Button>;
};

const Button = styled.button`
  display: inline-block;
  border: none;
  text-transform: capitalize;
  font-family: inherit;
  font-weight: 600;
  font-size: 1.5rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textNav};
  outline-color: var(--clr-primary-green);
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.75;
  }
`;

export default LogoutButton;
