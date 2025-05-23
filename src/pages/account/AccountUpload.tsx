import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled, { css } from 'styled-components';

import { AccountUploadProps } from '../../types';
import { CommonImage } from '../../components/CommonImage';

const AccountUpload = ({ avatar, onOpen }: AccountUploadProps) => {
  const btnLabel = useMemo(() => {
    return avatar ? 'Change your avatar' : 'Upload a picture';
  }, [avatar]);

  return (
    <Container>
      <Wrapper>
        {avatar ? (
          <StyledImage src={avatar} width={100} height={100} alt='avatar' />
        ) : (
          <FontAwesomeIcon icon={faUser} />
        )}
      </Wrapper>
      <Button type='button' onClick={onOpen}>
        {btnLabel}
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

  @media only screen and (min-width: 112.5em) {
    width: 15rem;
    height: 15rem;
    margin-bottom: 2rem;
  }

  svg {
    font-size: 5rem;
    color: ${({ theme }) => theme.bgImgIcon};

    @media only screen and (min-width: 112.5em) {
      font-size: 10rem;
    }
  }
`;

const StyledImage = styled(CommonImage)`
  width: 10rem;
  height: 10rem;
  border-radius: 3.5rem;

  @media only screen and (min-width: 112.5em) {
    width: 15rem;
    height: 15rem;
  }
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

  @media only screen and (min-width: 112.5em) {
    font-size: 1.8rem;
    padding: 1.5rem 4rem;
  }

  &:hover {
    background-position: 100%;
  }

  &:disabled {
    opacity: 0.7;
  }
`;

export default AccountUpload;
