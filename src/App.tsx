import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { store } from './app/store';
import Cart from './components/Cart/Cart';
import AppLayout from './components/Layout/Layout';
import ProductCatalog from './pages/ProductCatalog/ProductCatalog';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import { useCheckAuthQuery } from './services';
import { useGetCartQuery } from './services/cart';
import socket from './services/socket';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  console.log(isAuthenticated);
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
            <>
              <Route path='/sign-in' element={<SignIn />} />
              <Route path='/sign-up' element={<SignUp />} />
              <Route path='*' element={<Navigate to='/products' replace />} />
              <Route path='/products' element={<ProductCatalog />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='*' element={<Navigate to='/products' replace />} />
            </>
          </Routes>
        </AppLayout>
      </Router>
    </Provider>
  );
};

export default App;
