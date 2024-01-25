import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { ReviewModalProps } from '../../types';
import { useDarkMode } from '../../hooks/useDarkMode';

import ReviewForm from '../reviews/ReviewForm';
import { createReviewOnProduct } from '../../services/productService';

interface IOverlay {
  mode: string;
}

interface IWrapper {
  active: string;
}

const ReviewModal = ({
  productId,
  isOpen,
  onClose,
  onReviews,
}: ReviewModalProps) => {
  const mode = useDarkMode((state) => state.mode);

  const [showModal, setShowModal] = useState(isOpen);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [terms, setTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeRating = useCallback(
    (
      _e: React.SyntheticEvent<Element, Event>,
      value: number | null
    ): void | undefined => {
      setRating(value);
    },
    []
  );

  const handleChangeReview = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setReview(e.target.value);
    },
    []
  );

  const handleChangeTerms = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTerms(e.currentTarget.checked);
    },
    []
  );

  const handleClear = useCallback(() => {
    setRating(null);
    setReview('');
    setTerms(false);
  }, []);

  const closeModalHandler = useCallback(() => {
    setShowModal(false);
    handleClear();

    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose, handleClear]);

  const handleCloseModal = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      const target = e.target as Element;

      if (target.classList.contains('overlay')) {
        closeModalHandler();
      }
    },
    [closeModalHandler]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setIsLoading(true);

      const newReview = {
        rating,
        review,
        terms,
      };

      try {
        const { data } = await createReviewOnProduct(newReview, productId);
        onReviews((prev) => [data, ...prev]);
      } catch (err: unknown) {
        console.log(err);
        toast.error('Something went wrong!!!');
      } finally {
        setIsLoading(false);
        closeModalHandler();
      }
    },
    [closeModalHandler, onReviews, productId, rating, review, terms]
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
    <Overlay mode={modeValue} onClick={handleCloseModal} className='overlay'>
      <Wrapper active={activeModal}>
        <Box>
          <ButtonContainer>
            <CloseButton type='button' onClick={closeModalHandler}>
              <FontAwesomeIcon icon={faXmark} />
            </CloseButton>
          </ButtonContainer>
          <ReviewForm
            rating={rating}
            review={review}
            terms={terms}
            isLoading={isLoading}
            onChangeRating={handleChangeRating}
            onChangeReview={handleChangeReview}
            onChangeTerms={handleChangeTerms}
            onSubmit={handleSubmit}
          />
        </Box>
      </Wrapper>
    </Overlay>
  );
};

const Overlay = styled.aside<IOverlay>`
  width: 100vw;
  height: 100%;
  background-color: ${({ theme }) => theme.bgOverlay};
  backdrop-filter: ${({ mode }) => setBackDropFilter(mode)};
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

const Box = styled.div`
  width: 40rem;
  padding: 2rem 4rem;
  background-color: ${({ theme }) => theme.bgModal};
  border-radius: 1.5rem;

  @media only screen and (max-width: 25em) {
    width: 35rem;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }

  @media only screen and (max-width: 18.75em) {
    width: 32rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    padding-bottom: 1rem;
  }
`;

const ButtonContainer = styled.div`
  position: relative;
  margin-bottom: 3rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -1rem;
  right: -2rem;
  border: none;
  outline: none;
  display: inline-block;
  width: 4rem;
  height: 4rem;
  font-weight: 300;
  font-size: 2rem;
  background-color: ${({ theme }) => theme.bgRevCloseBtn};
  color: ${({ theme }) => theme.textRevCloseBtn};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;

  @media only screen and (max-width: 18.75em) {
    right: -1rem;
    width: 3.5rem;
    height: 3.5rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.bgRevCloseBtnHov};
    color: ${({ theme }) => theme.textRevCloseBtnHov};
  }

  svg {
    font-size: inherit;
    color: currentColor;
  }
`;

const setBackDropFilter = (mode: string) => {
  return mode === 'true' ? 'blur(2px)' : undefined;
};

export default ReviewModal;
