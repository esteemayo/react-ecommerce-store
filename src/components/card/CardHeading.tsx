import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { CardHeadingProps } from '../../types';

const CardHeading = ({ url, name }: CardHeadingProps) => {
  return (
    <Heading>
      <StyledLink to={url}>{name}</StyledLink>
    </Heading>
  );
};

const Heading = styled.h3`
  text-transform: capitalize;
  font-weight: 500;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.textProdCard};
  margin-bottom: 0.5rem;
  line-height: 1;

  @media only screen and (max-width: 64em) {
    font-size: 1.7rem;
  }

  @media only screen and (max-width: 37.5em) {
    font-size: 1.58rem;
  }

  @media only screen and (max-width: 31.25em) {
    font-size: 1.63rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 2rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  text-decoration-color: #e2e9e7;
  color: inherit;
  outline-color: #eee;
  outline-offset: 3px;
  transition: all 0.3s ease;

  &:hover,
  &:active {
    text-decoration: underline;
    text-decoration-color: #e2e9e7;
    text-underline-offset: 3px;
  }
`;

export default CardHeading;
