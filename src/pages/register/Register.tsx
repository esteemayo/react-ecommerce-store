import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import AuthInfo from '../../components/form/AuthInfo';
import FormButton from '../../components/form/FormButton';
import FormBox from '../../components/form/FormBox';
import { StyledBox } from '../../components/form/StyledBox';
import Heading from '../../components/form/Heading';
import UploadProgress from '../../components/form/UploadProgress';
import FormInput from '../../components/form/FormInput';
import FormUpload from '../../components/form/FormUpload';
import Form from '../../components/form/Form';
import CountrySelect from '../../components/inputs/CountrySelect';

import { registerInputs } from '../../data/formData';
import { useAuth } from '../../hooks/useAuth';
import { useCountries } from '../../hooks/useCountries';

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
    user,
    isLoading,
    isSuccess,
    registerUserFailure,
    registerUserPending,
    registerUserSuccess,
    reset,
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
        registerUserSuccess(res.data.details);
        console.log({ ...data, file });
        handleClear();
      } catch (err: unknown) {
        registerUserFailure(err.response.data.message);
      }
    },
    [
      data,
      file,
      handleClear,
      registerUserFailure,
      registerUserPending,
      registerUserSuccess,
      validateForm,
    ]
  );

  useEffect(() => {
    isSuccess && user && navigate('/login');
  }, [isSuccess, navigate, user]);

  useEffect(() => {
    return () => reset();
  }, [reset]);

  return (
    <FormBox>
      <StyledBox>
        <Heading small title='Register your account' />
        <Form onSubmit={handleSubmit}>
          {registerInputs.map((input) => {
            const { id, name, type, label, placeholder } = input;
            return (
              <FormInput
                key={id}
                name={name}
                type={type}
                label={label}
                value={data[name]}
                placeholder={placeholder}
                onChange={handleChange}
                autoFocus={name === 'name' ? true : false}
                error={errors[name]}
              />
            );
          })}
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
            <>
              <FormUpload
                id='file'
                accept='image/*'
                label='Attach a photo'
                onChange={handleFile}
              />
            </>
          )}
          <FormButton
            label='Register'
            loading={isLoading}
            disabled={(perc > 0 && perc < 100) || isLoading}
          />
        </Form>
      </StyledBox>
      <AuthInfo url='/login' text='Already have an account?' label='Sign in' />
    </FormBox>
  );
};

export default Register;
