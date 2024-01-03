import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface AuthInfoProps {
  url: string;
  text: string;
  label: string;
}

const AuthInfo = ({ url, text, label }: AuthInfoProps) => {
  return (
    <Container>
      <Text>
        {text} <Link to={url}>{label}</Link>
      </Text>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 3rem;
`;

const Text = styled.p`
  font-size: 1.7rem;
  color: ${({ theme }) => theme.textLabel};

  a {
    &:link,
    &:visited {
      display: inline-block;
      text-decoration: none;
      text-decoration-color: var(--clr-tertiary-green);
      color: var(--clr-tertiary-green);
      outline-color: #ddd;
      transition: all 0.3s ease;
    }

    &:hover {
      text-decoration: underline;
      text-decoration-color: var(--clr-tertiary-green);
      text-underline-offset: 0.4rem;
    }
  }
`;

export default AuthInfo;
