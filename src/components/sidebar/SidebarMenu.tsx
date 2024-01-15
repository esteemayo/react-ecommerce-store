import styled from 'styled-components';

import Heading from './Heading';
import SidebarMenuItem from './SidebarMenuItem';

import { SidebarMenuProps } from '../../types';
import LogoutButton from '../navbar/LogoutButton';

const SidebarMenu = ({ items, onAction }: SidebarMenuProps) => {
  return (
    <Container>
      {items.map((item, index) => {
        const { page, links } = item;
        return (
          <Wrapper key={index}>
            <Heading title={page} />
            <ListContainer>
              {links?.map((link, index) => {
                return <SidebarMenuItem key={index} {...link} />;
              })}
            </ListContainer>
          </Wrapper>
        );
      })}
      <LogoutButton onClick={onAction} />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 3rem;
`;

const Wrapper = styled.article`
  margin-bottom: 1.7rem;
`;

const ListContainer = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 0.25rem;
`;

export default SidebarMenu;
