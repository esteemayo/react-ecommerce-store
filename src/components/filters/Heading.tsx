import styled from 'styled-components';

interface HeadingProps {
  title: string;
}

const Heading = ({ title }: HeadingProps) => {
  return <StyledHeading>{title}</StyledHeading>;
};

const StyledHeading = styled.h1`
  display: inline-block;
  font-weight: 600;
  font-size: 2.25rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;

  @media only screen and (min-width: 112.5em) {
    font-size: 2.7rem;
  }
`;

export default Heading;
