import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import FormButton from '../components/form/FormButton';
import Form from '../components/form/Form';
import FormInput from '../components/form/FormInput';
import FormBox from '../components/form/FormBox';
import { StyledBox } from '../components/form/StyledBox';
import Heading from '../components/form/Heading';

import { forgotPassword } from '../services/authService';
import { validateForgotForm } from '../validations/forgot';

import { ForgotErrors } from '../types';

const Forgot = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<ForgotErrors>({});

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const errors = validateForgotForm(email);
      if (Object.keys(errors).length > 0) return setErrors(errors);
      setErrors({});

      setIsLoading(true);

      try {
        const { data } = await forgotPassword({ email });
        console.log(data);
        navigate('/login');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: unknown | any) {
        console.log(err);
        toast.error(err.response.data.message);
      } finally {
        setIsLoading(false);
      }
    },
    [email, navigate]
  );

  return (
    <FormBox>
      <StyledBox>
        <Heading small title='Forgot password' />
        <Form onSubmit={handleSubmit}>
          <FormInput
            type='email'
            name='email'
            label='Email'
            value={email}
            placeholder='Enter email address'
            onChange={handleChange}
            error={errors.email}
            small
            autoFocus
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

export default Forgot;
