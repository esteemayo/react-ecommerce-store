import styled from 'styled-components';
import { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

import { useAuth } from '../../hooks/useAuth';
import { deleteUser } from '../../services/userService';

import Spinner from '../Spinner';

interface DeleteAccountProps {
  onCancel(): void;
}

const DeleteAccount = ({ onCancel }: DeleteAccountProps) => {
  const {
    deleteUserFulfilled,
    deleteUserPending,
    deleteUserRejected,
    isError,
    isLoading,
    isSuccess,
    message,
    reset,
  } = useAuth();

  const handleDelete = useCallback(async () => {
    deleteUserPending();

    try {
      await deleteUser();
      deleteUserFulfilled();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: unknown | any) {
      deleteUserRejected(err.response.data.message);
    }
  }, [deleteUserFulfilled, deleteUserPending, deleteUserRejected]);

  useEffect(() => {
    isSuccess && onCancel();
    isError && toast.error(message);

    return () => reset();
  }, [isError, isSuccess, message, onCancel, reset]);

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
        <DeleteButton type='button' disabled={isLoading} onClick={handleDelete}>
          Delete account
        </DeleteButton>
      </ButtonContainer>
      <Overlay>{isLoading && <Spinner size='md' />}</Overlay>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem 0;
  position: relative;
`;

const Heading = styled.h4`
  display: inline-block;
  font-weight: 600;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.text};
`;

const WarningText = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.textSearchInput};
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

const Button = styled.button`
  text-transform: capitalize;
  font-weight: 500;
  font-size: 1.4rem;
  width: 50%;
  padding: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const CancelButton = styled(Button)`
  display: inline-block;
  background-color: transparent;
  color: ${({ theme }) => theme.textModalBtn};
  border: 1px solid #ccc;
  outline-color: #eee;

  @media only screen and (max-width: 18.75em) {
    font-size: 1.3rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`;

const DeleteButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  background-color: var(--clr-primary-red);
  color: ${({ theme }) => theme.textModalDelBtn};
  background-image: linear-gradient(
    120deg,
    transparent 0%,
    transparent 50%,
    #fd8181 50%
  );
  background-size: 220%;
  outline-color: #e92222;
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

  &:disabled {
    opacity: 0.85;
    cursor: not-allowed;
  }
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  margin: auto;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default DeleteAccount;
