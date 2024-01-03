'use client';

import styled from 'styled-components';

import { FooterHeadingProps } from '@/types';

interface IHeader {
  small?: boolean;
}

const Heading = ({ title, small }: FooterHeadingProps) => {
  return <Header small={small}>{title}</Header>;
};

const Header = styled.h4<IHeader>`
  font-weight: ${({ small }) => (small ? '300' : '500')};
  font-size: ${({ small }) => (small ? '1.4rem' : '2rem')};
  line-height: ${({ small }) => !small && '1em'};
  margin-bottom: ${({ small }) => !small && '2rem'};

  @media only screen and (max-width: 37.5em) {
    font-size: ${({ small }) => small && '1.7rem'};
    text-decoration: underline;
    text-underline-offset: 0.5rem;
    margin-bottom: ${({ small }) => !small && '1.5rem'};
  }
`;

export default Heading;
