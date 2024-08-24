import FormInput from '../form/FormInput';

import { RegisterInfoProps } from '../../types';
import { registerInfoInputs } from '../../data/formData';

const RegisterInfo = ({ data, errors, onChange }: RegisterInfoProps) => {
  return (
    <>
      {registerInfoInputs.map((input) => {
        const { id, name, type, label, placeholder } = input;
        return (
          <FormInput
            key={id}
            id={id}
            name={name}
            type={type}
            label={label}
            placeholder={placeholder}
            value={data[name as keyof typeof data]}
            onChange={onChange}
            error={errors[name as keyof typeof errors]}
            autoFocus={name === 'name' ? true : false}
          />
        );
      })}
    </>
  );
};

export default RegisterInfo;
