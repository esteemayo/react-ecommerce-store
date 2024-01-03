'use client';

import styled, { css } from 'styled-components';

interface ReviewButtonProps {
  actionLabel: string;
  onAction(): void;
}

const ReviewButton = ({ actionLabel, onAction }: ReviewButtonProps) => {
  return (
    <Button type='button' onClick={onAction}>
      {actionLabel}
    </Button>
  );
};

const Button = styled.button`
  border: none;
  display: inline-block;
  padding: 1rem;
  background-color: ${({ theme }) => theme.bgRevBtn};
  color: ${({ theme }) => theme.textRevBtn};
  background-image: ${({ theme }) => css`
    linear-gradient(
      120deg,
      transparent 0%,
      transparent 50%,
      ${theme.bgImgRevBtn} 50%
    );
  `};
  background-size: 220%;
  border-radius: 0.5rem;
  outline-color: ${({ theme }) => theme.textRevBtn};
  cursor: pointer;
  transition: all 0.3s ease;

  @media only screen and (max-width: 26.875em) {
    font-size: 1.55rem;
  }

  @media only screen and (max-width: 18.75em) {
    font-size: 1.4rem;
  }

  &:hover {
    background-position: 100%;
  }
`;

export default ReviewButton;
