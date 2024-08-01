import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const products = [
    { id: 1, name: 'Product 1', description: 'Description 1', image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Product 2', description: 'Description 2', image: 'https://via.placeholder.com/150' }
  ];

  return (
    <Container>
      <Row>
        {products.map(product => (
          <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
