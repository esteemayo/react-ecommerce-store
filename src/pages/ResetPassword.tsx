import FormButton from '../components/form/FormButton';
import FormBox from '../components/form/FormBox';
import FormInput from '../components/form/FormInput';
import Form from '../components/form/Form';
import { StyledBox } from '../components/form/StyledBox';
import Heading from '../components/form/Heading';

import { useForm } from '../hooks/useForm';

interface FormData {
  password: string;
  confirmPassword: string;
}

interface IErrors {
  password?: string;
  confirmPassword?: string;
}

const initialState: FormData = {
  password: '',
  confirmPassword: '',
};

const initialError: IErrors = {
  password: '',
  confirmPassword: '',
};

const ResetPassword = () => {
  const validateForm = (data: FormData) => {
    const tempErrors: IErrors = {};
    const { password, confirmPassword } = data;

    if (password === '') {
      tempErrors.password = 'Please enter your new password';
    } else if (password.length < 8) {
      tempErrors.password = 'Password should be at least 8 characters long';
    } else if (confirmPassword === '') {
      tempErrors.confirmPassword = 'Please confirm your new password';
    } else if (password !== confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
    }

    return tempErrors;
  };

  const onSubmitHandler = () => {
    console.log({ ...data });
  };

  const { errors, data, handleChange, handleSubmit } = useForm(
    onSubmitHandler,
    initialState,
    initialError,
    validateForm
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
          <FormButton label='Reset password' />
        </Form>
      </StyledBox>
    </FormBox>
  );
};

export default ResetPassword;
