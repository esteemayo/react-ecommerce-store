'use client';

import styled from 'styled-components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

import { DeleteModalProps } from '@/types';
import { useDarkMode } from '@/hooks/useDarkMode';

interface IMode {
  mode: string;
}

interface IWrapper {
  active: string;
}

const DeleteModal = ({
  actionId,
  wishlistLabel,
  isOpen,
  onClose,
  onAction,
}: DeleteModalProps) => {
  const mode = useDarkMode((state) => state.mode);
  const [showModal, setShowModal] = useState(isOpen);

  const closeModalHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      const target = e.target as Element;

      if (target.classList.contains('overlay')) {
        setShowModal(false);

        setTimeout(() => {
          onClose();
        }, 300);
      }

      const exitModal = (e: { preventDefault: () => void; key: string }) => {
        e.preventDefault();

        if (e.key === 'Escape') {
          setShowModal(false);
          onClose();
        }
      };

      window.addEventListener('keydown', exitModal);
      return window.removeEventListener('keydown', exitModal);
    },
    [onClose]
  );

  const deleteWishlistHandler = useCallback(
    (wishlistId: number) => {
      onAction(wishlistId);
      onClose();
    },
    [onAction, onClose]
  );

  const activeModal = useMemo(() => {
    return showModal?.toString();
  }, [showModal]);

  const modeValue = useMemo(() => {
    return mode.toString();
  }, [mode]);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <Overlay mode={modeValue} onClick={closeModalHandler} className='overlay'>
      <Wrapper active={activeModal}>
        <Box mode={modeValue}>
          <CloseButton type='button' onClick={onClose}>
            <CloseIcon />
          </CloseButton>
          <Heading>Remove a wishlist?</Heading>
          <WarningMessage>
            Are you sure you wanted to remove this item from your{' '}
            {wishlistLabel}?
          </WarningMessage>
          <ButtonContainer>
            <CancelButton type='button' onClick={onClose}>
              Not now
            </CancelButton>
            <DeleteButton
              type='button'
              onClick={() => deleteWishlistHandler(actionId)}
            >
              Remove
            </DeleteButton>
          </ButtonContainer>
        </Box>
      </Wrapper>
    </Overlay>
  );
};

const Overlay = styled.aside<IMode>`
  width: 100vw;
  height: 100%;
  background-color: ${({ theme }) => theme.bgOverlay};
  backdrop-filter: ${({ mode }) => (mode === 'true' ? 'blur(2px)' : undefined)};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4000;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div<IWrapper>`
  transform: translateY(${({ active }) => (active === 'true' ? 0 : '100%')});
  opacity: ${({ active }) => (active === 'true' ? 1 : 0)};
  transition: all 300ms;
`;

const Box = styled.div<IMode>`
  width: 35rem;
  padding: 5rem;
  background-color: ${({ theme }) => theme.bgModal};
  border-radius: 1rem;
  box-shadow: ${({ mode }) =>
    mode === 'true' ? 'none' : '0 2rem 4rem rgba(145, 143, 143, 0.1)'};
  -webkit-box-shadow: ${({ mode }) =>
    mode === 'true' ? 'none' : '0 2rem 4rem rgba(145, 143, 143, 0.1)'};
  -moz-box-shadow: ${({ mode }) =>
    mode === 'true' ? 'none' : '0 2rem 4rem rgba(145, 143, 143, 0.1)'};
  position: relative;

  @media only screen and (max-width: 18.75em) {
    width: 32rem;
    padding: 2.5rem;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background-color: transparent;
  color: #a2a8b0;
  border: 1px solid #f2f9fb;
  border-radius: 50%;
  outline-color: #f1e4f4;
  cursor: pointer;

  @media only screen and (max-width: 18.75em) {
    right: 1rem;
  }

  svg {
    font-size: 1.8rem;
    fill: currentColor;
  }
`;

const Heading = styled.h1`
  display: inline-block;
  font-weight: 500;
  font-size: 2rem;
  color: ${({ theme }) => theme.text};
  line-height: 1;
  margin-bottom: 2rem;
`;

const WarningMessage = styled.p`
  font-size: var(--default-font-size);
  color: ${({ theme }) => theme.textModal};
  line-height: 1.2;
`;

const ButtonContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CancelButton = styled.button`
  display: inline-block;
  font-size: 1.43rem;
  padding: 1rem 3rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textModalBtn};
  border: 1px solid #e3e3f3;
  border-radius: 0.5rem;
  outline-color: #f1e4f4;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  display: inline-block;
  font-size: 1.43rem;
  padding: 1rem 3rem;
  background-color: var(--clr-primary-red);
  color: ${({ theme }) => theme.textModalDelBtn};
  border: 1px solid #e3e3f3;
  border-radius: 0.5rem;
  outline-color: #b10101;
  cursor: pointer;
`;

export default DeleteModal;
