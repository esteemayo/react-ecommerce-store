import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { SocialIconProps } from '../../types';
import { useDarkMode } from '../../hooks/useDarkMode';

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
          <Link key={id} to={url}>
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
    margin-top: 1.5rem;
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
  background-color: #${({ color, mode }) => (mode === 'true' ? '031525' : color)};
  color: ${({ mode }) => (mode === 'true' ? 'rgb(211, 227, 253)' : 'inherit')};
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;

  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 37.5em) {
    width: 3.5rem;
    height: 3.5rem;
  }

  @media only screen and (min-width: 112.5em) {
    width: 5rem;
    height: 5rem;
  }

  &:hover {
    background-color: #${({ color, mode }) => mode === 'true' && color};
    color: ${({ mode }) => mode === 'true' && 'var(--clr-white)'};
  }

  svg {
    font-size: 2rem;
    color: inherit;

    @media only screen and (max-width: 37.5em) {
      font-size: 1.87rem;
    }

    @media only screen and (min-width: 112.5em) {
      font-size: 2.5rem;
    }
  }
`;

export default SocialIcon;
