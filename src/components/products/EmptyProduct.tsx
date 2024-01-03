'use client';

import styled from 'styled-components';

import { CommonImage } from '../CommonImage';

interface EmptyProductProps {
  src: string;
  title: string;
}

const EmptyProduct = ({ src, title }: EmptyProductProps) => {
  return (
    <Container>
      <StyledImage src={src} width={500} height={250} alt='' />
      <Message>{title}</Message>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 3rem;
`;

const StyledImage = styled(CommonImage)`
  width: 50rem;
  height: 25rem;

  @media only screen and (max-width: 25em) {
    width: 40rem;
  }

  @media only screen and (max-width: 18.75em) {
    width: 34.5rem;
  }
`;

const Message = styled.span`
  font-size: 2rem;
  color: ${({ theme }) => theme.textNotFound};
`;

export default EmptyProduct;
