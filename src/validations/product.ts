import { ProductData, ProductErrors } from '../types';

export const validateProductForm = (data: ProductData, tags: string[]) => {
  const errors: ProductErrors = {};
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
};
