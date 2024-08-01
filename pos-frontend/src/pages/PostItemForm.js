import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const PostItemForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null
  });
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [showPasscodeForm, setShowPasscodeForm] = useState(false);
  const [passcode, setPasscode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isPasscodeVerified, setIsPasscodeVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      fetchProducts();
    }
  }, [token]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5004/api/products', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setProducts(response.data);
    } catch (error) {
      setError('Error fetching products');
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('price', formData.price);
    if (formData.image) {
      data.append('image', formData.image);
    }
  
    try {
      setLoading(true);
      const url = editMode 
        ? `http://localhost:5004/api/products/${currentProductId}`
        : 'http://localhost:5004/api/products';
      const method = editMode ? 'PUT' : 'POST';
  
      const response = await axios({
        method: method,
        url: url,
        data: data,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
  
      setFormData({ name: '', description: '', price: '', image: null });
      fetchProducts();
      setEditMode(false);
      setCurrentProductId(null);
    } catch (error) {
      console.error('Error submitting product:', error.response ? error.response.data : error.message);
      setError('Error submitting product');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: null
    });
    setEditMode(true);
    setCurrentProductId(product._id);
  };

  const handleDelete = async (productId) => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5004/api/products/${productId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchProducts();
    } catch (error) {
      setError('Error deleting product');
      console.error('Error deleting product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasscodeChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value)) {
      const newPasscode = [...passcode];
      newPasscode[index] = value;
      setPasscode(newPasscode);
      if (index < 5) {
        document.getElementById(`passcode-${index + 1}`).focus();
      }
    }
  };

  const handlePasscodeSubmit = () => {
    const passcodeString = passcode.join('');
    if (passcodeString === '000000') {
      setIsPasscodeVerified(true);
      localStorage.setItem('passcodeVerified', 'true');
      setShowPasscodeForm(false);
    } else {
      setError('Incorrect passcode');
    }
  };

  useEffect(() => {
    const verified = localStorage.getItem('passcodeVerified') === 'true';
    setIsPasscodeVerified(verified);
  }, []);

  return (
    <Container>
      {showPasscodeForm && !isPasscodeVerified && (
        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Group>
            <Form.Label>Enter Passcode</Form.Label>
            <div>
              {passcode.map((digit, index) => (
                <Form.Control
                  key={index}
                  id={`passcode-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handlePasscodeChange(e, index)}
                  style={{ width: '50px', display: 'inline-block', margin: '5px' }}
                />
              ))}
            </div>
            <Button onClick={handlePasscodeSubmit}>Submit</Button>
            {error && <Alert variant="danger">{error}</Alert>}
          </Form.Group>
        </Form>
      )}

      {!showPasscodeForm && !isPasscodeVerified && (
        <Button onClick={() => setShowPasscodeForm(true)}>Show Passcode Form</Button>
      )}

      {isPasscodeVerified && (
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              onChange={handleFileChange}
            />
          </Form.Group>

          <Button type="submit">{editMode ? 'Update Product' : 'Add Product'}</Button>
          {error && <Alert variant="danger">{error}</Alert>}
        </Form>
      )}

      {loading && <p>Loading...</p>}

      {!loading && !isPasscodeVerified && <p>Please verify passcode to access the form.</p>}

      {isPasscodeVerified && (
        <div>
          <h2>Product List</h2>
          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <ul>
              {products.map((product) => (
                <li key={product._id}>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                  {product.image && <img src={product.image} alt={product.name} style={{ width: '100px' }} />}
                  <Button onClick={() => handleEdit(product)}>Edit</Button>
                  <Button onClick={() => handleDelete(product._id)} variant="danger">Delete</Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </Container>
  );
};

export default PostItemForm;

