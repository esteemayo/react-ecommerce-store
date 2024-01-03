'use client';

import styled from 'styled-components';

import { FormHeadingProps } from '@/types';

interface IProps {
  small: boolean;
  type?: string;
}

const Heading = ({ small, type, title }: FormHeadingProps) => {
  return (
    <StyledHeading small={small} type={type}>
      {title}
    </StyledHeading>
  );
};

const StyledHeading = styled.h1<IProps>`
  display: block;
  font-weight: ${({ type }) => (type !== 'login' ? '500' : '400')};
  font-size: ${({ type }) => (type !== 'login' ? ' 2.5rem' : '2rem')};
  text-transform: ${({ small }) => !small && 'capitalize'};
  text-align: center;
  color: ${({ theme }) => theme.textFormHeader};
`;

export default Heading;
