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

import Heading from '../../components/form/Heading';
import Form from '../../components/form/Form';
import FormButton from '../../components/form/FormButton';
import FormBox from '../../components/form/FormBox';
import SlideButtons from '../../components/slideButtons/SlideButtons';

import ProductInfo from '../../components/productInfo/ProductInfo';
import { StyledBox } from '../../components/form/StyledBox';
import ProductImages from '../../components/productImages/ProductImages';

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

const enum STEPS {
  INFO = 0,
  IMAGES = 1,
}

const initialState: ProductData = {
  name: '',
  desc: '',
  price: 0,
  priceDiscount: 0,
  numberInStock: 0,
  category: '',
};

const NewProduct = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const mode = useDarkMode((state) => state.mode);

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

  const [progress, setProgress] = useState(0);
  const [data, setData] = useState(initialState);
  const [step, setStep] = useState(STEPS.INFO);
  const [files, setFiles] = useState<IFile[]>([]);
  const [size, setSize] = useState<string[]>([]);
  const [color, setColor] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [errors, setErrors] = useState<ProductErrors>({});
  const [urls, setUrls] = useState<string[]>([]);

  const onPrev = useCallback(() => {
    setStep((value) => {
      return value - 1;
    });
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => {
      return value + 1;
    });
  }, []);

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

  const isPrevBtn = useMemo(() => {
    return step === STEPS.INFO && true;
  }, [step]);

  const isNextBtn = useMemo(() => {
    return step === STEPS.IMAGES && true;
  }, [step]);

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

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setTimeout(() => setErrors({}), 5000);
    }
  }, [errors]);

  const { name, desc, category, price, numberInStock, priceDiscount } = data;

  let bodyContent: JSX.Element | undefined;

  bodyContent = (
    <ProductInfo
      name={name}
      desc={desc}
      price={price}
      priceDiscount={priceDiscount}
      numberInStock={numberInStock}
      errors={errors}
      onChange={handleChange}
    />
  );

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <ProductImages
        color={color}
        size={size}
        category={category}
        categories={categories}
        tags={tags}
        errors={errors}
        loading={isLoading}
        progress={progress}
        labelClasses={labelClasses}
        onChange={handleChange}
        onChangeColor={handleColor}
        onChangeSize={handleSize}
        onChangeTags={handleTags}
        onChangeFiles={handleFiles}
      />
    );
  }

  return (
    <FormBox>
      <StyledBox>
        <Heading small title='Create new product' />
        <Form onSubmit={handleSubmit}>
          {bodyContent}
          <SlideButtons
            disabled={isPending}
            isNextBtn={isNextBtn}
            isPrevBtn={isPrevBtn}
            onNext={onNext}
            onPrev={onPrev}
          />
          {step === STEPS.IMAGES && (
            <FormButton
              label='Create'
              disabled={disabledBtn}
              loading={isPending}
            />
          )}
        </Form>
      </StyledBox>
    </FormBox>
  );
};

export default NewProduct;
