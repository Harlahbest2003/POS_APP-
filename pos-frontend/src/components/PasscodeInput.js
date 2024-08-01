// src/components/PasscodeInput.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const PasscodeInput = ({ onPasscodeVerified }) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5004/auth/verify-passcode', { email: 'your-email@example.com', passcode });
      onPasscodeVerified();
    } catch (error) {
      setError('Invalid passcode. Please try again.');
    }
  };

  return (
    <Container>
      <h2>Enter Passcode</h2>
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group controlId="formPasscode">
          <Form.Label>Passcode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter 6-digit passcode"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Verify Passcode
        </Button>
      </Form>
    </Container>
  );
};

export default PasscodeInput;
