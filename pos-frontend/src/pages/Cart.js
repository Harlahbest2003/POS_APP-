
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Button, Modal, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get('http://localhost:5004/api/cart', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const items = response.data.cart || [];
        setCartItems(items);
        calculateTotalAmount(items);
      } catch (error) {
        setError('Error fetching cart items. Please try again later.');
        console.error('Error fetching cart items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotalAmount = (items) => {
    if (!items || items.length === 0) {
      setTotalAmount(0);
      return;
    }

    const total = items.reduce((acc, item) => {
      const itemPrice = parseFloat(item.product.price) || 0;
      const itemQuantity = parseInt(item.quantity, 10) || 0;
      return acc + (itemPrice * itemQuantity);
    }, 0);
    setTotalAmount(total);
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('token'); 
      await axios.delete(`http://localhost:5004/api/cart/${productId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const updatedItems = cartItems.filter(item => item.product._id !== productId);
      setCartItems(updatedItems);
      calculateTotalAmount(updatedItems);
    } catch (error) {
      setError('Error removing item from cart. Please try again later.');
      console.error('Error removing item from cart:', error);
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      const token = localStorage.getItem('token'); 
      await axios.put(`http://localhost:5004/api/cart/${productId}`, { quantity }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const updatedItems = cartItems.map(item => 
        item.product._id === productId ? { ...item, quantity } : item
      );
      setCartItems(updatedItems);
      calculateTotalAmount(updatedItems);
    } catch (error) {
      setError('Error updating item quantity. Please try again later.');
      console.error('Error updating item quantity:', error);
    }
  };

  const handlePayment = () => {
    const handler = window.PaystackPop.setup({
      key: 'pk_test_35882cc911cedac6ceb53bf8e04459e3251a2b37', 
      amount: totalAmount * 100,
      currency: 'NGN',
      callback: function(response) {
        const receipt = {
          transactionReference: response.reference,
          date: new Date().toLocaleString(),
          items: cartItems,
          totalAmount
        };
        setReceiptData(receipt);
        setShowReceipt(true);
      },
      onClose: function() {
        alert('Payment cancelled');
      }
    });
    handler.openIframe();
  };

  return (
    <Container>
      <h2>Cart</h2>
      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">Your cart is empty.</td>
                </tr>
              ) : (
                cartItems.map(item => (
                  <tr key={item.product._id}>
                    <td>
                      <img
                        src={item.product.image || 'https://via.placeholder.com/150'}
                        alt={item.product.name || 'No name available'}
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        onError={(e) => e.target.src = 'https://via.placeholder.com/150'}
                      />
                    </td>
                    <td>{item.product.name || 'No name available'}</td>
                    <td>{item.product.description || 'No description available'}</td>
                    <td>${item.product.price !== undefined ? parseFloat(item.product.price).toFixed(2) : '0.00'}</td>
                    <td>
                      <Button variant="secondary" onClick={() => handleUpdateQuantity(item.product._id, item.quantity - 1)} disabled={item.quantity <= 1}>-</Button>
                      {item.quantity}
                      <Button variant="secondary" onClick={() => handleUpdateQuantity(item.product._id, item.quantity + 1)}>+</Button>
                    </td>
                    <td>
                      <Button variant="danger" onClick={() => handleRemoveFromCart(item.product._id)}>
                        Remove from Cart
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
          <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
          <Button variant="primary" onClick={handlePayment}>MAKE YOUR PAYMENT</Button>
        </>
      )}

      <Modal show={showReceipt} onHide={() => setShowReceipt(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Receipt</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {receiptData && (
            <div>
              <p>Transaction Reference: {receiptData.transactionReference}</p>
              <p>Date: {receiptData.date}</p>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {receiptData.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.product.name}</td>
                      <td>${item.product.price.toFixed(2)}</td>
                      <td>{item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <h3>Total Amount: ${receiptData.totalAmount.toFixed(2)}</h3>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReceipt(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Cart;
