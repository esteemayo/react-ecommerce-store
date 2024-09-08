import styled from 'styled-components';

import { HeadingProps } from '../types';

interface IProps {
  center?: string;
}

const Heading = ({ title, subtitle, center }: HeadingProps) => {
  return (
    <Container center={center?.toString()}>
      <HeadingPrimary>{title}</HeadingPrimary>
      <HeadingSecondary>{subtitle}</HeadingSecondary>
    </Container>
  );
};

const Container = styled.div<IProps>`
  display: ${({ center }) => center === 'true' && 'flex'};
  flex-direction: ${({ center }) => center === 'true' && 'column'};
  align-items: ${({ center }) => center === 'true' && 'center'};
  justify-content: ${({ center }) => center === 'true' && 'center'};

  text-align: ${({ center }) => setProperty(center, 'center', 'left')};
  margin-bottom: 2rem;
`;

const HeadingPrimary = styled.h1`
  font-weight: 400;
  font-size: 2.4rem;
  color: ${({ theme }) => theme.textSoft};
  line-height: 1.2;

  @media only screen and (min-width: 112.5em) {
    font-size: 3rem;
  }
`;

const HeadingSecondary = styled.h2`
  font-weight: 300;
  font-size: 1.7rem;
  color: ${({ theme }) => theme.textSmall};
  line-height: 1;
  margin-top: 0.8rem;

  @media only screen and (min-width: 112.5em) {
    font-size: 2.3rem;
  }
`;

const setProperty = (center?: string, val1: string, val2: string) => {
  return center === 'true' ? val1 : val2;
};

export default Heading;
