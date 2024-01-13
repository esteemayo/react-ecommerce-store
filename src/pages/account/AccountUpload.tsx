import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from 'styled-components';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import { AccountUploadProps } from '../../types';
import { CommonImage } from '../../components/CommonImage';

const AccountUpload = ({ currentUser, onOpen }: AccountUploadProps) => {
  return (
    <Container>
      <Wrapper>
        {currentUser.details.image ? (
          <StyledImage
            src={currentUser.details.image}
            width={100}
            height={100}
            alt=''
          />
        ) : (
          <FontAwesomeIcon icon={faUser} />
        )}
      </Wrapper>
      <Button type='button' onClick={onOpen}>
        Upload a picture
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 10rem;
  height: 10rem;
  background-color: ${({ theme }) => theme.bgImg};
  border-radius: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  svg {
    font-size: 5rem;
    color: ${({ theme }) => theme.bgImgIcon};
  }
`;

const StyledImage = styled(CommonImage)`
  width: 10rem;
  height: 10rem;
  border-radius: 3.5rem;
`;

const Button = styled.button`
  display: inline-block;
  border: none;
  font-weight: 500;
  font-size: 1.4rem;
  padding: 1.2rem 3.5rem;
  background-color: ${({ theme }) => theme.bgBtn};
  color: ${({ theme }) => theme.textBtn};
  background-image: ${({ theme }) => css`
    linear-gradient(
      120deg,
      transparent 0%,
      transparent 50%,
      ${theme.bgImgBtn} 50%
    );
  `};
  background-size: 220%;
  border-radius: 0.5rem;
  outline-color: ${({ theme }) => theme.btnOut};
  cursor: pointer;
  transition: all 0.3s;

  @media only screen and (max-width: 43.75em) {
    padding: 1.2rem 2.5rem;
  }

  @media only screen and (max-width: 31.25em) {
    padding-left: 2rem;
    padding-right: 2rem;
  }

  @media only screen and (max-width: 25em) {
    font-size: 1.3rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  &:hover {
    background-position: 100%;
  }

  &:disabled {
    opacity: 0.7;
  }
`;

export default AccountUpload;
