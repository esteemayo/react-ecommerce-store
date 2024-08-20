import { useEffect } from 'react';
import styled from 'styled-components';

import { AlertProps } from '../types';

interface IMessage {
  alert: string;
  center?: string;
}

const Alert = ({ alert, center, message, onChange }: AlertProps) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [alert, onChange]);

  return (
    <Message alert={alert.toString()} center={center?.toString()}>
      {message}
    </Message>
  );
};

const Message = styled.span<IMessage>`
  display: ${({ alert }) => (alert === 'true' ? 'block' : 'none')};
  font-size: 1.4rem;
  color: var(--clr-green-dark);
  text-align: ${({ center }) => setProperty(center)};
`;

const setProperty = (center?: string) => {
  return center === 'true' ? 'center' : 'left';
};

export default Alert;
