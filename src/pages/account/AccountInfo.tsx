import { useMemo } from 'react';
import styled from 'styled-components';

import AccountUpload from './AccountUpload';
import AccountHead from './AccountHead';
import DeactivateAccount from './DeactivateAccount';

import { AccountInfoProps } from '../../types';
import { useDarkMode } from '../../hooks/useDarkMode';

interface IProps {
  mode: string;
}

const AccountInfo = ({
  avatar,
  user,
  accountModal,
  emailModal,
  fileModal,
  passwordModal,
}: AccountInfoProps) => {
  const mode = useDarkMode((state) => state.mode);

  const modeValue = useMemo(() => {
    return mode.toString();
  }, [mode]);

  return (
    <Container mode={modeValue}>
      <Wrapper>
        <Box>
          <Left>
            <AccountHead
              currentUser={user}
              onOpen={emailModal.onOpen}
              onAction={passwordModal.onOpen}
            />
            <DeactivateAccount onOpen={accountModal.onOpen} />
          </Left>
          <Right>
            <AccountUpload avatar={avatar} onOpen={fileModal.onOpen} />
          </Right>
        </Box>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div<IProps>`
  padding: 3rem 5rem;
  background-color: ${({ mode }) => (mode === 'true' ? '#0d2136' : undefined)};
  box-shadow: ${({ theme }) => theme.boxCart};
  -webkit-box-shadow: ${({ theme }) => theme.boxCart};
  -moz-box-shadow: ${({ theme }) => theme.boxCart};
  border-radius: 1rem;

  @media only screen and (max-width: 43.75em) {
    padding-left: 3rem;
    padding-right: 3rem;
  }

  @media only screen and (max-width: 25em) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  @media only screen and (max-width: 17.5em) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const Wrapper = styled.div`
  padding: 2rem 3rem;

  @media only screen and (max-width: 43.75em) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  @media only screen and (max-width: 31.25em) {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const Box = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 5rem;

  @media only screen and (max-width: 43.75em) {
    flex-direction: column-reverse;
    gap: 7rem;
  }
`;

const Left = styled.div`
  flex: 1.5;
`;

const Right = styled.div`
  flex: 1;

  @media only screen and (max-width: 43.75em) {
    width: 100%;
  }
`;

export default AccountInfo;
