'use client';

import styled from 'styled-components';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SubmenuMenuItemProps } from '@/types';

const MenuItem = ({ url, icon, label }: SubmenuMenuItemProps) => {
  return (
    <ListItem>
      <StyledLink href={url} passHref>
        <FontAwesomeIcon icon={icon} />
        &nbsp;
        {label}
      </StyledLink>
    </ListItem>
  );
};

const ListItem = styled.li`
  font-size: 1.5rem;
  text-transform: capitalize;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1rem;

  & > * {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    outline-color: #f5f5f5;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: 500;
  color: currentColor;
  transition: all 0.2s ease;

  &:active {
    color: currentColor;
  }

  &:hover {
    color: #9f9797;
  }

  svg {
    font-size: 2rem;
    color: ${({ theme }) => theme.textHeader};
  }
`;

export default MenuItem;
