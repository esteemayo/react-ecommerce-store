import { useCallback, useMemo, useState } from 'react';

import FormButton from '../../components/form/FormButton';
import FormBox from '../../components/form/FormBox';
import { StyledBox } from '../../components/form/StyledBox';
import Heading from '../../components/form/Heading';
import FormInput from '../../components/form/FormInput';
import Select from '../../components/form/Select';
import TextArea from '../../components/form/TextArea';
import Form from '../../components/form/Form';
import { FormGroup } from '../../components/form/FormGroup';

import { selectInputs } from '../../data/formData';
import { useDarkMode } from '../../hooks/useDarkMode';

interface IErrors {
  name?: string;
  desc?: string;
  price?: string;
  priceDiscount?: string;
  numberInStock?: string;
  category?: string;
  tags?: string;
}

const initialState = {
  name: '',
  desc: '',
  price: '',
  priceDiscount: '',
  numberInStock: '',
  category: '',
};

const NewProduct = () => {
  const mode = useDarkMode((state) => state.mode);

  const [data, setData] = useState(initialState);
  const [files, setFiles] = useState<FileList | null>(null);
  const [size, setSize] = useState<string[]>([]);
  const [errors, setErrors] = useState<IErrors>({});
  const [tags, setTags] = useState<string[]>([]);
  const [color, setColor] = useState<string[]>([]);

  const handleChange = useCallback(
    ({
      target: input,
    }: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >) => {
      const { name, value } = input;
      setData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleColor = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value.split(','));
  }, []);

  const handleSize = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSize(e.target.value.split(','));
  }, []);

  const handleTags = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value.split(','));
  }, []);

  const handleFiles = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const selectedItems = target.files;
    setFiles(selectedItems);
  }, []);

  const validateForm = useCallback(() => {
    const errors: IErrors = {};
    const { name, desc, price, priceDiscount, numberInStock, category } = data;

    if (name.trim() === '') {
      errors.name = 'Product name must not be empty';
    }

    if (desc.trim() === '') {
      errors.desc = 'Product description must not be empty';
    }

    if (price === '') {
      errors.price = 'Price must not be empty';
    }

    if (priceDiscount === '') {
      errors.priceDiscount = 'Price discount must not be empty';
    }

    if (numberInStock === '') {
      errors.numberInStock = 'Number in stock must not be empty';
    }

    if (category.trim() === '') {
      errors.category = 'Category must not be empty';
    }

    if (tags.length < 1) {
      errors.tags = 'Please provide some tags';
    }

    return errors;
  }, [data, tags]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const errors = validateForm();
      if (Object.keys(errors).length > 0) return setErrors(errors);
      setErrors({});

      console.log({ ...data, files, color, size, tags });
    },
    [color, data, files, size, tags, validateForm]
  );

  const labelClasses = useMemo(() => {
    return `formLabel ${mode ? 'dark' : 'light'}`;
  }, [mode]);

  const { name, desc, category, price, numberInStock, priceDiscount } = data;

  return (
    <FormBox>
      <StyledBox>
        <Heading small title='Create new product' />
        <Form onSubmit={handleSubmit}>
          <FormInput
            name='name'
            label='Product name'
            value={name}
            placeholder='Enter product name'
            onChange={handleChange}
            error={errors.name}
            autoFocus
          />
          <TextArea
            name='desc'
            label='Description'
            value={desc}
            placeholder='Enter product description'
            onChange={handleChange}
            error={errors.desc}
          />
          <FormInput
            type='number'
            name='price'
            label='Price'
            value={price}
            placeholder='Enter product price'
            onChange={handleChange}
            error={errors.price}
          />
          <FormInput
            type='number'
            name='priceDiscount'
            label='Price discount'
            value={priceDiscount}
            placeholder='Enter price discount'
            onChange={handleChange}
            error={errors.priceDiscount}
          />
          <FormInput
            type='number'
            name='numberInStock'
            label='Number in stock'
            value={numberInStock}
            placeholder='Enter number in stock'
            onChange={handleChange}
            error={errors.numberInStock}
          />
          <FormInput
            name='color'
            label='Color'
            value={color}
            placeholder='Separate the color with commas'
            onChange={handleColor}
          />
          <FormInput
            name='size'
            label='Size'
            value={size}
            placeholder='Separate the size with commas'
            onChange={handleSize}
          />
          <Select
            name='category'
            label='Select category'
            value={category}
            defaultText='Select a category'
            onChange={handleChange}
            data={selectInputs}
            error={errors.category}
          />
          <FormInput
            name='tags'
            label='Product tags'
            value={tags}
            placeholder='Separate the tags with commas'
            onChange={handleTags}
            error={errors.tags}
          />
          <FormGroup>
            <label className={labelClasses}>Attach images</label>
            <input
              type='file'
              id='file'
              accept='image/*'
              onChange={handleFiles}
              multiple
            />
          </FormGroup>
          <FormButton label='Create' />
        </Form>
      </StyledBox>
    </FormBox>
  );
};

export default NewProduct;
