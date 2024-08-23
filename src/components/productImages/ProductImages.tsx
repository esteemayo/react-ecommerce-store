import UploadProgress from '../form/UploadProgress';
import Select from '../form/Select';
import { UploadContainer } from '../form/UploadContainer';
import FormInput from '../form/FormInput';

import { ProductImagesProps } from '../../types';

const ProductImages = ({
  color,
  size,
  category,
  categories,
  tags,
  errors,
  loading,
  progress,
  labelClasses,
  onChange,
  onChangeColor,
  onChangeSize,
  onChangeTags,
  onChangeFiles,
}: ProductImagesProps) => {
  return (
    <>
      <FormInput
        name='color'
        label='Color'
        value={color}
        placeholder='Separate the color with commas'
        onChange={onChangeColor}
      />
      <FormInput
        name='size'
        label='Size'
        value={size}
        placeholder='Separate the size with commas'
        onChange={onChangeSize}
      />
      <Select
        name='category'
        label='Select category'
        value={category}
        defaultText='Select a category'
        onChange={onChange}
        data={categories}
        loading={loading}
        error={errors.category}
      />
      <FormInput
        name='tags'
        label='Product tags'
        value={tags}
        placeholder='Separate the tags with commas'
        onChange={onChangeTags}
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
            onChange={onChangeFiles}
            multiple
          />
        </UploadContainer>
      )}
    </>
  );
};

export default ProductImages;
