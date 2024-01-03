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

  a {
    &:link,
    &:visited {
      display: inline-block;
      text-decoration: none;
      font-size: inherit;
      color: currentColor;
      outline-color: #ddd;
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
