import { toast } from 'react-toastify';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import FormButton from '../components/form/FormButton';
import FormBox from '../components/form/FormBox';
import FormInput from '../components/form/FormInput';
import Form from '../components/form/Form';
import { StyledBox } from '../components/form/StyledBox';
import Heading from '../components/form/Heading';

import { resetPassword } from '../services/authService';
import { useForm } from '../hooks/useForm';
import { validateResetPasswordForm } from '../validations/resetPassword';
import { ResetPasswordData, ResetPasswordErrors } from '../types';

const initialState: ResetPasswordData = {
  password: '',
  confirmPassword: '',
};

const initialError: ResetPasswordErrors = {
  password: '',
  confirmPassword: '',
};

const ResetPassword = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmitHandler = async () => {
    setIsLoading(true);

    try {
      const token = pathname.split('/').pop();

      const credentials = {
        ...data,
      };

      await resetPassword(token, credentials);
      toast.success('Successfully changed your password!!!');
      navigate('/login');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: unknown | any) {
      console.log(err.response.data.message);
      toast.error(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const { errors, data, handleChange, handleSubmit } = useForm(
    onSubmitHandler,
    initialState,
    initialError,
    validateResetPasswordForm
  );

  return (
    <FormBox>
      <StyledBox>
        <Heading small title='Reset your password' />
        <Form onSubmit={handleSubmit}>
          <FormInput
            type='password'
            name='password'
            label='Password'
            value={data.password}
            placeholder='Enter your password'
            onChange={handleChange}
            error={errors.password}
            small
            autoFocus
          />
          <FormInput
            type='password'
            name='confirmPassword'
            label='Confirm password'
            placeholder='Confirm your password'
            value={data.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
          <FormButton
            label='Reset password'
            disabled={isLoading}
            loading={isLoading}
          />
        </Form>
      </StyledBox>
    </FormBox>
  );
};

export default ResetPassword;
