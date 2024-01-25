import styled from 'styled-components';

import { FooterHeadingProps } from '../../types';

interface IHeader {
  small?: string;
}

const Heading = ({ title, small }: FooterHeadingProps) => {
  return <Header small={small?.toString()}>{title}</Header>;
};

const Header = styled.h4<IHeader>`
  font-weight: ${({ small }) => (small === 'true' ? '300' : '500')};
  font-size: ${({ small }) => (small === 'true' ? '1.4rem' : '2rem')};
  line-height: ${({ small }) => small !== 'true' && '1em'};
  margin-bottom: ${({ small }) => small !== 'true' && '2rem'};

  @media only screen and (max-width: 37.5em) {
    font-size: ${({ small }) => small === 'true' && '1.7rem'};
    text-decoration: underline;
    text-underline-offset: 0.5rem;
    margin-bottom: ${({ small }) => small !== 'true' && '1.5rem'};
  }
`;

export default Heading;
