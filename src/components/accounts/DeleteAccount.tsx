'use client';

import styled from 'styled-components';
import { useCallback } from 'react';

interface DeleteAccountProps {
  onCancel(): void;
}

const DeleteAccount = ({ onCancel }: DeleteAccountProps) => {
  const handleDelete = useCallback(() => {
    console.log('user deleted!');
  }, []);

  return (
    <Container>
      <Heading>You are about to delete your account</Heading>
      <WarningText>
        You will receive an email to confirm your decision. Please note, that
        all your data will be permanently erased.
      </WarningText>
      <ButtonContainer>
        <CancelButton type='button' onClick={onCancel}>
          Cancel
        </CancelButton>
        <DeleteButton type='button' onClick={handleDelete}>
          Delete account
        </DeleteButton>
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem 0;
`;

const Heading = styled.h4`
  display: inline-block;
  font-weight: 600;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.text};
`;

const WarningText = styled.p`
  font-size: 1.5rem;
  color: #aaa;
  line-height: 1.2;
  margin-top: 1rem;
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  @media only screen and (max-width: 18.75em) {
    gap: 1rem;
  }
`;

const CancelButton = styled.button`
  display: inline-block;
  text-transform: capitalize;
  font-weight: 500;
  font-size: 1.4rem;
  width: 50%;
  padding: 1rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textModalBtn};
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  outline-color: #eee;
  cursor: pointer;

  @media only screen and (max-width: 18.75em) {
    font-size: 1.3rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`;

const DeleteButton = styled.button`
  border: none;
  display: inline-block;
  text-transform: capitalize;
  font-weight: 500;
  font-size: 1.4rem;
  width: 50%;
  padding: 1rem;
  background-color: var(--clr-primary-red);
  color: ${({ theme }) => theme.textModalDelBtn};
  background-image: linear-gradient(
    120deg,
    transparent 0%,
    transparent 50%,
    #fd8181 50%
  );
  background-size: 220%;
  border-radius: 0.5rem;
  outline-color: #e92222;
  cursor: pointer;
  transition: all 0.3s;

  @media only screen and (max-width: 56.25em), only screen and (hover: none) {
    font-size: 1.398rem;
  }

  @media only screen and (max-width: 18.75em) {
    font-size: 1.3rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  &:hover {
    background-position: 100%;
  }
`;

export default DeleteAccount;
