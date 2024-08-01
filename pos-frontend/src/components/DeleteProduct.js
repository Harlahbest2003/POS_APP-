// components/DeleteProduct.js

import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DeleteProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const deleteProduct = async () => {
      try {
        await axios.delete(`/api/products/${id}`);
        navigate('/products'); // Redirect to products page after deleting
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    };
    deleteProduct();
  }, [id, navigate]);

  return (
    <div>
      <h2>Deleting Product...</h2>
    </div>
  );
};

export default DeleteProduct;
