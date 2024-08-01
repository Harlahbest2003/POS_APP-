// components/EditProduct.js

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const result = await axios.get(`/api/products/${id}`);
      setProduct(result.data);
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/products/${id}`, product);
      navigate('/products'); // Redirect to products page after editing
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" value={product.description} onChange={handleChange} />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} />
        </div>
        <div>
          <label>Image URL:</label>
          <input type="text" name="imageUrl" value={product.imageUrl} onChange={handleChange} />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProduct;
