import { Card } from 'antd';
import React from 'react';
import { ProductType } from '../../types/productType';

interface ProductCardProps {
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
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
    ></Card>
  );
};

export default ProductCard;
