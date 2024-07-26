import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCheckAuthQuery } from '../../services/auth';
import { useGetCartQuery } from '../../services/cart';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: authData } = useCheckAuthQuery(undefined, {
    skip: !localStorage.getItem('token'),
  });

  const userId = authData?.id;
  const { data: cartData } = useGetCartQuery(userId, {
    skip: !userId,
  });

  const [cartCount, setCartCount] = useState(0);
  const [currentKey, setCurrentKey] = useState('1');

  useEffect(() => {
    if (cartData?.cart) {
      setCartCount(cartData.cart.length);
    }
  }, [cartData]);

  useEffect(() => {
    if (!authData && location.pathname !== '/sign-in' && location.pathname !== '/sign-up') {
      navigate('/sign-in');
      setCurrentKey('4');
    }
  }, [authData, location.pathname, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/sign-in');
    setCurrentKey('4');
  };

  const handleNavigate = (path: string, key: string) => {
    navigate(path);
    setCurrentKey(key);
  };

  return (
    <Header>
      <div className='logo' />
      <Menu theme='dark' mode='horizontal' selectedKeys={[currentKey]}>
        <Menu.Item key='1' onClick={() => handleNavigate('/', '1')}>
          Products
        </Menu.Item>
        {authData ? (
          <>
            <Menu.Item key='2' onClick={() => handleNavigate('/cart', '2')}>
              <Badge count={cartCount} overflowCount={99}>
                <ShoppingCartOutlined style={{ fontSize: '24px', color: '#fff' }} />
              </Badge>
            </Menu.Item>
            <Menu.Item key='3' onClick={handleLogout}>
              Logout
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item key='4' onClick={() => handleNavigate('/sign-in', '4')}>
              Sign In
            </Menu.Item>
            <Menu.Item key='5' onClick={() => handleNavigate('/sign-up', '5')}>
              Sign Up
            </Menu.Item>
          </>
        )}
      </Menu>
    </Header>
  );
};

export default AppHeader;
