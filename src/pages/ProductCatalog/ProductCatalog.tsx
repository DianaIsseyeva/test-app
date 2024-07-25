import { Skeleton } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductInfoModal from '../../components/ProductInfoModal/ProductInfoModal';
import { fetchProducts } from '../../services/products';
import { ProductType } from '../../types/productType';
import styles from './ProductCatalog.module.css';

const ProductCatalog: React.FC = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

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

  const handleShowInfo = (product: ProductType) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className={classNames(styles['product-grid'], 'container')}>
        {[...Array(9)].map((_, index) => (
          <Skeleton key={index} loading={true} active avatar paragraph={{ rows: 4 }} />
        ))}
      </div>
    );
  }
  const handleAddToCart = (product: ProductType) => {
    console.log('Added to cart:', product);
  };

  const handleRemoveFromCart = (product: ProductType) => {
    console.log('Removed from cart:', product);
  };

  return (
    <div className={classNames(styles['product-grid'], 'container')}>
      {products &&
        products.map(product => (
          <ProductCard
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            key={product.id}
            product={product}
            onShowInfo={handleShowInfo}
          />
        ))}
      <ProductInfoModal visible={!!selectedProduct} product={selectedProduct} onClose={handleCloseModal} />
    </div>
  );
};

export default ProductCatalog;
