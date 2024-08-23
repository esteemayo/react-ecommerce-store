import { toast } from 'react-toastify';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import Form from '../../components/form/Form';
import FormButton from '../../components/form/FormButton';
import FormBox from '../../components/form/FormBox';
import { StyledBox } from '../../components/form/StyledBox';
import Heading from '../../components/form/Heading';
import UploadProgress from '../../components/form/UploadProgress';
import AuthInfo from '../../components/form/AuthInfo';
import { UploadContainer } from '../../components/form/UploadContainer';
import FormInput from '../../components/form/FormInput';

import Loader from '../../components/Loader';
import CountrySelect from '../../components/inputs/CountrySelect';

import { useAuth } from '../../hooks/useAuth';
import { useCountries } from '../../hooks/useCountries';

import { registerUser } from '../../services/authService';
import { validateRegisterForm } from '../../validations/register';

import app from '../../firebase';
import { RegisterData, RegisterErrors } from '../../types';

const enum STEPS {
  INFO = 0,
  PASSWORD = 1,
}

const initialState: RegisterData = {
  name: '',
  email: '',
  username: '',
  phone: '',
  password: '',
  confirmPassword: '',
  country: '',
};

const Register = () => {
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

  const [file, setFile] = useState<File | null>(null);
  const [perc, setPerc] = useState(0);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [step, setStep] = useState(STEPS.INFO);
  const [data, setData] = useState(initialState);

  const handleNext = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setStep((value) => {
      return value + 1;
    });
  }, []);

  const handlePrev = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setStep((value) => {
      return value - 1;
    });
  }, []);

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
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPerc(progress);
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

      const errors = validateRegisterForm(data);
      if (Object.keys(errors).length > 0) return setErrors(errors);
      setErrors({});

      registerUserPending();

      try {
        const credentials = {
          ...data,
        };

        const res = await registerUser(credentials);
        registerUserFulfilled(res.data);
        handleClear();
        window.location.reload();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: unknown | any) {
        registerUserRejected(err.response.data.message);
      }
    },
    [
      data,
      handleClear,
      registerUserPending,
      registerUserRejected,
      registerUserFulfilled,
    ]
  );

  useEffect(() => {
    file && uploadFile(file);
  }, [file, uploadFile]);

  useEffect(() => {
    if (isSuccess && user) {
      toast.success('Account successfully created!!!');
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
        <Loader size='md' title='Creating your account...' />
      </Container>
    );
  }

  let bodyContent: JSX.Element | undefined;

  bodyContent = (
    <>
      <FormInput
        id='name'
        name='name'
        type='text'
        label='Name'
        value={data.name}
        placeholder='Enter your name'
        onChange={handleChange}
        error={errors.name}
      />
      <FormInput
        id='email'
        name='email'
        type='email'
        label='Email'
        value={data.email}
        placeholder='Enter email address'
        onChange={handleChange}
        error={errors.email}
      />
      <FormInput
        id='username'
        name='username'
        type='text'
        label='Username'
        value={data.username}
        placeholder='Enter username'
        onChange={handleChange}
        error={errors.username}
      />
      <FormInput
        id='phone'
        name='phone'
        type='tel'
        label='Phone'
        value={data.phone}
        placeholder='Enter your telephone number'
        onChange={handleChange}
        error={errors.phone}
      />
    </>
  );

  if (step === STEPS.PASSWORD) {
    bodyContent = (
      <>
        <FormInput
          id='password'
          name='password'
          type='password'
          label='Password'
          value={data.password}
          placeholder='Enter your password'
          onChange={handleChange}
          error={errors.password}
        />
        <FormInput
          id='confirmPassword'
          name='confirmPassword'
          type='password'
          label='Confirm Password'
          value={data.password}
          placeholder='Confirm your password'
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
          <UploadContainer>
            <label htmlFor='file'>Attach a photo</label>
            <input
              id='file'
              type='file'
              accept='image/*'
              onChange={handleFile}
            />
          </UploadContainer>
        )}
      </>
    );
  }

  return (
    <FormBox>
      <StyledBox>
        <Heading small title='Register your account' />
        <Form onSubmit={handleSubmit}>
          {bodyContent}
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
