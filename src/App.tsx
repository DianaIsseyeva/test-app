import { Provider } from 'react-redux';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { store } from './app/store';
import ProductCatalog from './pages/ProductCatalog/ProductCatalog';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/products' element={<ProductCatalog />} />
          <Route path='*' element={<Navigate to='/products' />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
