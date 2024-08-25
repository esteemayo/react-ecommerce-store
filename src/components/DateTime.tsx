import { useMemo } from 'react';
import styled from 'styled-components';

import { DateTimeProps } from '../types';
import { formatDate } from '../utils/formatDate';

interface ITime {
  type?: string;
}

const DateTime = ({ date, type }: DateTimeProps) => {
  const dateTime = useMemo(() => {
    if (typeof date === 'string') {
      return date;
    }
    return date.toDateString();
  }, [date]);

  return (
    <Time type={type} dateTime={dateTime}>
      {formatDate(date)}
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
