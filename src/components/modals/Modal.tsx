import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { ModalProps } from '../../types';
import { useDarkMode } from '../../hooks/useDarkMode';

import Overlay from './Overlay';

const Modal = ({ title, children, isOpen, onClose }: ModalProps) => {
  const mode = useDarkMode((state) => state.mode);

  const [showModal, setShowModal] = useState(false);

  const handleClose = useCallback(() => {
    setShowModal(false);
    onClose();
  }, [onClose]);

  const closeModalHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      const target = e.target as Element;

      if (target.classList.contains('overlay')) {
        handleClose();
      }
    },
    [handleClose]
  );

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    },
    [handleClose]
  );

  const activeModal = useMemo(() => {
    return showModal ? 'show' : '';
  }, [showModal]);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);

  if (!isOpen) {
    return null;
  }

  return (
    <Overlay
      mode={mode.toString()}
      type={activeModal}
      onClick={closeModalHandler}
    >
      <Wrapper>
        <ButtonContainer>
          <Heading>{title}</Heading>
          <Button type='button' onClick={onClose}>
            <CloseIcon />
          </Button>
        </ButtonContainer>
        <ModalContent>{children}</ModalContent>
      </Wrapper>
    </Overlay>
  );
};

const Wrapper = styled.div`
  width: 40rem;
  padding: 2rem 4rem;
  background-color: ${({ theme }) => theme.bgModal};
  border: 1px solid ${({ theme }) => theme.modalBorder};
  border-radius: 0.5rem;
  position: relative;

  @media only screen and (max-width: 25em) {
    width: 35rem;
    padding-left: 2rem;
    padding-right: 2rem;
  }

  @media only screen and (max-width: 18.75em) {
    width: 33rem;
    padding-left: 1.2rem;
    padding-right: 1.2rem;
  }

  @media only screen and (min-width: 112.5em) {
    width: 50rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const Heading = styled.h1`
  display: inline-block;
  font-weight: 500;
  font-size: 2rem;
  color: ${({ theme }) => theme.text};

  @media only screen and (max-width: 25em) {
    font-size: 1.85rem;
  }

  @media only screen and (min-width: 112.5em) {
    font-size: 2.5rem;
  }
`;

const Button = styled.button`
  position: absolute;
  width: 4rem;
  height: 4rem;
  position: absolute;
  top: 0;
  right: -3rem;
  display: inline-block;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  font-size: 2.3rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textPayModal};
  outline-color: ${({ theme }) => theme.payModalOut};
  cursor: pointer;

  @media only screen and (max-width: 25em) {
    right: -1rem;
  }

  svg {
    font-size: 2.3rem;
    fill: currentColor;
  }
`;

const ModalContent = styled.div``;

export default Modal;
