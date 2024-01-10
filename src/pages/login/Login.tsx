import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import AuthInfo from '../../components/form/AuthInfo';
import FormButton from '../../components/form/FormButton';
import FormBox from '../../components/form/FormBox';
import { StyledBox } from '../../components/form/StyledBox';
import Heading from '../../components/form/Heading';
import FormInput from '../../components/form/FormInput';
import Form from '../../components/form/Form';
import CheckBox from '../../components/form/CheckBox';
import Loader from '../../components/Loader';

import Forgot from './Forgot';
import SocialLogin from './SocialLogin';

import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';

import {
  getFromStorage,
  rememberKey,
  setToStorage,
  userKey,
} from '../../utils';
import { loginUser } from '../../services/authService';

interface FormData {
  username: string;
  password: string;
}

interface IErrors {
  username?: string;
  password?: string;
}

const initialState: FormData = {
  username: '',
  password: '',
};

const initialError: IErrors = {
  username: '',
  password: '',
};

const Login = () => {
  const navigate = useNavigate();

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

  const validateForm = (data: FormData) => {
    const tempErrors: IErrors = {};
    const { password, username } = data;

    if (username.trim() === '') {
      tempErrors.username = 'Username must not be empty';
    }

    if (password === '') {
      tempErrors.password = 'Password must not be empty';
    } else if (password.length < 8) {
      tempErrors.password = 'Password should be at least 8 characters long';
    }

    return tempErrors;
  };

  const onSubmitHandler = async () => {
    loginUserPending();

    try {
      const credentials = {
        ...data,
      };

      const res = await loginUser(credentials);
      loginUserFulfilled(res.data.details);

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
    validateForm
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
      navigate('/');
    }
  }, [isSuccess, navigate, user]);

  useEffect(() => {
    isError && toast.error(message);
  }, [isError, message]);

  useEffect(() => {
    return () => reset();
  }, [reset]);

  if (isLoading) {
    return (
      <Container>
        <Loader size='md' />
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
            login
          />
          <FormInput
            name='password'
            type='password'
            label='Password'
            value={data.password}
            placeholder='Enter your password'
            onChange={handleChange}
            error={errors.password}
            login
          />
          <CheckBox
            name='rememberMe'
            label='Remember me'
            checked={rememberMe}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRememberMe(e.currentTarget.checked)
            }
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
`;

const Text = styled.p`
  display: block;
  text-align: center;
  text-transform: lowercase;
  color: ${({ theme }) => theme.text};
`;

export default Login;
