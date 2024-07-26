import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCheckAuthQuery } from '../../services/auth';
import { useGetCartQuery } from '../../services/cart';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const { data: authData } = useCheckAuthQuery(undefined, {
    skip: !localStorage.getItem('token'),
  });

  const userId = authData?.id;
  const { data: cartData, refetch } = useGetCartQuery(userId, {
    skip: !userId,
  });

  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (cartData?.cart) {
      setCartCount(cartData.cart.length);
    }
  }, [cartData]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/sign-in');
  };

  const handleCartChange = () => {
    refetch();
  };

  return (
    <Header>
      <div className='logo' />
      <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['1']}>
        <Menu.Item key='1'>
          <Link to='/products'>Products</Link>
        </Menu.Item>
        {authData ? (
          <>
            <Menu.Item key='2'>
              <Badge count={cartCount} overflowCount={99}>
                <Link to='/cart'>
                  <ShoppingCartOutlined style={{ fontSize: '24px', color: '#fff' }} />
                </Link>
              </Badge>
            </Menu.Item>
            <Menu.Item key='3' onClick={handleLogout}>
              Logout
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key='4'>
              <Link to='/sign-in'>Sign In</Link>
            </Menu.Item>
            <Menu.Item key='5'>
              <Link to='/sign-up'>Sign Up</Link>
            </Menu.Item>
          </>
        )}
      </Menu>
    </Header>
  );
};

export default AppHeader;
