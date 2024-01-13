import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import FormButton from '../components/form/FormButton';
import FormBox from '../components/form/FormBox';
import FormInput from '../components/form/FormInput';
import Form from '../components/form/Form';
import { StyledBox } from '../components/form/StyledBox';
import Heading from '../components/form/Heading';

import { forgotPassword } from '../services/authService';

interface IErrors {
  email?: string;
}

const Forgot = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<IErrors>({});

  const validateForm = useCallback(() => {
    const errors: IErrors = {};

    if (!email) {
      errors.email = 'Please enter your email address';
    } else {
      const regEx =
        /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)*[a-zA-Z]{2,9})$/;
      if (!email.match(regEx)) {
        errors.email = 'Email must be a valid email address';
      }
    }

    return errors;
  }, [email]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const errors = validateForm();
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
    [email, navigate, validateForm]
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            error={errors.email}
            autoFocus
            small
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
