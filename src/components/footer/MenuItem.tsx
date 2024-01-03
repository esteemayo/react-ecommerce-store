'use client';

import styled from 'styled-components';
import Link from 'next/link';

import { FooterMenuItemProps } from '@/types';

const MenuItem = ({ data }: FooterMenuItemProps) => {
  return (
    <ListContainer>
      {data.map((link) => {
        const { id, url, text } = link;
        return (
          <ListItem key={id}>
            <Link href={url} passHref>
              {text}
            </Link>
          </ListItem>
        );
      })}
    </ListContainer>
  );
};

const ListContainer = styled.ul`
  list-style: none;

  @media only screen and (max-width: 37.5em) {
    display: flex;
    flex-wrap: wrap;
    row-gap: 0.5rem;
    column-gap: 1.5rem;
  }
`;

const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  outline-color: var(--clr-primary-green);
  transition: all 0.3s ease;

  &:not(:last-of-type) {
    margin-bottom: 1.5rem;

    @media only screen and (max-width: 26.875em) {
      margin-bottom: 1rem;
    }
  }

  &:hover {
    color: #f5f5f5;
  }

  &::after {
    content: '';
    display: inline-block;
    width: 2rem;
    height: 1px;
    background-color: ${({ theme }) => theme.textNav};

    @media only screen and (max-width: 37.5em) {
      display: none;
    }
  }

  a {
    &:link,
    &:visited {
      display: inline-block;
      text-decoration: none;
      font-size: 1.4rem;
      color: inherit;
      line-height: 1.3em;
      transition: all 0.2s ease;
      backface-visibility: hidden;
      outline-offset: 0.5rem;
      outline-color: var(--clr-primary-green);

      @media only screen and (max-width: 37.5rem) {
        font-size: var(--default-font-size);
      }
    }

    &:active {
      color: currentColor;
    }
  }
`;

export default MenuItem;
