'use client';

import styled from 'styled-components';
import Link from 'next/link';

import { SocialIconProps } from '@/types';
import { useDarkMode } from '@/hooks/useDarkMode';

interface IMode {
  mode: string;
  color: string;
}

const SocialIcon = ({ data }: SocialIconProps) => {
  const mode = useDarkMode((state) => state.mode);

  return (
    <Container>
      {data.map((item) => {
        const { id, url, icon: Icon, color } = item;
        return (
          <Link key={id} href={url} passHref>
            <IconWrapper mode={mode.toString()} color={color}>
              <Icon />
            </IconWrapper>
          </Link>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  margin-top: 1rem;

  @media only screen and (max-width: 26.875em) {
    margin-top: 0.7rem;
  }

  a {
    &:link,
    &:visited {
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      color: inherit;
      border-radius: 50%;
      outline-offset: 2px;
      outline-color: #eee;
    }

    &:active {
      color: currentColor;
    }
  }
`;

const IconWrapper = styled.div<IMode>`
  width: 4rem;
  height: 4rem;
  background-color: #${({ color, mode }) => (mode === 'true' ? '121212' : color)};
  color: ${({ mode }) => (mode === 'true' ? '#cfd0d1' : 'inherit')};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;

  @media only screen and (max-width: 37.5em) {
    width: 3.5rem;
    height: 3.5rem;
  }

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #${({ color, mode }) => mode === 'true' && color};
    color: ${({ mode }) => mode === 'true' && 'var(--color-white)'};
  }

  svg {
    font-size: 2rem;
    color: inherit;

    @media only screen and (max-width: 37.5em) {
      font-size: 1.87rem;
    }
  }
`;

export default SocialIcon;
