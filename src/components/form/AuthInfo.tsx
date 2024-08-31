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

  @media only screen and (min-width: 112.5em) {
    font-size: 2.3rem;
  }

  a {
    &:link,
    &:visited {
      display: inline-block;
      text-decoration: none;
      text-decoration-color: ${({ theme }) => theme.textInfo};
      font-size: inherit;
      color: ${({ theme }) => theme.textInfo};
      outline-color: ${({ theme }) => theme.forgotOut};
      transition: all 0.3s ease;
    }

    &:hover {
      text-decoration: underline;
      text-decoration-color: ${({ theme }) => theme.textInfo};
      text-underline-offset: 0.4rem;
    }
  }
`;

export default AuthInfo;
