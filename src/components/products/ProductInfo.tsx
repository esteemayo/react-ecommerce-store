import styled from 'styled-components';

interface ProductInfoProps {
  title: string;
  content: string;
}

const ProductInfo = ({ title, content }: ProductInfoProps) => {
  return (
    <Container>
      <Heading>{title}</Heading>
      <Text>{content}</Text>
    </Container>
  );
};

const Container = styled.div`
  margin: 3rem 0;
`;

const Heading = styled.h4`
  display: inline-block;
  font-weight: 400;
  font-size: 1.8rem;
  color: ${({ theme }) => theme.textProdHeader};
  margin-bottom: 3rem;

  @media only screen and (min-width: 112.5em) {
    font-size: 2.3rem;
  }
`;

const Text = styled.p`
  text-align: justify;
  font-size: var(--default-font-size);
  color: ${({ theme }) => theme.text};
  line-height: 1.3;
  word-wrap: break-word;

  @media only screen and (min-width: 112.5em) {
    font-size: 2rem;
  }
`;

export default ProductInfo;
