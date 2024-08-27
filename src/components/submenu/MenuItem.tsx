import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SubmenuMenuItemProps } from '../../types';

const MenuItem = ({ url, icon, label, onClose }: SubmenuMenuItemProps) => {
  return (
    <ListItem onClick={onClose}>
      <StyledLink to={url}>
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
    outline-color: ${({ theme }) => theme.menuOut};
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
    & > svg {
      color: ${({ theme }) => theme.textMenuHov};
    }

    color: ${({ theme }) => theme.textMenuHov};
  }

  svg {
    font-size: 2rem;
    color: ${({ theme }) => theme.textHeader};
  }
`;

export default MenuItem;
