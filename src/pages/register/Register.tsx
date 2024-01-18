import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import AuthInfo from '../../components/form/AuthInfo';
import FormButton from '../../components/form/FormButton';
import FormBox from '../../components/form/FormBox';
import { StyledBox } from '../../components/form/StyledBox';
import Heading from '../../components/form/Heading';
import UploadProgress from '../../components/form/UploadProgress';
import FormInput from '../../components/form/FormInput';
import FormUpload from '../../components/form/FormUpload';
import Form from '../../components/form/Form';

import Loader from '../../components/Loader';
import CountrySelect from '../../components/inputs/CountrySelect';

import { useAuth } from '../../hooks/useAuth';
import { useCountries } from '../../hooks/useCountries';

import app from '../../firebase';
import { registerUser } from '../../services/authService';

interface IErrors {
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  country?: string;
}

const initialState = {
  name: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  country: '',
};

const Register = () => {
  const navigate = useNavigate();

  const { getAll } = useCountries();
  const {
    isError,
    isLoading,
    isSuccess,
    registerUserFulfilled,
    registerUserPending,
    registerUserRejected,
    message,
    reset,
    user,
  } = useAuth();

  const [perc, setPerc] = useState(0);
  const [data, setData] = useState(initialState);
  const [file, setFile] = useState<File>();
  const [errors, setErrors] = useState<IErrors>({});

  const handleChange = useCallback(
    ({ target: input }: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = input;
      setData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleChangeCountry = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const target = event?.target;
      setData((prev) => ({ ...prev, [target?.name]: target.value }));
    },
    []
  );

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const item = (target.files as FileList)[0];
    setFile(item);
  }, []);

  const validateForm = useCallback(() => {
    const errors: IErrors = {};
    const { name, email, username, password, confirmPassword, country } = data;

    if (name.trim() === '') {
      errors.name = 'Name must not be empty';
    }

    if (email.trim() === '') {
      errors.email = 'Email must not be empty';
    } else {
      const regEx =
        /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)*[a-zA-Z]{2,9})$/;
      if (!email.match(regEx)) {
        errors.email = 'Email must be a valid email address';
      }
    }

    if (username.trim() === '') {
      errors.username = 'Username must not be empty';
    }

    if (password === '') {
      errors.password = 'Password must not be empty';
    } else if (password.length < 8) {
      errors.password = 'Password should be at least 8 characters long';
    } else if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your new password';
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (country.trim() === '') {
      errors.country = 'Country must not be empty';
    }

    return errors;
  }, [data]);

  const handleClear = useCallback(() => {
    setData(initialState);
  }, []);

  const uploadFile = useCallback((file: File) => {
    const fileName = `${new Date().getTime()}-${file?.name}`;

    const storage = getStorage(app);
    const storageRef = ref(storage, `users/${fileName}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setPerc(Math.round(progress));
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (err: unknown) => {
        console.log(err);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setData((prev) => ({ ...prev, image: downloadURL }));
        });
      }
    );
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const errors = validateForm();
      if (Object.keys(errors).length > 0) return setErrors(errors);
      setErrors({});

      registerUserPending();

      try {
        const credentials = {
          ...data,
        };

        const res = await registerUser(credentials);
        console.log(res);
        registerUserFulfilled(res.data);
        console.log({ ...data, file });
        handleClear();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: unknown | any) {
        registerUserRejected(err.response.data.message);
      }
    },
    [
      data,
      file,
      handleClear,
      registerUserPending,
      registerUserRejected,
      registerUserFulfilled,
      validateForm,
    ]
  );

  useEffect(() => {
    file && uploadFile(file);
  }, [file, uploadFile]);

  useEffect(() => {
    if (isSuccess && user) {
      toast.success('Account successfully created!!!');
      navigate('/login');
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
        <Heading small title='Register your account' />
        <Form onSubmit={handleSubmit}>
          <FormInput
            id='name'
            name='name'
            label='Name'
            placeholder='Enter your name'
            value={data.name}
            onChange={handleChange}
            error={errors.name}
            small
          />
          <FormInput
            id='email'
            name='email'
            type='email'
            label='Email'
            placeholder='Enter email address'
            value={data.email}
            onChange={handleChange}
            error={errors.email}
            small
          />
          <FormInput
            id='username'
            name='username'
            label='username'
            placeholder='Enter username'
            value={data.username}
            onChange={handleChange}
            error={errors.username}
            small
          />
          <FormInput
            id='password'
            name='password'
            type='password'
            label='Password'
            placeholder='Enter your password'
            value={data.password}
            onChange={handleChange}
            error={errors.password}
            small
          />
          <FormInput
            id='confirmPassword'
            name='confirmPassword'
            type='password'
            label='Confirm Password'
            placeholder='Confirm your password'
            value={data.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
          <CountrySelect
            name='country'
            label='Country'
            value={data.country}
            data={getAll()}
            onChange={handleChangeCountry}
            error={errors.country}
          />
          {perc > 0 && perc < 100 ? (
            <UploadProgress percentage={perc} />
          ) : (
            <FormUpload
              id='file'
              accept='image/*'
              label='Attach a photo'
              onChange={handleFile}
            />
          )}
          <FormButton
            label='Register'
            disabled={(perc > 0 && perc < 100) || isLoading}
          />
        </Form>
      </StyledBox>
      <AuthInfo url='/login' text='Already have an account?' label='Sign in' />
    </FormBox>
  );
};

const Container = styled.section`
  width: 100vw;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.bg};
`;

export default Register;
