import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  UploadTask,
} from 'firebase/storage';

import FormInput from '../../components/form/FormInput';
import Form from '../../components/form/Form';
import FormButton from '../../components/form/FormButton';
import Select from '../../components/form/Select';
import { StyledBox } from '../../components/form/StyledBox';
import Heading from '../../components/form/Heading';
import UploadProgress from '../../components/form/UploadProgress';
import FormBox from '../../components/form/FormBox';
import { UploadContainer } from '../../components/form/UploadContainer';
import TextArea from '../../components/form/TextArea';

import { useDarkMode } from '../../hooks/useDarkMode';
import { validateProductForm } from '../../validations/product';

import { createProduct } from '../../services/productService';
import { getCategories } from '../../services/categoryService';

import app from '../../firebase';
import { ProductData, ProductErrors } from '../../types';

interface IFile {
  id?: number;
  lastModified: number;
  lastModifiedDate?: Date;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

const initialState: ProductData = {
  name: '',
  desc: '',
  price: '',
  priceDiscount: '',
  numberInStock: '',
  category: '',
};

const NewProduct = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const mode = useDarkMode((state) => state.mode);

  const [data, setData] = useState(initialState);
  const [files, setFiles] = useState<IFile[]>([]);
  const [size, setSize] = useState<string[]>([]);
  const [color, setColor] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [errors, setErrors] = useState<ProductErrors>({});
  const [progress, setProgress] = useState(0);
  const [urls, setUrls] = useState<string[]>([]);

  const { isLoading, data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await getCategories();
      return data;
    },
  });

  const { isPending, isSuccess, mutate } = useMutation({
    mutationFn: async ({ product }: { product: object }) => {
      const { data } = await createProduct(product);
      return data;
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

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
    const files = target.files!;

    for (let i = 0; i < files.length; i++) {
      const newFile: IFile = files[i];
      newFile['id'] = Math.random();
      setFiles((prev) => [...prev, newFile]);
    }
  }, []);

  const uploadFile = useCallback(() => {
    const lists: UploadTask[] = [];

    files.map((file) => {
      const fileName = `${file.id}-${file.name}`;

      const storage = getStorage(app);
      const storageRef = ref(storage, `products/${fileName}`);

      const uploadTask = uploadBytesResumable(storageRef, file);
      lists.push(uploadTask);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (err: unknown) => {
          console.log(err);
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setUrls((prev) => [...prev, downloadURL]);
          });
        }
      );
    });

    Promise.all(lists)
      .then((res) => res.length > 0 && toast.success('All images uploaded!!!'))
      .catch((err) => console.log(err));
  }, [files]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const errors = validateProductForm(data, tags);
      if (Object.keys(errors).length > 0) return setErrors(errors);
      setErrors({});

      const product = {
        ...data,
        color,
        size,
        tags,
        ...(urls.length > 0 && { images: urls }),
      };

      mutate({ product });
      toast.success('Product added!!!');
    },
    [color, data, mutate, size, tags, urls]
  );

  const labelClasses = useMemo(() => {
    return `formLabel ${mode ? 'dark' : 'light'}`;
  }, [mode]);

  const disabledBtn = useMemo(() => {
    const disabled = isPending || (progress > 0 && progress < 100);
    return !!disabled;
  }, [isPending, progress]);

  useEffect(() => {
    files && uploadFile();
  }, [files, uploadFile]);

  useEffect(() => {
    isSuccess && navigate('/products');
  }, [isSuccess, navigate]);

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
            min={1}
            value={price}
            placeholder='Enter product price'
            onChange={handleChange}
            error={errors.price}
          />
          <FormInput
            type='number'
            name='priceDiscount'
            label='Price discount'
            min={1}
            value={priceDiscount}
            placeholder='Enter price discount'
            onChange={handleChange}
            error={errors.priceDiscount}
          />
          <FormInput
            type='number'
            name='numberInStock'
            label='Number in stock'
            min={1}
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
            data={categories}
            loading={isLoading}
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
          {progress > 0 && progress < 100 ? (
            <UploadProgress percentage={progress} />
          ) : (
            <UploadContainer>
              <label htmlFor='file' className={labelClasses}>
                Attach images
              </label>
              <input
                type='file'
                id='file'
                accept='image/*'
                onChange={handleFiles}
                multiple
              />
            </UploadContainer>
          )}
          <FormButton
            label='Create'
            disabled={disabledBtn}
            loading={isPending}
          />
        </Form>
      </StyledBox>
    </FormBox>
  );
};

export default NewProduct;
