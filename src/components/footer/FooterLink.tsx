'use client';

import styled from 'styled-components';
import Link from 'next/link';

import { FooterLinkProps } from '@/types';

const FooterLink = ({ data }: FooterLinkProps) => {
  return (
    <LinkContainer>
      {data.map((item) => {
        const { id, url, text } = item;
        return (
          <LinkItem key={id}>
            <Link href={url} passHref>
              {text}
            </Link>
          </LinkItem>
        );
      })}
    </LinkContainer>
  );
};

const LinkContainer = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 3rem;

  @media only screen and (max-width: 26.875em) {
    margin-top: 2rem;
  }

  @media only screen and (max-width: 37.5em) {
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 1rem;
  }
`;

const LinkItem = styled.li`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.textNav};
  outline-color: var(--clr-primary-green);

  @media only screen and (max-width: 37.5rem) {
    font-size: 1.57rem;
  }

  a {
    &:link,
    &:visited {
      display: inline-block;
      text-decoration: none;
      font-size: inherit;
      color: inherit;
      line-height: 1.3em;
      outline-offset: 0.5rem;
      outline-color: var(--clr-primary-green);
    }

    &:active {
      color: currentColor;
    }
  }
`;

export default FooterLink;
