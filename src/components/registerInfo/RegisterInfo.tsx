import FormInput from '../form/FormInput';
import TextArea from '../form/TextArea';

const RegisterInfo = ({
  name,
  desc,
  price,
  numberInStock,
  errors,
  onChange,
}) => {
  return (
    <>
      <FormInput
        name='name'
        label='Product name'
        value={name}
        placeholder='Enter product name'
        onChange={onChange}
        error={errors.name}
        autoFocus
      />
      <TextArea
        name='desc'
        label='Description'
        value={desc}
        placeholder='Enter product description'
        onChange={onChange}
        error={errors.desc}
      />
      <FormInput
        type='number'
        name='price'
        label='Price'
        min={1}
        value={price}
        placeholder='Enter product price'
        onChange={onChange}
        error={errors.price}
      />
      <FormInput
        type='number'
        name='priceDiscount'
        label='Price discount'
        min={1}
        value={priceDiscount}
        placeholder='Enter price discount'
        onChange={onChange}
        error={errors.priceDiscount}
      />
      <FormInput
        type='number'
        name='numberInStock'
        label='Number in stock'
        min={1}
        value={numberInStock}
        placeholder='Enter number in stock'
        onChange={onChange}
        error={errors.numberInStock}
      />
    </>
  );
};

export default RegisterInfo;
