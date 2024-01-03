'use client';

import styled from 'styled-components';
import { useEffect, useState, useMemo, useRef } from 'react';

import Heading from './Heading';
import MenuItem from './MenuItem';

import { useSubmenu } from '@/hooks/useSubmenu';

interface IContainer {
  type: string;
}

interface IColumn {
  columns: string;
}

const Submenu = () => {
  const location = useSubmenu((state) => state.location);
  const isOpen = useSubmenu((state) => state.isOpen);
  const { page, links } = useSubmenu((state) => state.page);

  const containerRef = useRef<HTMLElement>();
  const [columns, setColumns] = useState('col-2');

  const activeSubmenu = useMemo(() => {
    return isOpen ? 'show' : '';
  }, [isOpen]);

  useEffect(() => {
    setColumns('col-2');
    const submenu = containerRef.current;
    const { center, bottom } = location;

    submenu.style.left = `${center}px`;
    submenu.style.top = `${bottom}px`;

    if (links.length === 3) {
      setColumns('col-3');
    }

    if (links.length === 4) {
      setColumns('col-4');
    }

    if (links.length > 4) {
      setColumns('col-3');
    }
  }, [links, location]);

  return (
    <Container type={activeSubmenu} ref={containerRef}>
      <Heading title={page} />
      <ListContainer columns={columns}>
        {links?.map((link, index) => {
          return <MenuItem key={index} {...link} />;
        })}
      </ListContainer>
    </Container>
  );
};

const Container = styled.aside<IContainer>`
  padding: 2rem;
  background-color: ${({ theme }) => theme.bgRevs};
  border-radius: 1rem;
  position: absolute;
  left: 50%;
  top: 5rem;
  transform: translateX(-50%);
  display: ${({ type }) => (type === 'show' ? 'block' : 'none')};
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  box-shadow: ${({ theme }) => theme.boxSub};
  z-index: 3000;

  &::before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
    border-bottom: 0.5rem solid ${({ theme }) => theme.bgRevs};
    position: absolute;
    top: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const ListContainer = styled.ul<IColumn>`
  list-style: none;
  padding: 2rem 0;
  display: grid;
  grid-template-columns: ${({ columns }) => setGridColumns(columns)};
  gap: 0.25rem 2rem;
  width: max-content;
`;

const setGridColumns = (columns: string) => {
  if (columns === 'col-2') return 'repeat(2, max-content)';
  if (columns === 'col-3') return 'repeat(3, max-content)';
  if (columns === 'col-4') return 'repeat(4, max-content)';
};

export default Submenu;
