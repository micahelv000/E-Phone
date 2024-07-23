import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../../src/components/Header';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button, Container } from 'react-bootstrap';

export default function ItemPage() {
  const location = useLocation();
  const [itemData, setItemData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getQueryParams = (query) => {
    return new URLSearchParams(query);
  };

  useEffect(() => {
    const queryParams = getQueryParams(location.search);
    const slug = queryParams.get('slug');
    if (slug) {
      fetch(`http://phone-specs-api.vercel.app/${slug}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          if (data.status && data.data) {
            setItemData(data.data);
          } else {
            throw new Error('No phone data found');
          }
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    } else {
      setError('No slug parameter provided');
      setLoading(false);
    }
  }, [location.search]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <Container>
        <Card >
          <Card.Img variant="top" style={{ height: '80%', width: '300px', objectFit: 'cover' }} src={itemData.thumbnail} />
          <Card.Body>
            <Card.Title>{itemData.phone_name}</Card.Title>
            <Card.Text>
              {itemData.os}, {itemData.storage}
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>Brand: {itemData.brand}</ListGroup.Item>
            <ListGroup.Item>Release Date: {itemData.release_date}</ListGroup.Item>
            <ListGroup.Item>Dimensions: {itemData.dimension}</ListGroup.Item>
            <ListGroup.Item>Storage: {itemData.storage}</ListGroup.Item>
            <ListGroup.Item>OS: {itemData.os}</ListGroup.Item>

            {itemData.specifications.map((specGroup, index) => (
              <React.Fragment key={index}>
                <ListGroup.Item variant="secondary" className="font-weight-bold">{specGroup.title}</ListGroup.Item>
                {specGroup.specs.map((spec, specIndex) => (
                  <ListGroup.Item key={specIndex}>
                    <strong>{spec.key}:</strong> {spec.val.join(', ')}
                  </ListGroup.Item>
                ))}
              </React.Fragment>
            ))}
          </ListGroup>
          <Card.Body>
            <Button href="#">Add to cart</Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
