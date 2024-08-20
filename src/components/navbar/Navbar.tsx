import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useState } from 'react';

import LoginButton from './LoginButton';
import Logo from './Logo';
import CartQuantity from './CartQuantity';
import MenuItem from './MenuItem';
import ToggleButton from './ToggleButton';
import AddButton from './AddButton';
import LogoutButton from './LogoutButton';
import SearchIcon from './SearchIcon';
import DarkModeToggle from './DarkModeToggle';

import { useAuth } from '../../hooks/useAuth';
import { useCartStore } from '../../hooks/useCartStore';
import { useSidebar } from '../../hooks/useSidebar';
import { useSearchModal } from '../../hooks/useSearchModal';
import { useSubmenu } from '../../hooks/useSubmenu';

import { navLinks } from '../../data';
import { Submenu } from '../../types';

const Navbar = () => {
  const { pathname } = useLocation();

  const cart = useCartStore((state) => state.cart);
  const searchModal = useSearchModal();
  const qty = useCartStore((state) => state.qty);

  const currentUser = useAuth((state) => state.user);
  const logoutUser = useAuth((state) => state.logoutUser);

  const openSubmenu = useSubmenu((state) => state.openSubmenu);
  const onOpen = useSidebar((state) => state.onOpen);
  const closeSubmenu = useSubmenu((state) => state.closeSubmenu);

  const [isHover, setIsHover] = useState(false);

  const handleMouseOver = useCallback(() => {
    setIsHover(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHover(false);
  }, []);

  const displaySubmenu = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      const target = e.target as Element;

      const page = target.textContent;
      const tempBtn = target.getBoundingClientRect();

      const center = (tempBtn.left + tempBtn.right) / 2;
      const bottom = tempBtn.bottom;

      const submenu: Submenu = {
        page,
        coordinates: {
          center,
          bottom,
        },
      };

      openSubmenu(submenu);
    },
    [openSubmenu]
  );

  const handleSubmenu = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();

      const target = e.target as Element;

      if (!target.classList.contains('link-btn')) {
        closeSubmenu();
      }
    },
    [closeSubmenu]
  );

  const handleLogout = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      logoutUser();
    },
    [logoutUser]
  );

  return (
    <Container onMouseOver={handleSubmenu}>
      <Wrapper>
        <LogoBox>
          <Logo />
        </LogoBox>
        <ToggleBox>
          <ToggleButton icon={faBars} onClick={onOpen} />
          {!!currentUser && cart.length > 0 && <CartQuantity amount={qty} />}
        </ToggleBox>
        <ListContainer>
          {navLinks.map((item) => {
            const { id, text } = item;
            return <MenuItem key={id} label={text} onMouse={displaySubmenu} />;
          })}
          {!!currentUser && <LogoutButton onClick={handleLogout} />}
        </ListContainer>
        <ButtonContainer>
          {currentUser?.role === 'admin' && !pathname.includes('/admin') && (
            <AddButton />
          )}
          <DarkModeToggle />
          <SearchIcon onOpen={searchModal.onOpen} />
          {!currentUser && (
            <LoginButton
              isHover={isHover}
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
            />
          )}
          {!!currentUser && cart.length > 0 && <CartQuantity amount={qty} />}
        </ButtonContainer>
      </Wrapper>
    </Container>
  );
};

const Container = styled.nav`
  width: 100vw;
  height: 7rem;
  background-color: ${({ theme }) => theme.bgNav};
  color: var(--clr-white);
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 64em) {
    padding: 0 8rem;
  }

  @media only screen and (max-width: 43.75em) {
    padding: 0 6rem;
  }

  @media only screen and (max-width: 41.875em) {
    padding: 0 5rem;
  }

  @media only screen and (max-width: 31.25em) {
    padding: 0 4rem;
  }

  @media only screen and (max-width: 28.75em) {
    padding: 0;
  }
`;

const LogoBox = styled.div`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ToggleBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  @media only screen and (min-width: 50em) {
    display: none;
  }
`;

const ListContainer = styled.ul`
  display: none;

  @media only screen and (min-width: 50em) {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 3rem;
  }
`;

const ButtonContainer = styled.div`
  display: none;

  @media only screen and (min-width: 50em) {
    display: flex;
    align-items: center;
    gap: 3rem;
  }
`;

export default Navbar;
