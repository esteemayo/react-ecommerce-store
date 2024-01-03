'use client';

import styled from 'styled-components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

import { ModalProps } from '@/types';
import { useDarkMode } from '@/hooks/useDarkMode';

import Overlay from './Overlay';

const Modal = ({ title, children, isOpen, onClose }: ModalProps) => {
  const mode = useDarkMode((state) => state.mode);

  const [showModal, setShowModal] = useState(isOpen);

  const closeModalHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      const target = e.target as Element;

      if (target.classList.contains('overlay')) {
        setShowModal(false);
        onClose();
      }
    },
    [onClose]
  );

  const activeModal = useMemo(() => {
    return showModal ? 'show' : '';
  }, [showModal]);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

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
  border-radius: 0.5rem;

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
  color: #838283;
  outline-color: #f7f3f8;
  cursor: pointer;

  @media only screen and (max-width: 25em) {
    width: 1.25rem;
    height: 1.25rem;
    right: 0.5rem;
  }

  svg {
    font-size: 2.3rem;
    fill: currentColor;
  }
`;

const ModalContent = styled.div``;

export default Modal;
