import styled from 'styled-components';

import { AccountHeadProps } from '../../types';

const AccountHead = ({ currentUser, onOpen, onAction }: AccountHeadProps) => {
  return (
    <Container>
      <Wrapper>
        <Label htmlFor='accName'>Your name</Label>
        <Input
          type='text'
          id='accName'
          name='name'
          value={currentUser.details.name}
          placeholder={currentUser.details.name}
          readOnly
        />
      </Wrapper>
      <Wrapper>
        <Label htmlFor='accUsername'>Your username</Label>
        <Input
          type='text'
          id='accUsername'
          name='username'
          value={currentUser.details.username}
          placeholder={currentUser.details.username}
          readOnly
        />
      </Wrapper>
      <Wrapper>
        <Label htmlFor='accEmail'>Email address</Label>
        <Input
          type='email'
          id='accEmail'
          name='email'
          value={currentUser.details.email}
          placeholder={currentUser.details.email}
          readOnly
        />
        {!currentUser.details.fromGoogle &&
          !currentUser.details.fromFacebook && (
            <ButtonContainer>
              <Button type='button' onClick={onOpen}>
                Change
              </Button>
            </ButtonContainer>
          )}
      </Wrapper>
      <Wrapper>
        <Label htmlFor='accPassword'>Password</Label>
        <Input
          type='password'
          id='accPassword'
          name='password'
          placeholder='********'
          readOnly
        />
        {!currentUser.details.fromGoogle &&
          !currentUser.details.fromFacebook && (
            <ButtonContainer>
              <Button type='button' onClick={onAction}>
                Change
              </Button>
            </ButtonContainer>
          )}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  &:not(:last-of-type) {
    margin-bottom: 1.5rem;
  }
`;

const Label = styled.label`
  display: inline-block;
  width: 10.5rem;
  text-transform: capitalize;
  font-weight: 600;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.textLabel};

  @media only screen and (min-width: 112.5em) {
    font-size: 2rem;
  }
`;

const Input = styled.input`
  display: inline-block;
  font-family: inherit;
  font-size: 1.5rem;
  width: 100%;
  padding: 0.9rem 1rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textInput};
  border: 2px solid #f3f4f6;
  border-radius: 0.5rem;
  outline-color: ${({ theme }) => theme.inputOut};
  caret-color: ${({ theme }) => theme.inputCaret};

  &::-webkit-input-placeholder {
    font-weight: 300;
    font-size: 1.5rem;
    color: ${({ theme }) => theme.textRevPlace};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
`;

const Button = styled.button`
  border: none;
  display: inline-block;
  text-transform: capitalize;
  font-size: 1.2rem;
  background-color: transparent;
  color: ${({ theme }) => theme.textAccBtn};
  outline-offset: 3px;
  outline-color: ${({ theme }) => theme.btnRevOut};
  cursor: pointer;
`;

export default AccountHead;
