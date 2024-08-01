// src/pages/PasscodeVerification.js

import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PasscodeVerification = () => {
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRequestPasscode = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5004/api/request-passcode', { email });
      setSuccess('Passcode sent to your email. Please check your inbox.');
    } catch (error) {
      setError('Error requesting passcode. Please try again.');
    }
  };

  const handleVerifyPasscode = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5004/api/verify-passcode', { email, passcode });
      navigate('/post-item'); // Redirect to the PostItemForm page
    } catch (error) {
      setError('Invalid passcode. Please try again.');
    }
  };

  return (
    <Container>
      <h2>Passcode Verification</h2>
      <Form onSubmit={handleVerifyPasscode}>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicPasscode">
          <Form.Label>Enter Passcode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter 6-digit passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            required
          />
        </Form.Group >
        <Button  variant="primary" type="submit">
          Verify Passcode
        </Button>
      </Form>
      <Button variant="secondary" onClick={handleRequestPasscode}>
        Request Passcode
      </Button>
    </Container>
  );
};

export default PasscodeVerification;
