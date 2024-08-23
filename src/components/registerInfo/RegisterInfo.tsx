import FormInput from '../form/FormInput';
import { RegisterInfoProps } from '../../types';

const RegisterInfo = ({
  name,
  email,
  username,
  phone,
  errors,
  onChange,
}: RegisterInfoProps) => {
  return (
    <>
      <FormInput
        id='name'
        name='name'
        type='text'
        label='Name'
        value={name}
        placeholder='Enter your name'
        onChange={onChange}
        error={errors.name}
      />
      <FormInput
        id='email'
        name='email'
        type='email'
        label='Email'
        value={email}
        placeholder='Enter email address'
        onChange={onChange}
        error={errors.email}
      />
      <FormInput
        id='username'
        name='username'
        type='text'
        label='Username'
        value={username}
        placeholder='Enter username'
        onChange={onChange}
        error={errors.username}
      />
      <FormInput
        id='phone'
        name='phone'
        type='tel'
        label='Phone'
        value={phone}
        placeholder='Enter your telephone number'
        onChange={onChange}
        error={errors.phone}
      />
    </>
  );
};

export default RegisterInfo;
