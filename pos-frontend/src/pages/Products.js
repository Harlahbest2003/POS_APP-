import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Card, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    _id: '',
    name: '',
    description: '',
    image: '',
    price: 0,
  });
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token'); 

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5004/api',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosInstance.get('/products');
        setProducts(response.data);
      } catch (error) {
        setError('Error fetching products. Please try again later.');
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await axiosInstance.get('/cart');
        const cartItems = response.data.cart || [];
        setCartCount(cartItems.length);
      } catch (error) {
        setError('Error fetching cart count. Please try again later.');
        console.error('Error fetching cart count:', error);
        setCartCount(0);
      }
    };

    fetchCartCount();
  }, []);

  const handleViewDetails = (product) => {
    setModalContent({
      _id: product._id,
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
    });
    setShowModal(true);
  };

  const handleAddToCart = async () => {
    try {
      await axiosInstance.post('/api/cart/addToCart', {
        productId: modalContent._id,
        quantity: 1,
      });
      setCartCount(cartCount + 1);
      setShowModal(false);
    } catch (error) {
      setError('Error adding to cart. Please try again later.');
      console.error('Error adding to cart:', error);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <Container>
      <h2>Products</h2>
      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          <Button 
            variant="info" 
            onClick={() => navigate('/cart')}
            style={{ position: 'absolute', top: '10px', right: '10px' }}
          >
            View Cart ({isNaN(cartCount) ? 0 : cartCount})
          </Button>
          <Row>
            {products.map(product => (
              <Col key={product._id} sm={6} md={4} lg={3} className="mb-4">
                <Card>
                  {product.image && (
                    <Card.Img variant="top" src={product.image} alt={product.name} />
                  )}
                  <Card.Body>
                    <Card.Title>{product.name || 'No name available'}</Card.Title>
                    <Card.Text>{product.description || 'No description available'}</Card.Text>
                    <Card.Text>Price: ${product.price.toFixed(2)}</Card.Text>
                    <Button variant="info" onClick={() => handleViewDetails(product)}>View Details</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Product Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h3>{modalContent.name || 'No name available'}</h3>
              <p>{modalContent.description || 'No description available'}</p>
              <p>Price: ${modalContent.price.toFixed(2)}</p>
              {modalContent.image && (
                <img src={modalContent.image} alt={modalContent.name} width="100%" />
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default Products;
