import styled from 'styled-components';

import { usePasswordModal } from '../../hooks/usePasswordModal';
import { useAuth } from '../../hooks/useAuth';
import { useEmailModal } from '../../hooks/useEmailModal';
import { useSubmenu } from '../../hooks/useSubmenu';
import { useAccountModal } from '../../hooks/useAccountModal';
import { useFileModal } from '../../hooks/useFileModal';

import Heading from './Heading';
import AccountInfo from './AccountInfo';
import { useEffect, useState } from 'react';
import { getCurrentUserData } from '../../services/userService';

const Account = () => {
  const closeSubmenu = useSubmenu((state) => state.closeSubmenu);
  const emailModal = useEmailModal();
  const passwordModal = usePasswordModal();
  const fileModal = useFileModal();
  const currentUser = useAuth((state) => state.user);
  const accountModal = useAccountModal();

  const [avatar, setAvatar] = useState(currentUser?.details.image);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getCurrentUserData();
        setAvatar(data?.image);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

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
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
`;

export default Account;
