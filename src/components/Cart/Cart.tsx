import { Layout, Spin, message } from 'antd';
import React, { useEffect } from 'react';
import CartProductCard from '../../components/CartProductCard/CartProductCard';
import { useCheckAuthQuery } from '../../services/auth';
import { useGetCartQuery } from '../../services/cart';
import { CartProductType } from '../../types/cartProductType';

const { Content } = Layout;

const Cart: React.FC = () => {
  const token = localStorage.getItem('token');

  const { data: authData, error: authError } = useCheckAuthQuery(undefined, {
    skip: !token,
  });

  const userId = authData?.id;
  const {
    data: cartData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetCartQuery(userId, {
    skip: !userId,
  });

  useEffect(() => {
    if (authError) {
      message.error('Failed to authenticate. Please sign in again.');
    }
  }, [authError]);

  useEffect(() => {
    if (error) {
      message.error('Failed to fetch cart data.');
    }
  }, [error]);

  if (isLoading) {
    return (
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div className='site-layout-content' style={{ padding: 24, minHeight: 380 }}>
          <Spin size='large' />
        </div>
      </Content>
    );
  }

  if (isError || !cartData) {
    return (
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div className='site-layout-content' style={{ padding: 24, minHeight: 380 }}>
          <p>Error loading cart items. Please try again.</p>
        </div>
      </Content>
    );
  }

  const handleCartChange = () => {
    refetch();
  };

  return (
    <Content style={{ padding: '0 50px', marginTop: 64 }}>
      <div className='site-layout-content' style={{ padding: 24, minHeight: 380 }}>
        {cartData.cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartData.cart.map((product: CartProductType) => (
            <CartProductCard
              key={product.id}
              product={product}
              onShowInfo={() => {}}
              showActions={true}
              onCartChange={handleCartChange}
            />
          ))
        )}
      </div>
    </Content>
  );
};

export default Cart;
