import styled from 'styled-components';
import { useEffect, useRef } from 'react';

interface AccountHeadProps {
  onOpen(): void;
  onAction(): void;
}

const AccountHead = ({ onOpen, onAction }: AccountHeadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Container>
      <Wrapper>
        <Label htmlFor='accName'>Your name</Label>
        <Input
          type='text'
          id='accName'
          name='name'
          placeholder='Name'
          ref={inputRef}
        />
      </Wrapper>
      <Wrapper>
        <Label htmlFor='accUsername'>Your username</Label>
        <Input
          type='text'
          id='accUsername'
          name='username'
          placeholder='Username'
        />
      </Wrapper>
      <Wrapper>
        <Label htmlFor='accEmail'>Email address</Label>
        <Input type='email' id='accEmail' name='email' placeholder='Email' />
        <ButtonContainer>
          <Button type='button' onClick={onOpen}>
            Change
          </Button>
        </ButtonContainer>
      </Wrapper>
      <Wrapper>
        <Label htmlFor='accPassword'>Password</Label>
        <Input
          type='password'
          id='accPassword'
          name='password'
          placeholder='********'
        />
        <ButtonContainer>
          <Button type='button' onClick={onAction}>
            Change
          </Button>
        </ButtonContainer>
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
    color: #bbb;
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
  outline-color: #ccc;
  cursor: pointer;
`;

export default AccountHead;
