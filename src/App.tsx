import React from 'react';
import { Provider } from 'react-redux';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { store } from './app/store';
import ProductCatalog from './pages/ProductCatalog/ProductCatalog';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import AppLayout from './components/Layout/Layout';
import Cart from './components/Cart/Cart';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

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
