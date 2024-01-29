import styled from 'styled-components';

const Heading = () => {
  return (
    <Container>
      <StyledHeading>Account settings</StyledHeading>
      <Text>Edit your name, avatar etc.</Text>
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 1.2rem;
`;

const StyledHeading = styled.h1`
  display: inline-block;
  text-transform: capitalize;
  font-weight: 600;
  font-size: 2.3rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.2;
  letter-spacing: 0.5px;

  @media only screen and (max-width: 25em) {
    font-size: 2rem;
    letter-spacing: 1px;
  }
`;

const Text = styled.p`
  font-size: 1.35rem;
  color: ${({ theme }) => theme.textWlHeader};
  line-height: 1.3;
  letter-spacing: 0.3px;

  @media only screen and (max-width: 25em) {
    font-size: 1.25rem;
    letter-spacing: 0.5px;
  }
`;

export default Heading;
