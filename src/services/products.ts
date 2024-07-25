import api from './api';

export const fetchProducts = async () => {
  try {
    const response = await api.get('/api/products?populate=*');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching products:', error);
    if (error.response && error.response.status === 404) {
      console.error('Products not found.');
    }
    throw error;
  }
};
