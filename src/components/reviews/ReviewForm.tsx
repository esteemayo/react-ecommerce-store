'use client';

import styled, { css } from 'styled-components';
import Link from 'next/link';

import Form from '../form/Form';
import StarRating from '../StarRating';

import { ReviewFormProps } from '@/types';

const ReviewForm = ({
  rating,
  review,
  terms,
  onChangeRating,
  onChangeReview,
  onChangeTerms,
  onSubmit,
}: ReviewFormProps) => {
  return (
    <Form onSubmit={onSubmit}>
      <Header>Overall rating</Header>
      <RatingContainer>
        <StarRating
          name='size-large'
          value={rating}
          onChange={onChangeRating}
        />
        <Text>Click to rate</Text>
      </RatingContainer>
      <Label htmlFor='review'>Product review</Label>
      <TextArea
        id='review'
        name='review'
        value={review}
        onChange={onChangeReview}
        placeholder='Example: Since i bought this a month ago, it has been used a lot. What i like best/what is worst about this product is ...'
      />
      <Agreement>
        <Input id='terms' checked={terms} onChange={onChangeTerms} />
        <Label htmlFor='terms'>
          I accept the{' '}
          <StyledLink href='#' passHref>
            terms and conditions
          </StyledLink>
        </Label>
      </Agreement>
      <Information>
        You will be able to receive emails in connection with this review (eg if
        others comment on your review). All emails contain the option to
        unsubscribe. We can use the text and star rating from your review in
        other marketting.
      </Information>
      <Button type='submit'>Submit product review</Button>
    </Form>
  );
};

const Header = styled.h1`
  display: inline-block;
  font-weight: 600;
  font-size: 1.85rem;
  color: ${({ theme }) => theme.text};
`;

const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 10rem;
  margin-top: 1rem;

  svg {
    font-size: 3.5rem;
    fill: ${({ theme }) => theme.star};
    border: 2px solid ${({ theme }) => theme.starBorder};
    border-radius: 0.5rem;
    margin-right: 0.5rem;

    @media only screen and (max-width: 18.75em) {
      font-size: 3rem;
    }
  }
`;

const Text = styled.span`
  display: inline-block;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: inline-block;
  font-weight: 600;
  font-size: 1.3rem;
  color: ${({ theme }) => theme.text};
`;

const TextArea = styled.textarea`
  display: inline-block;
  width: 100%;
  height: 10rem;
  font-family: inherit;
  font-weight: lighter;
  font-size: 1.5rem;
  padding: 1rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textReview};
  border: 2px solid ${({ theme }) => theme.starBorder};
  border-radius: 0.5rem;
  outline-color: ${({ theme }) => theme.revOut};
  overflow: hidden;
  resize: none;
  caret-color: ${({ theme }) => theme.inputCaret};

  &::placeholder {
    font-size: 1.3rem;
    color: #bbb;
  }
`;

const Agreement = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 0.5rem;
  color: ${({ theme }) => theme.text};
  margin: 2rem 0;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  outline-color: ${({ theme }) => theme.revOut};
  transition: all 0.3s ease;

  &:hover {
    letter-spacing: 0.1px;
  }
`;

const Input = styled.input.attrs({
  type: 'checkbox',
})`
  outline-color: ${({ theme }) => theme.revOut};
`;

const Information = styled.p`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.text};
  letter-spacing: 0.2px;
  line-height: 1.2;
`;

const Button = styled.button`
  border: none;
  text-align: center;
  width: 100%;
  padding: 1.5rem 1rem;
  font-weight: 500;
  font-size: 1.4rem;
  background-color: ${({ theme }) => theme.bgBtnModal};
  color: ${({ theme }) => theme.textBtn};
  background-image: ${({ theme }) => css`
    linear-gradient(
      120deg,
      transparent 0%,
      transparent 50%,
      ${theme.bgBtnModalHov} 50%
    );
  `};
  background-size: 220%;
  border-radius: 0.5rem;
  outline-color: ${({ theme }) => theme.bgBtnModalOut};
  margin: 3rem 0;
  cursor: pointer;
  transition: all 0.3s ease;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  @media only screen and (max-width: 25em), only screen and (hover: none) {
    font-size: 1.38rem;
  }

  &:hover {
    background-position: 100%;
  }

  &:disabled {
    opacity: 0.85;
    cursor: not-allowed;
  }
`;

export default ReviewForm;
