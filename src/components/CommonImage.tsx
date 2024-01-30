import styled from 'styled-components';

export const CommonImage = styled.img`
  display: block;
  object-fit: cover;
  background-color: ${({ theme }) => theme.bgImage};
  color: ${({ theme }) => theme.text};
`;
