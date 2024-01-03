'use client';

import styled from 'styled-components';

interface FooterTextProps {
  value: number;
}

const FooterText = ({ value }: FooterTextProps) => {
  return (
    <Text>
      &copy; {value} by <Author>Emmanuel Adebayo&trade;</Author>. All rights
      reserved. We are a young company always looking for new and creative ideas
      to help you with our products in your everyday work.
    </Text>
  );
};

const Text = styled.p`
  width: 60%;
  font-size: var(--default-font-size);
  text-align: center;
  color: ${({ theme }) => theme.textNav};
  margin: 0 auto;
  line-height: 1.1;
  margin-top: 2rem;

  @media only screen and (max-width: 37.5em) {
    width: 100%;
    text-align: left;
  }

  @media only screen and (max-width: 31.25em) {
    font-size: 1.55rem;
  }

  @media only screen and (max-width: 27.5em) {
    line-height: 1.3;
  }
`;

const Author = styled.strong``;

export default FooterText;
