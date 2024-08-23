import UploadProgress from '../form/UploadProgress';
import FormInput from '../form/FormInput';
import { UploadContainer } from '../form/UploadContainer';
import CountrySelect from '../inputs/CountrySelect';

import { useCountries } from '../../hooks/useCountries';

const RegisterPassword = ({
  password,
  confirmPassword,
  country,
  percentage,
  errors,
  onChange,
  onChangeCountry,
  onChangeFile,
}) => {
  const { getAll } = useCountries();
  return (
    <>
      <FormInput
        id='password'
        name='password'
        type='password'
        label='Password'
        value={password}
        placeholder='Enter your password'
        onChange={onChange}
        error={errors.password}
      />
      <FormInput
        id='confirmPassword'
        name='confirmPassword'
        type='password'
        label='Confirm Password'
        value={confirmPassword}
        placeholder='Confirm your password'
        onChange={onChange}
        error={errors.confirmPassword}
      />
      <CountrySelect
        name='country'
        label='Country'
        value={country}
        data={getAll()}
        onChange={onChangeCountry}
        error={errors.country}
      />
      {percentage > 0 && percentage < 100 ? (
        <UploadProgress percentage={percentage} />
      ) : (
        <UploadContainer>
          <label htmlFor='file'>Attach a photo</label>
          <input
            id='file'
            type='file'
            accept='image/*'
            onChange={onChangeFile}
          />
        </UploadContainer>
      )}
    </>
  );
};

export default RegisterPassword;
