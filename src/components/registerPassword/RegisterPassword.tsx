import UploadProgress from '../form/UploadProgress';
import FormInput from '../form/FormInput';
import { UploadContainer } from '../form/UploadContainer';
import CountrySelect from '../inputs/CountrySelect';

import { useCountries } from '../../hooks/useCountries';
import { RegisterPasswordProps } from '../../types';
import { registerPasswordInputs } from '../../data/formData';

const RegisterPassword = ({
  data,
  percentage,
  errors,
  onChange,
  onChangeCountry,
  onChangeFile,
}: RegisterPasswordProps) => {
  const { getAll } = useCountries();

  return (
    <>
      {registerPasswordInputs.map(input => {
        const { id, name, type, label, placeholder } = input
        return (
          <FormInput
            id={id}
            name={name}
            type={type}
            label={label}
            value={data[name as keyof typeof data]}
            placeholder={placeholder}
            onChange={onChange}
            error={errors[name as keyof typeof errors]}
          />
        )
      })}
      <CountrySelect
        name='country'
        label='Country'
        value={data.country}
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
