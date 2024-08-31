import styled from 'styled-components';

import { FormHeadingProps } from '../../types';

interface IProps {
  small: string;
  type?: string;
}

const Heading = ({ small, type, title }: FormHeadingProps) => {
  return (
    <StyledHeading small={small?.toString()} type={type}>
      {title}
    </StyledHeading>
  );
};

const StyledHeading = styled.h1<IProps>`
  display: block;
  font-weight: ${({ type }) => (type !== 'login' ? '500' : '400')};
  font-size: ${({ type }) => (type !== 'login' ? ' 2.5rem' : '2rem')};
  text-transform: ${({ small }) =>
    small === 'false' ? 'capitalize' : undefined};
  text-align: center;
  color: ${({ theme }) => theme.textFormHeader};

  @media only screen and (min-width: 112.5em) {
    font-size: ${({ type }) => (type !== 'login' ? ' 3rem' : '2.5rem')};
  }
`;

export default Heading;
