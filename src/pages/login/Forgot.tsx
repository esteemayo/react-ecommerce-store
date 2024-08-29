import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface ForgotProps {
  url: string;
  label: string;
}

const Forgot = ({ url, label }: ForgotProps) => {
  return (
    <Container>
      <Link to={url}>{label}</Link>
    </Container>
  );
};

const Container = styled.p`
  font-size: 1.65rem;
  color: ${({ theme }) => theme.textLabel};

  @media only screen and (min-width: 112.5em) {
    font-size: 1.8rem;
  }

  a {
    &:link,
    &:visited {
      display: inline-block;
      text-decoration: none;
      font-size: inherit;
      color: currentColor;
      outline-color: ${({ theme }) => theme.forgotOut};
      margin-top: 1rem;
      transition: all 0.3s ease;
    }

    &:hover {
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  }
`;

export default Forgot;
