import { Skeleton } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import '../../App.css'; // Импорт обычного CSS-файла
import ProductCard from '../../components/ProductCard/ProductCard';
import { fetchProducts } from '../../services/products';
import { ProductType } from '../../types/productType';
import styles from './ProductCatalog.module.css';

const ProductCatalog: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return (
      <div className='container'>
        <div className={classNames(styles['product-grid'], 'container')}>
          {[...Array(9)].map((_, index) => (
            <Skeleton key={index} loading={true} active avatar paragraph={{ rows: 4 }} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='container'>
      <div className={classNames(styles['product-grid'], 'container')}>
        {products && products.map(product => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  );
};

export default ProductCatalog;
