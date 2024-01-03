import styled from 'styled-components';
import Link from 'next/link';

import { CardHeadingProps } from '@/types';

const CardHeading = ({ url, name }: CardHeadingProps) => {
  return (
    <Heading>
      <Link href={url} passHref>
        {name}
      </Link>
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

  @media only screen and (max-width: 35em) {
    font-size: 1.63rem;
  }

  a {
    &:link,
    &:visited {
      display: inline-block;
      text-decoration: none;
      text-decoration-color: #e2e9e7;
      color: inherit;
      outline-color: #eee;
      outline-offset: 3px;
      transition: all 0.3s ease;
    }

    &:hover,
    &:active {
      text-decoration: underline;
      text-decoration-color: #e2e9e7;
      text-underline-offset: 3px;
    }
  }
`;

export default CardHeading;
