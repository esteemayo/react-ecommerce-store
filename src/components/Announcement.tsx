'use client';

import styled from 'styled-components';
import { useMemo } from 'react';
import Marquee from 'react-fast-marquee';

import { useSubmenu } from '@/hooks/useSubmenu';
import { useDarkMode } from '@/hooks/useDarkMode';

import { announcements } from '@/data';

const Announcement = () => {
  const mode = useDarkMode((state) => state.mode);
  const closeSubmenu = useSubmenu((state) => state.closeSubmenu);

  const gradient = useMemo(() => {
    return mode ? false : true;
  }, [mode]);

  return (
    <Container onMouseOver={closeSubmenu}>
      <Marquee speed={100} gradient={gradient}>
        <Wrapper>
          {announcements.map((item) => {
            const { id, title } = item;
            return <Text key={id}>{title}</Text>;
          })}
        </Wrapper>
      </Marquee>
    </Container>
  );
};

const Container = styled.section`
  width: 100vw;
  padding: 1rem 3rem;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.textHeader};
`;

const Wrapper = styled.div`
  width: 100%;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5rem;
`;

const Text = styled.p`
  font-weight: 500;
  font-size: 1.4rem;
  color: inherit;
`;

export default Announcement;
