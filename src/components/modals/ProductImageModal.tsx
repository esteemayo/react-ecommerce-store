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
  setSlideIndex,
}: ProductImageModalProps) => {
  const mode = useDarkMode((state) => state.mode);

  const [showModal, setShowModal] = useState(false);

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
    },
    [handleClose]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setSlideIndex(slideIndex === 0 ? lastIndex : slideIndex - 1);
      } else if (e.key === 'ArrowRight') {
        setSlideIndex(slideIndex === lastIndex ? 0 : slideIndex + 1);
      }
    },
    [lastIndex, slideIndex]
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
    return showModal?.toString();
  }, [showModal]);

  const modeValue = useMemo(() => {
    return mode.toString();
  }, [mode]);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [handleEscape]);

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
    width: 100%;
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

  @media only screen and (min-width: 112.5em) {
    width: 4rem;
    height: 4rem;
  }

  svg {
    font-size: 2rem;
    fill: currentColor;

    @media only screen and (min-width: 112.5em) {
      font-size: 3rem;
    }
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
  left: ${({ direction }) => direction === 'left' && '4rem'};
  right: ${({ direction }) => direction === 'right' && '4rem'};
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 5000;
  transition: all 0.3s ease;

  @media only screen and (max-width: 50em) {
    width: 6.5rem;
    height: 6.5rem;
  }

  @media only screen and (min-width: 112.5em) {
    width: 6rem;
    height: 6rem;
    left: ${({ direction }) => direction === 'left' && '5rem'};
    right: ${({ direction }) => direction === 'right' && '5rem'};
  }

  &:hover {
    background-color: hsla(0, 0%, 100%, 0.05);
  }

  svg {
    color: var(--clr-white);

    @media only screen and (min-width: 112.5em) {
      font-size: 2rem;
    }
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

  @media only screen and (min-width: 112.5em) {
    width: 60rem;
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
