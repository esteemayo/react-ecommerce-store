import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SidebarMenuItemProps } from '../../types';

const SidebarMenuItem = ({
  url,
  icon,
  label,
  onClose,
}: SidebarMenuItemProps) => {
  return (
    <ListItem>
      <StyledLink to={url} onClick={onClose}>
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
