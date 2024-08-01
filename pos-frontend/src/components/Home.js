import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const Home = () => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Product 1</Card.Title>
              <Card.Text>Description of Product 1</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Product 2</Card.Title>
              <Card.Text>Description of Product 2</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Product 3</Card.Title>
              <Card.Text>Description of Product 3</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};


export default Home;
