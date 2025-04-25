import axios from 'axios';
const API = "http://localhost:8000";

export const getProducts = async () =>
  axios.get(`${API}/products`).then(res => res.data);

export const createProduct = async (product: any) =>
  axios.post(`${API}/products`, product);
export const getProductById = async (id: number) =>
    axios.get(`${API}/products/${id}`).then(res => res.data);
  
  export const updateProduct = async (id: number, product: any) =>
    axios.put(`${API}/products/${id}`, product).then(res => res.data);
  
  export const deleteProduct = async (id: number) =>
    axios.delete(`${API}/products/${id}`);
  