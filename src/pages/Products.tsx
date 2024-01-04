import { useEffect, useState } from 'react';

import Pagination from '../components/Pagination';
import ProductFilter from '../components/products/ProductFilter';
import ProductBox from '../components/products/ProductBox';
import ProductList from '../components/products/ProductList';

import { ProductValues } from '../types';
import { getProducts } from '../services/productService';

const Products = () => {
  const [category, setCategory] = useState('all');
  const [size, setSize] = useState('all');
  const [color, setColor] = useState('all');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [products, setProducts] = useState<ProductValues[]>([]);
  const [sortedProducts, setSortedProducts] = useState<ProductValues[]>([]);

  const [counts, setCounts] = useState(20);
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getProducts();
        console.log(data);
        const maxPrice = Math.max(
          ...data.products.map((item: ProductValues) => item.price)
        );

        setProducts(data.products);
        setSortedProducts(data.products);
        setMaxPrice(maxPrice);
        setPrice(maxPrice);

        setCounts(data.counts);
        setPage(data.page);
        setNumberOfPages(data.numberOfPages);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    let tempProducts = [...products];

    if (category !== 'all') {
      tempProducts = tempProducts.filter((item) => item.category === category);
    }

    if (color !== 'all') {
      tempProducts = tempProducts.filter((item) => item.color.includes(color));
    }

    if (size !== 'all') {
      tempProducts = tempProducts.filter((item) => item.size.includes(size));
    }

    tempProducts = tempProducts.filter((item) => item.price <= price);

    setSortedProducts(tempProducts);
  }, [category, color, price, products, size]);

  return (
    <ProductBox>
      <ProductFilter
        products={products}
        price={price}
        category={category}
        size={size}
        color={color}
        minPrice={minPrice}
        maxPrice={maxPrice}
        setCategory={setCategory}
        setSize={setSize}
        setColor={setColor}
        setPrice={setPrice}
      />
      <ProductList products={sortedProducts} />
      {products.length > 0 && (
        <Pagination counts={counts} page={page} numberOfPages={numberOfPages} />
      )}
    </ProductBox>
  );
};

export default Products;
