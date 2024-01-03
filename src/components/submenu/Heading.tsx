'use client';

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
`;

export default Heading;
