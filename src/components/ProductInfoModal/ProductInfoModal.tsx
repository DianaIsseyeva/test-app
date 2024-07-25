import { Modal } from 'antd';
import React from 'react';
import { ProductType } from '../../types/productType';
import styles from './ProductInfoModal.module.css';
interface ProductInfoModalProps {
  visible: boolean;
  product: ProductType | null;
  onClose: () => void;
}

const ProductInfoModal: React.FC<ProductInfoModalProps> = ({ visible, product, onClose }) => {
  if (!product) return null;

  const { title, price, image } = product.attributes;

  return (
    <Modal visible={visible} title={title} onCancel={onClose} footer={null}>
      <img className={styles.img} alt={title} src={`http://localhost:1337${image.data[0].attributes.url}`} />
      <p>Price: {price}</p>
    </Modal>
  );
};

export default ProductInfoModal;
