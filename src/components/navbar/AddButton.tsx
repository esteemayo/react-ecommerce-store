import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const AddButton = () => {
  return (
    <StyledLink to='/admin/products/new'>
      <Button type='button'>
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Button = styled.button`
  display: inline-block;
  border: none;
  font-weight: 600;
  font-size: 1.5rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textNav};
  outline-color: ${({ theme }) => theme.navOut};
  cursor: pointer;

  @media only screen and (min-width: 112.5em) {
    font-size: 1.8rem;
  }

  svg {
    font-size: inherit;
    color: currentColor;
  }
`;

export default AddButton;
