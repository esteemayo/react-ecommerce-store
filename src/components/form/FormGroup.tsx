import styled from 'styled-components';

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:last-of-type) {
    margin-bottom: 2rem;
  }

  & > label {
    display: inline-block;
    width: 13rem;
    font-weight: 600;
    font-size: 1.4rem;
    color: ${({ theme }) => theme.textLabel};
  }
`;
