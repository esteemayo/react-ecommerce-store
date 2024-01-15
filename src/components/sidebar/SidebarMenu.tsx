import styled from 'styled-components';

import Heading from './Heading';
import SidebarMenuItem from './SidebarMenuItem';

import { SidebarMenuProps } from '../../types';
import LogoutButton from '../navbar/LogoutButton';

const SidebarMenu = ({
  items,
  onAction,
  onClose,
  currentUser,
}: SidebarMenuProps) => {
  return (
    <Container>
      {items.map((item, index) => {
        const { page, links } = item;
        return (
          <Wrapper key={index}>
            <Heading title={page} />
            <ListContainer>
              {links?.map((link, index) => {
                return (
                  <SidebarMenuItem key={index} {...link} onClose={onClose} />
                );
              })}
            </ListContainer>
          </Wrapper>
        );
      })}
      {currentUser ? (
        <LogoutBox>
          <LogoutButton onClick={onAction} />
        </LogoutBox>
      ) : (
        <LoginButton>Sign in</LoginButton>
      )}
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

const LogoutBox = styled.div`
  & > button {
    padding: 0.5rem 1rem;
    background-color: ${({ theme }) => theme.bgBtn};
    color: ${({ theme }) => theme.textBtn};
    border-radius: 3px;
    outline-color: ${({ theme }) => theme.btnOut};
  }
`;

const LoginButton = styled.button`
  display: inline-block;
  border: none;
  font-family: inherit;
  font-weight: 600;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.bgBtn};
  color: ${({ theme }) => theme.textBtn};
  border-radius: 3px;
  outline-color: ${({ theme }) => theme.btnOut};
  cursor: pointer;
`;

export default SidebarMenu;
