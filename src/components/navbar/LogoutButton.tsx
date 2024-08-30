import styled from 'styled-components';

interface LogoutButtonProps {
  onClick(e: React.MouseEvent<HTMLButtonElement>): void;
}

const LogoutButton = ({ onClick }: LogoutButtonProps) => {
  return (
    <Button type='button' onClick={onClick}>
      Logout
    </Button>
  );
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
  outline-color: ${({ theme }) => theme.navOut};
  cursor: pointer;
  transition: all 0.3s ease;

  @media only screen and (min-width: 112.5em) {
    font-size: 1.7rem;
  }

  &:hover {
    opacity: 0.75;
  }
`;

export default LogoutButton;
