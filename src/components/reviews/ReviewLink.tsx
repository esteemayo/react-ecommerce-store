import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ReviewLink = () => {
  return (
    <StyledLink to='/products'>
      <Button>Shop now</Button>
    </StyledLink>
  );
};

const StyledLink = styled(Link)`
  width: 9rem;
  text-decoration: none;
  color: inherit;
  outline-color: ${({ theme }) => theme.btnRevOut};

  &:active {
    color: currentColor;
  }
`;

const Button = styled.button`
  border: none;
  display: inline-block;
  text-align: left;
  font-weight: 600;
  font-size: 1.8rem;
  width: 9rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textRevBtn};
  outline-color: ${({ theme }) => theme.btnRevOut};
  cursor: pointer;
  transition: all 0.3s ease;

  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 18.75em) {
    font-size: 1.7rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 2rem;
    width: 10rem;
  }

  &:hover {
    opacity: 0.7;
  }

  &::after {
    content: '';
    display: inline-block;
    width: 8.5rem;
    height: 1px;
    background-color: ${({ theme }) => theme.star};

    @media only screen and (min-width: 112.5em) {
      width: 9.8rem;
    }
  }
`;

export default ReviewLink;
