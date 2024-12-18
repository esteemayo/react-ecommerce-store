import styled from 'styled-components';

interface HeadingProps {
  title: string;
}

const Heading = ({ title }: HeadingProps) => {
  return <Header>{title}</Header>;
};

const Header = styled.h4`
  display: inline-block;
  text-transform: capitalize;
  font-weight: 600;
  font-size: var(--default-font-size);
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.5rem;

  @media only screen and (min-width: 112.5em) {
    font-size: 2rem;
  }
`;

export default Heading;
