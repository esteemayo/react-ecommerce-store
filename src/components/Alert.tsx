import { useEffect } from 'react';
import styled from 'styled-components';

import { AlertProps } from '../types';

interface IMessage {
  center?: boolean;
}

const Alert = ({ alert, center, message, onChange }: AlertProps) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [alert, onChange]);

  return <Message center={center?.toString()}>{message}</Message>;
};

const Message = styled.span<IMessage>`
  display: block;
  font-size: 1.4rem;
  color: #409384;
  text-align: ${({ center }) => (center === 'true' ? 'center' : 'left')};
`;

export default Alert;
