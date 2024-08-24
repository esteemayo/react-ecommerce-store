import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import AuthInfo from '../../components/form/AuthInfo';
import Form from '../../components/form/Form';
import CheckBox from '../../components/form/CheckBox';
import Loader from '../../components/Loader';
import FormInput from '../../components/form/FormInput';
import FormBox from '../../components/form/FormBox';
import FormButton from '../../components/form/FormButton';
import Heading from '../../components/form/Heading';
import { StyledBox } from '../../components/form/StyledBox';

import Forgot from './Forgot';
import SocialLogin from './SocialLogin';

import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';

import { loginUser } from '../../services/authService';
import { validateLoginForm } from '../../validations/login';

import { LoginData, LoginErrors } from '../../types';
import {
  getFromStorage,
  rememberKey,
  setToStorage,
  userKey,
} from '../../utils';

const initialState: LoginData = {
  username: '',
  password: '',
};

const initialError: LoginErrors = {
  username: '',
  password: '',
};

const Login = () => {
  const {
    isError,
    isLoading,
    isSuccess,
    loginUserFulfilled,
    loginUserPending,
    loginUserRejected,
    message,
    reset,
    user,
  } = useAuth();

  const [rememberMe, setRememberMe] = useState(false);

  const handleChangeRememberMe = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setRememberMe(e.currentTarget.checked);
    },
    []
  );

  const onSubmitHandler = async () => {
    loginUserPending();

    try {
      const credentials = {
        ...data,
      };

      const res = await loginUser(credentials);
      loginUserFulfilled(res.data);

      setToStorage(rememberKey, rememberMe);
      setToStorage(userKey, rememberMe ? data : '');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: unknown | any) {
      loginUserRejected(err.response.data.message);
    }
  };

  const { errors, data, setData, handleChange, handleSubmit } = useForm(
    onSubmitHandler,
    initialState,
    initialError,
    validateLoginForm
  );

  useEffect(() => {
    const rememberMe = getFromStorage(rememberKey);
    const user = getFromStorage(userKey);

    const userData = {
      username: user?.username,
      password: user?.password,
    };

    setData(userData);
    setRememberMe(rememberMe);
  }, [setData]);

  useEffect(() => {
    if (isSuccess && user) {
      toast.success('Access granted!!!');
      window.location.reload();
    }
  }, [isSuccess, user]);

  useEffect(() => {
    isError && toast.error(message);
  }, [isError, message]);

  useEffect(() => {
    return () => reset();
  }, [reset]);

  if (isLoading) {
    return (
      <Container>
        <Loader size='md' title='Logging in...' />
      </Container>
    );
  }

  return (
    <FormBox>
      <StyledBox>
        <Heading small type='login' title='Log in with' />
        <SocialLogin />
        <Text>or</Text>
        <Form type='login' onSubmit={handleSubmit}>
          <FormInput
            name='username'
            label='Username'
            value={data.username}
            placeholder='Enter username'
            onChange={handleChange}
            error={errors.username}
            small
            autoFocus
          />
          <FormInput
            name='password'
            type='password'
            label='Password'
            value={data.password}
            placeholder='Enter your password'
            onChange={handleChange}
            error={errors.password}
            small
          />
          <CheckBox
            name='rememberMe'
            label='Remember me'
            checked={rememberMe}
            onChange={handleChangeRememberMe}
          />
          <FormButton label='Log in' disabled={isLoading} />
          <Forgot url='/forgot' label='Forgot your password?' />
        </Form>
      </StyledBox>
      <AuthInfo
        url='/register'
        text={`Don't have an account?`}
        label='Sign up'
      />
    </FormBox>
  );
};

const Container = styled.section`
  width: 100vw;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg};
`;

const Text = styled.p`
  display: block;
  text-align: center;
  text-transform: lowercase;
  color: ${({ theme }) => theme.text};
`;

export default Login;
