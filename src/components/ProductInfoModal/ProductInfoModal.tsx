import { Modal, Spin } from 'antd';
import React, { useEffect } from 'react';
import { useGetProductByIdQuery } from '../../services/products';
import styles from './ProductInfoModal.module.css';

interface ProductInfoModalProps {
  visible: boolean;
  productId: number | null;
  onClose: () => void;
}

const ProductInfoModal: React.FC<ProductInfoModalProps> = ({ visible, productId, onClose }) => {
  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useGetProductByIdQuery(productId as number, {
    skip: !productId,
  });

  useEffect(() => {
    if (productId) {
      refetch();
    }
  }, [productId, refetch]);

  if (isLoading) {
    return <Spin />;
  }

  if (!product) {
    return null;
  }

  const { title, price, image } = product.data.attributes;

  return (
    <Modal visible={visible} title={title} onCancel={onClose} footer={null}>
      <img className={styles.img} alt={title} src={`http://localhost:1337${image.data[0].attributes.url}`} />
      <p>Price: {price}</p>
    </Modal>
  );
};

export default ProductInfoModal;
