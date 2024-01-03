'use client';

import styled from 'styled-components';

import Heading from './Heading';
import MenuItem from './MenuItem';

import { FooterMenuItemsProps } from '@/types';

const MenuItems = ({ data }: FooterMenuItemsProps) => {
  return (
    <Container>
      {data.map((item) => {
        const { links, title } = item;
        return (
          <Wrapper key={title}>
            <Heading title={title} />
            <MenuItem data={links} />
          </Wrapper>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;

  @media only screen and (max-width: 37.5em) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 3rem;
  }
`;

const Wrapper = styled.div``;

export default MenuItems;
