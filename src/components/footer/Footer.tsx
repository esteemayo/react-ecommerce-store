'use client';

import styled from 'styled-components';
import { useMemo } from 'react';

import FooterText from './FooterText';
import MenuItems from './MenuItems';
import SocialIcon from './SocialIcon';
import Heading from './Heading';
import FooterLink from './FooterLink';
import Search from './Search';

import { footerLinks, footerMenus, social } from '@/data';

const Footer = () => {
  const year = useMemo(() => {
    const date = new Date();
    return date.getFullYear();
  }, []);

  return (
    <Container>
      <Wrapper>
        <FooterLeft>
          <MenuItems data={footerMenus} />
        </FooterLeft>
        <FooterRight>
          <FooterContainer>
            <Search />
            <Heading title='Follow us' small />
            <SocialIcon data={social} />
          </FooterContainer>
        </FooterRight>
      </Wrapper>
      <FooterLink data={footerLinks} />
      <FooterText value={year} />
    </Container>
  );
};

const Container = styled.footer`
  width: 100vw;
  padding: 8rem 0;
  background-color: ${({ theme }) => theme.bgNav};
  color: ${({ theme }) => theme.textNav};

  @media only screen and (max-width: 64em) {
    padding: 6rem 8rem;
  }

  @media only screen and (max-width: 37.5em) {
    padding: 5rem;
  }

  @media only screen and (max-width: 25em) {
    padding-left: 3rem;
    padding-right: 3rem;
  }

  @media only screen and (max-width: 23.75em) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;

  display: flex;
  align-items: start;
  gap: 5rem;

  @media only screen and (max-width: 64em) {
    flex-direction: column;
    align-items: center;
  }
`;

const FooterLeft = styled.div`
  flex: 3;

  @media only screen and (max-width: 64em) {
    width: 100%;
  }
`;

const FooterRight = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media only screen and (max-width: 64em) {
    align-items: center;
  }

  @media only screen and (max-width: 37.5em) {
    align-items: flex-start;
  }
`;

export default Footer;
