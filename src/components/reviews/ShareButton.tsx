import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';

const ShareButton = () => {
  return (
    <Button type='button'>
      <FontAwesomeIcon icon={faArrowUpFromBracket} />
      Share
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  width: 8rem;
  padding: 0.7rem 1rem;
  font-size: 1.4rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textRevDate};
  border: 1px solid ${({ theme }) => theme.textRevDate};
  border-radius: 0.5rem;
  outline-color: #ccc;
  cursor: pointer;

  @media only screen and (max-width: 26.875em) {
    font-size: 1.35rem;
  }

  @media only screen and (max-width: 25em) {
    gap: 1rem;
    font-size: 1.3rem;
    padding: 0.5rem 0.8rem;
  }

  @media only screen and (min-width: 112.5em) {
    gap: 1rem;
    width: 10rem;
    padding: 1rem 1.5rem;
    font-size: 1.8rem;
  }

  svg {
    font-size: inherit;
    color: currentColor;
  }
`;

export default ShareButton;
