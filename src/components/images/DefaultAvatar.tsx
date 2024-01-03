'use client';

import styled from 'styled-components';

interface DefaultAvatarProps {
  name: string;
}

const DefaultAvatar = ({ name }: DefaultAvatarProps) => {
  return <Container>{name.charAt(0)}</Container>;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  width: 5rem;
  height: 5rem;
  font-size: 2.5rem;
  background-color: #d5a66a;
  color: ${({ theme }) => theme.textBtn};
  border-radius: 50%;

  @media only screen and (max-width: 31.25em) {
    width: 4.5rem;
    height: 4.5rem;
    font-size: 2.25rem;
  }

  @media only screen and (max-width: 25em) {
    width: 3.5rem;
    height: 3.5rem;
    font-size: 1.75rem;
  }

  @media only screen and (max-width: 18.75em) {
    width: 3rem;
    height: 3rem;
  }
`;

export default DefaultAvatar;
