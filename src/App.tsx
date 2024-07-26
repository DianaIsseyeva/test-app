import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { store } from './app/store';
import ProductCatalog from './pages/ProductCatalog/ProductCatalog';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import AppLayout from './components/Layout/Layout';
import socket from './services/socket';
import { useGetCartQuery } from './services/cart';
import { useCheckAuthQuery } from './services';
import Cart from './components/Cart/Cart';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  const token = localStorage.getItem('token');
  const { data: authData } = useCheckAuthQuery(undefined, {
    skip: !token,
  });

  const userId = authData?.id;
  const { refetch } = useGetCartQuery(userId, {
    skip: !userId,
  });

  useEffect(() => {
    socket.on('productCreated', () => {
      refetch();
    });

    socket.on('productUpdated', () => {
      refetch();
    });

    socket.on('productDeleted', () => {
      refetch();
    });

    return () => {
      socket.off('productCreated');
      socket.off('productUpdated');
      socket.off('productDeleted');
    };
  }, [refetch]);

  return (
    <Provider store={store}>
      <Router>
        <AppLayout>
          <Routes>
            {!isAuthenticated ? (
              <>
                <Route path='/sign-in' element={<SignIn />} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='*' element={<Navigate to='/sign-in' />} />
              </>
            ) : (
              <>
                <Route path='/products' element={<ProductCatalog />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='*' element={<Navigate to='/products' />} />
              </>
            )}
          </Routes>
        </AppLayout>
      </Router>
    </Provider>
  );
};

export default App;
