import styled from 'styled-components';

const LogoutButton = () => {
  return <Button>Logout</Button>;
};

const Button = styled.button`
  display: inline-block;
  border: none;
  font-family: inherit;
  font-weight: 600;
  font-size: 1.5rem;
`;

export default LogoutButton;
