import axios from 'axios';

export const createProduct = async (data) => {
  console.log('Data Create product', data);
  const response = await axios.post('/api/product', data);
  return response;
};
