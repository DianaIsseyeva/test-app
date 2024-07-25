import { DeleteOutlined, InfoCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import React from 'react';
import { ProductType } from '../../types/productType';
interface ProductCardProps {
  product: ProductType;
  onShowInfo: (product: ProductType) => void;
  onAddToCart: (product: ProductType) => void;
  onRemoveFromCart: (product: ProductType) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onShowInfo, onAddToCart, onRemoveFromCart }) => {
  const { title, image } = product.attributes;

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={
        image.data.length > 0 ? (
          <img alt={title} src={`http://localhost:1337${image.data[0].attributes.url}`} />
        ) : (
          <div>No Image Available</div>
        )
      }
      actions={[
        <InfoCircleOutlined key='info' onClick={() => onShowInfo(product)} />,
        <ShoppingCartOutlined key='add' onClick={() => onAddToCart(product)} />,
        <DeleteOutlined key='remove' onClick={() => onRemoveFromCart(product)} />,
      ]}
    >
      <Card.Meta title={title} />
    </Card>
  );
};

export default ProductCard;
