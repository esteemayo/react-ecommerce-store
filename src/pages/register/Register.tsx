import { toast } from 'react-toastify';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

import AuthInfo from '../../components/form/AuthInfo';
import Form from '../../components/form/Form';
import FormButton from '../../components/form/FormButton';
import FormBox from '../../components/form/FormBox';
import { StyledBox } from '../../components/form/StyledBox';
import Heading from '../../components/form/Heading';

import RegisterInfo from '../../components/registerInfo/RegisterInfo';
import Loader from '../../components/Loader';
import RegisterPassword from '../../components/registerPassword/RegisterPassword';
import SlideButtons from '../../components/slideButtons/SlideButtons';

import { registerUser } from '../../services/authService';
import { useAuth } from '../../hooks/useAuth';
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

  const isNextBtn = useMemo(() => {
    return step === STEPS.PASSWORD && true;
  }, [step]);

  const isPrevBtn = useMemo(() => {
    return step === STEPS.INFO && true;
  }, [step]);

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
    <RegisterInfo data={data} errors={errors} onChange={handleChange} />
  );

  if (step === STEPS.PASSWORD) {
    bodyContent = (
      <RegisterPassword
        password={data.password}
        confirmPassword={data.confirmPassword}
        country={data.country}
        percentage={perc}
        errors={errors}
        onChange={handleChange}
        onChangeCountry={handleChangeCountry}
        onChangeFile={handleFile}
      />
    );
  }

  return (
    <FormBox>
      <StyledBox>
        <Heading small title='Register your account' />
        <Form onSubmit={handleSubmit}>
          {bodyContent}
          <SlideButtons
            isNextBtn={isNextBtn}
            isPrevBtn={isPrevBtn}
            onNext={handleNext}
            onPrev={handlePrev}
          />
          {step === STEPS.PASSWORD && (
            <FormButton
              label='Register'
              disabled={(perc > 0 && perc < 100) || isLoading}
            />
          )}
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
