import { useCallback, useState } from 'react';

export const useForm = <T extends object, U extends object>(
  callback: () => void,
  initialState: T,
  initialError: U,
  validate: (data: T) => U,
  onClose?: () => void
) => {
  const [data, setData] = useState<T>(initialState);
  const [errors, setErrors] = useState<U>(initialError);

  const handleClose = useCallback(() => {
    setData(initialState);
    onClose?.();
    errors && setErrors(initialError);
  }, [errors, initialError, initialState, onClose]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    ({ target: input }) => {
      const { name, value } = input;
      setData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (Object.keys(validate(data)).length > 0) {
        setErrors(validate(data));
        return;
      }
      setErrors(initialError);

      callback();
      setData(initialState);
    },
    [callback, data, initialError, initialState, validate]
  );

  return {
    data,
    errors,
    setData,
    handleClose,
    handleChange,
    handleSubmit,
  };
};
