import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { ProductImageModalProps } from '../../types';
import { useDarkMode } from '../../hooks/useDarkMode';

import { CommonImage } from '../CommonImage';

interface IOverlay {
  mode: string;
}

interface IActive {
  active: string;
}

interface IBtn {
  direction: string;
}

const ProductImageModal = ({
  images,
  isOpen,
  isMoved,
  slideIndex,
  lastIndex,
  onMove,
  onClose,
}: ProductImageModalProps) => {
  const mode = useDarkMode((state) => state.mode);
  const [showModal, setShowModal] = useState(isOpen);

  const handleClose = useCallback(() => {
    setShowModal(false);

    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  const closeModalHandler = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      const target = e.target as Element;

      if (target.classList.contains('imageContainer')) {
        handleClose();
      }

      const exitModal = (e: { preventDefault: () => void; key: string }) => {
        e.preventDefault();

        if (e.key === 'Escape') {
          handleClose();
        }
      };

      window.addEventListener('keydown', exitModal);
      return () => window.removeEventListener('keydown', exitModal);
    },
    [handleClose]
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
    <Overlay mode={modeValue}>
      <CloseButton type='button' onClick={handleClose}>
        <CloseIcon />
      </CloseButton>
      {((isMoved && slideIndex > 0) || slideIndex !== 0) && (
        <ArrowButton
          type='button'
          direction='left'
          onClick={() => onMove('left')}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </ArrowButton>
      )}
      <Wrapper active={activeModal}>
        <ImageContainer className='imageContainer' onClick={closeModalHandler}>
          <Image
            src={images?.[slideIndex]}
            width={500}
            height={700}
            alt={`Image ${slideIndex + 1}`}
          />
        </ImageContainer>
      </Wrapper>
      <ArrowButton
        type='button'
        direction='right'
        onClick={() => onMove('right')}
        style={{ display: slideIndex === lastIndex ? 'none' : undefined }}
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </ArrowButton>
    </Overlay>
  );
};

const Overlay = styled.aside<IOverlay>`
  display: none;

  @media only screen and (min-width: 50em) {
    width: 100vw;
    height: 100%;
    background-color: ${({ theme }) => theme.bgImgOverlay};
    backdrop-filter: ${({ mode }) => setBackDropFilter(mode)};
    position: fixed;
    top: 0;
    left: 0;
    z-index: 4000;

    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
`;

const CloseButton = styled.button`
  border: none;
  display: inline-block;
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  color: var(--clr-white);
  outline-color: #777;
  cursor: pointer;
  z-index: 5000;

  position: absolute;
  top: 3rem;
  left: 3rem;

  svg {
    font-size: 2rem;
    fill: currentColor;
  }
`;

const ArrowButton = styled.button<IBtn>`
  border: none;
  display: inline-block;
  width: 4rem;
  height: 4rem;
  background-color: ${({ theme }) => theme.bgImgModal};
  color: var(--clr-white);
  border-radius: 50%;
  outline-color: #777;
  position: absolute;
  top: 50%;
  left: ${({ direction }) => direction === 'left' && '1rem'};
  right: ${({ direction }) => direction === 'right' && '2.5rem'};
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 5000;
  transition: all 0.3s ease;

  @media only screen and (max-width: 50em) {
    width: 6.5rem;
    height: 6.5rem;
  }

  &:hover {
    background-color: hsla(0, 0%, 100%, 0.05);
  }

  svg {
    color: var(--clr-white);
  }
`;

const Wrapper = styled.div<IActive>`
  width: 100%;
  height: 100%;
  transform: translateY(${({ active }) => setProperty(active, 0, '100%')});
  opacity: ${({ active }) => setProperty(active, 1, 0)};
  transition: all 300ms;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 95%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled(CommonImage)`
  width: 50rem;
  height: 100%;
  object-fit: contain;
  background-color: transparent;

  @media only screen and (max-width: 64em) {
    height: 90%;
  }

  @media only screen and (max-width: 50em) {
    width: 60rem;
    height: 80rem;
  }
`;

const setBackDropFilter = (mode: string) => {
  return mode === 'true' ? 'blur(2px)' : undefined;
};

const setProperty = (
  active: string,
  val1: string | number,
  val2: string | number
) => {
  return active === 'true' ? val1 : val2;
};

export default ProductImageModal;
