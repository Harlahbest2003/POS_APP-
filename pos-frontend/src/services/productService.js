// src/services/productService.js

const BASE_URL = 'http://localhost:5004/api'; // Adjust URL based on your backend API

const productService = {
  fetchProducts: async () => {
    try {
      const response = await fetch(`${BASE_URL}/products`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  // Add more methods as needed, e.g., createProduct, updateProduct, deleteProduct, etc.
};

export default productService;
