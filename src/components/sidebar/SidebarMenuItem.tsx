'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SidebarMenuItemProps } from '@/types';
import { useSidebar } from '@/hooks/useSidebar';

const SidebarMenuItem = ({ url, icon, label }: SidebarMenuItemProps) => {
  const onClose = useSidebar((state) => state.onClose);

  return (
    <ListItem>
      <StyledLink href={url} passHref onClick={onClose}>
        <FontAwesomeIcon icon={icon} />
        &nbsp;
        {label}
      </StyledLink>
    </ListItem>
  );
};

const ListItem = styled.li`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.text};

  @media only screen and (max-width: 18.75em) {
    font-size: 1.3rem;
  }

  & > * {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  text-transform: capitalize;
  color: inherit;
  outline-color: #eee;
  transition: all 0.2s ease;

  &:active {
    color: currentColor;
  }

  &:hover {
    color: #686767;
  }

  svg {
    color: ${({ theme }) => theme.textHeader};
  }
`;

export default SidebarMenuItem;
