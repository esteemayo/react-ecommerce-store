import { Fragment } from 'react';

import FormInput from '../form/FormInput';

import { RegisterInfoProps } from '../../types';
import { registerInputs } from '../../data/formData';

const RegisterInfo = ({ data, errors, onChange }: RegisterInfoProps) => {
  return (
    <>
      {registerInputs.map((item) => {
        const { info } = item;
        return (
          <Fragment key={new Date().getTime()}>
            {info.map((input) => {
              const { id, name, type, label, placeholder } = input;
              return (
                <FormInput
                  key={id}
                  id={id}
                  name={name}
                  type={type}
                  label={label}
                  value={data[name as keyof typeof data]}
                  placeholder={placeholder}
                  onChange={onChange}
                  error={errors[name as keyof typeof errors]}
                />
              );
            })}
          </Fragment>
        );
      })}
    </>
  );
};

export default RegisterInfo;
