import { Skeleton } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductInfoModal from '../../components/ProductInfoModal/ProductInfoModal';
import { useCheckAuthQuery, useGetCartQuery } from '../../services';
import { useGetProductsQuery } from '../../services/products';
import { ProductType } from '../../types/productType';
import socket from '../../services/socket';
import styles from './ProductCatalog.module.css';

const ProductCatalog: React.FC = () => {
  const { data, error, isLoading, refetch: refetchProducts } = useGetProductsQuery();
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);

  const handleShowInfo = (product: ProductType) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };
  const token = localStorage.getItem('token');
  const { data: authData, error: authError } = useCheckAuthQuery(undefined, {
    skip: !token,
  });

  const userId = authData?.id;
  const { refetch: refetchCart } = useGetCartQuery(userId, {
    skip: !userId,
  });

  const handleCartChange = () => {
    refetchCart();
  };

  useEffect(() => {
    socket.on('productCreated', refetchProducts);
    socket.on('productUpdated', refetchProducts);
    socket.on('productDeleted', refetchProducts);

    return () => {
      socket.off('productCreated', refetchProducts);
      socket.off('productUpdated', refetchProducts);
      socket.off('productDeleted', refetchProducts);
    };
  }, [refetchProducts]);

  if (isLoading) {
    return (
      <div className={classNames(styles['product-grid'], 'container')}>
        {[...Array(9)].map((_, index) => (
          <Skeleton key={index} loading={true} active avatar paragraph={{ rows: 4 }} />
        ))}
      </div>
    );
  }

  if (error) {
    return <div>Error fetching products</div>;
  }

  return (
    <div className={classNames(styles['product-grid'], 'container')}>
      {data &&
        data.data.map((product: ProductType) => (
          <ProductCard key={product.id} product={product} onShowInfo={handleShowInfo} onCartChange={handleCartChange} />
        ))}
      <ProductInfoModal visible={!!selectedProduct} product={selectedProduct} onClose={handleCloseModal} />
    </div>
  );
};

export default ProductCatalog;
