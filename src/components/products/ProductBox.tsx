import styled from 'styled-components';

import { StyledWrapper } from '../StyledWrapper';
import { useSubmenu } from '../../hooks/useSubmenu';

const ProductBox = ({ children }: { children: React.ReactNode }) => {
  const closeSubmenu = useSubmenu((state) => state.closeSubmenu);

  return (
    <Container onMouseOver={closeSubmenu}>
      <StyledWrapper>{children}</StyledWrapper>
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  background-color: ${({ theme }) => theme.bg};
`;

export default ProductBox;
