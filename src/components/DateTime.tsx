'use client';

import styled from 'styled-components';
import { useMemo } from 'react';

import { DateTimeProps } from '@/types';

interface ITime {
  type?: string;
}

const DateTime = ({ date, type, options }: DateTimeProps) => {
  const dateLabel = useMemo(() => {
    return new Date(date).toLocaleString('en-us', options);
  }, [date, options]);

  return (
    <Time type={type} dateTime={date.toDateString()}>
      {dateLabel}
    </Time>
  );
};

const Time = styled.time<ITime>`
  font-size: ${({ type }) => (type === 'review' ? '1.4rem' : '1.5rem')};
  color: ${({ theme, type }) =>
    type === 'review' ? theme.textRevDate : theme.textWlHeader};

  @media only screen and (max-width: 56.25em) {
    font-size: ${({ type }) => type !== 'review' && '1.3rem'};
  }

  @media only screen and (max-width: 26.875em) {
    font-size: ${({ type }) => type === 'review' && '1.35rem'};
  }

  @media only screen and (max-width: 25em) {
    font-size: ${({ type }) => type === 'review' && '1.3rem'};
  }

  @media only screen and (max-width: 18.75em) {
    font-size: ${({ type }) => type !== 'review' && '1.2rem'};
  }
`;

export default DateTime;
