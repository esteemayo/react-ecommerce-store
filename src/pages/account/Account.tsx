import styled from 'styled-components';
import { useEffect, useState } from 'react';

import { useEmailModal } from '../../hooks/useEmailModal';
import { useAuth } from '../../hooks/useAuth';
import { useAccountModal } from '../../hooks/useAccountModal';
import { useSubmenu } from '../../hooks/useSubmenu';
import { usePasswordModal } from '../../hooks/usePasswordModal';
import { useFileModal } from '../../hooks/useFileModal';

import Heading from './Heading';
import AccountInfo from './AccountInfo';

const Account = () => {
  const accountModal = useAccountModal();
  const fileModal = useFileModal();
  const passwordModal = usePasswordModal();
  const emailModal = useEmailModal();

  const currentUser = useAuth((state) => state.user);
  const closeSubmenu = useSubmenu((state) => state.closeSubmenu);

  const [avatar, setAvatar] = useState(currentUser?.details?.image);

  useEffect(() => {
    setAvatar(currentUser?.details?.image);
  }, [currentUser]);

  return (
    <Container onMouseOver={closeSubmenu}>
      <Box>
        <Wrapper>
          <Heading />
          <AccountInfo
            avatar={avatar}
            user={currentUser}
            accountModal={accountModal}
            emailModal={emailModal}
            fileModal={fileModal}
            passwordModal={passwordModal}
          />
        </Wrapper>
      </Box>
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  background-color: ${({ theme }) => theme.bg};
`;

const Box = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto;
  padding: 10rem 0;

  @media only screen and (max-width: 64em) {
    max-width: 100rem;
    padding: 8rem 0;
  }

  @media only screen and (max-width: 59.375em) {
    max-width: 80rem;
  }

  @media only screen and (max-width: 50em) {
    max-width: 70rem;
  }

  @media only screen and (max-width: 37.5em) {
    padding-left: 5rem;
    padding-right: 5rem;
  }

  @media only screen and (max-width: 25em) {
    padding-left: 3rem;
    padding-right: 3rem;
  }

  @media only screen and (max-width: 23.75em) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  @media only screen and (min-width: 112.5em) {
    max-width: 140rem;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
`;

export default Account;
