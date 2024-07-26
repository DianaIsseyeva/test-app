import { DeleteOutlined, InfoCircleOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Card, message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckAuthQuery } from '../../services/auth';
import { useAddToCartMutation, useRemoveFromCartMutation } from '../../services/cart';
import { ProductType } from '../../types/productType';

interface ProductCardProps {
  product: ProductType;
  onShowInfo: (product: ProductType) => void;
  showActions?: boolean;
  onCartChange?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onShowInfo, showActions = true, onCartChange }) => {
  const { title, image } = product.attributes;
  const navigate = useNavigate();
  const { data: authData, error: authError } = useCheckAuthQuery(undefined, {
    skip: !localStorage.getItem('token'),
  });

  const [addToCart] = useAddToCartMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  const handleAddToCart = async () => {
    if (authError) {
      if ('status' in authError && authError.status === 401) {
        message.error('You need to be logged in to add items to the cart.');
        navigate('/sign-in');
      } else {
        message.error('An unexpected error occurred.');
      }
    } else if (!authData) {
      message.warning('You need to be registered to add items to the cart.');
      navigate('/sign-up');
    } else {
      try {
        await addToCart({ userId: authData?.id, productId: product.id }).unwrap();
        message.success('Item added to cart!');
        onCartChange && onCartChange();
      } catch (error) {
        message.error('Failed to add item to cart.');
      }
    }
  };

  const handleRemoveFromCart = async () => {
    try {
      await removeFromCart({ userId: authData?.id, productId: product.id }).unwrap();
      message.success('Item removed from cart!');
      onCartChange && onCartChange();
    } catch (error) {
      message.error('Failed to remove item from cart.');
    }
  };

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
      actions={
        showActions
          ? [
              <InfoCircleOutlined key='info' onClick={() => onShowInfo(product)} />,
              <ShoppingCartOutlined key='add' onClick={handleAddToCart} />,
              <DeleteOutlined key='remove' onClick={handleRemoveFromCart} />,
            ]
          : undefined
      }
    >
      <Card.Meta title={title} />
    </Card>
  );
};

export default ProductCard;
