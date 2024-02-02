import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

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
`;

export default AddButton;
